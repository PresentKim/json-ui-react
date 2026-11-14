# json-ui-react

JSX로 쓴 화면 정의를 배드락 JSON UI 파일 묶음으로 **빌드 시점에** 컴파일하는 도구다. React에 의존하지 않는 자체 JSX 런타임을 쓰고, 런타임 의존은 0이다(개발 의존만 있다). 같은 입력이면 바이트가 같은 출력이 나온다. 객체 키는 삽입 순서를 유지하고, JSON은 `JSON.stringify(v, null, 2) + "\n"`으로 쓴다.

## 개요

파이프라인은 다음과 같다.

TSX 화면 → 자체 JSX 런타임 → ControlNode 트리 → Pack(네임스페이스별 정의) → 결정적 JSON 파일

- `render`가 JSX 요소 트리를 ControlNode 목록으로 바꾼다.
- `toEntry`, `toBody`가 ControlNode를 JSON UI의 `controls` 항목 모양으로 낮춘다.
- `Pack`이 네임스페이스(`ffr` 등)별로 정의를 모아 `ui/*.json` 파일 묶음을 만든다.
- `Slots`가 서버 버튼 번호를 할당하고, 그 배치를 담은 서버 모듈(JS, ESM)을 만든다.
- `lintFiles`가 생성된 JSON을 규칙 ID가 붙은 진단으로 검사한다.

`src/index.ts`(공개 진입점)는 현재 비어 있다. 각 모듈은 경로로 직접 가져온다.

## 왜 빌드 시점 컴파일인가

배드락 JSON UI에는 JS 런타임이 없어서 화면 구조가 리소스팩에 정적으로 박힌다. 지금까지는 라우터, 라디오 탭, 고정 `collection_index` 칸, 버튼 번호 배치(`102 + 20k + 19`)를 손으로 또는 일회성 스크립트로 맞췄다. TSX 컴포넌트와 훅으로 화면을 쓰면 정적 JSON UI와, 그와 어긋나지 않는 서버 쪽 버튼 배치 코드를 한 번에 만든다. 근거 규칙은 `bedrock-json-ui-research/guide/rules.json`(규칙 ID)과 `bedrock-research` 위키다.

## API 표

| API (src 경로) | 낮춤 결과 | 근거 규칙 |
| --- | --- | --- |
| `ScreenRouter` (`src/components/router.tsx`) | `collection_panel` + 팩토리 + `property_bag` 제목 조회(접두 바이트 길이로 비교). 제목 중복과 id 중복은 빌드 오류 | HOST-06, COL-22, COL-39, COL-47 |
| `radioToggleBody` (`src/components/toggle.tsx`) | 원시 `toggle` 라디오 그룹 본문. 같은 `toggle_name`끼리 한 번에 하나만 선택되고, 8개 상태 키를 채운다 | INP-10, INP-11, INP-13 |
| `TabBar` (`src/components/toggle.tsx`) | `form_buttons` 컬렉션 위 가로 줄에 토글 정의를 늘어놓는다. 각 탭에 `$tab_index`를 붙인다 | INP-13 |
| `SlotGrid` (`src/components/grid.tsx`) | 세로 `stack_panel` 안에 `collection_name`을 가진 가로 줄을 두고, 칸을 줄의 직속 자식으로 둔다. 칸마다 고정 `collection_index` | COL-38, COL-50, INP-35, BND-32 |
| `VirtualList` (`src/components/grid.tsx`) | `grid` + `collection_name`, `maximum_grid_items`를 `#form_button_length`에 묶는다. 2000개를 넘으면 빌드 오류(`allowLarge`로만 허용) | COL-49 |
| `createSlots` / `withSlots` / `useSlots` (`src/slots.ts`) | `range`, `blocks`로 이름 붙은 연속 버튼 번호를 배정한다. `useSlots`는 `withSlots` 안에서만 부를 수 있다 | 연구 화면 2절 |
| `decode`, `serverModule` (`src/slots.ts`) | 버튼 번호를 `{ name, index, field }`로 풀고, `LAYOUT`과 `decode`를 담은 서버 모듈 문자열을 만든다 | 연구 화면 2절 |
| `lit`, `prefixEq`, `lacks` (`src/expr.ts`) | 바닐라 식 문자열 조립. `lit`은 `'`, `*`, `@`를 리터럴에 넣으면 던진다 | EXP-36 |
| `view`, `collection`, `details`, `global` (`src/bind.ts`) | 바인딩 객체 빌더. 키 순서 고정, `undefined` 키는 생략 | COL-47, BND-32 |
| `jsx`, `jsxs`, `jsxDEV`, `Fragment` (`src/jsx-runtime.ts`) | 자체 JSX 런타임. `tsconfig`의 `jsxImportSource: "json-ui-react"`로 연결 | - |
| `render`, `toBody`, `toEntry` (`src/render.ts`) | 요소 트리 → ControlNode → JSON 본문. 이름과 `def`로 키(`이름@정의`)를 만든다 | - |
| `createPack` (`src/pack.ts`) | `ns(name, file)`, `define`, `modify`, `files()`, `json(file)`로 정의 묶음을 만든다 | - |
| `lintFiles`, `countControls` (`src/lint.ts`) | 검사기(진단 목록)와 파일별 컨트롤 수 집계(생성량 리포트) | 아래 "검사 규칙" 참고 |

