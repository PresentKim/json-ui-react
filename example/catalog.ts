// 예시 목록(모두 고수준 컴포넌트, example/screens): 폼 제목(라우터 키), 버튼 수, 설명. 버튼 수는 생성 모듈 LAYOUTS의 total과 같아야 한다(빌드가 검사).
export interface Example {
  id: string;
  /** 폼 제목. `jur:` + 2글자 코드 = 6바이트 고정 길이 접두(라우터 조회 키). buildScreens의 codes로 고정한다. */
  title: string;
  /** 서버가 만드는 버튼 수. */
  buttons: number;
  /** 한 줄 설명(한국어). */
  summary: string;
  /** 쓰는 라이브러리 API 이름. */
  components: string[];
}

export const TITLE_PREFIX = "jur:";
export const TITLE_BYTES = 6;

export const EXAMPLES: Example[] = [
  { id: "router", title: "jur:ro", buttons: 4, summary: "제목 접두 6바이트로 화면을 고르는 라우터와 버튼 4개 목록", components: ["Screen", "ButtonList"] },
  { id: "tabs-inside", title: "jur:ti", buttons: 6, summary: "탭을 켠 얼굴 안에 패널을 넣는 방식(B)", components: ["Screen", "Tabs", "Tab", "ButtonList"] },
  { id: "tabs-follow", title: "jur:tf", buttons: 6, summary: "패널이 토글 상태 바인딩을 따라 보이는 방식(C)", components: ["Screen", "Tabs", "Tab", "ButtonList"] },
  { id: "tabs-lazy", title: "jur:tl", buttons: 6, summary: "탭을 고를 때만 패널을 팩토리로 만드는 방식(D)", components: ["Screen", "Tabs", "Tab", "ButtonList"] },
  { id: "slot-grid", title: "jur:sg", buttons: 24, summary: "고정 칸 3x8 그리드와 선택 상세", components: ["Screen", "SlotGrid"] },
  { id: "virtual-list-500", title: "jur:v5", buttons: 500, summary: "2열 가상 목록 500칸", components: ["Screen", "VirtualList"] },
  { id: "virtual-list-2000", title: "jur:v2", buttons: 2000, summary: "2열 가상 목록 2000칸(COL-49 한계)", components: ["Screen", "VirtualList"] },
  { id: "research", title: "jur:re", buttons: 2022, summary: "연구 화면: 탭 2개, 항목 96개, 상세 96개(방식 E)", components: ["Screen", "Tabs", "Tab", "SelectGrid", "Pager", "Placeholder", "DetailPanel", "IconTitle", "TextBlock", "IconRow", "Spacer", "ActionButton"] },
];