계획서에 있던 `useTabs`, `useSelection`, `useBinding`, `<Tabs>`, `<Tab>`, `<Screen>`은 아직 `src/`에 없다. 지금은 위 표의 함수를 직접 인자로 호출한다.

## 검사 규칙

`lintFiles(files)`가 돌려주는 진단은 `{ rule, level, path, message }` 꼴이다. 진단 메시지는 한국어다.

| 규칙 | 수준 | 뜻 |
| --- | --- | --- |
| EXP-36 | error | 따옴표 리터럴 안에 `*` 또는 `@`를 쓸 수 없다 |
| INP-10 | error | 토글은 8개 상태(`checked*`, `unchecked*`)를 모두 정의해야 한다 |
| COL-02 | warn | 라벨에는 `collection_index`를 직접 줄 수 없다 |
| COL-50 | warn | 부모가 `panel`이면 칸마다 다른 고정 인덱스를 줘도 모두 0을 그린다. 가로 `stack_panel` 줄을 쓴다 |
| COL-47 | warn | 라우터 아래 컬렉션 바인딩에는 `binding_condition: "always"`가 필요하다 |
| COL-49 | warn | `maximum_grid_items`가 2000을 넘으면 칸이 겹쳐 그려진다 |

## 빌드 방법

요구 사항: Node 22 이상.

```bash
npm install
npm test                 # vitest run
npm run typecheck        # tsc --noEmit
npm run build:example    # tsx examples/research/build.ts
```

`npm run build:example`은 연구 화면(FFR 방식 E, F와 탭 방식 B)을 만든다. 기본 출력 폴더는 저장소 루트의 `out/`이고, 인자로 다른 폴더를 줄 수 있다.

- `out/rp/ui/*.json`: 리소스팩 UI 정의 파일
- `out/bp/scripts/layout.js`: 서버 버튼 배치 모듈(`LAYOUT`, `decode`)

`buildResearch()`는 `{ files, layout }`를 돌려준다. 연구 화면의 버튼 번호는 `layout`에서 얻는다. 탭 0~95(두 탭 줄 48개씩), 탭 버튼 96~97, 페이지 버튼 98~101, 상세 `102 + 20k + j`(k는 0~95, j는 0~19, 총 2022개)다. `j = 19`가 진행 버튼이다.

## 예시 애드온과 문서

- 예시 애드온: `example/`에 컴포넌트별 예시 화면과 행동팩 스크립트를 둔다. 게임 안에서 막대기를 쓰면(모바일은 길게 누르기) 예시 고르기 창이 열린다. `/scriptevent jur:open <예시id>`로 바로 열 수도 있다(id 없이 쓰면 고르기 창). 처음 접속할 때 막대기가 없으면 하나 준다. 예시 id는 `router`, `tabs-inside`, `tabs-follow`, `tabs-lazy`, `slot-grid`, `virtual-list-500`, `virtual-list-2000`, `research`다.
- 애드온 빌드 `npm run build:addon`: `dist/json-ui-react-examples.mcaddon`(행동팩과 리소스팩 `.mcpack` 두 개를 담은 zip)을 만든다. 두 번 빌드해도 바이트가 같다. 팩 이름에 `v<package.json version>`, 설명에 `v버전 · 커밋 · 커밋 날짜`가 붙고, 매니페스트 버전도 package.json version을 따른다. 게임 안 예시 고르기 창 본문에도 같은 버전이 보인다. 애드온을 바꿔 다시 배포할 때는 package.json의 version을 올린다.
- 문서 사이트: `site/`(Docusaurus)에 소개, 시작하기, 컴포넌트별 페이지 8개, API 레퍼런스를 둔다. `npm run site:build`가 mcaddon을 만들어 `downloads/`에 넣고 사이트를 빌드한다(`site/build`). 소개·시작하기·각 컴포넌트 페이지에 mcaddon 다운로드 버튼이 있다. 개발 서버는 `npm run site:start`.
- 실측 사진: `site/static/img/components/<예시id>/01-설명.png` 형식으로 넣으면 그 컴포넌트 페이지에 표시된다. 없으면 "실측 사진 준비 중" 상자가 보인다.
- 훅: `src/hooks.ts`의 `useTabs`, `useSelection`, `useBinding`은 빌드 시 한 번 실행되는 순수 헬퍼다.

## 한계

- 런타임 조건부 렌더는 할 수 없다. 조건은 빌드 시점에 정하고, 게임 안에서 바뀌는 분기는 바인딩과 식으로만 표현한다.
- 한 폼에는 grid(`SlotGrid` 또는 `VirtualList`)를 하나만 둔다.
- C-66은 아직 검증하지 않았다.
- 여는 시간은 측정하지 않았다.
