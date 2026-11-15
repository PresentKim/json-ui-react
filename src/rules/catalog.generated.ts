// 자동 생성 파일 — 직접 고치지 않는다.
// 재생성: node scripts/gen-rules.mjs [bedrock-research 경로]
// 원본: bedrock-research docs/reference/rules.mdx, docs/json-ui/*.mdx (+ en 미러)
import type { RuleInfo } from "./types.ts";

export const RULE_IDS = [
  "ALT-01",
  "ALT-02",
  "ALT-03",
  "ALT-04",
  "ALT-05",
  "ALT-06",
  "ALT-07",
  "ALT-08",
  "ALT-09",
  "ALT-10",
  "ALT-11",
  "ALT-12",
  "ALT-13",
  "ALT-14",
  "ALT-15",
  "ALT-16",
  "ANI-01",
  "ANI-02",
  "ANI-03",
  "ANI-04",
  "ANI-05",
  "ANI-06",
  "ANI-07",
  "ANI-08",
  "ANI-09",
  "ANI-10",
  "ANI-11",
  "ANI-12",
  "ANI-13",
  "ANI-14",
  "ANI-15",
  "ANI-16",
  "ANI-17",
  "ANI-18",
  "ANI-19",
  "ANI-20",
  "ANI-21",
  "ANI-22",
  "ANI-34",
  "ANI-35",
  "ANI-36",
  "ANI-37",
  "ANI-38",
  "BND-01",
  "BND-02",
  "BND-03",
  "BND-04",
  "BND-05",
  "BND-06",
  "BND-07",
  "BND-08",
  "BND-09",
  "BND-10",
  "BND-11",
  "BND-12",
  "BND-13",
  "BND-14",
  "BND-15",
  "BND-16",
  "BND-17",
  "BND-18",
  "BND-19",
  "BND-20",
  "BND-21",
  "BND-22",
  "BND-23",
  "BND-24",
  "BND-25",
  "BND-26",
  "BND-27",
  "BND-28",
  "BND-29",
  "BND-30",
  "BND-31",
  "BND-32",
  "BND-33",
  "BND-34",
  "BND-35",
  "BND-36",
  "COL-01",
  "COL-02",
  "COL-03",
  "COL-04",
  "COL-05",
  "COL-06",
  "COL-07",
  "COL-08",
  "COL-09",
  "COL-10",
  "COL-11",
  "COL-12",
  "COL-13",
  "COL-14",
  "COL-15",
  "COL-16",
  "COL-17",
  "COL-18",
  "COL-19",
  "COL-20",
  "COL-21",
  "COL-22",
  "COL-23",
  "COL-24",
  "COL-25",
  "COL-26",
  "COL-27",
  "COL-28",
  "COL-29",
  "COL-30",
  "COL-31",
  "COL-34",
  "COL-35",
  "COL-36",
  "COL-37",
  "COL-38",
  "COL-39",
  "COL-40",
  "COL-41",
  "COL-42",
  "COL-43",
  "COL-44",
  "COL-45",
  "COL-46",
  "COL-47",
  "COL-48",
  "COL-49",
  "COL-50",
  "DBG-01",
  "DBG-02",
  "DBG-03",
  "DBG-04",
  "DBG-05",
  "DBG-06",
  "DBG-07",
  "DBG-08",
  "DBG-09",
  "DBG-10",
  "DBG-11",
  "DBG-12",
  "DBG-13",
  "DBG-14",
  "DBG-15",
  "DBG-16",
  "DBG-17",
  "DBG-18",
  "DBG-19",
  "DBG-20",
  "DBG-21",
  "DBG-22",
  "DBG-23",
  "DBG-24",
  "DBG-25",
  "DBG-26",
  "DBG-27",
  "DBG-28",
  "DBG-29",
  "DBG-30",
  "DBG-32",
  "DBG-33",
  "DBG-34",
  "EXP-01",
  "EXP-02",
  "EXP-03",
  "EXP-04",
  "EXP-05",
  "EXP-06",
  "EXP-07",
  "EXP-08",
  "EXP-09",
  "EXP-10",
  "EXP-11",
  "EXP-12",
  "EXP-13",
  "EXP-14",
  "EXP-15",
  "EXP-16",
  "EXP-17",
  "EXP-18",
  "EXP-19",
  "EXP-20",
  "EXP-21",
  "EXP-22",
  "EXP-23",
  "EXP-24",
  "EXP-25",
  "EXP-26",
  "EXP-27",
  "EXP-28",
  "EXP-29",
  "EXP-30",
  "EXP-31",
  "EXP-32",
  "EXP-33",
  "EXP-34",
  "EXP-35",
  "EXP-36",
  "EXP-37",
  "EXP-38",
  "EXP-39",
  "EXP-40",
  "EXP-41",
  "EXP-43",
  "EXP-44",
  "EXP-45",
  "EXP-46",
  "FILE-01",
  "FILE-02",
  "FILE-03",
  "FILE-04",
  "FILE-05",
  "FILE-06",
  "FILE-07",
  "FILE-08",
  "FILE-09",
  "FILE-10",
  "FILE-11",
  "FILE-12",
  "FILE-13",
  "FILE-14",
  "FILE-15",
  "FILE-16",
  "FILE-17",
  "FILE-18",
  "FILE-19",
  "FILE-20",
  "FILE-21",
  "FILE-22",
  "FILE-23",
  "FILE-24",
  "FILE-25",
  "FILE-26",
  "FILE-27",
  "FILE-28",
  "FILE-29",
  "FILE-30",
  "FILE-31",
  "FILE-32",
  "FILE-33",
  "FILE-34",
  "FILE-35",
  "FILE-36",
  "FILE-37",
  "FILE-38",
  "FILE-39",
  "FILE-40",
  "FILE-41",
  "FILE-42",
  "FILE-43",
  "HOST-01",
  "HOST-02",
  "HOST-03",
  "HOST-04",
  "HOST-05",
  "HOST-06",
  "HOST-07",
  "HOST-08",
  "HOST-09",
  "HOST-10",
  "HOST-11",
  "HOST-12",
  "HOST-13",
  "HOST-14",
  "HOST-15",
  "HOST-16",
  "HOST-17",
  "HOST-18",
  "HOST-19",
  "HOST-20",
  "HOST-21",
  "HOST-22",
  "HOST-23",
  "HOST-24",
  "HOST-25",
  "HOST-26",
  "HOST-27",
  "HOST-28",
  "HOST-29",
  "HOST-30",
  "HOST-31",
  "HOST-32",
  "HOST-33",
  "HOST-34",
  "HOST-35",
  "HOST-36",
  "HOST-37",
  "HOST-38",
  "HOST-39",
  "HOST-40",
  "HOST-41",
  "HOST-42",
  "HOST-43",
  "HOST-44",
  "HOST-45",
  "HOST-46",
  "HOST-47",
  "HOST-48",
  "HOST-49",
  "HOST-50",
  "HOST-51",
  "INP-01",
  "INP-02",
  "INP-03",
  "INP-04",
  "INP-05",
  "INP-06",
  "INP-07",
  "INP-08",
  "INP-09",
  "INP-10",
  "INP-11",
  "INP-12",
  "INP-13",
  "INP-14",
  "INP-15",
  "INP-16",
  "INP-17",
  "INP-18",
  "INP-19",
  "INP-20",
  "INP-21",
  "INP-22",
  "INP-23",
  "INP-24",
  "INP-25",
  "INP-31",
  "INP-32",
  "INP-33",
  "INP-34",
  "INP-35",
  "INP-36",
  "LAY-01",
  "LAY-02",
  "LAY-03",
  "LAY-04",
  "LAY-05",
  "LAY-06",
  "LAY-07",
  "LAY-08",
  "LAY-09",
  "LAY-10",
  "LAY-11",
  "LAY-12",
  "LAY-13",
  "LAY-14",
  "LAY-15",
  "LAY-16",
  "LAY-17",
  "LAY-18",
  "LAY-19",
  "LAY-20",
  "LAY-21",
  "LAY-22",
  "LAY-23",
  "LAY-24",
  "LAY-25",
  "LAY-26",
  "LAY-27",
  "LAY-28",
  "LAY-29",
  "LAY-30",
  "LAY-31",
  "LAY-32",
  "LAY-33",
  "LAY-34",
  "LAY-35",
  "LAY-36",
  "LAY-37",
  "LAY-38",
  "LAY-39",
  "LAY-40",
  "LAY-41",
  "LAY-42",
  "LAY-43",
  "LAY-44",
  "LAY-45",
  "LAY-46",
  "LAY-47",
  "LAY-48",
  "LAY-49",
  "LAY-50",
  "LAY-51",
  "LAY-52",
  "LAY-53",
  "LAY-54",
  "LAY-55",
  "LAY-56",
  "LAY-57",
  "MOD-01",
  "MOD-02",
  "MOD-03",
  "MOD-04",
  "MOD-05",
  "MOD-06",
  "MOD-07",
  "MOD-08",
  "MOD-09",
  "MOD-10",
  "MOD-11",
  "MOD-12",
  "MOD-13",
  "MOD-14",
  "MOD-15",
  "MOD-16",
  "MOD-17",
  "MOD-18",
  "MOD-19",
  "MOD-20",
  "MOD-21",
  "MOD-22",
  "MOD-23",
  "MOD-24",
  "MOD-25",
  "PAT-01",
  "PAT-02",
  "PAT-03",
  "PAT-04",
  "PAT-05",
  "PAT-06",
  "PAT-07",
  "PAT-08",
  "PAT-09",
  "PAT-10",
  "PAT-11",
  "PAT-12",
  "PAT-13",
  "PAT-14",
  "TXT-01",
  "TXT-02",
  "TXT-03",
  "TXT-04",
  "TXT-05",
  "TXT-06",
  "TXT-07",
  "TXT-08",
  "TXT-09",
  "TXT-10",
  "TXT-11",
  "TXT-12",
  "TXT-13",
  "TXT-14",
  "TXT-15",
  "TXT-16",
  "TXT-17",
  "TXT-22",
  "TXT-23",
  "TXT-24"
] as const;

export type RuleId = (typeof RULE_IDS)[number];

export const RULE_INFO: Record<RuleId, RuleInfo> = {
  "ALT-01": {
    "id": "ALT-01",
    "category": "ALT",
    "page": "reference/rules",
    "anchor": "alt-01",
    "proposal": false,
    "evidence": [
      "코드",
      "추론"
    ],
    "title": {
      "ko": "3D 위치를 따라가야 하는 표시(머리 위 숫자, 피격 표시)는 JSON UI로 만들 수 없다. 파티클이나 엔티티를 쓴다.",
      "en": "A display that must follow a 3D position (a number above the head, a hit indicator) cannot be made with JSON UI. Use particles or entities."
    },
    "detail": {
      "ko": "3D 위치를 따라가야 하는 표시(머리 위 숫자, 피격 표시)는 JSON UI로 만들 수 없다. 파티클이나 엔티티를 쓴다.",
      "en": "Displays that must follow a 3D position (a number above a head, a hit indicator) cannot be built with JSON UI. Use particles or entities."
    },
    "sources": "DI 0장·5장·6장-1"
  },
  "ALT-02": {
    "id": "ALT-02",
    "category": "ALT",
    "page": "reference/rules",
    "anchor": "alt-02",
    "proposal": false,
    "evidence": [
      "추론"
    ],
    "title": {
      "ko": "표시 전용이면 바닐라 UI 파일을 건드리지 않는 방법이 호환성에서 이긴다. JSON UI 재스킨은 상호작용이 필요할 때 고른다.",
      "en": "For display only, the method that does not touch vanilla UI files wins on compatibility. Choose a JSON UI reskin when interaction is needed."
    },
    "detail": {
      "ko": "표시 전용이면 바닐라 UI 파일을 건드리지 않는 방법이 호환성에서 이긴다. JSON UI 재스킨은 상호작용이 필요할 때 고른다.",
      "en": "For display only, a method that does not touch vanilla UI files wins on compatibility. Choose a JSON UI reskin when interaction is needed."
    },
    "sources": "DI 6장-8, BA 6장, AP 5장"
  },
  "ALT-03": {
    "id": "ALT-03",
    "category": "ALT",
    "page": "reference/rules",
    "anchor": "alt-03",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "숫자는 글리프 아틀라스로 그린다: 가로 한 줄에 정사각 셀(DI: 1024×64, 64px 셀 16칸 중 12칸 `0-9 - .`)을 두고 글자를 흰색으로 그린다. 파티클의 `uv`를 `[\"variable.glyph * 64\", 0]`, `uv_size [64, 64]`로 주면 변수 하나로 글자를 고른다. 색은 틴트로 입히므로 텍스처 한 장으로 여러 색을 낸다.",
      "en": "Draw numbers with a glyph atlas: put square cells in one horizontal row (DI: 1024×64, 12 of 16 cells of 64px for `0-9 - .`) and draw the characters in white. Giving the particle `uv` as `[\"variable.glyph * 64\", 0]` and `uv_size [64, 64]` picks a character with one variable. The color is applied as a tint, so one texture gives several colors."
    },
    "detail": {
      "ko": "숫자는 글리프 아틀라스로 그린다: 가로 한 줄에 정사각 셀(DI: 1024×64, 64px 셀 16칸 중 12칸 `0-9 - .`)을 두고 글자를 흰색으로 그린다. 파티클의 `uv`를 `[\"variable.glyph * 64\", 0]`, `uv_size [64, 64]`로 주면 변수 하나로 글자를 고른다. 색은 틴트로 입히므로 텍스처 한 장으로 여러 색을 낸다.",
      "en": "Numbers are drawn with a glyph atlas: put square cells in one horizontal row (DI: 1024x64, 12 of 16 cells of 64px for `0-9 - .`) and draw the characters in white. Give the particle's `uv` as `[\"variable.glyph * 64\", 0]` and `uv_size [64, 64]` and one variable picks the character. The color is applied by tint, so one texture produces several colors."
    },
    "sources": "DI 4.1·4.2"
  },
  "ALT-04": {
    "id": "ALT-04",
    "category": "ALT",
    "page": "reference/rules",
    "anchor": "alt-04",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "스크립트의 `MolangVariableMap.setColorRGBA(\"variable.tint\", c)`는 `variable.tint.r/.g/.b/.a` 네 값으로 풀린다. 틴트 그라디언트에서 RGB는 변수, 알파만 키프레임으로 주면 색과 페이드를 분리할 수 있다.",
      "en": "The script's `MolangVariableMap.setColorRGBA(\"variable.tint\", c)` unpacks into the four values `variable.tint.r/.g/.b/.a`. In a tint gradient, giving RGB as the variable and only alpha as keyframes separates color from fade."
    },
    "detail": {
      "ko": "스크립트의 `MolangVariableMap.setColorRGBA(\"variable.tint\", c)`는 `variable.tint.r/.g/.b/.a` 네 값으로 풀린다. 틴트 그라디언트에서 RGB는 변수, 알파만 키프레임으로 주면 색과 페이드를 분리할 수 있다.",
      "en": "The script's `MolangVariableMap.setColorRGBA(\"variable.tint\", c)` expands into the four values `variable.tint.r/.g/.b/.a`. In a tint gradient, giving RGB as variables and only alpha as keyframes separates color and fade."
    },
    "sources": "DI 4.2·4.3"
  },
  "ALT-05": {
    "id": "ALT-05",
    "category": "ALT",
    "page": "reference/rules",
    "anchor": "alt-05",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "반투명이 필요하면 `material: particles_blend`, 컷아웃이면 `particles_alpha`.",
      "en": "If you need translucency, `material: particles_blend`, and for cutout, `particles_alpha`."
    },
    "detail": {
      "ko": "반투명이 필요하면 `material: particles_blend`, 컷아웃이면 `particles_alpha`.",
      "en": "For translucency use `material: particles_blend`, for cutout `particles_alpha`."
    },
    "sources": "DI 4.3"
  },
  "ALT-06": {
    "id": "ALT-06",
    "category": "ALT",
    "page": "reference/rules",
    "anchor": "alt-06",
    "proposal": false,
    "evidence": [
      "코드",
      "추론"
    ],
    "title": {
      "ko": "한 플레이어에게만 보여야 하면 `Player.spawnParticle`(공격자에게만), 주변 모두에게면 `Dimension.spawnParticle`.",
      "en": "If it must be seen by only one player, `Player.spawnParticle` (only to the attacker), and for everyone nearby, `Dimension.spawnParticle`."
    },
    "detail": {
      "ko": "한 플레이어에게만 보여야 하면 `Player.spawnParticle`(공격자에게만), 주변 모두에게면 `Dimension.spawnParticle`.",
      "en": "If it should be seen by only one player, use `Player.spawnParticle` (to the attacker only), and for everyone nearby `Dimension.spawnParticle`."
    },
    "sources": "DI 4.6"
  },
  "ALT-07": {
    "id": "ALT-07",
    "category": "ALT",
    "page": "reference/rules",
    "anchor": "alt-07",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "여러 글자 문자열은 카메라 기준 오른쪽 벡터 `right = (-view.z, 0, view.x)`로 `(i - (n-1)/2) × 간격`만큼 밀어 가운데 정렬하고, 파티클은 `facing_camera_mode: lookat_xyz`로 둔다. 연타 시 겹침은 후보 위치 중 최근 위치들과 가장 먼 곳을 고른다.",
      "en": "Center a multi-character string by shifting `(i - (n-1)/2) × spacing` along the camera-relative right vector `right = (-view.z, 0, view.x)`, and set the particle to `facing_camera_mode: lookat_xyz`. For overlap on rapid hits, choose the candidate position farthest from recent positions."
    },
    "detail": {
      "ko": "여러 글자 문자열은 카메라 기준 오른쪽 벡터 `right = (-view.z, 0, view.x)`로 `(i - (n-1)/2) × 간격`만큼 밀어 가운데 정렬하고, 파티클은 `facing_camera_mode: lookat_xyz`로 둔다. 연타 시 겹침은 후보 위치 중 최근 위치들과 가장 먼 곳을 고른다.",
      "en": "For multi-character strings, push by `(i - (n-1)/2) x spacing` along the camera-relative right vector `right = (-view.z, 0, view.x)` to center them, and set the particle to `facing_camera_mode: lookat_xyz`. To avoid overlap on rapid hits, pick the candidate position farthest from recent positions."
    },
    "sources": "DI 4.5"
  },
  "ALT-08": {
    "id": "ALT-08",
    "category": "ALT",
    "page": "reference/rules",
    "anchor": "alt-08",
    "proposal": false,
    "evidence": [
      "추론"
    ],
    "title": {
      "ko": "글자 수만큼 파티클이 생기므로 범위 공격 등으로 대상이 많으면 개수가 빠르게 는다.",
      "en": "A particle is created per character, so the count rises quickly when there are many targets, such as in an area attack."
    },
    "detail": {
      "ko": "글자 수만큼 파티클이 생기므로 범위 공격 등으로 대상이 많으면 개수가 빠르게 는다.",
      "en": "One particle is created per character, so with many targets, such as an area attack, the count grows fast."
    },
    "sources": "DI 7장"
  },
  "ALT-09": {
    "id": "ALT-09",
    "category": "ALT",
    "page": "reference/rules",
    "anchor": "alt-09",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "\"텍스트를 직접 못 그리는 표면에서는 숫자 코드로 글리프를 고른다\"는 같은 발상이 두 곳에 있다: 파티클(변수 → UV 셀)과 상자 슬롯(스택 수량 → lang 키 → 글자, TXT-12). 둘 다 고정 문자표를 쓰고 문자표 밖 글자는 버린다.",
      "en": "The same idea, \"on a surface that cannot draw text directly, pick a glyph with a numeric code\", is in two places: particles (variable to UV cell) and chest slots (stack count to lang key to character, TXT-12). Both use a fixed character table and drop characters outside the table."
    },
    "detail": {
      "ko": "\"텍스트를 직접 못 그리는 표면에서는 숫자 코드로 글리프를 고른다\"는 같은 발상이 두 곳에 있다: 파티클(변수 → UV 셀)과 상자 슬롯(스택 수량 → lang 키 → 글자, TXT-12). 둘 다 고정 문자표를 쓰고 문자표 밖 글자는 버린다. )",
      "en": "The same idea, \"on a surface that cannot draw text directly, pick glyphs with a numeric code\", exists in two places: particles (variable -> UV cell) and chest slots (stack count -> lang key -> character, TXT-12). Both use a fixed character table and discard characters outside it. )"
    },
    "sources": "DI 5.1, BC 4.3-(3)"
  },
  "ALT-10": {
    "id": "ALT-10",
    "category": "ALT",
    "page": "reference/rules",
    "anchor": "alt-10",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "\"모양은 고정, 값만 바뀐다\": 파티클 정의·컴파일된 JSON UI 모두 정적이고 런타임은 값만 보낸다. 레이아웃 계산을 게임 API와 분리된 순수 함수로 두면 웹 미리보기·편집기와 같은 코드를 공유할 수 있다(BA의 `tabLayout.js`).",
      "en": "\"The shape is fixed, only the values change\": both particle definitions and compiled JSON UI are static and the runtime sends only values. If layout calculation is kept as a pure function separate from the game API, the same code can be shared with a web preview or editor (BA's `tabLayout.js`)."
    },
    "detail": {
      "ko": "\"모양은 고정, 값만 바뀐다\": 파티클 정의·컴파일된 JSON UI 모두 정적이고 런타임은 값만 보낸다. 레이아웃 계산을 게임 API와 분리된 순수 함수로 두면 웹 미리보기·편집기와 같은 코드를 공유할 수 있다(BA의 `tabLayout.js`).",
      "en": "\"The shape is fixed and only values change\": both the particle definition and compiled JSON UI are static and the runtime sends only values. If you keep layout calculation as a pure function separate from the game API, you can share the same code with a web preview or editor (`tabLayout.js` of BA)."
    },
    "sources": "DI 5.1, BC 1장·3.2, BA 1장"
  },
  "ALT-11": {
    "id": "ALT-11",
    "category": "ALT",
    "page": "reference/rules",
    "anchor": "alt-11",
    "proposal": false,
    "evidence": [
      "코드",
      "실측"
    ],
    "title": {
      "ko": "Ore UI 화면은 설치 폴더 `data/gui/dist/hbui/`의 해시 붙은 압축 JS·CSS·HTML 번들이다. 엔진은 Ore UI 파일(`ui://…`)을 찾을 때 설치 폴더보다 팩 스택을 먼저 보지만, 신뢰된 팩(`isTrusted`)만 본다. 신뢰 판정은 팩을 여는 접근 전략이 정하고 UUID·마켓플레이스 서명은 보지 않는다. 평문 팩(Zip·Directory 전략)은 설치 폴더의 내장 팩만 신뢰되므로 일반 리소스팩·평문 서버 팩으로는 배치·동작·CSS를 바꿀 수 없다. 암호화 팩 전략 세 종류는 언제나 신뢰되므로, 그 전략으로 열린 팩의 `hbui/<파일>`은 게임 중 Ore UI 페이지(`gameplay.html`: 사망·침대·인벤토리·DDUI·거래·블록 화면)의 HTML·JS·CSS를 바꾼다. 그렇게 여는 길은 두 가지다. (1) 서버 없이: 로컬 리소스팩 폴더의 루트에 0바이트 빈 파일 `content.zipe`를 두면 엔진이 그 팩을 `DirectoryPackWithEncryptionAccessStrategy`로 연다. 엔진은 이 파일이 있는지만 보고, 키 없이 팩 폴더의 평문 파일을 그대로 읽는다. `.mcpack`으로 가져올 때는 zip 맨 위에 `manifest.json`과 `content.zipe`가 바로 있어야 한다(한 단계 깊으면 아무 메시지 없이 가져오기가 되지 않는다). 같은 가짜 암호화 헤더를 `contents.json`에 단 팩은 바뀌지 않는다. (2) 서버가 아무 32바이트 콘텐츠 키로 암호화해 키와 함께 보낸 팩(같은 팩을 평문으로 보내면 바뀌지 않음을 실측). 이 페이지의 JS가 바닐라 DDUI 데이터 저장소를 읽고 써서, 서버가 보낸 레이아웃대로 그리고 누름·입력을 돌려받는 화면을 만들 수 있다(OL `DDUI-서버-가이드.md`). 바꾼 `gameplay.html`에는 바닐라 번들의 해시 붙은 파일 이름이 들어가므로 게임 업데이트마다 설치본과 맞춘다. 클라이언트 설치 폴더를 직접 패치하는 도구(OUC)는 그 클라이언트에만 적용되고 업데이트마다 다시 적용해야 한다.",
      "en": "Ore UI screens are hashed, minified JS, CSS, and HTML bundles in the install folder `data/gui/dist/hbui/`. When looking for an Ore UI file (`ui://...`), the engine looks at the pack stack before the install folder, but only at trusted packs (`isTrusted`). Trust is decided by the access strategy used to open the pack, and the UUID and Marketplace signature are not looked at. For plain packs (Zip and Directory strategies) only the built-in packs in the install folder are trusted, so ordinary resource packs and plain server packs cannot change layout, behavior, or CSS. The three encrypted pack strategies are always trusted, so `hbui/<file>` in a pack opened with those strategies changes the HTML, JS, and CSS of the in-game Ore UI page (`gameplay.html`: death, bed, inventory, DDUI, trade, and block screens). There are two ways to open it that way. (1) Without a server: put an empty 0-byte file `content.zipe` at the root of a local resource pack folder and the engine opens that pack with `DirectoryPackWithEncryptionAccessStrategy`. The engine only checks whether this file exists and reads the plain files in the pack folder as they are, without a key. When importing as a `.mcpack`, `manifest.json` and `content.zipe` must be directly at the top of the zip (one level deeper makes the import silently fail). A pack that attaches the same fake encryption header to `contents.json` does not change. (2) A pack the server encrypts with any 32-byte content key and sends with the key (it was measured that the same pack sent as plain text does not change). The JS of this page reads and writes the vanilla DDUI data store, so you can build a screen that draws according to the layout the server sent and returns presses and input (OL `DDUI-server-guide.md`). The changed `gameplay.html` contains the hashed file names of the vanilla bundle, so match it to the install on every game update. The tool that patches the client install folder directly (OUC) applies only to that client and must be reapplied on every update."
    },
    "detail": {
      "ko": "Ore UI 화면은 설치 폴더 `data/gui/dist/hbui/`의 해시 붙은 압축 JS·CSS·HTML 번들이다. 엔진은 Ore UI 파일(`ui://…`)을 찾을 때 설치 폴더보다 팩 스택을 먼저 보지만, 신뢰된 팩(`isTrusted`)만 본다. 신뢰 판정은 팩을 여는 접근 전략이 정하고 UUID·마켓플레이스 서명은 보지 않는다. 평문 팩(Zip·Directory 전략)은 설치 폴더의 내장 팩만 신뢰되므로 일반 리소스팩·평문 서버 팩으로는 배치·동작·CSS를 바꿀 수 없다. 암호화 팩 전략 세 종류는 언제나 신뢰되므로, 그 전략으로 열린 팩의 `hbui/<파일>`은 게임 중 Ore UI 페이지(`gameplay.html`: 사망·침대·인벤토리·DDUI·거래·블록 화면)의 HTML·JS·CSS를 바꾼다. 그렇게 여는 길은 두 가지다. (1) 서버 없이: 로컬 리소스팩 폴더의 루트에 0바이트 빈 파일 `content.zipe`를 두면 엔진이 그 팩을 `DirectoryPackWithEncryptionAccessStrategy`로 연다. 엔진은 이 파일이 있는지만 보고, 키 없이 팩 폴더의 평문 파일을 그대로 읽는다. `.mcpack`으로 가져올 때는 zip 맨 위에 `manifest.json`과 `content.zipe`가 바로 있어야 한다(한 단계 깊으면 아무 메시지 없이 가져오기가 되지 않는다). 같은 가짜 암호화 헤더를 `contents.json`에 단 팩은 바뀌지 않는다. (2) 서버가 아무 32바이트 콘텐츠 키로 암호화해 키와 함께 보낸 팩(같은 팩을 평문으로 보내면 바뀌지 않음을 실측). 이 페이지의 JS가 바닐라 DDUI 데이터 저장소를 읽고 써서, 서버가 보낸 레이아웃대로 그리고 누름·입력을 돌려받는 화면을 만들 수 있다(OL 3장·6장~9장). 바꾼 `gameplay.html`에는 바닐라 번들의 해시 붙은 파일 이름이 들어가므로 게임 업데이트마다 설치본과 맞춘다. 클라이언트 설치 폴더를 직접 패치하는 도구(OUC)는 그 클라이언트에만 적용되고 업데이트마다 다시 적용해야 한다.",
      "en": "Ore UI screens are bundles of minified JS, CSS and HTML with hashes in the install folder `data/gui/dist/hbui/`. When the engine looks for an Ore UI file (`ui://…`), it looks at the pack stack before the install folder, but only at trusted packs (`isTrusted`). Trust is decided by the access strategy that opens the pack, and neither the UUID nor a marketplace signature is looked at. With plaintext packs (Zip and Directory strategies) only built-in packs in the install folder are trusted, so ordinary resource packs and plaintext server packs cannot change layout, behavior or CSS. The three encrypted pack strategies are always trusted, so the `hbui/<file>` of a pack opened with that strategy changes the HTML, JS and CSS of the in-game Ore UI pages (`gameplay.html`: death, bed, inventory, DDUI, trade and block screens). There are two ways to open it that way. (1) Without a server: if you put a 0-byte empty file `content.zipe` in the root of a local resource pack folder, the engine opens that pack with `DirectoryPackWithEncryptionAccessStrategy`. The engine only checks whether this file exists, and reads the plaintext files of the pack folder as they are without a key. When importing as a `.mcpack`, `manifest.json` and `content.zipe` must be directly at the top of the zip (one level deeper and the import fails with no message). A pack that carries the same fake encryption header in `contents.json` does not change. (2) A pack the server encrypts with any 32-byte content key and sends with the key (measured that sending the same pack as plaintext does not change anything). The JS of this page can read and write the vanilla DDUI data store, build a screen drawn according to the layout the server sent, and get presses and input back (OL chapters 3 and 6~9). The changed `gameplay.html` contains the hashed file names of the vanilla bundle, so match them to the install at every game update. A tool that patches the client install folder directly (OUC) applies only to that client and must be reapplied at every update."
    },
    "sources": "OUC 2장·3장, OL 3장·6장·7장·8장·9장"
  },
  "ALT-12": {
    "id": "ALT-12",
    "category": "ALT",
    "page": "reference/rules",
    "anchor": "alt-12",
    "proposal": false,
    "evidence": [
      "코드",
      "실측",
      "추론"
    ],
    "title": {
      "ko": "Ore UI가 게임 텍스처를 쓸 때는 `pack://textures/…png` URL로 요청하고, 이 경로는 신뢰하지 않는 서버 팩의 텍스처로도 풀린다(버튼 텍스처로 실측). 따라서 텍스처를 바꾸는 리소스팩은 Ore UI의 아이템·블록 아이콘에도 반영될 것이다(아이콘 자체는 따로 확인하지 않음). 번들 자체 이미지(`/hbui/assets/`)와 폰트(`gui/dist/hbui/fonts`)는 설치 폴더에서 읽어 팩으로 바뀌지 않는다.",
      "en": "When Ore UI uses game textures, it requests them with `pack://textures/...png` URLs, and this path also resolves to textures of untrusted server packs (measured with a button texture). So a resource pack that changes textures will probably also be reflected in Ore UI item and block icons (the icons themselves were not checked separately). The bundle's own images (`/hbui/assets/`) and fonts (`gui/dist/hbui/fonts`) are read from the install folder and are not changed by packs."
    },
    "detail": {
      "ko": "Ore UI가 게임 텍스처를 쓸 때는 `pack://textures/…png` URL로 요청하고, 이 경로는 신뢰하지 않는 서버 팩의 텍스처로도 풀린다(버튼 텍스처로 실측). 따라서 텍스처를 바꾸는 리소스팩은 Ore UI의 아이템·블록 아이콘에도 반영될 것이다(아이콘 자체는 따로 확인하지 않음). 번들 자체 이미지(`/hbui/assets/`)와 폰트(`gui/dist/hbui/fonts`)는 설치 폴더에서 읽어 팩으로 바뀌지 않는다.",
      "en": "When Ore UI uses game textures, it requests them with `pack://textures/…png` URLs, and this path resolves even for textures of an untrusted server pack (measured with button textures). So a resource pack that changes textures should also be reflected in Ore UI's item and block icons (the icons themselves were not checked separately). The bundle's own images (`/hbui/assets/`) and fonts (`gui/dist/hbui/fonts`) are read from the install folder and are not changed by packs."
    },
    "sources": "OUC 3장·4.6, OL 4장·6장"
  },
  "ALT-13": {
    "id": "ALT-13",
    "category": "ALT",
    "page": "reference/rules",
    "anchor": "alt-13",
    "proposal": false,
    "evidence": [
      "코드",
      "추론"
    ],
    "title": {
      "ko": "화면마다 JSON UI와 Ore UI 중 무엇을 쓸지 고르는 facet `vanilla.screenTechStack`(`getTechStackForScreen`, `getPreferredTechStackForScreen`, `selectTechStackForScreen`)이 있다. 두 구현이 공존하는 화면에서는 JSON UI 수정이 JSON UI 쪽이 선택됐을 때만 보인다고 보고, 수정이 안 보이면 먼저 그 화면이 어느 쪽으로 열렸는지 확인한다.",
      "en": "There is a facet `vanilla.screenTechStack` (`getTechStackForScreen`, `getPreferredTechStackForScreen`, `selectTechStackForScreen`) that chooses per screen whether to use JSON UI or Ore UI. On screens where both implementations coexist, JSON UI modifications are seen only when the JSON UI side is selected, so if a modification does not show, first check which side that screen opened on."
    },
    "detail": {
      "ko": "화면마다 JSON UI와 Ore UI 중 무엇을 쓸지 고르는 facet `vanilla.screenTechStack`(`getTechStackForScreen`, `getPreferredTechStackForScreen`, `selectTechStackForScreen`)이 있다. 두 구현이 공존하는 화면에서는 JSON UI 수정이 JSON UI 쪽이 선택됐을 때만 보인다고 보고, 수정이 안 보이면 먼저 그 화면이 어느 쪽으로 열렸는지 확인한다.",
      "en": "There is a facet `vanilla.screenTechStack` (`getTechStackForScreen`, `getPreferredTechStackForScreen`, `selectTechStackForScreen`) that chooses per screen whether to use JSON UI or Ore UI. For a screen where both implementations coexist, JSON UI modifications are assumed to show only when the JSON UI side is chosen, and if a modification does not show, first check which side that screen opened with."
    },
    "sources": "OUC 0장"
  },
  "ALT-14": {
    "id": "ALT-14",
    "category": "ALT",
    "page": "reference/rules",
    "anchor": "alt-14",
    "proposal": false,
    "evidence": [
      "코드",
      "추론"
    ],
    "title": {
      "ko": "Ore UI의 데이터 채널은 바인딩이 아니라 facet이다(`engine.trigger(\"facet:request\", 이름)` → `facet:updated:<이름>`). 게임 중 화면용 `vanilla.gameplay.*` facet(화로 진행도, 컨테이너 아이템·크기, 사망 정보, 리스폰, 침대, 좌표 HUD 등)이 있다는 것은 해당 화면이 Ore UI로 옮겨 가는 중이거나 옮겨 갔다는 신호다. JSON UI로 그 화면을 재스킨하는 작업은 이전 위험을 감안한다.",
      "en": "Ore UI's data channel is a facet and not a binding (`engine.trigger(\"facet:request\", name)`, then `facet:updated:<name>`). That `vanilla.gameplay.*` facets for in-game screens (furnace progress, container items and size, death info, respawn, bed, a coordinates HUD, and so on) exist is a sign that the screen is moving or has moved to Ore UI. Work that reskins such a screen with JSON UI should take the migration risk into account."
    },
    "detail": {
      "ko": "Ore UI의 데이터 채널은 바인딩이 아니라 facet이다(`engine.trigger(\"facet:request\", 이름)` → `facet:updated:<이름>`). 게임 중 화면용 `vanilla.gameplay.*` facet(화로 진행도, 컨테이너 아이템·크기, 사망 정보, 리스폰, 침대, 좌표 HUD 등)이 있다는 것은 해당 화면이 Ore UI로 옮겨 가는 중이거나 옮겨 갔다는 신호다. JSON UI로 그 화면을 재스킨하는 작업은 이전 위험을 감안한다.",
      "en": "The data channel of Ore UI is a facet, not a binding (`engine.trigger(\"facet:request\", name)` -> `facet:updated:<name>`). The existence of `vanilla.gameplay.*` facets for in-game screens (furnace progress, container items and size, death info, respawn, bed, coordinate HUD, etc.) is a signal that those screens are moving to Ore UI or have moved. Reskinning such a screen with JSON UI should account for the risk of migration."
    },
    "sources": "OUC 3장"
  },
  "ALT-15": {
    "id": "ALT-15",
    "category": "ALT",
    "page": "reference/rules",
    "anchor": "alt-15",
    "proposal": false,
    "evidence": [
      "코드",
      "실측"
    ],
    "title": {
      "ko": "엔진은 JSON UI 정의 두 개를 팩 스택에서 풀어 facet `vanilla.resourcePackOverrides`로 게임 중 Ore UI(`gameplay.html` 전체: 사망·침대·인벤토리·DDUI·거래 등)에 넘긴다. `common_buttons.light_text_button`의 하위 컨트롤 `default`·`hover`·`pressed`·`locked`에서 `$new_ui_button_texture`(배경, 나인슬라이스 포함), `$text_color`(글자색), `$border_color`(테두리색)를, `common_buttons.focus_border`에서 `texture`를 가져가 primary·secondary 버튼의 기본·hover/focus·pressed/selected·disabled 상태에 입힌다. 따라서 `_global_variables.json`의 `$light_button__text_color`나 `textures/ui/button_borderless_light.png`를 바꾼 팩은 Ore UI 사망 화면 버튼까지 바꾼다(서버 팩으로 실측). 다른 정의·속성은 넘어가지 않고, 게임 밖 메뉴 번들은 이 facet을 쓰지 않는다.",
      "en": "The engine resolves two JSON UI definitions from the pack stack and passes them with the facet `vanilla.resourcePackOverrides` to the in-game Ore UI (all of `gameplay.html`: death, bed, inventory, DDUI, trade, and so on). It takes `$new_ui_button_texture` (background, including nine-slice), `$text_color` (text color), and `$border_color` (border color) from the child controls `default`, `hover`, `pressed`, and `locked` of `common_buttons.light_text_button`, and `texture` from `common_buttons.focus_border`, and applies them to the default, hover/focus, pressed/selected, and disabled states of primary and secondary buttons. So a pack that changed `$light_button__text_color` in `_global_variables.json` or `textures/ui/button_borderless_light.png` also changes the buttons of the Ore UI death screen (measured with a server pack). Other definitions and properties are not passed over, and the out-of-game menu bundle does not use this facet."
    },
    "detail": {
      "ko": "엔진은 JSON UI 정의 두 개를 팩 스택에서 풀어 facet `vanilla.resourcePackOverrides`로 게임 중 Ore UI(`gameplay.html` 전체: 사망·침대·인벤토리·DDUI·거래 등)에 넘긴다. `common_buttons.light_text_button`의 하위 컨트롤 `default`·`hover`·`pressed`·`locked`에서 `$new_ui_button_texture`(배경, 나인슬라이스 포함), `$text_color`(글자색), `$border_color`(테두리색)를, `common_buttons.focus_border`에서 `texture`를 가져가 primary·secondary 버튼의 기본·hover/focus·pressed/selected·disabled 상태에 입힌다. 따라서 `_global_variables.json`의 `$light_button__text_color`나 `textures/ui/button_borderless_light.png`를 바꾼 팩은 Ore UI 사망 화면 버튼까지 바꾼다(서버 팩으로 실측). 다른 정의·속성은 넘어가지 않고, 게임 밖 메뉴 번들은 이 facet을 쓰지 않는다.",
      "en": "The engine resolves two JSON UI definitions from the pack stack and passes them through the facet `vanilla.resourcePackOverrides` to the in-game Ore UI (the whole `gameplay.html`: death, bed, inventory, DDUI, trade and so on). From the child controls `default`, `hover`, `pressed` and `locked` of `common_buttons.light_text_button` it takes `$new_ui_button_texture` (background, including the nine-slice), `$text_color` (text color) and `$border_color` (border color), and from `common_buttons.focus_border` it takes `texture`, and applies them to the default, hover/focus, pressed/selected and disabled states of primary and secondary buttons. So a pack that changes `$light_button__text_color` in `_global_variables.json` or `textures/ui/button_borderless_light.png` also changes the Ore UI death screen buttons (measured with a server pack). No other definitions or properties are passed, and the out-of-game menu bundle does not use this facet."
    },
    "sources": "OL 4장·6장"
  },
  "ALT-16": {
    "id": "ALT-16",
    "category": "ALT",
    "page": "reference/rules",
    "anchor": "alt-16",
    "proposal": false,
    "evidence": [
      "코드",
      "추론"
    ],
    "title": {
      "ko": "DDUI 레이아웃(`ddui/root/*.json` = `minecraft:ui-root`, `ddui/composition` = `minecraft:ui-composition`)은 리소스팩 폴더에서 읽지만, 엔진은 게임 내장(퍼스트파티) 팩으로 표시된 팩만 읽는다(POI의 `minecraft:` 이름공간 허용 판정과 같은 플래그). 사용자·서버 팩에 `ddui/root/custom_form.json`을 넣어도 쓰이지 않을 것이다. JS는 바닐라가 아닌 출처 팩의 레이아웃(`isCreatorDataDriven`, 자기 팩 이미지만 허용)을 이미 처리하므로, 엔진 검사가 풀리면 열릴 통로다.",
      "en": "DDUI layouts (`ddui/root/*.json` = `minecraft:ui-root`, `ddui/composition` = `minecraft:ui-composition`) are read from resource pack folders, but the engine reads only packs marked as built-in (first-party) (the same flag as the POI's allow check for the `minecraft:` namespace). Putting `ddui/root/custom_form.json` in a user or server pack probably will not be used. The JS already handles layouts from non-vanilla source packs (`isCreatorDataDriven`, allowing only the pack's own images), so it is a path that would open if the engine check were lifted."
    },
    "detail": {
      "ko": "DDUI 레이아웃(`ddui/root/*.json` = `minecraft:ui-root`, `ddui/composition` = `minecraft:ui-composition`)은 리소스팩 폴더에서 읽지만, 엔진은 게임 내장(퍼스트파티) 팩으로 표시된 팩만 읽는다(POI의 `minecraft:` 이름공간 허용 판정과 같은 플래그). 사용자·서버 팩에 `ddui/root/custom_form.json`을 넣어도 쓰이지 않을 것이다. JS는 바닐라가 아닌 출처 팩의 레이아웃(`isCreatorDataDriven`, 자기 팩 이미지만 허용)을 이미 처리하므로, 엔진 검사가 풀리면 열릴 통로다.",
      "en": "DDUI layouts (`ddui/root/*.json` = `minecraft:ui-root`, `ddui/composition` = `minecraft:ui-composition`) are read from resource pack folders, but the engine reads only packs marked as game built-in (first-party) packs (the same flag as the POI's `minecraft:` namespace allowance check). Even if you put `ddui/root/custom_form.json` in a user or server pack, it will probably not be used. JS already handles layouts from a non-vanilla source pack (`isCreatorDataDriven`, only its own pack's images allowed), so it is a route that would open if the engine check were lifted."
    },
    "sources": "OL 5장"
  },
  "ANI-01": {
    "id": "ANI-01",
    "category": "ANI",
    "page": "reference/rules",
    "anchor": "ani-01",
    "proposal": false,
    "evidence": [
      "바닐라"
    ],
    "title": {
      "ko": "`image`의 주요 속성(바닐라 사용 횟수): `texture`, `uv`/`uv_size`(40), `tiled`(44), `keep_ratio`(45), `bilinear`(50), `fill`(48), `color`, `alpha`, `clip_direction`(`left` 21, `down` 3, `up` 1, `right` 1), `clip_ratio`, `clip_pixelperfect`(21), `grayscale`(1), `force_texture_reload`(6), `zip_folder`(3). 그 밖에 `allow_debug_missing_texture`(4)와 `tiled`의 축 값(ANI-17)이 있다.",
      "en": "Main `image` properties (vanilla usage counts): `texture`, `uv`/`uv_size` (40), `tiled` (44), `keep_ratio` (45), `bilinear` (50), `fill` (48), `color`, `alpha`, `clip_direction` (`left` 21, `down` 3, `up` 1, `right` 1), `clip_ratio`, `clip_pixelperfect` (21), `grayscale` (1), `force_texture_reload` (6), `zip_folder` (3). There are also `allow_debug_missing_texture` (4) and the axis values of `tiled` (ANI-17)."
    },
    "detail": {
      "ko": "`image`의 주요 속성(바닐라 사용 횟수): `texture`, `uv`/`uv_size`(40), `tiled`(44), `keep_ratio`(45), `bilinear`(50), `fill`(48), `color`, `alpha`, `clip_direction`(`left` 21, `down` 3, `up` 1, `right` 1), `clip_ratio`, `clip_pixelperfect`(21), `grayscale`(1), `force_texture_reload`(6), `zip_folder`(3). 그 밖에 `allow_debug_missing_texture`(4)와 `tiled`의 축 값(ANI-17)이 있다.",
      "en": "The main properties of `image` (vanilla use counts): `texture`, `uv`/`uv_size` (40), `tiled` (44), `keep_ratio` (45), `bilinear` (50), `fill` (48), `color`, `alpha`, `clip_direction` (`left` 21, `down` 3, `up` 1, `right` 1), `clip_ratio`, `clip_pixelperfect` (21), `grayscale` (1), `force_texture_reload` (6), `zip_folder` (3). There are also `allow_debug_missing_texture` (4) and the axis values of `tiled` (ANI-17)."
    },
    "sources": "VN, BW-doc"
  },
  "ANI-02": {
    "id": "ANI-02",
    "category": "ANI",
    "page": "reference/rules",
    "anchor": "ani-02",
    "proposal": false,
    "evidence": [
      "작동팩",
      "바닐라"
    ],
    "title": {
      "ko": "텍스처 경로는 변수 식으로 조립할 수 있다: `\"texture\": \"('textures/my/bg/' + $tab_bg)\"`. 런타임에는 `#texture` 바인딩에 view 식으로 경로를 넣는다: `('textures/my/frames/' + #frame)`.",
      "en": "A texture path can be assembled with a variable expression: `\"texture\": \"('textures/my/bg/' + $tab_bg)\"`. At runtime, put the path into a `#texture` binding with a view expression: `('textures/my/frames/' + #frame)`."
    },
    "detail": {
      "ko": "텍스처 경로는 변수 식으로 조립할 수 있다: `\"texture\": \"('textures/my/bg/' + $tab_bg)\"`. 런타임에는 `#texture` 바인딩에 view 식으로 경로를 넣는다: `('textures/my/frames/' + #frame)`.",
      "en": "A texture path can be assembled with a variable expression: `\"texture\": \"('textures/my/bg/' + $tab_bg)\"`. At runtime, put the path into a `#texture` binding with a view expression: `('textures/my/frames/' + #frame)`."
    },
    "sources": "AP 4.9, BA 3.1, VN server_form.json:173"
  },
  "ANI-03": {
    "id": "ANI-03",
    "category": "ANI",
    "page": "reference/rules",
    "anchor": "ani-03",
    "proposal": false,
    "evidence": [
      "바닐라",
      "실측",
      "코드"
    ],
    "title": {
      "ko": "진행 막대는 `#clip_ratio`(0~1)를 바인딩하고 `clip_direction`으로 잘리는 쪽을 정한다. `clip_ratio`, `clip_direction`, `clip_pixelperfect`는 공식 스키마에 없지만 바닐라가 쓰는 속성이다. 정수 값에서 0~1 소수를 만들 때는 `(#v * .01)`처럼 점으로 시작하는 실수 리터럴을 쓴다. `(#v / 100)`은 정수 나눗셈이다(EXP-18, EXP-27). 바닐라는 `#clip_ratio` 바인딩에 `binding_condition`을 `always`(6) 또는 `always_when_visible`(6)로 준다.",
      "en": "A progress bar binds `#clip_ratio` (0~1) and decides the clipped side with `clip_direction`. `clip_ratio`, `clip_direction`, and `clip_pixelperfect` are not in the official schema but are properties vanilla uses. To make a 0~1 decimal from an integer value, use a real literal that starts with a dot, like `(#v * .01)`. `(#v / 100)` is integer division (EXP-18, EXP-27). Vanilla gives the `#clip_ratio` binding a `binding_condition` of `always` (6) or `always_when_visible` (6)."
    },
    "detail": {
      "ko": "진행 막대는 `#clip_ratio`(0~1)를 바인딩하고 `clip_direction`으로 잘리는 쪽을 정한다. `clip_ratio`, `clip_direction`, `clip_pixelperfect`는 공식 스키마에 없지만 바닐라가 쓰는 속성이다. 정수 값에서 0~1 소수를 만들 때는 `(#v * .01)`처럼 점으로 시작하는 실수 리터럴을 쓴다. `(#v / 100)`은 정수 나눗셈이다(EXP-18, EXP-27). 바닐라는 `#clip_ratio` 바인딩에 `binding_condition`을 `always`(6) 또는 `always_when_visible`(6)로 준다.",
      "en": "A progress bar binds `#clip_ratio` (0~1) and decides the clipped side with `clip_direction`. `clip_ratio`, `clip_direction` and `clip_pixelperfect` are not in the official schema but are properties vanilla uses. To make a 0~1 decimal from an integer value, use a dot-leading real literal like `(#v * .01)`. `(#v / 100)` is integer division (EXP-18, EXP-27). Vanilla gives the `#clip_ratio` binding `binding_condition` of `always` (6) or `always_when_visible` (6)."
    },
    "sources": "VN 33회, BC-facts, BA 3.2, BW-doc, CN"
  },
  "ANI-04": {
    "id": "ANI-04",
    "category": "ANI",
    "page": "reference/rules",
    "anchor": "ani-04",
    "proposal": false,
    "evidence": [
      "작동팩",
      "바닐라"
    ],
    "title": {
      "ko": "9-slice(텍스처 옆 `.json`의 `nineslice_size`, `base_size`)와 타일 배경(`\"tiled\": true`)은 3장 LAY-27·LAY-28을 따른다.",
      "en": "9-slice (`nineslice_size` and `base_size` in the `.json` next to the texture) and tiled backgrounds (`\"tiled\": true`) follow LAY-27 and LAY-28 in chapter 3."
    },
    "detail": {
      "ko": "9-slice는 텍스처 파일 옆에 같은 이름의 `.json`을 두고 `nineslice_size`(`[왼, 위, 오른, 아래]` 또는 한 값)와 `base_size`를 적는다. 바닐라 UI JSON은 `nineslice_size`를 리터럴 속성으로 쓰지 않고 바인딩(`#banner_nineslice_size` → `#nineslice_size`)으로 1회 쓴다(LAY-27). 반복 배경은 image에 `\"tiled\": true`를 준다(LAY-28, 바닐라 44회).",
      "en": "For 9-slice, put a `.json` of the same name next to the texture file and write `nineslice_size` (`[left, top, right, bottom]` or one value) and `base_size`. Vanilla UI JSON does not use `nineslice_size` as a literal property and uses it once through a binding (`#banner_nineslice_size` -> `#nineslice_size`) (LAY-27). For a repeating background, give the image `\"tiled\": true` (LAY-28, 44 uses in vanilla)."
    },
    "sources": "BA 5장, AP 4.9, VN"
  },
  "ANI-05": {
    "id": "ANI-05",
    "category": "ANI",
    "page": "reference/rules",
    "anchor": "ani-05",
    "proposal": false,
    "evidence": [
      "바닐라"
    ],
    "title": {
      "ko": "`\"type\": \"custom\"` + `\"renderer\": \"이름\"`이면 엔진이 그린다. 바닐라 1.26.50.4가 쓰는 렌더러는 43종이다(부록B). 렌더러 이름 목록을 외부 자료에서 가져올 때는 바닐라 목록과 대조한다. 한 외부 목록은 53개 중 10개가 바닐라에 없었다. 위키 렌더러 목록 41개 중 7개(`background_renderer` 등)는 바닐라 1.26.50에 없고, 바닐라의 9개(`locator_bar`, `qr_code_renderer` 등)는 위키에 없다.",
      "en": "With `\"type\": \"custom\"` + `\"renderer\": \"name\"` the engine draws. Vanilla 1.26.50.4 uses 43 renderers (Appendix B). When taking a renderer name list from external material, check it against the vanilla list. In one external list, 10 of 53 were not in vanilla. Of the wiki's list of 41 renderers, 7 (`background_renderer` and others) are not in vanilla 1.26.50, and 9 in vanilla (`locator_bar`, `qr_code_renderer`, and others) are not in the wiki."
    },
    "detail": {
      "ko": "`\"type\": \"custom\"` + `\"renderer\": \"이름\"`이면 엔진이 그린다. 바닐라 1.26.50.4가 쓰는 렌더러는 43종이다(부록B). 렌더러 이름 목록을 외부 자료에서 가져올 때는 바닐라 목록과 대조한다. 한 외부 목록은 53개 중 10개가 바닐라에 없었다. 위키 렌더러 목록 41개 중 7개(`background_renderer` 등)는 바닐라 1.26.50에 없고, 바닐라의 9개(`locator_bar`, `qr_code_renderer` 등)는 위키에 없다.",
      "en": "With `\"type\": \"custom\"` + `\"renderer\": \"name\"`, the engine draws. The renderers vanilla 1.26.50.4 uses are 43 kinds (Appendix B). When importing a renderer name list from an external source, check it against the vanilla list. One external list had 10 of 53 not in vanilla. Of the wiki's 41 renderers, 7 (`background_renderer`, etc.) are not in vanilla 1.26.50, and 9 of vanilla's (`locator_bar`, `qr_code_renderer`, etc.) are not in the wiki."
    },
    "sources": "VN, MJ 4.2, BW-doc"
  },
  "ANI-06": {
    "id": "ANI-06",
    "category": "ANI",
    "page": "reference/rules",
    "anchor": "ani-06",
    "proposal": false,
    "evidence": [
      "작동팩",
      "실측",
      "충돌"
    ],
    "title": {
      "ko": "아이템 아이콘은 `inventory_item_renderer`에 `#item_id_aux`를 준다. 값은 `숫자 아이템 ID × 65536 (+ 데이터 값)`이다. 상수면 `property_bag`에 넣고, 런타임 값이면 바인딩한다. 숫자 ID는 커스텀 아이템이 등록되면 일부가 밀려 월드마다 다를 수 있다. 밀리는 경계는 출처마다 다르다(BC 기록은 256 이상, 위키의 1.26.50 표는 -1246~851 안정, 852~883만 밀림). 쓰기 전에 그 버전의 표나 게임에서 확인한다. 가능하면 텍스처 경로를 쓴다.",
      "en": "An item icon gives `#item_id_aux` to `inventory_item_renderer`. The value is `numeric item ID × 65536 (+ data value)`. If constant, put it in `property_bag`, and if a runtime value, bind it. Numeric IDs shift partly when custom items are registered, so they can differ per world. The shift boundary differs per source (the BC record says 256 and above, the wiki's 1.26.50 table says -1246~851 is stable and only 852~883 shifts). Check against that version's table or in game before use. Use a texture path where possible."
    },
    "detail": {
      "ko": "아이템 아이콘은 `inventory_item_renderer`에 `#item_id_aux`를 준다. 값은 `숫자 아이템 ID × 65536 (+ 데이터 값)`이다. 상수면 `property_bag`에 넣고, 런타임 값이면 바인딩한다. 숫자 ID는 커스텀 아이템이 등록되면 일부가 밀려 월드마다 다를 수 있다. 밀리는 경계는 출처마다 다르다(BC 기록은 256 이상, 위키의 1.26.50 표는 -1246~851 안정, 852~883만 밀림). 쓰기 전에 그 버전의 표나 게임에서 확인한다. 가능하면 텍스처 경로를 쓴다.",
      "en": "An item icon gives `#item_id_aux` to `inventory_item_renderer`. The value is `numeric item ID x 65536 (+ data value)`. If constant, put it in `property_bag`, and if a runtime value, bind it. Numeric IDs partly shift when custom items are registered and can differ per world. The boundary where they shift differs by source (the BC record says 256 and above, the wiki's 1.26.50 table says -1246~851 are stable and only 852~883 shift). Check that version's table or the game before use. Use a texture path when possible."
    },
    "sources": "AP 4.7, BC-facts, BW-ids, 부록A C-33"
  },
  "ANI-07": {
    "id": "ANI-07",
    "category": "ANI",
    "page": "reference/rules",
    "anchor": "ani-07",
    "proposal": false,
    "evidence": [
      "바닐라"
    ],
    "title": {
      "ko": "바닐라 HUD의 커서(`cursor_renderer`)는 1.26.50에서 HUD 루트의 인스턴스가 빠지고 `hud_crosshair_overlay.json`에서 참조된다(정의는 `hud_screen.json:608`에 남아 있다). 이것을 기준점으로 쓰던 HUD 수정은 깨진다.",
      "en": "The vanilla HUD cursor (`cursor_renderer`) had its instance removed from the HUD root in 1.26.50 and is referenced from `hud_crosshair_overlay.json` (the definition remains at `hud_screen.json:608`). HUD modifications that used this as an anchor point break."
    },
    "detail": {
      "ko": "바닐라 HUD의 커서(`cursor_renderer`)는 1.26.50에서 HUD 루트의 인스턴스가 빠지고 `hud_crosshair_overlay.json`에서 참조된다(정의는 `hud_screen.json:608`에 남아 있다). 이것을 기준점으로 쓰던 HUD 수정은 깨진다.",
      "en": "In 1.26.50 the vanilla HUD cursor (`cursor_renderer`) lost its instance at the HUD root and is referenced from `hud_crosshair_overlay.json` (the definition remains at `hud_screen.json:608`). HUD modifications that used this as a reference point break."
    },
    "sources": "VN hud_crosshair_overlay.json:4, MJ 4.1"
  },
  "ANI-08": {
    "id": "ANI-08",
    "category": "ANI",
    "page": "reference/rules",
    "anchor": "ani-08",
    "proposal": false,
    "evidence": [
      "바닐라",
      "코드"
    ],
    "title": {
      "ko": "`anim_type` 값(바닐라 횟수): `alpha` 54, `offset` 42, `flip_book` 34, `wait` 30, `size` 7, `color` 3, `aseprite_flip_book` 2, `uv` 1. 위키와 Cinnabar(1.26.50 엔진 enum)는 `clip`도 적어 9가지다(ANI-20). 바닐라 사용은 0회이고 무엇을 자르는지는 확인되지 않았다(부록A C-38).",
      "en": "`anim_type` values (vanilla counts): `alpha` 54, `offset` 42, `flip_book` 34, `wait` 30, `size` 7, `color` 3, `aseprite_flip_book` 2, `uv` 1. The wiki and Cinnabar (the 1.26.50 engine enum) also list `clip`, making 9 (ANI-20). Its vanilla usage is 0 and what it clips is not confirmed (Appendix A C-38)."
    },
    "detail": {
      "ko": "`anim_type` 값(바닐라 횟수): `alpha` 54, `offset` 42, `flip_book` 34, `wait` 30, `size` 7, `color` 3, `aseprite_flip_book` 2, `uv` 1. 위키와 Cinnabar(1.26.50 엔진 enum)는 `clip`도 적어 9가지다(ANI-20). 바닐라 사용은 0회이고 무엇을 자르는지는 확인되지 않았다(부록A C-38).",
      "en": "`anim_type` values (vanilla counts): `alpha` 54, `offset` 42, `flip_book` 34, `wait` 30, `size` 7, `color` 3, `aseprite_flip_book` 2, `uv` 1. The wiki and Cinnabar (the 1.26.50 engine enum) also list `clip`, making 9 kinds (ANI-20). Vanilla uses it 0 times and what it clips was not confirmed (Appendix A C-38)."
    },
    "sources": "VN, CN"
  },
  "ANI-09": {
    "id": "ANI-09",
    "category": "ANI",
    "page": "reference/rules",
    "anchor": "ani-09",
    "proposal": false,
    "evidence": [
      "바닐라"
    ],
    "title": {
      "ko": "애니메이션 필드: `from`, `to`, `duration`, `easing`, `next`(다음 애니메이션 참조), `destroy_at_end`, `play_event`, `end_event`, `reset_event`, `reversible`, `resettable`, `looping`, 플립북용 `initial_uv`, `frame_count`, `frame_step`, `fps`.",
      "en": "Animation fields: `from`, `to`, `duration`, `easing`, `next` (reference to the next animation), `destroy_at_end`, `play_event`, `end_event`, `reset_event`, `reversible`, `resettable`, `looping`, and for flipbooks `initial_uv`, `frame_count`, `frame_step`, `fps`."
    },
    "detail": {
      "ko": "애니메이션 필드: `from`, `to`, `duration`, `easing`, `next`(다음 애니메이션 참조), `destroy_at_end`, `play_event`, `end_event`, `reset_event`, `reversible`, `resettable`, `looping`, 플립북용 `initial_uv`, `frame_count`, `frame_step`, `fps`.",
      "en": "Animation fields: `from`, `to`, `duration`, `easing`, `next` (a reference to the next animation), `destroy_at_end`, `play_event`, `end_event`, `reset_event`, `reversible`, `resettable`, `looping`, and for flipbooks `initial_uv`, `frame_count`, `frame_step` and `fps`."
    },
    "sources": "VN 필드별 집계"
  },
  "ANI-10": {
    "id": "ANI-10",
    "category": "ANI",
    "page": "reference/rules",
    "anchor": "ani-10",
    "proposal": false,
    "evidence": [
      "바닐라",
      "작동팩"
    ],
    "title": {
      "ko": "`easing`은 바닐라가 쓰는 값을 우선한다: `linear`, `out_cubic`, `in_expo`, `in_quart`, `in_quint`, `out_expo`, `in_sine`, `in_out_back`, `out_sine`, `out_bounce`, `out_back`, `in_out_expo`, `in_out_circ`, `in_bounce`. 외부 목록의 이징 32개 중 18개는 바닐라에 없다. `in_back`은 BA가 쓴다. 이 32개는 위키 목록과 같고, 바닐라 14개는 모두 그 안에 있다.",
      "en": "For `easing`, prefer the values vanilla uses: `linear`, `out_cubic`, `in_expo`, `in_quart`, `in_quint`, `out_expo`, `in_sine`, `in_out_back`, `out_sine`, `out_bounce`, `out_back`, `in_out_expo`, `in_out_circ`, `in_bounce`. Of the 32 easings in external lists, 18 are not in vanilla. `in_back` is used by BA. These 32 are the same as the wiki list, and all 14 in vanilla are inside it."
    },
    "detail": {
      "ko": "`easing`은 바닐라가 쓰는 값을 우선한다: `linear`, `out_cubic`, `in_expo`, `in_quart`, `in_quint`, `out_expo`, `in_sine`, `in_out_back`, `out_sine`, `out_bounce`, `out_back`, `in_out_expo`, `in_out_circ`, `in_bounce`. 외부 목록의 이징 32개 중 18개는 바닐라에 없다. `in_back`은 BA가 쓴다. 이 32개는 위키 목록과 같고, 바닐라 14개는 모두 그 안에 있다.",
      "en": "For `easing`, prefer the values vanilla uses: `linear`, `out_cubic`, `in_expo`, `in_quart`, `in_quint`, `out_expo`, `in_sine`, `in_out_back`, `out_sine`, `out_bounce`, `out_back`, `in_out_expo`, `in_out_circ`, `in_bounce`. Of the 32 easings in the external list, 18 are not in vanilla. `in_back` is used by BA. These 32 are the same as the wiki list, and all 14 of vanilla's are among them."
    },
    "sources": "VN, MJ 4.2, BA 6장, BW-doc"
  },
  "ANI-11": {
    "id": "ANI-11",
    "category": "ANI",
    "page": "reference/rules",
    "anchor": "ani-11",
    "proposal": false,
    "evidence": [
      "바닐라",
      "작동팩"
    ],
    "title": {
      "ko": "애니메이션은 `\"anims\": [ \"@ns.이름\" ]`로 붙이거나 속성 값에 직접 참조한다(`\"alpha\": \"@hud.anim_title_text_alpha_in\"`). 다른 namespace의 애니메이션을 바닐라 요소에 붙일 수도 있다.",
      "en": "Attach an animation with `\"anims\": [ \"@ns.name\" ]` or reference it directly in a property value (`\"alpha\": \"@hud.anim_title_text_alpha_in\"`). An animation from another namespace can also be attached to a vanilla element."
    },
    "detail": {
      "ko": "애니메이션은 `\"anims\": [ \"@ns.이름\" ]`로 붙이거나 속성 값에 직접 참조한다(`\"alpha\": \"@hud.anim_title_text_alpha_in\"`). 다른 namespace의 애니메이션을 바닐라 요소에 붙일 수도 있다.",
      "en": "Attach an animation with `\"anims\": [ \"@ns.name\" ]` or reference it directly in a property value (`\"alpha\": \"@hud.anim_title_text_alpha_in\"`). You can also attach an animation of another namespace to a vanilla element."
    },
    "sources": "VN hud_screen.json:2272, AP 4.5"
  },
  "ANI-12": {
    "id": "ANI-12",
    "category": "ANI",
    "page": "reference/rules",
    "anchor": "ani-12",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "팩토리가 컨트롤을 새로 만들 때마다 애니메이션은 처음부터 다시 재생된다. 타이틀을 보낼 때마다 토스트가 슬라이드인 하는 이유다.",
      "en": "Each time a factory creates a control anew, the animation plays again from the start. This is why a toast slides in every time a title is sent."
    },
    "detail": {
      "ko": "팩토리가 컨트롤을 새로 만들 때마다 애니메이션은 처음부터 다시 재생된다. 타이틀을 보낼 때마다 토스트가 슬라이드인 하는 이유다.",
      "en": "Every time a factory newly creates a control, the animation plays from the beginning again. That is why a toast slides in each time a title is sent."
    },
    "sources": "BA 6장, BW-intro"
  },
  "ANI-13": {
    "id": "ANI-13",
    "category": "ANI",
    "page": "reference/rules",
    "anchor": "ani-13",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "사라진 항목의 높이를 `size` 애니메이션으로 0까지 줄이면 스택 패널의 다음 항목이 부드럽게 올라온다.",
      "en": "Shrinking the height of a removed item to 0 with a `size` animation makes the next item in a stack panel rise smoothly."
    },
    "detail": {
      "ko": "사라진 항목의 높이를 `size` 애니메이션으로 0까지 줄이면 스택 패널의 다음 항목이 부드럽게 올라온다.",
      "en": "If you shrink the height of a vanished item to 0 with a `size` animation, the next items of a stack panel rise smoothly."
    },
    "sources": "AP 4.5"
  },
  "ANI-14": {
    "id": "ANI-14",
    "category": "ANI",
    "page": "reference/rules",
    "anchor": "ani-14",
    "proposal": false,
    "evidence": [
      "바닐라",
      "코드",
      "추론"
    ],
    "title": {
      "ko": "`destroy_at_end`의 값은 바닐라에서 팩토리가 만든 컨트롤 이름(`hud_title_text`), 그 기반 정의 이름(채팅: 인스턴스 `chat_item`, 값 `chat_grid_item`), 변수(`$toast_control`)가 모두 쓰인다. 어떤 이름과 맞춰야 실제로 파괴되는지는 확인되지 않았다. 팩토리 개수 한도(`max_children_size`)로 누적을 함께 막는다. Cinnabar 재구성에서 `destroy_at_end`는 그 컨트롤과 조상 중 인스턴스 이름이 일치하는 가장 가까운 것을 지우고, 채팅 컨트롤러는 만든 줄에 인스턴스 이름 `chat_grid_item`을 준다(ANI-21). 그렇다면 바닐라 채팅의 값과 맞는다.",
      "en": "For the value of `destroy_at_end`, vanilla uses the name of the control a factory creates (`hud_title_text`), the name of its base definition (chat: instance `chat_item`, value `chat_grid_item`), and a variable (`$toast_control`). Which name must match for it to actually be destroyed is not confirmed. Also prevent accumulation with the factory count limit (`max_children_size`). In the Cinnabar reconstruction, `destroy_at_end` erases the nearest one among that control and its ancestors whose instance name matches, and the chat controller gives the line it creates the instance name `chat_grid_item` (ANI-21). If so, it matches the vanilla chat value."
    },
    "detail": {
      "ko": "`destroy_at_end`의 값은 바닐라에서 팩토리가 만든 컨트롤 이름(`hud_title_text`), 그 기반 정의 이름(채팅: 인스턴스 `chat_item`, 값 `chat_grid_item`), 변수(`$toast_control`)가 모두 쓰인다. 어떤 이름과 맞춰야 실제로 파괴되는지는 확인되지 않았다. 팩토리 개수 한도(`max_children_size`)로 누적을 함께 막는다. Cinnabar 재구성에서 `destroy_at_end`는 그 컨트롤과 조상 중 인스턴스 이름이 일치하는 가장 가까운 것을 지우고, 채팅 컨트롤러는 만든 줄에 인스턴스 이름 `chat_grid_item`을 준다(ANI-21). 그렇다면 바닐라 채팅의 값과 맞는다.",
      "en": "The value of `destroy_at_end` in vanilla uses the name of the control the factory created (`hud_title_text`), the name of its base definition (chat: instance `chat_item`, value `chat_grid_item`) and a variable (`$toast_control`). Which name it must match to actually be destroyed was not confirmed. Also stop accumulation with the factory count limit (`max_children_size`). In the Cinnabar reconstruction, `destroy_at_end` erases the nearest among that control and its ancestors whose instance name matches, and the chat controller gives the lines it creates the instance name `chat_grid_item` (ANI-21). Then it matches the value in vanilla chat."
    },
    "sources": "VN hud_screen.json:949·2213, AP 4.5, 부록A C-27, CN"
  },
  "ANI-15": {
    "id": "ANI-15",
    "category": "ANI",
    "page": "reference/rules",
    "anchor": "ani-15",
    "proposal": false,
    "evidence": [
      "바닐라",
      "작동팩"
    ],
    "title": {
      "ko": "플립북 아이콘은 `\"uv\": \"@ns.anim\"`(`anim_type: aseprite_flip_book`) + `\"uv_size\"` + 텍스처 옆 Aseprite JSON(`frames[].frame`, `duration`)으로 만든다. Aseprite에서는 JSON을 Array 형식으로 내보낸다(Hash는 동작하지 않는다고 한다). 텍스처와 JSON은 확장자 없이 같은 이름이고, `aseprite_flip_book`은 image의 `uv`에만 건다.",
      "en": "A flipbook icon is made with `\"uv\": \"@ns.anim\"` (`anim_type: aseprite_flip_book`) + `\"uv_size\"` + an Aseprite JSON next to the texture (`frames[].frame`, `duration`). In Aseprite, export the JSON in Array format (Hash reportedly does not work). The texture and JSON have the same name without an extension, and `aseprite_flip_book` is applied only to the `uv` of an image."
    },
    "detail": {
      "ko": "플립북 아이콘은 `\"uv\": \"@ns.anim\"`(`anim_type: aseprite_flip_book`) + `\"uv_size\"` + 텍스처 옆 Aseprite JSON(`frames[].frame`, `duration`)으로 만든다. Aseprite에서는 JSON을 Array 형식으로 내보낸다(Hash는 동작하지 않는다고 한다). 텍스처와 JSON은 확장자 없이 같은 이름이고, `aseprite_flip_book`은 image의 `uv`에만 건다.",
      "en": "A flipbook icon is made with `\"uv\": \"@ns.anim\"` (`anim_type: aseprite_flip_book`) + `\"uv_size\"` + the Aseprite JSON next to the texture (`frames[].frame`, `duration`). In Aseprite, export the JSON in the Array format (Hash is said not to work). The texture and JSON have the same name without an extension, and `aseprite_flip_book` is applied only to the `uv` of an image."
    },
    "sources": "VN 2회, AP 4.7, BW-ase"
  },
  "ANI-16": {
    "id": "ANI-16",
    "category": "ANI",
    "page": "reference/rules",
    "anchor": "ani-16",
    "proposal": false,
    "evidence": [
      "바닐라",
      "추론"
    ],
    "title": {
      "ko": "바닐라 타이틀 애니메이션 시간은 엔진 변수(`$title_fade_in_time`, `$title_fade_out_time`)로 들어온다. `/title times` 값이 여기에 반영되는 것으로 보인다.",
      "en": "Vanilla title animation times come in as engine variables (`$title_fade_in_time`, `$title_fade_out_time`). The `/title times` values seem to be reflected here."
    },
    "detail": {
      "ko": "바닐라 타이틀 애니메이션 시간은 엔진 변수(`$title_fade_in_time`, `$title_fade_out_time`)로 들어온다. `/title times` 값이 여기에 반영되는 것으로 보인다.",
      "en": "The vanilla title animation times come in as engine variables (`$title_fade_in_time`, `$title_fade_out_time`). It appears that the `/title times` values are reflected here."
    },
    "sources": "VN hud_screen.json:2170·2185"
  },
  "ANI-17": {
    "id": "ANI-17",
    "category": "ANI",
    "page": "reference/rules",
    "anchor": "ani-17",
    "proposal": false,
    "evidence": [
      "바닐라"
    ],
    "title": {
      "ko": "`tiled`는 `true`(23)뿐 아니라 한 축만 반복하는 `\"x\"`(8), `\"y\"`(12)도 받는다. 반복 단위 배율은 `tiled_scale`(3).",
      "en": "`tiled` accepts not only `true` (23) but also `\"x\"` (8) and `\"y\"` (12), which repeat on only one axis. The repeat unit scale is `tiled_scale` (3)."
    },
    "detail": {
      "ko": "`tiled`는 `true`(23)뿐 아니라 한 축만 반복하는 `\"x\"`(8), `\"y\"`(12)도 받는다. 반복 단위 배율은 `tiled_scale`(3).",
      "en": "`tiled` accepts not only `true` (23) but also `\"x\"` (8) and `\"y\"` (12), which repeat on one axis only. The repeat unit scale is `tiled_scale` (3)."
    },
    "sources": "BW-doc Sprite 표, VN"
  },
  "ANI-18": {
    "id": "ANI-18",
    "category": "ANI",
    "page": "reference/rules",
    "anchor": "ani-18",
    "proposal": false,
    "evidence": [
      "미검증"
    ],
    "title": {
      "ko": "그리드 안의 컨트롤에서 `next`로 이은 애니메이션은 첫 애니메이션 뒤로 지속 시간이 항목 수만큼 나뉘어 빨라지는 버그가 있다(`flip_book` 제외). 그리드 항목에는 반복 애니메이션을 한 단계로 쓰거나 `looping`을 쓴다.",
      "en": "For a control inside a grid, an animation chained with `next` has a bug where after the first animation the duration is divided by the item count and gets faster (except `flip_book`). For grid items, use a repeating animation as a single step or use `looping`."
    },
    "detail": {
      "ko": "그리드 안의 컨트롤에서 `next`로 이은 애니메이션은 첫 애니메이션 뒤로 지속 시간이 항목 수만큼 나뉘어 빨라지는 버그가 있다(`flip_book` 제외). 그리드 항목에는 반복 애니메이션을 한 단계로 쓰거나 `looping`을 쓴다.",
      "en": "For a control inside a grid, an animation chained with `next` has a bug where after the first animation the duration is divided by the number of items and it speeds up (except `flip_book`). For grid items, use a repeating animation as one stage or use `looping`."
    },
    "sources": "BW-dyn"
  },
  "ANI-19": {
    "id": "ANI-19",
    "category": "ANI",
    "page": "reference/rules",
    "anchor": "ani-19",
    "proposal": false,
    "evidence": [
      "바닐라"
    ],
    "title": {
      "ko": "바닐라가 쓰는 추가 애니메이션 필드: `start_event`(1), `scale_from_starting_alpha`(4), `activated`(2). 컨트롤 쪽: `animation_reset_name`(26), `disable_anim_fast_forward`(21).",
      "en": "Additional animation fields vanilla uses: `start_event` (1), `scale_from_starting_alpha` (4), `activated` (2). On the control side: `animation_reset_name` (26), `disable_anim_fast_forward` (21)."
    },
    "detail": {
      "ko": "바닐라가 쓰는 추가 애니메이션 필드: `start_event`(1), `scale_from_starting_alpha`(4), `activated`(2). 컨트롤 쪽: `animation_reset_name`(26), `disable_anim_fast_forward`(21).",
      "en": "Additional animation fields vanilla uses: `start_event` (1), `scale_from_starting_alpha` (4), `activated` (2). On the control side: `animation_reset_name` (26), `disable_anim_fast_forward` (21)."
    },
    "sources": "BW-doc Animations 표, VN"
  },
  "ANI-20": {
    "id": "ANI-20",
    "category": "ANI",
    "page": "reference/rules",
    "anchor": "ani-20",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "애니메이션 타입은 `alpha`, `clip`, `color`, `flip_book`, `aseprite_flip_book`, `offset`, `size`, `uv`, `wait` 9가지다(1.26.50 enum).",
      "en": "The animation types are 9: `alpha`, `clip`, `color`, `flip_book`, `aseprite_flip_book`, `offset`, `size`, `uv`, `wait` (the 1.26.50 enum)."
    },
    "detail": {
      "ko": "애니메이션 타입은 `alpha`, `clip`, `color`, `flip_book`, `aseprite_flip_book`, `offset`, `size`, `uv`, `wait` 9가지다(1.26.50 enum).",
      "en": "There are 9 animation types: `alpha`, `clip`, `color`, `flip_book`, `aseprite_flip_book`, `offset`, `size`, `uv` and `wait` (the 1.26.50 enum)."
    },
    "sources": "CN, C-38"
  },
  "ANI-21": {
    "id": "ANI-21",
    "category": "ANI",
    "page": "reference/rules",
    "anchor": "ani-21",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "`destroy_at_end`는 그 애니메이션을 가진 컨트롤과 조상 중 인스턴스 이름이 일치하는 가장 가까운 것을 지운다.",
      "en": "`destroy_at_end` erases the nearest one among the control that holds that animation and its ancestors whose instance name matches."
    },
    "detail": {
      "ko": "`destroy_at_end`는 그 애니메이션을 가진 컨트롤과 조상 중 인스턴스 이름이 일치하는 가장 가까운 것을 지운다.",
      "en": "`destroy_at_end` erases the nearest among the control that has that animation and its ancestors whose instance name matches."
    },
    "sources": "CN, C-27"
  },
  "ANI-22": {
    "id": "ANI-22",
    "category": "ANI",
    "page": "reference/rules",
    "anchor": "ani-22",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "이미지는 9-slice, `clip_ratio`, `tiled`, `fill`, `keep_ratio`, 늘리기 순서로 그리는 방식을 고른다. `clip_pixelperfect`(기본 켬)는 원본 픽셀 단위로 자른다. `color`는 `[r,g,b,a]` 외에 `#rrggbb`도 된다.",
      "en": "An image picks its drawing method in the order 9-slice, `clip_ratio`, `tiled`, `fill`, `keep_ratio`, stretch. `clip_pixelperfect` (on by default) clips in source pixel units. `color` can be `#rrggbb` as well as `[r,g,b,a]`."
    },
    "detail": {
      "ko": "이미지는 9-slice, `clip_ratio`, `tiled`, `fill`, `keep_ratio`, 늘리기 순서로 그리는 방식을 고른다. `clip_pixelperfect`(기본 켬)는 원본 픽셀 단위로 자른다. `color`는 `[r,g,b,a]` 외에 `#rrggbb`도 된다.",
      "en": "An image chooses how to draw in the order 9-slice, `clip_ratio`, `tiled`, `fill`, `keep_ratio`, stretching. `clip_pixelperfect` (default on) clips in original pixel units. `color` can be `#rrggbb` as well as `[r,g,b,a]`."
    },
    "sources": "CN"
  },
  "ANI-34": {
    "id": "ANI-34",
    "category": "ANI",
    "page": "reference/rules",
    "anchor": "ani-34",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "클라이언트는 흑백(grayscale) PNG를 반투명하게 그렸다(회색 틀 너머로 창이 비침). 텍스처 최적화 도구가 회색 그림을 흑백으로 바꾸므로 팩의 PNG는 RGB·RGBA로 둔다.",
      "en": "The client drew a grayscale PNG translucent (the window showed through the gray frame). Texture optimization tools convert gray pictures to grayscale, so keep the pack's PNGs as RGB or RGBA."
    },
    "detail": {
      "ko": "클라이언트는 흑백(grayscale) PNG를 반투명하게 그렸다(회색 틀 너머로 창이 비침). 텍스처 최적화 도구가 회색 그림을 흑백으로 바꾸므로 팩의 PNG는 RGB·RGBA로 둔다.",
      "en": "The client drew a grayscale PNG translucently (the window showed through the gray frame). Texture optimization tools convert gray images to grayscale, so keep a pack's PNGs as RGB or RGBA."
    },
    "sources": "DF"
  },
  "ANI-35": {
    "id": "ANI-35",
    "category": "ANI",
    "page": "reference/rules",
    "anchor": "ani-35",
    "proposal": false,
    "evidence": [
      "바닐라"
    ],
    "title": {
      "ko": "국제판 `paper_doll_renderer`는 엔진이 바인딩으로 주는 플레이어 스킨만 그린다(`#paper_doll_skin`, `#skin_index`, `#classic_skin_index`). 바닐라가 쓰는 속성은 `use_selected_skin`(12, 모두 `false`), `rotation`(`gesture_x` 6, `auto` 1), `camera_tilt_degrees`(8, 모두 `-10`), `starting_rotation`(8, 모두 `30`), `enable_scissor_test`(4, 모두 `true`), `property_bag`의 `#skin_rotation`(2)이다. 끌어서 돌리려면 `input_panel`에 `\"gesture_tracking_button\": \"button.turn_doll\"`과 그 버튼 매핑을 두고, 종이 인형이 view 바인딩으로 그 패널의 `#gesture_delta_source`·`#gesture_mouse_delta_x`를 받는다.",
      "en": "The international `paper_doll_renderer` draws only the player skin that the engine supplies through bindings (`#paper_doll_skin`, `#skin_index`, `#classic_skin_index`). The properties vanilla uses are `use_selected_skin` (12, all `false`), `rotation` (`gesture_x` 6, `auto` 1), `camera_tilt_degrees` (8, all `-10`), `starting_rotation` (8, all `30`), `enable_scissor_test` (4, all `true`), and `#skin_rotation` in `property_bag` (2). To rotate it by dragging, put `\"gesture_tracking_button\": \"button.turn_doll\"` and its button mapping on an `input_panel`, and the paper doll receives that panel's `#gesture_delta_source` and `#gesture_mouse_delta_x` with view bindings."
    },
    "detail": {
      "ko": "국제판 `paper_doll_renderer`는 엔진이 바인딩으로 주는 플레이어 스킨만 그린다(`#paper_doll_skin`, `#skin_index`, `#classic_skin_index`). 바닐라가 쓰는 속성은 `use_selected_skin`(12, 모두 `false`), `rotation`(`gesture_x` 6, `auto` 1), `camera_tilt_degrees`(8, 모두 `-10`), `starting_rotation`(8, 모두 `30`), `enable_scissor_test`(4, 모두 `true`), `property_bag`의 `#skin_rotation`(2)이다. 끌어서 돌리려면 `input_panel`에 `\"gesture_tracking_button\": \"button.turn_doll\"`과 그 버튼 매핑을 두고, 종이 인형이 view 바인딩으로 그 패널의 `#gesture_delta_source`·`#gesture_mouse_delta_x`를 받는다.",
      "en": "The international `paper_doll_renderer` draws only the player skin that the engine gives through bindings (`#paper_doll_skin`, `#skin_index`, `#classic_skin_index`). The properties vanilla uses are `use_selected_skin` (12, all `false`), `rotation` (`gesture_x` 6, `auto` 1), `camera_tilt_degrees` (8, all `-10`), `starting_rotation` (8, all `30`), `enable_scissor_test` (4, all `true`) and `#skin_rotation` of `property_bag` (2). To rotate it by dragging, put `\"gesture_tracking_button\": \"button.turn_doll\"` and its button mapping on an `input_panel`, and the paper doll receives `#gesture_delta_source` and `#gesture_mouse_delta_x` of that panel with a view binding."
    },
    "sources": "VN pause_screen.json:320, VN pause_screen.json:348, VN day_one_experience_screen.json:201, NB-12"
  },
  "ANI-36": {
    "id": "ANI-36",
    "category": "ANI",
    "page": "reference/rules",
    "anchor": "ani-36",
    "proposal": false,
    "evidence": [
      "코드",
      "바닐라",
      "추론"
    ],
    "title": {
      "ko": "NetEase 문서의 UI 3D 모델 기능, 곧 `paper_doll`의 `modelname`·`modelsize`·`animation`·`animation_looped`와 `netease_paper_doll_renderer`(`skeleton_model_name`, `entity_identifier`, `screen_scale`, `init_rot_x/y/z`, `freedom_gesture`, Python `RenderEntity`·`RenderSkeletonModel`)는 중국판 전용이다. 국제판 바이너리에 `netease` 문자열이 0개이고 이 속성들의 긴 이름도 없으며, 바닐라도 한 번도 쓰지 않는다. 국제판 팩은 UI에 커스텀 모델·엔티티를 그릴 수 없으므로 월드 엔티티나 파티클(ALT-01)을 쓴다. 짧은 이름은 바이너리 문자열로 판정할 수 없어(`paper_doll_renderer`도 0개) 결론은 긴 이름에 기댄다.",
      "en": "The NetEase documentation's UI 3D model features, namely `modelname`, `modelsize`, `animation`, and `animation_looped` of `paper_doll` and `netease_paper_doll_renderer` (`skeleton_model_name`, `entity_identifier`, `screen_scale`, `init_rot_x/y/z`, `freedom_gesture`, the Python `RenderEntity` and `RenderSkeletonModel`), are China edition only. The international binary has 0 `netease` strings and none of the long names of these properties, and vanilla never uses them. An international pack cannot draw custom models or entities in UI, so use world entities or particles (ALT-01). Short names cannot be judged by binary strings (`paper_doll_renderer` also has 0), so the conclusion leans on the long names."
    },
    "detail": {
      "ko": "NetEase 문서의 UI 3D 모델 기능, 곧 `paper_doll`의 `modelname`·`modelsize`·`animation`·`animation_looped`와 `netease_paper_doll_renderer`(`skeleton_model_name`, `entity_identifier`, `screen_scale`, `init_rot_x/y/z`, `freedom_gesture`, Python `RenderEntity`·`RenderSkeletonModel`)는 중국판 전용이다. 국제판 바이너리에 `netease` 문자열이 0개이고 이 속성들의 긴 이름도 없으며, 바닐라도 한 번도 쓰지 않는다. 국제판 팩은 UI에 커스텀 모델·엔티티를 그릴 수 없으므로 월드 엔티티나 파티클(ALT-01)을 쓴다. 짧은 이름은 바이너리 문자열로 판정할 수 없어(`paper_doll_renderer`도 0개) 결론은 긴 이름에 기댄다.",
      "en": "The UI 3D model feature of the NetEase documentation, that is, `modelname`, `modelsize`, `animation` and `animation_looped` of `paper_doll` and `netease_paper_doll_renderer` (`skeleton_model_name`, `entity_identifier`, `screen_scale`, `init_rot_x/y/z`, `freedom_gesture`, Python `RenderEntity` and `RenderSkeletonModel`), is China edition only. There are 0 `netease` strings in the international binary, the long names of these properties are absent too, and vanilla never uses them. An international pack cannot draw custom models or entities in UI, so use world entities or particles (ALT-01). Short names cannot be judged by binary strings (even `paper_doll_renderer` is 0), so the conclusion rests on the long names."
    },
    "sources": "NB-12, VN 0회, NE-30 paper_doll, NE-bone"
  },
  "ANI-37": {
    "id": "ANI-37",
    "category": "ANI",
    "page": "reference/rules",
    "anchor": "ani-37",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "열린 화면에서 애니메이션을 처음부터 다시 재생하려면 그 컨트롤을 새로 만들게 한다. `property_bag` 사전 조회(COL-22, COL-23)로 `#collection_length`를 정하는 `control_ids` 팩토리에서, 키가 되는 값(칸 아이템 이름)의 표식을 바꿀 때마다 컨트롤이 다시 만들어지고 `anims`가 처음부터 재생됐다. `#visible`을 껐다 켜는 것으로는 다시 재생되지 않았다.",
      "en": "To replay an animation from the start in an open screen, make that control get built again. In a `control_ids` factory whose `#collection_length` comes from a `property_bag` dictionary lookup (COL-22, COL-23), every change of the marker in the key value (the slot item name) built the control again and its `anims` played from the start. Turning `#visible` off and on did not replay it."
    },
    "detail": {
      "ko": "열린 화면에서 애니메이션을 처음부터 다시 재생하려면 그 컨트롤을 새로 만들게 한다. `property_bag` 사전 조회(COL-22, COL-23)로 `#collection_length`를 정하는 `control_ids` 팩토리에서, 키가 되는 값(칸 아이템 이름)의 표식을 바꿀 때마다 컨트롤이 다시 만들어지고 `anims`가 처음부터 재생됐다. `#visible`을 껐다 켜는 것으로는 다시 재생되지 않았다.",
      "en": "To replay an animation from the start in an open screen, make that control get built again. In a `control_ids` factory whose `#collection_length` comes from a `property_bag` dictionary lookup (COL-22, COL-23), every change of the marker in the key value (the slot item name) built the control again and its `anims` played from the start. Turning `#visible` off and on did not replay it."
    },
    "sources": "E2048"
  },
  "ANI-38": {
    "id": "ANI-38",
    "category": "ANI",
    "page": "reference/rules",
    "anchor": "ani-38",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "엔티티 상자 화면에 `modifications`로 넣은 창에서, 창을 감싼 패널을 `layer` 50, 그 안 `input_panel`을 100에 두자 `inventory_item_renderer` 아이콘만 그려지지 않고 이름, 개수, 배경은 그려졌다. 둘 다 1로 낮추자 아이콘이 그려졌다. 아이템 렌더러를 layer 100에 두면 아이템이 숨고 4와 50은 괜찮았다는 커뮤니티 보고와 맞는다(ANI-06). 아이템 렌더러가 든 창은 높은 레이어에 두지 않는다.",
      "en": "In a window inserted into the entity chest screen with `modifications`, with the panel around the window at `layer` 50 and the `input_panel` inside it at 100, only the `inventory_item_renderer` icons were not drawn, while names, counts and backgrounds were. Lowering both to 1 drew the icons. This agrees with a community report that an item renderer at layer 100 hid items while 4 and 50 were fine (ANI-06). Do not put a window that holds item renderers on a high layer."
    },
    "detail": {
      "ko": "엔티티 상자 화면에 `modifications`로 넣은 창에서, 창을 감싼 패널을 `layer` 50, 그 안 `input_panel`을 100에 두자 `inventory_item_renderer` 아이콘만 그려지지 않고 이름, 개수, 배경은 그려졌다. 둘 다 1로 낮추자 아이콘이 그려졌다. 아이템 렌더러를 layer 100에 두면 아이템이 숨고 4와 50은 괜찮았다는 커뮤니티 보고와 맞는다(ANI-06). 아이템 렌더러가 든 창은 높은 레이어에 두지 않는다.",
      "en": "In a window inserted into the entity chest screen with `modifications`, with the panel around the window at `layer` 50 and the `input_panel` inside it at 100, only the `inventory_item_renderer` icons were not drawn, while names, counts and backgrounds were. Lowering both to 1 drew the icons. This agrees with a community report that an item renderer at layer 100 hid items while 4 and 50 were fine (ANI-06). Do not put a window that holds item renderers on a high layer."
    },
    "sources": "E2048"
  },
  "BND-01": {
    "id": "BND-01",
    "category": "BND",
    "page": "reference/rules",
    "anchor": "bnd-01",
    "proposal": false,
    "evidence": [
      "바닐라",
      "코드"
    ],
    "title": {
      "ko": "바인딩 키는 위 표의 것을 쓴다. `resolve_ancestor_scope`는 바닐라에 한 번도 없으므로 쓰지 않는다(`resolve_sibling_scope`는 53회). 엔진은 이 키를 읽는다(조상 범위, BND-25·BND-36). 바닐라가 쓰지 않으므로 권장하지 않는다는 결론은 같다.",
      "en": "Use the binding keys in the table above. `resolve_ancestor_scope` never appears in vanilla, so do not use it (`resolve_sibling_scope` is 53 times). The engine does read this key (ancestor scope, BND-25 and BND-36). Because vanilla does not use it, the conclusion that it is not recommended is the same."
    },
    "detail": {
      "ko": "바인딩 키는 위 표의 것을 쓴다. `resolve_ancestor_scope`는 바닐라에 한 번도 없으므로 쓰지 않는다(`resolve_sibling_scope`는 53회). 엔진은 이 키를 읽는다(조상 범위, BND-25·BND-36). 바닐라가 쓰지 않으므로 권장하지 않는다는 결론은 같다.",
      "en": "Use the binding keys in the table above. `resolve_ancestor_scope` never appears in vanilla, so do not use it (`resolve_sibling_scope` has 53 uses). The engine reads this key (ancestor scope, BND-25 and BND-36). Since vanilla does not use it, the conclusion not to recommend it is the same."
    },
    "sources": "VN, MJ 4.2-1, 부록A C-07, NB-09"
  },
  "BND-02": {
    "id": "BND-02",
    "category": "BND",
    "page": "reference/rules",
    "anchor": "bnd-02",
    "proposal": false,
    "evidence": [
      "바닐라",
      "코드",
      "추론"
    ],
    "title": {
      "ko": "`binding_type`을 생략한 항목은 전역 속성을 읽는다(예: `{ \"binding_name\": \"#title_text\" }`).",
      "en": "An entry that omits `binding_type` reads a global property (for example `{ \"binding_name\": \"#title_text\" }`)."
    },
    "detail": {
      "ko": "`binding_type`을 생략한 항목은 전역 속성을 읽는다(예: ). `{바닐라, 코드, 추론}`",
      "en": "An item that omits `binding_type` reads a global property (for example ). `{vanilla, code, inferred}`"
    },
    "sources": "VN server_form.json:138, BC 4.1, BA 2장, BW-intro, BW-dyn"
  },
  "BND-03": {
    "id": "BND-03",
    "category": "BND",
    "page": "reference/rules",
    "anchor": "bnd-03",
    "proposal": false,
    "evidence": [
      "바닐라"
    ],
    "title": {
      "ko": "바닐라가 쓰는 `binding_type` 횟수: `collection` 787, `collection_details` 287, `global` 265, `view` 240, `none` 1. 템플릿은 이 값을 변수로 받는 경우가 많다(`$store_factory_binding_type` 등).",
      "en": "Counts of `binding_type` used by vanilla: `collection` 787, `collection_details` 287, `global` 265, `view` 240, `none` 1. Templates often receive this value as a variable (`$store_factory_binding_type` and so on)."
    },
    "detail": {
      "ko": "바닐라가 쓰는 `binding_type` 횟수: `collection` 787, `collection_details` 287, `global` 265, `view` 240, `none` 1. 템플릿은 이 값을 변수로 받는 경우가 많다(`$store_factory_binding_type` 등).",
      "en": "Counts of `binding_type` that vanilla uses: `collection` 787, `collection_details` 287, `global` 265, `view` 240, `none` 1. Templates often receive this value as a variable (`$store_factory_binding_type`, etc.)."
    },
    "sources": "VN, 부록B"
  },
  "BND-04": {
    "id": "BND-04",
    "category": "BND",
    "page": "reference/rules",
    "anchor": "bnd-04",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "바인딩된 속성은 그 바인딩을 가진 컨트롤의 것이다. 버튼에 컬렉션 바인딩을 두고 두 단계 아래 라벨에서 `#form_button_text`를 쓰면 빈칸이 된다. 값은 그것을 그리는 컨트롤이 직접 바인딩하거나, view 바인딩으로 복사한다(BND-08).",
      "en": "A bound property belongs to the control that holds the binding. If you put a collection binding on a button and use `#form_button_text` in a label two levels down, it is blank. The control that draws the value must bind it directly or copy it with a view binding (BND-08)."
    },
    "detail": {
      "ko": "바인딩된 속성은 그 바인딩을 가진 컨트롤의 것이다. 버튼에 컬렉션 바인딩을 두고 두 단계 아래 라벨에서 `#form_button_text`를 쓰면 빈칸이 된다. 값은 그것을 그리는 컨트롤이 직접 바인딩하거나, view 바인딩으로 복사한다(BND-08).",
      "en": "A bound property belongs to the control that has the binding. If you put a collection binding on a button and use `#form_button_text` in a label two levels down, it comes out blank. The value is bound directly by the control that draws it, or copied with a view binding (BND-08)."
    },
    "sources": "BC-S7"
  },
  "BND-05": {
    "id": "BND-05",
    "category": "BND",
    "page": "reference/rules",
    "anchor": "bnd-05",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "view 바인딩 식에 `#속성`이 하나도 없으면 `Must define a source property name in the binding!` 오류가 나고, 그 컨트롤의 bindings 배열 전체가 버려진다. 상수를 쓰려면 `((#v = #v) * 40)`처럼 아무 속성이나 끼운다. Cinnabar 재구성은 그 바인딩 하나만 버리지만 실측을 따른다(부록A C-43).",
      "en": "If a view binding expression has no `#property` at all, the error `Must define a source property name in the binding!` occurs and the whole bindings array of that control is discarded. To use a constant, put in any property, like `((#v = #v) * 40)`. The Cinnabar reconstruction discards only that one binding, but the measurement is followed (Appendix A C-43)."
    },
    "detail": {
      "ko": "view 바인딩 식에 `#속성`이 하나도 없으면 `Must define a source property name in the binding!` 오류가 나고, 그 컨트롤의 bindings 배열 전체가 버려진다. 상수를 쓰려면 `((#v = #v) * 40)`처럼 아무 속성이나 끼운다. Cinnabar 재구성은 그 바인딩 하나만 버리지만 실측을 따른다(충돌 C-43).",
      "en": "If a view binding expression has no `#property` at all, the error `Must define a source property name in the binding!` occurs, and the whole bindings array of that control is discarded. To use a constant, put in any property like `((#v = #v) * 40)`. The Cinnabar reconstruction discards only that one binding, but measurement is followed (conflict C-43)."
    },
    "sources": "BC-S12, 부록A C-43"
  },
  "BND-06": {
    "id": "BND-06",
    "category": "BND",
    "page": "reference/rules",
    "anchor": "bnd-06",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "한 번만 정해지면 되는 값(토스트 아이콘 표시 여부 등)은 `\"binding_condition\": \"once\"`로 비용을 줄인다. 팩토리가 컨트롤을 다시 만들면 다시 평가된다.",
      "en": "For a value that only needs to be decided once (such as whether to show a toast icon), `\"binding_condition\": \"once\"` reduces the cost. It is evaluated again when a factory recreates the control."
    },
    "detail": {
      "ko": "한 번만 정해지면 되는 값(토스트 아이콘 표시 여부 등)은 `\"binding_condition\": \"once\"`로 비용을 줄인다. 팩토리가 컨트롤을 다시 만들면 다시 평가된다.",
      "en": "For a value that only needs to be decided once (for example whether a toast icon shows), `\"binding_condition\": \"once\"` reduces cost. It is re-evaluated when a factory recreates the control."
    },
    "sources": "BA 6장, AP 4.5"
  },
  "BND-07": {
    "id": "BND-07",
    "category": "BND",
    "page": "reference/rules",
    "anchor": "bnd-07",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "팩토리가 만든 셀 안의 바인딩은 너무 일찍 실행되어 빈 값으로 남을 수 있다(포커스를 잃었다 돌아오면 그제야 보임). `binding_condition: \"always\"`를 주거나, 팩토리 바깥에서 읽고 `source_control_name`으로 복사해 넣는다. 셀 안의 `visible`도 `always`면 즉시 적용된다. 셀은 바깥 컨트롤을 읽을 수 있지만 바깥은 셀을 읽지 못한다(BND-19).",
      "en": "A binding inside a cell made by a factory may run too early and remain empty (it shows up only after losing and regaining focus). Give `binding_condition: \"always\"`, or read it outside the factory and copy it in with `source_control_name`. A `visible` inside a cell also applies immediately if it is `always`. A cell can read outside controls, but the outside cannot read the cell (BND-19)."
    },
    "detail": {
      "ko": "팩토리가 만든 셀 안의 바인딩은 너무 일찍 실행되어 빈 값으로 남을 수 있다(포커스를 잃었다 돌아오면 그제야 보임). `binding_condition: \"always\"`를 주거나, 팩토리 바깥에서 읽고 `source_control_name`으로 복사해 넣는다. 셀 안의 `visible`도 `always`면 즉시 적용된다. 셀은 바깥 컨트롤을 읽을 수 있지만 바깥은 셀을 읽지 못한다(BND-19).",
      "en": "A binding inside a cell created by a factory can run too early and stay empty (it shows only after losing and regaining focus). Give it `binding_condition: \"always\"`, or read it outside the factory and copy it in with `source_control_name`. If the `visible` inside a cell is also `always`, it applies immediately. A cell can read outside controls but the outside cannot read the cell (BND-19)."
    },
    "sources": "BC-S11, 부록A C-11, BW-dyn"
  },
  "BND-08": {
    "id": "BND-08",
    "category": "BND",
    "page": "reference/rules",
    "anchor": "bnd-08",
    "proposal": false,
    "evidence": [
      "바닐라",
      "작동팩"
    ],
    "title": {
      "ko": "`source_control_name`으로 다른 컨트롤의 속성을 읽는다. 형제를 읽을 때는 `resolve_sibling_scope: true`를 함께 준다.",
      "en": "Read a property of another control with `source_control_name`. When reading a sibling, also give `resolve_sibling_scope: true`."
    },
    "detail": {
      "ko": "`source_control_name`으로 다른 컨트롤의 속성을 읽는다. 형제를 읽을 때는 `resolve_sibling_scope: true`를 함께 준다.",
      "en": "Read another control's property with `source_control_name`. When reading a sibling, also give `resolve_sibling_scope: true`."
    },
    "sources": "VN 236·53회 예 server_form.json:156, BA 6장, BW-intro, BW-form"
  },
  "BND-09": {
    "id": "BND-09",
    "category": "BND",
    "page": "reference/rules",
    "anchor": "bnd-09",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "`#visible`의 기본값은 `true`다. 식이 실패하면(지원하지 않는 연산자 등) 속성이 기본값에 남으므로 \"항상 보임\"이 된다. 숨김 조건이 안 먹으면 식부터 의심한다.",
      "en": "The default of `#visible` is `true`. If the expression fails (an unsupported operator and so on), the property stays at the default, so it becomes \"always visible\". If a hiding condition does not take effect, suspect the expression first."
    },
    "detail": {
      "ko": "`#visible`의 기본값은 `true`다. 식이 실패하면(지원하지 않는 연산자 등) 속성이 기본값에 남으므로 \"항상 보임\"이 된다. 숨김 조건이 안 먹으면 식부터 의심한다.",
      "en": "The default of `#visible` is `true`. If an expression fails (an unsupported operator, etc.), the property stays at its default, so it becomes \"always visible\". If a hide condition does not take effect, suspect the expression first."
    },
    "sources": "BC-facts, BC 6.2-1"
  },
  "BND-10": {
    "id": "BND-10",
    "category": "BND",
    "page": "reference/rules",
    "anchor": "bnd-10",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "문자열 파싱 같은 무거운 계산은 부모(또는 데이터 소스) 한 곳에서 한 번 하고, 자식은 `source_control_name`으로 결과만 받는다.",
      "en": "Do heavy calculations such as string parsing once in one place, the parent (or data source), and let children receive only the result with `source_control_name`."
    },
    "detail": {
      "ko": "문자열 파싱 같은 무거운 계산은 부모(또는 데이터 소스) 한 곳에서 한 번 하고, 자식은 `source_control_name`으로 결과만 받는다.",
      "en": "Do heavy calculations such as string parsing once in one place, the parent (or a data source), and have children take only the result with `source_control_name`."
    },
    "sources": "BA 6장"
  },
  "BND-11": {
    "id": "BND-11",
    "category": "BND",
    "page": "reference/rules",
    "anchor": "bnd-11",
    "proposal": false,
    "evidence": [
      "코드",
      "실측"
    ],
    "title": {
      "ko": "같은 값을 여러 곳에서 읽어야 하면 화면 루트에 크기 0짜리 \"데이터 소스\" 컨트롤을 두고, 각 게이트가 view 바인딩으로 그 값을 읽는다. 네이티브 입력(라디오 등)을 컬렉션 아이템 안에 넣지 않고 데이터만 따로 읽는 방법이기도 하다.",
      "en": "If the same value must be read in several places, put a size-0 \"data source\" control at the screen root and let each gate read that value with a view binding. This is also a way to read only the data without putting a native input (radio and so on) inside a collection item."
    },
    "detail": {
      "ko": "같은 값을 여러 곳에서 읽어야 하면 화면 루트에 크기 0짜리 \"데이터 소스\" 컨트롤을 두고, 각 게이트가 view 바인딩으로 그 값을 읽는다. 네이티브 입력(라디오 등)을 컬렉션 아이템 안에 넣지 않고 데이터만 따로 읽는 방법이기도 하다. , BC-rules)",
      "en": "If several places must read the same value, put a size-0 \"data source\" control at the screen root and have each gate read that value with a view binding. It is also a way to read only the data without putting a native input (a radio, etc.) inside a collection item. , BC-rules)"
    },
    "sources": "BC 4.1-(5), BC-rules"
  },
  "BND-12": {
    "id": "BND-12",
    "category": "BND",
    "page": "reference/rules",
    "anchor": "bnd-12",
    "proposal": false,
    "evidence": [
      "작동팩",
      "실측"
    ],
    "title": {
      "ko": "팩이 직접 소유한 정의(새 namespace의 정의, 재선언한 정의)에서는 `source_property_name`에 `$변수`를 써도 된다. 예: `\"source_property_name\": \"$visible_binding\"`.",
      "en": "In definitions the pack owns directly (a definition in a new namespace, a redeclared definition), `$variable` may be used in `source_property_name`. Example: `\"source_property_name\": \"$visible_binding\"`."
    },
    "detail": {
      "ko": "팩이 직접 소유한 정의(새 namespace의 정의, 재선언한 정의)에서는 `source_property_name`에 `$변수`를 써도 된다. 예: `\"source_property_name\": \"$visible_binding\"`.",
      "en": "In definitions the pack owns directly (definitions of a new namespace, redeclared definitions), a `$variable` can be used in `source_property_name`. Example: `\"source_property_name\": \"$visible_binding\"`."
    },
    "sources": "AP 4.2, BC-facts"
  },
  "BND-13": {
    "id": "BND-13",
    "category": "BND",
    "page": "reference/rules",
    "anchor": "bnd-13",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "`modifications`로 바닐라 트리에 삽입한 하위 트리 안에서는 바인딩의 `source_property_name`에 `$변수`를 쓸 수 없다(6가지 변형 모두 `Must define a source property name`). 같은 곳에서 `text`의 `$caption` 같은 일반 속성 치환은 된다. 그래서 삽입 트리에는 바인딩 이름을 리터럴로 박은 정의를 따로 만든다.",
      "en": "Inside a subtree inserted into the vanilla tree with `modifications`, `$variable` cannot be used in a binding's `source_property_name` (all 6 variants gave `Must define a source property name`). Ordinary property substitution such as `$caption` in `text` works in the same place. So make a separate definition with the binding name written as a literal for inserted trees."
    },
    "detail": {
      "ko": "`modifications`로 바닐라 트리에 삽입한 하위 트리 안에서는 바인딩의 `source_property_name`에 `$변수`를 쓸 수 없다(6가지 변형 모두 `Must define a source property name`). 같은 곳에서 `text`의 `$caption` 같은 일반 속성 치환은 된다. 그래서 삽입 트리에는 바인딩 이름을 리터럴로 박은 정의를 따로 만든다.",
      "en": "Inside a subtree inserted into a vanilla tree with `modifications`, a `$variable` cannot be used in a binding's `source_property_name` (all 6 variants gave `Must define a source property name`). Ordinary property substitution such as `$caption` in `text` works in the same place. So for inserted trees, make a separate definition with the binding names hardcoded as literals."
    },
    "sources": "BC-facts"
  },
  "BND-14": {
    "id": "BND-14",
    "category": "BND",
    "page": "reference/rules",
    "anchor": "bnd-14",
    "proposal": false,
    "evidence": [
      "실측",
      "추론"
    ],
    "title": {
      "ko": "팩토리 행 인덱스 같은 값을 `$변수`로 파생 정의에 넘겨 기반의 바인딩에 쓰려 하면 바인딩이 깨지고 배열 전체가 버려졌다는 기록이 있다. 바닐라의 `factory_variables`(6장 COL-15)가 이 문제를 푸는지는 측정되지 않았다.",
      "en": "There is a record that passing a value such as a factory row index as a `$variable` to a derived definition and trying to use it in the base's binding broke the binding and discarded the whole array. It was not measured whether vanilla's `factory_variables` (chapter 6 COL-15) solves this problem."
    },
    "detail": {
      "ko": "팩토리 행 인덱스 같은 값을 `$변수`로 파생 정의에 넘겨 기반의 바인딩에 쓰려 하면 바인딩이 깨지고 배열 전체가 버려졌다는 기록이 있다. 바닐라의 `factory_variables`(컬렉션과 팩토리 장 COL-15)가 이 문제를 푸는지는 측정되지 않았다.",
      "en": "There is a record that passing a value such as a factory row index to a derived definition as a `$variable` and using it in the base's binding broke the binding and discarded the whole array. Whether vanilla's `factory_variables` (COL-15 in the collections and factories chapter) solves this problem was not measured."
    },
    "sources": "BC-S9, VN"
  },
  "BND-15": {
    "id": "BND-15",
    "category": "BND",
    "page": "reference/rules",
    "anchor": "bnd-15",
    "proposal": false,
    "evidence": [
      "바닐라",
      "작동팩"
    ],
    "title": {
      "ko": "`propagate_alpha`는 바인딩 `#propagateAlpha`로도 바꿀 수 있다. 바닐라 HUD 루트가 전역 `#hud_propagate_alpha`를 `#propagateAlpha`로 받는다. 부모 `alpha: 0` + 조건부 전파로 \"특정 메시지만 투명하게\" 만들 수 있다. `alpha` 자체는 기본으로 자식에 전파되지 않는다(LAY-33).",
      "en": "`propagate_alpha` can also be changed with the binding `#propagateAlpha`. The vanilla HUD root takes the global `#hud_propagate_alpha` as `#propagateAlpha`. With parent `alpha: 0` + conditional propagation you can make \"only specific messages transparent\". `alpha` itself is not propagated to children by default (LAY-33)."
    },
    "detail": {
      "ko": "`propagate_alpha`는 바인딩 `#propagateAlpha`로도 바꿀 수 있다. 바닐라 HUD 루트가 전역 `#hud_propagate_alpha`를 `#propagateAlpha`로 받는다. 부모 `alpha: 0` + 조건부 전파로 \"특정 메시지만 투명하게\" 만들 수 있다. `alpha` 자체는 기본으로 자식에 전파되지 않는다(LAY-33).",
      "en": "`propagate_alpha` can also be changed with the binding `#propagateAlpha`. The vanilla HUD root receives the global `#hud_propagate_alpha` as `#propagateAlpha`. With parent `alpha: 0` + conditional propagation you can make \"only a particular message transparent\". `alpha` itself is not propagated to children by default (LAY-33)."
    },
    "sources": "VN hud_screen.json:3567, AP 4.5, 부록A C-15, BW-doc"
  },
  "BND-16": {
    "id": "BND-16",
    "category": "BND",
    "page": "reference/rules",
    "anchor": "bnd-16",
    "proposal": false,
    "evidence": [
      "바닐라"
    ],
    "title": {
      "ko": "`binding_name_override`는 엔진 이름을 내 속성으로 옮긴다. 예: `#hud_title_text_string` → `#text`, `#form_button_contents` → `#collection_length`.",
      "en": "`binding_name_override` moves an engine name to your own property. Examples: `#hud_title_text_string` -> `#text`, `#form_button_contents` -> `#collection_length`."
    },
    "detail": {
      "ko": "`binding_name_override`는 엔진 이름을 내 속성으로 옮긴다. 예: `#hud_title_text_string` → `#text`, `#form_button_contents` → `#collection_length`.",
      "en": "`binding_name_override` moves an engine name into your own property. Examples: `#hud_title_text_string` -> `#text`, `#form_button_contents` -> `#collection_length`."
    },
    "sources": "VN hud_screen.json, server_form.json:138, BW-intro"
  },
  "BND-17": {
    "id": "BND-17",
    "category": "BND",
    "page": "reference/rules",
    "anchor": "bnd-17",
    "proposal": false,
    "evidence": [
      "바닐라"
    ],
    "title": {
      "ko": "바닐라는 바인딩 이름 자체를 변수 식으로 만든다: `\"$toggle_state_binding_name\": \"('#' + $dropdown_name)\"`. 템플릿 하나로 여러 데이터를 읽는 방법이다.",
      "en": "Vanilla builds the binding name itself with a variable expression: `\"$toggle_state_binding_name\": \"('#' + $dropdown_name)\"`. It is a way to read several pieces of data with one template."
    },
    "detail": {
      "ko": "바닐라는 바인딩 이름 자체를 변수 식으로 만든다: `\"$toggle_state_binding_name\": \"('#' + $dropdown_name)\"`. 템플릿 하나로 여러 데이터를 읽는 방법이다.",
      "en": "Vanilla builds the binding name itself as a variable expression: `\"$toggle_state_binding_name\": \"('#' + $dropdown_name)\"`. It is a way to read various data with one template."
    },
    "sources": "VN ui_common.json:1126, storage_management.json:1325"
  },
  "BND-18": {
    "id": "BND-18",
    "category": "BND",
    "page": "reference/rules",
    "anchor": "bnd-18",
    "proposal": false,
    "evidence": [
      "미검증"
    ],
    "title": {
      "ko": "값 보존(래치). 크기 0 패널의 `property_bag`에 `\"#saved\": \"\"`를 두고, `{ \"binding_name\": \"#src\", \"binding_name_override\": \"#saved\", \"binding_condition\": \"visibility_changed\" }`로 가시성이 바뀌는 순간에만 원본을 복사한다. 이 패널의 `#visible`을 \"새 값이 키워드를 포함하고(EXP-07) 저장값과 다를 때\"로 두면, 조건이 맞는 순간 한 프레임 보였다가 저장 직후 조건이 거짓이 되어 다시 숨는다. 바깥 라벨은 `source_control_name`으로 `#saved`를 읽는다. `property_bag`은 인스턴스마다 따로라 같은 컴포넌트를 여러 개 둬도 섞이지 않는다. HUD 타이틀 채널(HOST-14)에서 \"내 키워드가 든 마지막 타이틀\"을 다른 타이틀이 와도 유지하는 데 쓴다.",
      "en": "Keeping a value (latch). Put `\"#saved\": \"\"` in the `property_bag` of a size-0 panel and copy the source only at the moment visibility changes with `{ \"binding_name\": \"#src\", \"binding_name_override\": \"#saved\", \"binding_condition\": \"visibility_changed\" }`. If the `#visible` of this panel is \"the new value contains the keyword (EXP-07) and differs from the saved value\", it is visible for one frame when the condition matches, then the condition becomes false right after saving and it hides again. The outer label reads `#saved` with `source_control_name`. `property_bag` is separate per instance, so several of the same component do not mix. It is used to keep \"the last title containing my keyword\" on the HUD title channel (HOST-14) even when other titles arrive."
    },
    "detail": {
      "ko": "값 보존(래치). 크기 0 패널의 `property_bag`에 `\"#saved\": \"\"`를 두고, 로 가시성이 바뀌는 순간에만 원본을 복사한다. 이 패널의 `#visible`을 \"새 값이 키워드를 포함하고(EXP-07) 저장값과 다를 때\"로 두면, 조건이 맞는 순간 한 프레임 보였다가 저장 직후 조건이 거짓이 되어 다시 숨는다. 바깥 라벨은 `source_control_name`으로 `#saved`를 읽는다. `property_bag`은 인스턴스마다 따로라 같은 컴포넌트를 여러 개 둬도 섞이지 않는다. HUD 타이틀 채널(HOST-14)에서 \"내 키워드가 든 마지막 타이틀\"을 다른 타이틀이 와도 유지하는 데 쓴다. `{미검증}`",
      "en": "Value preservation (latch). Put `\"#saved\": \"\"` in the `property_bag` of a size-0 panel, and copy the source only at the moment visibility changes with . If you set the `#visible` of this panel to \"when the new value contains the keyword (EXP-07) and differs from the saved value\", it shows for one frame at the moment the condition matches and hides again because the condition turns false right after saving. An outside label reads `#saved` with `source_control_name`. `property_bag` is separate per instance, so several of the same component do not mix. It is used to keep \"the last title containing my keyword\" in the HUD title channel (HOST-14) even when other titles arrive. `{unverified}`"
    },
    "sources": "BW-title, VN `visibility_changed` 7회"
  },
  "BND-19": {
    "id": "BND-19",
    "category": "BND",
    "page": "reference/rules",
    "anchor": "bnd-19",
    "proposal": false,
    "evidence": [
      "미검증"
    ],
    "title": {
      "ko": "팩토리·그리드가 만든 컨트롤은 `source_control_name`으로 바깥 컨트롤의 속성을 읽을 수 있지만, 바깥 컨트롤은 만들어진 컨트롤의 속성을 읽지 못한다. 공유할 값은 팩토리 바깥 데이터 소스(BND-11)에 둔다.",
      "en": "A control made by a factory or grid can read properties of outer controls with `source_control_name`, but outer controls cannot read properties of the created controls. Put values to share in a data source outside the factory (BND-11)."
    },
    "detail": {
      "ko": "팩토리·그리드가 만든 컨트롤은 `source_control_name`으로 바깥 컨트롤의 속성을 읽을 수 있지만, 바깥 컨트롤은 만들어진 컨트롤의 속성을 읽지 못한다. 공유할 값은 팩토리 바깥 데이터 소스(BND-11)에 둔다.",
      "en": "A control created by a factory or grid can read properties of an outside control with `source_control_name`, but outside controls cannot read the properties of created controls. Put values to share in a data source outside the factory (BND-11)."
    },
    "sources": "BW-dyn \"Useful Information\""
  },
  "BND-20": {
    "id": "BND-20",
    "category": "BND",
    "page": "reference/rules",
    "anchor": "bnd-20",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "`resolve_sibling_scope: true`는 `source_control_name` 검색을 형제 범위로 제한하지만, 부모와 형제의 이름이 같으면 부모가 우선한다. 읽을 컨트롤 이름은 조상과 겹치지 않게 짓는다. 원인: 형제 검색이 부모 자신부터 너비 우선으로 시작한다(BND-25).",
      "en": "`resolve_sibling_scope: true` limits the `source_control_name` search to the sibling scope, but when the parent and a sibling have the same name the parent takes priority. Name the control to read so it does not overlap with ancestors. Cause: the sibling search starts breadth-first from the parent itself (BND-25)."
    },
    "detail": {
      "ko": "`resolve_sibling_scope: true`는 `source_control_name` 검색을 형제 범위로 제한하지만, 부모와 형제의 이름이 같으면 부모가 우선한다. 읽을 컨트롤 이름은 조상과 겹치지 않게 짓는다. 원인: 형제 검색이 부모 자신부터 너비 우선으로 시작한다(BND-25).",
      "en": "`resolve_sibling_scope: true` limits the `source_control_name` search to the sibling scope, but if the parent and a sibling have the same name, the parent takes priority. Name the control to read so that it does not collide with ancestors. Cause: the sibling search starts breadth-first from the parent itself (BND-25)."
    },
    "sources": "BW-doc Data Binding 표, CN"
  },
  "BND-21": {
    "id": "BND-21",
    "category": "BND",
    "page": "reference/rules",
    "anchor": "bnd-21",
    "proposal": false,
    "evidence": [
      "바닐라",
      "미검증"
    ],
    "title": {
      "ko": "버튼 상태 컨트롤 안에서는 상태 변수로 생성 자체를 가를 수 있다: 호버 때만 보일 자식에 `\"ignored\": \"$default_state\"`. 바닐라도 `\"ignored\": \"$hover_state\"`(2), `\"visible\": \"$default_state\"`(3), `\"visible\": \"($hover_state or $pressed_state)\"`(5)를 쓴다. INP-09의 변수 식이 `ignored`에도 된다는 뜻이다.",
      "en": "Inside a button state control, state variables can decide creation itself: `\"ignored\": \"$default_state\"` on a child that should be visible only on hover. Vanilla also uses `\"ignored\": \"$hover_state\"` (2), `\"visible\": \"$default_state\"` (3), and `\"visible\": \"($hover_state or $pressed_state)\"` (5). This means the variable expression of INP-09 works in `ignored` too."
    },
    "detail": {
      "ko": "버튼 상태 컨트롤 안에서는 상태 변수로 생성 자체를 가를 수 있다: 호버 때만 보일 자식에 `\"ignored\": \"$default_state\"`. 바닐라도 `\"ignored\": \"$hover_state\"`(2), `\"visible\": \"$default_state\"`(3), `\"visible\": \"($hover_state or $pressed_state)\"`(5)를 쓴다. INP-09의 변수 식이 `ignored`에도 된다는 뜻이다.",
      "en": "Inside a button state control, state variables can decide creation itself: `\"ignored\": \"$default_state\"` on a child that should show only on hover. Vanilla also uses `\"ignored\": \"$hover_state\"` (2), `\"visible\": \"$default_state\"` (3) and `\"visible\": \"($hover_state or $pressed_state)\"` (5). It means the variable expression of INP-09 works for `ignored` too."
    },
    "sources": "BW-btn, VN"
  },
  "BND-22": {
    "id": "BND-22",
    "category": "BND",
    "page": "reference/rules",
    "anchor": "bnd-22",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "모르는 `binding_type`은 로그 후 `global`, 모르는 `binding_condition`은 로그 후 `none`으로 동작한다. 오타가 \"조용히 다른 동작\"이 되므로 값은 표에서 복사한다.",
      "en": "An unknown `binding_type` is logged and acts as `global`, and an unknown `binding_condition` is logged and acts as `none`. A typo becomes \"silently different behavior\", so copy values from the table."
    },
    "detail": {
      "ko": "모르는 `binding_type`은 로그 후 `global`, 모르는 `binding_condition`은 로그 후 `none`으로 동작한다. 오타가 \"조용히 다른 동작\"이 되므로 값은 표에서 복사한다. , CN 테스트 B07·B13(`binding_type`))",
      "en": "An unknown `binding_type` is logged and acts as `global`, and an unknown `binding_condition` is logged and acts as `none`. A typo becomes \"silently different behavior\", so copy values from the table. , CN tests B07 and B13 (`binding_type`))"
    },
    "sources": "NB-09(`binding_condition`), CN 테스트 B07·B13(`binding_type`)"
  },
  "BND-23": {
    "id": "BND-23",
    "category": "BND",
    "page": "reference/rules",
    "anchor": "bnd-23",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "`binding_condition` 의미: `none` 데이터 갱신마다, `once` 처음 한 번, `always` 매 업데이트, `always_when_visible`·`visible` 보일 때만, `visibility_changed` 가시성이 바뀔 때만. 값 여섯 개는 엔진의 이름표와 같다(BND-35).",
      "en": "Meaning of `binding_condition`: `none` on every data update, `once` only the first time, `always` on every update, `always_when_visible` and `visible` only while visible, `visibility_changed` only when visibility changes. The six values are the same as the engine's name table (BND-35)."
    },
    "detail": {
      "ko": "`binding_condition` 의미: `none` 데이터 갱신마다, `once` 처음 한 번, `always` 매 업데이트, `always_when_visible`·`visible` 보일 때만, `visibility_changed` 가시성이 바뀔 때만. 값 여섯 개는 엔진의 이름표와 같다(BND-35). , CN(의미))",
      "en": "Meaning of `binding_condition`: `none` on every data update, `once` the first time, `always` every update, `always_when_visible` and `visible` only when visible, `visibility_changed` only when visibility changes. The six values match the engine's name table (BND-35). , CN (meaning))"
    },
    "sources": "NB-09(값 목록), CN(의미)"
  },
  "BND-24": {
    "id": "BND-24",
    "category": "BND",
    "page": "reference/rules",
    "anchor": "bnd-24",
    "proposal": false,
    "evidence": [
      "바닐라",
      "코드"
    ],
    "title": {
      "ko": "`source_control_name`이 없는 view 바인딩은 자기 주머니를 읽고, 거기 없는 속성은 화면 컨트롤러(전역)에서 읽는다. 이름이 있는 view는 전역으로 떨어지지 않는다.",
      "en": "A view binding without `source_control_name` reads its own bag, and a property not there is read from the screen controller (global). A view with a name does not fall back to global."
    },
    "detail": {
      "ko": "`source_control_name`이 없는 view 바인딩은 자기 주머니를 읽고, 거기 없는 속성은 화면 컨트롤러(전역)에서 읽는다. 이름이 있는 view는 전역으로 떨어지지 않는다. , CN 테스트 B26·B27(전역 대체), CN Zeqa 회귀)",
      "en": "A view binding without `source_control_name` reads its own bag, and a property not there is read from the screen controller (global). A named view does not fall through to global. , CN tests B26 and B27 (global fallback), CN Zeqa regression)"
    },
    "sources": "VN 27회, NB-09(자기 컨트롤), CN 테스트 B26·B27(전역 대체), CN Zeqa 회귀"
  },
  "BND-25": {
    "id": "BND-25",
    "category": "BND",
    "page": "reference/rules",
    "anchor": "bnd-25",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "`source_control_name` 검색: 기본은 화면 루트부터 너비 우선 첫 일치, `resolve_sibling_scope`는 부모부터 너비 우선(부모 자신 포함, BND-20의 원인), `resolve_ancestor_scope`는 가장 가까운 같은 이름 조상. 숨은 하위 트리도 검색한다. 이름이 겹치면 루트에 더 가까운 쪽이 이긴다.",
      "en": "`source_control_name` search: by default the first breadth-first match from the screen root, `resolve_sibling_scope` breadth-first from the parent (including the parent itself, the cause of BND-20), and `resolve_ancestor_scope` the nearest ancestor with the same name. Hidden subtrees are also searched. When names overlap, the one closer to the root wins."
    },
    "detail": {
      "ko": "`source_control_name` 검색: 기본은 화면 루트부터 너비 우선 첫 일치, `resolve_sibling_scope`는 부모부터 너비 우선(부모 자신 포함, BND-20의 원인), `resolve_ancestor_scope`는 가장 가까운 같은 이름 조상. 숨은 하위 트리도 검색한다. 이름이 겹치면 루트에 더 가까운 쪽이 이긴다. , CN 테스트 B20·B25(검색 순서))",
      "en": "`source_control_name` lookup: by default breadth-first first match from the screen root, `resolve_sibling_scope` breadth-first from the parent (including the parent itself, the cause of BND-20), and `resolve_ancestor_scope` the nearest ancestor of the same name. Hidden subtrees are searched too. If names collide, the one closer to the root wins. , CN tests B20 and B25 (search order))"
    },
    "sources": "NB-09(범위 세 가지), CN 테스트 B20·B25(검색 순서)"
  },
  "BND-26": {
    "id": "BND-26",
    "category": "BND",
    "page": "reference/rules",
    "anchor": "bnd-26",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "식 바인딩 `{\"binding_name\": \"(식)\", \"binding_name_override\": \"#t\"}`는 주머니의 `#t`에 컨트롤러의 원래 답을, 컴포넌트에는 식 결과를 준다. 다른 view가 `#t`를 읽으면 식 결과가 아니라 원래 답을 본다. 결과를 공유하려면 view 바인딩으로 계산해 새 속성에 담는다.",
      "en": "An expression binding `{\"binding_name\": \"(expression)\", \"binding_name_override\": \"#t\"}` gives the controller's original answer to `#t` in the bag and the expression result to the component. If another view reads `#t`, it sees the original answer and not the expression result. To share the result, compute it with a view binding and put it in a new property."
    },
    "detail": {
      "ko": "식 바인딩 는 주머니의 `#t`에 컨트롤러의 원래 답을, 컴포넌트에는 식 결과를 준다. 다른 view가 `#t`를 읽으면 식 결과가 아니라 원래 답을 본다. 결과를 공유하려면 view 바인딩으로 계산해 새 속성에 담는다. `{코드}`",
      "en": "An expression binding gives the controller's original answer to `#t` in the bag and the expression result to the component. If another view reads `#t`, it sees the original answer, not the expression result. To share the result, compute it with a view binding and put it in a new property. `{code}`"
    },
    "sources": "CN 테스트 B08"
  },
  "BND-27": {
    "id": "BND-27",
    "category": "BND",
    "page": "reference/rules",
    "anchor": "bnd-27",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "불리언 대상(`#visible`, `#enabled`, `#toggle_state` 등)은 JSON 불리언만 받는다. 전역 문자열 `'false'`를 그대로 `#visible`에 바인딩하면 숨지 않는다. 식(`(#flag = 'false')`)을 거치면 불리언이 된다.",
      "en": "Boolean targets (`#visible`, `#enabled`, `#toggle_state`, and others) accept only JSON booleans. Binding the global string `'false'` as is to `#visible` does not hide. Passing through an expression (`(#flag = 'false')`) makes it a boolean."
    },
    "detail": {
      "ko": "불리언 대상(`#visible`, `#enabled`, `#toggle_state` 등)은 JSON 불리언만 받는다. 전역 문자열 `'false'`를 그대로 `#visible`에 바인딩하면 숨지 않는다. 식(`(#flag = 'false')`)을 거치면 불리언이 된다.",
      "en": "Boolean targets (`#visible`, `#enabled`, `#toggle_state`, etc.) accept only JSON booleans. Binding the global string `'false'` as is to `#visible` does not hide it. Going through an expression (`(#flag = 'false')`) makes it a boolean."
    },
    "sources": "CN"
  },
  "BND-28": {
    "id": "BND-28",
    "category": "BND",
    "page": "reference/rules",
    "anchor": "bnd-28",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "`property_bag` 리터럴의 상수 식은 계산된다(`\"#n\": \"(1 + 2)\"` → 3). 부모의 `property_bag_for_children`은 자손 주머니에 합쳐지되 자손이 가진 값을 덮지 않는다.",
      "en": "Constant expressions in `property_bag` literals are computed (`\"#n\": \"(1 + 2)\"` -> 3). A parent's `property_bag_for_children` is merged into descendant bags but does not overwrite values the descendant holds."
    },
    "detail": {
      "ko": "`property_bag` 리터럴의 상수 식은 계산된다(`\"#n\": \"(1 + 2)\"` → 3). 부모의 `property_bag_for_children`은 자손 주머니에 합쳐지되 자손이 가진 값을 덮지 않는다.",
      "en": "Constant expressions in a `property_bag` literal are computed (`\"#n\": \"(1 + 2)\"` -> 3). A parent's `property_bag_for_children` is merged into descendants' bags but does not overwrite values the descendants have."
    },
    "sources": "CN 테스트 B32·B33"
  },
  "BND-29": {
    "id": "BND-29",
    "category": "BND",
    "page": "reference/rules",
    "anchor": "bnd-29",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "`\"text\": \"##글자\"`처럼 `##`로 시작하는 텍스트는 바인딩이 아니라 리터럴이다. 바인딩되지 않은 `\"text\": \"#이름\"`은 빈 글자로 그려진다.",
      "en": "Text starting with `##`, like `\"text\": \"##text\"`, is a literal and not a binding. An unbound `\"text\": \"#name\"` is drawn as empty text."
    },
    "detail": {
      "ko": "`\"text\": \"##글자\"`처럼 `##`로 시작하는 텍스트는 바인딩이 아니라 리터럴이다. 바인딩되지 않은 `\"text\": \"#이름\"`은 빈 글자로 그려진다.",
      "en": "Text that starts with `##`, like `\"text\": \"##text\"`, is a literal, not a binding. An unbound `\"text\": \"#name\"` is drawn as empty text."
    },
    "sources": "CN 테스트 L08"
  },
  "BND-30": {
    "id": "BND-30",
    "category": "BND",
    "page": "json-ui/expressions",
    "anchor": "bnd-30",
    "proposal": false,
    "evidence": [
      "코드",
      "미검증"
    ],
    "title": {
      "ko": "같은 대상에 \"초기화\"와 \"자기 자신 + 증가\" 두 view 바인딩을 걸어 반복 계산(문자열 길이 세기, 뉴턴 제곱근)하는 생성기가 있다.",
      "en": "(proposal) There is a generator that does repeated calculation (counting string length, a Newton square root) by attaching two view bindings to the same target, \"initialize\" and \"itself + increment\"."
    },
    "detail": {
      "ko": "같은 대상에 \"초기화\"와 \"자기 자신 + 증가\" 두 view 바인딩을 걸어 반복 계산(문자열 길이 세기, 뉴턴 제곱근)하는 생성기가 있다. view 바인딩이 원본이 바뀔 때만 다시 쓰고 사슬이 수렴할 때까지 돈다(CN-36)는 전제가 필요하다. 반복 상한과 프레임당 처리는 확인되지 않았으므로 레시피로 쓰지 않는다.",
      "en": "(proposal) There is a generator that does repeated calculation (counting string length, a Newton square root) by attaching two view bindings to the same target, \"initialize\" and \"itself + increment\". It needs the premise that a view binding rewrites only when its source changes and the chain loops until it converges (the Cinnabar finding CN-36). The iteration limit and per-frame processing were not confirmed, so it is not used as a recipe. Measurement task: whether this setup reaches the final length and how many frames it takes. It ties in with the community report that \"reading and writing itself becomes a loop\"."
    },
    "sources": "ASJ 4.4, CN-36"
  },
  "BND-31": {
    "id": "BND-31",
    "category": "BND",
    "page": "reference/rules",
    "anchor": "bnd-31",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "제목으로 고르는 레이아웃의 `#visible`은 `binding_condition: \"always\"`로 둔다. `once`면 폼이 다음 폼으로 바뀌는 사이 잠깐 맞았던 레이아웃이 다음 폼 위에 켜진 채 남았다.",
      "en": "Keep the `#visible` of a layout chosen by title at `binding_condition: \"always\"`. With `once`, a layout that briefly matched while one form changed to the next stayed on over the next form."
    },
    "detail": {
      "ko": "제목으로 고르는 레이아웃의 `#visible`은 `binding_condition: \"always\"`로 둔다. `once`면 폼이 다음 폼으로 바뀌는 사이 잠깐 맞았던 레이아웃이 다음 폼 위에 켜진 채 남았다.",
      "en": "Keep the `#visible` of a layout chosen by title at `binding_condition: \"always\"`. With `once`, a layout that briefly matched while the form switched to the next form stayed on over the next form."
    },
    "sources": "DF"
  },
  "BND-32": {
    "id": "BND-32",
    "category": "BND",
    "page": "reference/rules",
    "anchor": "bnd-32",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "`visible: false`로 시작한 레이아웃 안 팩토리의 길이 바인딩(`#form_button_contents` → `#collection_length`)을 `binding_condition: \"visible\"`로 두면, 제목이 맞지 않아 숨은 레이아웃은 버튼 칸을 만들지 않았다(COL-10의 \"생성은 막지 못한다\"는 레이아웃 컨트롤 자체의 이야기다). 처음부터 보이는 레이아웃에 쓰면 숨은 레이아웃도 첫 프레임에 칸을 만들었다. 같은 자리에 `always_when_visible`·생략을 쓰면 첫 프레임에 만든 칸의 바인딩이 갱신되지 않아 글자·표식이 비었다.",
      "en": "If the length binding (`#form_button_contents` -> `#collection_length`) of a factory inside a layout that starts as `visible: false` is set to `binding_condition: \"visible\"`, a layout hidden because the title did not match did not create button cells (the \"does not block creation\" of COL-10 is about the layout control itself). When used on a layout that is visible from the start, the hidden layouts also created cells on the first frame. Using `always_when_visible` or omitting it in the same place left the bindings of cells made on the first frame unupdated, so text and marks were empty."
    },
    "detail": {
      "ko": "`visible: false`로 시작한 레이아웃 안 팩토리의 길이 바인딩(`#form_button_contents` → `#collection_length`)을 `binding_condition: \"visible\"`로 두면, 제목이 맞지 않아 숨은 레이아웃은 버튼 칸을 만들지 않았다(COL-10의 \"생성은 막지 못한다\"는 레이아웃 컨트롤 자체의 이야기다). 처음부터 보이는 레이아웃에 쓰면 숨은 레이아웃도 첫 프레임에 칸을 만들었다. 같은 자리에 `always_when_visible`·생략을 쓰면 첫 프레임에 만든 칸의 바인딩이 갱신되지 않아 글자·표식이 비었다.",
      "en": "If you put `binding_condition: \"visible\"` on the length binding (`#form_button_contents` -> `#collection_length`) of a factory inside a layout that started with `visible: false`, a layout hidden because its title did not match did not create button cells (the \"creation is not stopped\" of COL-10 is about the layout control itself). When used on a layout that is visible from the start, even the hidden layout created cells on the first frame. Using `always_when_visible` or omitting in the same place left the bindings of cells created on the first frame unupdated, so text and markers were empty."
    },
    "sources": "DF"
  },
  "BND-33": {
    "id": "BND-33",
    "category": "BND",
    "page": "reference/rules",
    "anchor": "bnd-33",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "우리 정의라도 `source_property_name` 식의 일부로 끼운 `$변수`는 치환되지 않았다(탭·뒤로 버튼이 안 보임, 팩 검사기도 못 잡음). 식 전체를 변수로 받는 BND-12와 달리, 표식처럼 식 안에 넣는 값은 식마다 글자로 적는다.",
      "en": "Even in our own definition, a `$variable` put in as part of a `source_property_name` expression was not substituted (the tab and back buttons did not show, and the pack checker did not catch it either). Unlike BND-12, where the whole expression is received as a variable, write values put inside an expression, such as marks, as literal text in each expression."
    },
    "detail": {
      "ko": "우리 정의라도 `source_property_name` 식의 일부로 끼운 `$변수`는 치환되지 않았다(탭·뒤로 버튼이 안 보임, 팩 검사기도 못 잡음). 식 전체를 변수로 받는 BND-12와 달리, 표식처럼 식 안에 넣는 값은 식마다 글자로 적는다.",
      "en": "Even in our own definitions, a `$variable` put in as part of a `source_property_name` expression was not substituted (tab and back buttons did not show, and the pack checker could not catch it). Unlike BND-12, where the whole expression is received as a variable, values put inside an expression like markers are written as literal text in each expression."
    },
    "sources": "DF"
  },
  "BND-34": {
    "id": "BND-34",
    "category": "BND",
    "page": "reference/rules",
    "anchor": "bnd-34",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "`(not ((A - B) = 'z'))`처럼 빼기 결과를 같은 식 안에서 바로 비교하자 참·거짓이 뒤집혔다. 먼저 view 바인딩으로 `#변수`에 담고 `(not (#변수 = 'z'))`로 비교하니 맞았다. EXP-06처럼 단계를 나눈다.",
      "en": "When the result of a subtraction was compared immediately in the same expression, as in `(not ((A - B) = 'z'))`, true and false were flipped. Putting it into a `#variable` with a view binding first and comparing with `(not (#variable = 'z'))` was correct. Split the steps as in EXP-06."
    },
    "detail": {
      "ko": "`(not ((A - B) = 'z'))`처럼 빼기 결과를 같은 식 안에서 바로 비교하자 참·거짓이 뒤집혔다. 먼저 view 바인딩으로 `#변수`에 담고 `(not (#변수 = 'z'))`로 비교하니 맞았다. EXP-06처럼 단계를 나눈다.",
      "en": "Comparing a subtraction result directly in the same expression like `(not ((A - B) = 'z'))` flipped true and false. Putting it first in a `#variable` with a view binding and comparing with `(not (#variable = 'z'))` was correct. Split the steps as in EXP-06."
    },
    "sources": "DF"
  },
  "BND-35": {
    "id": "BND-35",
    "category": "BND",
    "page": "reference/rules",
    "anchor": "bnd-35",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "`binding_condition`은 문자열이어야 하고(아니면 `- expected a string.` 오류), 값은 `none`, `once`, `always`, `always_when_visible`, `visible`, `visibility_changed` 여섯 가지다. 생략하거나 모르는 값이면 `none`으로 동작한다(BND-22·BND-23과 같다).",
      "en": "`binding_condition` must be a string (otherwise the error `- expected a string.`), and the values are six: `none`, `once`, `always`, `always_when_visible`, `visible`, `visibility_changed`. If omitted or an unknown value it acts as `none` (same as BND-22 and BND-23)."
    },
    "detail": {
      "ko": "`binding_condition`은 문자열이어야 하고(아니면 `- expected a string.` 오류), 값은 `none`, `once`, `always`, `always_when_visible`, `visible`, `visibility_changed` 여섯 가지다. 생략하거나 모르는 값이면 `none`으로 동작한다(BND-22·BND-23과 같다).",
      "en": "`binding_condition` must be a string (otherwise the error `- expected a string.`), and its values are six: `none`, `once`, `always`, `always_when_visible`, `visible` and `visibility_changed`. If omitted or an unknown value, it acts as `none` (the same as BND-22 and BND-23)."
    },
    "sources": "NB-09"
  },
  "BND-36": {
    "id": "BND-36",
    "category": "BND",
    "page": "reference/rules",
    "anchor": "bnd-36",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "view 바인딩은 `source_control_name`이 비어 있으면 자기 컨트롤을 읽고(BND-24), 있으면 기본·형제(`resolve_sibling_scope`)·조상(`resolve_ancestor_scope`) 범위 중 하나로 찾는다(BND-25). 두 스코프를 함께 켜면 오류를 남기고 형제 범위로 동작한다. `source_property_name`·`target_property_name`이 없으면 각각 `Must define a … property name in the binding!` 오류다. 컬렉션 바인딩은 `binding_collection_name`이 없으면 `Must define a collection name for the binding!` 오류다.",
      "en": "A view binding reads its own control when `source_control_name` is empty (BND-24), and when it is set it searches one of the default, sibling (`resolve_sibling_scope`), or ancestor (`resolve_ancestor_scope`) scopes (BND-25). Turning on both scopes together leaves an error and acts in the sibling scope. Without `source_property_name` or `target_property_name`, it is the error `Must define a ... property name in the binding!` respectively. A collection binding without `binding_collection_name` is the error `Must define a collection name for the binding!`."
    },
    "detail": {
      "ko": "view 바인딩은 `source_control_name`이 비어 있으면 자기 컨트롤을 읽고(BND-24), 있으면 기본·형제(`resolve_sibling_scope`)·조상(`resolve_ancestor_scope`) 범위 중 하나로 찾는다(BND-25). 두 스코프를 함께 켜면 오류를 남기고 형제 범위로 동작한다. `source_property_name`·`target_property_name`이 없으면 각각 `Must define a … property name in the binding!` 오류다. 컬렉션 바인딩은 `binding_collection_name`이 없으면 `Must define a collection name for the binding!` 오류다.",
      "en": "A view binding reads its own control when `source_control_name` is empty (BND-24), and otherwise looks up in one of the default, sibling (`resolve_sibling_scope`) and ancestor (`resolve_ancestor_scope`) scopes (BND-25). Turning both scopes on leaves an error and acts as the sibling scope. If `source_property_name` or `target_property_name` is missing, each gives a `Must define a … property name in the binding!` error. A collection binding without `binding_collection_name` gives the error `Must define a collection name for the binding!`."
    },
    "sources": "NB-09"
  },
  "COL-01": {
    "id": "COL-01",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-01",
    "proposal": false,
    "evidence": [
      "실측",
      "바닐라"
    ],
    "title": {
      "ko": "`collection_name`은 `stack_panel`, `grid`, `collection_panel`에 쓴다. `panel`, `image`에 쓰면 `Unknown property [collection_name]` 오류가 난다.",
      "en": "`collection_name` is used on `stack_panel`, `grid`, and `collection_panel`. Using it on `panel` or `image` gives an `Unknown property [collection_name]` error."
    },
    "detail": {
      "ko": "`collection_name`은 `stack_panel`, `grid`, `collection_panel`에 쓴다. `panel`, `image`에 쓰면 `Unknown property [collection_name]` 오류가 난다.",
      "en": "`collection_name` is used on `stack_panel`, `grid` and `collection_panel`. Using it on `panel` or `image` gives an `Unknown property [collection_name]` error."
    },
    "sources": "BC-facts, BC-S9, BC-S11, VN grid 66·stack_panel 25·collection_panel store_common.json:750, MJ 9장, 부록A C-01"
  },
  "COL-02": {
    "id": "COL-02",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-02",
    "proposal": false,
    "evidence": [
      "실측",
      "코드",
      "충돌"
    ],
    "title": {
      "ko": "`collection_index`는 인스턴스화 지점(부모 `controls` 안의 항목)에서만 받는다. 최상위 정의에 쓰면 거부되고, `image`에는 어디서든 거부되며, `label`에서는 조용히 무시된다. 그런데 bedrock-core가 실제로 출력하는 텍스트 캐리어는 `label` 참조에 `collection_index`를 직접 준다. 확실히 하려면 라벨을 패널로 감싸 패널 참조에 인덱스를 준다. 엔진은 컬렉션 이름을 가진 부모의 직속 자식에서만 `collection_index`를 읽는다(COL-44).",
      "en": "`collection_index` is accepted only at the instantiation point (an entry inside the parent's `controls`). Written in a top-level definition it is rejected, on `image` it is rejected anywhere, and on `label` it is silently ignored. Yet the text carrier that bedrock-core actually outputs gives `collection_index` directly on a `label` reference. To be sure, wrap the label in a panel and give the index on the panel reference. The engine reads `collection_index` only from direct children of a parent that has a collection name (COL-44)."
    },
    "detail": {
      "ko": "`collection_index`는 인스턴스화 지점(부모 `controls` 안의 항목)에서만 받는다. 최상위 정의에 쓰면 거부되고, `image`에는 어디서든 거부되며, `label`에서는 조용히 무시된다. 그런데 bedrock-core가 실제로 출력하는 텍스트 캐리어는 `label` 참조에 `collection_index`를 직접 준다. 확실히 하려면 라벨을 패널로 감싸 패널 참조에 인덱스를 준다. 엔진은 컬렉션 이름을 가진 부모의 직속 자식에서만 `collection_index`를 읽는다(COL-44). , 부록A C-31)",
      "en": "`collection_index` is received only at the instantiation point (an item inside the parent's `controls`). Written in a top-level definition it is rejected, on an `image` it is rejected anywhere, and on a `label` it is silently ignored. However, the text carrier that bedrock-core actually outputs gives `collection_index` directly to a `label` reference. To be sure, wrap the label in a panel and give the index to the panel reference. The engine reads `collection_index` only on direct children of a parent that has a collection name (COL-44). , Appendix A C-31)"
    },
    "sources": "BC-facts, NB-07, BC 4.1-(4), 부록A C-31"
  },
  "COL-03": {
    "id": "COL-03",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-03",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "인덱스는 적용된 지점부터 하위 트리로 상속된다. 그래서 정의는 한 번 쓰고, 참조 N개에 인덱스와 오프셋만 다르게 주는 패턴이 성립한다. 컬렉션을 읽는 바인딩은 각자 `binding_collection_name`으로 컬렉션을 지정한다.",
      "en": "The index is inherited down the subtree from the point where it is applied. So the pattern of writing a definition once and giving N references only different indexes and offsets works. Bindings that read a collection each specify the collection with `binding_collection_name`."
    },
    "detail": {
      "ko": "인덱스는 적용된 지점부터 하위 트리로 상속된다. 그래서 정의는 한 번 쓰고, 참조 N개에 인덱스와 오프셋만 다르게 주는 패턴이 성립한다. 컬렉션을 읽는 바인딩은 각자 `binding_collection_name`으로 컬렉션을 지정한다.",
      "en": "The index is inherited down the subtree from the point where it was applied. So the pattern of writing the definition once and giving N references only a different index and offset holds. Bindings that read a collection each specify the collection with `binding_collection_name`."
    },
    "sources": "BC-facts"
  },
  "COL-04": {
    "id": "COL-04",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-04",
    "proposal": false,
    "evidence": [
      "실측",
      "바닐라"
    ],
    "title": {
      "ko": "서버 폼 버튼은 버튼 자신에 `{ \"binding_type\": \"collection_details\", \"binding_collection_name\": \"form_buttons\" }`가 있어야 눌림이 그 엔트리로 집계된다. 조상만 인덱스를 주면 눌리기는 하지만 스크립트에는 `canceled`로 와서 Esc와 구분할 수 없고 로그도 없다(사용자가 닫으면 `reason=UserClosed`가 오는데, 바인딩 누락 때의 reason으로 구분되는지는 확인되지 않았다). 바닐라 폼 버튼도 같은 구조다.",
      "en": "A server form button must have `{ \"binding_type\": \"collection_details\", \"binding_collection_name\": \"form_buttons\" }` on the button itself for the press to be counted for that entry. If only an ancestor gives the index, it can be pressed but arrives at the script as `canceled`, indistinguishable from Esc, with no log (when the user closes it, `reason=UserClosed` arrives, but it was not confirmed whether the reason on a missing binding can be told apart). Vanilla form buttons have the same structure."
    },
    "detail": {
      "ko": "서버 폼 버튼은 버튼 자신에 가 있어야 눌림이 그 엔트리로 집계된다. 조상만 인덱스를 주면 눌리기는 하지만 스크립트에는 `canceled`로 와서 Esc와 구분할 수 없고 로그도 없다(사용자가 닫으면 `reason=UserClosed`가 오는데, 바인딩 누락 때의 reason으로 구분되는지는 확인되지 않았다). 바닐라 폼 버튼도 같은 구조다. `{실측, 바닐라}`",
      "en": "A server form button counts a press toward that entry only if the button itself has . If only an ancestor gives the index, it can be pressed but the script receives `canceled`, which cannot be told from Esc, and there is no log (when the user closes it, `reason=UserClosed` arrives, but whether the reason for a missing binding can be told apart was not confirmed). Vanilla form buttons have the same structure. `{measured, vanilla}`"
    },
    "sources": "BC-S1, BC-facts, VN server_form.json:211-225"
  },
  "COL-05": {
    "id": "COL-05",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-05",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "인덱스 호스트가 하나도 없는 컬렉션 바인딩은 0번 항목을 읽는다. 바닐라 상자 라벨을 0번 슬롯 아이템으로 숨기는 데 이 성질을 썼다.",
      "en": "A collection binding with no index host at all reads item 0. This property was used to hide the vanilla chest label with the slot 0 item."
    },
    "detail": {
      "ko": "인덱스 호스트가 하나도 없는 컬렉션 바인딩은 0번 항목을 읽는다. 바닐라 상자 라벨을 0번 슬롯 아이템으로 숨기는 데 이 성질을 썼다.",
      "en": "A collection binding with no index host at all reads item 0. This property was used to hide the vanilla chest label with the slot 0 item."
    },
    "sources": "BC-facts"
  },
  "COL-06": {
    "id": "COL-06",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-06",
    "proposal": false,
    "evidence": [
      "작동팩",
      "코드"
    ],
    "title": {
      "ko": "팩토리 없이 고정 인덱스 슬롯을 만들 수 있다: `collection_name`을 가진 스택 안에 `collection_index`를 박은 자식을 둔다. 스크립트는 항상 같은 개수의 엔트리를 보내(빈 값 포함) 인덱스를 고정한다.",
      "en": "You can make fixed index slots without a factory: put children with a baked-in `collection_index` inside a stack that has `collection_name`. The script always sends the same number of entries (including empty ones) so the indexes stay fixed."
    },
    "detail": {
      "ko": "팩토리 없이 고정 인덱스 슬롯을 만들 수 있다: `collection_name`을 가진 스택 안에 `collection_index`를 박은 자식을 둔다. 스크립트는 항상 같은 개수의 엔트리를 보내(빈 값 포함) 인덱스를 고정한다. )",
      "en": "You can make fixed-index slots without a factory: put children with hardcoded `collection_index` in a stack that has `collection_name`. The script always sends the same number of entries (including empty values) to fix the index. )"
    },
    "sources": "BA 5장 탭 28슬롯, BC 4.1-(3)"
  },
  "COL-07": {
    "id": "COL-07",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-07",
    "proposal": false,
    "evidence": [
      "실측",
      "추론"
    ],
    "title": {
      "ko": "상자 슬롯의 내구도(`#item_durability_current_amount`, `#item_durability_total_amount`)는 `collection_details` + `collection` 바인딩 쌍으로 읽으면 일반 컨트롤에서도 읽히고 비교·나눗셈이 된다. 진행 막대 렌더러 전용이라 안 읽힌다는 이전 기록은 이 쌍을 맞추지 않았던 것으로 보인다.",
      "en": "The durability of a chest slot (`#item_durability_current_amount`, `#item_durability_total_amount`), read as a pair of `collection_details` + `collection` bindings, can also be read in ordinary controls and compared and divided. The earlier record that it is only for the progress bar renderer and cannot be read seems to be from not matching this pair."
    },
    "detail": {
      "ko": "상자 슬롯의 내구도(`#item_durability_current_amount`, `#item_durability_total_amount`)는 `collection_details` + `collection` 바인딩 쌍으로 읽으면 일반 컨트롤에서도 읽히고 비교·나눗셈이 된다. 진행 막대 렌더러 전용이라 안 읽힌다는 이전 기록은 이 쌍을 맞추지 않았던 것으로 보인다.",
      "en": "The durability of chest slots (`#item_durability_current_amount`, `#item_durability_total_amount`) can be read in ordinary controls and compared and divided if read with a `collection_details` + `collection` binding pair. The earlier record that it could not be read because it is progress-bar-renderer-only appears to have been because this pair was not matched."
    },
    "sources": "BC-S14, BC-S6, BC 6.8-7, 부록A C-12"
  },
  "COL-08": {
    "id": "COL-08",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-08",
    "proposal": false,
    "evidence": [
      "바닐라"
    ],
    "title": {
      "ko": "팩토리는 (가) `\"type\": \"factory\"` 컨트롤(바닐라 36회, 공식 enum에 없음)이거나 (나) 컨테이너의 `\"factory\": { … }` 속성이다. `factory` 객체의 키는 `name`, `control_name`(한 종류) 또는 `control_ids`(종류별), `max_children_size`, `factory_variables`다.",
      "en": "A factory is either (a) a `\"type\": \"factory\"` control (36 times in vanilla, not in the official enum) or (b) the `\"factory\": { ... }` property of a container. The keys of a `factory` object are `name`, `control_name` (one kind) or `control_ids` (per kind), `max_children_size`, and `factory_variables`."
    },
    "detail": {
      "ko": "팩토리는 (가) `\"type\": \"factory\"` 컨트롤(바닐라 36회, 공식 enum에 없음)이거나 (나) 컨테이너의 `\"factory\": { … }` 속성이다. `factory` 객체의 키는 `name`, `control_name`(한 종류) 또는 `control_ids`(종류별), `max_children_size`, `factory_variables`다.",
      "en": "A factory is either (a) a `\"type\": \"factory\"` control (36 uses in vanilla, not in the official enum) or (b) the `\"factory\": { … }` property of a container. The keys of the `factory` object are `name`, `control_name` (one kind) or `control_ids` (per kind), `max_children_size` and `factory_variables`."
    },
    "sources": "VN server_form.json:25·126, VN factory 키 집계"
  },
  "COL-09": {
    "id": "COL-09",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-09",
    "proposal": false,
    "evidence": [
      "바닐라"
    ],
    "title": {
      "ko": "`control_ids`의 키는 엔진이 정한 데이터 종류이고, 값은 `\"@ns.정의\"`(바닐라 197회), `\"인스턴스이름@ns.정의\"`(36회), `\"ns.정의\"`(5회, 예 server_form.json:128)다. 액션 폼 행은 `button`, `label`, `header`, `divider`, 모달 행은 `label`, `toggle`, `slider`, `step_slider`, `dropdown`, `input`, `header`, `divider`, `multiselect`, HUD는 `hud_title_text`, `hud_actionbar_text`, 채팅은 `chat_item`이다.",
      "en": "The keys of `control_ids` are data kinds decided by the engine, and the values are `\"@ns.definition\"` (197 times in vanilla), `\"instancename@ns.definition\"` (36 times), or `\"ns.definition\"` (5 times, e.g. server_form.json:128). Action form rows are `button`, `label`, `header`, `divider`, modal rows are `label`, `toggle`, `slider`, `step_slider`, `dropdown`, `input`, `header`, `divider`, `multiselect`, the HUD has `hud_title_text` and `hud_actionbar_text`, and chat has `chat_item`."
    },
    "detail": {
      "ko": "`control_ids`의 키는 엔진이 정한 데이터 종류이고, 값은 `\"@ns.정의\"`(바닐라 197회), `\"인스턴스이름@ns.정의\"`(36회), `\"ns.정의\"`(5회, 예 server_form.json:128)다. 액션 폼 행은 `button`, `label`, `header`, `divider`, 모달 행은 `label`, `toggle`, `slider`, `step_slider`, `dropdown`, `input`, `header`, `divider`, `multiselect`, HUD는 `hud_title_text`, `hud_actionbar_text`, 채팅은 `chat_item`이다.",
      "en": "The keys of `control_ids` are data kinds the engine decides, and the values are `\"@ns.definition\"` (197 uses in vanilla), `\"instancename@ns.definition\"` (36 uses) and `\"ns.definition\"` (5 uses, for example server_form.json:128). The action form rows are `button`, `label`, `header` and `divider`, the modal rows are `label`, `toggle`, `slider`, `step_slider`, `dropdown`, `input`, `header`, `divider` and `multiselect`, the HUD ones are `hud_title_text` and `hud_actionbar_text`, and chat's is `chat_item`."
    },
    "sources": "VN server_form.json:126·283, hud_screen.json:3406·3417·1040"
  },
  "COL-10": {
    "id": "COL-10",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-10",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "`visible`은 그리기만 막고 생성과 레이아웃은 막지 못한다. 서버 폼 아래에 붙인 화면은 `visible`로 가려도 모든 폼을 열 때마다 전부 생성·레이아웃된다(5,546개 컨트롤 재배치 실측). 그 안의 슬라이더처럼 생성 시 상태를 검증하는 컴포넌트는 숨겨져 있어도 assert를 낸다. 컨트롤 자신의 `binding_condition: \"visible\"`도 조상이 숨었을 때 평가를 막지 못한다.",
      "en": "`visible` only blocks drawing and does not block creation and layout. A screen attached under a server form is fully created and laid out every time any form opens even if hidden with `visible` (measured relayout of 5,546 controls). Components that validate state at creation, such as a slider inside it, give an assert even when hidden. A control's own `binding_condition: \"visible\"` also cannot stop evaluation when an ancestor is hidden."
    },
    "detail": {
      "ko": "`visible`은 그리기만 막고 생성과 레이아웃은 막지 못한다. 서버 폼 아래에 붙인 화면은 `visible`로 가려도 모든 폼을 열 때마다 전부 생성·레이아웃된다(5,546개 컨트롤 재배치 실측). 그 안의 슬라이더처럼 생성 시 상태를 검증하는 컴포넌트는 숨겨져 있어도 assert를 낸다. 컨트롤 자신의 `binding_condition: \"visible\"`도 조상이 숨었을 때 평가를 막지 못한다.",
      "en": "`visible` only stops drawing and does not stop creation and layout. A screen attached under the server form is fully created and laid out every time any form is opened, even if hidden with `visible` (measured with 5,546 controls repositioned). A component inside it that validates its state at creation, such as a slider, raises an assert even when hidden. The control's own `binding_condition: \"visible\"` also does not stop evaluation when an ancestor is hidden."
    },
    "sources": "BC-S8, BW-best"
  },
  "COL-11": {
    "id": "COL-11",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-11",
    "proposal": false,
    "evidence": [
      "실측",
      "바닐라"
    ],
    "title": {
      "ko": "`#collection_length`를 바인딩하면 팩토리가 그 수만큼만 셀을 만든다. 0이면 아무것도 만들지 않는다. `((#mode = 'on') * 1)` 같은 계산 길이로 \"필요한 화면 하나만 생성\"하는 게이트가 된다.",
      "en": "If you bind `#collection_length`, the factory creates only that many cells. 0 creates nothing. A computed length like `((#mode = 'on') * 1)` becomes a gate that \"creates only the one needed screen\"."
    },
    "detail": {
      "ko": "`#collection_length`를 바인딩하면 팩토리가 그 수만큼만 셀을 만든다. 0이면 아무것도 만들지 않는다. `((#mode = 'on') * 1)` 같은 계산 길이로 \"필요한 화면 하나만 생성\"하는 게이트가 된다.",
      "en": "If you bind `#collection_length`, the factory creates only that many cells. If 0, nothing is created. A computed length like `((#mode = 'on') * 1)` becomes a gate that \"creates only the one screen needed\"."
    },
    "sources": "BC-S11, VN server_form.json:138·300"
  },
  "COL-12": {
    "id": "COL-12",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-12",
    "proposal": false,
    "evidence": [
      "실측",
      "바닐라"
    ],
    "title": {
      "ko": "생성을 막는 방법 비교.",
      "en": "Comparison of ways to block creation."
    },
    "detail": {
      "ko": "생성을 막는 방법 비교.",
      "en": "A comparison of ways to stop creation."
    },
    "sources": "BC-S8, BC-S11, VN"
  },
  "COL-13": {
    "id": "COL-13",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-13",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "행 타입 팩토리는 매칭되는 모든 행마다 셀을 만든다. 슬라이더 행이 셋이면 슬라이더 셀이 소켓마다 셋 생긴다. 자기 행이 아닌 셀은 `#anchored_offset_value_y`로 화면 밖으로 민다(`((not #mine) * 1000)`).",
      "en": "A row-type factory creates a cell for every matching row. With three slider rows, three slider cells are created per socket. Cells that are not their own row are pushed off screen with `#anchored_offset_value_y` (`((not #mine) * 1000)`)."
    },
    "detail": {
      "ko": "행 타입 팩토리는 매칭되는 모든 행마다 셀을 만든다. 슬라이더 행이 셋이면 슬라이더 셀이 소켓마다 셋 생긴다. 자기 행이 아닌 셀은 `#anchored_offset_value_y`로 화면 밖으로 민다(`((not #mine) * 1000)`).",
      "en": "A row type factory creates a cell for every matching row. If there are three slider rows, three slider cells are created per socket. Cells that are not their own row are pushed off screen with `#anchored_offset_value_y` (`((not #mine) * 1000)`)."
    },
    "sources": "BC-S9"
  },
  "COL-14": {
    "id": "COL-14",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-14",
    "proposal": false,
    "evidence": [
      "작동팩",
      "코드"
    ],
    "title": {
      "ko": "같은 이름의 엔진 팩토리를 다른 위치에 한 번 더 선언하면 같은 데이터로 두 번째 UI가 만들어진다. 세 팩이 모두 이 방법을 쓴다: `server_form_factory`(BC, BA), `hud_title_text_factory`(BA, AP), `chat_item_factory`(AP).",
      "en": "Declaring an engine factory of the same name once more at another position builds a second UI from the same data. All three packs use this method: `server_form_factory` (BC, BA), `hud_title_text_factory` (BA, AP), `chat_item_factory` (AP)."
    },
    "detail": {
      "ko": "같은 이름의 엔진 팩토리를 다른 위치에 한 번 더 선언하면 같은 데이터로 두 번째 UI가 만들어진다. 세 팩이 모두 이 방법을 쓴다: `server_form_factory`(BC, BA), `hud_title_text_factory`(BA, AP), `chat_item_factory`(AP). , BA 2장·6장, AP 4.1·4.5, BW-form, BW-intro)",
      "en": "If you declare an engine factory of the same name once more at another location, a second UI is created from the same data. All three packs use this method: `server_form_factory` (BC, BA), `hud_title_text_factory` (BA, AP) and `chat_item_factory` (AP). , BA chapters 2 and 6, AP 4.1 and 4.5, BW-form, BW-intro)"
    },
    "sources": "BC 4.1-(1), BA 2장·6장, AP 4.1·4.5, BW-form, BW-intro"
  },
  "COL-15": {
    "id": "COL-15",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-15",
    "proposal": false,
    "evidence": [
      "바닐라",
      "코드"
    ],
    "title": {
      "ko": "`factory_variables: [\"$a\", \"$b\"]`는 팩토리 호스트의 변수를 만들어진 컨트롤로 넘긴다. 엔진은 각 이름을 팩토리를 선언한 스코프에서 찾아 그 값을 넘긴다(COL-41). 바닐라에서 37회(store, pdp, marketplace_sdl, realms_settings, toast_screen 등) 쓰지만 이 프로젝트 출처 중 게임에서 실측한 곳은 없다.",
      "en": "`factory_variables: [\"$a\", \"$b\"]` passes the factory host's variables to the created controls. The engine finds each name in the scope where the factory was declared and passes that value (COL-41). It is used 37 times in vanilla (store, pdp, marketplace_sdl, realms_settings, toast_screen, and others), but none of this project's sources measured it in game."
    },
    "detail": {
      "ko": "`factory_variables: [\"$a\", \"$b\"]`는 팩토리 호스트의 변수를 만들어진 컨트롤로 넘긴다. 엔진은 각 이름을 팩토리를 선언한 스코프에서 찾아 그 값을 넘긴다(COL-41). 바닐라에서 37회(store, pdp, marketplace_sdl, realms_settings, toast_screen 등) 쓰지만 이 프로젝트 출처 중 게임에서 실측한 곳은 없다.",
      "en": "`factory_variables: [\"$a\", \"$b\"]` passes the factory host's variables to the created controls. The engine looks up each name in the scope that declared the factory and passes its value (COL-41). Vanilla uses it 37 times (store, pdp, marketplace_sdl, realms_settings, toast_screen, etc.), but none of this project's sources measured it in game."
    },
    "sources": "VN store_common.json 등 37회, NB-04"
  },
  "COL-16": {
    "id": "COL-16",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-16",
    "proposal": false,
    "evidence": [
      "바닐라",
      "작동팩",
      "추론"
    ],
    "title": {
      "ko": "`max_children_size`는 팩토리가 만들 최대 개수다(바닐라 HUD 채팅 50, AP 토스트 12). 같은 데이터를 공유하는 두 번째 팩토리는 보이지 않는 항목도 한도를 소모한다.",
      "en": "`max_children_size` is the maximum count a factory will create (vanilla HUD chat 50, AP toast 12). A second factory sharing the same data also consumes the limit with invisible items."
    },
    "detail": {
      "ko": "`max_children_size`는 팩토리가 만들 최대 개수다(바닐라 HUD 채팅 50, AP 토스트 12). 같은 데이터를 공유하는 두 번째 팩토리는 보이지 않는 항목도 한도를 소모한다.",
      "en": "`max_children_size` is the maximum number a factory creates (vanilla HUD chat 50, AP toast 12). A second factory sharing the same data uses up the limit even on invisible items."
    },
    "sources": "VN hud_screen.json:1041, AP 4.5"
  },
  "COL-17": {
    "id": "COL-17",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-17",
    "proposal": false,
    "evidence": [
      "바닐라",
      "작동팩"
    ],
    "title": {
      "ko": "엔진 팩토리가 만든 컨트롤은 데이터를 변수로 받는 경우가 있다. 바닐라 액션바 라벨은 `\"text\": \"$actionbar_text\"`를 쓰고, AP는 `hud_title_text_factory`가 만든 컨트롤에서 `$title_text`를 읽어 `ignored`로 판정한다. 변수는 생성 시 한 번 정해지므로 값이 바뀌면 팩토리가 컨트롤을 다시 만든다.",
      "en": "Controls made by an engine factory sometimes receive data as variables. The vanilla action bar label uses `\"text\": \"$actionbar_text\"`, and AP reads `$title_text` in a control made by `hud_title_text_factory` and judges with `ignored`. The variable is fixed once at creation, so when the value changes the factory recreates the control."
    },
    "detail": {
      "ko": "엔진 팩토리가 만든 컨트롤은 데이터를 변수로 받는 경우가 있다. 바닐라 액션바 라벨은 `\"text\": \"$actionbar_text\"`를 쓰고, AP는 `hud_title_text_factory`가 만든 컨트롤에서 `$title_text`를 읽어 `ignored`로 판정한다. 변수는 생성 시 한 번 정해지므로 값이 바뀌면 팩토리가 컨트롤을 다시 만든다.",
      "en": "Controls created by an engine factory sometimes receive data as variables. The vanilla actionbar label uses `\"text\": \"$actionbar_text\"`, and AP reads `$title_text` in a control created by `hud_title_text_factory` and decides with `ignored`. A variable is decided once at creation, so when the value changes the factory recreates the control."
    },
    "sources": "VN hud_screen.json:2158, AP 4.1, 부록A C-28, BW-intro"
  },
  "COL-18": {
    "id": "COL-18",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-18",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "팩토리가 만드는 셀이 크면 화면 열기가 느려진다. BA는 노드 하나에 컨트롤 수백 개가 들어 모든 탭을 보내면 여는 데 수 초가 걸렸고, 선택된 탭의 노드만 보내도록 바꿨다. 셀 크기 × 개수를 줄이는 것이 먼저다.",
      "en": "If the cells a factory makes are large, opening the screen gets slow. In BA a node held hundreds of controls and sending every tab took several seconds to open, so it was changed to send only the nodes of the selected tab. Reducing cell size × count comes first."
    },
    "detail": {
      "ko": "팩토리가 만드는 셀이 크면 화면 열기가 느려진다. BA는 노드 하나에 컨트롤 수백 개가 들어 모든 탭을 보내면 여는 데 수 초가 걸렸고, 선택된 탭의 노드만 보내도록 바꿨다. 셀 크기 × 개수를 줄이는 것이 먼저다.",
      "en": "If the cells a factory creates are big, opening the screen is slow. BA had hundreds of controls in one node, so opening took several seconds when all tabs were sent, and it was changed to send only the selected tab's node. Reducing cell size x count comes first."
    },
    "sources": "BA 4장"
  },
  "COL-19": {
    "id": "COL-19",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-19",
    "proposal": false,
    "evidence": [
      "바닐라",
      "코드"
    ],
    "title": {
      "ko": "1.26.50 바닐라의 액션 폼 컬렉션(`form_buttons`)에는 `button`뿐 아니라 `label`, `header`, `divider` 행도 들어온다. 응답의 `selection`은 버튼만 세므로 `label()`을 섞으면 컬렉션 인덱스와 `selection` 번호가 어긋난다. 데이터 채널로 쓸 때는 모든 엔트리를 `button()`으로 보내고, 누를 수 없는 셀은 버튼 매핑을 빼서 만든다.",
      "en": "In the 1.26.50 vanilla action form collection (`form_buttons`), not only `button` but also `label`, `header`, and `divider` rows come in. The response `selection` counts only buttons, so mixing in `label()` makes the collection index and the `selection` number drift apart. When using it as a data channel, send every entry as `button()` and make cells that cannot be pressed by removing the button mapping."
    },
    "detail": {
      "ko": "1.26.50 바닐라의 액션 폼 컬렉션(`form_buttons`)에는 `button`뿐 아니라 `label`, `header`, `divider` 행도 들어온다. 응답의 `selection`은 버튼만 세므로 `label()`을 섞으면 컬렉션 인덱스와 `selection` 번호가 어긋난다. 데이터 채널로 쓸 때는 모든 엔트리를 `button()`으로 보내고, 누를 수 없는 셀은 버튼 매핑을 빼서 만든다. )",
      "en": "The action form collection (`form_buttons`) in 1.26.50 vanilla receives not only `button` but also `label`, `header` and `divider` rows. The `selection` of the response counts only buttons, so mixing in `label()` shifts the collection index and the `selection` number. When using it as a data channel, send every entry with `button()` and make cells that must not be pressable by removing the button mapping. )"
    },
    "sources": "VN server_form.json:126-134, BC 4.1-(3)"
  },
  "COL-20": {
    "id": "COL-20",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-20",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "모달 폼의 `custom_form` 행과 `formValues`는 1:1로 정렬된다. `label()`도 행이고 응답에는 그 자리에 `null`이 온다.",
      "en": "The `custom_form` rows of a modal form and `formValues` align 1:1. `label()` is also a row and `null` arrives in its place in the response."
    },
    "detail": {
      "ko": "모달 폼의 `custom_form` 행과 `formValues`는 1:1로 정렬된다. `label()`도 행이고 응답에는 그 자리에 `null`이 온다.",
      "en": "The `custom_form` rows of a modal form and `formValues` line up 1:1. A `label()` is also a row and `null` arrives in its place in the response."
    },
    "sources": "BC-S3"
  },
  "COL-21": {
    "id": "COL-21",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-21",
    "proposal": false,
    "evidence": [
      "바닐라",
      "코드",
      "실측"
    ],
    "title": {
      "ko": "1.26.50 바닐라 `custom_form` 팩토리에 `multiselect` 행이 생겼지만 공개 Script API(`@minecraft/server-ui` 2.2.0~2.5.0-beta, `ModalFormData`와 `CustomForm` 모두)에는 이 행을 보내는 메서드가 없다. 폼 JSON을 직접 보내는 서버는 쓸 수 있다(HOST-46).",
      "en": "A `multiselect` row appeared in the 1.26.50 vanilla `custom_form` factory, but the public Script API (`@minecraft/server-ui` 2.2.0~2.5.0-beta, both `ModalFormData` and `CustomForm`) has no method that sends this row. A server that sends the form JSON directly can use it (HOST-46)."
    },
    "detail": {
      "ko": "1.26.50 바닐라 `custom_form` 팩토리에 `multiselect` 행이 생겼지만 공개 Script API(`@minecraft/server-ui` 2.2.0~2.5.0-beta, `ModalFormData`와 `CustomForm` 모두)에는 이 행을 보내는 메서드가 없다. 폼 JSON을 직접 보내는 서버는 쓸 수 있다(HOST-46).",
      "en": "A `multiselect` row was added to the `custom_form` factory in 1.26.50 vanilla, but the public Script API (`@minecraft/server-ui` 2.2.0~2.5.0-beta, both `ModalFormData` and `CustomForm`) has no method that sends this row. A server that sends the form JSON directly can use it (HOST-46)."
    },
    "sources": "VN server_form.json:294, MJ 4.1, MS"
  },
  "COL-22": {
    "id": "COL-22",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-22",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "`control_ids`를 가진 팩토리에 `#collection_length`로 문자열 배열(그 `control_ids`의 키 목록)을 주면 배열 순서대로 그 종류의 컨트롤을 만든다. 식에서 배열을 만들 수는 없으므로 `property_bag`에 배열을 미리 두고(`\"#list1\": [\"apple\", \"label\"]`), `('#list' + #choice)`로 이름을 조립해 고른다. `control_name` 팩토리는 정수를 받는다.",
      "en": "Giving a factory with `control_ids` a string array (the list of keys of that `control_ids`) as `#collection_length` creates controls of that kind in array order. An expression cannot build an array, so put the arrays in `property_bag` beforehand (`\"#list1\": [\"apple\", \"label\"]`) and pick by assembling the name with `('#list' + #choice)`. A `control_name` factory takes an integer."
    },
    "detail": {
      "ko": "`control_ids`를 가진 팩토리에 `#collection_length`로 문자열 배열(그 `control_ids`의 키 목록)을 주면 배열 순서대로 그 종류의 컨트롤을 만든다. 식에서 배열을 만들 수는 없으므로 `property_bag`에 배열을 미리 두고(`\"#list1\": [\"apple\", \"label\"]`), `('#list' + #choice)`로 이름을 조립해 고른다. `control_name` 팩토리는 정수를 받는다.",
      "en": "If you give a factory with `control_ids` a string array (the list of keys of that `control_ids`) through `#collection_length`, it creates controls of those kinds in array order. An expression cannot build an array, so put the array in `property_bag` in advance (`\"#list1\": [\"apple\", \"label\"]`) and pick it by assembling the name with `('#list' + #choice)`. A `control_name` factory takes an integer."
    },
    "sources": "BW-dyn 스크린샷 2장"
  },
  "COL-23": {
    "id": "COL-23",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-23",
    "proposal": false,
    "evidence": [
      "실측",
      "코드"
    ],
    "title": {
      "ko": "식이 만든 `'#이름'` 문자열은 같은 컨트롤의 `property_bag`에서 그 이름의 값으로 읽힌다(사전 조회). COL-22와 bedrock-core의 화면 라우팅(HOST-06 `('#route_' + #title_text)`)이 같은 메커니즘이다. 원리: 괄호 묶음의 결과가 `#이름` 문자열이면 그 컨트롤 주머니의 값으로 바뀐다(EXP-35).",
      "en": "A `'#name'` string produced by an expression is read as the value of that name in the same control's `property_bag` (dictionary lookup). COL-22 and the screen routing of bedrock-core (HOST-06 `('#route_' + #title_text)`) are the same mechanism. Principle: if the result of a parenthesized group is a `#name` string, it becomes the value in that control's bag (EXP-35)."
    },
    "detail": {
      "ko": "식이 만든 `'#이름'` 문자열은 같은 컨트롤의 `property_bag`에서 그 이름의 값으로 읽힌다(사전 조회). COL-22와 bedrock-core의 화면 라우팅(HOST-06 `('#route_' + #title_text)`)이 같은 메커니즘이다. 원리: 괄호 묶음의 결과가 `#이름` 문자열이면 그 컨트롤 주머니의 값으로 바뀐다(EXP-35). , CN-run)",
      "en": "A `'#name'` string made by an expression is read as the value of that name in the same control's `property_bag` (dictionary lookup). COL-22 and bedrock-core's screen routing (HOST-06 `('#route_' + #title_text)`) are the same mechanism. Principle: if the result of a parenthesized group is a `#name` string, it is replaced by the value in that control's bag (EXP-35). , CN-run)"
    },
    "sources": "BW-dyn 스크린샷, BC 4.1-(2), CN-run"
  },
  "COL-24": {
    "id": "COL-24",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-24",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "`#collection_length`로 직접 구동하는 팩토리는 컬렉션을 지원하는 컨테이너(`stack_panel`, `collection_panel`)의 `factory` 속성으로 둔다. 위키 예제는 `collection_name` 없이 `stack_panel` + `factory`만으로 동작했다.",
      "en": "A factory driven directly by `#collection_length` is placed in the `factory` property of a container that supports collections (`stack_panel`, `collection_panel`). The wiki example worked with just `stack_panel` + `factory` and no `collection_name`."
    },
    "detail": {
      "ko": "`#collection_length`로 직접 구동하는 팩토리는 컬렉션을 지원하는 컨테이너(`stack_panel`, `collection_panel`)의 `factory` 속성으로 둔다. 위키 예제는 `collection_name` 없이 `stack_panel` + `factory`만으로 동작했다.",
      "en": "A factory driven directly by `#collection_length` goes in the `factory` property of a container that supports collections (`stack_panel`, `collection_panel`). The wiki example worked with only `stack_panel` + `factory` without `collection_name`."
    },
    "sources": "BW-dyn 스크린샷"
  },
  "COL-25": {
    "id": "COL-25",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-25",
    "proposal": false,
    "evidence": [
      "코드",
      "바닐라"
    ],
    "title": {
      "ko": "`\"type\": \"factory\"` 컨트롤은 컨트롤 이름이 곧 팩토리 이름이다(`server_form_factory`). 두 번째 팩토리는 `\"type\": \"panel\"` + `\"factory\": { \"name\": \"server_form_factory\", … }`로 만들고, 컨트롤 이름은 원본·형제와 겹치지 않게 짓는다. 엔진은 `type: factory` 컨트롤에서 팩토리 이름을 따로 읽지 않고, 다른 타입은 `factory` 객체의 `name`을 읽는다(COL-42).",
      "en": "For a `\"type\": \"factory\"` control, the control name is the factory name (`server_form_factory`). Make a second factory with `\"type\": \"panel\"` + `\"factory\": { \"name\": \"server_form_factory\", ... }`, and name the control so it does not overlap with the original or siblings. The engine does not read the factory name separately from a `type: factory` control, and reads the `name` of the `factory` object for other types (COL-42)."
    },
    "detail": {
      "ko": "`\"type\": \"factory\"` 컨트롤은 컨트롤 이름이 곧 팩토리 이름이다(`server_form_factory`). 두 번째 팩토리는 `\"type\": \"panel\"` + `\"factory\": { \"name\": \"server_form_factory\", … }`로 만들고, 컨트롤 이름은 원본·형제와 겹치지 않게 짓는다. 엔진은 `type: factory` 컨트롤에서 팩토리 이름을 따로 읽지 않고, 다른 타입은 `factory` 객체의 `name`을 읽는다(COL-42). )",
      "en": "For a `\"type\": \"factory\"` control, the control name is the factory name (`server_form_factory`). Make a second factory with `\"type\": \"panel\"` + `\"factory\": { \"name\": \"server_form_factory\", … }` and name the control so it does not collide with the original or siblings. The engine does not read a factory name separately from a `type: factory` control, and other types read `name` of the `factory` object (COL-42). )"
    },
    "sources": "NB-05, VN server_form.json, BW-form(이름 겹침 주의)"
  },
  "COL-26": {
    "id": "COL-26",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-26",
    "proposal": false,
    "evidence": [
      "미검증"
    ],
    "title": {
      "ko": "컬렉션과 함께 쓰는 팩토리·그리드는 만든 컨트롤에 인덱스를 자동으로 붙인다.",
      "en": "Factories and grids used with collections automatically attach an index to the controls they make."
    },
    "detail": {
      "ko": "컬렉션과 함께 쓰는 팩토리·그리드는 만든 컨트롤에 인덱스를 자동으로 붙인다.",
      "en": "Factories and grids used with collections automatically attach an index to the controls they create."
    },
    "sources": "BW-dyn"
  },
  "COL-27": {
    "id": "COL-27",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-27",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "`#collection_length`는 정수, 불리언(1/0), 역할 이름 배열을 받는다. 리터럴 숫자 길이는 `control_name` 템플릿 팩토리에서만 그 수만큼 만든다. 팩토리에 없는 역할 이름은 아무것도 만들지 않는다. 엔진도 상점 화면에서 역할 이름 배열(`[\"tag\", …]`)을 길이 값으로 준다(COL-46).",
      "en": "`#collection_length` accepts an integer, a boolean (1/0), or an array of role names. A literal numeric length creates that many only in a `control_name` template factory. A role name not in the factory creates nothing. The engine also gives an array of role names (`[\"tag\", ...]`) as the length value on the store screen (COL-46)."
    },
    "detail": {
      "ko": "`#collection_length`는 정수, 불리언(1/0), 역할 이름 배열을 받는다. 리터럴 숫자 길이는 `control_name` 템플릿 팩토리에서만 그 수만큼 만든다. 팩토리에 없는 역할 이름은 아무것도 만들지 않는다. 엔진도 상점 화면에서 역할 이름 배열(`[\"tag\", …]`)을 길이 값으로 준다(COL-46). , CN 테스트 N12·B41(그 밖))",
      "en": "`#collection_length` accepts an integer, a boolean (1/0) and an array of role names. A literal numeric length creates that many only in a `control_name` template factory. A role name not in the factory creates nothing. The engine also gives a role name array (`[\"tag\", …]`) as a length value on the store screen (COL-46). , CN tests N12 and B41 (the rest))"
    },
    "sources": "NB-14(역할 이름 배열), CN 테스트 N12·B41(그 밖)"
  },
  "COL-28": {
    "id": "COL-28",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-28",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "`control_name`이 있으면 `control_ids`는 읽히지 않는다. 둘을 함께 두지 않는다. `max_children_size: 0`은 무제한이다.",
      "en": "If `control_name` is present, `control_ids` is not read. Do not put both. `max_children_size: 0` is unlimited."
    },
    "detail": {
      "ko": "`control_name`이 있으면 `control_ids`는 읽히지 않는다. 둘을 함께 두지 않는다. `max_children_size: 0`은 무제한이다. , CN(`max_children_size: 0`))",
      "en": "If `control_name` exists, `control_ids` is not read. Do not put both together. `max_children_size: 0` is unlimited. , CN (`max_children_size: 0`))"
    },
    "sources": "NB-06(`control_name` 우선), CN(`max_children_size: 0`)"
  },
  "COL-29": {
    "id": "COL-29",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-29",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "`control_name` 템플릿과 `grid_item_template`의 셀은 팩토리를 선언한 곳의 `$변수`를 본다. `control_ids`로 만든 컨트롤은 자기 변수와 `factory_variables`로 넘긴 변수만 본다. 엔진은 `control_name` 원형을 팩토리 해석 때 선언 스코프로 만든다(COL-45).",
      "en": "Cells of a `control_name` template and `grid_item_template` see the `$variable`s of where the factory was declared. Controls made with `control_ids` see only their own variables and the ones passed with `factory_variables`. The engine builds the `control_name` prototype in the declaring scope when resolving the factory (COL-45)."
    },
    "detail": {
      "ko": "`control_name` 템플릿과 `grid_item_template`의 셀은 팩토리를 선언한 곳의 `$변수`를 본다. `control_ids`로 만든 컨트롤은 자기 변수와 `factory_variables`로 넘긴 변수만 본다. 엔진은 `control_name` 원형을 팩토리 해석 때 선언 스코프로 만든다(COL-45). , CN, COL-15 보강)",
      "en": "Cells of a `control_name` template and of `grid_item_template` see the `$variables` of where the factory was declared. Controls made by `control_ids` see only their own variables and those passed with `factory_variables`. The engine builds the `control_name` prototype in the declaring scope when resolving the factory (COL-45). , CN, COL-15 reinforcement)"
    },
    "sources": "NB-13(`control_name` 원형), CN, COL-15 보강"
  },
  "COL-30": {
    "id": "COL-30",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-30",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "엔진은 그리드 칸 수를 `#grid_number_size`, 팩토리 생성 수를 `#collection_number_size`, 컬렉션 크기를 `#collection_total_items`로 주머니에 쓴다. view 바인딩으로 읽어 \"비었음\" 표시 등에 쓸 수 있다.",
      "en": "The engine writes the grid cell count to `#grid_number_size`, the number a factory created to `#collection_number_size`, and the collection size to `#collection_total_items` in the bag. They can be read with view bindings and used for things like an \"empty\" display."
    },
    "detail": {
      "ko": "엔진은 그리드 칸 수를 `#grid_number_size`, 팩토리 생성 수를 `#collection_number_size`, 컬렉션 크기를 `#collection_total_items`로 주머니에 쓴다. view 바인딩으로 읽어 \"비었음\" 표시 등에 쓸 수 있다.",
      "en": "The engine writes the grid cell count as `#grid_number_size`, the factory creation count as `#collection_number_size` and the collection size as `#collection_total_items` into the bag. A view binding can read them for use such as an \"empty\" indicator."
    },
    "sources": "CN 테스트 B55·B41"
  },
  "COL-31": {
    "id": "COL-31",
    "category": "COL",
    "page": "json-ui/factory-synthesis",
    "anchor": "col-31",
    "proposal": false,
    "evidence": [
      "작동팩",
      "미검증"
    ],
    "title": {
      "ko": "액션 폼 버튼 수는 전역 바인딩 `#form_button_length`로 읽을 수 있다고 한다.",
      "en": "The action form button count is said to be readable through the global binding `#form_button_length`."
    },
    "detail": {
      "ko": "액션 폼 버튼 수는 전역 바인딩 `#form_button_length`로 읽을 수 있다고 한다. `binding_name_override`로 팩토리의 `#collection_length`나 그리드의 `#maximum_grid_items`에 넣는다. 바닐라 1.26.50 UI는 이 이름을 쓰지 않는다.",
      "en": "The action form button count is said to be readable through the global binding `#form_button_length`. Put it into the factory's `#collection_length` or the grid's `#maximum_grid_items` with `binding_name_override`. The vanilla 1.26.50 UI does not use this name."
    },
    "sources": "SLB 8장, EUB 예제"
  },
  "COL-34": {
    "id": "COL-34",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-34",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "클라이언트는 액션 폼의 `#form_button_length`를 지금까지 보인 가장 큰 폼의 버튼 수로 붙잡고 있었다(디버그 라벨 93, 재접속 뒤에도 93, `always_when_visible`로도 그대로). 이 값으로 격자 크기를 정하면 작은 폼에서 빈 칸이 이어진다. 칸 수는 본문 같은 데이터 채널로 따로 보낸다(EXP-45).",
      "en": "The client held the action form's `#form_button_length` at the button count of the largest form shown so far (debug label 93, still 93 after reconnecting, and unchanged even with `always_when_visible`). Deciding a grid size with this value leaves empty cells on a smaller form. Send the cell count separately through a data channel such as the body (EXP-45)."
    },
    "detail": {
      "ko": "클라이언트는 액션 폼의 `#form_button_length`를 지금까지 보인 가장 큰 폼의 버튼 수로 붙잡고 있었다(디버그 라벨 93, 재접속 뒤에도 93, `always_when_visible`로도 그대로). 이 값으로 격자 크기를 정하면 작은 폼에서 빈 칸이 이어진다. 칸 수는 본문 같은 데이터 채널로 따로 보낸다(EXP-45).",
      "en": "The client held the action form's `#form_button_length` at the button count of the largest form seen so far (debug label 93, still 93 after reconnecting, unchanged with `always_when_visible` too). If you set the grid size from this value, empty cells continue in a smaller form. Send the cell count separately through a data channel such as the body (EXP-45)."
    },
    "sources": "DF"
  },
  "COL-35": {
    "id": "COL-35",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-35",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "줄바꿈 격자는 숨은 버튼에도 칸을 준다. 탭·뒤로·쪽 같은 표식 버튼은 칸 버튼 뒤에 보내고(앞에 두면 칸이 밀려 시작), 격자 크기에는 칸 버튼 수만 넣는다(넣으면 빈 줄이 하나 더 생겨 창이 몇 픽셀 스크롤됐다).",
      "en": "A wrapping grid gives cells even to hidden buttons. Send marker buttons such as tab, back, and page after the cell buttons (putting them first pushes the cells to start later), and put only the cell button count in the grid size (putting more makes one extra empty row and the window scrolled a few pixels)."
    },
    "detail": {
      "ko": "줄바꿈 격자는 숨은 버튼에도 칸을 준다. 탭·뒤로·쪽 같은 표식 버튼은 칸 버튼 뒤에 보내고(앞에 두면 칸이 밀려 시작), 격자 크기에는 칸 버튼 수만 넣는다(넣으면 빈 줄이 하나 더 생겨 창이 몇 픽셀 스크롤됐다).",
      "en": "A wrapping grid gives cells to hidden buttons too. Send marker buttons such as tab, back and page after the cell buttons (if placed before, the cells start shifted), and put only the number of cell buttons in the grid size (putting more made one extra empty row and the window scrolled a few pixels)."
    },
    "sources": "DF"
  },
  "COL-36": {
    "id": "COL-36",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-36",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "팩토리·격자 길이를 `#form_button_contents`·`#form_button_length`의 식(`* 1`, `* (표식 일치)`)으로 계산하면 팩토리는 버튼을 만들지 않았고 격자는 식 자체가 됐다. 엔진 이름은 `binding_name_override`로 그대로 옮긴다.",
      "en": "When the factory and grid length were computed with an expression on `#form_button_contents` and `#form_button_length` (`* 1`, `* (marker match)`), the factory created no buttons and the grid became the expression itself. Move the engine name as is with `binding_name_override`."
    },
    "detail": {
      "ko": "팩토리·격자 길이를 `#form_button_contents`·`#form_button_length`의 식(`* 1`, `* (표식 일치)`)으로 계산하면 팩토리는 버튼을 만들지 않았고 격자는 식 자체가 됐다. 엔진 이름은 `binding_name_override`로 그대로 옮긴다.",
      "en": "When the factory and grid lengths were computed with expressions of `#form_button_contents` and `#form_button_length` (`* 1`, `* (marker match)`), the factory did not create buttons and the grid became the expression itself. Move engine names as they are with `binding_name_override`."
    },
    "sources": "DF"
  },
  "COL-37": {
    "id": "COL-37",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-37",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "줄마다 버튼 전체를 걷는 스택을 두면(48칸 격자 + 재료 줄) 화면이 여는 데 4~5초 걸렸고, 칸마다 `collection_index`로 버튼 하나만 읽는 고정 배치(COL-06)로 바꾸니 1초쯤이 됐다. 칸마다 버튼도 하나만 둔다(누르는 것·안 누르는 것을 둘 다 두면 컨트롤이 두 배다).",
      "en": "A stack that walks all the buttons for each row (a 48-cell grid + a materials row) took 4 to 5 seconds to open the screen, and switching to a fixed layout (COL-06) that reads just one button per cell with `collection_index` brought it to about 1 second. Also put only one button per cell (having both a pressable one and a non-pressable one doubles the controls)."
    },
    "detail": {
      "ko": "줄마다 버튼 전체를 걷는 스택을 두면(48칸 격자 + 재료 줄) 화면이 여는 데 4~5초 걸렸고, 칸마다 `collection_index`로 버튼 하나만 읽는 고정 배치(COL-06)로 바꾸니 1초쯤이 됐다. 칸마다 버튼도 하나만 둔다(누르는 것·안 누르는 것을 둘 다 두면 컨트롤이 두 배다).",
      "en": "With a stack that walks whole buttons per row (a 48-cell grid + a material row), the screen took 4~5 seconds to open, and switching to a fixed layout that reads only one button per cell with `collection_index` (COL-06) made it about 1 second. Also put only one button per cell (having both a pressable one and a non-pressable one doubles the controls)."
    },
    "sources": "DF"
  },
  "COL-38": {
    "id": "COL-38",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-38",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "`collection_index`는 `collection_name`을 가진 `stack_panel`의 바로 아래 자식에서만 먹었다. 그 자리를 `panel`로 두면 콘텐츠 로그에 `Unknown property [collection_index]`·`[collection_name]`이 찍히고 비었다(COL-01, COL-02와 같은 결론, 상자 화면 `container_items`도 같다).",
      "en": "`collection_index` took effect only on a direct child of a `stack_panel` that has `collection_name`. Putting a `panel` in that place printed `Unknown property [collection_index]` and `[collection_name]` in the content log and left it empty (the same conclusion as COL-01 and COL-02, and the chest screen `container_items` is the same)."
    },
    "detail": {
      "ko": "`collection_index`는 `collection_name`을 가진 `stack_panel`의 바로 아래 자식에서만 먹었다. 그 자리를 `panel`로 두면 콘텐츠 로그에 `Unknown property [collection_index]`·`[collection_name]`이 찍히고 비었다(COL-01, COL-02와 같은 결론, 상자 화면 `container_items`도 같다).",
      "en": "`collection_index` took effect only on a direct child of a `stack_panel` that has `collection_name`. When that place was a `panel`, `Unknown property [collection_index]` and `[collection_name]` were printed in the content log and it was empty (the same conclusion as COL-01 and COL-02, and the same for the chest screen `container_items`)."
    },
    "sources": "DF"
  },
  "COL-39": {
    "id": "COL-39",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-39",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "사전 조회 라우팅(HOST-06)은 동작했다: `stack_panel`에 `\"property_bag\": { \"#df_layout_1\": [ \"on\" ], \"#df_layout_0\": [] }`, `\"factory\": { \"control_ids\": { \"on\": \"…\" } }`, `#collection_length` ← `(('#df_layout_' + (조건 * 1)))`이면 조건이 맞을 때만 레이아웃이 만들어졌다. 멈춤·종료는 없었다(DBG-19와 다른 결과).",
      "en": "Dictionary lookup routing (HOST-06) worked: with `\"property_bag\": { \"#df_layout_1\": [ \"on\" ], \"#df_layout_0\": [] }` on a `stack_panel`, `\"factory\": { \"control_ids\": { \"on\": \"...\" } }`, and `#collection_length` from `(('#df_layout_' + (condition * 1)))`, the layout was created only when the condition matched. There was no freeze or exit (a different result from DBG-19)."
    },
    "detail": {
      "ko": "사전 조회 라우팅(HOST-06)은 동작했다: `stack_panel`에 `\"property_bag\": { \"#df_layout_1\": [ \"on\" ], \"#df_layout_0\": [] }`, `\"factory\": { \"control_ids\": { \"on\": \"…\" } }`, `#collection_length` ← `(('#df_layout_' + (조건 * 1)))`이면 조건이 맞을 때만 레이아웃이 만들어졌다. 멈춤·종료는 없었다(DBG-19와 다른 결과).",
      "en": "Dictionary lookup routing (HOST-06) worked: with `\"property_bag\": { \"#df_layout_1\": [ \"on\" ], \"#df_layout_0\": [] }` on a `stack_panel`, `\"factory\": { \"control_ids\": { \"on\": \"…\" } }`, and `#collection_length` bound from `(('#df_layout_' + (condition * 1)))`, the layout was created only when the condition matched. There was no freeze or exit (a different result from DBG-19)."
    },
    "sources": "DF"
  },
  "COL-40": {
    "id": "COL-40",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-40",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "그런데 우리 팩토리가 만든 레이아웃 안에서는 액션 폼 데이터가 격자(`grid` + `collection_name`)의 칸에만 닿았다. 고정 `collection_index` 칸은 비었고, `#form_button_contents`로 버튼을 만드는 안쪽 팩토리는 아무것도 만들지 않았다. `collection_panel`(`collection_name` 유무)·`stack_panel`·`control_name`·`control_ids` 모두 같았고, 칸 바인딩에 `always`를 줘도(BND-07) 그대로였다. `panel` + `factory`는 아무것도 만들지 않았다. 그래서 레이아웃이 버튼을 격자로만 읽을 때만 게이트를 쓸 수 있다.",
      "en": "However, inside a layout made by our factory, the action form data reached only the cells of a grid (`grid` + `collection_name`). Fixed `collection_index` cells were empty, and an inner factory that makes buttons with `#form_button_contents` created nothing. `collection_panel` (with or without `collection_name`), `stack_panel`, `control_name`, and `control_ids` were all the same, and giving the cell binding `always` (BND-07) changed nothing. `panel` + `factory` created nothing. So a gate can be used only when the layout reads the buttons only as a grid."
    },
    "detail": {
      "ko": "그런데 우리 팩토리가 만든 레이아웃 안에서는 액션 폼 데이터가 격자(`grid` + `collection_name`)의 칸에만 닿았다. 고정 `collection_index` 칸은 비었고, `#form_button_contents`로 버튼을 만드는 안쪽 팩토리는 아무것도 만들지 않았다. `collection_panel`(`collection_name` 유무)·`stack_panel`·`control_name`·`control_ids` 모두 같았고, 칸 바인딩에 `always`를 줘도(BND-07) 그대로였다. `panel` + `factory`는 아무것도 만들지 않았다. 그래서 레이아웃이 버튼을 격자로만 읽을 때만 게이트를 쓸 수 있다. 화면 맨 위 라우터에서는 다른 결과가 나왔다(COL-47, C-65).",
      "en": "However, inside a layout created by our factory, action form data reached only the cells of a grid (`grid` + `collection_name`). Fixed `collection_index` cells were empty, and an inner factory that creates buttons from `#form_button_contents` created nothing. `collection_panel` (with or without `collection_name`), `stack_panel`, `control_name` and `control_ids` were all the same, and giving the cell bindings `always` (BND-07) changed nothing. `panel` + `factory` created nothing. So a gate can be used only when the layout reads buttons only as a grid. A router at the very top of the screen gave a different result (COL-47, C-65)."
    },
    "sources": "DF"
  },
  "COL-41": {
    "id": "COL-41",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-41",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "`factory_variables`는 배열일 때만 읽고, 배열이 아니면 조용히 무시한다. 항목이 문자열이 아니면 `factory_variables should all be strings of json variables created higher up the tree.` 오류를 남긴다. 각 이름은 팩토리를 선언한 컨트롤의 스코프에서 찾아 그 값을 팩토리에 저장하고, 만들어진 컨트롤이 받는다(COL-15의 추론과 같다).",
      "en": "`factory_variables` is read only when it is an array and silently ignored otherwise. If an item is not a string it leaves the error `factory_variables should all be strings of json variables created higher up the tree.` Each name is found in the scope of the control that declared the factory, its value is stored in the factory, and the created control receives it (same as the inference of COL-15)."
    },
    "detail": {
      "ko": "`factory_variables`는 배열일 때만 읽고, 배열이 아니면 조용히 무시한다. 항목이 문자열이 아니면 `factory_variables should all be strings of json variables created higher up the tree.` 오류를 남긴다. 각 이름은 팩토리를 선언한 컨트롤의 스코프에서 찾아 그 값을 팩토리에 저장하고, 만들어진 컨트롤이 받는다(COL-15의 추론과 같다).",
      "en": "`factory_variables` is read only when it is an array and silently ignored if not. If an item is not a string, it leaves the error `factory_variables should all be strings of json variables created higher up the tree.`. Each name is looked up in the scope of the control that declared the factory, and its value is stored in the factory and received by the created controls (the same as the inference in COL-15)."
    },
    "sources": "NB-04"
  },
  "COL-42": {
    "id": "COL-42",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-42",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "`\"type\": \"factory\"`이고 그 컨트롤에 `control_name`이나 `control_ids`가 직접 있으면 팩토리 이름을 따로 읽지 않는다(컨트롤 이름이 팩토리 이름, COL-25). 다른 타입은 `\"factory\": { … }` 객체가 있을 때만 팩토리를 만들고, 그 `name`이 비면 `The factory name should not be empty!`를 남긴다.",
      "en": "If it is `\"type\": \"factory\"` and that control directly has `control_name` or `control_ids`, the factory name is not read separately (the control name is the factory name, COL-25). Other types create a factory only when there is a `\"factory\": { ... }` object, and if its `name` is empty it leaves `The factory name should not be empty!`."
    },
    "detail": {
      "ko": "`\"type\": \"factory\"`이고 그 컨트롤에 `control_name`이나 `control_ids`가 직접 있으면 팩토리 이름을 따로 읽지 않는다(컨트롤 이름이 팩토리 이름, COL-25). 다른 타입은 `\"factory\": { … }` 객체가 있을 때만 팩토리를 만들고, 그 `name`이 비면 `The factory name should not be empty!`를 남긴다.",
      "en": "If it is `\"type\": \"factory\"` and that control directly has `control_name` or `control_ids`, the factory name is not read separately (the control name is the factory name, COL-25). Other types create a factory only when a `\"factory\": { … }` object exists, and if its `name` is empty it leaves `The factory name should not be empty!`."
    },
    "sources": "NB-05"
  },
  "COL-43": {
    "id": "COL-43",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-43",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "팩토리는 `control_name`을 먼저 읽고 비어 있을 때만 `control_ids`를 읽는다(COL-28). `insert_location`은 값이 정확히 `\"front\"`일 때만 앞에 넣고 그 밖은 모두 뒤다(기본 `back`).",
      "en": "A factory reads `control_name` first and reads `control_ids` only when it is empty (COL-28). `insert_location` inserts at the front only when the value is exactly `\"front\"`, and everything else is the back (default `back`)."
    },
    "detail": {
      "ko": "팩토리는 `control_name`을 먼저 읽고 비어 있을 때만 `control_ids`를 읽는다(COL-28). `insert_location`은 값이 정확히 `\"front\"`일 때만 앞에 넣고 그 밖은 모두 뒤다(기본 `back`).",
      "en": "A factory reads `control_name` first and reads `control_ids` only when it is empty (COL-28). `insert_location` inserts at the front only when the value is exactly `\"front\"` and anything else is back (default `back`)."
    },
    "sources": "NB-06"
  },
  "COL-44": {
    "id": "COL-44",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-44",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "컨트롤을 만들 때 부모에 컬렉션 이름이 있는 컬렉션 컴포넌트가 있으면 그 컨트롤은 자동으로 컬렉션 항목이 된다. `collection_index`는 이때만 읽혀(기본 -1) 인덱스를 고정한다. 그래서 `collection_index`는 컬렉션 부모의 직속 자식에서만 의미가 있다(COL-02, COL-38과 같은 결론). 직속 자식이지만 항목이 되면 안 되는 컨트롤(장식 패널 등)에는 `\"ignoreCollectionItem\": true`를 준다.",
      "en": "When creating a control, if the parent has a collection component with a collection name, that control automatically becomes a collection item. `collection_index` is read only then (default -1) and fixes the index. So `collection_index` has meaning only on a direct child of a collection parent (the same conclusion as COL-02 and COL-38). For a control that is a direct child but must not become an item (a decorative panel and so on), give `\"ignoreCollectionItem\": true`."
    },
    "detail": {
      "ko": "컨트롤을 만들 때 부모에 컬렉션 이름이 있는 컬렉션 컴포넌트가 있으면 그 컨트롤은 자동으로 컬렉션 항목이 된다. `collection_index`는 이때만 읽혀(기본 -1) 인덱스를 고정한다. 그래서 `collection_index`는 컬렉션 부모의 직속 자식에서만 의미가 있다(COL-02, COL-38과 같은 결론). 직속 자식이지만 항목이 되면 안 되는 컨트롤(장식 패널 등)에는 `\"ignoreCollectionItem\": true`를 준다.",
      "en": "When creating a control, if the parent has a collection component with a collection name, that control automatically becomes a collection item. `collection_index` is read only then (default -1) and fixes the index. So `collection_index` is meaningful only on a direct child of a collection parent (the same conclusion as COL-02 and COL-38). For a control that is a direct child but must not become an item (a decorative panel, etc.), give `\"ignoreCollectionItem\": true`."
    },
    "sources": "NB-07"
  },
  "COL-45": {
    "id": "COL-45",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-45",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "팩토리 해석 경로: `\"type\": \"factory\"`이면서 `control_name`·`control_ids`를 직접 가지면 이름 없이 해석하고, 그 밖에는 타입과 상관없이 `factory`가 객체일 때만 해석해 `name`을 읽는다(`type: factory`에 `factory` 객체를 써도 된다). 컨트롤 하나에는 팩토리가 하나만 붙는다. `control_name`은 해석할 때 선언한 컨트롤의 변수 스코프로 바로 원형을 만들고, `control_ids`는 종류와 정의 문자열만 저장한다(COL-29의 차이). `max_children_size`는 생략하면 0이다.",
      "en": "Factory resolution path: if it is `\"type\": \"factory\"` and directly has `control_name` or `control_ids`, it is resolved without a name; otherwise, regardless of type, it is resolved only when `factory` is an object and `name` is read (writing a `factory` object on `type: factory` is also fine). Only one factory attaches to one control. `control_name` builds the prototype right away in the variable scope of the declaring control when resolving, and `control_ids` stores only the kinds and definition strings (the difference in COL-29). `max_children_size` is 0 if omitted."
    },
    "detail": {
      "ko": "팩토리 해석 경로: `\"type\": \"factory\"`이면서 `control_name`·`control_ids`를 직접 가지면 이름 없이 해석하고, 그 밖에는 타입과 상관없이 `factory`가 객체일 때만 해석해 `name`을 읽는다(`type: factory`에 `factory` 객체를 써도 된다). 컨트롤 하나에는 팩토리가 하나만 붙는다. `control_name`은 해석할 때 선언한 컨트롤의 변수 스코프로 바로 원형을 만들고, `control_ids`는 종류와 정의 문자열만 저장한다(COL-29의 차이). `max_children_size`는 생략하면 0이다.",
      "en": "Factory resolution path: if it is `\"type\": \"factory\"` and directly has `control_name` or `control_ids`, it resolves without a name, and otherwise, regardless of type, it resolves only when `factory` is an object and reads `name` (you may also write a `factory` object on a `type: factory`). Only one factory attaches to one control. `control_name` builds the prototype right away with the declaring control's variable scope at resolution, and `control_ids` stores only the kind and definition string (the COL-29 difference). `max_children_size` is 0 if omitted."
    },
    "sources": "NB-13"
  },
  "COL-46": {
    "id": "COL-46",
    "category": "COL",
    "page": "reference/rules",
    "anchor": "col-46",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "바닐라에 없는 `tags_factory_first_hidden_child_index`·`languages_factory_first_hidden_child_index`·`<접두어>_first_hidden_child_index`는 상점 상세 화면 설명 컴포넌트 전용이다. 속성 주머니의 이 정수로 몇 번째 태그·언어부터 숨기거나 다음 줄로 넘길지 정하고, 그 개수만큼 `\"tag\"`·`\"language\"`를 반복한 배열을 길이 바인딩 값으로 준다. 일반 팩토리 기능이 아니므로 서버 폼·HUD 팩토리에는 쓰지 않는다. 이 값을 누가 쓰는지는 확인하지 않았다.",
      "en": "`tags_factory_first_hidden_child_index`, `languages_factory_first_hidden_child_index`, and `<prefix>_first_hidden_child_index`, which are not in vanilla, are only for the store detail screen description component. This integer in the property bag decides from which tag or language to hide or wrap to the next line, and an array repeating `\"tag\"` or `\"language\"` that many times is given as the length binding value. It is not a general factory feature, so it is not used with server form or HUD factories. Who uses this value was not checked."
    },
    "detail": {
      "ko": "바닐라에 없는 `tags_factory_first_hidden_child_index`·`languages_factory_first_hidden_child_index`·`<접두어>_first_hidden_child_index`는 상점 상세 화면 설명 컴포넌트 전용이다. 속성 주머니의 이 정수로 몇 번째 태그·언어부터 숨기거나 다음 줄로 넘길지 정하고, 그 개수만큼 `\"tag\"`·`\"language\"`를 반복한 배열을 길이 바인딩 값으로 준다. 일반 팩토리 기능이 아니므로 서버 폼·HUD 팩토리에는 쓰지 않는다. 이 값을 누가 쓰는지는 확인하지 않았다.",
      "en": "`tags_factory_first_hidden_child_index`, `languages_factory_first_hidden_child_index` and `<prefix>_first_hidden_child_index`, which vanilla does not have, are exclusive to the store detail screen description component. This integer in the property bag decides from which tag or language to hide or push to the next row, and an array repeating `\"tag\"` or `\"language\"` that many times is given as the length binding value. It is not a general factory feature, so it is not used in server form or HUD factories. Who uses this value was not checked."
    },
    "sources": "NB-14"
  },
  "COL-47": {
    "id": "COL-47",
    "category": "COL",
    "page": "json-ui/collections-and-factory",
    "anchor": "col-47",
    "proposal": false,
    "evidence": [
      "실측",
      "충돌"
    ],
    "title": {
      "ko": "`third_party_server_screen`의 `$screen_content`에 둔 사전 조회 라우터(HOST-06)가 만든 창 안에서는 고정 `collection_index` 칸, 라디오 토글 칸, `#form_button_contents` 길이의 스택 팩토리가 모두 액션 폼 데이터를 받았다.",
      "en": "Inside a window created by the dictionary lookup router (HOST-06) placed in `$screen_content` of `third_party_server_screen`, the fixed `collection_index` cells, the radio toggle cells and a stack fac"
    },
    "detail": {
      "ko": "`third_party_server_screen`의 `$screen_content`에 둔 사전 조회 라우터(HOST-06)가 만든 창 안에서는 고정 `collection_index` 칸, 라디오 토글 칸, `#form_button_contents` 길이의 스택 팩토리가 모두 액션 폼 데이터를 받았다. 다만 칸의 컬렉션·`collection_details`·본문 바인딩이 기본 조건이면 처음 열 때 비고 탭을 한 번 바꾸면 채워졌고, 모두 `binding_condition: \"always\"`로 두자 열자마자 채워졌다. COL-40(같은 칸이 `always`로도 빔)과 다른 결과이며(C-65), 차이는 라우터가 화면 맨 위에 있다는 점으로 본다.",
      "en": "Inside a window created by the dictionary lookup router (HOST-06) placed in `$screen_content` of `third_party_server_screen`, the fixed `collection_index` cells, the radio toggle cells and a stack factory of length `#form_button_contents` all received action form data. But if the cells' collection, `collection_details` and body bindings had the default condition, they were empty on first open and filled after switching a tab once, and when all were set to `binding_condition: \"always\"` they were filled as soon as it opened. This differs from COL-40 (where the same cells were empty even with `always`) (C-65), and the difference is judged to be that the router is at the very top of the screen."
    },
    "sources": "FFR"
  },
  "COL-48": {
    "id": "COL-48",
    "category": "COL",
    "page": "json-ui/collections-and-factory",
    "anchor": "col-48",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "팩토리가 만든 칸 안에 둔 팩토리는 `#title_text`·길이 바인딩이 기본 조건이면 처음에 아무것도 만들지 않았다.",
      "en": "A factory placed inside a cell created by a factory created nothing at first if `#title_text` and the length binding had the default condition."
    },
    "detail": {
      "ko": "팩토리가 만든 칸 안에 둔 팩토리는 `#title_text`·길이 바인딩이 기본 조건이면 처음에 아무것도 만들지 않았다. 그 두 바인딩에 `always`를 주면 열자마자 만들어졌다. 안쪽을 grid로 바꿔도 됐다. 크기 애니메이션으로 레이아웃을 다시 계산하게 하거나, 길이를 바깥 데이터 소스에서 읽는 방법은 효과가 없었다.",
      "en": "A factory placed inside a cell created by a factory created nothing at first if `#title_text` and the length binding had the default condition. Giving those two bindings `always` made it created as soon as it opened. Changing the inside to a grid also worked. Having a size animation recalculate the layout, or reading the length from an outside data source, had no effect."
    },
    "sources": "FFR"
  },
  "COL-49": {
    "id": "COL-49",
    "category": "COL",
    "page": "json-ui/collections-and-factory",
    "anchor": "col-49",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "2열 grid(칸 높이 30px)에 버튼을 그리면 2000개(약 30000px)까지는 정상이고, 3000개(약 45000px) 이상에서는 스크롤 범위만 길게 잡히고 칸들이 맨 위 약 200px 안에 겹쳐 그려졌다.",
      "en": "When drawing buttons in a 2-column grid (cell height 30px), it was fine up to 2000 (about 30000px), and at 3000 (about 45000px) and above only the scroll range was long and the cells were drawn overla"
    },
    "detail": {
      "ko": "2열 grid(칸 높이 30px)에 버튼을 그리면 2000개(약 30000px)까지는 정상이고, 3000개(약 45000px) 이상에서는 스크롤 범위만 길게 잡히고 칸들이 맨 위 약 200px 안에 겹쳐 그려졌다. 원인은 확인하지 못했다. 같은 수를 `#form_button_contents` 길이의 세로 스택 팩토리 1열로 그리면 그려지지만 렉이 심했다.",
      "en": "When drawing buttons in a 2-column grid (cell height 30px), it was fine up to 2000 (about 30000px), and at 3000 (about 45000px) and above only the scroll range was long and the cells were drawn overlapping within the top 200px or so. The cause was not confirmed. Drawing the same count as a one-column vertical stack factory of length `#form_button_contents` drew but lagged heavily."
    },
    "sources": "FFR"
  },
  "COL-50": {
    "id": "COL-50",
    "category": "COL",
    "page": "json-ui/collections-and-factory",
    "anchor": "col-50",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "고정 `collection_index` 칸의 2차원 배치는 세로 `stack_panel` 안에 `collection_name`을 가진 가로 `stack_panel` 줄을 두고, 칸을 줄의 바로 아래 자식으로 둔다(COL-38, LAY-56).",
      "en": "For a 2D layout of fixed `collection_index` cells, put horizontal `stack_panel` rows that have `collection_name` inside a vertical `stack_panel`, and put the cells as direct children of the rows (COL-"
    },
    "detail": {
      "ko": "고정 `collection_index` 칸의 2차원 배치는 세로 `stack_panel` 안에 `collection_name`을 가진 가로 `stack_panel` 줄을 두고, 칸을 줄의 바로 아래 자식으로 둔다(COL-38, LAY-56). 칸 부모가 `panel`이면 칸마다 다른 인덱스를 줘도 모두 같은 버튼(인덱스 0)을 그렸고, 칸에 `collection_details` 바인딩이나 `toggle_grid_collection_name`을 더해도 바뀌지 않았다.",
      "en": "For a 2D layout of fixed `collection_index` cells, put horizontal `stack_panel` rows that have `collection_name` inside a vertical `stack_panel`, and put the cells as direct children of the rows (COL-38, LAY-56). If the cell parent was a `panel`, every cell drew the same button (index 0) even with different indices per cell, and adding a `collection_details` binding or `toggle_grid_collection_name` to the cells did not change it."
    },
    "sources": "FFR"
  },
  "DBG-01": {
    "id": "DBG-01",
    "category": "DBG",
    "page": "reference/rules",
    "anchor": "dbg-01",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "JSON UI 오류는 조용한 경우가 많다(아무것도 안 그려짐, 버튼이 `canceled`, 수정 전체 무시). Content Log를 켜고, 클라이언트 로그 `Debug_Log<세션>.txt`(Windows: `%APPDATA%/Minecraft Bedrock/logs/`)에서 `Unknown property`, `Type not specified (or @-base not found)`, `Must define a source property name in the binding!`, `Invalid expression`, `Assertion failed` 줄을 찾는다. 레이아웃 줄(`Full re-layout of N controls`)로 화면이 열렸는지 본다. 단 이 수는 팩토리가 셀을 만들기 전에 센 값이라 팩토리 게이트의 효과는 측정하지 못한다.",
      "en": "JSON UI errors are often silent (nothing drawn, a button giving `canceled`, a whole modification ignored). Turn on the Content Log, and in the client log `Debug_Log<session>.txt` (Windows: `%APPDATA%/Minecraft Bedrock/logs/`) look for the lines `Unknown property`, `Type not specified (or @-base not found)`, `Must define a source property name in the binding!`, `Invalid expression`, and `Assertion failed`. Check whether the screen opened with the layout line (`Full re-layout of N controls`). However, this count is taken before the factory creates cells, so the effect of a factory gate cannot be measured."
    },
    "detail": {
      "ko": "JSON UI 오류는 조용한 경우가 많다(아무것도 안 그려짐, 버튼이 `canceled`, 수정 전체 무시). Content Log를 켜고, 클라이언트 로그 `Debug_Log<세션>.txt`(Windows: `%APPDATA%/Minecraft Bedrock/logs/`)에서 `Unknown property`, `Type not specified (or @-base not found)`, `Must define a source property name in the binding!`, `Invalid expression`, `Assertion failed` 줄을 찾는다. 레이아웃 줄(`Full re-layout of N controls`)로 화면이 열렸는지 본다. 단 이 수는 팩토리가 셀을 만들기 전에 센 값이라 팩토리 게이트의 효과는 측정하지 못한다.",
      "en": "JSON UI errors are often silent (nothing drawn, a button is `canceled`, all modifications ignored). Turn on the Content Log and look in the client log `Debug_Log<session>.txt` (Windows: `%APPDATA%/Minecraft Bedrock/logs/`) for the lines `Unknown property`, `Type not specified (or @-base not found)`, `Must define a source property name in the binding!`, `Invalid expression` and `Assertion failed`. Use the layout line (`Full re-layout of N controls`) to see whether the screen opened. But this number is counted before the factory creates cells, so the effect of a factory gate cannot be measured."
    },
    "sources": "BC-S8, BC-facts, BC-S12, MJ 8장-8"
  },
  "DBG-02": {
    "id": "DBG-02",
    "category": "DBG",
    "page": "reference/rules",
    "anchor": "dbg-02",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "실험은 한 번에 하나만 바꾸고, 먼저 그 화면이 실제로 열렸는지를 로그로 확인한다(제목 문자열이 로그에 있는지). 프로브가 아예 실행되지 않은 세션은 아무것도 증명하지 않는다. \"될 것 같은 것을 추론하지 말고 되는 것을 복사하라\"는 bedrock-core 저자가 일곱 번의 실패 끝에 남긴 교훈이다.",
      "en": "Change only one thing per experiment, and first confirm from the log that the screen actually opened (whether the title string is in the log). A session where the probe never ran proves nothing. \"Do not infer what seems likely to work; copy what works\" is the lesson the bedrock-core author left after seven failures."
    },
    "detail": {
      "ko": "실험은 한 번에 하나만 바꾸고, 먼저 그 화면이 실제로 열렸는지를 로그로 확인한다(제목 문자열이 로그에 있는지). 프로브가 아예 실행되지 않은 세션은 아무것도 증명하지 않는다. \"될 것 같은 것을 추론하지 말고 되는 것을 복사하라\"는 bedrock-core 저자가 일곱 번의 실패 끝에 남긴 교훈이다.",
      "en": "Change only one thing in an experiment, and first confirm from the log that the screen actually opened (whether the title string is in the log). A session in which the probe did not run at all proves nothing. \"Do not infer what seems like it will work; copy what works\" is the lesson the bedrock-core author left after seven failures."
    },
    "sources": "BC-S6, BC-S8, BC 7장-9"
  },
  "DBG-03": {
    "id": "DBG-03",
    "category": "DBG",
    "page": "reference/rules",
    "anchor": "dbg-03",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "실패를 \"안 보임\" 하나로 뭉뚱그리지 않는다. 프레임(항상 그려지는 테두리), 값 표시(같은 값을 텍스트로), 실제 대상(크기·가시성)을 함께 그려 \"마운트 실패 / 바인딩 실패 / 레이아웃 실패\"를 구분한다. 게이트는 식과 그 부정을 둘 다 그려(`YES`/`no`) 식 자체가 실패했는지 확인한다.",
      "en": "Do not lump a failure into just \"not visible\". Draw the frame (a border that is always drawn), the value display (the same value as text), and the actual target (size and visibility) together to tell \"mount failure / binding failure / layout failure\" apart. For a gate, draw both the expression and its negation (`YES`/`no`) to check whether the expression itself failed."
    },
    "detail": {
      "ko": "실패를 \"안 보임\" 하나로 뭉뚱그리지 않는다. 프레임(항상 그려지는 테두리), 값 표시(같은 값을 텍스트로), 실제 대상(크기·가시성)을 함께 그려 \"마운트 실패 / 바인딩 실패 / 레이아웃 실패\"를 구분한다. 게이트는 식과 그 부정을 둘 다 그려(`YES`/`no`) 식 자체가 실패했는지 확인한다.",
      "en": "Do not lump a failure into \"not visible\". Draw the frame (a border that is always drawn), the value display (the same value as text) and the real target (size, visibility) together to tell \"mount failure / binding failure / layout failure\". For gates, draw both the expression and its negation (`YES`/`no`) to check whether the expression itself failed."
    },
    "sources": "BC-S6, BC-S14"
  },
  "DBG-04": {
    "id": "DBG-04",
    "category": "DBG",
    "page": "reference/rules",
    "anchor": "dbg-04",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "화면을 망가뜨릴 수 있는 실험(크래시 가능성)은 개발 중인 화면이 아니라 따로 만든 실험 화면에 올린다.",
      "en": "Put experiments that can break a screen (possible crashes) not on the screen under development but on a separate experiment screen."
    },
    "detail": {
      "ko": "화면을 망가뜨릴 수 있는 실험(크래시 가능성)은 개발 중인 화면이 아니라 따로 만든 실험 화면에 올린다.",
      "en": "Put experiments that could break the screen (with a chance of a crash) on a separately made experiment screen, not on the screen under development."
    },
    "sources": "BC-S6"
  },
  "DBG-05": {
    "id": "DBG-05",
    "category": "DBG",
    "page": "reference/rules",
    "anchor": "dbg-05",
    "proposal": false,
    "evidence": [
      "실측",
      "코드"
    ],
    "title": {
      "ko": "공식 스키마(`@minecraft/bedrock-schemas`)의 `schemas/rp/ui/index.schema.json`은 `namespace`만 검사해서 UI 파일 검증에 쓸모없다. 실제 enum 값은 `forms/ui/ui_element.form.json`에만 있고, `types/rp/ui/UiElement.d.ts`는 enum 멤버가 비어 있다.",
      "en": "The official schema (`@minecraft/bedrock-schemas`) `schemas/rp/ui/index.schema.json` checks only `namespace`, so it is useless for validating UI files. The real enum values are only in `forms/ui/ui_element.form.json`, and `types/rp/ui/UiElement.d.ts` has empty enum members."
    },
    "detail": {
      "ko": "공식 스키마(`@minecraft/bedrock-schemas`)의 `schemas/rp/ui/index.schema.json`은 `namespace`만 검사해서 UI 파일 검증에 쓸모없다. 실제 enum 값은 `forms/ui/ui_element.form.json`에만 있고, `types/rp/ui/UiElement.d.ts`는 enum 멤버가 비어 있다.",
      "en": "`schemas/rp/ui/index.schema.json` of the official schemas (`@minecraft/bedrock-schemas`) checks only `namespace`, so it is useless for validating UI files. The real enum values are only in `forms/ui/ui_element.form.json`, and `types/rp/ui/UiElement.d.ts` has empty enum members."
    },
    "sources": "BC-facts"
  },
  "DBG-06": {
    "id": "DBG-06",
    "category": "DBG",
    "page": "reference/rules",
    "anchor": "dbg-06",
    "proposal": false,
    "evidence": [
      "바닐라",
      "실측"
    ],
    "title": {
      "ko": "공식 enum과 바닐라 사용은 서로 포함 관계가 아니다. 바닐라는 enum에 없는 타입(`factory`, `collection_panel`, `tooltip_trigger` …), `binding_condition: \"none\"`, `font_size: \"medium\"`, `input_mode_condition: \"gamepad\"`/`\"not_gamepad\"`를 쓰고, enum의 `grid_rescaling_type: \"none\"`은 쓰지 않는다. `collection_index`, `localize`, `clip_ratio`, `property_bag`, `modifications`, `variables`, 배열형 `nineslice_size`는 공식 자료 어디에도 없다.",
      "en": "The official enum and vanilla usage do not contain each other. Vanilla uses types not in the enum (`factory`, `collection_panel`, `tooltip_trigger`, ...), `binding_condition: \"none\"`, `font_size: \"medium\"`, and `input_mode_condition: \"gamepad\"`/`\"not_gamepad\"`, and does not use the enum's `grid_rescaling_type: \"none\"`. `collection_index`, `localize`, `clip_ratio`, `property_bag`, `modifications`, `variables`, and the array-form `nineslice_size` are nowhere in the official material."
    },
    "detail": {
      "ko": "공식 enum과 바닐라 사용은 서로 포함 관계가 아니다. 바닐라는 enum에 없는 타입(`factory`, `collection_panel`, `tooltip_trigger` …), `binding_condition: \"none\"`, `font_size: \"medium\"`, `input_mode_condition: \"gamepad\"`/`\"not_gamepad\"`를 쓰고, enum의 `grid_rescaling_type: \"none\"`은 쓰지 않는다. `collection_index`, `localize`, `clip_ratio`, `property_bag`, `modifications`, `variables`, 배열형 `nineslice_size`는 공식 자료 어디에도 없다.",
      "en": "The official enum and vanilla use do not contain each other. Vanilla uses types not in the enum (`factory`, `collection_panel`, `tooltip_trigger` …), `binding_condition: \"none\"`, `font_size: \"medium\"` and `input_mode_condition: \"gamepad\"`/`\"not_gamepad\"`, and does not use the enum's `grid_rescaling_type: \"none\"`. `collection_index`, `localize`, `clip_ratio`, `property_bag`, `modifications`, `variables` and the array form of `nineslice_size` are in no official material."
    },
    "sources": "VN, BC-facts, 부록B"
  },
  "DBG-07": {
    "id": "DBG-07",
    "category": "DBG",
    "page": "reference/rules",
    "anchor": "dbg-07",
    "proposal": false,
    "evidence": [
      "바닐라",
      "코드"
    ],
    "title": {
      "ko": "속성·값 사전은 양방향으로 대조한다. \"바닐라가 쓰는 이름이 사전에 있는가\"만 보면, 사전에 바닐라에 없는 이름(`resolve_ancestor_scope`, `scroll_box` 타입, `z_order` 등)이 섞여도 잡지 못한다.",
      "en": "Check property and value dictionaries in both directions. Looking only at \"are the names vanilla uses in the dictionary\" cannot catch names not in vanilla (`resolve_ancestor_scope`, the `scroll_box` type, `z_order`, and so on) mixed into the dictionary."
    },
    "detail": {
      "ko": "속성·값 사전은 양방향으로 대조한다. \"바닐라가 쓰는 이름이 사전에 있는가\"만 보면, 사전에 바닐라에 없는 이름(`resolve_ancestor_scope`, `scroll_box` 타입, `z_order` 등)이 섞여도 잡지 못한다.",
      "en": "Check the property and value dictionary in both directions. If you only look at \"is the name vanilla uses in the dictionary\", you cannot catch names not in vanilla creeping into the dictionary (`resolve_ancestor_scope`, the `scroll_box` type, `z_order`, etc.)."
    },
    "sources": "MJ 4.2 원인, MJ 8장-3, BW-doc"
  },
  "DBG-08": {
    "id": "DBG-08",
    "category": "DBG",
    "page": "reference/rules",
    "anchor": "dbg-08",
    "proposal": false,
    "evidence": [
      "코드",
      "추론"
    ],
    "title": {
      "ko": "커뮤니티 팩 검사기의 흔한 오탐: 바닐라 병합 파일의 namespace 없음, `_global_variables.json` 미등록 경고, 높은 레이어 경고. 반대로 `.json`이 아닌 확장자로 등록한 UI 파일은 검사하지 않고 통과시키는 도구도 있다.",
      "en": "Common false positives of community pack checkers: no namespace in vanilla merge files, an unregistered `_global_variables.json` warning, and high layer warnings. Conversely, some tools pass UI files registered with an extension other than `.json` without checking them."
    },
    "detail": {
      "ko": "커뮤니티 팩 검사기의 흔한 오탐: 바닐라 병합 파일의 namespace 없음, `_global_variables.json` 미등록 경고, 높은 레이어 경고. 반대로 `.json`이 아닌 확장자로 등록한 UI 파일은 검사하지 않고 통과시키는 도구도 있다.",
      "en": "Common false positives of community pack checkers: no namespace in vanilla merging files, the `_global_variables.json` not-registered warning, and high-layer warnings. Conversely, some tools do not check and simply pass UI files registered with an extension other than `.json`."
    },
    "sources": "MJ 5장"
  },
  "DBG-09": {
    "id": "DBG-09",
    "category": "DBG",
    "page": "reference/rules",
    "anchor": "dbg-09",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "생성 도구로 만든 \"평평한 최상위 정의 + 절대 px\" JSON은 어떤 바닐라 화면에도 연결되어 있지 않으면 게임에 뜨지 않는다. 예제로 쓰기 전에 호스트 연결(10장)을 확인한다.",
      "en": "A \"flat top-level definitions + absolute px\" JSON made by a generation tool does not show up in the game unless it is connected to some vanilla screen. Before using it as an example, check the host connection (chapter 10)."
    },
    "detail": {
      "ko": "생성 도구로 만든 \"평평한 최상위 정의 + 절대 px\" JSON은 어떤 바닐라 화면에도 연결되어 있지 않으면 게임에 뜨지 않는다. 예제로 쓰기 전에 호스트 연결(10장)을 확인한다.",
      "en": "\"Flat top-level definitions + absolute px\" JSON made with a generator tool does not show in the game unless it is connected to some vanilla screen. Before using it as an example, check the host connection (chapter 10)."
    },
    "sources": "MJ 5장"
  },
  "DBG-10": {
    "id": "DBG-10",
    "category": "DBG",
    "page": "reference/rules",
    "anchor": "dbg-10",
    "proposal": false,
    "evidence": [
      "코드",
      "추론"
    ],
    "title": {
      "ko": "근거 우선순위는 ① 대상 팩과 로그 ② 고정한 바닐라 버전 ③ 확인된 외부 출처 ④ 추론이다. 문서에 적을 때 어느 단계의 근거인지 표시한다. 이 가이드의 검증 수준 표기가 그 형식이다.",
      "en": "The evidence priority is (1) the target pack and log, (2) the pinned vanilla version, (3) confirmed external sources, (4) inference. When writing in a document, mark which stage the evidence is from. This guide's verification level notation is that format."
    },
    "detail": {
      "ko": "근거 우선순위는 ① 대상 팩과 로그 ② 고정한 바닐라 버전 ③ 확인된 외부 출처 ④ 추론이다. 문서에 적을 때 어느 단계의 근거인지 표시한다. 이 가이드의 검증 수준 표기가 그 형식이다.",
      "en": "The evidence priority is (1) the target pack and logs, (2) the pinned vanilla version, (3) confirmed external sources, (4) inference. When writing in a document, mark which stage of evidence it is. The verification level notation of this guide is that format."
    },
    "sources": "MJ 2장·8장-4"
  },
  "DBG-11": {
    "id": "DBG-11",
    "category": "DBG",
    "page": "reference/rules",
    "anchor": "dbg-11",
    "proposal": false,
    "evidence": [
      "작동팩",
      "코드"
    ],
    "title": {
      "ko": "반복이 많은 구조(비트 디코더, 노드 수백 개)는 손으로 쓰지 말고 생성기로 만든다. 스펙 파일 하나를 스크립트 인코더와 UI 생성기가 함께 읽게 하면 둘이 어긋나지 않는다.",
      "en": "For structures with a lot of repetition (a bit decoder, hundreds of nodes), build them with a generator instead of writing by hand. Having one spec file read by both the script encoder and the UI generator keeps the two from drifting apart."
    },
    "detail": {
      "ko": "반복이 많은 구조(비트 디코더, 노드 수백 개)는 손으로 쓰지 말고 생성기로 만든다. 스펙 파일 하나를 스크립트 인코더와 UI 생성기가 함께 읽게 하면 둘이 어긋나지 않는다.",
      "en": "Do not write highly repetitive structures (a bit decoder, hundreds of nodes) by hand; build them with a generator. If the script encoder and the UI generator read one spec file together, the two do not go out of sync."
    },
    "sources": "BA 1장·9장-9, BC 3장"
  },
  "DBG-12": {
    "id": "DBG-12",
    "category": "DBG",
    "page": "reference/rules",
    "anchor": "dbg-12",
    "proposal": false,
    "evidence": [
      "바닐라",
      "추론"
    ],
    "title": {
      "ko": "새 버전이 나오면 이 가이드가 기대는 바닐라 지점(`server_form.json`의 팩토리 구조, `hud_screen.json`의 `hud_title_text`·`root_panel`·`chat_grid_item`, `npc_interact_screen.json`, `chest_screen.json`의 `small_chest_screen`)을 먼저 diff한다.",
      "en": "When a new version comes out, first diff the vanilla points this guide relies on (the factory structure of `server_form.json`, `hud_title_text`, `root_panel`, and `chat_grid_item` in `hud_screen.json`, `npc_interact_screen.json`, and `small_chest_screen` in `chest_screen.json`)."
    },
    "detail": {
      "ko": "새 버전이 나오면 이 가이드가 기대는 바닐라 지점(`server_form.json`의 팩토리 구조, `hud_screen.json`의 `hud_title_text`·`root_panel`·`chat_grid_item`, `npc_interact_screen.json`, `chest_screen.json`의 `small_chest_screen`)을 먼저 diff한다.",
      "en": "When a new version comes out, first diff the vanilla points this guide relies on (the factory structure of `server_form.json`, `hud_title_text`, `root_panel` and `chat_grid_item` of `hud_screen.json`, `npc_interact_screen.json`, and `small_chest_screen` of `chest_screen.json`)."
    },
    "sources": "VN, MJ 4.1"
  },
  "DBG-13": {
    "id": "DBG-13",
    "category": "DBG",
    "page": "reference/rules",
    "anchor": "dbg-13",
    "proposal": false,
    "evidence": [
      "바닐라"
    ],
    "title": {
      "ko": "위 변경은 다른 프로젝트(MJ)의 버전 비교표를 바닐라에서 표본 재확인한 것이다. 이전 버전 팩을 1.26.50 이상에서 쓸 때 이 지점부터 확인한다.",
      "en": "The changes above are a sample recheck against vanilla of another project's (MJ) version comparison table. When using an older version's pack on 1.26.50 or above, check starting from these points."
    },
    "detail": {
      "ko": "위 변경은 다른 프로젝트(MJ)의 버전 비교표를 바닐라에서 표본 재확인한 것이다. 이전 버전 팩을 1.26.50 이상에서 쓸 때 이 지점부터 확인한다.",
      "en": "The changes above are a sample recheck against vanilla of another project's (MJ) version comparison table. When using a pack from an earlier version on 1.26.50 or later, check from these points."
    },
    "sources": "MJ 4.1·8장-1, VN"
  },
  "DBG-14": {
    "id": "DBG-14",
    "category": "DBG",
    "page": "reference/rules",
    "anchor": "dbg-14",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "애드온 프레임워크(bedrock-core 0.x 등)는 프로토콜이 버전마다 깨지는 변경을 했다. 의존할 때는 버전을 고정하고, 문서 사이트보다 소스 코드를 따른다.",
      "en": "Add-on frameworks (bedrock-core 0.x and others) made protocol-breaking changes with versions. When depending on them, pin the version and follow the source code rather than the documentation site."
    },
    "detail": {
      "ko": "애드온 프레임워크(bedrock-core 0.x 등)는 프로토콜이 버전마다 깨지는 변경을 했다. 의존할 때는 버전을 고정하고, 문서 사이트보다 소스 코드를 따른다.",
      "en": "Add-on frameworks (bedrock-core 0.x, etc.) have made protocol changes that break with each version. When depending on one, pin the version and follow the source code rather than the documentation site."
    },
    "sources": "BC 8장"
  },
  "DBG-15": {
    "id": "DBG-15",
    "category": "DBG",
    "page": "reference/rules",
    "anchor": "dbg-15",
    "proposal": false,
    "evidence": [
      "추론"
    ],
    "title": {
      "ko": "JSON UI에는 버전 필드가 없다. 바닐라가 바뀌면 팩이 그대로 깨진다. 접점을 줄이는 순서: 바꿀 속성만 쓰기(FILE-21) → `modifications`(MOD-13) → 진입점 하나(MOD-15) → 경로 키 최소화(FILE-27).",
      "en": "JSON UI has no version field. When vanilla changes, packs break as they are. The order for reducing contact points: write only the properties you change (FILE-21), then `modifications` (MOD-13), then a single entry point (MOD-15), then minimize path keys (FILE-27)."
    },
    "detail": {
      "ko": "JSON UI에는 버전 필드가 없다. 바닐라가 바뀌면 팩이 그대로 깨진다. 접점을 줄이는 순서: 바꿀 속성만 쓰기(FILE-21) → `modifications`(MOD-13) → 진입점 하나(MOD-15) → 경로 키 최소화(FILE-27).",
      "en": "JSON UI has no version field. If vanilla changes, a pack breaks as it is. The order for reducing contact points: write only properties to change (FILE-21) -> `modifications` (MOD-13) -> one entry point (MOD-15) -> minimize path keys (FILE-27)."
    },
    "sources": "BW-best"
  },
  "DBG-16": {
    "id": "DBG-16",
    "category": "DBG",
    "page": "reference/rules",
    "anchor": "dbg-16",
    "proposal": false,
    "evidence": [
      "미검증",
      "바닐라",
      "코드"
    ],
    "title": {
      "ko": "Mojang은 화면을 Ore UI로 옮기고 있고, 평문 리소스팩은 Ore UI 화면의 배치·동작을 고칠 수 없다(버튼 모양·텍스처만 닿는다, ALT-15). 루트에 빈 `content.zipe`를 둔 팩이나 서버가 암호화해 보낸 팩은 게임 중 Ore UI 페이지를 바꿀 수 있다(ALT-11). 새 버전마다 대상 화면이 아직 바닐라 `resource_pack/ui/`에 JSON 파일로 있는지 먼저 확인한다(예: 1.26.50에는 위키가 적은 `feed_screen`, `comment_screen`, `manage_feed_screen` 파일이 없다). 설치본이 있으면 `data/gui/dist/hbui/routes.json`의 `supportedRoutes`도 함께 본다(ALT-11, ALT-13).",
      "en": "Mojang is moving screens to Ore UI, and plain resource packs cannot fix the layout and behavior of Ore UI screens (only button looks and textures reach, ALT-15). A pack with an empty `content.zipe` at the root or a pack the server encrypts and sends can change in-game Ore UI pages (ALT-11). With every new version, first check whether the target screen still exists as a JSON file in vanilla `resource_pack/ui/` (for example, 1.26.50 has no `feed_screen`, `comment_screen`, or `manage_feed_screen` files that the wiki lists). If you have an install, also check `supportedRoutes` in `data/gui/dist/hbui/routes.json` (ALT-11, ALT-13)."
    },
    "detail": {
      "ko": "Mojang은 화면을 Ore UI로 옮기고 있고, 평문 리소스팩은 Ore UI 화면의 배치·동작을 고칠 수 없다(버튼 모양·텍스처만 닿는다, ALT-15). 루트에 빈 `content.zipe`를 둔 팩이나 서버가 암호화해 보낸 팩은 게임 중 Ore UI 페이지를 바꿀 수 있다(ALT-11). 새 버전마다 대상 화면이 아직 바닐라 `resource_pack/ui/`에 JSON 파일로 있는지 먼저 확인한다(예: 1.26.50에는 위키가 적은 `feed_screen`, `comment_screen`, `manage_feed_screen` 파일이 없다). 설치본이 있으면 `data/gui/dist/hbui/routes.json`의 `supportedRoutes`도 함께 본다(ALT-11, ALT-13).",
      "en": "Mojang is moving screens to Ore UI, and plaintext resource packs cannot change the layout or behavior of Ore UI screens (only the look of buttons and textures are reached, ALT-15). A pack with an empty `content.zipe` in its root or a pack the server sends encrypted can change the in-game Ore UI pages (ALT-11). For each new version, first check whether the target screen is still a JSON file in vanilla `resource_pack/ui/` (for example, 1.26.50 does not have the `feed_screen`, `comment_screen` and `manage_feed_screen` files the wiki lists). If you have the install, also look at `supportedRoutes` in `data/gui/dist/hbui/routes.json` (ALT-11, ALT-13)."
    },
    "sources": "BW-intro 경고, BW-font, VN, OUC"
  },
  "DBG-17": {
    "id": "DBG-17",
    "category": "DBG",
    "page": "reference/rules",
    "anchor": "dbg-17",
    "proposal": false,
    "evidence": [
      "미검증",
      "추론"
    ],
    "title": {
      "ko": "성능: 위키는 JSON UI를 엔티티 다음으로 비싼 서브시스템으로 꼽는다. 식과 바인딩 수를 줄이고(`(2 * (-1 * $n))` → `(-2 * $n)`), 같은 모양 컨트롤 여러 개는 `#texture` 같은 바인딩 하나로 합치고, 안 쓰는 컨트롤은 지우거나 `ignored: true`로 둔다.",
      "en": "Performance: the wiki ranks JSON UI as the next most expensive subsystem after entities. Reduce the number of expressions and bindings (`(2 * (-1 * $n))` becomes `(-2 * $n)`), merge several controls of the same shape into one binding such as `#texture`, and delete unused controls or set them to `ignored: true`."
    },
    "detail": {
      "ko": "성능: 위키는 JSON UI를 엔티티 다음으로 비싼 서브시스템으로 꼽는다. 식과 바인딩 수를 줄이고(`(2 * (-1 * $n))` → `(-2 * $n)`), 같은 모양 컨트롤 여러 개는 `#texture` 같은 바인딩 하나로 합치고, 안 쓰는 컨트롤은 지우거나 `ignored: true`로 둔다.",
      "en": "Performance: the wiki counts JSON UI as the second most expensive subsystem after entities. Reduce the number of expressions and bindings (`(2 * (-1 * $n))` -> `(-2 * $n)`), merge several controls of the same shape into one binding such as `#texture`, and delete unused controls or set `ignored: true`."
    },
    "sources": "BW-best"
  },
  "DBG-18": {
    "id": "DBG-18",
    "category": "DBG",
    "page": "reference/rules",
    "anchor": "dbg-18",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "게임은 개발 팩 폴더(이 측정의 Windows 1.26.52에서는 `%APPDATA%/Minecraft Bedrock/Users/Shared/games/com.mojang/development_*_packs`)와 월드 목록을 시작할 때 읽는다. 오래 켜 둔 게임은 새로 넣은 팩이나 복사한 월드를 보지 못하므로, 팩을 처음 넣었으면 게임을 다시 켠다. 월드에 팩을 붙일 때는 월드 편집 화면의 행동 팩·리소스 팩 목록에서 활성화하는 것이 확실하다.",
      "en": "The game reads the development pack folders (in this measurement's Windows 1.26.52, `%APPDATA%/Minecraft Bedrock/Users/Shared/games/com.mojang/development_*_packs`) and the world list at startup. A game left running for a long time does not see newly placed packs or copied worlds, so if you placed a pack for the first time, restart the game. When attaching a pack to a world, activating it in the behavior pack and resource pack lists of the world edit screen is the reliable way."
    },
    "detail": {
      "ko": "게임은 개발 팩 폴더(이 측정의 Windows 1.26.52에서는 `%APPDATA%/Minecraft Bedrock/Users/Shared/games/com.mojang/development_*_packs`)와 월드 목록을 시작할 때 읽는다. 오래 켜 둔 게임은 새로 넣은 팩이나 복사한 월드를 보지 못하므로, 팩을 처음 넣었으면 게임을 다시 켠다. 월드에 팩을 붙일 때는 월드 편집 화면의 행동 팩·리소스 팩 목록에서 활성화하는 것이 확실하다.",
      "en": "The game reads the development pack folder (in the Windows 1.26.52 of this measurement, `%APPDATA%/Minecraft Bedrock/Users/Shared/games/com.mojang/development_*_packs`) and the world list at startup. A game left running for a long time does not see newly placed packs or copied worlds, so restart the game if you placed a pack for the first time. When attaching a pack to a world, activating it from the behavior pack and resource pack lists of the world edit screen is the surest."
    },
    "sources": "TP"
  },
  "DBG-19": {
    "id": "DBG-19",
    "category": "DBG",
    "page": "reference/rules",
    "anchor": "dbg-19",
    "proposal": false,
    "evidence": [
      "실측",
      "추론"
    ],
    "title": {
      "ko": "서버 폼에 붙인 프로브 화면이 `visible` 게이트로 모든 폼에서 생성되는 구성에서, 숫자가 아닌 본문(`'pick probe'`)에 대해 `(#v - 0)`·`(#v * 1)`을 `#size_binding_x`에 넣거나, `/ 100`을 `#clip_ratio`에 넣는 식이 있으면 액션 폼을 여는 순간 1.26.52 클라이언트가 종료되었다(1회). `collection_panel` 계산 길이 게이트·경로 사전 조회·`factory_variables` 셀이 든 이전 구성은 같은 시점에 멈췄다(2회). 어느 요소가 원인인지는 분리하지 못했다. 생성될 수 있는 모든 컨트롤의 식은 엉뚱한 입력(빈 문자열, 다른 폼의 본문)에서도 안전해야 한다고 보고, 숫자 속성에 넣는 식은 입력 형식을 먼저 확인하는 게이트 안에서만 생성되게 한다(COL-10, EXP-21, LAY-14).",
      "en": "In a configuration where a probe screen attached to a server form is created in every form through a `visible` gate, expressions that put `(#v - 0)` or `(#v * 1)` into `#size_binding_x`, or `/ 100` into `#clip_ratio`, for a non-numeric body (`'pick probe'`) terminated the 1.26.52 client the moment an action form opened (once). An earlier configuration containing a `collection_panel` computed-length gate, path dictionary lookup, and `factory_variables` cells froze at the same point (twice). Which element is the cause was not separated. Judging that the expressions of every control that can be created must be safe even on wrong input (an empty string, the body of another form), make expressions put into numeric properties be created only inside a gate that first checks the input format (COL-10, EXP-21, LAY-14)."
    },
    "detail": {
      "ko": "서버 폼에 붙인 프로브 화면이 `visible` 게이트로 모든 폼에서 생성되는 구성에서, 숫자가 아닌 본문(`'pick probe'`)에 대해 `(#v - 0)`·`(#v * 1)`을 `#size_binding_x`에 넣거나, `/ 100`을 `#clip_ratio`에 넣는 식이 있으면 액션 폼을 여는 순간 1.26.52 클라이언트가 종료되었다(1회). `collection_panel` 계산 길이 게이트·경로 사전 조회·`factory_variables` 셀이 든 이전 구성은 같은 시점에 멈췄다(2회). 어느 요소가 원인인지는 분리하지 못했다. 생성될 수 있는 모든 컨트롤의 식은 엉뚱한 입력(빈 문자열, 다른 폼의 본문)에서도 안전해야 한다고 보고, 숫자 속성에 넣는 식은 입력 형식을 먼저 확인하는 게이트 안에서만 생성되게 한다(COL-10, EXP-21, LAY-14).",
      "en": "In a setup where a probe screen attached to the server form is created in every form through a `visible` gate, if there was an expression that puts `(#v - 0)` or `(#v * 1)` against a non-numeric body (`'pick probe'`) into `#size_binding_x`, or puts `/ 100` into `#clip_ratio`, the 1.26.52 client exited the moment an action form was opened (once). An earlier setup containing a `collection_panel` computed length gate, path dictionary lookup and `factory_variables` cells froze at the same point (twice). Which element was the cause could not be isolated. Considering that the expressions of every control that can be created must be safe even for wrong input (an empty string, another form's body), make an expression that goes into a numeric property get created only inside a gate that checks the input format first (COL-10, EXP-21, LAY-14)."
    },
    "sources": "TP"
  },
  "DBG-20": {
    "id": "DBG-20",
    "category": "DBG",
    "page": "reference/rules",
    "anchor": "dbg-20",
    "proposal": false,
    "evidence": [
      "코드",
      "추론"
    ],
    "title": {
      "ko": "Ore UI 패치 도구(OUC)는 압축 코드에서 번역 키·`data-testid` 같은 안정 문자열을 닻으로 짧은 이름을 다시 뽑고, 실패한 패치는 빼고 나머지만 적용한다. JSON UI 팩도 같은 원칙(안정 이름에만 기대기, 실패를 국소화하기)을 따르면 버전 변경에 덜 깨진다. DBG-15와 같은 결론.",
      "en": "The Ore UI patch tool (OUC) re-extracts short names from minified code anchored on stable strings such as translation keys and `data-testid`, drops failed patches, and applies only the rest. If JSON UI packs follow the same principle (rely only on stable names, localize failures), they break less on version changes. The same conclusion as DBG-15."
    },
    "detail": {
      "ko": "Ore UI 패치 도구(OUC)는 압축 코드에서 번역 키·`data-testid` 같은 안정 문자열을 닻으로 짧은 이름을 다시 뽑고, 실패한 패치는 빼고 나머지만 적용한다. JSON UI 팩도 같은 원칙(안정 이름에만 기대기, 실패를 국소화하기)을 따르면 버전 변경에 덜 깨진다. DBG-15와 같은 결론.",
      "en": "The Ore UI patch tool (OUC) re-extracts short names from minified code using stable strings such as translation keys and `data-testid` as anchors, and applies only the rest, leaving out failed patches. JSON UI packs also break less on version changes if they follow the same principles (rely only on stable names, localize failures). The same conclusion as DBG-15."
    },
    "sources": "OUC 4.2"
  },
  "DBG-21": {
    "id": "DBG-21",
    "category": "DBG",
    "page": "reference/rules",
    "anchor": "dbg-21",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "게임 없이 레이아웃·변수·식을 미리 볼 때 Cinnabar JSON-UI 편집기(jsonui.cinnabar.gg)를 쓸 수 있다. 엔진 규칙은 네이티브 재구성이지만 글꼴, HUD, 오류 처리가 바닐라와 다르므로 최종 확인은 게임에서 한다. 비상업 라이선스다.",
      "en": "When previewing layout, variables, and expressions without the game, you can use the Cinnabar JSON-UI editor (jsonui.cinnabar.gg). Its engine rules are a native reconstruction, but fonts, the HUD, and error handling differ from vanilla, so do the final check in game. It has a noncommercial license."
    },
    "detail": {
      "ko": "게임 없이 레이아웃·변수·식을 미리 볼 때 Cinnabar JSON-UI 편집기(jsonui.cinnabar.gg)를 쓸 수 있다. 엔진 규칙은 네이티브 재구성이지만 글꼴, HUD, 오류 처리가 바닐라와 다르므로 최종 확인은 게임에서 한다. 비상업 라이선스다.",
      "en": "To preview layout, variables and expressions without the game, you can use the Cinnabar JSON-UI editor (jsonui.cinnabar.gg). The engine rules are a native reconstruction but fonts, the HUD and error handling differ from vanilla, so make the final check in game. It has a noncommercial license."
    },
    "sources": "CN"
  },
  "DBG-22": {
    "id": "DBG-22",
    "category": "DBG",
    "page": "reference/rules",
    "anchor": "dbg-22",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "식의 결과를 바닐라 없이 확인하려면 Cinnabar `crates/json-ui`의 평가기를 빌드해 돌린다(../cinnabar/samples/probe). 크래시·어서트는 재현하지 않는다.",
      "en": "To check expression results without vanilla, build the evaluator of Cinnabar `crates/json-ui` and run it (../cinnabar/samples/probe). It does not reproduce crashes and asserts."
    },
    "detail": {
      "ko": "식의 결과를 바닐라 없이 확인하려면 Cinnabar `crates/json-ui`의 평가기를 빌드해 돌린다. 방법: Cinnabar 저장소(`ceb0fb6`에서 확인)를 클론하고, 이 프로젝트가 새로 쓴 시험 코드 `predicate_probe.rs`를 `crates/json-ui/src/predicate/tests.rs` 끝에 붙이고 `zz_probe.rs`를 `crates/json-ui/tests/`에 둔 뒤, `cargo test -p json-ui --locked --lib zz_probe -- --nocapture`(식, `PROBE` 줄)와 `cargo test -p json-ui --locked --test zz_probe -- --nocapture`(크기 식과 변수 스코프, `LEN`·`SCOPE` 줄)를 돌린다. `rust-toolchain.toml`이 Rust 1.99.0을 고정하므로 rustup이 처음에 내려받고, `json-ui` 크레이트만 빌드하면 의존성이 적어 몇 분이면 끝난다. 이 결과가 충돌 판정표의 C-04, C-16, C-41, C-42에 쓰였다. 크래시·어서트는 재현하지 않는다.",
      "en": "To check the result of expressions without vanilla, build and run the evaluator of Cinnabar `crates/json-ui`. Method: clone the Cinnabar repository (checked at `ceb0fb6`), append the test code `predicate_probe.rs` this project newly wrote to the end of `crates/json-ui/src/predicate/tests.rs` and put `zz_probe.rs` in `crates/json-ui/tests/`, and run `cargo test -p json-ui --locked --lib zz_probe -- --nocapture` (expressions, `PROBE` lines) and `cargo test -p json-ui --locked --test zz_probe -- --nocapture` (size expressions and variable scopes, `LEN` and `SCOPE` lines). `rust-toolchain.toml` pins Rust 1.99.0 so rustup downloads it the first time, and building only the `json-ui` crate has few dependencies and finishes in a few minutes. These results were used for C-04, C-16, C-41 and C-42 of the conflict table. Crashes and asserts are not reproduced."
    },
    "sources": "CN-run"
  },
  "DBG-23": {
    "id": "DBG-23",
    "category": "DBG",
    "page": "json-ui/expressions",
    "anchor": "dbg-23",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "식 컴파일러가 만든 JSON은 5장 규칙으로 다시 검사한다.",
      "en": "Community UI schemas produce errors on vanilla too."
    },
    "detail": {
      "ko": "식 컴파일러가 만든 JSON은 5장 규칙으로 다시 검사한다. AsaJS 4.2.0에서 확인된 문제: 삼항 `?:` 출력의 괄호 불일치, 지수 리터럴(`1e-2`)이 `0.01`(정수 0)로 나감, 리터럴만 든 보조 바인딩(BND-05), 문자열 바인딩에 `%` 적용(EXP-32), 사슬 비교 미검사(EXP-28), 소수점 리터럴을 쓸 수 없음.",
      "en": "Community UI schemas produce errors on vanilla too. Validating the 205 vanilla 1.26.50.4 files, the Blockception latest source gives 116 errors in 43 files (50 unknown properties), Bugrock (KalmeMarq) 2,224 errors in 186 files (size expression and texture path regular expressions), and the 2025-09 schema bundled in Blockception VS Code extension v8.0.46 2,251 errors in 193 files (rejects `\"100%c\"`, negative offsets and size expressions). For a schema error, first grep whether vanilla has the same form to tell whether it is a false positive."
    },
    "sources": "ASJ 3.1·3.3·5장"
  },
  "DBG-24": {
    "id": "DBG-24",
    "category": "DBG",
    "page": "json-ui/debugging-and-versions",
    "anchor": "dbg-24",
    "proposal": true,
    "evidence": [
      "코드",
      "바닐라"
    ],
    "title": {
      "ko": "스키마를 통과했다고 게임이 받아들이는 것은 아니다.",
      "en": "Passing a schema does not mean the game accepts it."
    },
    "detail": {
      "ko": "스키마를 통과했다고 게임이 받아들이는 것은 아니다. Blockception 스키마는 enum마다 \"아무 식별자\" 대안을 붙여 `clip_direction: \"dwn\"`·`font_size: \"huge\"`를 통과시키고, 앵커 enum에 바닐라에 없는 `left`·`top`·`center_middle`을, `clip_direction` enum에 바닐라가 쓰지 않는 `top`·`bottom`(바닐라는 `up`·`down`)을 둔다. Bugrock은 NetEase 전용 타입·속성 51종을 통과시킨다. 이름과 값은 값 사전과 바닐라 grep으로 확인한다(DBG-07). 생성기·스키마가 내는 이름은 바닐라 사용을 grep한다(예: 스크롤 뷰 역할은 `scrollbar_track`/`scrollbar_box`이고 `scroll_bar_track`이 아니다, 토글 강제 인덱스는 `toggle_group_forced_index`).",
      "en": "Passing a schema does not mean the game accepts it. The Blockception schema attaches an \"any identifier\" alternative to every enum, letting through `clip_direction: \"dwn\"` and `font_size: \"huge\"`, puts `left`, `top` and `center_middle`, which vanilla lacks, in the anchor enum, and puts `top` and `bottom`, which vanilla does not use (vanilla uses `up` and `down`), in the `clip_direction` enum. Bugrock lets through 51 NetEase-only types and properties. Check names and values with the value dictionary and a vanilla grep (DBG-07). Grep vanilla use for names generators and schemas produce (for example, the scroll view roles are `scrollbar_track`/`scrollbar_box` and not `scroll_bar_track`, and the toggle forced index is `toggle_group_forced_index`)."
    },
    "sources": "jsonui-schemas, EasyUIBuilder, jsonui-lsp, VN"
  },
  "DBG-25": {
    "id": "DBG-25",
    "category": "DBG",
    "page": "json-ui/debugging-and-versions",
    "anchor": "dbg-25",
    "proposal": true,
    "evidence": [
      "바닐라"
    ],
    "title": {
      "ko": "바닐라에도 깨진 값이 남아 있다: `\"size\": [ \"fill%\", \"100%\" ]`(sidebar_navigation.json:881), 원소가 하나인 `\"size\": [ \"100%, 100%\" ]`(store_promo_timeline_screen.json:1380), 괄호가 닫히지 않은 `\"ignored\": \"($nx_os or $is_ps4\"`(x",
      "en": "Vanilla also has broken values left: `\"size\": [ \"fill%\", \"100%\" ]` (sidebar_navigation.json:881), a one-element `\"size\": [ \"100%, 100%\" ]` (store_promo_timeline_screen.json:1380), an `\"ignored\": \"($nx"
    },
    "detail": {
      "ko": "바닐라에도 깨진 값이 남아 있다: `\"size\": [ \"fill%\", \"100%\" ]`(sidebar_navigation.json:881), 원소가 하나인 `\"size\": [ \"100%, 100%\" ]`(store_promo_timeline_screen.json:1380), 괄호가 닫히지 않은 `\"ignored\": \"($nx_os or $is_ps4\"`(xbl_console_signin_succeeded.json:221), `\"max_size\": []`(ui_common.json:6551), 그리고 LAY-36의 `\"100c%\"`. 바닐라에 한두 번 나온 값은 유효하다는 증거가 아니다. 근거로 쓸 때는 여러 화면에서 같은 의도로 쓰였는지 본다.",
      "en": "Vanilla also has broken values left: `\"size\": [ \"fill%\", \"100%\" ]` (sidebar_navigation.json:881), a one-element `\"size\": [ \"100%, 100%\" ]` (store_promo_timeline_screen.json:1380), an `\"ignored\": \"($nx_os or $is_ps4\"` with unclosed parentheses (xbl_console_signin_succeeded.json:221), `\"max_size\": []` (ui_common.json:6551), and `\"100c%\"` of LAY-36. A value that appears once or twice in vanilla is not evidence that it is valid. When using it as evidence, check whether it is used with the same intent in several screens."
    },
    "sources": "jsonui-schemas, VN"
  },
  "DBG-26": {
    "id": "DBG-26",
    "category": "DBG",
    "page": "json-ui/debugging-and-versions",
    "anchor": "dbg-26",
    "proposal": true,
    "evidence": [
      "바닐라",
      "코드"
    ],
    "title": {
      "ko": "Microsoft Learn의 JSON UI 레퍼런스(`JsonUiReference`, AI 보조 생성, 2025-02-11)는 출처로 쓰지 않는다.",
      "en": "Do not use the Microsoft Learn JSON UI reference (`JsonUiReference`, AI-assisted generation, 2025-02-11) as a source."
    },
    "detail": {
      "ko": "Microsoft Learn의 JSON UI 레퍼런스(`JsonUiReference`, AI 보조 생성, 2025-02-11)는 출처로 쓰지 않는다. 속성 이름 목록으로만 쓰고 타입·의미는 바닐라에서 확인한다. `font_scale_factor`·`default_focus_precedence`를 Boolean, `grid_item_template`을 Integer, `factory`를 String으로 적었고, 중국판 전용 `nine_slice_buttom`·`place_holder_text`·`slider_range`(바닐라 0회)를 섞었으며, enum 표는 `undefined`뿐이다. 또 jsonui-lsp(VS Code 확장 `jsonui-support`, MIT)는 바닐라 1.26.50.4 `ui/` 전체에서 뽑은 \"컨트롤 → 타입·`$변수`\" 사전으로 바닐라 템플릿이 받는 `$변수` 제안과 정의 이동을 하지만 진단·호버·레이아웃·식 검사는 없고, 마켓플레이스 판(v0.3.1)은 1.21.120.4 사전이다.",
      "en": "Do not use the Microsoft Learn JSON UI reference (`JsonUiReference`, AI-assisted generation, 2025-02-11) as a source. Use it only as a list of property names and check types and meanings against vanilla. It lists `font_scale_factor` and `default_focus_precedence` as Boolean, `grid_item_template` as Integer and `factory` as String, mixes in China-edition-only `nine_slice_buttom`, `place_holder_text` and `slider_range` (0 uses in vanilla), and its enum table is only `undefined`. Also, jsonui-lsp (the VS Code extension `jsonui-support`, MIT) suggests `$variables` that vanilla templates accept and goes to definitions using a \"control -> type and `$variable`\" dictionary extracted from all of vanilla 1.26.50.4 `ui/`, but has no diagnostics, hover, layout or expression checks, and the Marketplace version (v0.3.1) is the 1.21.120.4 dictionary."
    },
    "sources": "web-tutorials, jsonui-lsp"
  },
  "DBG-27": {
    "id": "DBG-27",
    "category": "DBG",
    "page": "json-ui/debugging-and-versions",
    "anchor": "dbg-27",
    "proposal": true,
    "evidence": [
      "바닐라"
    ],
    "title": {
      "ko": "중국판(NetEase) 문서·UI 편집기가 만든 JSON에는 국제판에 없는 속성(`is_new_nine_slice`, `nine_slice_top/left/right/bottom`·`nine_slice_buttom`, `rotate_pivot`, `rotate_angle`, `is_handle_button_move_event`, `is_swallow`, `",
      "en": "JSON made by China edition (NetEase) documents and UI editors mixes in properties the international edition lacks (`is_new_nine_slice`, `nine_slice_top/left/right/bottom` and `nine_slice_buttom`, `rot"
    },
    "detail": {
      "ko": "중국판(NetEase) 문서·UI 편집기가 만든 JSON에는 국제판에 없는 속성(`is_new_nine_slice`, `nine_slice_top/left/right/bottom`·`nine_slice_buttom`, `rotate_pivot`, `rotate_angle`, `is_handle_button_move_event`, `is_swallow`, `gradient_direction`)과 타입(`stack_grid`, `rich_text`, `combox`, `joystick` 등), 템플릿(`common_selection_wheels`, `combo_box`, `mini_map`), `%모듈.메서드` 매핑이 섞여 있다. 바닐라 사용 횟수로 거른 뒤 쓴다.",
      "en": "JSON made by China edition (NetEase) documents and UI editors mixes in properties the international edition lacks (`is_new_nine_slice`, `nine_slice_top/left/right/bottom` and `nine_slice_buttom`, `rotate_pivot`, `rotate_angle`, `is_handle_button_move_event`, `is_swallow`, `gradient_direction`), types (`stack_grid`, `rich_text`, `combox`, `joystick`, etc.), templates (`common_selection_wheels`, `combo_box`, `mini_map`) and `%module.method` mappings. Filter by vanilla use counts before using."
    },
    "sources": "NetEase 문서, VN 0회"
  },
  "DBG-28": {
    "id": "DBG-28",
    "category": "DBG",
    "page": "json-ui/debugging-and-versions",
    "anchor": "dbg-28",
    "proposal": true,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "시각 편집기의 미리보기는 엔진 레이아웃이 아니다.",
      "en": "The preview of a visual editor is not the engine layout."
    },
    "detail": {
      "ko": "시각 편집기의 미리보기는 엔진 레이아웃이 아니다. JsonForge 캔버스는 `anchor_from`/`anchor_to`를 거꾸로 계산하고, 스택 패널을 쌓지 않고, `alpha`를 자식에 전파하고, `%`·`%c`·`fill`·`default`를 다루지 않는다. w1zardz 편집기는 `%c`를 가장 큰 자식으로, `default`를 내용 크기로 보고 스택 자식의 offset·앵커를 그대로 쓴다. 두 도구는 화면 크기도 다르게 가정한다(384×216, 427×240). 미리보기로는 대략의 배치만 잡고 위치는 게임에서 확인한다. 엔진 규칙에 가까운 미리보기가 필요하면 Cinnabar 편집기(DBG-21)를 쓴다.",
      "en": "The preview of a visual editor is not the engine layout. The JsonForge canvas computes `anchor_from`/`anchor_to` backwards, does not stack stack panels, propagates `alpha` to children, and does not handle `%`, `%c`, `fill` and `default`. The w1zardz editor treats `%c` as the largest child and `default` as content size and uses the offset and anchors of stack children as they are. The two tools also assume different screen sizes (384x216, 427x240). Use the preview only for rough placement and check positions in game. If you need a preview closer to the engine rules, use the Cinnabar editor (DBG-21)."
    },
    "sources": "JsonForge, w1zardz, Cinnabar"
  },
  "DBG-29": {
    "id": "DBG-29",
    "category": "DBG",
    "page": "json-ui/debugging-and-versions",
    "anchor": "dbg-29",
    "proposal": true,
    "evidence": [
      "코드",
      "추론"
    ],
    "title": {
      "ko": "JsonForge의 \"JSON 내보내기\"는 자식을 `@` 참조 없이 이름만 넣어 자식 속성이 모두 빠지고, 바인딩 키 일부(`binding_collection_name`, `source_control_name`)를 버린다.",
      "en": "JsonForge's \"Export JSON\" puts only names for children without `@` references so all child properties are lost, and drops some binding keys (`binding_collection_name`, `source_control_name`)."
    },
    "detail": {
      "ko": "JsonForge의 \"JSON 내보내기\"는 자식을 `@` 참조 없이 이름만 넣어 자식 속성이 모두 빠지고, 바인딩 키 일부(`binding_collection_name`, `source_control_name`)를 버린다. 쓸 거라면 \"애드온 내보내기\"를 쓰되, HUD 오버레이(상속 배열에 insert, MOD-04), 닫기 버튼 offset(C-49), 제목이 안 맞는 폼을 빈 화면으로 만드는 서버 폼 라우터(HOST-15)는 고쳐서 쓴다. 생성기가 만든 `server_form.json`은 바닐라와 나란히 놓고 `controls`가 배열인지, 재선언 키의 상속 대상(`long_form@common_dialogs.main_panel_no_buttons`), 여러 화면 제외 게이트 식이 `and`나 빼기 사슬인지 본다.",
      "en": "JsonForge's \"Export JSON\" puts only names for children without `@` references so all child properties are lost, and drops some binding keys (`binding_collection_name`, `source_control_name`). If you use it, use \"Export add-on\", but fix the HUD overlay (insert into an inherited array, MOD-04), the close button offset (C-49), and the server form router that makes a blank screen for forms whose title does not match (HOST-15). Put a `server_form.json` made by a generator next to vanilla and check whether `controls` is an array, the inheritance target of the redeclaration key (`long_form@common_dialogs.main_panel_no_buttons`), and whether the multi-screen exclusion gate expression is a chain of `and` or subtraction."
    },
    "sources": "JsonForge, EasyUIBuilder"
  },
  "DBG-30": {
    "id": "DBG-30",
    "category": "DBG",
    "page": "json-ui/debugging-and-versions",
    "anchor": "dbg-30",
    "proposal": true,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "식 컴파일러(AsaJS 4.2.0)가 만든 JSON은 식 규칙으로 다시 검사한다.",
      "en": "Check JSON made by an expression compiler (AsaJS 4.2.0) again with the expression rules."
    },
    "detail": {
      "ko": "식 컴파일러(AsaJS 4.2.0)가 만든 JSON은 식 규칙으로 다시 검사한다. 확인된 문제: 삼항 `?:` 출력의 괄호 불일치, 지수 리터럴(`1e-2`)이 `0.01`(정수 0)로 나감, 리터럴만 든 보조 바인딩(BND-05), 문자열 바인딩에 `%` 적용(EXP-32), 사슬 비교 미검사(EXP-28), 소수점 리터럴을 쓸 수 없음.",
      "en": "Check JSON made by an expression compiler (AsaJS 4.2.0) again with the expression rules. Confirmed problems: mismatched parentheses in the ternary `?:` output, an exponent literal (`1e-2`) emitted as `0.01` (the integer 0), an auxiliary binding containing only literals (BND-05), `%` applied to a string binding (EXP-32), no check for chained comparison (EXP-28), and decimal literals cannot be used."
    },
    "sources": "AsaJS"
  },
  "DBG-32": {
    "id": "DBG-32",
    "category": "DBG",
    "page": "json-ui/debugging-and-versions",
    "anchor": "dbg-32",
    "proposal": true,
    "evidence": [
      "코드",
      "추론"
    ],
    "title": {
      "ko": "난독화·빌드 도구가 UI 파일의 경로를 바꾸면 바닐라 정의 재선언과 `modifications`가 조용히 무효가 된다(FILE-22, MOD-02).",
      "en": "If an obfuscation or build tool changes the path of UI files, redeclaration of vanilla definitions and `modifications` silently become invalid (FILE-22, MOD-02)."
    },
    "detail": {
      "ko": "난독화·빌드 도구가 UI 파일의 경로를 바꾸면 바닐라 정의 재선언과 `modifications`가 조용히 무효가 된다(FILE-22, MOD-02). JsonEncryptor zip 모드 기본값(이름 해시, 정의별 분리, `ui/obfuscated/`로 이동)이 그렇다. 바닐라 경로 파일은 경로를 유지한 채 처리하고 결과 팩에서 바닐라 수정이 보이는지 먼저 확인한다. 정규식으로 JSON에 주석을 끼우는 도구(\"내용 어지럽히기\")는 문자열 안의 `,`·`}`에서 멈춰 `\"Hello, world\"`를 `\"Hello/…/, world\"`로 바꿔 라벨에 보이고 식은 조용히 틀리므로, 쉼표가 든 텍스트·식이 있으면 끈다.",
      "en": "If an obfuscation or build tool changes the path of UI files, redeclaration of vanilla definitions and `modifications` silently become invalid (FILE-22, MOD-02). The JsonEncryptor zip mode defaults (name hashing, per-definition splitting, moving to `ui/obfuscated/`) do this. Process vanilla path files while keeping their path and first check that vanilla modifications are visible in the resulting pack. Tools that insert comments into JSON with regular expressions (\"scrambling\") stop at `,` and `}` inside strings and turn `\"Hello, world\"` into `\"Hello/…/, world\"`, which shows in labels, and expressions break silently, so turn it off if there is text or an expression containing commas."
    },
    "sources": "JsonEncryptor"
  },
  "DBG-33": {
    "id": "DBG-33",
    "category": "DBG",
    "page": "reference/rules",
    "anchor": "dbg-33",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "Windows 릴리스 클라이언트의 콘텐츠 로그는 `%APPDATA%/Minecraft Bedrock/logs/ContentLog<날짜>.txt`에 쌓였다. `Unknown property`는 남았지만 `%` 식의 `Invalid expression`은 남지 않았다(EXP-46). 로그에 없다고 식이 맞는 것은 아니다.",
      "en": "The content log of the Windows release client accumulated at `%APPDATA%/Minecraft Bedrock/logs/ContentLog<date>.txt`. `Unknown property` was left, but `Invalid expression` from a `%` expression was not (EXP-46). An expression is not right just because it is not in the log."
    },
    "detail": {
      "ko": "Windows 릴리스 클라이언트의 콘텐츠 로그는 `%APPDATA%/Minecraft Bedrock/logs/ContentLog<날짜>.txt`에 쌓였다. `Unknown property`는 남았지만 `%` 식의 `Invalid expression`은 남지 않았다(EXP-46). 로그에 없다고 식이 맞는 것은 아니다.",
      "en": "The content log of the Windows release client accumulated in `%APPDATA%/Minecraft Bedrock/logs/ContentLog<date>.txt`. `Unknown property` was left, but `Invalid expression` of a `%` expression was not (EXP-46). An expression is not right just because it is absent from the log."
    },
    "sources": "DF"
  },
  "DBG-34": {
    "id": "DBG-34",
    "category": "DBG",
    "page": "reference/rules",
    "anchor": "dbg-34",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "콘텐츠 로그의 `JSON UI parse failure` 문구로 원인을 바로 찾을 수 있다. 엔진에 있는 문구: 타입 검사 `- expected a bool.`·`a number.`·`a string.`·`an object.`·`an array.`·`an array or a number.`·`an array or a string.`, 바인딩 `Must define bindings as an array.`·`Must define a binding name!`·`Must define a collection name for the binding!`·`Must define a source property name in the binding!`·`Must define a target property name in the binding!`·`resolve_ancestor_scope and resolve_sibling_scope cannot both be set!`, 팩토리 `The factory name should not be empty!`·`factory_variables should all be strings …`, 그 밖 `Invalid anim reference!`·`Must define 'images' as an array!`·`Must define state_controls as an array!`·포커스와 글꼴 문구. 참조 오류는 `Expected variable not found in ancestor tree: '%s'`(변수), `UI control reference not found: '%s'`(`@` 참조)다.",
      "en": "The `JSON UI parse failure` phrases in the content log let you find the cause directly. Phrases in the engine: type checks `- expected a bool.`, `a number.`, `a string.`, `an object.`, `an array.`, `an array or a number.`, `an array or a string.`, bindings `Must define bindings as an array.`, `Must define a binding name!`, `Must define a collection name for the binding!`, `Must define a source property name in the binding!`, `Must define a target property name in the binding!`, `resolve_ancestor_scope and resolve_sibling_scope cannot both be set!`, factories `The factory name should not be empty!`, `factory_variables should all be strings ...`, others `Invalid anim reference!`, `Must define 'images' as an array!`, `Must define state_controls as an array!`, and focus and font phrases. Reference errors are `Expected variable not found in ancestor tree: '%s'` (variable) and `UI control reference not found: '%s'` (`@` reference)."
    },
    "detail": {
      "ko": "콘텐츠 로그의 `JSON UI parse failure` 문구로 원인을 바로 찾을 수 있다. 엔진에 있는 문구: 타입 검사 `- expected a bool.`·`a number.`·`a string.`·`an object.`·`an array.`·`an array or a number.`·`an array or a string.`, 바인딩 `Must define bindings as an array.`·`Must define a binding name!`·`Must define a collection name for the binding!`·`Must define a source property name in the binding!`·`Must define a target property name in the binding!`·`resolve_ancestor_scope and resolve_sibling_scope cannot both be set!`, 팩토리 `The factory name should not be empty!`·`factory_variables should all be strings …`, 그 밖 `Invalid anim reference!`·`Must define 'images' as an array!`·`Must define state_controls as an array!`·포커스와 글꼴 문구. 참조 오류는 `Expected variable not found in ancestor tree: '%s'`(변수), `UI control reference not found: '%s'`(`@` 참조)다.",
      "en": "You can find the cause right away from the `JSON UI parse failure` messages in the content log. Messages in the engine: type checks `- expected a bool.`, `a number.`, `a string.`, `an object.`, `an array.`, `an array or a number.`, `an array or a string.`; bindings `Must define bindings as an array.`, `Must define a binding name!`, `Must define a collection name for the binding!`, `Must define a source property name in the binding!`, `Must define a target property name in the binding!`, `resolve_ancestor_scope and resolve_sibling_scope cannot both be set!`; factories `The factory name should not be empty!`, `factory_variables should all be strings …`; others `Invalid anim reference!`, `Must define 'images' as an array!`, `Must define state_controls as an array!`, and the focus and font messages. Reference errors are `Expected variable not found in ancestor tree: '%s'` (variable) and `UI control reference not found: '%s'` (`@` reference)."
    },
    "sources": "NB 4장"
  },
  "EXP-01": {
    "id": "EXP-01",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-01",
    "proposal": false,
    "evidence": [
      "실측",
      "작동팩",
      "바닐라",
      "코드"
    ],
    "title": {
      "ko": "쓸 수 있는 연산자는 `=`, `<`, `>`, `not`, `and`, `or`, `+`, `-`, ``, `/`와 문자열 자르기 `'%.Ns' `다. 우선순위는 아래 표와 같다(CN 재구성).",
      "en": "The usable operators are `=`, `<`, `>`, `not`, `and`, `or`, `+`, `-`, ``, `/`, and string cutting `'%.Ns' `. The precedence is as in the table below (CN reconstruction)."
    },
    "detail": {
      "ko": "쓸 수 있는 연산자는 `=`, `<`, `>`, `not`, `and`, `or`, `+`, `-`, ``, `/`와 문자열 자르기 `'%.Ns' `다. 우선순위는 아래 표와 같다(CN 재구성).",
      "en": "The operators you can use are `=`, `<`, `>`, `not`, `and`, `or`, `+`, `-`, ``, `/` and the string truncation `'%.Ns' `. The precedence is as in the table below (CN reconstruction)."
    },
    "sources": "BC-S14, BC-facts, BC 6.2-1, AP 4.7, VN, BW-intro, CN"
  },
  "EXP-02": {
    "id": "EXP-02",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-02",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "`%`는 연산자가 아니다. `((#c % 10) = 3)`은 화면을 열 때마다 `Invalid expression` assert를 낸다. 커뮤니티 예제(Chest-UI 등)의 `(x - x % 65536) / 65536` 같은 식은 쓰지 않는다.",
      "en": "`%` is not an operator. `((#c % 10) = 3)` gives an `Invalid expression` assert every time the screen opens. Do not use expressions like `(x - x % 65536) / 65536` from community examples (Chest-UI and others)."
    },
    "detail": {
      "ko": "`%`는 연산자가 아니다. `((#c % 10) = 3)`은 화면을 열 때마다 `Invalid expression` assert를 낸다. 커뮤니티 예제(Chest-UI 등)의 `(x - x % 65536) / 65536` 같은 식은 쓰지 않는다.",
      "en": "`%` is not an operator. `((#c % 10) = 3)` raises an `Invalid expression` assert every time the screen opens. Do not use expressions like `(x - x % 65536) / 65536` from community examples (Chest-UI, etc.)."
    },
    "sources": "BC-S14, BC-facts, MJ 4.2-7, 부록A C-06"
  },
  "EXP-03": {
    "id": "EXP-03",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-03",
    "proposal": false,
    "evidence": [
      "실측",
      "코드",
      "추론"
    ],
    "title": {
      "ko": "`>=`, `<=`는 없다. 실패한 식은 속성을 기본값에 남기므로 `#visible`에 쓰면 항상 참처럼 보인다. `(a > b) or (a = b)`로 쓴다(위키도 이 형태를 표준으로 적지만 실측 기록은 없다). CN 평가기에서 `<=`는 연산자 둘로 읽혀 식 전체가 null이 된다. `(not (#v < a))`도 대안이다.",
      "en": "`>=` and `<=` do not exist. A failed expression leaves the property at its default, so used in `#visible` it looks always true. Write `(a > b) or (a = b)` (the wiki also writes this form as the standard, but there is no measurement record). In the CN evaluator `<=` is read as two operators and the whole expression becomes null. `(not (#v < a))` is also an alternative."
    },
    "detail": {
      "ko": "`>=`, `<=`는 없다. 실패한 식은 속성을 기본값에 남기므로 `#visible`에 쓰면 항상 참처럼 보인다. `(a > b) or (a = b)`로 쓴다(위키도 이 형태를 표준으로 적지만 실측 기록은 없다). CN 평가기에서 `<=`는 연산자 둘로 읽혀 식 전체가 null이 된다. `(not (#v < a))`도 대안이다.",
      "en": "There are no `>=` and `<=`. A failed expression leaves the property at its default, so written to `#visible` it looks always true. Write `(a > b) or (a = b)` (the wiki also writes this form as the standard but there is no measurement record). In the CN evaluator `<=` is read as two operators and the whole expression becomes null. `(not (#v < a))` is also an alternative."
    },
    "sources": "BC-facts, BW-intro, CN-run"
  },
  "EXP-04": {
    "id": "EXP-04",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-04",
    "proposal": false,
    "evidence": [
      "실측",
      "작동팩",
      "코드",
      "충돌"
    ],
    "title": {
      "ko": "`<`, `>`는 동작한다. 근거는 CN 평가기와 AP의 `>` 사용, 그리고 S14에서 `<`가 든 식이 오류 없이 평가된 것이다. 다만 S14의 `962 < #c < 964`, `0.9 < (#c / 1000) < 1`이 참이었다는 결과는 사슬 비교라 범위 검사의 근거가 되지 못한다(EXP-28, 부록A C-41). 범위는 `((962 < #c) and (#c < 964))`로 쓴다. `<`가 `Invalid expression`이라는 이전 기록(S9)은 따르지 않는다.",
      "en": "`<` and `>` work. The basis is the CN evaluator, AP's use of `>`, and that an expression containing `<` was evaluated without error in S14. However, the result in S14 that `962 < #c < 964` and `0.9 < (#c / 1000) < 1` were true is a chained comparison and so is no basis for a range check (EXP-28, Appendix A C-41). Write a range as `((962 < #c) and (#c < 964))`. The earlier record (S9) that `<` is `Invalid expression` is not followed."
    },
    "detail": {
      "ko": "`<`, `>`는 동작한다. 근거는 CN 평가기와 AP의 `>` 사용, 그리고 S14에서 `<`가 든 식이 오류 없이 평가된 것이다. 다만 S14의 `962 < #c < 964`, `0.9 < (#c / 1000) < 1`이 참이었다는 결과는 사슬 비교라 범위 검사의 근거가 되지 못한다(EXP-28, 부록A C-41). 범위는 `((962 < #c) and (#c < 964))`로 쓴다. `<`가 `Invalid expression`이라는 이전 기록(S9)은 따르지 않는다.",
      "en": "`<` and `>` work. The evidence is the CN evaluator, AP's use of `>`, and that expressions containing `<` in S14 were evaluated without an error. But the result that `962 < #c < 964` and `0.9 < (#c / 1000) < 1` in S14 were true is a chained comparison so it is not evidence of a range check (EXP-28, Appendix A C-41). Write a range as `((962 < #c) and (#c < 964))`. The earlier record that `<` is `Invalid expression` (S9) is not followed."
    },
    "sources": "BC-S14, BC-facts, BC-S9, AP 4.7, 부록A C-02, CN-run, 부록A C-41"
  },
  "EXP-05": {
    "id": "EXP-05",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-05",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "괄호를 생략한 `'%.6s' * #text = 'x'`도 곱(자르기)이 비교보다 먼저 계산되어 동작했다. 그래도 괄호를 명시한다.",
      "en": "Even without parentheses, `'%.6s' * #text = 'x'` worked because the product (cutting) is computed before the comparison. Still, write the parentheses explicitly."
    },
    "detail": {
      "ko": "괄호를 생략한 `'%.6s' * #text = 'x'`도 곱(자르기)이 비교보다 먼저 계산되어 동작했다. 그래도 괄호를 명시한다.",
      "en": "Even `'%.6s' * #text = 'x'` without parentheses worked because the product (truncation) is computed before the comparison. Still, write the parentheses explicitly."
    },
    "sources": "AP 4.4"
  },
  "EXP-06": {
    "id": "EXP-06",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-06",
    "proposal": false,
    "evidence": [
      "실측",
      "추론"
    ],
    "title": {
      "ko": "너무 깊은 식(`((#c + #t + (#c * #t)) = 964963)`)은 실패한다. 단계별 view 바인딩으로 나눠 중간 속성에 담는다. 다만 CN 평가기는 중첩 512단계까지 계산하므로 실패 원인은 깊이가 아니라 타입일 수 있다. `#c`, `#t`가 상자 수량이면 문자열이고(EXP-17), 문자열 `+`는 이어 붙이기다.",
      "en": "An expression that is too deep (`((#c + #t + (#c * #t)) = 964963)`) fails. Split it with step-by-step view bindings and put the intermediate values in properties. However, the CN evaluator computes up to 512 levels of nesting, so the cause of failure may be the type and not the depth. If `#c` and `#t` are chest quantities they are strings (EXP-17), and string `+` is concatenation."
    },
    "detail": {
      "ko": "너무 깊은 식(`((#c + #t + (#c * #t)) = 964963)`)은 실패한다. 단계별 view 바인딩으로 나눠 중간 속성에 담는다. 다만 CN 평가기는 중첩 512단계까지 계산하므로 실패 원인은 깊이가 아니라 타입일 수 있다. `#c`, `#t`가 상자 수량이면 문자열이고(EXP-17), 문자열 `+`는 이어 붙이기다.",
      "en": "An expression that is too deep (`((#c + #t + (#c * #t)) = 964963)`) fails. Split it into step-by-step view bindings and put the intermediates in properties. But the CN evaluator computes up to 512 levels of nesting, so the cause of the failure may be types, not depth. If `#c` and `#t` are chest quantities they are strings (EXP-17), and string `+` is concatenation."
    },
    "sources": "BC-S14, CN-run"
  },
  "EXP-07": {
    "id": "EXP-07",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-07",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "포함 검사: `(not ((#s - 'X') = #s))`. `X`가 들어 있으면 지운 결과가 원래와 달라진다. 위치와 무관해서 필드 경계를 계산할 필요가 없다.",
      "en": "Contains check: `(not ((#s - 'X') = #s))`. If `X` is present, the result after erasing differs from the original. It is independent of position, so field boundaries need not be computed."
    },
    "detail": {
      "ko": "포함 검사: `(not ((#s - 'X') = #s))`. `X`가 들어 있으면 지운 결과가 원래와 달라진다. 위치와 무관해서 필드 경계를 계산할 필요가 없다.",
      "en": "Containment check: `(not ((#s - 'X') = #s))`. If `X` is contained, the erased result differs from the original. It is independent of position so there is no need to compute field boundaries."
    },
    "sources": "BA 2장·3.3, AP 4.1, BW-form, BW-title"
  },
  "EXP-08": {
    "id": "EXP-08",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-08",
    "proposal": false,
    "evidence": [
      "코드",
      "작동팩"
    ],
    "title": {
      "ko": "접두사 검사: `(('%.Ns' * #s) = 'X')`, N은 X의 바이트 길이. 짧은 플래그(`t`/`f`)는 길이+1로 잘라 비교해야 `f`로 시작하는 긴 값이 오인되지 않는다: `(('%.2s' * #v) = 'f')`.",
      "en": "Prefix check: `(('%.Ns' * #s) = 'X')`, where N is the byte length of X. A short flag (`t`/`f`) must be cut to length + 1 before comparing so a longer value starting with `f` is not mistaken: `(('%.2s' * #v) = 'f')`."
    },
    "detail": {
      "ko": "접두사 검사: `(('%.Ns' * #s) = 'X')`, N은 X의 바이트 길이. 짧은 플래그(`t`/`f`)는 길이+1로 잘라 비교해야 `f`로 시작하는 긴 값이 오인되지 않는다: `(('%.2s' * #v) = 'f')`. , BC 6.2-2, AP 4.4)",
      "en": "Prefix check: `(('%.Ns' * #s) = 'X')`, N is the byte length of X. Short flags (`t`/`f`) must be cut and compared at length+1 so that a long value starting with `f` is not mistaken: `(('%.2s' * #v) = 'f')`. , BC 6.2-2, AP 4.4)"
    },
    "sources": "BC 4.1-(4), BC 6.2-2, AP 4.4"
  },
  "EXP-09": {
    "id": "EXP-09",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-09",
    "proposal": false,
    "evidence": [
      "코드",
      "작동팩",
      "충돌"
    ],
    "title": {
      "ko": "`'%.Ns'`는 UTF-8 바이트 단위로 자른다. 한글은 3바이트, 영문·숫자는 1바이트다. 고정 폭 필드의 패딩과 자르기는 바이트 기준으로 계산한다. \"문자 단위\"라는 주장은 틀렸다. `%5.3s`, `%-5.3s` 같은 패딩 서식은 외부 문서만 있고 실측이 없다. `§`는 2바이트, 대부분의 이모지는 4바이트다(EXP-24). 위키가 적은 패딩 서식은 EXP-25를 본다. CN 평가기는 `%.Ns`만 인식하고 `%5.3s`는 자르지 않는다(부록A C-05).",
      "en": "`'%.Ns'` cuts in UTF-8 bytes. Hangul is 3 bytes and letters and digits are 1 byte. Padding and cutting of fixed-width fields are computed by bytes. The claim that it is \"per character\" is wrong. Padding formats such as `%5.3s` and `%-5.3s` exist only in external documents and have no measurement. `§` is 2 bytes and most emoji are 4 bytes (EXP-24). For the padding formats the wiki lists, see EXP-25. The CN evaluator recognizes only `%.Ns` and does not cut with `%5.3s` (Appendix A C-05)."
    },
    "detail": {
      "ko": "`'%.Ns'`는 UTF-8 바이트 단위로 자른다. 한글은 3바이트, 영문·숫자는 1바이트다. 고정 폭 필드의 패딩과 자르기는 바이트 기준으로 계산한다. \"문자 단위\"라는 주장은 틀렸다. `%5.3s`, `%-5.3s` 같은 패딩 서식은 외부 문서만 있고 실측이 없다. `§`는 2바이트, 대부분의 이모지는 4바이트다(EXP-24). 위키가 적은 패딩 서식은 EXP-25를 본다. CN 평가기는 `%.Ns`만 인식하고 `%5.3s`는 자르지 않는다(부록A C-05).",
      "en": "`'%.Ns'` cuts in UTF-8 bytes. Hangul is 3 bytes and letters and digits are 1 byte. Padding and truncation of fixed-width fields are computed by bytes. The claim of \"character units\" is wrong. Padding formats such as `%5.3s` and `%-5.3s` exist only in external documents and have no measurement. `§` is 2 bytes and most emoji are 4 bytes (EXP-24). For the padding formats the wiki lists, see EXP-25. The CN evaluator recognizes only `%.Ns` and does not cut `%5.3s` (Appendix A C-05)."
    },
    "sources": "BA 3.1 `utf8Length` 인코더, MJ 4.2-9, 부록A C-05, BW-intro, CN-run"
  },
  "EXP-10": {
    "id": "EXP-10",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-10",
    "proposal": false,
    "evidence": [
      "실측",
      "작동팩",
      "충돌"
    ],
    "title": {
      "ko": "`'%.Ns' * X`는 `X`가 문자열 리터럴이면 자르지 않는다. 바인딩(`#…`)이나 바인딩을 포함한 식(`('%.7s' * (#text - ('%.6s' * #text)))`)에는 된다. CN 평가기는 리터럴도 자른다(`('%.3s' * 'abcdef')` → `'abc'`). 연산자 문제가 아니라 `#`가 없는 바인딩 식은 바인딩이 되지 않는 규칙(BND-05) 때문일 가능성이 크다(부록A C-42).",
      "en": "`'%.Ns' * X` does not cut if `X` is a string literal. It works on a binding (`#...`) or an expression containing a binding (`('%.7s' * (#text - ('%.6s' * #text)))`). The CN evaluator also cuts literals (`('%.3s' * 'abcdef')` -> `'abc'`). It is likely due not to an operator problem but to the rule that an expression binding without `#` is not bound (BND-05) (Appendix A C-42)."
    },
    "detail": {
      "ko": "`'%.Ns' * X`는 `X`가 문자열 리터럴이면 자르지 않는다. 바인딩(`#…`)이나 바인딩을 포함한 식(`('%.7s' * (#text - ('%.6s' * #text)))`)에는 된다. CN 평가기는 리터럴도 자른다(`('%.3s' * 'abcdef')` → `'abc'`). 연산자 문제가 아니라 `#`가 없는 바인딩 식은 바인딩이 되지 않는 규칙(BND-05) 때문일 가능성이 크다(부록A C-42).",
      "en": "`'%.Ns' * X` does not cut if `X` is a string literal. It works on bindings (`#…`) and expressions containing bindings (`('%.7s' * (#text - ('%.6s' * #text)))`). The CN evaluator also cuts literals (`('%.3s' * 'abcdef')` -> `'abc'`). It is more likely caused not by the operator but by the rule that a binding expression without `#` does not become a binding (BND-05) (Appendix A C-42)."
    },
    "sources": "BC-facts, AP 4.5, CN, 부록A C-42"
  },
  "EXP-11": {
    "id": "EXP-11",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-11",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "N바이트 뒤 L바이트 꺼내기는 세 단계로 한다.",
      "en": "Taking L bytes after N bytes is done in three steps."
    },
    "detail": {
      "ko": "N바이트 뒤 L바이트 꺼내기는 세 단계로 한다.",
      "en": "Taking L bytes after N bytes is done in three steps."
    },
    "sources": "BA 3.2, AP 4.5"
  },
  "EXP-12": {
    "id": "EXP-12",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-12",
    "proposal": false,
    "evidence": [
      "작동팩",
      "추론"
    ],
    "title": {
      "ko": "문자열 `-`는 모든 출현을 지운다. 그래서 패딩 문자(`$` 등)와 예약 문자는 본문에 나오면 안 되고, 인코더가 미리 제거해야 한다. 같은 이유로 `(#s - #head)`는 `#head`와 같은 문자열이 뒤에 또 있으면 그것까지 지운다. 머리 부분은 충분히 길고 고유하게 만든다.",
      "en": "String `-` erases every occurrence. So padding characters (`$` and so on) and reserved characters must not appear in the body, and the encoder must remove them beforehand. For the same reason, `(#s - #head)` also erases a later occurrence of the same string as `#head`. Make the head part long enough and unique."
    },
    "detail": {
      "ko": "문자열 `-`는 모든 출현을 지운다. 그래서 패딩 문자(`$` 등)와 예약 문자는 본문에 나오면 안 되고, 인코더가 미리 제거해야 한다. 같은 이유로 `(#s - #head)`는 `#head`와 같은 문자열이 뒤에 또 있으면 그것까지 지운다. 머리 부분은 충분히 길고 고유하게 만든다.",
      "en": "String `-` erases every occurrence. So padding characters (`$`, etc.) and reserved characters must not appear in the body, and the encoder must remove them in advance. For the same reason `(#s - #head)` also erases the same string as `#head` if it appears later again. Make the head part long and unique enough."
    },
    "sources": "BA 3.2, AP 4.5"
  },
  "EXP-13": {
    "id": "EXP-13",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-13",
    "proposal": false,
    "evidence": [
      "미검증"
    ],
    "title": {
      "ko": "앞 N바이트만 지우는 트릭 `(('@' + s) - ('@' + ('%.3s' * s))) - '@'`은 출처에 실측이 없다. 쓰려면 마지막 `- '@'`가 본문의 `@`도 지운다는 점을 감안해 본문에 없는 문자를 고른다.",
      "en": "The trick that erases only the first N bytes, `(('@' + s) - ('@' + ('%.3s' * s))) - '@'`, has no measurement in the sources. To use it, note that the final `- '@'` also erases any `@` in the body, and choose a character not in the body."
    },
    "detail": {
      "ko": "앞 N바이트만 지우는 트릭 `(('@' + s) - ('@' + ('%.3s' * s))) - '@'`은 출처에 실측이 없다. 쓰려면 마지막 `- '@'`가 본문의 `@`도 지운다는 점을 감안해 본문에 없는 문자를 고른다.",
      "en": "The trick of erasing only the first N bytes, `(('@' + s) - ('@' + ('%.3s' * s))) - '@'`, has no measurement in the sources. To use it, choose a character not in the body, taking into account that the final `- '@'` also erases any `@` in the body."
    },
    "sources": "MJ 8장-6"
  },
  "EXP-14": {
    "id": "EXP-14",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-14",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "포함 검사 토큰에는 종결자를 붙이고(`name.1b;`), 토큰끼리 접두·접미 관계가 생기지 않게 설계한다. `X.1b;`는 `aX.1b;`에도 걸린다. 대문자 그룹 + 소문자 비트(`~Fo`, `~Xa`)처럼 짜면 서로 접두 관계가 없다.",
      "en": "Attach a terminator to contains-check tokens (`name.1b;`) and design tokens so none is a prefix or suffix of another. `X.1b;` also matches in `aX.1b;`. Building them as an uppercase group + lowercase bit (`~Fo`, `~Xa`) leaves no prefix relation between them."
    },
    "detail": {
      "ko": "포함 검사 토큰에는 종결자를 붙이고(`name.1b;`), 토큰끼리 접두·접미 관계가 생기지 않게 설계한다. `X.1b;`는 `aX.1b;`에도 걸린다. 대문자 그룹 + 소문자 비트(`~Fo`, `~Xa`)처럼 짜면 서로 접두 관계가 없다.",
      "en": "Attach a terminator to containment check tokens (`name.1b;`) and design them so no prefix or suffix relationship arises among tokens. `X.1b;` also matches `aX.1b;`. If built like an uppercase group + lowercase bit (`~Fo`, `~Xa`), there is no prefix relationship among them."
    },
    "sources": "AP 4.1, BA 3.3"
  },
  "EXP-15": {
    "id": "EXP-15",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-15",
    "proposal": false,
    "evidence": [
      "코드",
      "작동팩"
    ],
    "title": {
      "ko": "엔진은 식 결과의 타입을 생김새로 정한다. 숫자처럼 생긴 문자열(`'0'`, `'3/17'`, `'12'`)은 숫자가 되어 문자열 비교가 틀어진다. 숫자로 해석되면 안 되는 값에는 글자 접두를 붙인다: 플래그는 `t`/`f`, 탭 번호 `Ta`, 진행도 `§f3/17`, 퍼센트 `P050`. 영문이 섞인 문자열(`'a123'`)은 산술을 해도 숫자가 되지 않는다. 원인: 연산 결과 문자열은 다시 해석된다(EXP-30).",
      "en": "The engine decides the type of an expression result by its look. A string that looks like a number (`'0'`, `'3/17'`, `'12'`) becomes a number and breaks string comparison. Put a letter prefix on values that must not be interpreted as numbers: flags `t`/`f`, tab number `Ta`, progress `§f3/17`, percent `P050`. A string mixed with letters (`'a123'`) does not become a number even with arithmetic. Cause: result strings of operations are interpreted again (EXP-30)."
    },
    "detail": {
      "ko": "엔진은 식 결과의 타입을 생김새로 정한다. 숫자처럼 생긴 문자열(`'0'`, `'3/17'`, `'12'`)은 숫자가 되어 문자열 비교가 틀어진다. 숫자로 해석되면 안 되는 값에는 글자 접두를 붙인다: 플래그는 `t`/`f`, 탭 번호 `Ta`, 진행도 `§f3/17`, 퍼센트 `P050`. 영문이 섞인 문자열(`'a123'`)은 산술을 해도 숫자가 되지 않는다. 원인: 연산 결과 문자열은 다시 해석된다(EXP-30). , BA 3.1, BW-type, CN-run)",
      "en": "The engine decides the type of an expression result by its appearance. A string that looks like a number (`'0'`, `'3/17'`, `'12'`) becomes a number and string comparison goes wrong. Put a letter prefix on values that must not be interpreted as numbers: flags `t`/`f`, tab number `Ta`, progress `§f3/17`, percent `P050`. A string with letters mixed in (`'a123'`) does not become a number even with arithmetic. Cause: the result string of an operation is reinterpreted (EXP-30). , BA 3.1, BW-type, CN-run)"
    },
    "sources": "BC 4.1-(4), BA 3.1, BW-type, CN-run"
  },
  "EXP-16": {
    "id": "EXP-16",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-16",
    "proposal": false,
    "evidence": [
      "실측",
      "작동팩",
      "코드",
      "추론"
    ],
    "title": {
      "ko": "문자열을 숫자로 바꾸는 확실한 방법은 `(#v - 0)`이다. `(#v + 0)`은 이어 붙이기(`'350'`)가 된다. `(#v * 1)`은 쓰지 않는다: S12(2026-09-17)에서 0을 냈고, Cinnabar 재구성 평가기에서도 문자열 `` 숫자는 빈 문자열이다(EXP-31). 여러 작동팩(BA 진행률, AP 아이템 ID)과 S9(2026-09-14)가 ` 1`로 동작한 것은 피연산자가 이미 숫자였기 때문일 가능성이 크다(`'%.3s'`로 자른 `'042'`는 곧바로 정수 42, EXP-30). Bedrock Wiki가 2026-10-05에 적은 \"어느 버전부터 `* 1` 변환이 동작하지 않는다\"는 버전 변화 설명은 보조 가설로 남긴다. 옛 팩의 `* 1` 식은 최신 버전에서 다시 확인한다. 위키가 대안으로 적은 `(0 + #v)`는 CN 모델에서 동작하지만 게임 실측은 없다.",
      "en": "The reliable way to turn a string into a number is `(#v - 0)`. `(#v + 0)` becomes concatenation (`'350'`). Do not use `(#v * 1)`: it gave 0 in S12 (2026-09-17), and in the Cinnabar reconstruction evaluator too, string `` number is an empty string (EXP-31). That several working packs (BA progress, AP item ID) and S9 (2026-09-14) worked with ` 1` is likely because the operand was already a number (`'042'` cut with `'%.3s'` is immediately the integer 42, EXP-30). The version-change explanation the Bedrock Wiki wrote on 2026-10-05, that \"from some version the `* 1` conversion no longer works\", stays as a secondary hypothesis. Recheck `* 1` expressions of old packs on the latest version. The `(0 + #v)` the wiki lists as an alternative works in the CN model but has no game measurement."
    },
    "detail": {
      "ko": "문자열을 숫자로 바꾸는 확실한 방법은 `(#v - 0)`이다. `(#v + 0)`은 이어 붙이기(`'350'`)가 된다. `(#v * 1)`은 쓰지 않는다: S12(2026-09-17)에서 0을 냈고, Cinnabar 재구성 평가기에서도 문자열 `` 숫자는 빈 문자열이다(EXP-31). 여러 작동팩(BA 진행률, AP 아이템 ID)과 S9(2026-09-14)가 ` 1`로 동작한 것은 피연산자가 이미 숫자였기 때문일 가능성이 크다(`'%.3s'`로 자른 `'042'`는 곧바로 정수 42, EXP-30). Bedrock Wiki가 2026-10-05에 적은 \"어느 버전부터 `* 1` 변환이 동작하지 않는다\"는 버전 변화 설명은 보조 가설로 남긴다. 옛 팩의 `* 1` 식은 최신 버전에서 다시 확인한다. 위키가 대안으로 적은 `(0 + #v)`는 CN 모델에서 동작하지만 게임 실측은 없다.",
      "en": "The sure way to turn a string into a number is `(#v - 0)`. `(#v + 0)` becomes concatenation (`'350'`). Do not use `(#v * 1)`: it gave 0 in S12 (2026-09-17), and in the Cinnabar reconstructed evaluator string `` number is also an empty string (EXP-31). That several working packs (BA progress, AP item ID) and S9 (2026-09-14) worked with ` 1` was most likely because the operand was already a number (`'042'` cut with `'%.3s'` is immediately the integer 42, EXP-30). The version change explanation the Bedrock Wiki wrote on 2026-10-05, \"from some version the `* 1` conversion does not work\", remains as a secondary hypothesis. Recheck old packs' `* 1` expressions on the latest version. The `(0 + #v)` the wiki lists as an alternative works in the CN model but has no game measurement."
    },
    "sources": "BC-S12, BC-S9, BC-facts, BA-원본, AP 4.5, 부록A C-04, BW-type, CN-run"
  },
  "EXP-17": {
    "id": "EXP-17",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-17",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "상자 슬롯의 `#inventory_stack_count`는 식 안에서 문자열이고 산술로도 숫자가 되지 않는다. `(#count = '19')`만 참이다. 바닐라처럼 `text`에 직접 바인딩해도 표시되지 않는다(그래서 TXT-12의 lang 키 우회가 필요하다). CN 평가기 모델에서는 `((#count - 0) = 19)`가 참이므로 \"산술로도 숫자가 되지 않는다\"가 `- 0`에도 해당하는지는 확인이 필요하다.",
      "en": "`#inventory_stack_count` of a chest slot is a string inside an expression and does not become a number even with arithmetic. Only `(#count = '19')` is true. Binding it directly to `text` as vanilla does does not display either (so the lang key workaround of TXT-12 is needed). In the CN evaluator model `((#count - 0) = 19)` is true, so whether \"does not become a number even with arithmetic\" also applies to `- 0` needs checking."
    },
    "detail": {
      "ko": "상자 슬롯의 `#inventory_stack_count`는 식 안에서 문자열이고 산술로도 숫자가 되지 않는다. `(#count = '19')`만 참이다. 바닐라처럼 `text`에 직접 바인딩해도 표시되지 않는다(그래서 TXT-12의 lang 키 우회가 필요하다). CN 평가기 모델에서는 `((#count - 0) = 19)`가 참이므로 \"산술로도 숫자가 되지 않는다\"가 `- 0`에도 해당하는지는 확인이 필요하다.",
      "en": "The `#inventory_stack_count` of a chest slot is a string inside expressions and does not become a number even with arithmetic. Only `(#count = '19')` is true. Even binding it directly to `text` as vanilla does does not display (so the lang key workaround of TXT-12 is needed). In the CN evaluator model `((#count - 0) = 19)` is true, so whether \"does not become a number even with arithmetic\" also applies to `- 0` needs checking."
    },
    "sources": "BC-facts, CN-run"
  },
  "EXP-18": {
    "id": "EXP-18",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-18",
    "proposal": false,
    "evidence": [
      "실측",
      "코드"
    ],
    "title": {
      "ko": "산술은 정수 중심이다. 앞자리가 있는 소수 리터럴은 정수다(EXP-27): `0.3`은 0, `0.001`은 0이라서 `((#v = #v) * 0.3)`은 0, `(#t * 0.001) = 1`은 거짓이었다. 실수 리터럴은 `.3`처럼 점으로 시작한다. 정수끼리의 나눗셈 `(#v / 100)`·`(#v / 100.0)`도 정수이므로, 정수에서 `#clip_ratio` 같은 0~1 값을 만들려면 `(#v * .01)`을 쓴다(부록A C-16). S14의 `0.9 < (#c / 1000) < 1` 참은 사슬 비교(EXP-28)라 소수 나눗셈의 근거가 되지 못한다.",
      "en": "Arithmetic is integer-centered. A decimal literal with a leading digit is an integer (EXP-27): `0.3` is 0 and `0.001` is 0, so `((#v = #v) * 0.3)` was 0 and `(#t * 0.001) = 1` was false. A real number literal starts with a dot like `.3`. Division between integers `(#v / 100)` and `(#v / 100.0)` is also an integer, so to make a 0~1 value such as `#clip_ratio` from an integer, use `(#v * .01)` (Appendix A C-16). The true result of `0.9 < (#c / 1000) < 1` in S14 is a chained comparison (EXP-28) and is no basis for decimal division."
    },
    "detail": {
      "ko": "산술은 정수 중심이다. 앞자리가 있는 소수 리터럴은 정수다(EXP-27): `0.3`은 0, `0.001`은 0이라서 `((#v = #v) * 0.3)`은 0, `(#t * 0.001) = 1`은 거짓이었다. 실수 리터럴은 `.3`처럼 점으로 시작한다. 정수끼리의 나눗셈 `(#v / 100)`·`(#v / 100.0)`도 정수이므로, 정수에서 `#clip_ratio` 같은 0~1 값을 만들려면 `(#v * .01)`을 쓴다(부록A C-16). S14의 `0.9 < (#c / 1000) < 1` 참은 사슬 비교(EXP-28)라 소수 나눗셈의 근거가 되지 못한다.",
      "en": "Arithmetic is integer-centered. A decimal literal with a leading digit is an integer (EXP-27): `0.3` is 0 and `0.001` is 0, so `((#v = #v) * 0.3)` was 0 and `(#t * 0.001) = 1` was false. A real literal starts with a dot like `.3`. Division of integers `(#v / 100)` and `(#v / 100.0)` is also an integer, so to make a 0~1 value such as `#clip_ratio` from an integer, use `(#v * .01)` (Appendix A C-16). The true result of `0.9 < (#c / 1000) < 1` in S14 is a chained comparison (EXP-28) so it is not evidence for decimal division."
    },
    "sources": "BC-S12, BC-S14, BA-원본, 부록A C-16, CN, CN-run"
  },
  "EXP-19": {
    "id": "EXP-19",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-19",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "불리언은 산술에서 `true` 1, `false` 0이다. `((#mode = 'on') * 1)`로 팩토리 길이 0/1을 만든다.",
      "en": "In arithmetic a boolean is `true` 1 and `false` 0. `((#mode = 'on') * 1)` makes a factory length of 0/1."
    },
    "detail": {
      "ko": "불리언은 산술에서 `true` 1, `false` 0이다. `((#mode = 'on') * 1)`로 팩토리 길이 0/1을 만든다.",
      "en": "A boolean is `true` 1 and `false` 0 in arithmetic. Make a factory length 0/1 with `((#mode = 'on') * 1)`."
    },
    "sources": "BC-facts, BC-S11, BW-type"
  },
  "EXP-20": {
    "id": "EXP-20",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-20",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "바닥(floor)·나머지 연산이 없으므로 여러 필드를 숫자 하나에 묶었다가 다시 나눌 수 없다. 값은 통째로 비교하거나 범위로 비교한다. 여러 값은 문자열 필드나 여러 채널로 나눠 보낸다.",
      "en": "There is no floor or remainder operation, so several fields cannot be packed into one number and divided back. Compare values whole or by range. Send several values split into string fields or several channels."
    },
    "detail": {
      "ko": "바닥(floor)·나머지 연산이 없으므로 여러 필드를 숫자 하나에 묶었다가 다시 나눌 수 없다. 값은 통째로 비교하거나 범위로 비교한다. 여러 값은 문자열 필드나 여러 채널로 나눠 보낸다.",
      "en": "There are no floor and remainder operations, so you cannot pack several fields into one number and divide them back out. Compare values whole or by range. Send several values split into string fields or several channels."
    },
    "sources": "BC-S14"
  },
  "EXP-21": {
    "id": "EXP-21",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-21",
    "proposal": false,
    "evidence": [
      "실측",
      "바닐라",
      "충돌"
    ],
    "title": {
      "ko": "`(#count / 19)`와 `('' + #count)`를 함께 쓴 상자 화면이 열자마자 클라이언트를 종료시켰고, 둘을 빼자 정상이었다. 둘 중 어느 것이 원인인지는 분리되지 않았다. 바닐라는 `(not (#texture = ''))`처럼 빈 문자열 비교를 쓰므로 비교는 안전하다. 문자열에 나누기를 하지 말고, 이어 붙일 때는 `('n=' + #x)`처럼 비어 있지 않은 접두를 쓴다.",
      "en": "A chest screen that used both `(#count / 19)` and `('' + #count)` terminated the client as soon as it opened, and it was normal once both were removed. Which of the two is the cause was not separated. Vanilla uses empty-string comparison like `(not (#texture = ''))`, so comparison is safe. Do not divide strings, and when concatenating use a non-empty prefix like `('n=' + #x)`."
    },
    "detail": {
      "ko": "`(#count / 19)`와 `('' + #count)`를 함께 쓴 상자 화면이 열자마자 클라이언트를 종료시켰고, 둘을 빼자 정상이었다. 둘 중 어느 것이 원인인지는 분리되지 않았다. 바닐라는 `(not (#texture = ''))`처럼 빈 문자열 비교를 쓰므로 비교는 안전하다. 문자열에 나누기를 하지 말고, 이어 붙일 때는 `('n=' + #x)`처럼 비어 있지 않은 접두를 쓴다.",
      "en": "A chest screen using `(#count / 19)` and `('' + #count)` together exited the client as soon as it opened, and it was normal when both were removed. Which of the two was the cause was not isolated. Vanilla uses empty string comparison like `(not (#texture = ''))`, so comparison is safe. Do not divide strings, and when concatenating use a non-empty prefix like `('n=' + #x)`."
    },
    "sources": "BC-facts, BC-S14, VN server_form.json:159, 부록A C-13"
  },
  "EXP-22": {
    "id": "EXP-22",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-22",
    "proposal": false,
    "evidence": [
      "실측",
      "코드"
    ],
    "title": {
      "ko": "문자열 + 정수는 이어 붙여지지만 문자열 + float은 아무것도 나오지 않는다. float을 글자로 보여 주려면 비교 사슬로 구간을 나누거나 정수 채널로 보낸다. 값의 범위를 알면 `(0 + (#f > 0) + (#f > 1) + … + (#f > 9))`처럼 비교 결과를 더해 정수부를 구할 수 있다. 원인: 실수 값의 \"글자\"가 비어 있다(CN). 리터럴 `1.5`는 정수 1이라 `('n=' + 1.5)`는 `'n=1'`이다(EXP-27).",
      "en": "String + integer is concatenated, but string + float gives nothing. To show a float as text, split ranges with a comparison chain or send it through an integer channel. If you know the range of the value, you can get the integer part by adding comparison results, like `(0 + (#f > 0) + (#f > 1) + ... + (#f > 9))`. Cause: the \"text\" of a real value is empty (CN). The literal `1.5` is the integer 1, so `('n=' + 1.5)` is `'n=1'` (EXP-27)."
    },
    "detail": {
      "ko": "문자열 + 정수는 이어 붙여지지만 문자열 + float은 아무것도 나오지 않는다. float을 글자로 보여 주려면 비교 사슬로 구간을 나누거나 정수 채널로 보낸다. 값의 범위를 알면 `(0 + (#f > 0) + (#f > 1) + … + (#f > 9))`처럼 비교 결과를 더해 정수부를 구할 수 있다. 원인: 실수 값의 \"글자\"가 비어 있다(CN). 리터럴 `1.5`는 정수 1이라 `('n=' + 1.5)`는 `'n=1'`이다(EXP-27).",
      "en": "String + integer is concatenated but string + float outputs nothing. To show a float as text, split ranges with a comparison chain or send it through an integer channel. If you know the range of values, you can get the integer part by adding comparison results like `(0 + (#f > 0) + (#f > 1) + … + (#f > 9))`. Cause: the \"text\" of a real value is empty (CN). The literal `1.5` is the integer 1, so `('n=' + 1.5)` is `'n=1'` (EXP-27)."
    },
    "sources": "BC-facts, BW-type, CN-run"
  },
  "EXP-23": {
    "id": "EXP-23",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-23",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "염색 가능한 커스텀 아이템의 `#item_custom_color`는 부호 있는 ARGB 정수다(`0x123456` → `-15584170`). RGB 값으로 비교하면 맞지 않는다.",
      "en": "`#item_custom_color` of a dyeable custom item is a signed ARGB integer (`0x123456` -> `-15584170`). Comparing it as an RGB value does not match."
    },
    "detail": {
      "ko": "염색 가능한 커스텀 아이템의 `#item_custom_color`는 부호 있는 ARGB 정수다(`0x123456` → `-15584170`). RGB 값으로 비교하면 맞지 않는다.",
      "en": "The `#item_custom_color` of a dyeable custom item is a signed ARGB integer (`0x123456` -> `-15584170`). Comparing by RGB value does not match."
    },
    "sources": "BC-S14"
  },
  "EXP-24": {
    "id": "EXP-24",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-24",
    "proposal": false,
    "evidence": [
      "코드",
      "미검증"
    ],
    "title": {
      "ko": "UTF-8 바이트 수: U+0000~U+007F 1바이트(영문·숫자), U+0080~U+07FF 2바이트(`§` 포함), U+0800~U+FFFF 3바이트(한글, 사설 영역 글리프), U+10000 이상 4바이트(대부분의 이모지). 색 코드가 든 제목을 접두사 검사(EXP-08)할 때 `§a` 하나가 3바이트라는 점을 넣어 N을 센다. 멀티바이트 글자 중간에서 자르면 그 글자는 그려지지 않는다.",
      "en": "UTF-8 byte counts: U+0000~U+007F 1 byte (letters, digits), U+0080~U+07FF 2 bytes (including `§`), U+0800~U+FFFF 3 bytes (Hangul, private-use glyphs), U+10000 and above 4 bytes (most emoji). When doing a prefix check (EXP-08) on a title with color codes, count N including that `§a` is 3 bytes. Cutting in the middle of a multibyte character makes that character not draw."
    },
    "detail": {
      "ko": "UTF-8 바이트 수: U+0000~U+007F 1바이트(영문·숫자), U+0080~U+07FF 2바이트(`§` 포함), U+0800~U+FFFF 3바이트(한글, 사설 영역 글리프), U+10000 이상 4바이트(대부분의 이모지). 색 코드가 든 제목을 접두사 검사(EXP-08)할 때 `§a` 하나가 3바이트라는 점을 넣어 N을 센다. 멀티바이트 글자 중간에서 자르면 그 글자는 그려지지 않는다.",
      "en": "UTF-8 byte counts: U+0000~U+007F 1 byte (letters and digits), U+0080~U+07FF 2 bytes (including `§`), U+0800~U+FFFF 3 bytes (Hangul, private-use-area glyphs), U+10000 and above 4 bytes (most emoji). When doing a prefix check (EXP-08) on a title with color codes, count N taking into account that one `§a` is 3 bytes. If you cut in the middle of a multibyte character, that character is not drawn."
    },
    "sources": "BW-intro, UTF-8 규격, 부록A C-35"
  },
  "EXP-25": {
    "id": "EXP-25",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-25",
    "proposal": false,
    "evidence": [
      "미검증",
      "충돌"
    ],
    "title": {
      "ko": "위키가 문서화한 서식 지정자: `'%.Ns'`(앞 N바이트), `'%N.Ms'`(앞 M바이트를 앞쪽 공백으로 N바이트까지 채움), `'%-N.Ms'`(뒤쪽 공백), `'%Ns'`·`'%-Ns'`(공백 채움만). C `printf`와 같은 의미다. 이 프로젝트 출처에서 동작이 확인된 것은 `'%.Ns'`뿐이므로, 고정 폭 필드의 패딩은 지금처럼 인코더(스크립트)가 하고 UI는 자르기만 한다. CN 평가기는 `%.Ns` 꼴만 인식하고 `'%5.3s'`에는 오른쪽 문자열을 통째로 돌려준다.",
      "en": "The format specifiers the wiki documents: `'%.Ns'` (first N bytes), `'%N.Ms'` (first M bytes padded with leading spaces up to N bytes), `'%-N.Ms'` (trailing spaces), `'%Ns'` and `'%-Ns'` (space padding only). The meaning is the same as C `printf`. Only `'%.Ns'` has confirmed behavior in this project's sources, so padding of fixed-width fields is done by the encoder (script) as now and the UI only cuts. The CN evaluator recognizes only the `%.Ns` form and returns the right string whole for `'%5.3s'`."
    },
    "detail": {
      "ko": "위키가 문서화한 서식 지정자: `'%.Ns'`(앞 N바이트), `'%N.Ms'`(앞 M바이트를 앞쪽 공백으로 N바이트까지 채움), `'%-N.Ms'`(뒤쪽 공백), `'%Ns'`·`'%-Ns'`(공백 채움만). C `printf`와 같은 의미다. 이 프로젝트 출처에서 동작이 확인된 것은 `'%.Ns'`뿐이므로, 고정 폭 필드의 패딩은 지금처럼 인코더(스크립트)가 하고 UI는 자르기만 한다. CN 평가기는 `%.Ns` 꼴만 인식하고 `'%5.3s'`에는 오른쪽 문자열을 통째로 돌려준다.",
      "en": "The format specifiers the wiki documents: `'%.Ns'` (first N bytes), `'%N.Ms'` (first M bytes padded with leading spaces to N bytes), `'%-N.Ms'` (trailing spaces), `'%Ns'` and `'%-Ns'` (space padding only). The same meaning as C `printf`. Only `'%.Ns'` was confirmed to work in this project's sources, so padding of fixed-width fields is done by the encoder (script) as now and the UI only cuts. The CN evaluator recognizes only the `%.Ns` form and returns the right-hand string whole for `'%5.3s'`."
    },
    "sources": "BW-intro \"Format Specifiers\", 부록A C-05, CN-run"
  },
  "EXP-26": {
    "id": "EXP-26",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-26",
    "proposal": false,
    "evidence": [
      "실측",
      "추론"
    ],
    "title": {
      "ko": "문자열 빼기로 숫자만 남긴 결과는 그대로 숫자로 쓸 수 있었다: 타이틀 `Count:3`에 `(#count - 'Count:' + 0)`을 `#collection_length`에 넣으면 3개, `Count:15`를 `#maximum_grid_items`에 넣으면 15개가 생겼다. 바인딩 원본 문자열에 `+ 0`을 하면 이어 붙여진다는 S12(`'35' + 0` → `'350'`)와 다르므로, 식의 중간 결과는 생김새로 타입이 다시 정해진다(EXP-15)는 사례로 본다. 확실히 하려면 `((#count - 'Count:') - 0)`으로 쓴다.",
      "en": "A result left with only digits by string subtraction could be used directly as a number: putting `(#count - 'Count:' + 0)` for the title `Count:3` into `#collection_length` created 3, and putting `Count:15` into `#maximum_grid_items` created 15. This differs from S12 (`'35' + 0` -> `'350'`), where `+ 0` on a binding source string concatenates, so treat it as a case where the type of an intermediate result of an expression is decided again by its look (EXP-15). To be sure, write `((#count - 'Count:') - 0)`."
    },
    "detail": {
      "ko": "문자열 빼기로 숫자만 남긴 결과는 그대로 숫자로 쓸 수 있었다: 타이틀 `Count:3`에 `(#count - 'Count:' + 0)`을 `#collection_length`에 넣으면 3개, `Count:15`를 `#maximum_grid_items`에 넣으면 15개가 생겼다. 바인딩 원본 문자열에 `+ 0`을 하면 이어 붙여진다는 S12(`'35' + 0` → `'350'`)와 다르므로, 식의 중간 결과는 생김새로 타입이 다시 정해진다(EXP-15)는 사례로 본다. 확실히 하려면 `((#count - 'Count:') - 0)`으로 쓴다.",
      "en": "A result left with only numbers after string subtraction could be used as a number as is: putting `(#count - 'Count:' + 0)` into `#collection_length` with the title `Count:3` created 3, and putting it into `#maximum_grid_items` with `Count:15` created 15. This differs from S12 saying that doing `+ 0` on the original bound string concatenates (`'35' + 0` -> `'350'`), so treat it as a case where the type of an intermediate result of an expression is decided again by appearance (EXP-15). To be sure, write `((#count - 'Count:') - 0)`."
    },
    "sources": "BW-dyn 스크린샷 2장, BC-S12"
  },
  "EXP-27": {
    "id": "EXP-27",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-27",
    "proposal": false,
    "evidence": [
      "코드",
      "실측"
    ],
    "title": {
      "ko": "앞자리가 있는 소수 리터럴은 정수다. `0.3`, `1.0`, `100.0`은 0, 1, 100이다. 실수 리터럴은 `.3`, `.01`처럼 점으로 시작한다. 정수끼리 나눗셈은 정수다. 비율은 `(#v * .01)`로 만든다.",
      "en": "A decimal literal with a leading digit is an integer. `0.3`, `1.0`, and `100.0` are 0, 1, and 100. A real literal starts with a dot like `.3` or `.01`. Division between integers is an integer. Make a ratio with `(#v * .01)`."
    },
    "detail": {
      "ko": "앞자리가 있는 소수 리터럴은 정수다. `0.3`, `1.0`, `100.0`은 0, 1, 100이다. 실수 리터럴은 `.3`, `.01`처럼 점으로 시작한다. 정수끼리 나눗셈은 정수다. 비율은 `(#v * .01)`로 만든다.",
      "en": "A decimal literal with a leading digit is an integer. `0.3`, `1.0` and `100.0` are 0, 1 and 100. A real literal starts with a dot like `.3` and `.01`. Division of integers is an integer. Make ratios with `(#v * .01)`."
    },
    "sources": "CN, CN-run, BC-S12 `* 0.3` → 0"
  },
  "EXP-28": {
    "id": "EXP-28",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-28",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "비교를 사슬로 쓰지 않는다. `(a < #v < b)`는 `((a < #v) < b)`라서 항상 참(또는 항상 거짓)이다. `((a < #v) and (#v < b))`로 쓴다.",
      "en": "Do not write comparisons as a chain. `(a < #v < b)` is `((a < #v) < b)`, so it is always true (or always false). Write `((a < #v) and (#v < b))`."
    },
    "detail": {
      "ko": "비교를 사슬로 쓰지 않는다. `(a < #v < b)`는 `((a < #v) < b)`라서 항상 참(또는 항상 거짓)이다. `((a < #v) and (#v < b))`로 쓴다.",
      "en": "Do not write comparisons as a chain. `(a < #v < b)` is `((a < #v) < b)` so it is always true (or always false). Write `((a < #v) and (#v < b))`."
    },
    "sources": "CN-run"
  },
  "EXP-29": {
    "id": "EXP-29",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-29",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "`and`와 `or`는 우선순위가 같고 왼쪽부터 계산한다. `a or b and c`는 `(a or b) and c`다. 섞을 때는 괄호를 쓴다.",
      "en": "`and` and `or` have the same precedence and are computed from the left. `a or b and c` is `(a or b) and c`. Use parentheses when mixing."
    },
    "detail": {
      "ko": "`and`와 `or`는 우선순위가 같고 왼쪽부터 계산한다. `a or b and c`는 `(a or b) and c`다. 섞을 때는 괄호를 쓴다.",
      "en": "`and` and `or` have the same precedence and are computed from the left. `a or b and c` is `(a or b) and c`. Use parentheses when mixing."
    },
    "sources": "CN 테스트 E12"
  },
  "EXP-30": {
    "id": "EXP-30",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-30",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "연산 결과 문자열은 다시 해석된다. 숫자처럼 시작하면 앞쪽 정수(`'3/17'` → 3, `'10 apples'` → 10), `yes`·`no`·`true`·`false`면 불리언, `#`로 시작하면 속성 이름이다. 그래서 `('%.3s' * #s)`로 자른 `'042'`는 곧바로 정수 42다.",
      "en": "A result string of an operation is interpreted again. If it starts like a number it is the leading integer (`'3/17'` -> 3, `'10 apples'` -> 10), `yes`, `no`, `true`, and `false` make a boolean, and starting with `#` makes a property name. So `'042'` cut with `('%.3s' * #s)` is immediately the integer 42."
    },
    "detail": {
      "ko": "연산 결과 문자열은 다시 해석된다. 숫자처럼 시작하면 앞쪽 정수(`'3/17'` → 3, `'10 apples'` → 10), `yes`·`no`·`true`·`false`면 불리언, `#`로 시작하면 속성 이름이다. 그래서 `('%.3s' * #s)`로 자른 `'042'`는 곧바로 정수 42다.",
      "en": "A result string of an operation is reinterpreted. If it starts like a number, the leading integer (`'3/17'` -> 3, `'10 apples'` -> 10), if `yes`, `no`, `true` or `false`, a boolean, and if it starts with `#`, a property name. So `'042'` cut with `('%.3s' * #s)` is immediately the integer 42."
    },
    "sources": "CN-run"
  },
  "EXP-31": {
    "id": "EXP-31",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-31",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "문자열 `` 숫자는 빈 문자열, 숫자 `` 문자열은 왼쪽 숫자다. `(#s * 1)`과 `(1 * #s)`는 숫자 변환이 아니다. 변환은 `(#s - 0)` 또는 `(0 + #s)`다. `(#s + 0)`은 뒤에 0을 붙인다.",
      "en": "String `` number is an empty string, and number `` string is the left number. `(#s * 1)` and `(1 * #s)` are not number conversions. The conversion is `(#s - 0)` or `(0 + #s)`. `(#s + 0)` appends a 0."
    },
    "detail": {
      "ko": "문자열 `` 숫자는 빈 문자열, 숫자 `` 문자열은 왼쪽 숫자다. `(#s * 1)`과 `(1 * #s)`는 숫자 변환이 아니다. 변환은 `(#s - 0)` 또는 `(0 + #s)`다. `(#s + 0)`은 뒤에 0을 붙인다.",
      "en": "string `` number is an empty string, and number `` string is the left number. `(#s * 1)` and `(1 * #s)` are not number conversions. The conversion is `(#s - 0)` or `(0 + #s)`. `(#s + 0)` appends a 0 at the end."
    },
    "sources": "CN-run, EXP-16과 같은 결론"
  },
  "EXP-32": {
    "id": "EXP-32",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-32",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "문자열 `/` 문자열은 출현 횟수다(`('a-b-a' / 'a')` = 2). 문자열 `/` 숫자는 항상 1이다. 0으로 나누면 왼쪽 값이 그대로 남는다.",
      "en": "String `/` string is an occurrence count (`('a-b-a' / 'a')` = 2). String `/` number is always 1. Dividing by 0 leaves the left value as is."
    },
    "detail": {
      "ko": "문자열 `/` 문자열은 출현 횟수다(`('a-b-a' / 'a')` = 2). 문자열 `/` 숫자는 항상 1이다. 0으로 나누면 왼쪽 값이 그대로 남는다.",
      "en": "string `/` string is the occurrence count (`('a-b-a' / 'a')` = 2). string `/` number is always 1. Dividing by 0 leaves the left value as it is."
    },
    "sources": "CN-run"
  },
  "EXP-33": {
    "id": "EXP-33",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-33",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "숫자 문자열에서 `- '0'`은 모든 `0`을 지운다(`'100'` → 1). 숫자로 바꿀 때는 따옴표 없는 `- 0`을 쓴다.",
      "en": "On a numeric string, `- '0'` erases every `0` (`'100'` -> 1). To convert to a number, use `- 0` without quotes."
    },
    "detail": {
      "ko": "숫자 문자열에서 `- '0'`은 모든 `0`을 지운다(`'100'` → 1). 숫자로 바꿀 때는 따옴표 없는 `- 0`을 쓴다.",
      "en": "On a numeric string, `- '0'` erases every `0` (`'100'` -> 1). To convert to a number, use `- 0` without quotes."
    },
    "sources": "CN-run"
  },
  "EXP-34": {
    "id": "EXP-34",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-34",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "문자열과 숫자를 `=`로 비교하면 둘 다 거짓값('' 와 0)일 때만 참이다. `('2' = 2)`는 거짓, `(true = 'true')`도 거짓이다. 비교 전에 한쪽 타입을 맞춘다.",
      "en": "Comparing a string and a number with `=` is true only when both are falsy ('' and 0). `('2' = 2)` is false, and `(true = 'true')` is also false. Match the type of one side before comparing."
    },
    "detail": {
      "ko": "문자열과 숫자를 `=`로 비교하면 둘 다 거짓값('' 와 0)일 때만 참이다. `('2' = 2)`는 거짓, `(true = 'true')`도 거짓이다. 비교 전에 한쪽 타입을 맞춘다.",
      "en": "Comparing a string and a number with `=` is true only when both are falsy values ('' and 0). `('2' = 2)` is false and `(true = 'true')` is also false. Match the type of one side before comparing."
    },
    "sources": "CN 테스트 E15"
  },
  "EXP-35": {
    "id": "EXP-35",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-35",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "괄호 묶음의 결과가 `'#이름'` 문자열이면 그 컨트롤 주머니의 값으로 바뀐다. 그래서 `(('#route_' + #id) = 'x')`처럼 사전 조회 결과를 같은 식 안에서 비교할 수 있다.",
      "en": "If the result of a parenthesized group is a `'#name'` string, it is replaced by the value in that control's bag. So a dictionary lookup result can be compared in the same expression, like `(('#route_' + #id) = 'x')`."
    },
    "detail": {
      "ko": "괄호 묶음의 결과가 `'#이름'` 문자열이면 그 컨트롤 주머니의 값으로 바뀐다. 그래서 `(('#route_' + #id) = 'x')`처럼 사전 조회 결과를 같은 식 안에서 비교할 수 있다.",
      "en": "If the result of a parenthesized group is a `'#name'` string, it is replaced by the value in that control's bag. So a dictionary lookup result can be compared within the same expression, as in `(('#route_' + #id) = 'x')`."
    },
    "sources": "CN-run, COL-23 보강"
  },
  "EXP-36": {
    "id": "EXP-36",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-36",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "토큰은 공백, 괄호, `$`, `* + - / < = >`에서만 끊긴다. 속성 이름에 `-`를 쓰면 뺄셈이 되므로 `_`를 쓴다. `:`, `.`은 이름에 써도 된다.",
      "en": "Tokens break only at spaces, parentheses, `$`, and `* + - / < = >`. Using `-` in a property name makes it subtraction, so use `_`. `:` and `.` may be used in names."
    },
    "detail": {
      "ko": "토큰은 공백, 괄호, `$`, `* + - / < = >`에서만 끊긴다. 속성 이름에 `-`를 쓰면 뺄셈이 되므로 `_`를 쓴다. `:`, `.`은 이름에 써도 된다.",
      "en": "Tokens break only at spaces, parentheses, `$` and `* + - / < = >`. Using `-` in a property name makes it subtraction, so use `_`. `:` and `.` may be used in names."
    },
    "sources": "CN 테스트 E05"
  },
  "EXP-37": {
    "id": "EXP-37",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-37",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "문자열 단항 `-`는 0이다(`(-#s)` → 0). 단항 `-`, `not`은 바로 뒤 피연산자에만 붙으므로 `(not #a = #b)`는 `((not #a) = #b)`다.",
      "en": "String unary `-` is 0 (`(-#s)` -> 0). Unary `-` and `not` attach only to the operand right after, so `(not #a = #b)` is `((not #a) = #b)`."
    },
    "detail": {
      "ko": "문자열 단항 `-`는 0이다(`(-#s)` → 0). 단항 `-`, `not`은 바로 뒤 피연산자에만 붙으므로 `(not #a = #b)`는 `((not #a) = #b)`다.",
      "en": "Unary `-` on a string is 0 (`(-#s)` -> 0). Unary `-` and `not` attach only to the operand right after, so `(not #a = #b)` is `((not #a) = #b)`."
    },
    "sources": "CN-run, CN 테스트 E08"
  },
  "EXP-38": {
    "id": "EXP-38",
    "category": "EXP",
    "page": "json-ui/expressions",
    "anchor": "exp-38",
    "proposal": false,
    "evidence": [
      "코드",
      "추론"
    ],
    "title": {
      "ko": "나머지는 `%` 대신 정수 나눗셈으로 만든다: `(a - ((a / b) * b))`.",
      "en": "Make remainders with integer division instead of `%`: `(a - ((a / b) * b))`."
    },
    "detail": {
      "ko": "나머지는 `%` 대신 정수 나눗셈으로 만든다: `(a - ((a / b) * b))`. 두 피연산자가 정수일 때만 맞으므로 문자열 바인딩은 먼저 `(#v - 0)`으로 바꾼다(문자열 `/` 숫자는 1, EXP-32). 계산은 보조 view 바인딩 하나에 담아 재사용한다.",
      "en": "Make remainders with integer division instead of `%`: `(a - ((a / b) * b))`. It is right only when both operands are integers, so first convert string bindings with `(#v - 0)` (string `/` number is 1, EXP-32). Put the computation in one auxiliary view binding and reuse it."
    },
    "sources": "ASJ 3.1·4.1, CN EXP-18"
  },
  "EXP-39": {
    "id": "EXP-39",
    "category": "EXP",
    "page": "json-ui/expressions",
    "anchor": "exp-39",
    "proposal": false,
    "evidence": [
      "코드",
      "추론"
    ],
    "title": {
      "ko": "정수에서 비트 i를 꺼내려면 `((#v / 2^i) - ((#v / 2^(i+1)) * 2))`(2의 거듭제곱은 숫자로 미리 계산해 적는다)를 비트마다 보조 바인딩으로 둔다.",
      "en": "To take bit i out of an integer, put `((#v / 2^i) - ((#v / 2^(i+1)) * 2))` (compute the power of two as a number in advance) in an auxiliary binding per bit."
    },
    "detail": {
      "ko": "정수에서 비트 i를 꺼내려면 `((#v / 2^i) - ((#v / 2^(i+1)) * 2))`(2의 거듭제곱은 숫자로 미리 계산해 적는다)를 비트마다 보조 바인딩으로 둔다. PAT-06의 비트 토큰을 문자열 대신 숫자 하나로 보낼 수 있다.",
      "en": "To take bit i out of an integer, put `((#v / 2^i) - ((#v / 2^(i+1)) * 2))` (compute the power of two as a number in advance) in an auxiliary binding per bit. It lets the bit tokens of PAT-06 be sent as one number instead of a string."
    },
    "sources": "ASJ 4.1"
  },
  "EXP-40": {
    "id": "EXP-40",
    "category": "EXP",
    "page": "json-ui/expressions",
    "anchor": "exp-40",
    "proposal": false,
    "evidence": [
      "코드",
      "추론"
    ],
    "title": {
      "ko": "길이를 모르는 두 런타임 문자열의 시작 검사: 본문에 나오지 않는 고유 접두 `P`를 둘 다에 붙여 보조 바인딩 `#a = (P + #s)`, `#b = (P + #p)`를 만들고 `(not ((#a - #b) = #a))`로 판정한다.",
      "en": "A start check for two runtime strings of unknown length: attach a unique prefix `P` that does not appear in the body to both to make auxiliary bindings `#a = (P + #s)` and `#b = (P + #p)`, and decide "
    },
    "detail": {
      "ko": "길이를 모르는 두 런타임 문자열의 시작 검사: 본문에 나오지 않는 고유 접두 `P`를 둘 다에 붙여 보조 바인딩 `#a = (P + #s)`, `#b = (P + #p)`를 만들고 `(not ((#a - #b) = #a))`로 판정한다. 앞부분을 잘라 낼 때도 `P`를 붙인 문자열에서 자르면 같은 머리가 뒤에 있어도 지워지지 않는다(EXP-12 보완).",
      "en": "A start check for two runtime strings of unknown length: attach a unique prefix `P` that does not appear in the body to both to make auxiliary bindings `#a = (P + #s)` and `#b = (P + #p)`, and decide with `(not ((#a - #b) = #a))`. When cutting off the front part too, cutting from the string with `P` attached means the same head is not erased even if it appears later (a supplement to EXP-12)."
    },
    "sources": "ASJ 3.2·4.2"
  },
  "EXP-41": {
    "id": "EXP-41",
    "category": "EXP",
    "page": "json-ui/expressions",
    "anchor": "exp-41",
    "proposal": false,
    "evidence": [
      "코드",
      "추론"
    ],
    "title": {
      "ko": "숫자 둘 중 하나를 조건으로 고를 때는 `((#c * #a) + ((not #c) * #b))`, 부호는 `((-1 + ((#x > 0) * 2)) * #x)`로 절댓값을 만든다.",
      "en": "To choose one of two numbers by a condition, use `((#c * #a) + ((not #c) * #b))`, and make an absolute value with the sign `((-1 + ((#x > 0) * 2)) * #x)`."
    },
    "detail": {
      "ko": "숫자 둘 중 하나를 조건으로 고를 때는 `((#c * #a) + ((not #c) * #b))`, 부호는 `((-1 + ((#x > 0) * 2)) * #x)`로 절댓값을 만든다. 불리언 산술(EXP-19)에 기대며 문자열 피연산자에는 쓰지 않는다(EXP-31).",
      "en": "To choose one of two numbers by a condition, use `((#c * #a) + ((not #c) * #b))`, and make an absolute value with the sign `((-1 + ((#x > 0) * 2)) * #x)`. It relies on boolean arithmetic (EXP-19) and is not used with string operands (EXP-31)."
    },
    "sources": "ASJ 3.2"
  },
  "EXP-43": {
    "id": "EXP-43",
    "category": "EXP",
    "page": "json-ui/expressions",
    "anchor": "exp-43",
    "proposal": false,
    "evidence": [
      "작동팩",
      "코드",
      "미검증"
    ],
    "title": {
      "ko": "서식 문자열은 식 안에서 이어 붙여 만들 수 있다: `(('%.' + $to + 's') * #t)`.",
      "en": "A format string can be built inside an expression by concatenation: `(('%.' + $to + 's') * #t)`."
    },
    "detail": {
      "ko": "서식 문자열은 식 안에서 이어 붙여 만들 수 있다: `(('%.' + $to + 's') * #t)`. 바이트 구간 `[from, to)`는 `((('%.' + $to + 's') * #t) - (('%.' + $from + 's') * #t))`로 꺼낸다. 앞 조각이 뒤에 또 나오면 함께 지워지므로(EXP-12) 머리는 고유하게 만든다.",
      "en": "A format string can be built inside an expression by concatenation: `(('%.' + $to + 's') * #t)`. The byte range `[from, to)` is taken out with `((('%.' + $to + 's') * #t) - (('%.' + $from + 's') * #t))`. If the front piece appears again later it is erased together (EXP-12), so make the head unique."
    },
    "sources": "SLB 5장, ASJ 4.3"
  },
  "EXP-44": {
    "id": "EXP-44",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-44",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "잘라낸 앞부분이 숫자로 시작하면 숫자로 읽힌다(EXP-30, 게임에서도 같다): 본문 `042§r§r§r…`에서 `(#form_text - ('%.12s' * #form_text))`는 본문을 지우지 못하고 깨졌다. 숫자 필드는 글자 뒤에 둔다(`§r§r§r042`).",
      "en": "If the cut-out front part starts with a number it is read as a number (EXP-30, the same in game): in the body `042§r§r§r...`, `(#form_text - ('%.12s' * #form_text))` could not erase the body and broke. Put the numeric field after letters (`§r§r§r042`)."
    },
    "detail": {
      "ko": "잘라낸 앞부분이 숫자로 시작하면 숫자로 읽힌다(EXP-30, 게임에서도 같다): 본문 `042§r§r§r…`에서 `(#form_text - ('%.12s' * #form_text))`는 본문을 지우지 못하고 깨졌다. 숫자 필드는 글자 뒤에 둔다(`§r§r§r042`).",
      "en": "If the cut-out front part starts with a digit, it is read as a number (EXP-30, the same in game): on the body `042§r§r§r…`, `(#form_text - ('%.12s' * #form_text))` could not erase the body and broke. Put numeric fields after letters (`§r§r§r042`)."
    },
    "sources": "DF"
  },
  "EXP-45": {
    "id": "EXP-45",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-45",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "서버가 본문 앞 12바이트에 칸 수를 `§r§r§r` + 세 자리 숫자로 쓰면 `((('%.12s' * #form_text) - '§r') - 0)` 한 식으로 숫자를 꺼내 `#maximum_grid_items`에 넣을 수 있다. 숫자 글자 하나(`'3'`)를 글자와 `=`로 비교하면 맞지 않았고(EXP-34), 글자 a~f로 바꾸면 맞았다. 본문 라벨은 `(#form_text - ('%.12s' * #form_text))`로 이 12바이트를 뺀다.",
      "en": "If the server writes the cell count into the first 12 bytes of the body as `§r§r§r` + a three-digit number, one expression `((('%.12s' * #form_text) - '§r') - 0)` can take out the number and put it into `#maximum_grid_items`. Comparing a single digit character (`'3'`) with a letter using `=` did not match (EXP-34), and changing to letters a~f matched. The body label removes these 12 bytes with `(#form_text - ('%.12s' * #form_text))`."
    },
    "detail": {
      "ko": "서버가 본문 앞 12바이트에 칸 수를 `§r§r§r` + 세 자리 숫자로 쓰면 `((('%.12s' * #form_text) - '§r') - 0)` 한 식으로 숫자를 꺼내 `#maximum_grid_items`에 넣을 수 있다. 숫자 글자 하나(`'3'`)를 글자와 `=`로 비교하면 맞지 않았고(EXP-34), 글자 a~f로 바꾸면 맞았다. 본문 라벨은 `(#form_text - ('%.12s' * #form_text))`로 이 12바이트를 뺀다.",
      "en": "If the server writes the cell count in the first 12 bytes of the body as `§r§r§r` + a three-digit number, the number can be taken out with the single expression `((('%.12s' * #form_text) - '§r') - 0)` and put into `#maximum_grid_items`. Comparing a single digit character (`'3'`) with a character using `=` did not match (EXP-34), and changing it to letters a~f matched. The body label subtracts these 12 bytes with `(#form_text - ('%.12s' * #form_text))`."
    },
    "sources": "DF"
  },
  "EXP-46": {
    "id": "EXP-46",
    "category": "EXP",
    "page": "reference/rules",
    "anchor": "exp-46",
    "proposal": false,
    "evidence": [
      "실측",
      "추론"
    ],
    "title": {
      "ko": "`%`가 든 식 `(#t - (#t % 65536))`을 `#item_id_aux`에 오래 두었는데 아이템 아이콘은 그려졌고 릴리스 클라이언트의 콘텐츠 로그에 `Invalid expression`도 남지 않았다(EXP-02의 assert는 개발 빌드 기록). `(#t - 0)`으로 바꾼 뒤 폼이 빨라졌다는 체감 보고가 있었지만 재지는 않았다.",
      "en": "The expression with `%`, `(#t - (#t % 65536))`, was left in `#item_id_aux` for a long time, yet item icons were drawn and no `Invalid expression` was left in the content log of the release client (the assert of EXP-02 is a development build record). There was a subjective report that the form got faster after changing to `(#t - 0)`, but it was not measured again."
    },
    "detail": {
      "ko": "`%`가 든 식 `(#t - (#t % 65536))`을 `#item_id_aux`에 오래 두었는데 아이템 아이콘은 그려졌고 릴리스 클라이언트의 콘텐츠 로그에 `Invalid expression`도 남지 않았다(EXP-02의 assert는 개발 빌드 기록). `(#t - 0)`으로 바꾼 뒤 폼이 빨라졌다는 체감 보고가 있었지만 재지는 않았다.",
      "en": "An expression containing `%`, `(#t - (#t % 65536))`, was left in `#item_id_aux` for a long time, yet item icons were drawn and no `Invalid expression` was left in the content log of the release client (the assert of EXP-02 is a development build record). There was an impression report that the form became faster after changing to `(#t - 0)` but it was not re-measured."
    },
    "sources": "DF"
  },
  "FILE-01": {
    "id": "FILE-01",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-01",
    "proposal": false,
    "evidence": [
      "바닐라",
      "작동팩"
    ],
    "title": {
      "ko": "새 UI 파일은 `ui/_ui_defs.json`의 `ui_defs` 배열에 경로를 등록해야 로드된다. 바닐라와 같은 경로의 파일(`ui/hud_screen.json` 등)은 바닐라가 이미 등록했으므로 다시 등록하지 않는다.",
      "en": "A new UI file loads only if its path is registered in the `ui_defs` array of `ui/_ui_defs.json`. Files at the same path as vanilla (`ui/hud_screen.json` and so on) are already registered by vanilla, so they are not registered again."
    },
    "detail": {
      "ko": "새 UI 파일은 `ui/_ui_defs.json`의 `ui_defs` 배열에 경로를 등록해야 로드된다. 바닐라와 같은 경로의 파일(`ui/hud_screen.json` 등)은 바닐라가 이미 등록했으므로 다시 등록하지 않는다.",
      "en": "A new UI file is loaded only when its path is registered in the `ui_defs` array of `ui/_ui_defs.json`. Files at the same path as vanilla (`ui/hud_screen.json`, etc.) are already registered by vanilla, so they are not registered again."
    },
    "sources": "VN _ui_defs.json, AP-samples _ui_defs.json, BA, BW-intro"
  },
  "FILE-02": {
    "id": "FILE-02",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-02",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "등록한 파일의 확장자는 `.json`이 아니어도 로드된다(예: `ui/adv/_screen.r4ui`).",
      "en": "A registered file loads even if its extension is not `.json` (for example `ui/adv/_screen.r4ui`)."
    },
    "detail": {
      "ko": "등록한 파일의 확장자는 `.json`이 아니어도 로드된다(예: `ui/adv/_screen.r4ui`).",
      "en": "A registered file is loaded even if its extension is not `.json` (for example `ui/adv/_screen.r4ui`)."
    },
    "sources": "AP 4.9, BW-intro"
  },
  "FILE-03": {
    "id": "FILE-03",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-03",
    "proposal": false,
    "evidence": [
      "바닐라",
      "작동팩"
    ],
    "title": {
      "ko": "UI 파일은 `//`, `/* */` 주석을 허용하는 JSON이다.",
      "en": "A UI file is JSON that allows `//` and `/* */` comments."
    },
    "detail": {
      "ko": "UI 파일은 `//`, `/* */` 주석을 허용하는 JSON이다.",
      "en": "A UI file is JSON that allows `//` and `/* */` comments."
    },
    "sources": "VN 모든 파일 머리 주석, AP-samples"
  },
  "FILE-04": {
    "id": "FILE-04",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-04",
    "proposal": false,
    "evidence": [
      "바닐라",
      "작동팩"
    ],
    "title": {
      "ko": "`ui/_global_variables.json`은 등록 없이 자동으로 로드되고, 여기 정의한 `$변수`는 모든 파일에서 쓸 수 있다. 바닐라도 `_ui_defs.json`에 이 파일을 등록하지 않는다.",
      "en": "`ui/_global_variables.json` loads automatically without registration, and the `$variable`s defined in it can be used in all files. Vanilla also does not register this file in `_ui_defs.json`."
    },
    "detail": {
      "ko": "`ui/_global_variables.json`은 등록 없이 자동으로 로드되고, 여기 정의한 `$변수`는 모든 파일에서 쓸 수 있다. 바닐라도 `_ui_defs.json`에 이 파일을 등록하지 않는다.",
      "en": "`ui/_global_variables.json` is loaded automatically without registration, and `$variables` defined there can be used in all files. Vanilla also does not register this file in `_ui_defs.json`."
    },
    "sources": "VN _ui_defs.json·_global_variables.json, AP, MJ 5장, BW-intro"
  },
  "FILE-05": {
    "id": "FILE-05",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-05",
    "proposal": false,
    "evidence": [
      "작동팩",
      "추론"
    ],
    "title": {
      "ko": "새 파일은 `\"namespace\": \"이름\"`을 하나 가진다. 바닐라와 같은 경로의 병합용 파일은 namespace를 생략해도 바닐라의 namespace로 동작한다. 검사 도구가 이를 오류로 잡는 것은 오탐이다.",
      "en": "A new file has one `\"namespace\": \"name\"`. A merge file at the same path as vanilla works with the vanilla namespace even if it omits the namespace. A checking tool that flags this as an error is giving a false positive."
    },
    "detail": {
      "ko": "새 파일은 `\"namespace\": \"이름\"`을 하나 가진다. 바닐라와 같은 경로의 병합용 파일은 namespace를 생략해도 바닐라의 namespace로 동작한다. 검사 도구가 이를 오류로 잡는 것은 오탐이다.",
      "en": "A new file has one `\"namespace\": \"name\"`. A merging file at the same path as vanilla works with vanilla's namespace even if the namespace is omitted. A checking tool flagging this as an error is a false positive."
    },
    "sources": "AP-samples hud_screen.json, MJ 5장"
  },
  "FILE-06": {
    "id": "FILE-06",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-06",
    "proposal": false,
    "evidence": [
      "바닐라"
    ],
    "title": {
      "ko": "`\"이름@namespace.기반\": { … }`은 `기반`을 상속해 새 정의를 만들고 속성을 덮어쓴다. 같은 파일 안의 정의는 namespace 없이 `@기반`으로도 참조한다.",
      "en": "`\"name@namespace.base\": { ... }` inherits `base` to make a new definition and overrides properties. A definition in the same file can also be referenced as `@base` without a namespace."
    },
    "detail": {
      "ko": "`\"이름@namespace.기반\": { … }`은 `기반`을 상속해 새 정의를 만들고 속성을 덮어쓴다. 같은 파일 안의 정의는 namespace 없이 `@기반`으로도 참조한다.",
      "en": "`\"name@namespace.base\": { … }` inherits `base` to make a new definition and overrides properties. A definition in the same file can also be referenced as `@base` without a namespace."
    },
    "sources": "VN 전반"
  },
  "FILE-07": {
    "id": "FILE-07",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-07",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "다른 파일의 정의는 `namespace.이름`으로 참조한다. 정의 위치는 그 정의를 소유한 파일로 정해지므로, 같은 namespace라도 다른 파일에 같은 이름을 쓰면 다른 정의로 취급된다.",
      "en": "A definition in another file is referenced as `namespace.name`. The location of a definition is decided by the file that owns it, so even with the same namespace, the same name in a different file is treated as a different definition."
    },
    "detail": {
      "ko": "다른 파일의 정의는 `namespace.이름`으로 참조한다. 정의 위치는 그 정의를 소유한 파일로 정해지므로, 같은 namespace라도 다른 파일에 같은 이름을 쓰면 다른 정의로 취급된다.",
      "en": "A definition in another file is referenced as `namespace.name`. The location of a definition is decided by the file that owns it, so writing the same name in another file is treated as a different definition even in the same namespace."
    },
    "sources": "BC-facts"
  },
  "FILE-08": {
    "id": "FILE-08",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-08",
    "proposal": false,
    "evidence": [
      "바닐라",
      "실측"
    ],
    "title": {
      "ko": "컨트롤 배열 안의 항목 `{ \"자식이름@ns.정의\": { …덮어쓸 속성… } }`이 인스턴스화 지점이다. `collection_index`처럼 인스턴스화 지점에서만 받는 속성이 있다(6장).",
      "en": "An entry `{ \"childname@ns.definition\": { ...properties to override... } }` in a control array is the instantiation point. Some properties, such as `collection_index`, are accepted only at the instantiation point (chapter 6)."
    },
    "detail": {
      "ko": "컨트롤 배열 안의 항목 이 인스턴스화 지점이다. `collection_index`처럼 인스턴스화 지점에서만 받는 속성이 있다(컬렉션과 팩토리 장). `{바닐라, 실측}`",
      "en": "An item inside a control array is the instantiation point. There are properties received only at the instantiation point, like `collection_index` (collections and factories chapter). `{vanilla, measured}`"
    },
    "sources": "VN, BC-facts"
  },
  "FILE-09": {
    "id": "FILE-09",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-09",
    "proposal": false,
    "evidence": [
      "바닐라"
    ],
    "title": {
      "ko": "`$이름`이 변수다. 정의 안에 `\"$x\": 값`으로 두거나 참조 지점에서 넘긴다. `\"$x|default\": 값`은 위(참조 지점)에서 넘기지 않았을 때만 쓰는 기본값이다.",
      "en": "`$name` is a variable. Put it in a definition as `\"$x\": value` or pass it at the reference point. `\"$x|default\": value` is a default used only when the value was not passed from above (the reference point)."
    },
    "detail": {
      "ko": "`$이름`이 변수다. 정의 안에 `\"$x\": 값`으로 두거나 참조 지점에서 넘긴다. `\"$x|default\": 값`은 위(참조 지점)에서 넘기지 않았을 때만 쓰는 기본값이다.",
      "en": "`$name` is a variable. Put it inside a definition as `\"$x\": value` or pass it at the reference point. `\"$x|default\": value` is the default used only when it was not passed from above (the reference point)."
    },
    "sources": "VN `|default` 3,419회"
  },
  "FILE-10": {
    "id": "FILE-10",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-10",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "일반 속성의 변수 치환은 값 전체가 변수일 때만 된다. `\"text\": \"$title\"`은 되고 `\"text\": \"제목: $title\"`은 `$`가 그대로 찍힌다. 조합이 필요하면 변수 식을 쓴다(FILE-11).",
      "en": "Variable substitution in an ordinary property happens only when the whole value is a variable. `\"text\": \"$title\"` works, but `\"text\": \"Title: $title\"` prints the `$` as is. If a combination is needed, use a variable expression (FILE-11)."
    },
    "detail": {
      "ko": "일반 속성의 변수 치환은 값 전체가 변수일 때만 된다. `\"text\": \"$title\"`은 되고 `\"text\": \"제목: $title\"`은 `$`가 그대로 찍힌다. 조합이 필요하면 변수 식을 쓴다(FILE-11).",
      "en": "Variable substitution in an ordinary property works only when the whole value is a variable. `\"text\": \"$title\"` works, but in `\"text\": \"Title: $title\"` the `$` is printed as is. If you need a combination, use a variable expression (FILE-11)."
    },
    "sources": "BC-facts"
  },
  "FILE-11": {
    "id": "FILE-11",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-11",
    "proposal": false,
    "evidence": [
      "바닐라",
      "작동팩"
    ],
    "title": {
      "ko": "변수 값에는 괄호 식을 쓸 수 있다. 바닐라는 이것으로 바인딩 이름, 텍스처 경로, 컨트롤 이름을 조립한다. 예: `\"$toggle_state_binding_name\": \"('#' + $dropdown_name)\"`.",
      "en": "A variable value can be a parenthesized expression. Vanilla uses this to assemble binding names, texture paths, and control names. Example: `\"$toggle_state_binding_name\": \"('#' + $dropdown_name)\"`."
    },
    "detail": {
      "ko": "변수 값에는 괄호 식을 쓸 수 있다. 바닐라는 이것으로 바인딩 이름, 텍스처 경로, 컨트롤 이름을 조립한다. 예: `\"$toggle_state_binding_name\": \"('#' + $dropdown_name)\"`.",
      "en": "A variable value can be a parenthesized expression. Vanilla assembles binding names, texture paths and control names with it. Example: `\"$toggle_state_binding_name\": \"('#' + $dropdown_name)\"`."
    },
    "sources": "VN ui_common.json:1126, AP 4.3·4.9"
  },
  "FILE-12": {
    "id": "FILE-12",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-12",
    "proposal": false,
    "evidence": [
      "바닐라",
      "실측"
    ],
    "title": {
      "ko": "엔진이 미리 넣어 주는 변수가 있다. 예: `$education_edition`, `$is_ps4`, `$pre_release`(플랫폼·빌드), 상자 화면의 `$container_title`, HUD 팩토리가 만드는 컨트롤의 `$actionbar_text`·`$title_fade_in_time`.",
      "en": "Some variables are supplied in advance by the engine. Examples: `$education_edition`, `$is_ps4`, `$pre_release` (platform and build), `$container_title` on chest screens, and `$actionbar_text` and `$title_fade_in_time` on controls created by HUD factories."
    },
    "detail": {
      "ko": "엔진이 미리 넣어 주는 변수가 있다. 예: `$education_edition`, `$is_ps4`, `$pre_release`(플랫폼·빌드), 상자 화면의 `$container_title`, HUD 팩토리가 만드는 컨트롤의 `$actionbar_text`·`$title_fade_in_time`.",
      "en": "There are variables the engine puts in beforehand. Examples: `$education_edition`, `$is_ps4`, `$pre_release` (platform and build), `$container_title` of the chest screen, and `$actionbar_text` and `$title_fade_in_time` of controls created by HUD factories."
    },
    "sources": "VN ignored 사용 상위 값, VN hud_screen.json:2158·2170, BC-facts"
  },
  "FILE-13": {
    "id": "FILE-13",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-13",
    "proposal": false,
    "evidence": [
      "바닐라",
      "작동팩"
    ],
    "title": {
      "ko": "`variables` 배열의 각 항목은 `\"requires\": \"<$변수 식>\"`이 참일 때 그 항목의 변수를 적용한다. 배열 대신 단일 객체로 써도 된다.",
      "en": "Each entry of the `variables` array applies that entry's variables when `\"requires\": \"<$variable expression>\"` is true. Instead of an array it can also be written as a single object."
    },
    "detail": {
      "ko": "`variables` 배열의 각 항목은 `\"requires\": \"<$변수 식>\"`이 참일 때 그 항목의 변수를 적용한다. 배열 대신 단일 객체로 써도 된다.",
      "en": "Each item of the `variables` array applies that item's variables when `\"requires\": \"<$variable expression>\"` is true. You may also write a single object instead of an array."
    },
    "sources": "VN 배열 274회·객체 4회 예 realms_settings_screen.json:2557, AP 4.6, BW-doc"
  },
  "FILE-14": {
    "id": "FILE-14",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-14",
    "proposal": false,
    "evidence": [
      "바닐라",
      "작동팩"
    ],
    "title": {
      "ko": "컨트롤 배열도 변수로 넘길 수 있다: `\"controls\": \"$target_control\"`. 템플릿에 \"자식 슬롯\"을 만드는 방법이다.",
      "en": "A control array can also be passed as a variable: `\"controls\": \"$target_control\"`. It is a way to make a \"child slot\" in a template."
    },
    "detail": {
      "ko": "컨트롤 배열도 변수로 넘길 수 있다: `\"controls\": \"$target_control\"`. 템플릿에 \"자식 슬롯\"을 만드는 방법이다.",
      "en": "A control array can also be passed as a variable: `\"controls\": \"$target_control\"`. It is a way to make a \"child slot\" in a template."
    },
    "sources": "VN 14회 예 persona_cast_character_screen.json:14, AP 4.2, BW-intro"
  },
  "FILE-15": {
    "id": "FILE-15",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-15",
    "proposal": false,
    "evidence": [
      "바닐라",
      "작동팩",
      "충돌"
    ],
    "title": {
      "ko": "`\"자식@$변수\"`로 변수가 가리키는 정의를 마운트할 수 있다. 바닐라는 참조 지점에서 넘긴 변수로도 413회 쓴다(예: `content@$button_content`). 단 bedrock-core 상자 라우터의 한 구성(`$gate|default`를 선언한 호스트를 다른 `$gate`로 두 번 참조)에서는 아무것도 안 그려진 실측이 있다. 마운트가 안 되면 정의 이름을 직접 쓴다.",
      "en": "`\"child@$variable\"` can mount the definition the variable points to. Vanilla also uses it 413 times with variables passed at the reference point (for example `content@$button_content`). However, in one configuration of the bedrock-core chest router (referencing a host that declares `$gate|default` twice with different `$gate`), there is a measurement where nothing was drawn. If mounting fails, write the definition name directly."
    },
    "detail": {
      "ko": "`\"자식@$변수\"`로 변수가 가리키는 정의를 마운트할 수 있다. 바닐라는 참조 지점에서 넘긴 변수로도 413회 쓴다(예: `content@$button_content`). 단 bedrock-core 상자 라우터의 한 구성(`$gate|default`를 선언한 호스트를 다른 `$gate`로 두 번 참조)에서는 아무것도 안 그려진 실측이 있다. 마운트가 안 되면 정의 이름을 직접 쓴다.",
      "en": "With `\"child@$variable\"` you can mount the definition the variable points to. Vanilla also uses it 413 times with a variable passed from the reference point (for example `content@$button_content`). But there is a measurement that nothing was drawn in one setup of the bedrock-core chest router (referencing a host that declares `$gate|default` twice with different `$gate`). If mounting fails, write the definition name directly."
    },
    "sources": "VN 413회, AP 4.8, BC-facts, 부록A C-03, BW-intro"
  },
  "FILE-16": {
    "id": "FILE-16",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-16",
    "proposal": false,
    "evidence": [
      "바닐라",
      "실측",
      "코드"
    ],
    "title": {
      "ko": "`\"ignored\": \"<$변수 식>\"`이 참이면 그 컨트롤은 아예 생성되지 않는다(바인딩과 레이아웃 비용도 없음). 식에는 `$변수`만 쓰고 `#바인딩`은 쓸 수 없다. `ignored`는 그 컨트롤 자신의 `$` 선언이 아니라 바깥(부모) 스코프에서 평가된다(FILE-34).",
      "en": "If `\"ignored\": \"<$variable expression>\"` is true, that control is not created at all (no binding or layout cost either). Use only `$variable`s in the expression, and `#binding`s cannot be used. `ignored` is evaluated in the outer (parent) scope, not in the control's own `$` declarations (FILE-34)."
    },
    "detail": {
      "ko": "`\"ignored\": \"<$변수 식>\"`이 참이면 그 컨트롤은 아예 생성되지 않는다(바인딩과 레이아웃 비용도 없음). 식에는 `$변수`만 쓰고 `#바인딩`은 쓸 수 없다. `ignored`는 그 컨트롤 자신의 `$` 선언이 아니라 바깥(부모) 스코프에서 평가된다(FILE-34).",
      "en": "If `\"ignored\": \"<$variable expression>\"` is true, that control is not created at all (there is no binding or layout cost either). Use only `$variables` in the expression, and `#binding`s cannot be used. `ignored` is evaluated in the outer (parent) scope, not in that control's own `$` declarations (FILE-34)."
    },
    "sources": "VN 958회, BC-S8, BW-best, NB-10"
  },
  "FILE-17": {
    "id": "FILE-17",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-17",
    "proposal": false,
    "evidence": [
      "작동팩",
      "실측",
      "코드",
      "추론"
    ],
    "title": {
      "ko": "`ignored`는 컨트롤이 생성되는 시점에 한 번 평가된다. 그래서 런타임 데이터로 생성을 가르려면 데이터가 변수로 들어오는 경로가 필요하다. HUD 타이틀 팩토리가 만든 컨트롤은 `$title_text`로 타이틀 문자열을 받으므로 `ignored`로 거를 수 있다. 일반 서버 폼 화면 안에는 그런 경로가 없어 생성 단위 분기에 팩토리 길이를 쓴다(6장). 팩토리가 주는 변수는 만들어진 컨트롤의 바깥 스코프로 들어가므로 그 컨트롤의 최상위 `ignored`가 읽을 수 있다(FILE-34).",
      "en": "`ignored` is evaluated once, at the time the control is created. So splitting creation by runtime data needs a path for the data to enter as a variable. A control created by the HUD title factory receives the title string as `$title_text`, so it can be filtered with `ignored`. Ordinary server form screens have no such path, so factory length is used for per-unit branching (chapter 6). A variable the factory supplies enters the outer scope of the created control, so the top-level `ignored` of that control can read it (FILE-34)."
    },
    "detail": {
      "ko": "`ignored`는 컨트롤이 생성되는 시점에 한 번 평가된다. 그래서 런타임 데이터로 생성을 가르려면 데이터가 변수로 들어오는 경로가 필요하다. HUD 타이틀 팩토리가 만든 컨트롤은 `$title_text`로 타이틀 문자열을 받으므로 `ignored`로 거를 수 있다. 일반 서버 폼 화면 안에는 그런 경로가 없어 생성 단위 분기에 팩토리 길이를 쓴다(컬렉션과 팩토리 장). 팩토리가 주는 변수는 만들어진 컨트롤의 바깥 스코프로 들어가므로 그 컨트롤의 최상위 `ignored`가 읽을 수 있다(FILE-34).",
      "en": "`ignored` is evaluated once at the time the control is created. So to split creation by runtime data, a route for the data to come in as a variable is needed. A control created by the HUD title factory receives the title string as `$title_text`, so it can be filtered with `ignored`. Inside an ordinary server form screen there is no such route, so a factory length is used to branch at creation (collections and factories chapter). Variables the factory gives enter the outer scope of the created control, so the top-level `ignored` of that control can read them (FILE-34)."
    },
    "sources": "AP 4.1, BC-S8·S11, 부록A C-17, CN"
  },
  "FILE-18": {
    "id": "FILE-18",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-18",
    "proposal": false,
    "evidence": [
      "바닐라",
      "작동팩"
    ],
    "title": {
      "ko": "`button_mappings`의 항목 하나처럼 배열 원소에도 `ignored`를 붙일 수 있다.",
      "en": "`ignored` can also be attached to an array element, such as one entry of `button_mappings`."
    },
    "detail": {
      "ko": "`button_mappings`의 항목 하나처럼 배열 원소에도 `ignored`를 붙일 수 있다.",
      "en": "`ignored` can also be attached to an array element, like one item of `button_mappings`."
    },
    "sources": "VN gameplay_common.json:272, AP 4.3"
  },
  "FILE-19": {
    "id": "FILE-19",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-19",
    "proposal": false,
    "evidence": [
      "작동팩",
      "코드"
    ],
    "title": {
      "ko": "`ignored`/`requires`의 변수 식에서 `$v > 'a'`는 문자열인지, `$v > 0`은 숫자인지 판별하는 데 쓰였다. `ignored`는 자기 `$` 선언과 참조 지점에서 받은 값을 보지 못하므로(FILE-34), 변수를 받는 컨트롤의 자식에 단다. 아래 예시가 AP 원본의 형태다.",
      "en": "In the variable expression of `ignored`/`requires`, `$v > 'a'` was used to tell whether it is a string and `$v > 0` whether it is a number. `ignored` cannot see its own `$` declarations or values received at the reference point (FILE-34), so attach it to a child of the control that receives the variable. The example below is the form of the AP original."
    },
    "detail": {
      "ko": "`ignored`/`requires`의 변수 식에서 `$v > 'a'`는 문자열인지, `$v > 0`은 숫자인지 판별하는 데 쓰였다. `ignored`는 자기 `$` 선언과 참조 지점에서 받은 값을 보지 못하므로(FILE-34), 변수를 받는 컨트롤의 자식에 단다. 아래 예시가 AP 원본의 형태다.",
      "en": "In the variable expressions of `ignored`/`requires`, `$v > 'a'` was used to tell whether it is a string and `$v > 0` whether it is a number. `ignored` cannot see its own `$` declarations and values received at the reference point (FILE-34), so attach it to a child of the control that receives the variable. The example below is the form of the AP original."
    },
    "sources": "AP 4.7, CN, AP-samples _screen.r4ui:321"
  },
  "FILE-20": {
    "id": "FILE-20",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-20",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "바닐라와 같은 경로 파일에 `\"부모/자식/손자\": { … }`처럼 경로 키를 쓰면 바닐라의 깊은 컨트롤 속성만 덮어쓴다. 바닐라 자신은 이 문법을 쓰지 않는다(0회).",
      "en": "Using a path key like `\"parent/child/grandchild\": { ... }` in a file at the same path as vanilla overrides only the properties of a deep vanilla control. Vanilla itself does not use this syntax (0 times)."
    },
    "detail": {
      "ko": "바닐라와 같은 경로 파일에 `\"부모/자식/손자\": { … }`처럼 경로 키를 쓰면 바닐라의 깊은 컨트롤 속성만 덮어쓴다. 바닐라 자신은 이 문법을 쓰지 않는다(0회).",
      "en": "If you use a path key like `\"parent/child/grandchild\": { … }` in a file at the same path as vanilla, it overrides only the properties of a deep vanilla control. Vanilla itself does not use this syntax (0 uses)."
    },
    "sources": "BA 2장 `main_screen_content/server_form_factory`, AP 4.9 `recipe_unlocked_popup/input_panel/label_panel/horizontal_padding_1`, BW-intro, BW-best"
  },
  "FILE-21": {
    "id": "FILE-21",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-21",
    "proposal": false,
    "evidence": [
      "작동팩",
      "추론"
    ],
    "title": {
      "ko": "바닐라와 같은 경로 파일에 바닐라와 같은 이름의 정의를 쓰면 속성 단위로 합쳐진다(적은 속성만 바뀐다). 예: `in_bed_screen`에 `force_render_below`, `screen_draws_last` 두 속성만 지정. 여러 팩이 같은 속성을 쓰면 팩 순서상 나중 것이 이긴다.",
      "en": "Writing a definition with the same name as vanilla in a file at the same path as vanilla merges per property (only the properties written change). Example: specifying only the two properties `force_render_below` and `screen_draws_last` in `in_bed_screen`. When several packs use the same property, the later one in pack order wins."
    },
    "detail": {
      "ko": "바닐라와 같은 경로 파일에 바닐라와 같은 이름의 정의를 쓰면 속성 단위로 합쳐진다(적은 속성만 바뀐다). 예: `in_bed_screen`에 `force_render_below`, `screen_draws_last` 두 속성만 지정. 여러 팩이 같은 속성을 쓰면 팩 순서상 나중 것이 이긴다.",
      "en": "If you write a definition with the same name as vanilla in a same-path file, it is merged per property (only the properties written change). Example: specify only the two properties `force_render_below` and `screen_draws_last` on `in_bed_screen`. If several packs write the same property, the later one in pack order wins."
    },
    "sources": "AP-samples in_bed_screen.json·toast_screen.json, BC 6.3-9, BW-best"
  },
  "FILE-22": {
    "id": "FILE-22",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-22",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "바닐라 정의를 다른 이름의 파일에서 재선언하면 무시된다. 재선언은 바닐라가 소유한 경로의 파일에서만 유효하다.",
      "en": "Redeclaring a vanilla definition in a file with a different name is ignored. A redeclaration is valid only in a file at a path vanilla owns."
    },
    "detail": {
      "ko": "바닐라 정의를 다른 이름의 파일에서 재선언하면 무시된다. 재선언은 바닐라가 소유한 경로의 파일에서만 유효하다.",
      "en": "If you redeclare a vanilla definition in a file with a different name, it is ignored. A redeclaration is valid only in a file at a path vanilla owns."
    },
    "sources": "BC-facts"
  },
  "FILE-23": {
    "id": "FILE-23",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-23",
    "proposal": false,
    "evidence": [
      "바닐라",
      "작동팩"
    ],
    "title": {
      "ko": "`property_bag`은 `#속성`의 초기값을 넣어 둔다. 바인딩이 아직 값을 쓰지 않은 상태의 기본값, 렌더러 입력(`#item_id_aux`), 라우팅 사전(10장) 등에 쓴다.",
      "en": "`property_bag` holds initial values of `#property`s. It is used for defaults before a binding has written a value, renderer input (`#item_id_aux`), routing dictionaries (chapter 10), and so on."
    },
    "detail": {
      "ko": "`property_bag`은 `#속성`의 초기값을 넣어 둔다. 바인딩이 아직 값을 쓰지 않은 상태의 기본값, 렌더러 입력(`#item_id_aux`), 라우팅 사전(화면 호스트와 데이터 채널 장) 등에 쓴다.",
      "en": "`property_bag` holds initial values of `#property`. It is used for defaults before a binding has written a value, for renderer input (`#item_id_aux`), and for routing dictionaries (screen hosts and data channels chapter)."
    },
    "sources": "VN 240회, AP 4.7, BC 4.1"
  },
  "FILE-24": {
    "id": "FILE-24",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-24",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "`property_bag`에 넣은 `size`, `offset`, `alpha` 값은 적용되지 않는다. 이 셋은 바인딩만이 바꿀 수 있다.",
      "en": "`size`, `offset`, and `alpha` values put in `property_bag` are not applied. Only bindings can change these three."
    },
    "detail": {
      "ko": "`property_bag`에 넣은 `size`, `offset`, `alpha` 값은 적용되지 않는다. 이 셋은 바인딩만이 바꿀 수 있다.",
      "en": "The `size`, `offset` and `alpha` values put in `property_bag` are not applied. Only a binding can change these three."
    },
    "sources": "BC-S12"
  },
  "FILE-25": {
    "id": "FILE-25",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-25",
    "proposal": false,
    "evidence": [
      "미검증"
    ],
    "title": {
      "ko": "`_ui_defs.json`의 경로는 리소스팩 루트부터 확장자까지 쓴 전체 경로다. 위키는 `ui/` 밖 폴더(`my_ui/main_menu.json`)도 된다고 한다. 바닐라와 이 프로젝트의 작동팩은 모두 `ui/` 아래만 쓰므로 `ui/` 밖은 확인하고 쓴다.",
      "en": "A path in `_ui_defs.json` is the full path from the resource pack root to the extension. The wiki says folders outside `ui/` (`my_ui/main_menu.json`) also work. Vanilla and this project's working packs all use only paths under `ui/`, so check before using anything outside `ui/`."
    },
    "detail": {
      "ko": "`_ui_defs.json`의 경로는 리소스팩 루트부터 확장자까지 쓴 전체 경로다. 위키는 `ui/` 밖 폴더(`my_ui/main_menu.json`)도 된다고 한다. 바닐라와 이 프로젝트의 작동팩은 모두 `ui/` 아래만 쓰므로 `ui/` 밖은 확인하고 쓴다.",
      "en": "The path in `_ui_defs.json` is the full path from the resource pack root to the extension. The wiki says folders outside `ui/` (`my_ui/main_menu.json`) also work. Vanilla and this project's working packs all use only below `ui/`, so check before using anything outside `ui/`."
    },
    "sources": "BW-intro"
  },
  "FILE-26": {
    "id": "FILE-26",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-26",
    "proposal": false,
    "evidence": [
      "미검증"
    ],
    "title": {
      "ko": "namespace에는 접두를 붙일 수 있다고 한다(`\"namespace\": \"wiki:main\"` → `\"x@wiki:main.element\"`). 바닐라 namespace와 겹칠 일을 줄이는 용도다. 바닐라와 이 프로젝트 출처에는 용례가 없다.",
      "en": "A prefix can reportedly be attached to a namespace (`\"namespace\": \"wiki:main\"` -> `\"x@wiki:main.element\"`). It is for reducing the chance of colliding with vanilla namespaces. There is no usage in vanilla or this project's sources."
    },
    "detail": {
      "ko": "namespace에는 접두를 붙일 수 있다고 한다(`\"namespace\": \"wiki:main\"` → `\"x@wiki:main.element\"`). 바닐라 namespace와 겹칠 일을 줄이는 용도다. 바닐라와 이 프로젝트 출처에는 용례가 없다.",
      "en": "A namespace is said to allow a prefix (`\"namespace\": \"wiki:main\"` -> `\"x@wiki:main.element\"`). It is for reducing the chance of colliding with vanilla namespaces. There is no usage example in vanilla or this project's sources."
    },
    "sources": "BW-best"
  },
  "FILE-27": {
    "id": "FILE-27",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-27",
    "proposal": false,
    "evidence": [
      "미검증",
      "추론"
    ],
    "title": {
      "ko": "경로 키(`\"부모/자식\"`)가 가리키는 자식이 없으면 Content Log에 리소스팩 오류가 남지만 나머지 UI는 정상 동작한다. 경로 키는 바닐라 개편에 가장 먼저 깨지는 접점이므로 정의 자체를 덮어쓸 수 있으면 그쪽을 쓴다.",
      "en": "If the child that a path key (`\"parent/child\"`) points to does not exist, a resource pack error is left in the Content Log but the rest of the UI works normally. A path key is the contact point that breaks first when vanilla is reworked, so if the definition itself can be overridden, use that instead."
    },
    "detail": {
      "ko": "경로 키(`\"부모/자식\"`)가 가리키는 자식이 없으면 Content Log에 리소스팩 오류가 남지만 나머지 UI는 정상 동작한다. 경로 키는 바닐라 개편에 가장 먼저 깨지는 접점이므로 정의 자체를 덮어쓸 수 있으면 그쪽을 쓴다.",
      "en": "If the child that a path key (`\"parent/child\"`) points to does not exist, a resource pack error is left in the Content Log but the rest of the UI works normally. Path keys are the contact point that breaks first when vanilla is reworked, so if you can override the definition itself, use that."
    },
    "sources": "BW-best"
  },
  "FILE-28": {
    "id": "FILE-28",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-28",
    "proposal": false,
    "evidence": [
      "미검증",
      "추론"
    ],
    "title": {
      "ko": "엔진이 넣어 주는 변수(`$actionbar_text` 등)를 식에서 쓸 때는 자기 변수로 한 번 받아 쓴다(`\"$atext\": \"$actionbar_text\"`, `\"visible\": \"(not ($atext = 'x'))\"`). 위키는 엔진 변수에 직접 비교할 수 없다고 하고, AP의 `\"$title_text|default\": \"\"` 선언도 같은 효과를 내는 것으로 보인다.",
      "en": "When using an engine-supplied variable (`$actionbar_text` and so on) in an expression, receive it once into your own variable (`\"$atext\": \"$actionbar_text\"`, `\"visible\": \"(not ($atext = 'x'))\"`). The wiki says engine variables cannot be compared directly, and the AP declaration `\"$title_text|default\": \"\"` seems to have the same effect."
    },
    "detail": {
      "ko": "엔진이 넣어 주는 변수(`$actionbar_text` 등)를 식에서 쓸 때는 자기 변수로 한 번 받아 쓴다(`\"$atext\": \"$actionbar_text\"`, `\"visible\": \"(not ($atext = 'x'))\"`). 위키는 엔진 변수에 직접 비교할 수 없다고 하고, AP의 `\"$title_text|default\": \"\"` 선언도 같은 효과를 내는 것으로 보인다.",
      "en": "When using engine-provided variables (`$actionbar_text`, etc.) in an expression, receive them once as your own variable (`\"$atext\": \"$actionbar_text\"`, `\"visible\": \"(not ($atext = 'x'))\"`). The wiki says engine variables cannot be compared directly, and AP's `\"$title_text|default\": \"\"` declaration appears to have the same effect."
    },
    "sources": "BW-intro, AP 4.1"
  },
  "FILE-29": {
    "id": "FILE-29",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-29",
    "proposal": false,
    "evidence": [
      "바닐라"
    ],
    "title": {
      "ko": "엔진이 정하는 전역 플랫폼 변수 중 바닐라 1.26.50 UI가 실제로 참조하는 것: `$pocket_edition`, `$win10_edition`, `$osx_edition`, `$console_edition`, `$education_edition`, `$is_console`, `$is_desktop`, `$is_ios`, `$is_ps4`, `$xbox_one`, `$touch`, `$pocket_screen`, `$desktop_screen`, `$is_pregame`(게임 밖 화면), `$is_publish`, `$pre_release`, `$trial`, `$store_disabled`, `$is_holographic`, `$apple_os`, `$google_os`, `$microsoft_os`, `$nx_os` 등 34개. 위키 목록 55개 중 나머지 21개(`$game_pad`, `$mouse`, `$fire_tv`, `$gear_vr` 등)는 바닐라 UI 파일에 나오지 않아 지금도 들어오는지 알 수 없다.",
      "en": "Among the engine-set global platform variables, those that vanilla 1.26.50 UI actually references are 34 including: `$pocket_edition`, `$win10_edition`, `$osx_edition`, `$console_edition`, `$education_edition`, `$is_console`, `$is_desktop`, `$is_ios`, `$is_ps4`, `$xbox_one`, `$touch`, `$pocket_screen`, `$desktop_screen`, `$is_pregame` (screens outside the game), `$is_publish`, `$pre_release`, `$trial`, `$store_disabled`, `$is_holographic`, `$apple_os`, `$google_os`, `$microsoft_os`, `$nx_os`. The other 21 of the wiki's list of 55 (`$game_pad`, `$mouse`, `$fire_tv`, `$gear_vr`, and so on) do not appear in vanilla UI files, so it is unknown whether they are still supplied."
    },
    "detail": {
      "ko": "엔진이 정하는 전역 플랫폼 변수 중 바닐라 1.26.50 UI가 실제로 참조하는 것: `$pocket_edition`, `$win10_edition`, `$osx_edition`, `$console_edition`, `$education_edition`, `$is_console`, `$is_desktop`, `$is_ios`, `$is_ps4`, `$xbox_one`, `$touch`, `$pocket_screen`, `$desktop_screen`, `$is_pregame`(게임 밖 화면), `$is_publish`, `$pre_release`, `$trial`, `$store_disabled`, `$is_holographic`, `$apple_os`, `$google_os`, `$microsoft_os`, `$nx_os` 등 34개. 위키 목록 55개 중 나머지 21개(`$game_pad`, `$mouse`, `$fire_tv`, `$gear_vr` 등)는 바닐라 UI 파일에 나오지 않아 지금도 들어오는지 알 수 없다.",
      "en": "Of the global platform variables the engine sets, those the vanilla 1.26.50 UI actually references: `$pocket_edition`, `$win10_edition`, `$osx_edition`, `$console_edition`, `$education_edition`, `$is_console`, `$is_desktop`, `$is_ios`, `$is_ps4`, `$xbox_one`, `$touch`, `$pocket_screen`, `$desktop_screen`, `$is_pregame` (out-of-game screens), `$is_publish`, `$pre_release`, `$trial`, `$store_disabled`, `$is_holographic`, `$apple_os`, `$google_os`, `$microsoft_os`, `$nx_os` and others, 34 in all. The remaining 21 of the wiki list's 55 (`$game_pad`, `$mouse`, `$fire_tv`, `$gear_vr`, etc.) do not appear in vanilla UI files, so it is unknown whether they are still supplied."
    },
    "sources": "BW-doc Global Variables, VN 전수 검색"
  },
  "FILE-30": {
    "id": "FILE-30",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-30",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "UI 파일은 jsoncpp 규칙으로 읽는다. 주석과 앞자리 0은 되지만 뒤따르는 쉼표와 따옴표 없는 키는 오류다. 오류가 나면 그 앞까지 읽은 정의만 로드되고 뒤는 조용히 빠진다. 같은 경로의 첫 파일이 실패하면 뒤 팩의 덮어쓰기도 받지 않는다.",
      "en": "UI files are read with jsoncpp rules. Comments and leading zeros are accepted, but trailing commas and unquoted keys are errors. On an error only the definitions read before it are loaded and the rest silently drop out. If the first file at the same path fails, overwrites from later packs are not accepted either."
    },
    "detail": {
      "ko": "UI 파일은 jsoncpp 규칙으로 읽는다. 주석과 앞자리 0은 되지만 뒤따르는 쉼표와 따옴표 없는 키는 오류다. 오류가 나면 그 앞까지 읽은 정의만 로드되고 뒤는 조용히 빠진다. 같은 경로의 첫 파일이 실패하면 뒤 팩의 덮어쓰기도 받지 않는다.",
      "en": "UI files are read with jsoncpp rules. Comments and leading zeros are fine, but trailing commas and unquoted keys are errors. When an error occurs, only the definitions read up to that point are loaded and the rest silently drop out. If the first file at the same path fails, overrides from later packs are not accepted either."
    },
    "sources": "CN"
  },
  "FILE-31": {
    "id": "FILE-31",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-31",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "`_ui_defs.json`의 경로는 정렬된 순서로 한 번씩 읽힌다. 여러 파일이 같은 정의를 재정의하면 경로 이름순으로 마지막이 이긴다.",
      "en": "Paths in `_ui_defs.json` are read once each in sorted order. When several files redefine the same definition, the last one in path-name order wins."
    },
    "detail": {
      "ko": "`_ui_defs.json`의 경로는 정렬된 순서로 한 번씩 읽힌다. 여러 파일이 같은 정의를 재정의하면 경로 이름순으로 마지막이 이긴다.",
      "en": "The paths in `_ui_defs.json` are read once each in sorted order. If several files redefine the same definition, the last by path name wins."
    },
    "sources": "CN"
  },
  "FILE-32": {
    "id": "FILE-32",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-32",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "`@`가 없는 키에 점이 있으면 점 앞이 namespace로 읽힌다(`\"spacer_9.5\"` → namespace `spacer_9`, 이름 `5`). 컨트롤 이름에 점을 쓰지 않는다. `\"@.이름\"`은 같은 파일의 namespace다.",
      "en": "If a key without `@` has a dot, the part before the dot is read as the namespace (`\"spacer_9.5\"` -> namespace `spacer_9`, name `5`). Do not use dots in control names. `\"@.name\"` is the namespace of the same file."
    },
    "detail": {
      "ko": "`@`가 없는 키에 점이 있으면 점 앞이 namespace로 읽힌다(`\"spacer_9.5\"` → namespace `spacer_9`, 이름 `5`). 컨트롤 이름에 점을 쓰지 않는다. `\"@.이름\"`은 같은 파일의 namespace다.",
      "en": "If a key without `@` has a dot, what is before the dot is read as the namespace (`\"spacer_9.5\"` -> namespace `spacer_9`, name `5`). Do not use dots in control names. `\"@.name\"` is the same file's namespace."
    },
    "sources": "CN, CN 회귀 시험 Lifeboat"
  },
  "FILE-33": {
    "id": "FILE-33",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-33",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "`$변수` 조회는 확정값을 먼저 찾는다. 바깥 어디에든 `\"$x\": 값`이 있으면 안쪽의 `\"$x|default\"`보다 이기고, 확정값이 없을 때만 가장 가까운 `|default`를 쓴다. null은 미설정이다.",
      "en": "`$variable` lookup finds a fixed value first. If a `\"$x\": value` exists anywhere outside, it beats an inner `\"$x|default\"`, and the nearest `|default` is used only when there is no fixed value. null means unset."
    },
    "detail": {
      "ko": "`$변수` 조회는 확정값을 먼저 찾는다. 바깥 어디에든 `\"$x\": 값`이 있으면 안쪽의 `\"$x|default\"`보다 이기고, 확정값이 없을 때만 가장 가까운 `|default`를 쓴다. null은 미설정이다.",
      "en": "`$variable` lookup finds a fixed value first. If there is a `\"$x\": value` anywhere outside, it beats the inner `\"$x|default\"`, and only when there is no fixed value is the nearest `|default` used. null means unset."
    },
    "sources": "CN, CN-run"
  },
  "FILE-34": {
    "id": "FILE-34",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-34",
    "proposal": false,
    "evidence": [
      "코드",
      "바닐라"
    ],
    "title": {
      "ko": "`ignored`는 그 컨트롤 자신의 `$` 선언을 보지 않는다. 정의 안의 `$x|default`도, 참조 지점에서 넘긴 `\"$x\": true`도 자기 `ignored`에는 닿지 않고, 부모(바깥) 스코프의 값만 읽는다. 게이트 변수는 부모에 넘기고 `ignored`는 그 자식에 단다(바닐라 `focus_border`의 `hover_slot`, AP `category_tab_icon`의 자식이 이 형태). 엔진은 `ignored`를 그 컨트롤의 `variables`보다 먼저 평가한다(FILE-43).",
      "en": "`ignored` does not look at that control's own `$` declarations. Neither the `$x|default` inside the definition nor the `\"$x\": true` passed at the reference point reaches its own `ignored`, and it reads only the value in the parent (outer) scope. Pass the gate variable to the parent and attach `ignored` to its child (vanilla `hover_slot` of `focus_border` and the child of AP `category_tab_icon` are this form). The engine evaluates `ignored` before that control's `variables` (FILE-43)."
    },
    "detail": {
      "ko": "`ignored`는 그 컨트롤 자신의 `$` 선언을 보지 않는다. 정의 안의 `$x|default`도, 참조 지점에서 넘긴 `\"$x\": true`도 자기 `ignored`에는 닿지 않고, 부모(바깥) 스코프의 값만 읽는다. 게이트 변수는 부모에 넘기고 `ignored`는 그 자식에 단다(바닐라 `focus_border`의 `hover_slot`, AP `category_tab_icon`의 자식이 이 형태). 엔진은 `ignored`를 그 컨트롤의 `variables`보다 먼저 평가한다(FILE-43). , VN 146개 참조 지점 중 변수 전달 2곳, AP-samples)",
      "en": "`ignored` does not see that control's own `$` declarations. Neither the `$x|default` inside the definition nor the `\"$x\": true` passed at the reference point reaches its own `ignored`, and it reads only the value of the parent (outer) scope. Pass the gate variable to the parent and put `ignored` on that child (the `hover_slot` of vanilla `focus_border` and the child of AP `category_tab_icon` have this form). The engine evaluates `ignored` before that control's `variables` (FILE-43). , 2 of 146 VN reference points pass variables, AP-samples)"
    },
    "sources": "NB-10, CN·CN-run(`$x|default`·참조 지점 값), VN 146개 참조 지점 중 변수 전달 2곳, AP-samples"
  },
  "FILE-35": {
    "id": "FILE-35",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-35",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "`ignored`의 결과가 불리언이면 그대로, 정수면 0이 아닐 때 생성 안 함, 문자열이면 생성한다. 미설정 `$변수`는 식 안에서는 null이지만 `\"ignored\": \"$x\"`처럼 통째 값이면 글자 `$x`로 남아 생성된다.",
      "en": "If the result of `ignored` is a boolean it is used as is, an integer means not created when nonzero, and a string means created. An unset `$variable` is null inside an expression, but as a whole value like `\"ignored\": \"$x\"` it remains as the text `$x` and the control is created."
    },
    "detail": {
      "ko": "`ignored`의 결과가 불리언이면 그대로, 정수면 0이 아닐 때 생성 안 함, 문자열이면 생성한다. 미설정 `$변수`는 식 안에서는 null이지만 `\"ignored\": \"$x\"`처럼 통째 값이면 글자 `$x`로 남아 생성된다.",
      "en": "If the result of `ignored` is a boolean it is used as is, an integer is \"not created if not 0\", and a string is created. An unset `$variable` is null inside an expression, but when the whole value is like `\"ignored\": \"$x\"` it stays as the text `$x` and is created."
    },
    "sources": "CN"
  },
  "FILE-36": {
    "id": "FILE-36",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-36",
    "proposal": false,
    "evidence": [
      "바닐라",
      "코드"
    ],
    "title": {
      "ko": "자식 키도 변수가 될 수 있다: `{ \"$slot\": { …덮을 속성… } }`에서 `$slot`이 `\"이름@ns.정의\"`면 그 이름과 정의로 만든다. `\"$name_var@ns.정의\"`처럼 인스턴스 이름만 변수로 줄 수도 있다.",
      "en": "A child key can also be a variable: in `{ \"$slot\": { ...properties to override... } }`, if `$slot` is `\"name@ns.definition\"`, it is built with that name and definition. Only the instance name can also be a variable, as in `\"$name_var@ns.definition\"`."
    },
    "detail": {
      "ko": "자식 키도 변수가 될 수 있다: 에서 `$slot`이 `\"이름@ns.정의\"`면 그 이름과 정의로 만든다. `\"$name_var@ns.정의\"`처럼 인스턴스 이름만 변수로 줄 수도 있다. `{바닐라, 코드}`",
      "en": "A child key can also be a variable: in , if `$slot` is `\"name@ns.definition\"`, it is created with that name and definition. You can also give only the instance name as a variable, as in `\"$name_var@ns.definition\"`. `{vanilla, code}`"
    },
    "sources": "VN 83회 예 ui_template_tabs.json `base_tab`, CN"
  },
  "FILE-37": {
    "id": "FILE-37",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-37",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "상속에서 파생 정의가 적은 속성은 객체여도 통째로 기반 것을 대체한다. 반면 같은 경로 파일의 재선언(FILE-21)은 객체 값을 멤버 단위로 합친다. `property_bag` 일부만 바꾸려면 재선언, 전부 바꾸려면 상속이다.",
      "en": "In inheritance, a property the derived definition writes replaces the base's even when it is an object, as a whole. In contrast, a redeclaration in a file at the same path (FILE-21) merges object values per member. To change only part of a `property_bag`, redeclare; to change all of it, inherit."
    },
    "detail": {
      "ko": "상속에서 파생 정의가 적은 속성은 객체여도 통째로 기반 것을 대체한다. 반면 같은 경로 파일의 재선언(FILE-21)은 객체 값을 멤버 단위로 합친다. `property_bag` 일부만 바꾸려면 재선언, 전부 바꾸려면 상속이다.",
      "en": "In inheritance, a property the derived definition writes replaces the base's wholesale, even if it is an object. In contrast, redeclaration in a same-path file (FILE-21) merges object values member by member. To change only part of `property_bag`, redeclare, and to change all, inherit."
    },
    "sources": "CN"
  },
  "FILE-38": {
    "id": "FILE-38",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-38",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "최상위 정의의 `\"속성\": null`은 기반 값을 지우지만, 컨트롤 배열 안 인라인 참조의 `null`은 기반 값을 그대로 둔다.",
      "en": "A `\"property\": null` in a top-level definition erases the base value, but a `null` in an inline reference inside a control array leaves the base value as is."
    },
    "detail": {
      "ko": "최상위 정의의 `\"속성\": null`은 기반 값을 지우지만, 컨트롤 배열 안 인라인 참조의 `null`은 기반 값을 그대로 둔다.",
      "en": "A `\"property\": null` in a top-level definition erases the base value, but a `null` in an inline reference inside a control array leaves the base value as it is."
    },
    "sources": "CN"
  },
  "FILE-39": {
    "id": "FILE-39",
    "category": "FILE",
    "page": "json-ui/factory-synthesis",
    "anchor": "file-39",
    "proposal": false,
    "evidence": [
      "작동팩",
      "바닐라"
    ],
    "title": {
      "ko": "같은 `controls` 배열 안의 형제 이름(`@` 앞)은 서로 다르게 짓는다.",
      "en": "Name siblings in the same `controls` array differently (the name before `@`)."
    },
    "detail": {
      "ko": "같은 `controls` 배열 안의 형제 이름(`@` 앞)은 서로 다르게 짓는다. 2025년 4월 무렵 버전부터 중복 이름이 JSON UI 오류를 낸다는 보고가 있고(SLB 1.0.3.3), 바닐라 1.26.50의 `controls` 배열 4,626개에는 중복이 하나도 없다. `padding`처럼 흔한 이름은 `padding_top`, `padding_bottom`으로 나눈다.",
      "en": "Name siblings in the same `controls` array differently (the name before `@`). There are reports that from a version around April 2025 duplicate names cause JSON UI errors (SLB 1.0.3.3), and none of the 4,626 `controls` arrays of vanilla 1.26.50 has a duplicate. Split a common name like `padding` into `padding_top` and `padding_bottom`."
    },
    "sources": "SLB 7장, VN 전수 조사"
  },
  "FILE-40": {
    "id": "FILE-40",
    "category": "FILE",
    "page": "json-ui/files-and-definitions",
    "anchor": "file-40",
    "proposal": true,
    "evidence": [
      "코드",
      "미검증"
    ],
    "title": {
      "ko": "키와 문자열 값의 `\\uXXXX` 이스케이프는 읽을 때 원래 글자로 풀린다.",
      "en": "(proposal) A `\\uXXXX` escape in keys and string values is decoded into the original character when read."
    },
    "detail": {
      "ko": "키와 문자열 값의 `\\uXXXX` 이스케이프는 읽을 때 원래 글자로 풀린다. 이스케이프로 바꾼 파일은 크기만 커지고 의미(식의 바이트 수, 비교, 포함 검사)는 같으며 누구나 JSON 파서로 되돌릴 수 있어, 숨길 목적이면 효과가 없다. 다섯 자리 이스케이프 버그와 서로게이트 쌍 문제를 보고한 작은 팩 도구가 있다. 실측 과제: `\"type\"` 키와 `\"label\"` 값을 `\\u` 이스케이프로 적은 정의가 동작하는지, BMP 밖 이모지를 서로게이트 쌍으로 적은 라벨이 그려지는지.",
      "en": "(proposal) A `\\uXXXX` escape in keys and string values is decoded into the original character when read. A file converted with escapes only gets bigger and the meaning (the byte count of an expression, comparison, containment check) is the same, and anyone can revert it with a JSON parser, so it has no effect if the purpose is hiding. There is a small pack tool that reported a five-digit escape bug and a surrogate pair problem. Measurement task: whether a definition that writes the `\"type\"` key and the `\"label\"` value with `\\u` escapes works, and whether a label that writes an emoji outside the BMP as a surrogate pair is drawn."
    },
    "sources": "jua-jsonencryptor, jua-small-packs"
  },
  "FILE-41": {
    "id": "FILE-41",
    "category": "FILE",
    "page": "json-ui/files-and-definitions",
    "anchor": "file-41",
    "proposal": true,
    "evidence": [
      "바닐라",
      "미검증"
    ],
    "title": {
      "ko": "바닐라 1.26.50 UI는 namespace 하나를 파일 하나에만 둔다.",
      "en": "(proposal) The vanilla 1.26.50 UI puts one namespace in only one file."
    },
    "detail": {
      "ko": "바닐라 1.26.50 UI는 namespace 하나를 파일 하나에만 둔다. 한 namespace의 정의를 여러 파일로 나눠도 참조가 풀린다는 난독화기의 주장이 있지만 기록은 없다. 나눌 이유가 없으면 namespace당 파일 하나를 유지한다. 실측 과제: 같은 namespace `x`를 두 파일에 나눠 `x.a`(파일 1)가 `x.b`(파일 2)를 참조할 때 풀리는지.",
      "en": "(proposal) The vanilla 1.26.50 UI puts one namespace in only one file. An obfuscator claims that splitting the definitions of one namespace across several files still resolves references, but there is no record. If there is no reason to split, keep one file per namespace. Measurement task: whether it resolves when the same namespace `x` is split across two files and `x.a` (file 1) references `x.b` (file 2)."
    },
    "sources": "bedrock-samples, jua-jsonencryptor"
  },
  "FILE-42": {
    "id": "FILE-42",
    "category": "FILE",
    "page": "json-ui/files-and-definitions",
    "anchor": "file-42",
    "proposal": true,
    "evidence": [
      "바닐라",
      "충돌"
    ],
    "title": {
      "ko": "namespace 없는 `@이름`은 문맥에 따라 다른 namespace에서 찾아진다.",
      "en": "(proposal) An `@name` without a namespace is looked up in different namespaces depending on context."
    },
    "detail": {
      "ko": "namespace 없는 `@이름`은 문맥에 따라 다른 namespace에서 찾아진다. 최상위 정의가 다른 namespace를 상속해도 그 안의 짧은 이름은 파일 namespace에서 찾아지는 용례가 바닐라에 43건이고(`trade_screen_pocket.json:349`), 컨트롤 배열 안에서 다른 namespace를 상속한 인스턴스(`\"x@common.close_button\": { \"controls\": [...] }`) 아래의 짧은 이름은 기반 namespace에서 찾아지는 용례가 3건이다(`command_block_screen.json:1010-1038`의 `default@close_button_panel`은 `common`에만 있다). 두 namespace에 같은 이름이 있을 때 우선순위는 알 수 없으므로 다른 namespace를 상속한 컨트롤 안에서는 항상 `ns.이름`을 적는다. FILE-06에는 이 예외를 덧붙이는 보강이 함께 제안되었다. 충돌 C-55와 연결된다.",
      "en": "(proposal) An `@name` without a namespace is looked up in different namespaces depending on context. There are 43 cases in vanilla where, even if a top-level definition inherits another namespace, the short name inside it is looked up in the file namespace (`trade_screen_pocket.json:349`), and 3 cases where a short name under an instance that inherits another namespace inside a control array (`\"x@common.close_button\": { \"controls\": [...] }`) is looked up in the base namespace (`default@close_button_panel` at `command_block_screen.json:1010-1038` exists only in `common`). The priority when both namespaces have the same name cannot be known, so inside a control that inherits another namespace always write `ns.name`. A reinforcement adding this exception to FILE-06 was also proposed. Connected to conflict C-55."
    },
    "sources": "jua-netease-docs, bedrock-samples"
  },
  "FILE-43": {
    "id": "FILE-43",
    "category": "FILE",
    "page": "reference/rules",
    "anchor": "file-43",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "엔진은 컨트롤마다 `ignored`를 가장 먼저 평가하고, 참이면 그 컨트롤의 `variables` 적용을 포함한 나머지 처리를 하지 않는다. 그래서 자기 `variables`(조건부 변수 포함)로 정한 값은 자기 `ignored`에 닿지 않는다(FILE-34). `ignored`에 실수·배열·객체를 넣으면 `An invalid value was provided for \"ignored\" field.` 오류다. `variables`는 객체 하나 또는 객체 배열을 받고, 배열 안 객체가 아닌 항목은 건너뛴다.",
      "en": "The engine evaluates `ignored` first for each control, and if true it skips the rest of the processing for that control, including applying `variables`. So a value decided by its own `variables` (including conditional variables) does not reach its own `ignored` (FILE-34). Putting a real number, array, or object in `ignored` gives the error `An invalid value was provided for \"ignored\" field.` `variables` accepts one object or an array of objects, and entries in the array that are not objects are skipped."
    },
    "detail": {
      "ko": "엔진은 컨트롤마다 `ignored`를 가장 먼저 평가하고, 참이면 그 컨트롤의 `variables` 적용을 포함한 나머지 처리를 하지 않는다. 그래서 자기 `variables`(조건부 변수 포함)로 정한 값은 자기 `ignored`에 닿지 않는다(FILE-34). `ignored`에 실수·배열·객체를 넣으면 `An invalid value was provided for \"ignored\" field.` 오류다. `variables`는 객체 하나 또는 객체 배열을 받고, 배열 안 객체가 아닌 항목은 건너뛴다.",
      "en": "For each control the engine evaluates `ignored` first, and if true it does none of the remaining processing for that control, including applying `variables`. So values set by its own `variables` (including conditional variables) do not reach its own `ignored` (FILE-34). Putting a real number, array or object in `ignored` gives the error `An invalid value was provided for \"ignored\" field.`. `variables` accepts one object or an array of objects, and items in the array that are not objects are skipped."
    },
    "sources": "NB-10"
  },
  "HOST-01": {
    "id": "HOST-01",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-01",
    "proposal": false,
    "evidence": [
      "작동팩",
      "실측",
      "추론"
    ],
    "title": {
      "ko": "호스트는 필요한 상호작용과 데이터 갱신 방식으로 고른다. 메뉴·목록은 액션 폼, 입력 양식은 모달 폼, 열어 둔 채 값이 바뀌어야 하면 상자 화면, 알림은 HUD(타이틀=하나, 채팅=여러 개)다. 3D 위치를 따라가야 하면 JSON UI가 아니다(12장).",
      "en": "Choose the host by the interaction needed and how data is updated. Menus and lists use an action form, input forms use a modal form, a chest screen if values must change while it stays open, and notifications use the HUD (title = one, chat = several). If it must follow a 3D position, it is not JSON UI (chapter 12)."
    },
    "detail": {
      "ko": "호스트는 필요한 상호작용과 데이터 갱신 방식으로 고른다. 메뉴·목록은 액션 폼, 입력 양식은 모달 폼, 열어 둔 채 값이 바뀌어야 하면 상자 화면, 알림은 HUD(타이틀=하나, 채팅=여러 개)다. 3D 위치를 따라가야 하면 JSON UI가 아니다(12장).",
      "en": "Choose the host by the interaction and data update method you need. Menus and lists are an action form, input forms a modal form, a chest screen if values must change while it stays open, and notifications the HUD (title = one, chat = several). If it must follow a 3D position, it is not JSON UI (chapter 12)."
    },
    "sources": "BC 4장, BA, AP 6장, DI 5장"
  },
  "HOST-02": {
    "id": "HOST-02",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-02",
    "proposal": false,
    "evidence": [
      "바닐라",
      "실측"
    ],
    "title": {
      "ko": "모든 서버 폼은 `server_form.third_party_server_screen` 한 화면으로 열린다. 팩은 다른 화면 파일로 라우팅할 수 없으므로, 이 화면 안에서 제목으로 분기한다.",
      "en": "Every server form opens as one screen, `server_form.third_party_server_screen`. A pack cannot route to another screen file, so it branches by title inside this screen."
    },
    "detail": {
      "ko": "모든 서버 폼은 `server_form.third_party_server_screen` 한 화면으로 열린다. 팩은 다른 화면 파일로 라우팅할 수 없으므로, 이 화면 안에서 제목으로 분기한다.",
      "en": "Every server form opens as the single screen `server_form.third_party_server_screen`. A pack cannot route to another screen file, so it branches by title inside this screen."
    },
    "sources": "VN server_form.json:9-33, BC-S8"
  },
  "HOST-03": {
    "id": "HOST-03",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-03",
    "proposal": false,
    "evidence": [
      "코드",
      "작동팩"
    ],
    "title": {
      "ko": "제목 판별은 두 방식이 있다. 접두사: `(('%.13s' * #title_text) = 'corev0009core')`. 포함: `(not ((#title_text - 'CUSTOMUI:BA') = #title_text))`. 포함 검사는 제목 뒤에 메타데이터(개수 등)를 붙일 수 있다. 어느 쪽이든 플래그는 길고 고유하게 만든다.",
      "en": "There are two ways to identify a title. Prefix: `(('%.13s' * #title_text) = 'corev0009core')`. Contains: `(not ((#title_text - 'CUSTOMUI:BA') = #title_text))`. A contains check can attach metadata (counts and so on) after the title. Either way, make the flag long and unique."
    },
    "detail": {
      "ko": "제목 판별은 두 방식이 있다. 접두사: `(('%.13s' * #title_text) = 'corev0009core')`. 포함: `(not ((#title_text - 'CUSTOMUI:BA') = #title_text))`. 포함 검사는 제목 뒤에 메타데이터(개수 등)를 붙일 수 있다. 어느 쪽이든 플래그는 길고 고유하게 만든다. , BA 2장·3.4, BW-form, BW-title)",
      "en": "There are two ways to detect the title. Prefix: `(('%.13s' * #title_text) = 'corev0009core')`. Containment: `(not ((#title_text - 'CUSTOMUI:BA') = #title_text))`. A containment check allows metadata (a count, etc.) to be attached after the title. Either way, make the flag long and unique. , BA chapters 2 and 3.4, BW-form, BW-title)"
    },
    "sources": "BC 4.1-(1), BA 2장·3.4, BW-form, BW-title"
  },
  "HOST-04": {
    "id": "HOST-04",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-04",
    "proposal": false,
    "evidence": [
      "코드",
      "작동팩",
      "추론"
    ],
    "title": {
      "ko": "바닐라 폼을 숨기는 방법은 둘이다. 장단점이 있으므로 상황에 맞게 고른다.",
      "en": "There are two ways to hide the vanilla form. Each has pros and cons, so choose to suit the situation."
    },
    "detail": {
      "ko": "바닐라 폼을 숨기는 방법은 둘이다. 장단점이 있으므로 상황에 맞게 고른다. , BA 2장·10장)",
      "en": "There are two ways to hide the vanilla form. Each has pros and cons, so choose to fit the situation. , BA chapters 2 and 10)"
    },
    "sources": "BC 4.1-(1), BA 2장·10장"
  },
  "HOST-05": {
    "id": "HOST-05",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-05",
    "proposal": false,
    "evidence": [
      "코드",
      "작동팩"
    ],
    "title": {
      "ko": "내 화면은 바닐라의 `server_form_factory`를 그대로 빌린 두 번째 팩토리를 `main_screen_content`에 `insert_back`해서 만든다. 둘 다 같은 폼 데이터에 반응하고, 가시성(또는 길이)으로 하나만 보인다.",
      "en": "Your own screen is made by `insert_back`ing a second factory that borrows the vanilla `server_form_factory` as is into `main_screen_content`. Both react to the same form data, and visibility (or length) shows only one."
    },
    "detail": {
      "ko": "내 화면은 바닐라의 `server_form_factory`를 그대로 빌린 두 번째 팩토리를 `main_screen_content`에 `insert_back`해서 만든다. 둘 다 같은 폼 데이터에 반응하고, 가시성(또는 길이)으로 하나만 보인다. , BA 2장, BW-form, BW-intro)",
      "en": "Make my screen by `insert_back`-ing into `main_screen_content` a second factory that borrows vanilla's `server_form_factory` as is. Both react to the same form data, and by visibility (or length) only one shows. , BA chapter 2, BW-form, BW-intro)"
    },
    "sources": "BC 4.1-(1), BA 2장, BW-form, BW-intro"
  },
  "HOST-06": {
    "id": "HOST-06",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-06",
    "proposal": false,
    "evidence": [
      "코드",
      "실측"
    ],
    "title": {
      "ko": "내 화면이 여러 개면 `visible`로 모두 붙이지 말고 선택된 화면만 생성한다(COL-10). bedrock-core는 `collection_panel`의 `property_bag`에 `\"#route_<제목>\": [\"화면id\"]`를 두고 `('#route_' + #title_text)`로 사전처럼 조회한 결과를 `#collection_length`에 넣어 그 셀만 만든다. 이 사전 조회는 bedrock-core에서는 코드·테스트로만 확인되었고, Bedrock Wiki 튜토리얼이 같은 메커니즘(`('#list' + #choice)`)의 결과를 게임 스크린샷으로 보여 준다(COL-23, 제3자 기록). 계산 길이로 0/1개를 만드는 것 자체는 실측되었다.",
      "en": "If you have several screens of your own, do not attach them all with `visible`; create only the selected screen (COL-10). bedrock-core puts `\"#route_<title>\": [\"screen id\"]` in the `property_bag` of a `collection_panel`, looks it up like a dictionary with `('#route_' + #title_text)`, and puts the result into `#collection_length` so only that cell is created. This dictionary lookup was confirmed in bedrock-core only through code and tests, and the Bedrock Wiki tutorial shows the result of the same mechanism (`('#list' + #choice)`) with a game screenshot (COL-23, a third-party record). Making 0 or 1 cells with a computed length was itself measured."
    },
    "detail": {
      "ko": "내 화면이 여러 개면 `visible`로 모두 붙이지 말고 선택된 화면만 생성한다(COL-10). bedrock-core는 `collection_panel`의 `property_bag`에 `\"#route_<제목>\": [\"화면id\"]`를 두고 `('#route_' + #title_text)`로 사전처럼 조회한 결과를 `#collection_length`에 넣어 그 셀만 만든다. 이 사전 조회는 bedrock-core에서는 코드·테스트로만 확인되었고, Bedrock Wiki 튜토리얼이 같은 메커니즘(`('#list' + #choice)`)의 결과를 게임 스크린샷으로 보여 준다(COL-23, 제3자 기록). 계산 길이로 0/1개를 만드는 것 자체는 실측되었다. , BC-S11, BW-dyn 스크린샷)",
      "en": "If you have several screens, do not attach them all with `visible`; create only the chosen screen (COL-10). bedrock-core puts `\"#route_<title>\": [\"screen id\"]` in the `property_bag` of a `collection_panel` and puts the result of a dictionary-like lookup with `('#route_' + #title_text)` into `#collection_length` to create only that cell. This dictionary lookup was confirmed in bedrock-core only by code and tests, and a Bedrock Wiki tutorial shows the result of the same mechanism (`('#list' + #choice)`) with game screenshots (COL-23, third-party record). Creating 0 or 1 cells with a computed length itself was measured. , BC-S11, BW-dyn screenshot)"
    },
    "sources": "BC 4.1-(2), BC-S11, BW-dyn 스크린샷"
  },
  "HOST-07": {
    "id": "HOST-07",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-07",
    "proposal": false,
    "evidence": [
      "실측",
      "코드"
    ],
    "title": {
      "ko": "엔트리 = 데이터 채널. 액션 폼 엔트리 문자열(`#form_button_text`)에 값을 싣는다. 누르는 셀에는 `collection_details` + `form_button_click` 매핑(COL-04, INP-04)을, 값만 읽는 셀에는 매핑 없이 `collection` 바인딩을 준다(`collection_details`는 있어도 매핑이 없으면 눌리지 않는다). 누르는 셀을 먼저(문서 순서), 값 채널을 뒤에 두면 텍스트 수가 바뀌어도 버튼 번호가 바뀌지 않는다.",
      "en": "Entry = data channel. Carry values in the action form entry string (`#form_button_text`). Give pressable cells a `collection_details` + `form_button_click` mapping (COL-04, INP-04), and cells that only read values a `collection` binding with no mapping (a `collection_details` without a mapping cannot be pressed). If pressable cells come first (document order) and the value channel after, button numbers do not change even if the text count changes."
    },
    "detail": {
      "ko": "엔트리 = 데이터 채널. 액션 폼 엔트리 문자열(`#form_button_text`)에 값을 싣는다. 누르는 셀에는 `collection_details` + `form_button_click` 매핑(COL-04, INP-04)을, 값만 읽는 셀에는 매핑 없이 `collection` 바인딩을 준다(`collection_details`는 있어도 매핑이 없으면 눌리지 않는다). 누르는 셀을 먼저(문서 순서), 값 채널을 뒤에 두면 텍스트 수가 바뀌어도 버튼 번호가 바뀌지 않는다. ·(4), BC-S1)",
      "en": "Entry = data channel. Carry values in the action form entry string (`#form_button_text`). Give a pressable cell `collection_details` + the `form_button_click` mapping (COL-04, INP-04), and a cell that only reads values a `collection` binding without a mapping (even with `collection_details`, without a mapping it is not pressed). If the pressable cells go first (in document order) and the value channel after, the button numbers do not change even when the text count changes. and (4), BC-S1)"
    },
    "sources": "BC 4.1-(3)·(4), BC-S1"
  },
  "HOST-08": {
    "id": "HOST-08",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-08",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "고정 폭 레코드. 엔트리 하나에 여러 필드를 싣는다면 `[종류 4][탭 2][프레임 24]…`처럼 바이트 폭을 고정하고, 스펙 파일 하나를 인코더(스크립트)와 UI 생성기가 함께 읽는다. 패딩 문자(`$`)와 예약 문자는 본문에서 제거하고, 숫자 필드는 글자 접두(EXP-15)를 붙인다.",
      "en": "Fixed-width records. When carrying several fields in one entry, fix the byte widths like `[kind 4][tab 2][frame 24]...`, and have one spec file read by both the encoder (script) and the UI generator. Remove the padding character (`$`) and reserved characters from the body, and give numeric fields a letter prefix (EXP-15)."
    },
    "detail": {
      "ko": "고정 폭 레코드. 엔트리 하나에 여러 필드를 싣는다면 `[종류 4][탭 2][프레임 24]…`처럼 바이트 폭을 고정하고, 스펙 파일 하나를 인코더(스크립트)와 UI 생성기가 함께 읽는다. 패딩 문자(`$`)와 예약 문자는 본문에서 제거하고, 숫자 필드는 글자 접두(EXP-15)를 붙인다.",
      "en": "Fixed-width records. If you carry several fields in one entry, fix the byte widths like `[kind 4][tab 2][frame 24]…`, and have the encoder (script) and the UI generator read one spec file together. Remove the padding character (`$`) and reserved characters from the body, and give number fields a letter prefix (EXP-15)."
    },
    "sources": "BA 3장"
  },
  "HOST-09": {
    "id": "HOST-09",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-09",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "위치 무관 토큰. 불리언 여러 개는 `~` + 대문자 그룹 + 소문자 비트(`~Fo`, `~Xa`)로 문자열 어디에나 넣고 포함 검사(EXP-07)로 읽는다.",
      "en": "Position-independent tokens. Put several booleans anywhere in the string as `~` + uppercase group + lowercase bit (`~Fo`, `~Xa`) and read them with a contains check (EXP-07)."
    },
    "detail": {
      "ko": "위치 무관 토큰. 불리언 여러 개는 `~` + 대문자 그룹 + 소문자 비트(`~Fo`, `~Xa`)로 문자열 어디에나 넣고 포함 검사(EXP-07)로 읽는다.",
      "en": "Position-independent tokens. Several booleans are put anywhere in the string as `~` + an uppercase group + a lowercase bit (`~Fo`, `~Xa`) and read with a containment check (EXP-07)."
    },
    "sources": "BA 3.3"
  },
  "HOST-10": {
    "id": "HOST-10",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-10",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "폼을 다시 열면 스크롤이 맨 위로 돌아가고 위치를 정할 방법이 없다. 탭 전환·아코디언은 \"폼 제출 → 해당 상태로 다시 열기\"로 만들고, 열린 섹션을 목록 맨 앞에 두어 스크롤 문제를 피한다. 다른 화면(채팅 등) 때문에 `UserBusy`로 취소되면 몇 틱 간격으로 재시도한다.",
      "en": "Reopening a form returns scrolling to the top and there is no way to set the position. Build tab switching and accordions as \"submit the form, then reopen in that state\", and put the open section first in the list to avoid the scroll problem. If it is cancelled with `UserBusy` because of another screen (chat and so on), retry at intervals of a few ticks."
    },
    "detail": {
      "ko": "폼을 다시 열면 스크롤이 맨 위로 돌아가고 위치를 정할 방법이 없다. 탭 전환·아코디언은 \"폼 제출 → 해당 상태로 다시 열기\"로 만들고, 열린 섹션을 목록 맨 앞에 두어 스크롤 문제를 피한다. 다른 화면(채팅 등) 때문에 `UserBusy`로 취소되면 몇 틱 간격으로 재시도한다.",
      "en": "If you reopen a form, the scroll returns to the top and there is no way to set the position. Make tab switching and accordions as \"submit the form -> reopen in that state\", and put the open section at the front of the list to avoid the scroll problem. If it is canceled with `UserBusy` because of another screen (chat, etc.), retry at intervals of a few ticks."
    },
    "sources": "BA 4장·7장"
  },
  "HOST-11": {
    "id": "HOST-11",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-11",
    "proposal": false,
    "evidence": [
      "코드",
      "바닐라"
    ],
    "title": {
      "ko": "모달 폼의 네이티브 필드(토글, 슬라이더, 드롭다운, 입력)는 엔진이 그린다. 팩은 자리를 잡고 바닐라와 같은 바인딩(`#custom_toggle_state` 등, `collection_details`)을 가진 템플릿을 그 자리에 둔다. 제출 버튼은 팩이 그리며 `button.submit_custom_form`에 매핑한다.",
      "en": "The engine draws the native fields of a modal form (toggle, slider, dropdown, input). The pack reserves the space and puts in that place a template with the same bindings as vanilla (`#custom_toggle_state` and so on, `collection_details`). The pack draws the submit button and maps it to `button.submit_custom_form`."
    },
    "detail": {
      "ko": "모달 폼의 네이티브 필드(토글, 슬라이더, 드롭다운, 입력)는 엔진이 그린다. 팩은 자리를 잡고 바닐라와 같은 바인딩(`#custom_toggle_state` 등, `collection_details`)을 가진 템플릿을 그 자리에 둔다. 제출 버튼은 팩이 그리며 `button.submit_custom_form`에 매핑한다.",
      "en": "The native fields of a modal form (toggle, slider, dropdown, input) are drawn by the engine. The pack takes the place and puts in it a template that has the same bindings as vanilla (`#custom_toggle_state`, etc., `collection_details`). The pack draws the submit button and maps it to `button.submit_custom_form`."
    },
    "sources": "BC 4.2, VN server_form.json:283-321"
  },
  "HOST-12": {
    "id": "HOST-12",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-12",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "슬라이더는 정적으로 배치하면 안 된다. 생성 시 상태를 검증해서, 다른 화면의 슬라이더가 숨겨진 채 생성되어도 `_setCurrentStep`/`_setPercentage` assert를 낸다. 슬라이더는 `custom_form`을 행 타입으로 라우팅하는 팩토리가 슬라이더 행이 있을 때만 만들게 한다.",
      "en": "A slider must not be placed statically. It validates state at creation, so even if a slider on another screen is created hidden, it gives a `_setCurrentStep`/`_setPercentage` assert. Let a factory that routes `custom_form` by row type create a slider only when there is a slider row."
    },
    "detail": {
      "ko": "슬라이더는 정적으로 배치하면 안 된다. 생성 시 상태를 검증해서, 다른 화면의 슬라이더가 숨겨진 채 생성되어도 `_setCurrentStep`/`_setPercentage` assert를 낸다. 슬라이더는 `custom_form`을 행 타입으로 라우팅하는 팩토리가 슬라이더 행이 있을 때만 만들게 한다.",
      "en": "A slider must not be placed statically. It validates state at creation, so even if a slider of another screen is created hidden, it raises the `_setCurrentStep`/`_setPercentage` assert. For sliders, have the factory that routes `custom_form` by row type create one only when a slider row exists."
    },
    "sources": "BC-S8, BC-S9"
  },
  "HOST-13": {
    "id": "HOST-13",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-13",
    "proposal": false,
    "evidence": [
      "미검증"
    ],
    "title": {
      "ko": "한 모달 폼 안에서 숨긴 드롭다운(필드 0)의 선택값 `('%.4s' * #dropdown_option_text)`으로 페이지를 바꾸는 패턴이 소개되어 있다. `#custom_dropdown`은 열림 상태이지 현재 선택이 아니라는 점이 요점이다. 게임 확인 기록은 없다.",
      "en": "A pattern is introduced that switches pages with the selected value of a hidden dropdown (field 0) inside one modal form, `('%.4s' * #dropdown_option_text)`. The point is that `#custom_dropdown` is the open state and not the current selection. There is no in-game confirmation record."
    },
    "detail": {
      "ko": "한 모달 폼 안에서 숨긴 드롭다운(필드 0)의 선택값 `('%.4s' * #dropdown_option_text)`으로 페이지를 바꾸는 패턴이 소개되어 있다. `#custom_dropdown`은 열림 상태이지 현재 선택이 아니라는 점이 요점이다. 게임 확인 기록은 없다.",
      "en": "A pattern of switching pages by the selected value of a hidden dropdown (field 0) inside one modal form, `('%.4s' * #dropdown_option_text)`, has been introduced. The point is that `#custom_dropdown` is the open state, not the current selection. There is no record of confirmation in game."
    },
    "sources": "MJ 8장-5"
  },
  "HOST-14": {
    "id": "HOST-14",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-14",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "채널 수. HUD 타이틀 채널은 하나라 다른 애드온이 `setTitle`을 부르면 내 오버레이·토스트가 덮인다. 채팅은 메시지마다 컨트롤이 생기므로 여러 알림이 쌓인다. 겹칠 수 있는 알림은 채팅, 최신 값 하나면 되는 상태 표시는 타이틀이 맞다.",
      "en": "Number of channels. The HUD title channel is single, so when another add-on calls `setTitle`, my overlay and toast are overwritten. Chat creates a control per message, so several notifications stack. Chat is right for notifications that can overlap, and the title for a status display that needs only the latest value."
    },
    "detail": {
      "ko": "채널 수. HUD 타이틀 채널은 하나라 다른 애드온이 `setTitle`을 부르면 내 오버레이·토스트가 덮인다. 채팅은 메시지마다 컨트롤이 생기므로 여러 알림이 쌓인다. 겹칠 수 있는 알림은 채팅, 최신 값 하나면 되는 상태 표시는 타이틀이 맞다.",
      "en": "Number of channels. The HUD title channel is one, so when another add-on calls `setTitle` my overlay and toast are overwritten. Chat creates a control per message so several notifications stack. Chat is right for notifications that can overlap, and the title for a status display where only the latest value is needed."
    },
    "sources": "BA 6장, AP 4.5·6장"
  },
  "HOST-15": {
    "id": "HOST-15",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-15",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "제목·타이틀·채팅·대화문을 데이터 채널로 쓸 때는 고유한 접두사(`_r4ui:`, `CUSTOMHUD:ba_toast:`, `corev0009core`)를 붙이고, 같은 접두사 하나로 \"바닐라 표시는 숨김, 커스텀 표시는 켬\"을 동시에 정한다. 세 팩 모두 이 규약을 쓴다. 다른 애드온이 같은 접두사로 보내면 숨겨지므로 접두사는 충분히 길게 만든다.",
      "en": "When using titles, chat, and dialog text as a data channel, attach a unique prefix (`_r4ui:`, `CUSTOMHUD:ba_toast:`, `corev0009core`), and with that single prefix decide at once \"hide the vanilla display, turn on the custom display\". All three packs use this convention. If another add-on sends the same prefix it gets hidden, so make the prefix long enough."
    },
    "detail": {
      "ko": "제목·타이틀·채팅·대화문을 데이터 채널로 쓸 때는 고유한 접두사(`_r4ui:`, `CUSTOMHUD:ba_toast:`, `corev0009core`)를 붙이고, 같은 접두사 하나로 \"바닐라 표시는 숨김, 커스텀 표시는 켬\"을 동시에 정한다. 세 팩 모두 이 규약을 쓴다. 다른 애드온이 같은 접두사로 보내면 숨겨지므로 접두사는 충분히 길게 만든다.",
      "en": "When using the title, titles, chat and dialogue text as data channels, attach a unique prefix (`_r4ui:`, `CUSTOMHUD:ba_toast:`, `corev0009core`) and with that one prefix decide at once \"hide the vanilla display, turn on the custom display\". All three packs use this convention. If another add-on sends with the same prefix it gets hidden, so make the prefix long enough."
    },
    "sources": "AP 3장·6장, BA 6장, BC 4.1"
  },
  "HOST-16": {
    "id": "HOST-16",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-16",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "엔티티 인벤토리는 `container_type: \"container\"`만 `chest_screen.json`으로 가고, `private: false`여야 열린다. `inventory_size: 54`도 큰 상자가 아니라 `small_chest_screen`으로 가서 27칸만 그리지만, 그려지지 않는 칸도 바인딩으로 읽히고 실시간 갱신된다. 200칸도 동작했다.",
      "en": "For entity inventories, only `container_type: \"container\"` goes to `chest_screen.json`, and `private: false` is needed for it to open. `inventory_size: 54` also goes to `small_chest_screen` and not a large chest and draws only 27 slots, but the undrawn slots are still read by bindings and updated in real time. 200 slots also worked."
    },
    "detail": {
      "ko": "엔티티 인벤토리는 `container_type: \"container\"`만 `chest_screen.json`으로 가고, `private: false`여야 열린다. `inventory_size: 54`도 큰 상자가 아니라 `small_chest_screen`으로 가서 27칸만 그리지만, 그려지지 않는 칸도 바인딩으로 읽히고 실시간 갱신된다. 200칸도 동작했다.",
      "en": "Of entity inventories, only `container_type: \"container\"` goes to `chest_screen.json`, and it opens only if `private: false`. `inventory_size: 54` also goes to `small_chest_screen`, not a large chest, and draws only 27 cells, but cells that are not drawn are still read by bindings and updated in real time. Even 200 cells worked."
    },
    "sources": "BC-facts"
  },
  "HOST-17": {
    "id": "HOST-17",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-17",
    "proposal": false,
    "evidence": [
      "실측",
      "충돌"
    ],
    "title": {
      "ko": "슬롯은 숫자와 툴팁 글을 공개한다. `#hover_text`는 칸마다 따로 읽히고 열린 화면에서 바로 갱신되며, 이름, 바닐라 설명 줄, lore, 잠금 안내 줄이 툴팁 서식 그대로 들어 있다. 그룹 이름은 비어 있다. 화면 식별은 커스텀 아이템의 `max_durability`(부호 있는 16비트, 1..32767)로 하고 `#item_durability_total_amount`로 읽는다(닳지 않았으면 `#item_durability_current_amount`도 같은 값). `#item_durability_max`는 칸 바인딩에 없다. 바닐라 `#item_id_aux`는 커스텀 아이템 수에 따라 밀리는 범위가 있고(BC 기록은 256 이상, 위키 1.26.50 표는 852~883, 1.26.63 실측은 853 이상, 아이템 숫자 ID 기획), 빈 슬롯이나 내구도 없는 아이템은 모든 내구도 게이트에서 실패한다.",
      "en": "Slots expose numbers and tooltip text. `#hover_text` is read per slot and updates at once in the open screen, and it holds the name, vanilla description lines, lore and the lock notice line in tooltip format. The group name is empty. Screen identification uses the custom item's `max_durability` (signed 16-bit, 1..32767), read through `#item_durability_total_amount` (`#item_durability_current_amount` has the same value while unworn). `#item_durability_max` is not a slot binding. Vanilla `#item_id_aux` has a range that shifts with the number of custom items (the BC record says 256 and above, the wiki's 1.26.50 table 852~883, measured 853 and above on 1.26.63, item numeric ID plan), and an empty slot or an item without durability fails every durability gate."
    },
    "detail": {
      "ko": "슬롯은 숫자와 툴팁 글을 공개한다. `#hover_text`는 칸마다 따로 읽히고 열린 화면에서 바로 갱신되며, 이름, 바닐라 설명 줄, lore, 잠금 안내 줄이 툴팁 서식 그대로 들어 있다. 그룹 이름은 비어 있다. 화면 식별은 커스텀 아이템의 `max_durability`(부호 있는 16비트, 1..32767)로 하고 `#item_durability_total_amount`로 읽는다(닳지 않았으면 `#item_durability_current_amount`도 같은 값). `#item_durability_max`는 칸 바인딩에 없다. 바닐라 `#item_id_aux`는 커스텀 아이템 수에 따라 밀리는 범위가 있고(BC 기록은 256 이상, 위키 1.26.50 표는 852~883, 1.26.63 실측은 853 이상, 아이템 숫자 ID 기획), 빈 슬롯이나 내구도 없는 아이템은 모든 내구도 게이트에서 실패한다. , BW-ids, 부록A C-33, EML)",
      "en": "Slots expose numbers and tooltip text. `#hover_text` is read per slot and updates at once in the open screen, and it holds the name, vanilla description lines, lore and the lock notice line in tooltip format. The group name is empty. The screen is identified by the custom item's `max_durability` (signed 16 bits, 1..32767), read through `#item_durability_total_amount` (`#item_durability_current_amount` has the same value while unworn). `#item_durability_max` is not a slot binding. Vanilla `#item_id_aux` has a range that shifts with the number of custom items (the BC record says 256 and above, the wiki 1.26.50 table 852~883, measured 853 and above on 1.26.63, item numeric ID plan), and an empty slot or an item with no durability fails every durability gate. , BW-ids, Appendix A C-33, EML)"
    },
    "sources": "BC-facts, BC-S14, BC 4.3-(1), BW-ids, 부록A C-33, EML"
  },
  "HOST-18": {
    "id": "HOST-18",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-18",
    "proposal": false,
    "evidence": [
      "실측",
      "코드"
    ],
    "title": {
      "ko": "상자 화면 내용은 `chest_screen.json`에서 `small_chest_screen`을 재선언해 `$screen_content`를 바꾸고(MOD-11), 바닐라 라벨·그리드는 0번 슬롯 식별값 바인딩으로 숨긴다(COL-05). 컨트롤을 직접 선언한 `small_chest_panel_top_half`에는 `insert_back`이 안전하다. 터치 화면도 같은 파일의 `pocket_containers.small_chest_panel`로 간다.",
      "en": "For chest screen content, redeclare `small_chest_screen` in `chest_screen.json` and change `$screen_content` (MOD-11), and hide the vanilla label and grid with a slot 0 identifier binding (COL-05). `insert_back` is safe on `small_chest_panel_top_half`, which declares its controls directly. Touch screens also go to `pocket_containers.small_chest_panel` in the same file."
    },
    "detail": {
      "ko": "상자 화면 내용은 `chest_screen.json`에서 `small_chest_screen`을 재선언해 `$screen_content`를 바꾸고(MOD-11), 바닐라 라벨·그리드는 0번 슬롯 식별값 바인딩으로 숨긴다(COL-05). 컨트롤을 직접 선언한 `small_chest_panel_top_half`에는 `insert_back`이 안전하다. 터치 화면도 같은 파일의 `pocket_containers.small_chest_panel`로 간다. , BC-facts)",
      "en": "The chest screen content redeclares `small_chest_screen` in `chest_screen.json` to change `$screen_content` (MOD-11), and the vanilla label and grid are hidden with a slot 0 identifier binding (COL-05). For `small_chest_panel_top_half`, where controls are declared directly, `insert_back` is safe. Touch screens also go to `pocket_containers.small_chest_panel` in the same file. , BC-facts)"
    },
    "sources": "BC 4.3-(2), BC-facts"
  },
  "HOST-19": {
    "id": "HOST-19",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-19",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "`$container_title`은 엔티티 nameTag이고 텍스트에는 쓸 수 있지만 바인딩 식에는 못 쓴다. 라우팅은 슬롯 값으로 한다.",
      "en": "`$container_title` is the entity nameTag and can be used in text but not in binding expressions. Do routing with slot values."
    },
    "detail": {
      "ko": "`$container_title`은 엔티티 nameTag이고 텍스트에는 쓸 수 있지만 바인딩 식에는 못 쓴다. 라우팅은 슬롯 값으로 한다.",
      "en": "`$container_title` is the entity nameTag and can be used in text but not in binding expressions. Do routing with slot values."
    },
    "sources": "BC-facts"
  },
  "HOST-20": {
    "id": "HOST-20",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-20",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "스크립트 쪽 주의: 슬롯을 읽기 전용으로 만드는 lock mode는 없다(폴링 후 복구가 유일). 원본을 플레이어가 든 채로 슬롯을 다시 채우면 복제된다. 커서는 `PlayerCursorInventoryComponent`로 읽고 지울 수 있지만 터치에서는 채워지지 않는다. 쌓이는 아이템에는 `setDynamicProperty`가 던지므로 lore로 표시한다.",
      "en": "Script-side cautions: there is no lock mode that makes a slot read-only (polling and restoring is the only way). Refilling a slot while the player holds the original duplicates it. The cursor can be read and cleared with `PlayerCursorInventoryComponent` but is not filled on touch. `setDynamicProperty` throws on stackable items, so mark with lore."
    },
    "detail": {
      "ko": "스크립트 쪽 주의: 슬롯을 읽기 전용으로 만드는 lock mode는 없다(폴링 후 복구가 유일). 원본을 플레이어가 든 채로 슬롯을 다시 채우면 복제된다. 커서는 `PlayerCursorInventoryComponent`로 읽고 지울 수 있지만 터치에서는 채워지지 않는다. 쌓이는 아이템에는 `setDynamicProperty`가 던지므로 lore로 표시한다.",
      "en": "A script-side caution: there is no lock mode that makes slots read-only (poll and restore is the only way). If you refill a slot while the player holds the original, it is duplicated. The cursor can be read and cleared with `PlayerCursorInventoryComponent` but is not filled on touch. `setDynamicProperty` throws on stackable items, so mark them with lore."
    },
    "sources": "BC-facts"
  },
  "HOST-21": {
    "id": "HOST-21",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-21",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "대화문이 화면 ID다. `#dialogtext`(전역 바인딩)를 비교해 내 화면과 바닐라 `npc_screen_contents`를 가시성으로 전환한다. 바닐라 내용을 감싸 두면 일반 NPC 대화는 계속 동작한다. 대화 파일의 `scene_tag`(명령이 여는 이름)와 `text`(UI가 보는 값)는 달라도 된다.",
      "en": "The dialog text is the screen ID. Compare `#dialogtext` (a global binding) and switch the visibility of your screen and the vanilla `npc_screen_contents`. If the vanilla content is wrapped, ordinary NPC dialogs keep working. The `scene_tag` of the dialog file (the name a command opens) and the `text` (the value the UI sees) may differ."
    },
    "detail": {
      "ko": "대화문이 화면 ID다. `#dialogtext`(전역 바인딩)를 비교해 내 화면과 바닐라 `npc_screen_contents`를 가시성으로 전환한다. 바닐라 내용을 감싸 두면 일반 NPC 대화는 계속 동작한다. 대화 파일의 `scene_tag`(명령이 여는 이름)와 `text`(UI가 보는 값)는 달라도 된다.",
      "en": "The dialogue text is the screen ID. Compare `#dialogtext` (a global binding) to switch between my screen and vanilla `npc_screen_contents` by visibility. If you wrap the vanilla content, ordinary NPC dialogue keeps working. The `scene_tag` of the dialogue file (the name the command opens) and `text` (the value the UI sees) may differ."
    },
    "sources": "AP 4.2"
  },
  "HOST-22": {
    "id": "HOST-22",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-22",
    "proposal": false,
    "evidence": [
      "작동팩",
      "바닐라"
    ],
    "title": {
      "ko": "대화 버튼(`student_buttons_collection`)을 탭·메뉴로 쓴다. 인덱스가 아니라 버튼 이름(`#student_button_text`)으로 모양을 고르면 대화 파일의 버튼 순서를 바꿔도 UI가 깨지지 않는다. 누르면 `button.student_button` → 대화의 명령(`/scriptevent` 등)이 실행된다.",
      "en": "Use dialog buttons (`student_buttons_collection`) as tabs and menus. If the look is chosen by button name (`#student_button_text`) and not the index, the UI does not break when the order of buttons in the dialog file changes. Pressing it runs `button.student_button`, and then the dialog's command (`/scriptevent` and so on)."
    },
    "detail": {
      "ko": "대화 버튼(`student_buttons_collection`)을 탭·메뉴로 쓴다. 인덱스가 아니라 버튼 이름(`#student_button_text`)으로 모양을 고르면 대화 파일의 버튼 순서를 바꿔도 UI가 깨지지 않는다. 누르면 `button.student_button` → 대화의 명령(`/scriptevent` 등)이 실행된다.",
      "en": "Use dialogue buttons (`student_buttons_collection`) as tabs and menus. If you choose the look by button name (`#student_button_text`) and not by index, the UI does not break even if you reorder the buttons in the dialogue file. When pressed, `button.student_button` -> the dialogue's command (`/scriptevent`, etc.) runs."
    },
    "sources": "AP 4.3, VN npc_interact_screen.json:1180-1261"
  },
  "HOST-23": {
    "id": "HOST-23",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-23",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "\"탭 전환으로 닫힘\"과 \"사용자가 닫음\"은 대화의 `on_close_commands`와 태그로 구분한다(탭 버튼이 태그를 붙이고, 닫힘 명령은 태그가 없을 때만 정리).",
      "en": "\"Closed by tab switch\" and \"closed by the user\" are told apart by the dialog's `on_close_commands` and a tag (a tab button attaches the tag, and the close command cleans up only when there is no tag)."
    },
    "detail": {
      "ko": "\"탭 전환으로 닫힘\"과 \"사용자가 닫음\"은 대화의 `on_close_commands`와 태그로 구분한다(탭 버튼이 태그를 붙이고, 닫힘 명령은 태그가 없을 때만 정리).",
      "en": "Tell \"closed by tab switching\" from \"closed by the user\" with the dialogue's `on_close_commands` and tags (a tab button attaches a tag, and the close command cleans up only when there is no tag)."
    },
    "sources": "AP 4.3"
  },
  "HOST-24": {
    "id": "HOST-24",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-24",
    "proposal": false,
    "evidence": [
      "작동팩",
      "미검증"
    ],
    "title": {
      "ko": "대화를 열 NPC는 보이지 않는 엔티티(scale 0, 무적)를 플레이어 근처에 두고 `dialogue open @e[...] @s <scene>`으로 연다. 대화 파일의 장면 버튼은 6개 제한이 있다는 주장과, NPC 구조물 NBT로 9개까지 늘린다는 주장은 확인되지 않았다.",
      "en": "The NPC to open the dialog is an invisible entity (scale 0, invulnerable) kept near the player and opened with `dialogue open @e[...] @s <scene>`. The claim that scene buttons in the dialog file are limited to 6, and the claim that NPC structure NBT extends it to 9, are not confirmed."
    },
    "detail": {
      "ko": "대화를 열 NPC는 보이지 않는 엔티티(scale 0, 무적)를 플레이어 근처에 두고 `dialogue open @e[...] @s <scene>`으로 연다. 대화 파일의 장면 버튼은 6개 제한이 있다는 주장과, NPC 구조물 NBT로 9개까지 늘린다는 주장은 확인되지 않았다.",
      "en": "The NPC that opens the dialogue is an invisible entity (scale 0, invulnerable) placed near the player and opened with `dialogue open @e[...] @s <scene>`. The claim that scene buttons in a dialogue file are limited to 6, and the claim that NPC structure NBT extends it to 9, were not confirmed."
    },
    "sources": "AP 4.2, MJ 7장"
  },
  "HOST-25": {
    "id": "HOST-25",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-25",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "HUD를 다른 화면 위에 그리려면 아래 화면에 `force_render_below: true`, `screen_draws_last: false`를, HUD에 `screen_draws_last: true`를 준다(침대 화면 등 다른 화면도 같은 방식으로 아래로 보낸다).",
      "en": "To draw the HUD over another screen, give the screen below `force_render_below: true` and `screen_draws_last: false` and the HUD `screen_draws_last: true` (other screens such as the bed screen are sent below the same way)."
    },
    "detail": {
      "ko": "HUD를 다른 화면 위에 그리려면 아래 화면에 `force_render_below: true`, `screen_draws_last: false`를, HUD에 `screen_draws_last: true`를 준다(침대 화면 등 다른 화면도 같은 방식으로 아래로 보낸다).",
      "en": "To draw the HUD over another screen, give the screen below `force_render_below: true` and `screen_draws_last: false`, and the HUD `screen_draws_last: true` (other screens such as the bed screen are sent below the same way)."
    },
    "sources": "AP 3.1, AP-samples in_bed_screen.json, BW-doc"
  },
  "HOST-26": {
    "id": "HOST-26",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-26",
    "proposal": false,
    "evidence": [
      "작동팩",
      "바닐라"
    ],
    "title": {
      "ko": "커스텀 HUD 레이어는 바닐라 `root_panel` 안이 아니라 `common.base_screen`이 제공하는 배경 마운트 슬롯 `$screen_bg_content`에 둔다. 그러면 바닐라 HUD(`root_panel`)를 통째로 숨겨도 내 레이어는 남는다.",
      "en": "Put a custom HUD layer not inside the vanilla `root_panel` but in the background mount slot `$screen_bg_content` that `common.base_screen` provides. Then even if the vanilla HUD (`root_panel`) is hidden wholesale, your layer remains."
    },
    "detail": {
      "ko": "커스텀 HUD 레이어는 바닐라 `root_panel` 안이 아니라 `common.base_screen`이 제공하는 배경 마운트 슬롯 `$screen_bg_content`에 둔다. 그러면 바닐라 HUD(`root_panel`)를 통째로 숨겨도 내 레이어는 남는다.",
      "en": "Put a custom HUD layer not inside vanilla `root_panel` but in the background mount slot `$screen_bg_content` that `common.base_screen` provides. Then even if the whole vanilla HUD (`root_panel`) is hidden, my layer remains."
    },
    "sources": "AP 4.4, VN ui_common.json:6349·6507"
  },
  "HOST-27": {
    "id": "HOST-27",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-27",
    "proposal": false,
    "evidence": [
      "작동팩",
      "추론"
    ],
    "title": {
      "ko": "HUD 타이틀 채널: 내 레이어에 `hud_title_text_factory`를 하나 더 두고, 바닐라 타이틀(`hud_title_text`)은 내 접두사일 때 숨긴다. 숨김 바인딩은 `hud_title_text` 전체에 건다. `title_frame`에만 걸면 형제인 부제(`subtitle_frame`)가 숨지 않아 텍스트가 잠깐 번쩍일 수 있다(BA 2.0.3의 알려진 문제, 2.0.5의 수정 방법은 미확인).",
      "en": "HUD title channel: put one more `hud_title_text_factory` in your layer and hide the vanilla title (`hud_title_text`) when it has your prefix. Put the hiding binding on the whole `hud_title_text`. If it is put only on `title_frame`, the sibling subtitle (`subtitle_frame`) does not hide and text can flash briefly (a known problem of BA 2.0.3, the fix method in 2.0.5 is unconfirmed)."
    },
    "detail": {
      "ko": "HUD 타이틀 채널: 내 레이어에 `hud_title_text_factory`를 하나 더 두고, 바닐라 타이틀(`hud_title_text`)은 내 접두사일 때 숨긴다. 숨김 바인딩은 `hud_title_text` 전체에 건다. `title_frame`에만 걸면 형제인 부제(`subtitle_frame`)가 숨지 않아 텍스트가 잠깐 번쩍일 수 있다(BA 2.0.3의 알려진 문제, 2.0.5의 수정 방법은 미확인).",
      "en": "HUD title channel: place one more `hud_title_text_factory` in my layer and hide the vanilla title (`hud_title_text`) when it has my prefix. Put the hiding binding on the whole `hud_title_text`. If put only on `title_frame`, the sibling subtitle (`subtitle_frame`) does not hide and text can flash briefly (a known problem of BA 2.0.3, the 2.0.5 fix is unconfirmed)."
    },
    "sources": "BA 6장, AP-samples hud_screen.json"
  },
  "HOST-28": {
    "id": "HOST-28",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-28",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "타이틀 팩토리가 만든 컨트롤에서 `$title_text`(그리고 `$subtitle_text`, `$actionbar_text`)를 `|default`와 함께 받아 `ignored`·`variables.requires`로 판정하면, 안 보일 탭·아이템을 아예 만들지 않아 가볍다. 타이틀을 다시 보내면 컨트롤이 다시 만들어진다.",
      "en": "If a control made by a title factory receives `$title_text` (and `$subtitle_text`, `$actionbar_text`) with `|default` and judges with `ignored` and `variables.requires`, tabs and items that would be invisible are not created at all, which is light. Sending the title again recreates the controls."
    },
    "detail": {
      "ko": "타이틀 팩토리가 만든 컨트롤에서 `$title_text`(그리고 `$subtitle_text`, `$actionbar_text`)를 `|default`와 함께 받아 `ignored`·`variables.requires`로 판정하면, 안 보일 탭·아이템을 아예 만들지 않아 가볍다. 타이틀을 다시 보내면 컨트롤이 다시 만들어진다.",
      "en": "If a control created by the title factory receives `$title_text` (and `$subtitle_text`, `$actionbar_text`) with `|default` and decides with `ignored` and `variables.requires`, tabs and items that will not show are not created at all, so it is light. When the title is resent, the control is recreated."
    },
    "sources": "AP 4.1"
  },
  "HOST-29": {
    "id": "HOST-29",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-29",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "채팅 채널: 바닐라 HUD 채팅과 같은 이름의 `chat_item_factory`를 내 레이어에 하나 더 두면 같은 채팅 데이터로 두 번째 목록이 생긴다. 내 메시지는 두 곳에서 숨긴다: 채팅 화면 `chat_screen.json`의 `messages_text`, HUD의 `chat_grid_item`(화면 위 채팅 줄).",
      "en": "Chat channel: putting one more `chat_item_factory` with the same name as the vanilla HUD chat in your layer makes a second list from the same chat data. Your messages are hidden in two places: `messages_text` in the chat screen `chat_screen.json` and `chat_grid_item` in the HUD (the chat lines over the screen)."
    },
    "detail": {
      "ko": "채팅 채널: 바닐라 HUD 채팅과 같은 이름의 `chat_item_factory`를 내 레이어에 하나 더 두면 같은 채팅 데이터로 두 번째 목록이 생긴다. 내 메시지는 두 곳에서 숨긴다: 채팅 화면 `chat_screen.json`의 `messages_text`, HUD의 `chat_grid_item`(화면 위 채팅 줄).",
      "en": "Chat channel: if you place one more `chat_item_factory` with the same name as the vanilla HUD chat in my layer, a second list is created from the same chat data. Hide my messages in two places: `messages_text` of the chat screen `chat_screen.json`, and the HUD's `chat_grid_item` (the chat lines over the screen)."
    },
    "sources": "AP 4.5"
  },
  "HOST-30": {
    "id": "HOST-30",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-30",
    "proposal": false,
    "evidence": [
      "바닐라",
      "실측"
    ],
    "title": {
      "ko": "HUD 액션바 컨트롤은 `hud_actionbar_text_factory`가 만들고 `$actionbar_text` 변수로 텍스트를 받는다. `root_panel`에 `hud_actionbar_text_factory` 이름의 두 번째 팩토리(`\"control_ids\": { \"hud_actionbar_text\": \"hud_actionbar_text@내ns.정의\" }`)를 넣으면 액션바를 보낼 때 바닐라 액션바와 함께 내 컨트롤도 만들어지고, 그 안의 라벨이 `$actionbar_text`를 그대로 받는다.",
      "en": "The HUD action bar control is made by `hud_actionbar_text_factory` and receives text with the `$actionbar_text` variable. Putting a second factory named `hud_actionbar_text_factory` (`\"control_ids\": { \"hud_actionbar_text\": \"hud_actionbar_text@myns.definition\" }`) in `root_panel` makes your control as well as the vanilla action bar when an action bar is sent, and the label inside it receives `$actionbar_text` as is."
    },
    "detail": {
      "ko": "HUD 액션바 컨트롤은 `hud_actionbar_text_factory`가 만들고 `$actionbar_text` 변수로 텍스트를 받는다. `root_panel`에 `hud_actionbar_text_factory` 이름의 두 번째 팩토리(`\"control_ids\": { \"hud_actionbar_text\": \"hud_actionbar_text@내ns.정의\" }`)를 넣으면 액션바를 보낼 때 바닐라 액션바와 함께 내 컨트롤도 만들어지고, 그 안의 라벨이 `$actionbar_text`를 그대로 받는다.",
      "en": "The HUD actionbar control is created by `hud_actionbar_text_factory` and receives its text through the variable `$actionbar_text`. If you put in `root_panel` a second factory named `hud_actionbar_text_factory` (`\"control_ids\": { \"hud_actionbar_text\": \"hud_actionbar_text@myns.definition\" }`), when an actionbar is sent my control is created along with the vanilla actionbar, and the label inside receives `$actionbar_text` as is."
    },
    "sources": "VN hud_screen.json:2143-2160·3406, TP"
  },
  "HOST-31": {
    "id": "HOST-31",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-31",
    "proposal": false,
    "evidence": [
      "바닐라"
    ],
    "title": {
      "ko": "1.26.50에서 HUD 자막은 `subtitle_container_factory`로 바뀌었다. 자막 위치에 의존하던 HUD 수정은 다시 확인한다.",
      "en": "In 1.26.50 the HUD subtitle changed to `subtitle_container_factory`. Recheck HUD modifications that depended on the subtitle position."
    },
    "detail": {
      "ko": "1.26.50에서 HUD 자막은 `subtitle_container_factory`로 바뀌었다. 자막 위치에 의존하던 HUD 수정은 다시 확인한다.",
      "en": "In 1.26.50 the HUD subtitle changed to `subtitle_container_factory`. Recheck HUD modifications that depended on the subtitle position."
    },
    "sources": "VN hud_screen.json:3340, MJ 4.1"
  },
  "HOST-32": {
    "id": "HOST-32",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-32",
    "proposal": false,
    "evidence": [
      "미검증",
      "작동팩"
    ],
    "title": {
      "ko": "위키의 HUD 표준 방식은 `hud_screen.json`의 `root_panel`에 `insert_front`로 래퍼 패널 하나를 넣는 것이다. 래퍼에 `size`를 주지 않으면 부모(화면) 크기를 받아 자식의 앵커·퍼센트가 화면 기준으로 동작한다. 바닐라 HUD를 숨겨도(F1, `root_panel` 숨김) 남아야 하는 레이어라면 HOST-26의 `$screen_bg_content`에 둔다.",
      "en": "The wiki's standard HUD method is to `insert_front` one wrapper panel into the `root_panel` of `hud_screen.json`. If the wrapper is given no `size`, it takes the parent (screen) size, so the children's anchors and percentages work relative to the screen. For a layer that must remain even when the vanilla HUD is hidden (F1, hiding `root_panel`), put it in the `$screen_bg_content` of HOST-26."
    },
    "detail": {
      "ko": "위키의 HUD 표준 방식은 `hud_screen.json`의 `root_panel`에 `insert_front`로 래퍼 패널 하나를 넣는 것이다. 래퍼에 `size`를 주지 않으면 부모(화면) 크기를 받아 자식의 앵커·퍼센트가 화면 기준으로 동작한다. 바닐라 HUD를 숨겨도(F1, `root_panel` 숨김) 남아야 하는 레이어라면 HOST-26의 `$screen_bg_content`에 둔다.",
      "en": "The wiki's standard HUD approach is to `insert_front` one wrapper panel into `root_panel` of `hud_screen.json`. If you give the wrapper no `size`, it receives the parent (screen) size so children's anchors and percentages work relative to the screen. For a layer that must remain even when the vanilla HUD is hidden (F1, hiding `root_panel`), put it in `$screen_bg_content` of HOST-26."
    },
    "sources": "BW-hud, BW-best, AP"
  },
  "HOST-33": {
    "id": "HOST-33",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-33",
    "proposal": false,
    "evidence": [
      "미검증"
    ],
    "title": {
      "ko": "여러 커스텀 폼 제목을 한 번에 제외하려면 빼기를 이어 쓴다: `((#title_text - 'formA:' - 'formB:') = #title_text)`가 참이면 바닐라 폼을 보인다.",
      "en": "To exclude several custom form titles at once, chain subtractions: if `((#title_text - 'formA:' - 'formB:') = #title_text)` is true, show the vanilla form."
    },
    "detail": {
      "ko": "여러 커스텀 폼 제목을 한 번에 제외하려면 빼기를 이어 쓴다: `((#title_text - 'formA:' - 'formB:') = #title_text)`가 참이면 바닐라 폼을 보인다.",
      "en": "To exclude several custom form titles at once, chain subtractions: if `((#title_text - 'formA:' - 'formB:') = #title_text)` is true, the vanilla form shows."
    },
    "sources": "BW-form"
  },
  "HOST-34": {
    "id": "HOST-34",
    "category": "HOST",
    "page": "json-ui/expressions",
    "anchor": "host-34",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "고정 폭 필드의 패딩 문자로 탭(`\\t`)을 쓰면 본문과 겹칠 일이 거의 없고, 꺼낸 뒤 `(조각 - '\\t')`로 지운다.",
      "en": "If you use a tab (`\\t`) as the padding character of fixed-width fields, it almost never overlaps with the body, and after taking it out you erase it with `(piece - '\\t')`."
    },
    "detail": {
      "ko": "고정 폭 필드의 패딩 문자로 탭(`\\t`)을 쓰면 본문과 겹칠 일이 거의 없고, 꺼낸 뒤 `(조각 - '\\t')`로 지운다. `$` 같은 보이는 문자를 쓰는 HOST-08의 대안이다.",
      "en": "If you use a tab (`\\t`) as the padding character of fixed-width fields, it almost never overlaps with the body, and after taking it out you erase it with `(piece - '\\t')`. It is an alternative to HOST-08, which uses a visible character such as `$`."
    },
    "sources": "SLB 5장"
  },
  "HOST-35": {
    "id": "HOST-35",
    "category": "HOST",
    "page": "json-ui/screen-hosts-and-data",
    "anchor": "host-35",
    "proposal": true,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "제목이 `§r`처럼 정확 일치하는 값을 비교하는 규칙(TLM 제안)이 있다.",
      "en": "There is a rule (TLM proposal) that compares a title against an exactly matching value such as `§r`."
    },
    "detail": {
      "ko": "제목이 `§r`처럼 정확 일치하는 값을 비교하는 규칙(TLM 제안)이 있다. 포함 검사가 아니라 `(#title_text = '정확한 값')`으로 판별할 때는 제목 앞뒤에 서식 코드나 메타데이터가 붙으면 맞지 않는다는 함정을 함께 적는다(HOST-03의 보강).",
      "en": "There is a rule (TLM proposal) that compares a title against an exactly matching value such as `§r`. When detecting by `(#title_text = 'exact value')` rather than a containment check, it also notes the pitfall that it does not match if formatting codes or metadata are attached before or after the title (a reinforcement of HOST-03)."
    },
    "sources": "병합 보고서 TLM, EasyUIBuilder"
  },
  "HOST-36": {
    "id": "HOST-36",
    "category": "HOST",
    "page": "json-ui/screen-hosts-and-data",
    "anchor": "host-36",
    "proposal": true,
    "evidence": [
      "바닐라",
      "미검증"
    ],
    "title": {
      "ko": "화면 속성의 뜻: `render_only_when_topmost`(false면 덮여도 그림), `always_accepts_input`(true면 맨 위가 아니어도 입력), `absorbs_input`(false면 입력이 게임으로 감), `is_showing_menu`(false면 HUD처럼 상주 UI), `should_steal_mouse`(true면 커",
      "en": "Meaning of screen properties: `render_only_when_topmost` (if false, draws even when covered), `always_accepts_input` (if true, input even when not on top), `absorbs_input` (if false, input goes to the"
    },
    "detail": {
      "ko": "화면 속성의 뜻: `render_only_when_topmost`(false면 덮여도 그림), `always_accepts_input`(true면 맨 위가 아니어도 입력), `absorbs_input`(false면 입력이 게임으로 감), `is_showing_menu`(false면 HUD처럼 상주 UI), `should_steal_mouse`(true면 커서 숨김), `render_game_behind`, `low_frequency_rendering`(저빈도 렌더), `cache_screen`(다시 열 때 빠름), `close_on_player_hurt`(피해 시 닫힘), `load_screen_immediately`, `send_telemetry`. 바닐라는 이들을 대부분 기본값의 반대로 쓴다(HUD: `is_showing_menu: false`, `should_steal_mouse: true`, `absorbs_input: false`, `low_frequency_rendering: true`). 단 `should_steal_mouse`(false 3 / true 1)와 `low_frequency_rendering`(true 3 / false 1)은 양쪽 값이 다 나온다.",
      "en": "Meaning of screen properties: `render_only_when_topmost` (if false, draws even when covered), `always_accepts_input` (if true, input even when not on top), `absorbs_input` (if false, input goes to the game), `is_showing_menu` (if false, a resident UI like the HUD), `should_steal_mouse` (if true, hides the cursor), `render_game_behind`, `low_frequency_rendering` (low-frequency rendering), `cache_screen` (faster to reopen), `close_on_player_hurt` (closes on damage), `load_screen_immediately`, `send_telemetry`. Vanilla mostly uses the opposite of the default for these (HUD: `is_showing_menu: false`, `should_steal_mouse: true`, `absorbs_input: false`, `low_frequency_rendering: true`). But `should_steal_mouse` (false 3 / true 1) and `low_frequency_rendering` (true 3 / false 1) show both values."
    },
    "sources": "NetEase 문서, VN hud_screen.json:3574, debug_screen.json:44, toast_screen.json:1775"
  },
  "HOST-37": {
    "id": "HOST-37",
    "category": "HOST",
    "page": "json-ui/screen-hosts-and-data",
    "anchor": "host-37",
    "proposal": true,
    "evidence": [
      "바닐라"
    ],
    "title": {
      "ko": "내 HUD 레이어를 바닐라 `root_panel` 밖(`$screen_bg_content` 등)에 둘 때, 레이어 루트에 바닐라 `root_panel`과 같은 세 전역 바인딩(`#hud_visible`→`#visible`, `#hud_alpha`→`#alpha`, `#hud_propagate_alpha`→`#propagateAlpha`)을 달면 F1 숨김과",
      "en": "When putting my HUD layer outside vanilla `root_panel` (`$screen_bg_content`, etc.), if you attach to the layer root the same three global bindings as vanilla `root_panel` (`#hud_visible`->`#visible`,"
    },
    "detail": {
      "ko": "내 HUD 레이어를 바닐라 `root_panel` 밖(`$screen_bg_content` 등)에 둘 때, 레이어 루트에 바닐라 `root_panel`과 같은 세 전역 바인딩(`#hud_visible`→`#visible`, `#hud_alpha`→`#alpha`, `#hud_propagate_alpha`→`#propagateAlpha`)을 달면 F1 숨김과 설정의 HUD 투명도를 따른다.",
      "en": "When putting my HUD layer outside vanilla `root_panel` (`$screen_bg_content`, etc.), if you attach to the layer root the same three global bindings as vanilla `root_panel` (`#hud_visible`->`#visible`, `#hud_alpha`->`#alpha`, `#hud_propagate_alpha`->`#propagateAlpha`), it follows the F1 hiding and the HUD opacity setting."
    },
    "sources": "VN hud_screen.json:3555, NetEase 문서"
  },
  "HOST-38": {
    "id": "HOST-38",
    "category": "HOST",
    "page": "json-ui/screen-hosts-and-data",
    "anchor": "host-38",
    "proposal": true,
    "evidence": [
      "바닐라"
    ],
    "title": {
      "ko": "`common.base_screen`의 `$screen_content`는 safezone 행렬 안(`variables_button_mappings_and_controls/safezone_screen_matrix/inner_matrix/safezone_screen_panel/root_screen_panel`)에 붙어 화면 안전 영역을 지키고, `$screen",
      "en": "The `$screen_content` of `common.base_screen` attaches inside the safezone matrix (`variables_button_mappings_and_controls/safezone_screen_matrix/inner_matrix/safezone_screen_panel/root_screen_panel`)"
    },
    "detail": {
      "ko": "`common.base_screen`의 `$screen_content`는 safezone 행렬 안(`variables_button_mappings_and_controls/safezone_screen_matrix/inner_matrix/safezone_screen_panel/root_screen_panel`)에 붙어 화면 안전 영역을 지키고, `$screen_bg_content`는 그 밖에 붙는다. 열기·닫기 애니메이션은 `$screen_animations`로 바꾼다: 기본은 offset+fade 8개, `[]`이면 없음, `\"$background_animations\"`면 alpha만(HUD는 fade 4개). (본문 HOST-43이 같은 변수를 실측했다.)",
      "en": "The `$screen_content` of `common.base_screen` attaches inside the safezone matrix (`variables_button_mappings_and_controls/safezone_screen_matrix/inner_matrix/safezone_screen_panel/root_screen_panel`) to respect the screen safe zone, and `$screen_bg_content` attaches outside it. The open and close animations are changed with `$screen_animations`: the default is 8 of offset+fade, `[]` means none, and `\"$background_animations\"` is alpha only (the HUD has 4 fades). (The HOST-43 in the body measured the same variable.)"
    },
    "sources": "VN ui_common.json:6350·6747, hud_screen.json:3580, debug_screen.json:54"
  },
  "HOST-39": {
    "id": "HOST-39",
    "category": "HOST",
    "page": "json-ui/screen-hosts-and-data",
    "anchor": "host-39",
    "proposal": true,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "리소스팩이 없을 때를 대비해 서버 폼의 `body`에 폴백 안내문(\"리소스팩이 꺼져 있어 기본 화면으로 보인다\")을 넣고, 커스텀 화면에서는 본문을 그리지 않는다.",
      "en": "In case there is no resource pack, put a fallback notice in the server form `body` (\"The resource pack is off, so the default screen is shown\") and do not draw the body in the custom screen."
    },
    "detail": {
      "ko": "리소스팩이 없을 때를 대비해 서버 폼의 `body`에 폴백 안내문(\"리소스팩이 꺼져 있어 기본 화면으로 보인다\")을 넣고, 커스텀 화면에서는 본문을 그리지 않는다. 제목 플래그는 글자마다 `§`를 붙여 숨긴다(HOST-34 반영안). 데이터 전용 버튼에는 동작 없음(`kind: none`)을 매핑해 기본 화면에서 눌려도 무해하게 한다.",
      "en": "In case there is no resource pack, put a fallback notice in the server form `body` (\"The resource pack is off, so the default screen is shown\") and do not draw the body in the custom screen. Hide the title flag by attaching `§` to every character (HOST-34 proposal). Map data-only buttons to no action (`kind: none`) so that pressing them on the default screen is harmless."
    },
    "sources": "upgrader protocol.js"
  },
  "HOST-40": {
    "id": "HOST-40",
    "category": "HOST",
    "page": "json-ui/screen-hosts-and-data",
    "anchor": "host-40",
    "proposal": true,
    "evidence": [
      "작동팩",
      "미검증"
    ],
    "title": {
      "ko": "다단계 화면(선택 → 연출 → 결과)은 단계마다 제목 접미 코드(`MARKER + '§1'/'§2'/'§3'`)를 바꾼 폼을 새로 열고, UI는 `(#title_text = MARKER§N)` 정확 일치로 단계 패널을 고른다.",
      "en": "For a multi-stage screen (choose -> effect -> result), open a new form with a changed title suffix code per stage (`MARKER + '§1'/'§2'/'§3'`), and the UI picks the stage panel with an exact match `(#t"
    },
    "detail": {
      "ko": "다단계 화면(선택 → 연출 → 결과)은 단계마다 제목 접미 코드(`MARKER + '§1'/'§2'/'§3'`)를 바꾼 폼을 새로 열고, UI는 `(#title_text = MARKER§N)` 정확 일치로 단계 패널을 고른다. 스크립트는 연출 시간이 지나면 `uiManager.closeAllForms(player)`로 닫고 다음 폼을 연다. 폼과 폼 사이에 게임 화면이 한 프레임 보일 수 있으므로 플레이어에게 보이는 상태 변화(인벤토리 등)는 다음 폼이 열린 뒤 몇 틱 뒤에 한다.",
      "en": "For a multi-stage screen (choose -> effect -> result), open a new form with a changed title suffix code per stage (`MARKER + '§1'/'§2'/'§3'`), and the UI picks the stage panel with an exact match `(#title_text = MARKER§N)`. The script closes with `uiManager.closeAllForms(player)` after the effect time and opens the next form. The game screen can show for one frame between forms, so make player-visible state changes (inventory, etc.) a few ticks after the next form opens."
    },
    "sources": "upgrader session.js"
  },
  "HOST-41": {
    "id": "HOST-41",
    "category": "HOST",
    "page": "json-ui/screen-hosts-and-data",
    "anchor": "host-41",
    "proposal": true,
    "evidence": [
      "작동팩",
      "미검증"
    ],
    "title": {
      "ko": "`hud_title_text`를 같은 경로에서 재선언하며 `alpha`를 상수로 덮으면 페이드·`destroy_at_end` 사슬이 사라져 타이틀이 다음 타이틀까지 남는다(고정 사이드바).",
      "en": "If you redeclare `hud_title_text` at the same path and override `alpha` with a constant, the fade and `destroy_at_end` chain disappear and the title stays until the next title (a fixed sidebar)."
    },
    "detail": {
      "ko": "`hud_title_text`를 같은 경로에서 재선언하며 `alpha`를 상수로 덮으면 페이드·`destroy_at_end` 사슬이 사라져 타이틀이 다음 타이틀까지 남는다(고정 사이드바). 바닐라 타이틀 표시는 잃으므로 지금은 HOST-27 방식(팩토리를 하나 더)을 우선한다. 2023년 팩 기준.",
      "en": "If you redeclare `hud_title_text` at the same path and override `alpha` with a constant, the fade and `destroy_at_end` chain disappear and the title stays until the next title (a fixed sidebar). It loses the vanilla title display, so for now prefer the HOST-27 method (one more factory). Based on a 2023 pack."
    },
    "sources": "small-packs, VN hud_screen.json:2267-2273"
  },
  "HOST-42": {
    "id": "HOST-42",
    "category": "HOST",
    "page": "json-ui/screen-hosts-and-data",
    "anchor": "host-42",
    "proposal": true,
    "evidence": [
      "작동팩",
      "미검증"
    ],
    "title": {
      "ko": "스코어보드 사이드바 목표의 표시 이름(`#objective_sidebar_name`)을 서버 → UI 채널로 쓸 수 있다: 이름이 정해진 값이면 사이드바 모양을 바꾼다.",
      "en": "The display name of a scoreboard sidebar objective (`#objective_sidebar_name`) can be used as a server -> UI channel: if the name is a set value, the sidebar look changes."
    },
    "detail": {
      "ko": "스코어보드 사이드바 목표의 표시 이름(`#objective_sidebar_name`)을 서버 → UI 채널로 쓸 수 있다: 이름이 정해진 값이면 사이드바 모양을 바꾼다. 사이드바 안에서도 `#hud_title_text_string` 전역 바인딩을 읽을 수 있다. 1.20.71 기준 팩이다.",
      "en": "The display name of a scoreboard sidebar objective (`#objective_sidebar_name`) can be used as a server -> UI channel: if the name is a set value, the sidebar look changes. The global binding `#hud_title_text_string` can also be read inside the sidebar. It is a pack based on 1.20.71."
    },
    "sources": "small-packs"
  },
  "HOST-43": {
    "id": "HOST-43",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-43",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "`third_party_server_screen`에 `\"$screen_animations\": []`, `\"$background_animations\": []`를 주면 폼이 애니메이션 없이 바로 나타난다. 창이 움직이는 동안 다음 폼이 오면 두 창이 겹쳐 보였고, 닫고 다시 여는 메뉴가 깜빡였다.",
      "en": "Giving `third_party_server_screen` `\"$screen_animations\": []` and `\"$background_animations\": []` makes the form appear immediately with no animation. When the next form arrived while the window was moving, the two windows appeared overlapped, and a menu that closes and reopens flickered."
    },
    "detail": {
      "ko": "`third_party_server_screen`에 `\"$screen_animations\": []`, `\"$background_animations\": []`를 주면 폼이 애니메이션 없이 바로 나타난다. 창이 움직이는 동안 다음 폼이 오면 두 창이 겹쳐 보였고, 닫고 다시 여는 메뉴가 깜빡였다.",
      "en": "If you give `third_party_server_screen` `\"$screen_animations\": []` and `\"$background_animations\": []`, the form appears immediately without animation. If the next form arrived while the window was moving, the two windows looked overlapped, and a menu that closes and reopens flickered."
    },
    "sources": "DF"
  },
  "HOST-44": {
    "id": "HOST-44",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-44",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "서버 폼 뒤에 화면 틀을 그리려면 `third_party_server_screen`의 `$screen_bg_content`(안전 영역 밖, 화면 전환 때 밀리지 않음)를 바꾼다. 폼이 열려 있는 동안 HUD는 그려지지 않으므로 HUD의 틀을 폼 위에서도 보이려면 여기에도 그린다. 이 자리의 `#title_text` 바인딩은 `once`로 두면 폼 내용이 오기 전에 평가돼 안 보였다.",
      "en": "To draw a screen frame behind a server form, change `$screen_bg_content` of `third_party_server_screen` (outside the safe area, not pushed on screen transitions). The HUD is not drawn while a form is open, so to show a HUD frame over the form, draw it here too. A `#title_text` binding in this place set to `once` was evaluated before the form content arrived and did not show."
    },
    "detail": {
      "ko": "서버 폼 뒤에 화면 틀을 그리려면 `third_party_server_screen`의 `$screen_bg_content`(안전 영역 밖, 화면 전환 때 밀리지 않음)를 바꾼다. 폼이 열려 있는 동안 HUD는 그려지지 않으므로 HUD의 틀을 폼 위에서도 보이려면 여기에도 그린다. 이 자리의 `#title_text` 바인딩은 `once`로 두면 폼 내용이 오기 전에 평가돼 안 보였다.",
      "en": "To draw a screen frame behind a server form, change `$screen_bg_content` of `third_party_server_screen` (outside the safe zone, not pushed during screen transitions). The HUD is not drawn while a form is open, so to make the HUD's frame visible over a form, draw it here too. A `#title_text` binding in this place set to `once` was evaluated before the form content arrived and did not show."
    },
    "sources": "DF"
  },
  "HOST-45": {
    "id": "HOST-45",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-45",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "사이드바 스코어보드는 타이틀과 겹치지 않는 HUD 채널이다: 목표 이름에 표식, 줄마다 부분 표식을 붙이고 `scoreboard.scoreboard_sidebar`를 화면 전체 패널로 바꿔 부분마다 `scoreboard_players` 컬렉션 스택(`#scoreboard_sidebar_size` → `#collection_length`)으로 다른 자리에 그린다. 같은 글자 줄은 클라이언트가 합치므로 뒤에 `§r`을 붙여 구분하고, 15줄까지다.",
      "en": "The sidebar scoreboard is a HUD channel that does not overlap with titles: attach a mark to the objective name and partial marks to each line, replace `scoreboard.scoreboard_sidebar` with a whole-screen panel, and draw each part in a different place with a `scoreboard_players` collection stack (`#scoreboard_sidebar_size` to `#collection_length`). The client merges lines with the same text, so attach `§r` after to tell them apart, up to 15 lines."
    },
    "detail": {
      "ko": "사이드바 스코어보드는 타이틀과 겹치지 않는 HUD 채널이다: 목표 이름에 표식, 줄마다 부분 표식을 붙이고 `scoreboard.scoreboard_sidebar`를 화면 전체 패널로 바꿔 부분마다 `scoreboard_players` 컬렉션 스택(`#scoreboard_sidebar_size` → `#collection_length`)으로 다른 자리에 그린다. 같은 글자 줄은 클라이언트가 합치므로 뒤에 `§r`을 붙여 구분하고, 15줄까지다.",
      "en": "The sidebar scoreboard is a HUD channel that does not overlap with the title: attach a marker to the objective name and partial markers to each line, change `scoreboard.scoreboard_sidebar` to a whole-screen panel, and draw each part in a different place with a `scoreboard_players` collection stack (`#scoreboard_sidebar_size` -> `#collection_length`). The client merges lines with the same text, so distinguish them by appending `§r`, up to 15 lines."
    },
    "sources": "DF"
  },
  "HOST-46": {
    "id": "HOST-46",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-46",
    "proposal": false,
    "evidence": [
      "실측",
      "코드"
    ],
    "title": {
      "ko": "모달 폼 `content`에 `{\"type\":\"multiselect\",\"text\":…,\"options\":[문자열…],\"default\":[번호…]}`를 넣으면 1.26.52 클라이언트가 바닐라 UI로 그린다(`text`가 머리 버튼 글, 누르면 체크박스 목록). 응답 배열의 그 자리에는 고른 번호의 배열(`[0,2]`)이 오고, 하나도 고르지 않으면 `null`이 온다. 기본 체크는 단수형 `default`에 번호 배열로 주며, 바이너리 스키마에 적힌 `defaults`는 무시된다. 옵션 25개도 모두 그려졌고, 여러 개를 넣거나 다른 행과 섞어도 응답 자리는 `content` 순서를 따른다. Script API로는 보낼 수 없으므로 원시 `ModalFormRequest`를 보내는 서버(Dragonfly는 `form.Custom`에 못 넣어 원시 패킷으로)만 쓸 수 있다.",
      "en": "Putting `{\"type\":\"multiselect\",\"text\":...,\"options\":[strings...],\"default\":[numbers...]}` in a modal form `content` makes the 1.26.52 client draw it with the vanilla UI (`text` is the head button text, and pressing it gives a checkbox list). In that place of the response array comes an array of the chosen numbers (`[0,2]`), and `null` comes if none is chosen. The default checks are given as an array of numbers in the singular `default`, and `defaults` written in the binary schema is ignored. All 25 options were also drawn, and even with several, or mixed with other rows, the response position follows the `content` order. It cannot be sent through the Script API, so only a server that sends a raw `ModalFormRequest` can use it (Dragonfly cannot put it in `form.Custom`, so it uses a raw packet)."
    },
    "detail": {
      "ko": "모달 폼 `content`에 를 넣으면 1.26.52 클라이언트가 바닐라 UI로 그린다(`text`가 머리 버튼 글, 누르면 체크박스 목록). 응답 배열의 그 자리에는 고른 번호의 배열(`[0,2]`)이 오고, 하나도 고르지 않으면 `null`이 온다. 기본 체크는 단수형 `default`에 번호 배열로 주며, 바이너리 스키마에 적힌 `defaults`는 무시된다. 옵션 25개도 모두 그려졌고, 여러 개를 넣거나 다른 행과 섞어도 응답 자리는 `content` 순서를 따른다. Script API로는 보낼 수 없으므로 원시 `ModalFormRequest`를 보내는 서버(Dragonfly는 `form.Custom`에 못 넣어 원시 패킷으로)만 쓸 수 있다. `{실측, 코드}`",
      "en": "If you put in the modal form `content`, the 1.26.52 client draws it with vanilla UI (`text` is the head button text, and pressing it shows a checkbox list). At that position in the response array comes an array of chosen numbers (`[0,2]`), and `null` if none is chosen. The default checks are given as an array of numbers in the singular `default`, and `defaults` written in the binary schema is ignored. Even 25 options were all drawn, and even if you put several or mix with other rows, the response positions follow the `content` order. It cannot be sent with the Script API, so only servers that send a raw `ModalFormRequest` (Dragonfly cannot put it in `form.Custom`, so as a raw packet) can use it. `{measured, code}`"
    },
    "sources": "MS, NB-16"
  },
  "HOST-47": {
    "id": "HOST-47",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-47",
    "proposal": false,
    "evidence": [
      "바닐라"
    ],
    "title": {
      "ko": "1.26.60 프리뷰 바닐라는 `custom_multiselect`를 `option_generic`으로 감싸 위쪽 라벨(`#custom_text`)·툴팁을 두고 머리 버튼 글을 `#multiselect_option_text`로 바꾼다. 1.26.50 판에는 위쪽 라벨과 툴팁 자리가 없다. 이 행을 다시 그리거나 `custom_form` 팩토리를 바꾸는 팩은 `control_ids`에 `multiselect`를 넣고 판마다 다시 확인한다.",
      "en": "The 1.26.60 Preview vanilla wraps `custom_multiselect` in `option_generic` to add the upper label (`#custom_text`) and tooltip and changes the head button text to `#multiselect_option_text`. The 1.26.50 version has no place for the upper label and tooltip. A pack that redraws this row or changes the `custom_form` factory puts `multiselect` in `control_ids` and rechecks per version."
    },
    "detail": {
      "ko": "1.26.60 프리뷰 바닐라는 `custom_multiselect`를 `option_generic`으로 감싸 위쪽 라벨(`#custom_text`)·툴팁을 두고 머리 버튼 글을 `#multiselect_option_text`로 바꾼다. 1.26.50 판에는 위쪽 라벨과 툴팁 자리가 없다. 이 행을 다시 그리거나 `custom_form` 팩토리를 바꾸는 팩은 `control_ids`에 `multiselect`를 넣고 판마다 다시 확인한다.",
      "en": "The 1.26.60 preview vanilla wraps `custom_multiselect` in `option_generic` to add an upper label (`#custom_text`) and tooltip, and changes the head button text to `#multiselect_option_text`. The 1.26.50 version has no place for the upper label and tooltip. A pack that redraws this row or changes the `custom_form` factory should put `multiselect` in `control_ids` and recheck per version."
    },
    "sources": "MS, VN server_form.json:294·503"
  },
  "HOST-48": {
    "id": "HOST-48",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-48",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "`$container_title`(엔티티 nameTag)은 바인딩 식에는 못 쓰지만(HOST-19) `ignored`와 `visible` 속성 식에서는 비교된다. 정의에 `\"$copy\": \"$container_title\"`처럼 복사 변수를 두고 그 복사본을 비교한다. `ignored`는 부모 스코프에서 평가되므로(FILE-34) 복사 변수는 부모 컨트롤에 둔다. `ignored`로 고르면 이름이 다른 상자에서는 그 컨트롤이 만들어지지 않는다.",
      "en": "`$container_title` (the entity nameTag) cannot be used in binding expressions (HOST-19), but it can be compared in `ignored` and `visible` property expressions. Declare a copy variable such as `\"$copy\": \"$container_title\"` in the definition and compare the copy. `ignored` is evaluated in the parent scope (FILE-34), so the copy variable goes on the parent control. When picked with `ignored`, the control is not built for chests with another name."
    },
    "detail": {
      "ko": "`$container_title`(엔티티 nameTag)은 바인딩 식에는 못 쓰지만(HOST-19) `ignored`와 `visible` 속성 식에서는 비교된다. 정의에 `\"$copy\": \"$container_title\"`처럼 복사 변수를 두고 그 복사본을 비교한다. `ignored`는 부모 스코프에서 평가되므로(FILE-34) 복사 변수는 부모 컨트롤에 둔다. `ignored`로 고르면 이름이 다른 상자에서는 그 컨트롤이 만들어지지 않는다.",
      "en": "`$container_title` (the entity nameTag) cannot be used in binding expressions (HOST-19), but it can be compared in `ignored` and `visible` property expressions. Declare a copy variable such as `\"$copy\": \"$container_title\"` in the definition and compare the copy. `ignored` is evaluated in the parent scope (FILE-34), so the copy variable goes on the parent control. When picked with `ignored`, the control is not built for chests with another name."
    },
    "sources": "E2048"
  },
  "HOST-49": {
    "id": "HOST-49",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-49",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "상자 화면에 창을 넣을 때는 `small_chest_screen`을 재선언하지 않고 바닐라 상자 패널(`chest.small_chest_panel`, `pocket_containers.panel`)의 `controls`에 `modifications`로 넣는다. 같은 화면을 재선언한 애드온 둘은 팩 순서로 한쪽만 쓰였다(MOD-12, MOD-13). 바닐라를 숨기는 속성은 여러 팩이 같은 값을 바이트까지 똑같이 쓰면 팩 순서와 상관없이 같은 결과가 된다. 위키 예제는 공통 접두사 `§b§w`를 `('%.6s' * $복사)`로 비교하는 같은 값을 쓰고, 네 예제를 한 월드에 켰을 때 엔티티마다 자기 창이 열렸다.",
      "en": "To put a window into the chest screen, do not redeclare `small_chest_screen`; insert it into the `controls` of the vanilla chest panels (`chest.small_chest_panel`, `pocket_containers.panel`) with `modifications`. With two add-ons that redeclared the same screen, only one was used, by pack order (MOD-12, MOD-13). When several packs write the vanilla-hiding properties with byte-identical values, the result is the same whatever the pack order. The wiki examples all write the same values, comparing the shared prefix `§b§w` with `('%.6s' * $copy)`, and with the four examples on in one world each entity opened its own window."
    },
    "detail": {
      "ko": "상자 화면에 창을 넣을 때는 `small_chest_screen`을 재선언하지 않고 바닐라 상자 패널(`chest.small_chest_panel`, `pocket_containers.panel`)의 `controls`에 `modifications`로 넣는다. 같은 화면을 재선언한 애드온 둘은 팩 순서로 한쪽만 쓰였다(MOD-12, MOD-13). 바닐라를 숨기는 속성은 여러 팩이 같은 값을 바이트까지 똑같이 쓰면 팩 순서와 상관없이 같은 결과가 된다. 위키 예제는 공통 접두사 `§b§w`를 `('%.6s' * $복사)`로 비교하는 같은 값을 쓰고, 네 예제를 한 월드에 켰을 때 엔티티마다 자기 창이 열렸다.",
      "en": "To put a window into the chest screen, do not redeclare `small_chest_screen`; insert it into the `controls` of the vanilla chest panels (`chest.small_chest_panel`, `pocket_containers.panel`) with `modifications`. With two add-ons that redeclared the same screen, only one was used, by pack order (MOD-12, MOD-13). When several packs write the vanilla-hiding properties with byte-identical values, the result is the same whatever the pack order. The wiki examples all write the same values, comparing the shared prefix `§b§w` with `('%.6s' * $copy)`, and with the four examples on in one world each entity opened its own window."
    },
    "sources": "E2048"
  },
  "HOST-50": {
    "id": "HOST-50",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-50",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "바닐라 상자 칸을 `visible: false`로 숨기고 그 자리에 창을 그리면, 칸 아이템이 바뀌는 순간 `container_items` 격자의 칸 그림이 한 프레임 동안 다른 컨트롤 위에 회색으로 그려졌다. 격자가 없을 때도, `common.pocket_ui_container_item` 칸 격자일 때도 깜빡였다. 창 뒤에 빈 패널 칸 27개짜리 `container_items` `grid`를 두면 깜빡이지 않았다. 원인은 모른다.",
      "en": "When the vanilla chest cells are hidden with `visible: false` and a window is drawn in their place, at the moment a slot item changes the cells of a `container_items` grid were drawn grey above other controls for one frame. It flickered with no grid and with a grid of `common.pocket_ui_container_item` cells. With a `container_items` `grid` of 27 empty panel cells behind the window there was no flicker. The cause is not known."
    },
    "detail": {
      "ko": "바닐라 상자 칸을 `visible: false`로 숨기고 그 자리에 창을 그리면, 칸 아이템이 바뀌는 순간 `container_items` 격자의 칸 그림이 한 프레임 동안 다른 컨트롤 위에 회색으로 그려졌다. 격자가 없을 때도, `common.pocket_ui_container_item` 칸 격자일 때도 깜빡였다. 창 뒤에 빈 패널 칸 27개짜리 `container_items` `grid`를 두면 깜빡이지 않았다. 원인은 모른다.",
      "en": "When the vanilla chest cells are hidden with `visible: false` and a window is drawn in their place, at the moment a slot item changes the cells of a `container_items` grid were drawn grey above other controls for one frame. It flickered with no grid and with a grid of `common.pocket_ui_container_item` cells. With a `container_items` `grid` of 27 empty panel cells behind the window there was no flicker. The cause is not known."
    },
    "sources": "E2048"
  },
  "HOST-51": {
    "id": "HOST-51",
    "category": "HOST",
    "page": "reference/rules",
    "anchor": "host-51",
    "proposal": false,
    "evidence": [
      "바닐라",
      "실측"
    ],
    "title": {
      "ko": "여러 팩의 서버 폼 화면을 한 월드에서 쓰려면 `third_party_server_screen`을 재선언하지 않고 `main_screen_content`의 `controls`에 `modifications`로 자기 라우터를 넣는다. 바닐라 `main_screen_content`는 `size: [0, 0]`이므로 `[\"100%\", \"100%\"]`로 넓힌다. 위키 예제는 제목을 공통 접두사 `§b§w`로 시작하게 하고, 바닐라 `long_form`을 `(not (('%.6s' * #title_text) = '§b§w'))`로 숨기는 `server_form.json`을 라우터 한 줄 말고는 바이트까지 같게 쓴다. 다섯 예제를 한 월드에 함께 켰을 때 예제마다 자기 화면이 열리고 동작했으며, 이 자리의 라우터 안에서도 화면이 열자마자 채워졌다(COL-47).",
      "en": "To use the server form screens of several packs in one world, do not redeclare `third_party_server_screen`; insert your own router into the `controls` of `main_screen_content` with `modifications`. Vanilla `main_screen_content` has `size: [0, 0]`, so widen it to `[\"100%\", \"100%\"]`. The wiki examples start every title with the shared prefix `§b§w` and write a `server_form.json` that hides vanilla `long_form` with `(not (('%.6s' * #title_text) = '§b§w'))`, byte-identical apart from the one router line. With the five examples on together in one world, each opened its own screen and worked, and the screens filled as soon as they opened with the router in this place too (COL-47)."
    },
    "detail": {
      "ko": "여러 팩의 서버 폼 화면을 한 월드에서 쓰려면 `third_party_server_screen`을 재선언하지 않고 `main_screen_content`의 `controls`에 `modifications`로 자기 라우터를 넣는다. 바닐라 `main_screen_content`는 `size: [0, 0]`이므로 `[\"100%\", \"100%\"]`로 넓힌다. 위키 예제는 제목을 공통 접두사 `§b§w`로 시작하게 하고, 바닐라 `long_form`을 `(not (('%.6s' * #title_text) = '§b§w'))`로 숨기는 `server_form.json`을 라우터 한 줄 말고는 바이트까지 같게 쓴다. 다섯 예제를 한 월드에 함께 켰을 때 예제마다 자기 화면이 열리고 동작했으며, 이 자리의 라우터 안에서도 화면이 열자마자 채워졌다(COL-47).",
      "en": "To use the server form screens of several packs in one world, do not redeclare `third_party_server_screen`; insert your own router into the `controls` of `main_screen_content` with `modifications`. Vanilla `main_screen_content` has `size: [0, 0]`, so widen it to `[\"100%\", \"100%\"]`. The wiki examples start every title with the shared prefix `§b§w` and write a `server_form.json` that hides vanilla `long_form` with `(not (('%.6s' * #title_text) = '§b§w'))`, byte-identical apart from the one router line. With the five examples on together in one world, each opened its own screen and worked, and the screens filled as soon as they opened with the router in this place too (COL-47)."
    },
    "sources": "VN server_form.json:22, 모바일 1.26.63 실측"
  },
  "INP-01": {
    "id": "INP-01",
    "category": "INP",
    "page": "reference/rules",
    "anchor": "inp-01",
    "proposal": false,
    "evidence": [
      "바닐라"
    ],
    "title": {
      "ko": "버튼은 상태별 자식 컨트롤을 `default_control`, `hover_control`, `pressed_control`, `locked_control`로 지정한다. 직접 만들기보다 바닐라 템플릿(`common_buttons.light_text_button` 등)을 `$pressed_button_name`, `$button_text` 같은 변수로 재사용하는 것이 보통이다.",
      "en": "A button specifies per-state child controls with `default_control`, `hover_control`, `pressed_control`, and `locked_control`. It is common to reuse a vanilla template (`common_buttons.light_text_button` and so on) with variables such as `$pressed_button_name` and `$button_text` rather than building one yourself."
    },
    "detail": {
      "ko": "버튼은 상태별 자식 컨트롤을 `default_control`, `hover_control`, `pressed_control`, `locked_control`로 지정한다. 직접 만들기보다 바닐라 템플릿(`common_buttons.light_text_button` 등)을 `$pressed_button_name`, `$button_text` 같은 변수로 재사용하는 것이 보통이다.",
      "en": "A button specifies per-state child controls with `default_control`, `hover_control`, `pressed_control` and `locked_control`. Usually, rather than building one yourself, you reuse a vanilla template (`common_buttons.light_text_button`, etc.) with variables such as `$pressed_button_name` and `$button_text`."
    },
    "sources": "VN default_control 34·hover_control 42·pressed_control 36·locked_control 18회, VN server_form.json:211"
  },
  "INP-02": {
    "id": "INP-02",
    "category": "INP",
    "page": "reference/rules",
    "anchor": "inp-02",
    "proposal": false,
    "evidence": [
      "바닐라"
    ],
    "title": {
      "ko": "`button_mappings`의 항목은 `from_button_id`, `to_button_id`, `mapping_type`(`pressed` 599, `global` 536, `focused` 145, `double_pressed` 20), 선택적으로 `input_mode_condition`(`gamepad`, `gamepad_and_not_gaze`, `not_gamepad`)과 `ignored`를 가진다.",
      "en": "An entry of `button_mappings` has `from_button_id`, `to_button_id`, `mapping_type` (`pressed` 599, `global` 536, `focused` 145, `double_pressed` 20), and optionally `input_mode_condition` (`gamepad`, `gamepad_and_not_gaze`, `not_gamepad`) and `ignored`."
    },
    "detail": {
      "ko": "`button_mappings`의 항목은 `from_button_id`, `to_button_id`, `mapping_type`(`pressed` 599, `global` 536, `focused` 145, `double_pressed` 20), 선택적으로 `input_mode_condition`(`gamepad`, `gamepad_and_not_gaze`, `not_gamepad`)과 `ignored`를 가진다.",
      "en": "An item of `button_mappings` has `from_button_id`, `to_button_id`, `mapping_type` (`pressed` 599, `global` 536, `focused` 145, `double_pressed` 20), and optionally `input_mode_condition` (`gamepad`, `gamepad_and_not_gaze`, `not_gamepad`) and `ignored`."
    },
    "sources": "VN, 부록B"
  },
  "INP-03": {
    "id": "INP-03",
    "category": "INP",
    "page": "reference/rules",
    "anchor": "inp-03",
    "proposal": false,
    "evidence": [
      "바닐라",
      "작동팩",
      "실측"
    ],
    "title": {
      "ko": "화면별로 엔진이 알아듣는 버튼 ID가 정해져 있다.",
      "en": "Each screen has its own button IDs the engine understands."
    },
    "detail": {
      "ko": "화면별로 엔진이 알아듣는 버튼 ID가 정해져 있다.",
      "en": "The button IDs the engine understands are fixed per screen."
    },
    "sources": "VN server_form.json:212·321, npc_interact_screen.json:1222, BC-S14"
  },
  "INP-04": {
    "id": "INP-04",
    "category": "INP",
    "page": "reference/rules",
    "anchor": "inp-04",
    "proposal": false,
    "evidence": [
      "코드",
      "작동팩",
      "바닐라"
    ],
    "title": {
      "ko": "폼 엔트리를 누르게 하려면 `button.menu_select → button.form_button_click`(`pressed`)과 `button.menu_ok → button.form_button_click`(`focused`) 두 매핑을 주고, 버튼 자신에 `collection_details` 바인딩을 둔다(COL-04).",
      "en": "To make a form entry pressable, give two mappings, `button.menu_select` to `button.form_button_click` (`pressed`) and `button.menu_ok` to `button.form_button_click` (`focused`), and put a `collection_details` binding on the button itself (COL-04)."
    },
    "detail": {
      "ko": "폼 엔트리를 누르게 하려면 `button.menu_select → button.form_button_click`(`pressed`)과 `button.menu_ok → button.form_button_click`(`focused`) 두 매핑을 주고, 버튼 자신에 `collection_details` 바인딩을 둔다(COL-04). , BA 5장, VN)",
      "en": "To make a form entry pressable, give the two mappings `button.menu_select -> button.form_button_click` (`pressed`) and `button.menu_ok -> button.form_button_click` (`focused`), and put a `collection_details` binding on the button itself (COL-04). , BA chapter 5, VN)"
    },
    "sources": "BC 4.1-(3), BA 5장, VN"
  },
  "INP-05": {
    "id": "INP-05",
    "category": "INP",
    "page": "reference/rules",
    "anchor": "inp-05",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "호버(툴팁)만 감지하고 제출하지 않는 버튼은 `button_mappings`를 비우거나 `$pressed_button_name`을 엔진이 모르는 값(`\"unset\"`)으로 두고, `focus_enabled`, `focus_magnet_enabled`로 포커스만 받는다. 클릭 소리를 없애려면 `sound_volume: 0`.",
      "en": "A button that only detects hover (tooltip) and does not submit empties `button_mappings` or sets `$pressed_button_name` to a value the engine does not know (`\"unset\"`) and receives only focus with `focus_enabled` and `focus_magnet_enabled`. To remove the click sound, use `sound_volume: 0`."
    },
    "detail": {
      "ko": "호버(툴팁)만 감지하고 제출하지 않는 버튼은 `button_mappings`를 비우거나 `$pressed_button_name`을 엔진이 모르는 값(`\"unset\"`)으로 두고, `focus_enabled`, `focus_magnet_enabled`로 포커스만 받는다. 클릭 소리를 없애려면 `sound_volume: 0`.",
      "en": "For a button that only detects hover (a tooltip) and does not submit, empty `button_mappings` or set `$pressed_button_name` to a value the engine does not know (`\"unset\"`) and receive only focus with `focus_enabled` and `focus_magnet_enabled`. To remove the click sound, `sound_volume: 0`."
    },
    "sources": "BA 5장, AP 4.8"
  },
  "INP-06": {
    "id": "INP-06",
    "category": "INP",
    "page": "reference/rules",
    "anchor": "inp-06",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "버튼의 기본/호버/눌림 상태 컨트롤의 가시성은 버튼 상태 머신이 소유한다. 앱의 가시성 게이트는 상태 컨트롤 안쪽이나 버튼 바깥에 두고, 같은 컨트롤을 바인딩과 상태 머신이 함께 건드리지 않게 한다.",
      "en": "The visibility of a button's default/hover/pressed state controls is owned by the button state machine. Put the app's visibility gates inside the state control or outside the button, and do not let bindings and the state machine both touch the same control."
    },
    "detail": {
      "ko": "버튼의 기본/호버/눌림 상태 컨트롤의 가시성은 버튼 상태 머신이 소유한다. 앱의 가시성 게이트는 상태 컨트롤 안쪽이나 버튼 바깥에 두고, 같은 컨트롤을 바인딩과 상태 머신이 함께 건드리지 않게 한다. )",
      "en": "The visibility of a button's default, hover and pressed state controls is owned by the button state machine. Put the app's visibility gates inside the state controls or outside the button, and do not let bindings and the state machine touch the same control. )"
    },
    "sources": "BC-rules, BC 4.1-(6)"
  },
  "INP-07": {
    "id": "INP-07",
    "category": "INP",
    "page": "reference/rules",
    "anchor": "inp-07",
    "proposal": false,
    "evidence": [
      "코드",
      "실측"
    ],
    "title": {
      "ko": "비활성 버튼은 진짜 버튼(enabled)과 같은 생김새의 비활성 사본(disabled)을 겹쳐 두고, 같은 데이터로 하나만 보이게 한다(`binding_condition: \"always\"`). 비활성 사본은 포인터 아래에서도 비활성 모양을 유지해야 한다.",
      "en": "For a disabled button, stack a disabled copy that looks the same as the real (enabled) button and show only one from the same data (`binding_condition: \"always\"`). The disabled copy must keep its disabled look even under the pointer."
    },
    "detail": {
      "ko": "비활성 버튼은 진짜 버튼(enabled)과 같은 생김새의 비활성 사본(disabled)을 겹쳐 두고, 같은 데이터로 하나만 보이게 한다(`binding_condition: \"always\"`). 비활성 사본은 포인터 아래에서도 비활성 모양을 유지해야 한다. , BC-rules)",
      "en": "For a disabled button, overlay a disabled copy that looks the same as the real (enabled) button and show only one with the same data (`binding_condition: \"always\"`). The disabled copy must keep its disabled look even under the pointer. , BC-rules)"
    },
    "sources": "BC 4.1-(6), BC-rules"
  },
  "INP-08": {
    "id": "INP-08",
    "category": "INP",
    "page": "reference/rules",
    "anchor": "inp-08",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "상태 컨트롤 안의 내용 레이어를 배경보다 높게 준다(bedrock-core 관례: 배경 1, 캡션·아이콘 12).",
      "en": "Give the content layer inside a state control a higher layer than the background (bedrock-core convention: background 1, caption and icon 12)."
    },
    "detail": {
      "ko": "상태 컨트롤 안의 내용 레이어를 배경보다 높게 준다(bedrock-core 관례: 배경 1, 캡션·아이콘 12).",
      "en": "Give the content layers inside state controls a higher value than the background (bedrock-core convention: background 1, caption and icon 12)."
    },
    "sources": "BC 6.5-3, BC-rules"
  },
  "INP-09": {
    "id": "INP-09",
    "category": "INP",
    "page": "reference/rules",
    "anchor": "inp-09",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "버튼 템플릿 안에서는 버튼 상태 변수를 식에 쓸 수 있다: `\"visible\": \"($hover_state or $pressed_state)\"`.",
      "en": "Inside a button template, button state variables can be used in expressions: `\"visible\": \"($hover_state or $pressed_state)\"`."
    },
    "detail": {
      "ko": "버튼 템플릿 안에서는 버튼 상태 변수를 식에 쓸 수 있다: `\"visible\": \"($hover_state or $pressed_state)\"`.",
      "en": "Inside a button template, button state variables can be used in expressions: `\"visible\": \"($hover_state or $pressed_state)\"`."
    },
    "sources": "AP 4.8"
  },
  "INP-10": {
    "id": "INP-10",
    "category": "INP",
    "page": "reference/rules",
    "anchor": "inp-10",
    "proposal": false,
    "evidence": [
      "실측",
      "바닐라"
    ],
    "title": {
      "ko": "토글은 현재 상태가 가리키는 자식 하나만 그린다. 정의하지 않은 상태(예: hover)로 들어가면 컨트롤이 사라지므로 8개 상태를 모두 정의한다.",
      "en": "A toggle draws only one child, the one the current state points to. Entering an undefined state (for example hover) makes the control disappear, so define all 8 states."
    },
    "detail": {
      "ko": "토글은 현재 상태가 가리키는 자식 하나만 그린다. 정의하지 않은 상태(예: hover)로 들어가면 컨트롤이 사라지므로 8개 상태를 모두 정의한다.",
      "en": "A toggle draws only one child, the one the current state points to. If it enters an undefined state (for example hover), the control disappears, so define all 8 states."
    },
    "sources": "BC-S4, VN 8개 이름 각 2회 이상"
  },
  "INP-11": {
    "id": "INP-11",
    "category": "INP",
    "page": "reference/rules",
    "anchor": "inp-11",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "클릭이 동작하려면 `toggle_on_button`, `toggle_off_button`과 `button_mappings`(`button.menu_select`·`button.menu_ok`)가 필요하다. 이것이 없으면 그려지기만 하고 눌리지 않는다.",
      "en": "For a click to work, `toggle_on_button`, `toggle_off_button`, and `button_mappings` (`button.menu_select` and `button.menu_ok`) are needed. Without them it only draws and cannot be pressed."
    },
    "detail": {
      "ko": "클릭이 동작하려면 `toggle_on_button`, `toggle_off_button`과 `button_mappings`(`button.menu_select`·`button.menu_ok`)가 필요하다. 이것이 없으면 그려지기만 하고 눌리지 않는다.",
      "en": "For clicking to work, `toggle_on_button`, `toggle_off_button` and `button_mappings` (`button.menu_select` and `button.menu_ok`) are needed. Without them it is only drawn and cannot be pressed."
    },
    "sources": "BC-S4"
  },
  "INP-12": {
    "id": "INP-12",
    "category": "INP",
    "page": "reference/rules",
    "anchor": "inp-12",
    "proposal": false,
    "evidence": [
      "바닐라",
      "실측"
    ],
    "title": {
      "ko": "라디오 그룹은 `toggle_name`(그룹 이름), `radio_toggle_group: true`, `toggle_group_forced_index`, `toggle_group_default_selected`로 만든다.",
      "en": "A radio group is made with `toggle_name` (the group name), `radio_toggle_group: true`, `toggle_group_forced_index`, and `toggle_group_default_selected`."
    },
    "detail": {
      "ko": "라디오 그룹은 `toggle_name`(그룹 이름), `radio_toggle_group: true`, `toggle_group_forced_index`, `toggle_group_default_selected`로 만든다.",
      "en": "A radio group is made with `toggle_name` (the group name), `radio_toggle_group: true`, `toggle_group_forced_index` and `toggle_group_default_selected`."
    },
    "sources": "VN radio_toggle_group 59·toggle_group_forced_index 210·toggle_group_default_selected 24회, BC 5장"
  },
  "INP-13": {
    "id": "INP-13",
    "category": "INP",
    "page": "reference/rules",
    "anchor": "inp-13",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "스크립트가 필요 없는 탭: 라디오 토글 그룹을 만들고 탭 내용을 각 토글의 `checked` 상태 컨트롤 안에 넣는다. 바깥에서 상태를 관찰할 필요가 없어 서버에 아무것도 보내지 않는다. 액션 폼 아래와 `modifications`로 넣은 상자 화면 양쪽에서 동작했다.",
      "en": "Tabs that need no script: make a radio toggle group and put the tab content inside each toggle's `checked` state control. There is no need to observe state from outside, so nothing is sent to the server. It worked both under an action form and on a chest screen inserted with `modifications`."
    },
    "detail": {
      "ko": "스크립트가 필요 없는 탭: 라디오 토글 그룹을 만들고 탭 내용을 각 토글의 `checked` 상태 컨트롤 안에 넣는다. 바깥에서 상태를 관찰할 필요가 없어 서버에 아무것도 보내지 않는다. 액션 폼 아래와 `modifications`로 넣은 상자 화면 양쪽에서 동작했다.",
      "en": "Tabs that need no script: make a radio toggle group and put the tab content inside each toggle's `checked` state control. There is no need to observe the state from outside, so nothing is sent to the server. It worked both under an action form and on a chest screen inserted with `modifications`."
    },
    "sources": "BC-S4, BC 5장"
  },
  "INP-14": {
    "id": "INP-14",
    "category": "INP",
    "page": "reference/rules",
    "anchor": "inp-14",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "같은 forced index를 공유하는 수동 라디오 피어끼리는 상태가 믿을 만하게 미러링되지 않는다. 각 입력은 자기 상태를 읽는다. 네이티브(모달 폼) 라디오는 그룹의 컬렉션 스코프를 공유하므로, 폼에서 온 값은 별도 데이터 소스로 읽고 라디오는 그 인덱스 컬렉션 아이템 바깥에 둔다.",
      "en": "Manual radio peers that share the same forced index do not mirror state reliably. Each input reads its own state. Native (modal form) radios share the group's collection scope, so read values from the form with a separate data source and put the radios outside that index collection item."
    },
    "detail": {
      "ko": "같은 forced index를 공유하는 수동 라디오 피어끼리는 상태가 믿을 만하게 미러링되지 않는다. 각 입력은 자기 상태를 읽는다. 네이티브(모달 폼) 라디오는 그룹의 컬렉션 스코프를 공유하므로, 폼에서 온 값은 별도 데이터 소스로 읽고 라디오는 그 인덱스 컬렉션 아이템 바깥에 둔다.",
      "en": "Between manual radio peers that share the same forced index, state is not mirrored reliably. Each input reads its own state. A native (modal form) radio shares the group's collection scope, so read values coming from the form with a separate data source and put the radio outside that index collection item."
    },
    "sources": "BC 6.7-3·4, BC-rules"
  },
  "INP-15": {
    "id": "INP-15",
    "category": "INP",
    "page": "reference/rules",
    "anchor": "inp-15",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "접기/펼치기(Disclosure)는 토글 하나와, 그 토글 상태를 따라 보이고 숨는 형제로 만든다. 접힌 행이 아래를 끌어올리는 것은 스택 패널이 숨은 자식에 공간을 주지 않는 성질(LAY-04) 덕이다.",
      "en": "Collapse/expand (Disclosure) is made of one toggle and siblings that show and hide following that toggle's state. A collapsed row pulling what is below up is thanks to the property that a stack panel gives hidden children no space (LAY-04)."
    },
    "detail": {
      "ko": "접기/펼치기(Disclosure)는 토글 하나와, 그 토글 상태를 따라 보이고 숨는 형제로 만든다. 접힌 행이 아래를 끌어올리는 것은 스택 패널이 숨은 자식에 공간을 주지 않는 성질(LAY-04) 덕이다.",
      "en": "Collapse/expand (Disclosure) is made with one toggle and a sibling that shows and hides following that toggle's state. A collapsed row pulling what is below up is thanks to the property that a stack panel gives no space to hidden children (LAY-04)."
    },
    "sources": "BC 5장"
  },
  "INP-16": {
    "id": "INP-16",
    "category": "INP",
    "page": "reference/rules",
    "anchor": "inp-16",
    "proposal": false,
    "evidence": [
      "작동팩",
      "미검증"
    ],
    "title": {
      "ko": "HUD에 그린 버튼이 호버와 스크롤을 받으려면 `hud_screen`에 `always_accepts_input: true`가 필요하다. 마우스에서만 확인되었고 터치·컨트롤러에서 호버가 되는지는 확인되지 않았다.",
      "en": "For a button drawn in the HUD to receive hover and scrolling, `always_accepts_input: true` is needed on `hud_screen`. It was confirmed only with a mouse, and whether hover works on touch and controller was not confirmed."
    },
    "detail": {
      "ko": "HUD에 그린 버튼이 호버와 스크롤을 받으려면 `hud_screen`에 `always_accepts_input: true`가 필요하다. 마우스에서만 확인되었고 터치·컨트롤러에서 호버가 되는지는 확인되지 않았다.",
      "en": "For a button drawn on the HUD to receive hover and scrolling, `hud_screen` needs `always_accepts_input: true`. It was confirmed only with a mouse, and whether hover works with touch or a controller was not confirmed."
    },
    "sources": "AP 3.1"
  },
  "INP-17": {
    "id": "INP-17",
    "category": "INP",
    "page": "reference/rules",
    "anchor": "inp-17",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "상자 화면의 셀을 버튼처럼 쓰려면 모든 입력(클릭, 우클릭, 시프트클릭, Q, 더블클릭, 게임패드)을 `button.drop_one`으로 매핑한다. 누를 때마다 정확히 한 개가 떨어지고 커서는 변하지 않으며, 같은 틱에 `entitySpawn` → `entityItemDrop`(플레이어 포함) 순으로 이벤트가 온다.",
      "en": "To use chest screen cells like buttons, map all input (click, right click, shift click, Q, double click, gamepad) to `button.drop_one`. Exactly one item drops on each press, the cursor does not change, and in the same tick the events come in the order `entitySpawn`, then `entityItemDrop` (including the player)."
    },
    "detail": {
      "ko": "상자 화면의 셀을 버튼처럼 쓰려면 모든 입력(클릭, 우클릭, 시프트클릭, Q, 더블클릭, 게임패드)을 `button.drop_one`으로 매핑한다. 누를 때마다 정확히 한 개가 떨어지고 커서는 변하지 않으며, 같은 틱에 `entitySpawn` → `entityItemDrop`(플레이어 포함) 순으로 이벤트가 온다.",
      "en": "To use a chest screen cell like a button, map every input (click, right click, shift click, Q, double click, gamepad) to `button.drop_one`. Exactly one drops per press and the cursor does not change, and events arrive in the same tick in the order `entitySpawn` -> `entityItemDrop` (including the player)."
    },
    "sources": "BC-S14"
  },
  "INP-18": {
    "id": "INP-18",
    "category": "INP",
    "page": "reference/rules",
    "anchor": "inp-18",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "상자에서 커서로 아이템을 집게 하는 방식은 쓰지 않는다. 인벤토리가 가득 차면 눌림이 사라지고, 커서에 든 아이템은 엔진이 직접 그려 JSON UI로 숨길 수 없다.",
      "en": "Do not use the approach of picking up an item with the cursor in a chest. When the inventory is full the press disappears, and the item held on the cursor is drawn by the engine itself and cannot be hidden with JSON UI."
    },
    "detail": {
      "ko": "상자에서 커서로 아이템을 집게 하는 방식은 쓰지 않는다. 인벤토리가 가득 차면 눌림이 사라지고, 커서에 든 아이템은 엔진이 직접 그려 JSON UI로 숨길 수 없다. )",
      "en": "Do not use the approach of picking up items with the cursor in a chest. If the inventory is full the press disappears, and an item held by the cursor is drawn directly by the engine and cannot be hidden with JSON UI. )"
    },
    "sources": "BC-S13, BC 4.3-(4)"
  },
  "INP-19": {
    "id": "INP-19",
    "category": "INP",
    "page": "reference/rules",
    "anchor": "inp-19",
    "proposal": false,
    "evidence": [
      "바닐라",
      "미검증"
    ],
    "title": {
      "ko": "바닐라 토글 템플릿(`common_toggles.light_text_toggle` 등)은 `$toggle_view_binding_name`이 토글 컨트롤의 이름이 되므로, 다른 컨트롤이 `\"source_control_name\": \"<그 이름>\"`, `\"source_property_name\": \"#toggle_state\"`로 상태를 읽는다(바닐라 61회). `$toggle_name`은 필수지만 엔진이 아는 이름이 아니면 효과가 없다고 한다.",
      "en": "In vanilla toggle templates (`common_toggles.light_text_toggle` and so on), `$toggle_view_binding_name` becomes the name of the toggle control, so other controls read the state with `\"source_control_name\": \"<that name>\"` and `\"source_property_name\": \"#toggle_state\"` (61 times in vanilla). `$toggle_name` is required but reportedly has no effect unless it is a name the engine knows."
    },
    "detail": {
      "ko": "바닐라 토글 템플릿(`common_toggles.light_text_toggle` 등)은 `$toggle_view_binding_name`이 토글 컨트롤의 이름이 되므로, 다른 컨트롤이 `\"source_control_name\": \"<그 이름>\"`, `\"source_property_name\": \"#toggle_state\"`로 상태를 읽는다(바닐라 61회). `$toggle_name`은 필수지만 엔진이 아는 이름이 아니면 효과가 없다고 한다.",
      "en": "In vanilla toggle templates (`common_toggles.light_text_toggle`, etc.), `$toggle_view_binding_name` becomes the name of the toggle control, so another control reads the state with `\"source_control_name\": \"<that name>\"` and `\"source_property_name\": \"#toggle_state\"` (61 uses in vanilla). `$toggle_name` is required but is said to have no effect unless it is a name the engine knows."
    },
    "sources": "BW-btn, VN"
  },
  "INP-20": {
    "id": "INP-20",
    "category": "INP",
    "page": "reference/rules",
    "anchor": "inp-20",
    "proposal": false,
    "evidence": [
      "미검증",
      "바닐라"
    ],
    "title": {
      "ko": "애니메이션 이벤트(`play_event`, `start_event`)에 버튼 ID를 쓰면 그 버튼이 눌릴 때 재생된다: 버튼 `\"$pressed_button_name\": \"button.my_anim\"`, 애니메이션 `\"play_event\": \"button.my_anim\"`. 바닐라에도 `\"start_event\": \"button.menu_achievements\"`가 1회 있다. 엔진이 모르는 ID라 서버에는 아무것도 가지 않는다.",
      "en": "Using a button ID in an animation event (`play_event`, `start_event`) plays it when that button is pressed: button `\"$pressed_button_name\": \"button.my_anim\"`, animation `\"play_event\": \"button.my_anim\"`. Vanilla also has `\"start_event\": \"button.menu_achievements\"` once. It is an ID the engine does not know, so nothing goes to the server."
    },
    "detail": {
      "ko": "애니메이션 이벤트(`play_event`, `start_event`)에 버튼 ID를 쓰면 그 버튼이 눌릴 때 재생된다: 버튼 `\"$pressed_button_name\": \"button.my_anim\"`, 애니메이션 `\"play_event\": \"button.my_anim\"`. 바닐라에도 `\"start_event\": \"button.menu_achievements\"`가 1회 있다. 엔진이 모르는 ID라 서버에는 아무것도 가지 않는다.",
      "en": "If you use a button ID in an animation event (`play_event`, `start_event`), it plays when that button is pressed: button `\"$pressed_button_name\": \"button.my_anim\"`, animation `\"play_event\": \"button.my_anim\"`. Vanilla also has `\"start_event\": \"button.menu_achievements\"` once. It is an ID the engine does not know, so nothing goes to the server."
    },
    "sources": "BW-btn, VN"
  },
  "INP-21": {
    "id": "INP-21",
    "category": "INP",
    "page": "reference/rules",
    "anchor": "inp-21",
    "proposal": false,
    "evidence": [
      "미검증",
      "바닐라"
    ],
    "title": {
      "ko": "기본 키 대응(위키 표): `button.menu_select` 좌클릭, `button.menu_secondary_select` 우클릭·Y, `button.menu_ok` Enter, `button.menu_cancel`·`button.menu_exit` Esc·B, `button.menu_up/down/left/right` 방향키·D-pad, `button.menu_autocomplete` Tab, `button.controller_select` X/A, `button.menu_tab_left/right` 탭 키·범퍼, `button.menu_inventory_cancel` 인벤토리 키. `from_button_id: \"any\"`도 있다(바닐라 1회, `gamepad_layout_screen.json`).",
      "en": "Default key mapping (wiki table): `button.menu_select` left click, `button.menu_secondary_select` right click and Y, `button.menu_ok` Enter, `button.menu_cancel` and `button.menu_exit` Esc and B, `button.menu_up/down/left/right` arrow keys and D-pad, `button.menu_autocomplete` Tab, `button.controller_select` X/A, `button.menu_tab_left/right` tab key and bumpers, `button.menu_inventory_cancel` the inventory key. `from_button_id: \"any\"` also exists (once in vanilla, `gamepad_layout_screen.json`)."
    },
    "detail": {
      "ko": "기본 키 대응(위키 표): `button.menu_select` 좌클릭, `button.menu_secondary_select` 우클릭·Y, `button.menu_ok` Enter, `button.menu_cancel`·`button.menu_exit` Esc·B, `button.menu_up/down/left/right` 방향키·D-pad, `button.menu_autocomplete` Tab, `button.controller_select` X/A, `button.menu_tab_left/right` 탭 키·범퍼, `button.menu_inventory_cancel` 인벤토리 키. `from_button_id: \"any\"`도 있다(바닐라 1회, `gamepad_layout_screen.json`).",
      "en": "Default key mappings (wiki table): `button.menu_select` left click, `button.menu_secondary_select` right click and Y, `button.menu_ok` Enter, `button.menu_cancel` and `button.menu_exit` Esc and B, `button.menu_up/down/left/right` arrow keys and D-pad, `button.menu_autocomplete` Tab, `button.controller_select` X/A, `button.menu_tab_left/right` the tab key and bumpers, `button.menu_inventory_cancel` the inventory key. There is also `from_button_id: \"any\"` (once in vanilla, `gamepad_layout_screen.json`)."
    },
    "sources": "BW-intro, BW-doc, VN"
  },
  "INP-22": {
    "id": "INP-22",
    "category": "INP",
    "page": "reference/rules",
    "anchor": "inp-22",
    "proposal": false,
    "evidence": [
      "바닐라"
    ],
    "title": {
      "ko": "게임패드·방향키 포커스는 `focus_identifier`로 이름을 붙이고 `focus_change_up/down/left/right`로 다음 대상을 지정한다. 밖으로 못 나가게 하려면 값에 `FOCUS_OVERRIDE_STOP`을 쓴다(바닐라 226회). 컨테이너 단위로는 `focus_container: true`와 `focus_container_custom_*`(`other_focus_container_name`, `focus_id_inside`)를 쓴다.",
      "en": "Gamepad and arrow key focus is named with `focus_identifier` and the next target is specified with `focus_change_up/down/left/right`. To keep it from leaving, use `FOCUS_OVERRIDE_STOP` as the value (226 times in vanilla). At container level use `focus_container: true` and `focus_container_custom_*` (`other_focus_container_name`, `focus_id_inside`)."
    },
    "detail": {
      "ko": "게임패드·방향키 포커스는 `focus_identifier`로 이름을 붙이고 `focus_change_up/down/left/right`로 다음 대상을 지정한다. 밖으로 못 나가게 하려면 값에 `FOCUS_OVERRIDE_STOP`을 쓴다(바닐라 226회). 컨테이너 단위로는 `focus_container: true`와 `focus_container_custom_*`(`other_focus_container_name`, `focus_id_inside`)를 쓴다.",
      "en": "For gamepad and arrow key focus, name targets with `focus_identifier` and specify the next target with `focus_change_up/down/left/right`. To prevent leaving, use `FOCUS_OVERRIDE_STOP` as the value (226 uses in vanilla). At the container level, use `focus_container: true` and `focus_container_custom_*` (`other_focus_container_name`, `focus_id_inside`)."
    },
    "sources": "BW-doc Focus 표, VN"
  },
  "INP-23": {
    "id": "INP-23",
    "category": "INP",
    "page": "reference/rules",
    "anchor": "inp-23",
    "proposal": false,
    "evidence": [
      "바닐라",
      "미검증"
    ],
    "title": {
      "ko": "`follows_cursor: true`(바닐라 4회)는 컨트롤이 커서를 따라가게 하고, `draggable`(`vertical`·`horizontal`·`both`, 바닐라 `vertical` 1회)은 입력을 받는 컨트롤(`input_panel`, `button`)에 버튼 매핑과 함께 줄 때 끌 수 있게 한다.",
      "en": "`follows_cursor: true` (4 times in vanilla) makes a control follow the cursor, and `draggable` (`vertical`, `horizontal`, `both`, `vertical` once in vanilla) makes a control that receives input (`input_panel`, `button`) draggable when given together with a button mapping."
    },
    "detail": {
      "ko": "`follows_cursor: true`(바닐라 4회)는 컨트롤이 커서를 따라가게 하고, `draggable`(`vertical`·`horizontal`·`both`, 바닐라 `vertical` 1회)은 입력을 받는 컨트롤(`input_panel`, `button`)에 버튼 매핑과 함께 줄 때 끌 수 있게 한다.",
      "en": "`follows_cursor: true` (4 uses in vanilla) makes a control follow the cursor, and `draggable` (`vertical`, `horizontal`, `both`, `vertical` once in vanilla) makes a control draggable when given to a control that receives input (`input_panel`, `button`) together with a button mapping."
    },
    "sources": "BW-doc Layout 표, VN"
  },
  "INP-24": {
    "id": "INP-24",
    "category": "INP",
    "page": "reference/rules",
    "anchor": "inp-24",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "버튼의 `#hyperlink`는 엔진의 허용 목록(글자 그대로 일치하는 URL 116개, INP-34)에 있는 것만 연다. 커스텀 URL은 열리지 않는다. 위키의 \"약 30개\"는 틀렸다.",
      "en": "A button's `#hyperlink` opens only what is in the engine's allow list (116 URLs that must match exactly, INP-34). Custom URLs do not open. The wiki's \"about 30\" is wrong."
    },
    "detail": {
      "ko": "버튼의 `#hyperlink`는 엔진의 허용 목록(글자 그대로 일치하는 URL 116개, INP-34)에 있는 것만 연다. 커스텀 URL은 열리지 않는다. 위키의 \"약 30개\"는 틀렸다.",
      "en": "The `#hyperlink` of a button opens only what is in the engine's allow list (116 URLs that must match literally, INP-34). Custom URLs do not open. The wiki's \"about 30\" was wrong."
    },
    "sources": "NB-08, VN `#hyperlink` 사용"
  },
  "INP-25": {
    "id": "INP-25",
    "category": "INP",
    "page": "json-ui/input-buttons-toggles",
    "anchor": "inp-25",
    "proposal": true,
    "evidence": [
      "바닐라",
      "작동팩",
      "미검증"
    ],
    "title": {
      "ko": "입력창의 글자는 바닐라 `common.text_edit_box`의 `property_bag` `\"#property_field\": \"#item_name\"`에 따라 그 입력창 컨트롤의 `#item_name`에 들어간다.",
      "en": "The text of an input box goes into the `#item_name` of that input box control, following the `property_bag` `\"#property_field\": \"#item_name\"` of vanilla `common.text_edit_box`."
    },
    "detail": {
      "ko": "입력창의 글자는 바닐라 `common.text_edit_box`의 `property_bag` `\"#property_field\": \"#item_name\"`에 따라 그 입력창 컨트롤의 `#item_name`에 들어간다. 다른 컨트롤은 `source_control_name`(입력창 이름 = `$text_box_name`)과 `source_property_name: \"#item_name\"`으로 읽는다. 액션 폼 버튼을 이 값으로 포함 검사해 숨기면 서버 왕복 없는 검색 필터가 된다. . 가이드 본문에는 아직 적용되지 않았다.",
      "en": "The text of an input box goes into the `#item_name` of that input box control, following the `property_bag` `\"#property_field\": \"#item_name\"` of vanilla `common.text_edit_box`. Other controls read it with `source_control_name` (the input box name = `$text_box_name`) and `source_property_name: \"#item_name\"`. If you hide action form buttons by a containment check on this value, it becomes a search filter with no server round trip. . It is not yet applied to the guide body."
    },
    "sources": "VN ui_common.json:1416 외 11회, SLB 6장"
  },
  "INP-31": {
    "id": "INP-31",
    "category": "INP",
    "page": "reference/rules",
    "anchor": "inp-31",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "서버 폼 버튼은 끌 수 없다. 버튼 템플릿의 `$pressed_button_name`을 엔진이 모르는 이름(`button.df_noop`)으로 두면 눌러도 폼에 답하지 않고 호버 툴팁은 그대로 떴다(INP-05를 서버 폼에서 확인). 고른 탭·고른 칸처럼 같은 화면을 다시 보낼 뿐인 버튼에 쓴다.",
      "en": "Server form buttons cannot be turned off. Setting the button template's `$pressed_button_name` to a name the engine does not know (`button.df_noop`) made it not answer the form when pressed while the hover tooltip still appeared (INP-05 confirmed on a server form). Use it for buttons that only resend the same screen, such as picking a tab or a cell."
    },
    "detail": {
      "ko": "서버 폼 버튼은 끌 수 없다. 버튼 템플릿의 `$pressed_button_name`을 엔진이 모르는 이름(`button.df_noop`)으로 두면 눌러도 폼에 답하지 않고 호버 툴팁은 그대로 떴다(INP-05를 서버 폼에서 확인). 고른 탭·고른 칸처럼 같은 화면을 다시 보낼 뿐인 버튼에 쓴다.",
      "en": "A server form button can be turned off. If you set the button template's `$pressed_button_name` to a name the engine does not know (`button.df_noop`), pressing it did not answer the form and the hover tooltip still showed (INP-05 confirmed in a server form). Use it on buttons that merely resend the same screen, such as the chosen tab or chosen cell."
    },
    "sources": "DF"
  },
  "INP-32": {
    "id": "INP-32",
    "category": "INP",
    "page": "reference/rules",
    "anchor": "inp-32",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "바닐라 `common.button`·`common.toggle`은 `focus_enabled`가 켜져 있어 휴대폰에서 폼을 열면 첫 버튼이 호버 상태로 그려졌다. 폼의 모든 버튼에 `$focus_enabled: false`, 라디오 토글에 `$toggle_group_default_selected: -1`과 `$toggle_focus_enabled: false`를 준다. 라디오 토글은 형제끼리만 한 그룹이라 칸마다 부모가 다른 격자에서는 배타적이지 않았다.",
      "en": "Vanilla `common.button` and `common.toggle` have `focus_enabled` on, so opening a form on a phone drew the first button in a hover state. Give `$focus_enabled: false` to every button of the form and `$toggle_group_default_selected: -1` and `$toggle_focus_enabled: false` to radio toggles. A radio toggle is one group only among siblings, so it was not exclusive in a grid where each cell has a different parent."
    },
    "detail": {
      "ko": "바닐라 `common.button`·`common.toggle`은 `focus_enabled`가 켜져 있어 휴대폰에서 폼을 열면 첫 버튼이 호버 상태로 그려졌다. 폼의 모든 버튼에 `$focus_enabled: false`, 라디오 토글에 `$toggle_group_default_selected: -1`과 `$toggle_focus_enabled: false`를 준다. 라디오 토글은 형제끼리만 한 그룹이라 칸마다 부모가 다른 격자에서는 배타적이지 않았다(정적 토글에서는 다른 결과, INP-35, C-66).",
      "en": "Vanilla `common.button` and `common.toggle` have `focus_enabled` on, so opening a form on a phone drew the first button in the hover state. Give every button of the form `$focus_enabled: false`, and radio toggles `$toggle_group_default_selected: -1` and `$toggle_focus_enabled: false`. Radio toggles are one group only among siblings, so they were not exclusive in a grid where each cell has a different parent (a different result with static toggles, INP-35, C-66)."
    },
    "sources": "DF"
  },
  "INP-33": {
    "id": "INP-33",
    "category": "INP",
    "page": "reference/rules",
    "anchor": "inp-33",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "엔진에 있는 `button.menu_*` 버튼 ID는 31개다(`button.menu_emote_slot_0`~`3` 포함). INP-21의 위키 표에 없는 것으로 `button.menu_tertiary_select`, `button.menu_auto_place`, `button.menu_inventory_drop`, `button.menu_inventory_drop_all`, `button.menu_inventory_cancel`, `button.menu_alternate_tab_left`·`_right`, `button.menu_autocomplete`·`_back`, `button.menu_textcursorleft`·`right`, `button.menu_textedit_up`·`down`, `button.menu_clear`, `button.menu_play`, `button.menu_edu_play`가 있다. 이름이 있다는 것까지만 확인했고 어느 키에 대응하는지는 모른다.",
      "en": "The engine has 31 `button.menu_*` button IDs (including `button.menu_emote_slot_0` to `3`). Ones not in the wiki table of INP-21 are `button.menu_tertiary_select`, `button.menu_auto_place`, `button.menu_inventory_drop`, `button.menu_inventory_drop_all`, `button.menu_inventory_cancel`, `button.menu_alternate_tab_left` and `_right`, `button.menu_autocomplete` and `_back`, `button.menu_textcursorleft` and `right`, `button.menu_textedit_up` and `down`, `button.menu_clear`, `button.menu_play`, and `button.menu_edu_play`. Only that the names exist was confirmed, and which key each maps to is unknown."
    },
    "detail": {
      "ko": "엔진에 있는 `button.menu_*` 버튼 ID는 31개다(`button.menu_emote_slot_0`~`3` 포함). INP-21의 위키 표에 없는 것으로 `button.menu_tertiary_select`, `button.menu_auto_place`, `button.menu_inventory_drop`, `button.menu_inventory_drop_all`, `button.menu_inventory_cancel`, `button.menu_alternate_tab_left`·`_right`, `button.menu_autocomplete`·`_back`, `button.menu_textcursorleft`·`right`, `button.menu_textedit_up`·`down`, `button.menu_clear`, `button.menu_play`, `button.menu_edu_play`가 있다. 이름이 있다는 것까지만 확인했고 어느 키에 대응하는지는 모른다.",
      "en": "There are 31 `button.menu_*` button IDs in the engine (including `button.menu_emote_slot_0` to `3`). Those not in the wiki table of INP-21 are `button.menu_tertiary_select`, `button.menu_auto_place`, `button.menu_inventory_drop`, `button.menu_inventory_drop_all`, `button.menu_inventory_cancel`, `button.menu_alternate_tab_left` and `_right`, `button.menu_autocomplete` and `_back`, `button.menu_textcursorleft` and `right`, `button.menu_textedit_up` and `down`, `button.menu_clear`, `button.menu_play` and `button.menu_edu_play`. Only that the names exist was confirmed, and which key each corresponds to is unknown."
    },
    "sources": "NB 4장"
  },
  "INP-34": {
    "id": "INP-34",
    "category": "INP",
    "page": "reference/rules",
    "anchor": "inp-34",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "`#hyperlink`는 버튼을 누를 때 엔진의 허용 목록을 통과해야 열린다. 목록은 글자 그대로 일치해야 하는 URL 116개다(`https://www.minecraft.net/<언어>/terms/r1~r3` 87개, `https://aka.ms/…` 20개, EULA·저작권 표시·계정 설정 등). 어떤 조건(에디션·플랫폼 판정으로 보임)이 참일 때만 `https://education.minecraft.net/`, `https://aka.ms/`, `ms-windows-store:`로 시작하는 URL도 통과한다. 팩이나 서버가 넣은 URL은 열리지 않고, 목록의 URL도 조금만 달라지면 열리지 않는다(INP-24의 결론은 맞고 \"약 30개\"는 틀림).",
      "en": "`#hyperlink` opens only if it passes the engine's allow list when the button is pressed. The list is 116 URLs that must match exactly (87 of `https://www.minecraft.net/<language>/terms/r1~r3`, 20 of `https://aka.ms/...`, the EULA, copyright notices, account settings, and so on). Only when some condition (seemingly an edition or platform check) is true do URLs that start with `https://education.minecraft.net/`, `https://aka.ms/`, or `ms-windows-store:` also pass. URLs inserted by a pack or server do not open, and even a URL on the list does not open if it differs slightly (the conclusion of INP-24 is right and \"about 30\" is wrong)."
    },
    "detail": {
      "ko": "`#hyperlink`는 버튼을 누를 때 엔진의 허용 목록을 통과해야 열린다. 목록은 글자 그대로 일치해야 하는 URL 116개다(`https://www.minecraft.net/<언어>/terms/r1~r3` 87개, `https://aka.ms/…` 20개, EULA·저작권 표시·계정 설정 등). 어떤 조건(에디션·플랫폼 판정으로 보임)이 참일 때만 `https://education.minecraft.net/`, `https://aka.ms/`, `ms-windows-store:`로 시작하는 URL도 통과한다. 팩이나 서버가 넣은 URL은 열리지 않고, 목록의 URL도 조금만 달라지면 열리지 않는다(INP-24의 결론은 맞고 \"약 30개\"는 틀림).",
      "en": "A `#hyperlink` opens only if it passes the engine's allow list when the button is pressed. The list is 116 URLs that must match literally (87 of `https://www.minecraft.net/<language>/terms/r1~r3`, 20 of `https://aka.ms/…`, EULA, copyright notice, account settings, etc.). Only when some condition (appears to be an edition or platform decision) is true, URLs that start with `https://education.minecraft.net/`, `https://aka.ms/` or `ms-windows-store:` also pass. URLs put in by a pack or server do not open, and even a URL in the list does not open if it differs slightly (the conclusion of INP-24 is right and \"about 30\" was wrong)."
    },
    "sources": "NB-08"
  },
  "INP-35": {
    "id": "INP-35",
    "category": "INP",
    "page": "json-ui/input-buttons-toggles",
    "anchor": "inp-35",
    "proposal": false,
    "evidence": [
      "실측",
      "충돌"
    ],
    "title": {
      "ko": "라디오 그룹은 부모가 아니라 `toggle_name`으로 묶였다.",
      "en": "A radio group was bound by `toggle_name`, not by parent."
    },
    "detail": {
      "ko": "라디오 그룹은 부모가 아니라 `toggle_name`으로 묶였다. 같은 이름의 토글 48개를 가로 스택 6줄에 나눠 두어도 한 번에 하나만 선택됐다. `toggle_group_default_selected: -1`이면 처음에 아무것도 선택되지 않는다. INP-32(DF, 칸마다 부모가 다른 격자에서는 배타적이지 않음)와 다른 결과다(C-66). FFR은 토글을 정의에 정적으로 두었고, DF 격자의 칸이 grid나 팩토리로 만들어졌는지는 확인하지 않았다.",
      "en": "A radio group was bound by `toggle_name`, not by parent. Even when 48 toggles of the same name were split into 6 horizontal stack rows, only one was selected at a time. With `toggle_group_default_selected: -1`, nothing is selected at first. This differs from INP-32 (DF, not exclusive in a grid where each cell has a different parent) (C-66). FFR placed the toggles statically in the definition, and whether the cells of the DF grid were made by a grid or a factory was not checked."
    },
    "sources": "FFR"
  },
  "INP-36": {
    "id": "INP-36",
    "category": "INP",
    "page": "json-ui/input-buttons-toggles",
    "anchor": "inp-36",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "서버 폼 안의 탭과 목록 선택은 서버를 거치지 않고 라디오 토글로 바꿀 수 있다.",
      "en": "Tabs and list selection inside a server form can be switched with radio toggles without going through the server."
    },
    "detail": {
      "ko": "서버 폼 안의 탭과 목록 선택은 서버를 거치지 않고 라디오 토글로 바꿀 수 있다. 칸 토글의 `checked` 상태 컨트롤 안에 그 칸의 상세 패널을 두면 칸을 누를 때 상세만 바뀌고 폼은 닫히지 않는다. 서버에 알릴 동작(진행 버튼)만 폼 버튼(`button.form_button_click`)으로 둔다. `toggle_group_default_selected`는 정적 값이라 처음 열 탭마다 레이아웃을 따로 두고 제목으로 고른다.",
      "en": "Tabs and list selection inside a server form can be switched with radio toggles without going through the server. If you put that cell's detail panel inside the `checked` state control of a cell toggle, only the detail changes when the cell is pressed and the form does not close. Only the actions that must be told to the server (the proceed button) are form buttons (`button.form_button_click`). `toggle_group_default_selected` is a static value, so keep a separate layout per tab to open first and choose by title."
    },
    "sources": "FFR"
  },
  "LAY-01": {
    "id": "LAY-01",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-01",
    "proposal": false,
    "evidence": [
      "바닐라"
    ],
    "title": {
      "ko": "유효한 타입 목록은 공식 enum이 아니라 바닐라 사용 실적으로 판단한다. 공식 enum에는 `factory`, `collection_panel`, `tooltip_trigger`, `scroll_track` 등 바닐라가 쓰는 타입이 빠져 있다. 위키 타입표의 `scrollbar_track`은 오기이고(바닐라는 `scroll_track`, 부록A C-34), 레거시 타입 `tab`, `grid_item`, `scrollbar`는 바닐라에 한 번도 없다. 위키가 레거시로 분류한 `carousel_label`은 바닐라에 1회 남아 있다.",
      "en": "The list of valid types is judged by vanilla usage and not by the official enum. The official enum lacks types vanilla uses, such as `factory`, `collection_panel`, `tooltip_trigger`, and `scroll_track`. `scrollbar_track` in the wiki type table is a typo (vanilla uses `scroll_track`, Appendix A C-34), and the legacy types `tab`, `grid_item`, and `scrollbar` never appear in vanilla. `carousel_label`, which the wiki classifies as legacy, remains once in vanilla."
    },
    "detail": {
      "ko": "유효한 타입 목록은 공식 enum이 아니라 바닐라 사용 실적으로 판단한다. 공식 enum에는 `factory`, `collection_panel`, `tooltip_trigger`, `scroll_track` 등 바닐라가 쓰는 타입이 빠져 있다. 위키 타입표의 `scrollbar_track`은 오기이고(바닐라는 `scroll_track`, 충돌 C-34), 레거시 타입 `tab`, `grid_item`, `scrollbar`는 바닐라에 한 번도 없다. 위키가 레거시로 분류한 `carousel_label`은 바닐라에 1회 남아 있다.",
      "en": "Judge the list of valid types by vanilla usage, not by the official enum. The official enum is missing types vanilla uses, such as `factory`, `collection_panel`, `tooltip_trigger` and `scroll_track`. `scrollbar_track` in the wiki type table is a typo (vanilla has `scroll_track`, conflict C-34), and the legacy types `tab`, `grid_item` and `scrollbar` never appear in vanilla. `carousel_label`, which the wiki classifies as legacy, remains once in vanilla."
    },
    "sources": "VN, BC-facts 공식 스키마 절, BW-doc"
  },
  "LAY-02": {
    "id": "LAY-02",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-02",
    "proposal": false,
    "evidence": [
      "바닐라",
      "작동팩"
    ],
    "title": {
      "ko": "`scroll_box`는 타입이 아니라 `ui_common.json`의 컨트롤 이름이다. 스크롤은 직접 조립하지 말고 `common.scrolling_panel` 템플릿을 `$scrolling_content` 등의 변수로 재사용한다.",
      "en": "`scroll_box` is not a type but a control name in `ui_common.json`. Do not assemble scrolling by hand; reuse the `common.scrolling_panel` template with variables such as `$scrolling_content`."
    },
    "detail": {
      "ko": "`scroll_box`는 타입이 아니라 `ui_common.json`의 컨트롤 이름이다. 스크롤은 직접 조립하지 말고 `common.scrolling_panel` 템플릿을 `$scrolling_content` 등의 변수로 재사용한다.",
      "en": "`scroll_box` is not a type but a control name in `ui_common.json`. Do not assemble scrolling by hand; reuse the `common.scrolling_panel` template with variables such as `$scrolling_content`."
    },
    "sources": "VN server_form.json `scrolling_panel@common.scrolling_panel`, BA 5장, AP, MJ 4.2-2"
  },
  "LAY-03": {
    "id": "LAY-03",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-03",
    "proposal": false,
    "evidence": [
      "바닐라",
      "코드",
      "추론"
    ],
    "title": {
      "ko": "크기 키워드는 위 표의 것을 쓴다. `%x`/`%y`의 \"다른 축 기준\"이라는 뜻은 바닐라 주석(`25%x * 56.25%`)과 용례로 판단한 것이다. `\"default\"`의 뜻은 타입마다 달라서 패널은 100%, 라벨은 텍스트 크기로 보인다(부록A C-36). Cinnabar 재구성에서 생략한 크기는 스택 패널의 진행 축이면 `100%c`, 비율 이미지면 텍스처 비율, 나머지는 부모 크기다(LAY-38). 크기 식은 `%c` 등을 `%` 뒤에 쓴다(LAY-36).",
      "en": "Use the size keywords in the table above. The meaning of `%x`/`%y` as \"relative to the other axis\" is judged from a vanilla comment (`25%x * 56.25%`) and usage. The meaning of `\"default\"` differs per type, appearing as 100% for panels and text size for labels (Appendix A C-36). In the Cinnabar reconstruction an omitted size is `100%c` on the main axis of a stack panel, the texture ratio for a ratio image, and the parent size otherwise (LAY-38). In size expressions, write `%c` and similar after the `%` (LAY-36)."
    },
    "detail": {
      "ko": "크기 키워드는 위 표의 것을 쓴다. `%x`/`%y`의 \"다른 축 기준\"이라는 뜻은 바닐라 주석(`25%x * 56.25%`)과 용례로 판단한 것이다. `\"default\"`의 뜻은 타입마다 달라서 패널은 100%, 라벨은 텍스트 크기로 보인다(충돌 C-36). Cinnabar 재구성에서 생략한 크기는 스택 패널의 진행 축이면 `100%c`, 비율 이미지면 텍스처 비율, 나머지는 부모 크기다(LAY-38). 크기 식은 `%c` 등을 `%` 뒤에 쓴다(LAY-36).",
      "en": "Use the size keywords in the table above. The meaning \"based on the other axis\" for `%x`/`%y` was judged from a vanilla comment (`25%x * 56.25%`) and usage. The meaning of `\"default\"` differs by type: a panel appears to be 100% and a label the text size (conflict C-36). In the Cinnabar reconstruction, an omitted size is `100%c` if it is the main axis of a stack panel, the texture ratio for a ratio image, and the parent size otherwise (LAY-38). In size expressions `%c` and the like are written after `%` (LAY-36)."
    },
    "sources": "VN store_search_screen.json:64 주석, VN 전수 검색, BW-doc, CN"
  },
  "LAY-04": {
    "id": "LAY-04",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-04",
    "proposal": false,
    "evidence": [
      "작동팩",
      "실측"
    ],
    "title": {
      "ko": "스택 패널은 숨은(`#visible` false) 자식에게 공간을 주지 않는다. 조건부 행을 접으면 아래가 올라오고, 2의 거듭제곱 크기 spacer를 켜고 끄면 합이 곧 좌표가 된다(11장 레시피 6).",
      "en": "A stack panel gives no space to hidden (`#visible` false) children. Collapsing a conditional row pulls what is below up, and turning power-of-two-size spacers on and off makes their sum the coordinate (chapter 11 recipe 6)."
    },
    "detail": {
      "ko": "스택 패널은 숨은(`#visible` false) 자식에게 공간을 주지 않는다. 조건부 행을 접으면 아래가 올라오고, 2의 거듭제곱 크기 spacer를 켜고 끄면 합이 곧 좌표가 된다(패턴 레시피 6).",
      "en": "A stack panel gives no space to hidden (`#visible` false) children. Collapsing a conditional row pulls what is below up, and turning power-of-two spacers on and off makes the sum the coordinate (pattern recipe 6)."
    },
    "sources": "BA 4장, BC-S12"
  },
  "LAY-05": {
    "id": "LAY-05",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-05",
    "proposal": false,
    "evidence": [
      "실측",
      "작동팩"
    ],
    "title": {
      "ko": "정적 컨트롤의 위치(`offset`)는 바인딩할 수 없다. 위치를 바꾸려면 앞에 둔 spacer의 크기를 바인딩해 스택이 다음 자식을 밀게 한다. Cinnabar 재구성은 `#offset`에 `[x, y]` 바인딩을 받지만 실측을 따른다(부록A C-44).",
      "en": "The position (`offset`) of a static control cannot be bound. To change the position, bind the size of a spacer placed before it so the stack pushes the next child. The Cinnabar reconstruction accepts an `[x, y]` binding on `#offset`, but the measurement is followed (Appendix A C-44)."
    },
    "detail": {
      "ko": "정적 컨트롤의 위치(`offset`)는 바인딩할 수 없다. 위치를 바꾸려면 앞에 둔 spacer의 크기를 바인딩해 스택이 다음 자식을 밀게 한다. Cinnabar 재구성은 `#offset`에 `[x, y]` 바인딩을 받지만 실측을 따른다(충돌 C-44).",
      "en": "The position (`offset`) of a static control cannot be bound. To change a position, bind the size of a spacer placed before it so the stack pushes the next child. The Cinnabar reconstruction accepts an `[x, y]` binding on `#offset`, but measurement is followed (conflict C-44)."
    },
    "sources": "BC-S12, BA 4장, 부록A C-44"
  },
  "LAY-06": {
    "id": "LAY-06",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-06",
    "proposal": false,
    "evidence": [
      "작동팩",
      "바닐라"
    ],
    "title": {
      "ko": "`max_size`, `min_size`로 반응형을 만든다. 예: `\"size\": [314, \"100% - 64px\"]`, `\"max_size\": [314, 236]`이면 작은 화면에서 창 높이가 줄어든다.",
      "en": "Build responsiveness with `max_size` and `min_size`. Example: with `\"size\": [314, \"100% - 64px\"]` and `\"max_size\": [314, 236]`, the window height shrinks on small screens."
    },
    "detail": {
      "ko": "`max_size`, `min_size`로 반응형을 만든다. 예: `\"size\": [314, \"100% - 64px\"]`, `\"max_size\": [314, 236]`이면 작은 화면에서 창 높이가 줄어든다.",
      "en": "Make responsiveness with `max_size` and `min_size`. Example: with `\"size\": [314, \"100% - 64px\"]` and `\"max_size\": [314, 236]`, the window height shrinks on small screens."
    },
    "sources": "BA 5장, VN max_size 204회"
  },
  "LAY-07": {
    "id": "LAY-07",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-07",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "`\"100%cm\"` 상자 안에 배경을 `\"100%sm\"`으로 두면, 안의 행이 숨을 때 상자와 배경이 함께 줄어 아래가 따라 올라온다.",
      "en": "If a background is put as `\"100%sm\"` inside a `\"100%cm\"` box, then when a row inside hides, the box and background shrink together and what is below follows up."
    },
    "detail": {
      "ko": "`\"100%cm\"` 상자 안에 배경을 `\"100%sm\"`으로 두면, 안의 행이 숨을 때 상자와 배경이 함께 줄어 아래가 따라 올라온다.",
      "en": "If you put a background as `\"100%sm\"` inside a `\"100%cm\"` box, when a row inside hides, the box and background shrink together and what is below follows up."
    },
    "sources": "BC-S12"
  },
  "LAY-08": {
    "id": "LAY-08",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-08",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "`\"100%cm\"` 패널 안에 라벨과 `\"100%sm\"` 버튼을 두면 버튼 히트박스가 언어마다 글자 크기에 정확히 맞는다. 같은 자리에 `\"100%c\"`를 쓰면 버튼이 라벨 아래로 떨어진다.",
      "en": "If a label and a `\"100%sm\"` button are put in a `\"100%cm\"` panel, the button hitbox fits the character size exactly in every language. Using `\"100%c\"` in the same place makes the button drop below the label."
    },
    "detail": {
      "ko": "`\"100%cm\"` 패널 안에 라벨과 `\"100%sm\"` 버튼을 두면 버튼 히트박스가 언어마다 글자 크기에 정확히 맞는다. 같은 자리에 `\"100%c\"`를 쓰면 버튼이 라벨 아래로 떨어진다.",
      "en": "If you put a label and a `\"100%sm\"` button inside a `\"100%cm\"` panel, the button hitbox fits the text size exactly in each language. Using `\"100%c\"` in the same place makes the button fall below the label."
    },
    "sources": "BC-S10"
  },
  "LAY-09": {
    "id": "LAY-09",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-09",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "높이가 자식으로 정해지는 행에 아이콘 전용 버튼을 넣을 때는 명시적인 정사각 크기를 준다. 퍼센트 높이로는 행 높이가 정해지지 않는다.",
      "en": "When putting an icon-only button in a row whose height is decided by its children, give an explicit square size. A percentage height does not decide the row height."
    },
    "detail": {
      "ko": "높이가 자식으로 정해지는 행에 아이콘 전용 버튼을 넣을 때는 명시적인 정사각 크기를 준다. 퍼센트 높이로는 행 높이가 정해지지 않는다.",
      "en": "When putting an icon-only button in a row whose height is set by its children, give an explicit square size. A percentage height does not decide the row height."
    },
    "sources": "BC-rules"
  },
  "LAY-10": {
    "id": "LAY-10",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-10",
    "proposal": false,
    "evidence": [
      "실측",
      "코드",
      "충돌"
    ],
    "title": {
      "ko": "크기 바인딩은 `#size_binding_x`, `#size_binding_y`에 값을 쓴다. 값은 픽셀이 아니라 배수다. 무엇에 곱하는지는 두 해석이 있다: 선언 크기(S12의 해석)와 부모 크기(Cinnabar 재구성: 값 v를 `v×100%`로 바꾸고, `#size_binding_x_absolute`·`_y_absolute`는 픽셀). `[1, 1]` 크기 프레임 안에 두면 값이 곧 픽셀이 된다는 S12 관측은 두 해석 모두와 맞고, 부록A C-14는 부모 크기 쪽으로 기울었다. 선언은 `[\"100%\", \"100%\"]`로 둔다. 범위를 벗어난 값이 아무것도 안 그린다는 이전 기록은 `[0, 0]` 선언 때문이었을 가능성이 높다. 바닐라의 유일한 크기 바인딩(`resizing_xp_bar_with_hotbar`)은 `use_anchored_offset: true`와 함께 쓰고, 위키도 이 속성이 필요하다고 적는다(CN은 요구하지 않음). 정적 컨트롤에서 그것 없이 된다는 S12 기록과 맞춰 볼 때까지는 둘을 함께 쓰는 편이 안전하다(부록A C-37, LAY-14 주의).",
      "en": "A size binding writes values into `#size_binding_x` and `#size_binding_y`. The value is a multiplier, not pixels. There are two interpretations of what it multiplies: the declared size (the interpretation of S12) and the parent size (the Cinnabar reconstruction: a value v becomes `v×100%`, and `#size_binding_x_absolute` and `_y_absolute` are pixels). The S12 observation that putting it inside a `[1, 1]` size frame makes the value equal to pixels matches both interpretations, and Appendix A C-14 leans toward the parent size. Keep the declaration as `[\"100%\", \"100%\"]`. The earlier record that an out-of-range value draws nothing was likely due to a `[0, 0]` declaration. The only size binding in vanilla (`resizing_xp_bar_with_hotbar`) is used with `use_anchored_offset: true`, and the wiki also says this property is needed (CN does not require it). Until it is reconciled with the S12 record that it works on a static control without it, using the two together is safer (Appendix A C-37, LAY-14 caution)."
    },
    "detail": {
      "ko": "크기 바인딩은 `#size_binding_x`, `#size_binding_y`에 값을 쓴다. 값은 픽셀이 아니라 배수다. 무엇에 곱하는지는 두 해석이 있다: 선언 크기(S12의 해석)와 부모 크기(Cinnabar 재구성: 값 v를 `v×100%`로 바꾸고, `#size_binding_x_absolute`·`_y_absolute`는 픽셀). `[1, 1]` 크기 프레임 안에 두면 값이 곧 픽셀이 된다는 S12 관측은 두 해석 모두와 맞고, 충돌 C-14는 부모 크기 쪽으로 기울었다. 선언은 `[\"100%\", \"100%\"]`로 둔다. 범위를 벗어난 값이 아무것도 안 그린다는 이전 기록은 `[0, 0]` 선언 때문이었을 가능성이 높다. 바닐라의 유일한 크기 바인딩(`resizing_xp_bar_with_hotbar`)은 `use_anchored_offset: true`와 함께 쓰고, 위키도 이 속성이 필요하다고 적는다(CN은 요구하지 않음). 정적 컨트롤에서 그것 없이 된다는 S12 기록과 맞춰 볼 때까지는 둘을 함께 쓰는 편이 안전하다(충돌 C-37, LAY-14 주의).",
      "en": "A size binding writes values to `#size_binding_x` and `#size_binding_y`. The value is a multiplier, not pixels. There are two interpretations of what it multiplies: the declared size (the interpretation of S12) and the parent size (the Cinnabar reconstruction: it turns value v into `v x 100%`, and `#size_binding_x_absolute` and `_y_absolute` are pixels). The S12 observation that the value becomes pixels inside a `[1, 1]` size frame matches both interpretations, and conflict C-14 leaned toward the parent size. Keep the declaration as `[\"100%\", \"100%\"]`. The earlier record that an out-of-range value draws nothing was most likely caused by a `[0, 0]` declaration. Vanilla's only size binding (`resizing_xp_bar_with_hotbar`) is used with `use_anchored_offset: true`, and the wiki also says this property is needed (CN does not require it). Until it is reconciled with the S12 record that it works on a static control without it, using both together is safer (conflict C-37, note LAY-14)."
    },
    "sources": "BC-S6, BC-S12, 부록A C-14, BW-doc, VN hud_screen.json:319, CN"
  },
  "LAY-11": {
    "id": "LAY-11",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-11",
    "proposal": false,
    "evidence": [
      "실측",
      "코드"
    ],
    "title": {
      "ko": "크기 바인딩은 두 축을 모두 바인딩한다. 한 축만 하면 다른 축이 0이 되어 바인딩이 안 된 것처럼 보인다. Cinnabar 재구성에서 바인딩하지 않은 축은 선언값을 유지하므로, 선언이 `[0, 0]`이면 그 축이 0으로 남는 것과 같은 현상이다(부록A C-14).",
      "en": "A size binding must bind both axes. Binding only one axis makes the other 0 and looks as if the binding did not work. In the Cinnabar reconstruction an unbound axis keeps its declared value, so if the declaration is `[0, 0]` that axis stays at 0, which is the same phenomenon (Appendix A C-14)."
    },
    "detail": {
      "ko": "크기 바인딩은 두 축을 모두 바인딩한다. 한 축만 하면 다른 축이 0이 되어 바인딩이 안 된 것처럼 보인다. Cinnabar 재구성에서 바인딩하지 않은 축은 선언값을 유지하므로, 선언이 `[0, 0]`이면 그 축이 0으로 남는 것과 같은 현상이다(충돌 C-14).",
      "en": "A size binding binds both axes. If only one axis is bound, the other axis becomes 0 and it looks as if the binding failed. In the Cinnabar reconstruction an unbound axis keeps its declared value, so if the declaration is `[0, 0]` that axis stays 0, the same phenomenon (conflict C-14)."
    },
    "sources": "BC-S12, CN"
  },
  "LAY-12": {
    "id": "LAY-12",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-12",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "어디서 무엇을 바인딩할 수 있는지는 컨트롤이 어디서 생겼는지에 따라 다르다. 크기 바인딩에 `use_anchored_offset`이 필요한지는 미해결이다(부록A C-37).",
      "en": "What can be bound and where depends on where the control was created. Whether a size binding needs `use_anchored_offset` is unresolved (Appendix A C-37)."
    },
    "detail": {
      "ko": "어디서 무엇을 바인딩할 수 있는지는 컨트롤이 어디서 생겼는지에 따라 다르다. 크기 바인딩에 `use_anchored_offset`이 필요한지는 미해결이다(충돌 C-37).",
      "en": "What can be bound where depends on where the control was created. Whether a size binding needs `use_anchored_offset` is unresolved (conflict C-37)."
    },
    "sources": "BC-S12, BW-doc"
  },
  "LAY-13": {
    "id": "LAY-13",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-13",
    "proposal": false,
    "evidence": [
      "실측",
      "충돌"
    ],
    "title": {
      "ko": "바인딩한 `alpha`는 0과 1만 적용된다. 반투명이 필요하면 alpha가 다른 사본을 리터럴로 만들어 하나만 보이게 한다. Cinnabar 재구성은 바인딩한 `alpha`의 숫자를 그대로 받는다. 측정 식이 `0.5` 같은 리터럴을 썼다면 그 값은 정수 0이라(EXP-27) \"0과 1만\"처럼 보였을 수 있으므로 `.5`로 다시 재야 한다(부록A C-45).",
      "en": "A bound `alpha` applies only 0 and 1. If you need translucency, make copies with different literal alphas and show only one. The Cinnabar reconstruction accepts the number of a bound `alpha` as is. If the measuring expression used a literal like `0.5`, that value is integer 0 (EXP-27) and it may have looked like \"only 0 and 1\", so remeasure with `.5` (Appendix A C-45)."
    },
    "detail": {
      "ko": "바인딩한 `alpha`는 0과 1만 적용된다. 반투명이 필요하면 alpha가 다른 사본을 리터럴로 만들어 하나만 보이게 한다. Cinnabar 재구성은 바인딩한 `alpha`의 숫자를 그대로 받는다. 측정 식이 `0.5` 같은 리터럴을 썼다면 그 값은 정수 0이라(EXP-27) \"0과 1만\"처럼 보였을 수 있으므로 `.5`로 다시 재야 한다(충돌 C-45).",
      "en": "A bound `alpha` applies only as 0 and 1. If you need translucency, make copies with different literal alpha and show only one. The Cinnabar reconstruction accepts the number of a bound `alpha` as is. If the measuring expression used a literal like `0.5`, that value is the integer 0 (EXP-27) and may have looked like \"only 0 and 1\", so it must be measured again with `.5` (conflict C-45)."
    },
    "sources": "BC-S12, CN, 부록A C-45"
  },
  "LAY-14": {
    "id": "LAY-14",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-14",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "크기 바인딩 + `use_anchored_offset` + 컬렉션 셀 조합은 상자 화면에서 클라이언트를 두 번 크래시시켰다. 이 조합은 피한다.",
      "en": "The combination of a size binding + `use_anchored_offset` + a collection cell crashed the client twice on a chest screen. Avoid this combination."
    },
    "detail": {
      "ko": "크기 바인딩 + `use_anchored_offset` + 컬렉션 셀 조합은 상자 화면에서 클라이언트를 두 번 크래시시켰다. 이 조합은 피한다.",
      "en": "The combination of a size binding + `use_anchored_offset` + a collection cell crashed the client twice on a chest screen. Avoid this combination."
    },
    "sources": "BC-S6"
  },
  "LAY-15": {
    "id": "LAY-15",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-15",
    "proposal": false,
    "evidence": [
      "미검증"
    ],
    "title": {
      "ko": "화면이 열려 있는 동안 크기 바인딩 값이 바뀌면 다시 레이아웃되는지는 측정되지 않았다.",
      "en": "Whether the layout is redone when a size binding value changes while the screen is open was not measured."
    },
    "detail": {
      "ko": "화면이 열려 있는 동안 크기 바인딩 값이 바뀌면 다시 레이아웃되는지는 측정되지 않았다.",
      "en": "Whether layout is redone when the size binding value changes while the screen is open was not measured."
    },
    "sources": "BC-S6, BC 8장"
  },
  "LAY-16": {
    "id": "LAY-16",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-16",
    "proposal": false,
    "evidence": [
      "바닐라"
    ],
    "title": {
      "ko": "`anchor_from`은 부모의 기준점, `anchor_to`는 자기 기준점이다. 값은 `top_left`, `top_middle`, `top_right`, `left_middle`, `center`, `right_middle`, `bottom_left`, `bottom_middle`, `bottom_right` 9가지다.",
      "en": "`anchor_from` is the reference point of the parent and `anchor_to` is the control's own reference point. The values are 9: `top_left`, `top_middle`, `top_right`, `left_middle`, `center`, `right_middle`, `bottom_left`, `bottom_middle`, `bottom_right`."
    },
    "detail": {
      "ko": "`anchor_from`은 부모의 기준점, `anchor_to`는 자기 기준점이다. 값은 `top_left`, `top_middle`, `top_right`, `left_middle`, `center`, `right_middle`, `bottom_left`, `bottom_middle`, `bottom_right` 9가지다.",
      "en": "`anchor_from` is the parent's reference point and `anchor_to` is its own reference point. The values are 9: `top_left`, `top_middle`, `top_right`, `left_middle`, `center`, `right_middle`, `bottom_left`, `bottom_middle` and `bottom_right`."
    },
    "sources": "VN 9종 모두 사용, 부록B"
  },
  "LAY-17": {
    "id": "LAY-17",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-17",
    "proposal": false,
    "evidence": [
      "바닐라"
    ],
    "title": {
      "ko": "`offset`은 앵커 기준의 이동이며 크기와 같은 단위(픽셀, `%`, 식)를 쓴다. 예: `\"offset\": [0, \"50%-68px\"]`.",
      "en": "`offset` is a shift relative to the anchor and uses the same units as size (pixels, `%`, expressions). Example: `\"offset\": [0, \"50%-68px\"]`."
    },
    "detail": {
      "ko": "`offset`은 앵커 기준의 이동이며 크기와 같은 단위(픽셀, `%`, 식)를 쓴다. 예: `\"offset\": [0, \"50%-68px\"]`.",
      "en": "`offset` is movement relative to the anchor and uses the same units as size (pixels, `%`, expressions). Example: `\"offset\": [0, \"50%-68px\"]`."
    },
    "sources": "VN hud_screen.json:2146"
  },
  "LAY-18": {
    "id": "LAY-18",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-18",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "`layer`는 부모에 대한 상대값이다. 겹치는 두 컨트롤의 앞뒤는 조상 체인 전체의 레이어를 비교해야 안다.",
      "en": "`layer` is a relative value to the parent. To know the front-to-back order of two overlapping controls, compare the layers along the whole ancestor chain."
    },
    "detail": {
      "ko": "`layer`는 부모에 대한 상대값이다. 겹치는 두 컨트롤의 앞뒤는 조상 체인 전체의 레이어를 비교해야 안다.",
      "en": "`layer` is a relative value to the parent. To know which of two overlapping controls is in front, you must compare the layers of the whole ancestor chain."
    },
    "sources": "BC-rules"
  },
  "LAY-19": {
    "id": "LAY-19",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-19",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "같은 레이어의 형제는 배열 순서가 그리기 순서를 보장하지 않는다. 앞뒤가 중요하면 레이어를 다르게 준다.",
      "en": "For siblings on the same layer, array order does not guarantee draw order. If the order matters, give different layers."
    },
    "detail": {
      "ko": "같은 레이어의 형제는 배열 순서가 그리기 순서를 보장하지 않는다. 앞뒤가 중요하면 레이어를 다르게 준다.",
      "en": "For siblings on the same layer, array order does not guarantee draw order. If front and back matter, give different layers."
    },
    "sources": "BC-rules, MJ 4.2-10"
  },
  "LAY-20": {
    "id": "LAY-20",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-20",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "같은 데이터를 \"모든 외곽선 → 모든 선 → 모든 노드 → 호버\" 순으로 그려야 하면 한 아이템 안에서 레이어를 올리는 것으로는 부족하다(다음 아이템의 외곽선이 앞 아이템을 덮는다). 같은 컬렉션을 레이어가 다른 팩토리로 여러 번 그린다.",
      "en": "If the same data must be drawn in the order \"all outlines, then all lines, then all nodes, then hover\", raising the layer inside one item is not enough (the next item's outline covers the previous item). Draw the same collection several times with factories on different layers."
    },
    "detail": {
      "ko": "같은 데이터를 \"모든 외곽선 → 모든 선 → 모든 노드 → 호버\" 순으로 그려야 하면 한 아이템 안에서 레이어를 올리는 것으로는 부족하다(다음 아이템의 외곽선이 앞 아이템을 덮는다). 같은 컬렉션을 레이어가 다른 팩토리로 여러 번 그린다.",
      "en": "If the same data must be drawn in the order \"all outlines -> all lines -> all nodes -> hover\", raising layers within one item is not enough (the next item's outline covers the previous item). Draw the same collection several times with factories on different layers."
    },
    "sources": "BA 5장"
  },
  "LAY-21": {
    "id": "LAY-21",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-21",
    "proposal": false,
    "evidence": [
      "바닐라",
      "추론"
    ],
    "title": {
      "ko": "50 이상의 레이어는 바닐라에서도 흔하다. 레이어가 높다는 경고는 무시해도 된다.",
      "en": "Layers of 50 and above are common in vanilla too. A warning that a layer is high can be ignored."
    },
    "detail": {
      "ko": "50 이상의 레이어는 바닐라에서도 흔하다. 레이어가 높다는 경고는 무시해도 된다.",
      "en": "Layers of 50 or more are common in vanilla too. A warning that the layer is high can be ignored."
    },
    "sources": "MJ 5장"
  },
  "LAY-22": {
    "id": "LAY-22",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-22",
    "proposal": false,
    "evidence": [
      "바닐라",
      "작동팩"
    ],
    "title": {
      "ko": "`clips_children: true`는 자식을 자기 영역으로 자른다. 자식에 `allow_clipping: false`를 주면 조상의 클리핑을 벗어나 그린다(스크롤 영역 밖으로 나가는 툴팁).",
      "en": "`clips_children: true` clips children to its own area. Giving a child `allow_clipping: false` draws it outside the ancestor's clipping (a tooltip that goes outside a scroll area)."
    },
    "detail": {
      "ko": "`clips_children: true`는 자식을 자기 영역으로 자른다. 자식에 `allow_clipping: false`를 주면 조상의 클리핑을 벗어나 그린다(스크롤 영역 밖으로 나가는 툴팁).",
      "en": "`clips_children: true` clips children to its own area. Giving a child `allow_clipping: false` draws it outside the ancestor's clipping (a tooltip that goes out of a scroll area)."
    },
    "sources": "VN clips_children 27회·allow_clipping 7회, BA 5장, AP 4.8"
  },
  "LAY-23": {
    "id": "LAY-23",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-23",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "툴팁이 뜰 때 주변을 어둡게 하려면 아주 큰 반투명 검정 이미지(BA 4000×4000 alpha 0.3, AP 500×500 alpha 0.225)를 툴팁 뒤에 두고 `allow_clipping: false`를 준다.",
      "en": "To darken the surroundings when a tooltip appears, put a very large translucent black image (BA 4000×4000 alpha 0.3, AP 500×500 alpha 0.225) behind the tooltip and give it `allow_clipping: false`."
    },
    "detail": {
      "ko": "툴팁이 뜰 때 주변을 어둡게 하려면 아주 큰 반투명 검정 이미지(BA 4000×4000 alpha 0.3, AP 500×500 alpha 0.225)를 툴팁 뒤에 두고 `allow_clipping: false`를 준다.",
      "en": "To darken the surroundings when a tooltip shows, put a very large translucent black image (BA 4000x4000 alpha 0.3, AP 500x500 alpha 0.225) behind the tooltip and give it `allow_clipping: false`."
    },
    "sources": "BA 5장, AP 4.8"
  },
  "LAY-24": {
    "id": "LAY-24",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-24",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "텍스트 폭에 맞춘 배경이 필요하면 `alpha: 0`인 측정용 라벨로 부모를 `\"100%c\"`/`\"100%cm\"`로 키우고, 보이는 라벨은 그 위에 따로 그린다.",
      "en": "If you need a background that fits the text width, grow the parent to `\"100%c\"`/`\"100%cm\"` with an `alpha: 0` measuring label, and draw the visible label separately on top of it."
    },
    "detail": {
      "ko": "텍스트 폭에 맞춘 배경이 필요하면 `alpha: 0`인 측정용 라벨로 부모를 `\"100%c\"`/`\"100%cm\"`로 키우고, 보이는 라벨은 그 위에 따로 그린다.",
      "en": "If you need a background fitted to the text width, grow the parent to `\"100%c\"`/`\"100%cm\"` with a measuring label of `alpha: 0`, and draw the visible label separately on top."
    },
    "sources": "BA 5장"
  },
  "LAY-25": {
    "id": "LAY-25",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-25",
    "proposal": false,
    "evidence": [
      "바닐라"
    ],
    "title": {
      "ko": "그리드는 `grid_dimensions`(고정 크기) 또는 `grid_dimension_binding`(바인딩 크기), `grid_item_template`, `maximum_grid_items`로 만든다.",
      "en": "A grid is built with `grid_dimensions` (fixed size) or `grid_dimension_binding` (bound size), `grid_item_template`, and `maximum_grid_items`."
    },
    "detail": {
      "ko": "그리드는 `grid_dimensions`(고정 크기) 또는 `grid_dimension_binding`(바인딩 크기), `grid_item_template`, `maximum_grid_items`로 만든다.",
      "en": "A grid is made with `grid_dimensions` (fixed size) or `grid_dimension_binding` (bound size), `grid_item_template` and `maximum_grid_items`."
    },
    "sources": "VN 속성 키 기준 37·79·117·11회"
  },
  "LAY-26": {
    "id": "LAY-26",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-26",
    "proposal": false,
    "evidence": [
      "바닐라"
    ],
    "title": {
      "ko": "`grid_fill_direction`은 바닐라에서 `vertical`만 쓴다. `left_to_right` 같은 값은 근거가 없다. `grid_rescaling_type`은 바닐라에서 `horizontal`(21), `vertical`(1)만 쓰고, 공식 enum의 `none`은 쓰지 않는다. 위키가 적은 `grid_fill_direction` 3값(`vertical`, `horizontal`, `none`)도 `vertical` 외에는 바닐라 근거가 없다. `grid_rescaling_type: \"vertical\"`은 크래시 경고가 있다(LAY-32).",
      "en": "`grid_fill_direction` uses only `vertical` in vanilla. Values like `left_to_right` have no basis. `grid_rescaling_type` uses only `horizontal` (21) and `vertical` (1) in vanilla and does not use the official enum's `none`. The 3 values of `grid_fill_direction` the wiki lists (`vertical`, `horizontal`, `none`) also have no vanilla basis except `vertical`. `grid_rescaling_type: \"vertical\"` has a crash warning (LAY-32)."
    },
    "detail": {
      "ko": "`grid_fill_direction`은 바닐라에서 `vertical`만 쓴다. `left_to_right` 같은 값은 근거가 없다. `grid_rescaling_type`은 바닐라에서 `horizontal`(21), `vertical`(1)만 쓰고, 공식 enum의 `none`은 쓰지 않는다. 위키가 적은 `grid_fill_direction` 3값(`vertical`, `horizontal`, `none`)도 `vertical` 외에는 바닐라 근거가 없다. `grid_rescaling_type: \"vertical\"`은 크래시 경고가 있다(LAY-32).",
      "en": "`grid_fill_direction` uses only `vertical` in vanilla. Values like `left_to_right` have no basis. `grid_rescaling_type` uses only `horizontal` (21) and `vertical` (1) in vanilla and does not use `none` of the official enum. Of the 3 values of `grid_fill_direction` the wiki lists (`vertical`, `horizontal`, `none`), only `vertical` has vanilla evidence. `grid_rescaling_type: \"vertical\"` has a crash warning (LAY-32)."
    },
    "sources": "VN, MJ 4.2-3·4, BW-doc, BW-dyn"
  },
  "LAY-27": {
    "id": "LAY-27",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-27",
    "proposal": false,
    "evidence": [
      "작동팩",
      "바닐라"
    ],
    "title": {
      "ko": "9-slice는 텍스처 파일 옆에 같은 이름의 `.json`을 두고 `nineslice_size`(`[왼, 위, 오른, 아래]` 또는 한 값)와 `base_size`를 적는다. 바닐라 UI JSON은 `nineslice_size`를 리터럴 속성으로 쓰지 않고, 바인딩(`#banner_nineslice_size` → `#nineslice_size`)으로 1회 쓴다.",
      "en": "For 9-slice, put a `.json` with the same name next to the texture file and write `nineslice_size` (`[left, top, right, bottom]` or one value) and `base_size`. Vanilla UI JSON does not use `nineslice_size` as a literal property and uses it once through a binding (`#banner_nineslice_size` -> `#nineslice_size`)."
    },
    "detail": {
      "ko": "9-slice는 텍스처 파일 옆에 같은 이름의 `.json`을 두고 `nineslice_size`(`[왼, 위, 오른, 아래]` 또는 한 값)와 `base_size`를 적는다. 바닐라 UI JSON은 `nineslice_size`를 리터럴 속성으로 쓰지 않고, 바인딩(`#banner_nineslice_size` → `#nineslice_size`)으로 1회 쓴다.",
      "en": "For 9-slice, put a `.json` of the same name next to the texture file and write `nineslice_size` (`[left, top, right, bottom]` or one value) and `base_size`. Vanilla UI JSON does not use `nineslice_size` as a literal property and uses it once through a binding (`#banner_nineslice_size` -> `#nineslice_size`)."
    },
    "sources": "BA 5장, AP 4.9, VN start_screen.json:1639"
  },
  "LAY-28": {
    "id": "LAY-28",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-28",
    "proposal": false,
    "evidence": [
      "바닐라",
      "작동팩"
    ],
    "title": {
      "ko": "반복 배경은 image에 `\"tiled\": true`를 준다.",
      "en": "For a repeating background, give the image `\"tiled\": true`."
    },
    "detail": {
      "ko": "반복 배경은 image에 `\"tiled\": true`를 준다.",
      "en": "For a repeating background, give the image `\"tiled\": true`."
    },
    "sources": "VN 44회, AP 4.9, BA 5장"
  },
  "LAY-29": {
    "id": "LAY-29",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-29",
    "proposal": false,
    "evidence": [
      "바닐라",
      "실측"
    ],
    "title": {
      "ko": "그리드 칸에 정적 자식을 직접 놓으려면 자식에 `\"grid_position\": [행, 열]`을 준다(0부터). 바닐라도 71회 쓰고, 엔진이 만든 그리드의 특정 칸을 덮어쓰는 데도 쓴다.",
      "en": "To place a static child directly in a grid cell, give the child `\"grid_position\": [row, column]` (from 0). Vanilla also uses it 71 times, and it is also used to override a specific cell of an engine-made grid."
    },
    "detail": {
      "ko": "그리드 칸에 정적 자식을 직접 놓으려면 자식에 `\"grid_position\": [행, 열]`을 준다(0부터). 바닐라도 71회 쓰고, 엔진이 만든 그리드의 특정 칸을 덮어쓰는 데도 쓴다.",
      "en": "To place a static child directly in a grid cell, give the child `\"grid_position\": [row, column]` (from 0). Vanilla also uses it 71 times, and it is also used to overwrite a specific cell of an engine-made grid."
    },
    "sources": "VN, BW-doc Control 표, BW-dyn 스크린샷"
  },
  "LAY-30": {
    "id": "LAY-30",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-30",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "개수가 바인딩으로 정해지는 그리드는 `grid_rescaling_type: \"horizontal\"`과 고정 폭을 주고 `#maximum_grid_items`(또는 `maximum_grid_items`)로 개수를 정한다. 열 수는 `floor(그리드 폭 / 템플릿 폭)`이다(160px ÷ 32px = 5열, 개수 15 → 3행). 높이는 `\"100%c\"`로 둔다.",
      "en": "For a grid whose count is decided by a binding, give `grid_rescaling_type: \"horizontal\"` and a fixed width and set the count with `#maximum_grid_items` (or `maximum_grid_items`). The column count is `floor(grid width / template width)` (160px ÷ 32px = 5 columns, count 15 -> 3 rows). Set the height to `\"100%c\"`."
    },
    "detail": {
      "ko": "개수가 바인딩으로 정해지는 그리드는 `grid_rescaling_type: \"horizontal\"`과 고정 폭을 주고 `#maximum_grid_items`(또는 `maximum_grid_items`)로 개수를 정한다. 열 수는 `floor(그리드 폭 / 템플릿 폭)`이다(160px ÷ 32px = 5열, 개수 15 → 3행). 높이는 `\"100%c\"`로 둔다.",
      "en": "For a grid whose count is decided by a binding, give `grid_rescaling_type: \"horizontal\"` and a fixed width and set the count with `#maximum_grid_items` (or `maximum_grid_items`). The column count is `floor(grid width / template width)` (160px / 32px = 5 columns, count 15 -> 3 rows). Set the height to `\"100%c\"`."
    },
    "sources": "BW-dyn 스크린샷"
  },
  "LAY-31": {
    "id": "LAY-31",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-31",
    "proposal": false,
    "evidence": [
      "코드",
      "미검증"
    ],
    "title": {
      "ko": "그리드는 숨은(`visible` false) 항목에도 자리를 준다. 스택 패널(LAY-04)과 반대라서, 조건부 항목을 그리드에 두면 빈칸이 생긴다. 접혀야 하는 목록은 스택 패널로 만든다. Cinnabar 재구성에서도 그리드 칸 위치가 인덱스로 정해져 숨은 칸이 자리를 차지한다.",
      "en": "A grid gives space even to hidden (`visible` false) items. It is the opposite of a stack panel (LAY-04), so putting conditional items in a grid leaves empty cells. Build a list that must collapse with a stack panel. In the Cinnabar reconstruction too, grid cell positions are decided by index, so hidden cells take space."
    },
    "detail": {
      "ko": "그리드는 숨은(`visible` false) 항목에도 자리를 준다. 스택 패널(LAY-04)과 반대라서, 조건부 항목을 그리드에 두면 빈칸이 생긴다. 접혀야 하는 목록은 스택 패널로 만든다. Cinnabar 재구성에서도 그리드 칸 위치가 인덱스로 정해져 숨은 칸이 자리를 차지한다.",
      "en": "A grid gives space to hidden (`visible` false) items too. This is the opposite of a stack panel (LAY-04), so putting conditional items in a grid leaves empty cells. Make lists that must collapse with a stack panel. In the Cinnabar reconstruction too, grid cell positions are decided by index, so hidden cells take up space."
    },
    "sources": "BW-dyn \"Useful Information\", CN"
  },
  "LAY-32": {
    "id": "LAY-32",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-32",
    "proposal": false,
    "evidence": [
      "미검증",
      "바닐라"
    ],
    "title": {
      "ko": "`grid_rescaling_type: \"vertical\"`은 게임을 크래시시킬 수 있다는 경고가 있다. 바닐라는 1회(`store_item_list_screen.json`) 쓴다. 새로 만들 때는 `horizontal`을 쓴다.",
      "en": "There is a warning that `grid_rescaling_type: \"vertical\"` can crash the game. Vanilla uses it once (`store_item_list_screen.json`). When building something new, use `horizontal`."
    },
    "detail": {
      "ko": "`grid_rescaling_type: \"vertical\"`은 게임을 크래시시킬 수 있다는 경고가 있다. 바닐라는 1회(`store_item_list_screen.json`) 쓴다. 새로 만들 때는 `horizontal`을 쓴다.",
      "en": "There is a warning that `grid_rescaling_type: \"vertical\"` can crash the game. Vanilla uses it once (`store_item_list_screen.json`). When making something new, use `horizontal`."
    },
    "sources": "BW-dyn, VN"
  },
  "LAY-33": {
    "id": "LAY-33",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-33",
    "proposal": false,
    "evidence": [
      "미검증",
      "바닐라"
    ],
    "title": {
      "ko": "`alpha`는 그 컨트롤만 투명하게 하고 자식에는 전파되지 않는다. 자식까지 함께 투명하게 하려면 `propagate_alpha: true`를 준다(BND-15). `layer`는 음수도 되며 부모보다 아래에 그린다.",
      "en": "`alpha` makes only that control transparent and is not propagated to children. To make the children transparent too, give `propagate_alpha: true` (BND-15). `layer` can also be negative and draws below the parent."
    },
    "detail": {
      "ko": "`alpha`는 그 컨트롤만 투명하게 하고 자식에는 전파되지 않는다. 자식까지 함께 투명하게 하려면 `propagate_alpha: true`를 준다(BND-15). `layer`는 음수도 되며 부모보다 아래에 그린다.",
      "en": "`alpha` makes only that control transparent and is not propagated to children. To make children transparent too, give `propagate_alpha: true` (BND-15). `layer` may be negative and then draws below the parent."
    },
    "sources": "BW-doc Control 표"
  },
  "LAY-34": {
    "id": "LAY-34",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-34",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "크기 키워드 `\"fill\"`, `\"default\"`는 소문자 그대로일 때만 키워드다. 단위 없는 숫자 문자열(`\"10\"`)은 0이 된다. 숫자로 쓰거나 `\"10px\"`로 쓴다.",
      "en": "The size keywords `\"fill\"` and `\"default\"` are keywords only when written in lowercase as is. A numeric string without a unit (`\"10\"`) becomes 0. Write it as a number or as `\"10px\"`."
    },
    "detail": {
      "ko": "크기 키워드 `\"fill\"`, `\"default\"`는 소문자 그대로일 때만 키워드다. 단위 없는 숫자 문자열(`\"10\"`)은 0이 된다. 숫자로 쓰거나 `\"10px\"`로 쓴다.",
      "en": "The size keywords `\"fill\"` and `\"default\"` are keywords only when exactly in lowercase. A unitless numeric string (`\"10\"`) becomes 0. Write it as a number or as `\"10px\"`."
    },
    "sources": "CN-run"
  },
  "LAY-35": {
    "id": "LAY-35",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-35",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "크기 식의 부호는 다음 부호까지 이어진다: `\"100% - 10px 5px\"`는 100% − 15px. 항마다 부호를 쓴다.",
      "en": "The sign in a size expression carries on to the next sign: `\"100% - 10px 5px\"` is 100% - 15px. Write a sign on every term."
    },
    "detail": {
      "ko": "크기 식의 부호는 다음 부호까지 이어진다: `\"100% - 10px 5px\"`는 100% − 15px. 항마다 부호를 쓴다.",
      "en": "The sign in a size expression carries on to the next sign: `\"100% - 10px 5px\"` is 100% - 15px. Write a sign on every term."
    },
    "sources": "CN-run"
  },
  "LAY-36": {
    "id": "LAY-36",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-36",
    "proposal": false,
    "evidence": [
      "바닐라",
      "코드"
    ],
    "title": {
      "ko": "`%c`, `%cm`, `%sm`은 `%` 뒤에 쓴다. 바닐라 progress_screen.json의 `\"100c%\"`, `\"50c%\"`는 부모 기준 `%`로 읽힌다.",
      "en": "Write `%c`, `%cm`, and `%sm` after the `%`. The `\"100c%\"` and `\"50c%\"` in vanilla progress_screen.json are read as a `%` of the parent."
    },
    "detail": {
      "ko": "`%c`, `%cm`, `%sm`은 `%` 뒤에 쓴다. 바닐라 progress_screen.json의 `\"100c%\"`, `\"50c%\"`는 부모 기준 `%`로 읽힌다.",
      "en": "`%c`, `%cm` and `%sm` are written after `%`. `\"100c%\"` and `\"50c%\"` in vanilla progress_screen.json are read as parent-based `%`."
    },
    "sources": "VN progress_screen.json:21·31·48, CN-run"
  },
  "LAY-37": {
    "id": "LAY-37",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-37",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "`%cm`과 `%sm`은 계수를 무시하고 최대값 자체다. `\"50%cm\"`도 가장 큰 자식 크기다. 절반이 필요하면 감싼 패널에서 다시 `%`로 줄인다.",
      "en": "`%cm` and `%sm` ignore the factor and are the maximum itself. `\"50%cm\"` is also the size of the largest child. If you need half, shrink it again with `%` in a wrapping panel."
    },
    "detail": {
      "ko": "`%cm`과 `%sm`은 계수를 무시하고 최대값 자체다. `\"50%cm\"`도 가장 큰 자식 크기다. 절반이 필요하면 감싼 패널에서 다시 `%`로 줄인다.",
      "en": "`%cm` and `%sm` ignore the coefficient and are the maximum value itself. `\"50%cm\"` is also the largest child size. If you need half, shrink again with `%` in a wrapping panel."
    },
    "sources": "CN-run, CN 테스트 G06·G07"
  },
  "LAY-38": {
    "id": "LAY-38",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-38",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "스택 패널의 자식은 `offset`을 무시하고, `use_child_anchors: true`가 없으면 앵커도 무시한다. 생략한 스택 패널의 진행 축 크기는 `100%c`다.",
      "en": "Children of a stack panel ignore `offset`, and also ignore anchors unless `use_child_anchors: true`. An omitted main-axis size of a stack panel is `100%c`."
    },
    "detail": {
      "ko": "스택 패널의 자식은 `offset`을 무시하고, `use_child_anchors: true`가 없으면 앵커도 무시한다. 생략한 스택 패널의 진행 축 크기는 `100%c`다.",
      "en": "Children of a stack panel ignore `offset`, and ignore anchors too unless `use_child_anchors: true`. The main axis size of an omitted stack panel is `100%c`."
    },
    "sources": "CN 테스트 S04, CN"
  },
  "LAY-39": {
    "id": "LAY-39",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-39",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "최소·최대가 충돌하면(`min > max`) 큰 값은 최대로 잘린다. 스택 진행 축 밖의 `fill`은 0이다.",
      "en": "If minimum and maximum conflict (`min > max`), the larger value is clamped to the maximum. A `fill` off the stack main axis is 0."
    },
    "detail": {
      "ko": "최소·최대가 충돌하면(`min > max`) 큰 값은 최대로 잘린다. 스택 진행 축 밖의 `fill`은 0이다.",
      "en": "If minimum and maximum conflict (`min > max`), the larger value is clipped to the maximum. `fill` outside the stack's main axis is 0."
    },
    "sources": "CN"
  },
  "LAY-40": {
    "id": "LAY-40",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-40",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "스택 `use_priority: true`는 자식 합이 넘칠 때 `priority`가 낮은 자식부터 남기고(0 이하는 항상 남김) 들어가지 않는 자식을 숨긴다.",
      "en": "With stack `use_priority: true`, when the children's sum overflows, it keeps children from the lowest `priority` (0 or below is always kept) and hides the ones that do not fit."
    },
    "detail": {
      "ko": "스택 `use_priority: true`는 자식 합이 넘칠 때 `priority`가 낮은 자식부터 남기고(0 이하는 항상 남김) 들어가지 않는 자식을 숨긴다.",
      "en": "With a stack's `use_priority: true`, when the sum of children overflows, children with the lowest `priority` are kept first (0 or lower always kept) and children that do not fit are hidden."
    },
    "sources": "CN 테스트 S05"
  },
  "LAY-41": {
    "id": "LAY-41",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-41",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "그리드 칸은 자기 `anchor`·`offset`을 무시한다. 템플릿 그리드는 행 우선 생성 순서로 칸을 채우고 용량을 넘는 칸은 만들지 않는다.",
      "en": "A grid cell ignores its own `anchor` and `offset`. A template grid fills cells in row-major creation order and does not create cells beyond capacity."
    },
    "detail": {
      "ko": "그리드 칸은 자기 `anchor`·`offset`을 무시한다. 템플릿 그리드는 행 우선 생성 순서로 칸을 채우고 용량을 넘는 칸은 만들지 않는다.",
      "en": "A grid cell ignores its own `anchor` and `offset`. A template grid fills cells in row-first creation order and does not create cells beyond capacity."
    },
    "sources": "CN 테스트 D01·D08"
  },
  "LAY-42": {
    "id": "LAY-42",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-42",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "스크롤 뷰는 역할 컨트롤(뷰포트, 내용, 트랙, 박스, 바 패널)을 이름으로 너비 우선 검색하므로 트리 안 위치는 자유지만, 넷 중 하나라도 없으면 스크롤하지 않는다. 박스는 트랙의 10% 이상이고 내용이 들어맞으면 바 패널이 숨는다.",
      "en": "A scroll view searches its role controls (viewport, content, track, box, bar panel) by name breadth-first, so the position in the tree is free, but if any one of the four is missing it does not scroll. The box is at least 10% of the track, and if the content fits the bar panel hides."
    },
    "detail": {
      "ko": "스크롤 뷰는 역할 컨트롤(뷰포트, 내용, 트랙, 박스, 바 패널)을 이름으로 너비 우선 검색하므로 트리 안 위치는 자유지만, 넷 중 하나라도 없으면 스크롤하지 않는다. 박스는 트랙의 10% 이상이고 내용이 들어맞으면 바 패널이 숨는다.",
      "en": "A scroll view searches for the role controls (viewport, content, track, box, bar panel) breadth-first by name, so their position in the tree is free, but if any one of the four is missing it does not scroll. The bar panel hides when the box is 10% or more of the track and the content fits."
    },
    "sources": "CN 테스트 V02·V07·V06"
  },
  "LAY-43": {
    "id": "LAY-43",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-43",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "앵커 값은 이름에 `left`·`right`·`top`·`bottom`이 들어 있는지로 판정하고 기본은 `center`다.",
      "en": "An anchor value is judged by whether the name contains `left`, `right`, `top`, or `bottom`, and the default is `center`."
    },
    "detail": {
      "ko": "앵커 값은 이름에 `left`·`right`·`top`·`bottom`이 들어 있는지로 판정하고 기본은 `center`다.",
      "en": "The anchor value is decided by whether the name contains `left`, `right`, `top` or `bottom`, and the default is `center`."
    },
    "sources": "CN"
  },
  "LAY-44": {
    "id": "LAY-44",
    "category": "LAY",
    "page": "json-ui/controls-and-layout",
    "anchor": "lay-44",
    "proposal": true,
    "evidence": [
      "바닐라"
    ],
    "title": {
      "ko": "크기·위치 식에는 `+`와 `-`만 쓴다.",
      "en": "(proposal) Use only `+` and `-` in size and position expressions."
    },
    "detail": {
      "ko": "크기·위치 식에는 `+`와 `-`만 쓴다. 바닐라 크기 문자열 551종(12,806회, 재집계 원소 12,712개)에 ``, `/`는 한 번도 없고, Mojang은 비율 계산을 주석으로 해 둔 뒤 결과 계수를 적는다(`store_common.json:5870`의 `\"34.628%x + 2px\"`, `store_search_screen.json:64` 주석). 소수 계수(`56.25%x`, `1.1249px`)와 음수 항(`\"-50% + 10px\"`)은 쓴다. 실측 과제: 크기 식에 ``를 쓰면(`\"50% * 2\"`) 무시되는지 오류인지.",
      "en": "(proposal) Use only `+` and `-` in size and position expressions. The 551 kinds of vanilla size strings (12,806 uses, 12,712 elements on recount) never have `` or `/`, and Mojang does ratio calculations in a comment and then writes the resulting coefficient (`\"34.628%x + 2px\"` in `store_common.json:5870`, a comment in `store_search_screen.json:64`). Decimal coefficients (`56.25%x`, `1.1249px`) and negative terms (`\"-50% + 10px\"`) are used. Measurement task: whether using `` in a size expression (`\"50% * 2\"`) is ignored or an error."
    },
    "sources": "jua-jsonui-schemas, bedrock-samples"
  },
  "LAY-45": {
    "id": "LAY-45",
    "category": "LAY",
    "page": "json-ui/controls-and-layout",
    "anchor": "lay-45",
    "proposal": true,
    "evidence": [
      "바닐라",
      "코드"
    ],
    "title": {
      "ko": "`anchor_from`과 `anchor_to`는 함께 적는다.",
      "en": "(proposal) Write `anchor_from` and `anchor_to` together."
    },
    "detail": {
      "ko": "`anchor_from`과 `anchor_to`는 함께 적는다. 바닐라는 2,997곳 중 2,985곳(99.6%)에서 둘 다 적고 그중 106곳은 서로 다르다(하나만 적은 곳 12곳, 각 6). 생략했을 때의 기본값은 도구마다 다르게 가정한다(JsonForge·Cinnabar는 `center`, w1zardz 편집기는 `anchor_to`가 `anchor_from`과 같다고 본다).",
      "en": "(proposal) Write `anchor_from` and `anchor_to` together. Vanilla writes both in 2,985 of 2,997 places (99.6%), and in 106 of those they differ from each other (12 places write only one, 6 each). Tools assume different defaults when they are omitted (JsonForge and Cinnabar assume `center`, and the w1zardz editor treats `anchor_to` as equal to `anchor_from`)."
    },
    "sources": "jua-jsonforge, jua-bedrock-json-ui-editor, jua-cinnabar, bedrock-samples"
  },
  "LAY-46": {
    "id": "LAY-46",
    "category": "LAY",
    "page": "json-ui/controls-and-layout",
    "anchor": "lay-46",
    "proposal": true,
    "evidence": [],
    "title": {
      "ko": "`\"100%c\"` 부모 안의 자식에 같은 축 `%` 크기를 주지 않는다.",
      "en": "(proposal) Do not give a child inside a `\"100%c\"` parent a `%` size on the same axis."
    },
    "detail": {
      "ko": "`\"100%c\"` 부모 안의 자식에 같은 축 `%` 크기를 주지 않는다. 자식 크기가 부모를, 부모 크기가 자식을 정하는 순환이 되어 아무것도 그려지지 않는다는 도구 저자의 기록이 있다. 내용 패널의 자식은 픽셀이나 `default`로 준다. 병합 기록은 근거를 엔진 코드가 아니라 편집기 저자의 주석으로 보고 수준을 `바닐라, 미검증`(바닐라 0/1,972 집계가 근거)으로 낮췄다. 같은 병합에서 LAY-17에 \"오른쪽·아래 앵커여도 축은 뒤집히지 않는다\"는 보강(C-49 해소)이 함께 제안되었다: 바닐라 206개 파일 분포에서 오른쪽 앵커 x는 음수 104 대 양수 37, 아래 앵커 y는 음수 190 대 양수 45이고 `common.close_button`이 `top_right` 앵커에 `[-2, 2]`를 쓴다(`ui_common.json:3239-3246`).",
      "en": "(proposal) Do not give a child inside a `\"100%c\"` parent a `%` size on the same axis. The child size decides the parent and the parent size decides the child, making a cycle where nothing is drawn, according to a record by a tool author. Give children of a content panel pixels or `default`. The merge record treated the evidence as a comment by the editor author, not engine code, and lowered the level to `vanilla, unverified` (the basis is the vanilla 0/1,972 tally). In the same merge, a reinforcement to LAY-17, \"the axis is not flipped even for right and bottom anchors\" (C-49 resolved), was proposed together: in the distribution over 206 vanilla files, right-anchor x is negative 104 to positive 37 and bottom-anchor y is negative 190 to positive 45, and `common.close_button` uses `[-2, 2]` with a `top_right` anchor (`ui_common.json:3239-3246`)."
    },
    "sources": "jua-jsonforge, bedrock-samples"
  },
  "LAY-47": {
    "id": "LAY-47",
    "category": "LAY",
    "page": "json-ui/controls-and-layout",
    "anchor": "lay-47",
    "proposal": true,
    "evidence": [
      "바닐라",
      "미검증"
    ],
    "title": {
      "ko": "화면의 UI 픽셀 크기는 고정값이 아니다.",
      "en": "(proposal) The UI pixel size of a screen is not a fixed value."
    },
    "detail": {
      "ko": "화면의 UI 픽셀 크기는 고정값이 아니다. 창 크기와 GUI 배율에 따라 달라지고 시각 편집기들도 서로 다른 값을 가정한다(w1zardz 427×240·520×240·320×240, JsonForge 384×216). 고정 px는 정수 배율을 곱해 그려지고, 바닐라 레이아웃은 최소 가상 화면을 포켓 320×210, 데스크톱 376×250으로 가정한다(`ui_common.json:6380`, `6430` 주석). 최상위 창을 이 크기 안에 두면 어떤 해상도에서도 잘리지 않는다. 화면 가장자리에 붙는 요소는 해당 모서리 앵커와 작은 픽셀 offset으로 놓는다. 단 1.26.0에서 배율 체계가 바뀌어(최소 배율은 최대의 절반, 휴대 기기는 DPI 기반) 배율 계산식 자체는 1.26.50에서 다시 확인해야 한다(MS Learn Update1.26.0).",
      "en": "(proposal) The UI pixel size of a screen is not a fixed value. It varies with window size and GUI scale, and visual editors also assume different values (w1zardz 427x240, 520x240, 320x240, JsonForge 384x216). Fixed px are drawn multiplied by an integer scale, and vanilla layouts assume minimum virtual screens of pocket 320x210 and desktop 376x250 (comments at `ui_common.json:6380` and `6430`). If you keep the top-level window within this size it is not cut off at any resolution. Elements attached to the screen edge are placed with the corresponding corner anchor and a small pixel offset. But the scale system changed in 1.26.0 (the minimum scale is half the maximum, and handheld devices are DPI based), so the scale calculation itself must be rechecked in 1.26.50 (MS Learn Update1.26.0)."
    },
    "sources": "jua-netease-docs, ms-learn, jua-bedrock-json-ui-editor, jua-jsonforge"
  },
  "LAY-48": {
    "id": "LAY-48",
    "category": "LAY",
    "page": "json-ui/controls-and-layout",
    "anchor": "lay-48",
    "proposal": true,
    "evidence": [
      "바닐라"
    ],
    "title": {
      "ko": "`common.scrolling_panel`은 `$touch`에 따라 `scroll_touch`(터치)와 `scroll_mouse`(마우스) 하위 트리 중 하나만 만든다(`ui_common.json:4718-4750`).",
      "en": "(proposal) `common.scrolling_panel` creates only one of the `scroll_touch` (touch) and `scroll_mouse` (mouse) subtrees depending on `$touch` (`ui_common.json:4718-4750`)."
    },
    "detail": {
      "ko": "`common.scrolling_panel`은 `$touch`에 따라 `scroll_touch`(터치)와 `scroll_mouse`(마우스) 하위 트리 중 하나만 만든다(`ui_common.json:4718-4750`). 스크롤 내용까지의 경로와 크기 변수(`_touch` 짝)가 입력 모드마다 다르므로, 경로 키나 `source_control_name`으로 스크롤 안을 가리키면 두 경로를 다 고려하거나 인스턴스에 `\"$touch\": true`를 넘겨 한쪽으로 고정한다(`resource_packs_screen.json:2685`도 그렇게 한다).",
      "en": "(proposal) `common.scrolling_panel` creates only one of the `scroll_touch` (touch) and `scroll_mouse` (mouse) subtrees depending on `$touch` (`ui_common.json:4718-4750`). The path to the scroll content and the size variables (the `_touch` pair) differ per input mode, so when pointing inside a scroll with path keys or `source_control_name`, consider both paths or pin one side by passing `\"$touch\": true` to the instance (`resource_packs_screen.json:2685` does the same)."
    },
    "sources": "jua-netease-docs, bedrock-samples"
  },
  "LAY-49": {
    "id": "LAY-49",
    "category": "LAY",
    "page": "json-ui/controls-and-layout",
    "anchor": "lay-49",
    "proposal": true,
    "evidence": [
      "코드",
      "미검증",
      "충돌"
    ],
    "title": {
      "ko": "`#anchored_offset_value_x/y`는 `use_anchored_offset: true`인 컨트롤에서 값 곱하기 부모 크기만큼 앵커 방향으로 민다.",
      "en": "(proposal) `#anchored_offset_value_x/y` pushes in the anchor direction by value times the parent size on a control with `use_anchored_offset: true`."
    },
    "detail": {
      "ko": "`#anchored_offset_value_x/y`는 `use_anchored_offset: true`인 컨트롤에서 값 곱하기 부모 크기만큼 앵커 방향으로 민다. `anchor_from`이 `center`면 효과가 없다. 정적 컨트롤에서 쓰려면 모서리·가장자리 앵커를 준다. 충돌 C-61.",
      "en": "(proposal) `#anchored_offset_value_x/y` pushes in the anchor direction by value times the parent size on a control with `use_anchored_offset: true`. It has no effect if `anchor_from` is `center`. To use it on a static control, give a corner or edge anchor. Conflict C-61."
    },
    "sources": "jua-cinnabar, jua-json-ui-examples, jua-bedrock-core"
  },
  "LAY-50": {
    "id": "LAY-50",
    "category": "LAY",
    "page": "json-ui/controls-and-layout",
    "anchor": "lay-50",
    "proposal": true,
    "evidence": [
      "코드",
      "미검증",
      "충돌"
    ],
    "title": {
      "ko": "엔진 컬렉션 그리드(`hotbar_items` 등)를 다른 모양으로 그릴 때는 바닐라 정의를 복사하면서 `grid_dimension_binding` 속성 자체를 지우고 `grid_dimensions`를 고정한다.",
      "en": "(proposal) When drawing an engine collection grid (`hotbar_items`, etc.) in another shape, copy the vanilla definition while removing the `grid_dimension_binding` property itself and fixing `grid_dime"
    },
    "detail": {
      "ko": "엔진 컬렉션 그리드(`hotbar_items` 등)를 다른 모양으로 그릴 때는 바닐라 정의를 복사하면서 `grid_dimension_binding` 속성 자체를 지우고 `grid_dimensions`를 고정한다. `bindings`만 비우면 Cinnabar 모델에서는 차원 바인딩이 자동으로 다시 붙는다. 충돌 C-62.",
      "en": "(proposal) When drawing an engine collection grid (`hotbar_items`, etc.) in another shape, copy the vanilla definition while removing the `grid_dimension_binding` property itself and fixing `grid_dimensions`. Just emptying `bindings` makes the dimension binding automatically reattach in the Cinnabar model. Conflict C-62."
    },
    "sources": "jua-cinnabar, jua-json-ui-examples, bedrock-samples"
  },
  "LAY-51": {
    "id": "LAY-51",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-51",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "두 열을 가로 `stack_panel`에 세로 스택 둘로 넣으면 높이가 0이 됐다. `panel`(높이 `100%cm`) 안에 왼쪽 위·오른쪽 위로 붙인 세로 스택 둘을 둔다.",
      "en": "Putting two columns as two vertical stacks in a horizontal `stack_panel` gave a height of 0. Put the two vertical stacks, attached top-left and top-right, inside a `panel` (height `100%cm`)."
    },
    "detail": {
      "ko": "두 열을 가로 `stack_panel`에 세로 스택 둘로 넣으면 높이가 0이 됐다. `panel`(높이 `100%cm`) 안에 왼쪽 위·오른쪽 위로 붙인 세로 스택 둘을 둔다.",
      "en": "Putting two columns as two vertical stacks in a horizontal `stack_panel` gave height 0. Put two vertical stacks attached to the top left and top right inside a `panel` (height `100%cm`)."
    },
    "sources": "DF"
  },
  "LAY-52": {
    "id": "LAY-52",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-52",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "왼쪽 판과 오른쪽 상세를 가로 스택에 두면 `100%c`는 두 높이를 더했고 `100%cm`은 오른쪽 상세를 접었다. 판들을 `panel` 안에 왼쪽 위 기준과 `offset`으로 두고 그 `panel`의 `100%c`(자식 범위)를 쓴다.",
      "en": "With a left board and a right detail in a horizontal stack, `100%c` added the two heights and `100%cm` collapsed the right detail. Place the boards inside a `panel` with a top-left reference and `offset`, and use that `panel`'s `100%c` (child range)."
    },
    "detail": {
      "ko": "왼쪽 판과 오른쪽 상세를 가로 스택에 두면 `100%c`는 두 높이를 더했고 `100%cm`은 오른쪽 상세를 접었다. 판들을 `panel` 안에 왼쪽 위 기준과 `offset`으로 두고 그 `panel`의 `100%c`(자식 범위)를 쓴다.",
      "en": "With a left panel and a right detail in a horizontal stack, `100%c` added the two heights and `100%cm` collapsed the right detail. Put the panels inside a `panel` with a top-left reference and `offset`, and use that `panel`'s `100%c` (the child extent)."
    },
    "sources": "DF"
  },
  "LAY-53": {
    "id": "LAY-53",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-53",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "창 높이를 `100%c`로 내용에 맞추면 창과 내용이 서로를 참조해 무너졌다(버튼이 창 밖으로). 서버 폼 창은 고정 픽셀 크기로 두고, 넘치는 내용은 안쪽 `scrolling_panel`이나 서버의 쪽 나누기로 처리한다. 휴대폰은 UI를 크게 그리므로 바닐라 인벤토리(326×166)보다 큰 창은 화면에 들어가지 않는다.",
      "en": "Fitting the window height to content with `100%c` made the window and content refer to each other and collapse (buttons outside the window). Keep the server form window at a fixed pixel size, and handle overflowing content with an inner `scrolling_panel` or paging on the server. Phones draw UI large, so a window bigger than the vanilla inventory (326×166) does not fit on screen."
    },
    "detail": {
      "ko": "창 높이를 `100%c`로 내용에 맞추면 창과 내용이 서로를 참조해 무너졌다(버튼이 창 밖으로). 서버 폼 창은 고정 픽셀 크기로 두고, 넘치는 내용은 안쪽 `scrolling_panel`이나 서버의 쪽 나누기로 처리한다. 휴대폰은 UI를 크게 그리므로 바닐라 인벤토리(326×166)보다 큰 창은 화면에 들어가지 않는다.",
      "en": "Fitting the window height to the content with `100%c` made the window and content refer to each other and collapse (buttons went outside the window). Keep a server form window at a fixed pixel size and handle overflowing content with an inner `scrolling_panel` or server-side paging. Phones draw the UI large, so a window bigger than the vanilla inventory (326x166) does not fit on screen."
    },
    "sources": "DF"
  },
  "LAY-54": {
    "id": "LAY-54",
    "category": "LAY",
    "page": "reference/rules",
    "anchor": "lay-54",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "목록 칸을 내용 높이(`100%c + 8px`)로 두면 빈 목록은 얇은 막대가 되고 긴 목록은 창 밖으로 나갔다. 목록 칸은 창 높이로 고정하고 그 안에 `common.scrolling_panel`을 둔다. 버튼 칸을 고정 높이로 두면 위에 본문이 붙을 때 스크롤바가 생기므로 `stack_panel` `100%c`로 버튼만큼만 차지하게 한다.",
      "en": "With list cells at content height (`100%c + 8px`), an empty list became a thin bar and a long list went outside the window. Fix list cells at the window height and put `common.scrolling_panel` inside. If button cells are given a fixed height, a scrollbar appears when body text is attached above, so make them a `stack_panel` `100%c` that takes only as much as the buttons."
    },
    "detail": {
      "ko": "목록 칸을 내용 높이(`100%c + 8px`)로 두면 빈 목록은 얇은 막대가 되고 긴 목록은 창 밖으로 나갔다. 목록 칸은 창 높이로 고정하고 그 안에 `common.scrolling_panel`을 둔다. 버튼 칸을 고정 높이로 두면 위에 본문이 붙을 때 스크롤바가 생기므로 `stack_panel` `100%c`로 버튼만큼만 차지하게 한다.",
      "en": "Making a list cell the content height (`100%c + 8px`) made an empty list a thin bar and let a long list go outside the window. Fix the list cell to the window height and put `common.scrolling_panel` inside it. If you fix a button cell at a fixed height, a scrollbar appears when a body is attached above it, so use a `stack_panel` `100%c` so that it takes only as much as the buttons."
    },
    "sources": "DF"
  },
  "LAY-55": {
    "id": "LAY-55",
    "category": "LAY",
    "page": "json-ui/controls-and-layout",
    "anchor": "lay-55",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "스크롤 영역 안에서 팩토리나 grid가 만든 칸의 라벨을 배경 이미지와 같은 레이어(기본 0)에 두면, 아이콘과 진행 막대는 바로 보이는데 글자는 무언가를 건드리기 전까지 비었다(건드린 칸만 나타나기도 했다).",
      "en": "When the label of a cell created by a factory or grid inside a scroll area was put on the same layer as the background image (default 0), icons and progress bars showed immediately but text was empty "
    },
    "detail": {
      "ko": "스크롤 영역 안에서 팩토리나 grid가 만든 칸의 라벨을 배경 이미지와 같은 레이어(기본 0)에 두면, 아이콘과 진행 막대는 바로 보이는데 글자는 무언가를 건드리기 전까지 비었다(건드린 칸만 나타나기도 했다). 라벨을 배경보다 높은 레이어(아이콘 2, 라벨 3)에 두자 열자마자 모두 보였다. 바닐라 버튼 라벨도 `layer: 2`다. `binding_condition`, 식 유무, 팩토리 유무, 자르기, 스크롤 갱신은 이 증상과 관계없었다.",
      "en": "When the label of a cell created by a factory or grid inside a scroll area was put on the same layer as the background image (default 0), icons and progress bars showed immediately but text was empty until something touched it (sometimes only the touched cell appeared). Putting the label on a layer higher than the background (icon 2, label 3) made everything visible as soon as it opened. Vanilla button labels are also `layer: 2`. `binding_condition`, having an expression or not, having a factory or not, clipping and scroll refresh had nothing to do with this symptom."
    },
    "sources": "FFR"
  },
  "LAY-56": {
    "id": "LAY-56",
    "category": "LAY",
    "page": "json-ui/controls-and-layout",
    "anchor": "lay-56",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "`stack_panel` 자식에 준 `offset`은 스택이 정한 위치를 옮기지 않았다.",
      "en": "The `offset` given to `stack_panel` children did not move the position the stack decided."
    },
    "detail": {
      "ko": "`stack_panel` 자식에 준 `offset`은 스택이 정한 위치를 옮기지 않았다. 가로 스택에 칸 48개를 두고 줄마다 `offset`으로 접으려 하자 한 줄로 이어져 창 밖까지 나갔다. 2차원 배치는 세로 스택 안에 가로 스택 줄을 둔다.",
      "en": "The `offset` given to `stack_panel` children did not move the position the stack decided. When 48 cells were put in a horizontal stack and folded per row with `offset`, they ran in one line out of the window. For 2D layout, put horizontal stack rows inside a vertical stack."
    },
    "sources": "FFR"
  },
  "LAY-57": {
    "id": "LAY-57",
    "category": "LAY",
    "page": "json-ui/controls-and-layout",
    "anchor": "lay-57",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "화면 전체를 덮는 스크롤 영역(`common.scrolling_panel`)은 내용이 비어 있어도 그 영역의 터치를 가져갔다.",
      "en": "A scroll area covering the whole screen (`common.scrolling_panel`) took over touches of that area even when its content was empty."
    },
    "detail": {
      "ko": "화면 전체를 덮는 스크롤 영역(`common.scrolling_panel`)은 내용이 비어 있어도 그 영역의 터치를 가져갔다. `$screen_content`에 늘 두자 다른 폼의 바닐라 버튼과 닫기 버튼이 눌리지 않고 스크롤만 됐다. 스크롤 영역은 그것을 쓰는 폼에서만 만들거나 보이게 한다.",
      "en": "A scroll area covering the whole screen (`common.scrolling_panel`) took over touches of that area even when its content was empty. When it was always placed in `$screen_content`, the vanilla buttons and close button of other forms could not be pressed and only scrolling worked. Create or show a scroll area only in the form that uses it."
    },
    "sources": "FFR"
  },
  "MOD-01": {
    "id": "MOD-01",
    "category": "MOD",
    "page": "reference/rules",
    "anchor": "mod-01",
    "proposal": false,
    "evidence": [
      "작동팩",
      "코드",
      "바닐라"
    ],
    "title": {
      "ko": "`modifications`는 `array_name`, `operation`, `value`(넣을 항목 배열), `where`(지울 항목을 찾는 조건)로 쓴다. 이 프로젝트 출처에서 확인된 `operation`은 `insert_back`, `insert_front`, `remove`다. 바닐라 자신은 `modifications`를 한 번도 쓰지 않는다(팩 전용 기능). 엔진의 연산 이름표는 11가지이고(MOD-23), 나머지 8가지의 게임 동작은 이 프로젝트 출처에서 확인되지 않았다(MOD-14).",
      "en": "`modifications` is written with `array_name`, `operation`, `value` (the array of entries to insert), and `where` (the condition that finds the entry to delete). The `operation`s confirmed in this project's sources are `insert_back`, `insert_front`, and `remove`. Vanilla itself never uses `modifications` (a pack-only feature). The engine's operation name table has 11 entries (MOD-23), and the game behavior of the other 8 is not confirmed in this project's sources (MOD-14)."
    },
    "detail": {
      "ko": "`modifications`는 `array_name`, `operation`, `value`(넣을 항목 배열), `where`(지울 항목을 찾는 조건)로 쓴다. 이 프로젝트 출처에서 확인된 `operation`은 `insert_back`, `insert_front`, `remove`다. 바닐라 자신은 `modifications`를 한 번도 쓰지 않는다(팩 전용 기능). 엔진의 연산 이름표는 11가지이고(MOD-23), 나머지 8가지의 게임 동작은 이 프로젝트 출처에서 확인되지 않았다(MOD-14).",
      "en": "`modifications` is written with `array_name`, `operation`, `value` (the array of items to insert) and `where` (the condition that finds the item to delete). The `operation`s confirmed in this project's sources are `insert_back`, `insert_front` and `remove`. Vanilla itself never uses `modifications` (a pack-only feature). The engine's operation name table has 11 kinds (MOD-23), and the in-game behavior of the other 8 was not confirmed in this project's sources (MOD-14)."
    },
    "sources": "AP-samples hud_screen.json, BA 2장, BC 4.1, VN 0회, NB-01"
  },
  "MOD-02": {
    "id": "MOD-02",
    "category": "MOD",
    "page": "reference/rules",
    "anchor": "mod-02",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "`modifications`는 파일 경로 단위로 해석된다. 바닐라 파일과 같은 경로의 사본에 쓴 것만 바닐라 정의에 적용되고, 여러 팩의 것이 팩 순서대로 쌓인다. 다른 경로 파일에 쓰면, 팩 자신의 namespace 정의는 새 정의로 읽혀 원래 정의를 대체하고(`Type not specified`, `Unknown property [modifications]`), 바닐라 정의는 조용히 무시된다(FILE-22). Cinnabar 재구성은 이 구분 없이 namespace와 이름만으로 합치지만, 실측을 따른다(부록A C-46).",
      "en": "`modifications` is interpreted per file path. Only what is written in a copy at the same path as a vanilla file applies to the vanilla definition, and those from several packs stack in pack order. If written in a file at another path, the pack's own namespace definition is read as a new definition and replaces the original (`Type not specified`, `Unknown property [modifications]`), and the vanilla definition is silently ignored (FILE-22). The Cinnabar reconstruction merges by namespace and name only, without this distinction, but the measurement is followed (Appendix A C-46)."
    },
    "detail": {
      "ko": "`modifications`는 파일 경로 단위로 해석된다. 바닐라 파일과 같은 경로의 사본에 쓴 것만 바닐라 정의에 적용되고, 여러 팩의 것이 팩 순서대로 쌓인다. 다른 경로 파일에 쓰면, 팩 자신의 namespace 정의는 새 정의로 읽혀 원래 정의를 대체하고(`Type not specified`, `Unknown property [modifications]`), 바닐라 정의는 조용히 무시된다(FILE-22). Cinnabar 재구성은 이 구분 없이 namespace와 이름만으로 합치지만, 실측을 따른다(충돌 C-46).",
      "en": "`modifications` is interpreted per file path. Only what is written in a copy at the same path as a vanilla file applies to vanilla definitions, and those of several packs stack in pack order. If written in a file at a different path, the pack's own namespace definition is read as a new definition and replaces the original definition (`Type not specified`, `Unknown property [modifications]`), and a vanilla definition is silently ignored (FILE-22). The Cinnabar reconstruction merges by namespace and name only without this distinction, but measurement is followed (conflict C-46)."
    },
    "sources": "BC-facts, 부록A C-46"
  },
  "MOD-03": {
    "id": "MOD-03",
    "category": "MOD",
    "page": "reference/rules",
    "anchor": "mod-03",
    "proposal": false,
    "evidence": [
      "실측",
      "코드",
      "충돌"
    ],
    "title": {
      "ko": "게임에서 `modifications`가 닿은 배열은 `controls`와 `bindings`이고, `variables`를 지정하면 무시되었다. 엔진은 `array_name`을 고정 목록으로 거르지 않으므로(MOD-25) `button_mappings` 같은 다른 배열도 해석은 되지만 효과는 실측되지 않았다(부록A C-64). `target_control` 키는 엔진이 실제로 읽는다(MOD-24).",
      "en": "The arrays `modifications` reached in game were `controls` and `bindings`, and specifying `variables` was ignored. The engine does not filter `array_name` against a fixed list (MOD-25), so other arrays such as `button_mappings` are also interpreted, but the effect was not measured (Appendix A C-64). The engine does read the `target_control` key (MOD-24)."
    },
    "detail": {
      "ko": "게임에서 `modifications`가 닿은 배열은 `controls`와 `bindings`이고, `variables`를 지정하면 무시되었다. 엔진은 `array_name`을 고정 목록으로 거르지 않으므로(MOD-25) `button_mappings` 같은 다른 배열도 해석은 되지만 효과는 실측되지 않았다(충돌 C-64). `target_control` 키는 엔진이 실제로 읽는다(MOD-24).",
      "en": "In game, the arrays `modifications` reached were `controls` and `bindings`, and when `variables` was specified it was ignored. The engine does not filter `array_name` by a fixed list (MOD-25), so other arrays such as `button_mappings` are also resolved but their effect was not measured (conflict C-64). The engine actually reads the `target_control` key (MOD-24)."
    },
    "sources": "BC-facts, NB-02, NB-03, 부록A C-10, 부록A C-64"
  },
  "MOD-04": {
    "id": "MOD-04",
    "category": "MOD",
    "page": "reference/rules",
    "anchor": "mod-04",
    "proposal": false,
    "evidence": [
      "실측",
      "작동팩"
    ],
    "title": {
      "ko": "대상이 직접 선언하지 않고 상속만 받은 배열에 insert하면 새 배열이 생겨 상속받은 내용을 가린다(바닐라 내용이 통째로 사라짐). 그래서 배열을 직접 선언한 정의에 넣는다. 상속받은 배열이 원래 없는 정의(예: 바인딩이 없는 `hud_title_text`의 `bindings`)에 넣는 것은 문제없다.",
      "en": "Inserting into an array the target only inherits and does not declare directly creates a new array and hides the inherited content (the vanilla content disappears entirely). So insert into a definition that declares the array directly. Inserting into a definition that originally has no inherited array (for example `bindings` of `hud_title_text`, which has no bindings) is fine."
    },
    "detail": {
      "ko": "대상이 직접 선언하지 않고 상속만 받은 배열에 insert하면 새 배열이 생겨 상속받은 내용을 가린다(바닐라 내용이 통째로 사라짐). 그래서 배열을 직접 선언한 정의에 넣는다. 상속받은 배열이 원래 없는 정의(예: 바인딩이 없는 `hud_title_text`의 `bindings`)에 넣는 것은 문제없다.",
      "en": "If you insert into an array the target does not declare directly but only inherits, a new array is created and hides the inherited content (the vanilla content disappears wholesale). So put it into a definition that declares the array directly. Putting into a definition where the inherited array originally does not exist (for example `bindings` of `hud_title_text`, which has no bindings) is no problem."
    },
    "sources": "BC-facts, AP-samples hud_screen.json"
  },
  "MOD-05": {
    "id": "MOD-05",
    "category": "MOD",
    "page": "reference/rules",
    "anchor": "mod-05",
    "proposal": false,
    "evidence": [
      "실측",
      "작동팩"
    ],
    "title": {
      "ko": "파생 정의에서 상속받은 자식 컨트롤을 `remove`하면 로그도 없이 그 파일의 수정 전체가 적용되지 않는다. 반면 정의가 직접 가진 바인딩 항목을 `where`로 지정해 `remove`하는 것은 동작한다. 설정·인벤토리 화면에는 지우면 안 되는 필수 토글도 있다(MOD-16). Cinnabar 재구성은 진단만 남기고 나머지를 적용하지만, 실측을 따른다(부록A C-47).",
      "en": "If you `remove` an inherited child control in a derived definition, the whole modification of that file is not applied, with no log. In contrast, specifying a binding entry the definition itself holds with `where` and `remove`ing it works. Settings and inventory screens also have required toggles that must not be removed (MOD-16). The Cinnabar reconstruction leaves only a diagnostic and applies the rest, but the measurement is followed (Appendix A C-47)."
    },
    "detail": {
      "ko": "파생 정의에서 상속받은 자식 컨트롤을 `remove`하면 로그도 없이 그 파일의 수정 전체가 적용되지 않는다. 반면 정의가 직접 가진 바인딩 항목을 `where`로 지정해 `remove`하는 것은 동작한다. 설정·인벤토리 화면에는 지우면 안 되는 필수 토글도 있다(MOD-16). Cinnabar 재구성은 진단만 남기고 나머지를 적용하지만, 실측을 따른다(충돌 C-47).",
      "en": "If you `remove` an inherited child control in a derived definition, with no log, all modifications of that file do not apply. On the other hand, `remove` of a binding item the definition itself has, specified with `where`, works. The settings and inventory screens also have required toggles that must not be deleted (MOD-16). The Cinnabar reconstruction leaves only a diagnostic and applies the rest, but measurement is followed (conflict C-47)."
    },
    "sources": "BC-facts, AP 4.4, BW-doc, 부록A C-47"
  },
  "MOD-06": {
    "id": "MOD-06",
    "category": "MOD",
    "page": "reference/rules",
    "anchor": "mod-06",
    "proposal": false,
    "evidence": [
      "실측",
      "작동팩"
    ],
    "title": {
      "ko": "바닐라 컨트롤은 지우지 말고 바인딩으로 숨긴다. 숨김 조건을 `#visible` view 바인딩으로 덧붙이거나, 감싼 패널의 가시성으로 가린다. 설정·인벤토리 화면의 필수 토글은 빼면 개발 빌드에서 assert가 나므로 숨기더라도 남긴다(MOD-16).",
      "en": "Do not delete vanilla controls; hide them with a binding. Add the hiding condition as a `#visible` view binding, or cover it with the visibility of a wrapping panel. Required toggles on settings and inventory screens cause an assert in development builds if removed, so keep them even if hidden (MOD-16)."
    },
    "detail": {
      "ko": "바닐라 컨트롤은 지우지 말고 바인딩으로 숨긴다. 숨김 조건을 `#visible` view 바인딩으로 덧붙이거나, 감싼 패널의 가시성으로 가린다. 설정·인벤토리 화면의 필수 토글은 빼면 개발 빌드에서 assert가 나므로 숨기더라도 남긴다(MOD-16).",
      "en": "Do not delete vanilla controls; hide them with a binding. Add the hide condition as a `#visible` view binding, or hide with the visibility of a wrapping panel. Required toggles on the settings and inventory screens raise an assert in development builds if removed, so keep them even if hidden (MOD-16)."
    },
    "sources": "BC 6.3-7, BA 2장, AP 4.4, BW-doc"
  },
  "MOD-07": {
    "id": "MOD-07",
    "category": "MOD",
    "page": "reference/rules",
    "anchor": "mod-07",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "바닐라 `#visible` 바인딩을 내 조건과 AND로 묶으려면 원래 바인딩을 `remove`(`where`로 지정)한 뒤 `insert_front`로 원래 값과 내 값을 다시 읽어 합친다.",
      "en": "To AND the vanilla `#visible` binding with your own condition, `remove` the original binding (specified with `where`) and then `insert_front` to read the original value and your value again and combine them."
    },
    "detail": {
      "ko": "바닐라 `#visible` 바인딩을 내 조건과 AND로 묶으려면 원래 바인딩을 `remove`(`where`로 지정)한 뒤 `insert_front`로 원래 값과 내 값을 다시 읽어 합친다.",
      "en": "To AND the vanilla `#visible` binding with my condition, `remove` the original binding (specified with `where`) and then `insert_front` to read the original value and my value again and combine them."
    },
    "sources": "AP 4.4, AP-samples chat_screen.json"
  },
  "MOD-08": {
    "id": "MOD-08",
    "category": "MOD",
    "page": "reference/rules",
    "anchor": "mod-08",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "원래 `#visible` 바인딩이 없는 정의라면 `insert_back`으로 view 바인딩만 덧붙여도 숨길 수 있다(바닐라 `long_form`·`custom_form`에 제목 접두사 검사를 붙이는 방식).",
      "en": "If the definition originally has no `#visible` binding, you can hide it just by adding a view binding with `insert_back` (the way a title prefix check is attached to vanilla `long_form` and `custom_form`)."
    },
    "detail": {
      "ko": "원래 `#visible` 바인딩이 없는 정의라면 `insert_back`으로 view 바인딩만 덧붙여도 숨길 수 있다(바닐라 `long_form`·`custom_form`에 제목 접두사 검사를 붙이는 방식). , BW-form, BW-intro)",
      "en": "For a definition that originally has no `#visible` binding, you can hide with just a view binding appended with `insert_back` (the approach of attaching a title prefix check to vanilla `long_form` and `custom_form`). , BW-form, BW-intro)"
    },
    "sources": "BC 4.1-(1), BW-form, BW-intro"
  },
  "MOD-09": {
    "id": "MOD-09",
    "category": "MOD",
    "page": "reference/rules",
    "anchor": "mod-09",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "바닐라 정의를 직접 고치지 않고 감싼다. `\"래퍼\": { \"controls\": [ { \"long_form@server_form.long_form\": {} } ] }`는 다른 UI 팩이 `long_form`을 통째로 바꿔도 최종 병합 결과를 참조하므로, 래퍼에 건 가시성 조건이 살아남는다. BA는 2.0.2에서 이 구조로 \"UI 팩과 함께 쓰면 화면이 뒤섞이는\" 문제를 팩 순서와 무관하게 고쳤다.",
      "en": "Do not edit the vanilla definition directly; wrap it. `\"wrapper\": { \"controls\": [ { \"long_form@server_form.long_form\": {} } ] }` refers to the final merged result even if another UI pack replaces `long_form` entirely, so the visibility condition put on the wrapper survives. BA fixed the problem of \"screens mixing together when used with a UI pack\" with this structure in 2.0.2, regardless of pack order."
    },
    "detail": {
      "ko": "바닐라 정의를 직접 고치지 않고 감싼다. `\"래퍼\": { \"controls\": [ { \"long_form@server_form.long_form\": {} } ] }`는 다른 UI 팩이 `long_form`을 통째로 바꿔도 최종 병합 결과를 참조하므로, 래퍼에 건 가시성 조건이 살아남는다. BA는 2.0.2에서 이 구조로 \"UI 팩과 함께 쓰면 화면이 뒤섞이는\" 문제를 팩 순서와 무관하게 고쳤다.",
      "en": "Do not modify the vanilla definition directly; wrap it. `\"wrapper\": { \"controls\": [ { \"long_form@server_form.long_form\": {} } ] }` references the final merge result even if another UI pack replaces `long_form` wholesale, so the visibility condition put on the wrapper survives. In 2.0.2, BA used this structure to fix the problem of \"screens getting mixed up when used with UI packs\" regardless of pack order."
    },
    "sources": "BA 2장"
  },
  "MOD-10": {
    "id": "MOD-10",
    "category": "MOD",
    "page": "reference/rules",
    "anchor": "mod-10",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "바닐라 템플릿에 기능을 더할 때는 기본값이 꺼진 슬롯으로 넣는다. 예: `common_buttons.focus_border`에 `\"$show_hover_content|default\": false`와 `ignored`로 감싼 자식을 추가하면, 그 변수를 켠 버튼에만 영향이 간다.",
      "en": "When adding a feature to a vanilla template, add it as a slot that defaults to off. Example: adding `\"$show_hover_content|default\": false` and a child wrapped in `ignored` to `common_buttons.focus_border` affects only buttons that turn that variable on."
    },
    "detail": {
      "ko": "바닐라 템플릿에 기능을 더할 때는 기본값이 꺼진 슬롯으로 넣는다. 예: `common_buttons.focus_border`에 `\"$show_hover_content|default\": false`와 `ignored`로 감싼 자식을 추가하면, 그 변수를 켠 버튼에만 영향이 간다.",
      "en": "When adding a feature to a vanilla template, put it in as a slot that is off by default. Example: if you add `\"$show_hover_content|default\": false` and a child wrapped with `ignored` to `common_buttons.focus_border`, only buttons that turn that variable on are affected."
    },
    "sources": "AP 4.8"
  },
  "MOD-11": {
    "id": "MOD-11",
    "category": "MOD",
    "page": "reference/rules",
    "anchor": "mod-11",
    "proposal": false,
    "evidence": [
      "바닐라",
      "실측"
    ],
    "title": {
      "ko": "화면의 내용을 통째로 바꾸려면 화면 정의를 같은 경로 파일에서 재선언해 `$screen_content`를 바꾼다. 바닐라도 `shulker_box_screen@chest.small_chest_screen`, `barrel_screen@chest.small_chest_screen`처럼 같은 방식으로 화면을 만든다.",
      "en": "To replace the content of a screen wholesale, redeclare the screen definition in a file at the same path and change `$screen_content`. Vanilla also builds screens this way, as in `shulker_box_screen@chest.small_chest_screen` and `barrel_screen@chest.small_chest_screen`."
    },
    "detail": {
      "ko": "화면의 내용을 통째로 바꾸려면 화면 정의를 같은 경로 파일에서 재선언해 `$screen_content`를 바꾼다. 바닐라도 `shulker_box_screen@chest.small_chest_screen`, `barrel_screen@chest.small_chest_screen`처럼 같은 방식으로 화면을 만든다. , BC-facts)",
      "en": "To replace the content of a screen wholesale, redeclare the screen definition in a same-path file and change `$screen_content`. Vanilla also makes screens the same way, like `shulker_box_screen@chest.small_chest_screen` and `barrel_screen@chest.small_chest_screen`. , BC-facts)"
    },
    "sources": "VN chest_screen.json:240·258, BC 4.3-(2), BC-facts"
  },
  "MOD-12": {
    "id": "MOD-12",
    "category": "MOD",
    "page": "reference/rules",
    "anchor": "mod-12",
    "proposal": false,
    "evidence": [
      "작동팩",
      "추론"
    ],
    "title": {
      "ko": "화면 정의를 재선언하면 같은 화면을 재선언하는 다른 팩과는 한쪽만 남는다. 일반 NPC 대화 같은 바닐라 기능도 재선언한 속성(`render_game_behind` 등)을 함께 받는다. 꼭 필요할 때만 쓰고, 바닐라 내용을 감싸 두어 원래 기능이 계속 동작하게 한다.",
      "en": "If you redeclare a screen definition, only one side remains against other packs that redeclare the same screen. Vanilla features such as the ordinary NPC dialog also receive the properties you redeclared (`render_game_behind` and so on). Use it only when necessary, and wrap the vanilla content so the original function keeps working."
    },
    "detail": {
      "ko": "화면 정의를 재선언하면 같은 화면을 재선언하는 다른 팩과는 한쪽만 남는다. 일반 NPC 대화 같은 바닐라 기능도 재선언한 속성(`render_game_behind` 등)을 함께 받는다. 꼭 필요할 때만 쓰고, 바닐라 내용을 감싸 두어 원래 기능이 계속 동작하게 한다.",
      "en": "If you redeclare a screen definition, only one side remains against other packs that redeclare the same screen. Vanilla features such as the ordinary NPC dialogue also receive the redeclared properties (`render_game_behind`, etc.). Use it only when truly necessary, and wrap the vanilla content so the original features keep working."
    },
    "sources": "AP 4.2"
  },
  "MOD-13": {
    "id": "MOD-13",
    "category": "MOD",
    "page": "reference/rules",
    "anchor": "mod-13",
    "proposal": false,
    "evidence": [
      "실측",
      "추론"
    ],
    "title": {
      "ko": "여러 애드온이 같은 바닐라 화면에 붙어야 하면 아무 정의도 하지 않는 `modifications`만 쓴다. 바닐라 파일에 정의(속성 덮어쓰기 포함)를 쓰면 다른 팩의 같은 정의와 덮어쓰기 경쟁을 한다.",
      "en": "When several add-ons must attach to the same vanilla screen, use only `modifications` that define nothing. Writing a definition (including property overrides) in a vanilla file competes in overwriting with the same definition in other packs."
    },
    "detail": {
      "ko": "여러 애드온이 같은 바닐라 화면에 붙어야 하면 아무 정의도 하지 않는 `modifications`만 쓴다. 바닐라 파일에 정의(속성 덮어쓰기 포함)를 쓰면 다른 팩의 같은 정의와 덮어쓰기 경쟁을 한다.",
      "en": "If several add-ons must attach to the same vanilla screen, use only `modifications` that define nothing. If you write definitions in a vanilla file (including property overrides), you compete in overriding with the same definitions of other packs."
    },
    "sources": "BC 6.3-9, BC-facts, BW-best"
  },
  "MOD-14": {
    "id": "MOD-14",
    "category": "MOD",
    "page": "reference/rules",
    "anchor": "mod-14",
    "proposal": false,
    "evidence": [
      "미검증",
      "코드"
    ],
    "title": {
      "ko": "위키가 문서화한 `operation`은 11가지다: `insert_back`, `insert_front`, `insert_after`, `insert_before`, `move_back`, `move_front`, `move_after`, `move_before`, `swap`, `replace`, `remove`. 기준 항목은 `controls`에서는 `\"control_name\": \"이름\"`, `bindings`에서는 `\"where\": { \"binding_name\": \"#x\" }`로 찾고, 두 번째 기준이 필요한 `move_after`·`move_before`·`swap`은 `\"target\": { … }`을 쓴다. `replace`는 `where`로 찾은 항목을 `value`로 바꾼다. 이 프로젝트 출처에서 동작이 확인된 것은 `insert_back`, `insert_front`, `remove`뿐이므로 나머지는 실험 화면에서 확인하고 쓴다(DBG-04). 엔진의 연산 이름표도 정확히 이 11가지이고(MOD-23), 두 번째 기준은 `target_control`을 먼저, 없으면 `target`을 읽는다(MOD-24). 이름과 키는 엔진에서 확인되었지만 각 연산의 게임 동작은 아직 실측되지 않았다.",
      "en": "The wiki documents 11 `operation`s: `insert_back`, `insert_front`, `insert_after`, `insert_before`, `move_back`, `move_front`, `move_after`, `move_before`, `swap`, `replace`, `remove`. The reference entry is found with `\"control_name\": \"name\"` in `controls` and `\"where\": { \"binding_name\": \"#x\" }` in `bindings`, and `move_after`, `move_before`, and `swap`, which need a second reference, use `\"target\": { ... }`. `replace` swaps the entry found with `where` for `value`. Only `insert_back`, `insert_front`, and `remove` have confirmed behavior in this project's sources, so check the rest on a test screen before use (DBG-04). The engine's operation name table is also exactly these 11 (MOD-23), and the second reference reads `target_control` first and `target` if absent (MOD-24). The names and keys are confirmed in the engine, but the game behavior of each operation has not been measured yet."
    },
    "detail": {
      "ko": "위키가 문서화한 `operation`은 11가지다: `insert_back`, `insert_front`, `insert_after`, `insert_before`, `move_back`, `move_front`, `move_after`, `move_before`, `swap`, `replace`, `remove`. 기준 항목은 `controls`에서는 `\"control_name\": \"이름\"`, `bindings`에서는 `\"where\": { \"binding_name\": \"#x\" }`로 찾고, 두 번째 기준이 필요한 `move_after`·`move_before`·`swap`은 `\"target\": { … }`을 쓴다. `replace`는 `where`로 찾은 항목을 `value`로 바꾼다. 이 프로젝트 출처에서 동작이 확인된 것은 `insert_back`, `insert_front`, `remove`뿐이므로 나머지는 실험 화면에서 확인하고 쓴다(DBG-04). 엔진의 연산 이름표도 정확히 이 11가지이고(MOD-23), 두 번째 기준은 `target_control`을 먼저, 없으면 `target`을 읽는다(MOD-24). 이름과 키는 엔진에서 확인되었지만 각 연산의 게임 동작은 아직 실측되지 않았다.",
      "en": "The wiki documents 11 `operation`s: `insert_back`, `insert_front`, `insert_after`, `insert_before`, `move_back`, `move_front`, `move_after`, `move_before`, `swap`, `replace` and `remove`. The reference item is found with `\"control_name\": \"name\"` in `controls` and with `\"where\": { \"binding_name\": \"#x\" }` in `bindings`, and `move_after`, `move_before` and `swap`, which need a second reference, use `\"target\": { … }`. `replace` swaps the item found with `where` for `value`. Only `insert_back`, `insert_front` and `remove` were confirmed to work in this project's sources, so confirm the rest on an experiment screen before use (DBG-04). The engine's operation name table also has exactly these 11 (MOD-23), and for the second reference it reads `target_control` first and `target` if absent (MOD-24). The names and keys were confirmed in the engine, but the in-game behavior of each operation has not yet been measured."
    },
    "sources": "NB-01, NB-02, 부록A C-39"
  },
  "MOD-15": {
    "id": "MOD-15",
    "category": "MOD",
    "page": "reference/rules",
    "anchor": "mod-15",
    "proposal": false,
    "evidence": [
      "추론"
    ],
    "title": {
      "ko": "바닐라 화면에 붙는 지점(진입점)은 한 곳으로 모은다. 여러 하위 컨트롤에 각각 `insert`하면 그중 하나의 이름만 바뀌어도 일부가 깨지고, 디버깅할 곳이 늘어난다. 내 컨트롤은 진입점 하나에 넣은 래퍼 패널 안에 둔다.",
      "en": "Gather the points that attach to a vanilla screen (entry points) into one place. If you `insert` into several child controls separately, renaming just one of them breaks part of it and the places to debug multiply. Put your controls inside a wrapper panel inserted at a single entry point."
    },
    "detail": {
      "ko": "바닐라 화면에 붙는 지점(진입점)은 한 곳으로 모은다. 여러 하위 컨트롤에 각각 `insert`하면 그중 하나의 이름만 바뀌어도 일부가 깨지고, 디버깅할 곳이 늘어난다. 내 컨트롤은 진입점 하나에 넣은 래퍼 패널 안에 둔다.",
      "en": "Gather the points that attach to a vanilla screen (entry points) into one place. If you `insert` into several child controls separately, even if the name of just one changes part of it breaks, and there are more places to debug. Put your controls inside a wrapper panel placed at a single entry point."
    },
    "sources": "BW-best, BW-hud"
  },
  "MOD-16": {
    "id": "MOD-16",
    "category": "MOD",
    "page": "reference/rules",
    "anchor": "mod-16",
    "proposal": false,
    "evidence": [
      "미검증"
    ],
    "title": {
      "ko": "설정 화면과 인벤토리 화면에는 엔진이 반드시 있다고 가정하는 토글이 있다(설정의 접근성 탭, 인벤토리의 construction·equipment·items·nature 탭 등). 화면을 통째로 바꾸면서 이 토글을 빼면 개발 빌드에서 assert가 난다. 숨기더라도 남겨 둔다(MOD-06).",
      "en": "Settings and inventory screens have toggles the engine assumes exist (the accessibility tab in settings, the construction, equipment, items, and nature tabs in the inventory, and so on). Replacing a screen wholesale while dropping these toggles causes an assert in development builds. Keep them even if hidden (MOD-06)."
    },
    "detail": {
      "ko": "설정 화면과 인벤토리 화면에는 엔진이 반드시 있다고 가정하는 토글이 있다(설정의 접근성 탭, 인벤토리의 construction·equipment·items·nature 탭 등). 화면을 통째로 바꾸면서 이 토글을 빼면 개발 빌드에서 assert가 난다. 숨기더라도 남겨 둔다(MOD-06).",
      "en": "The settings screen and the inventory screen have toggles the engine assumes always exist (the accessibility tab in settings, the construction, equipment, items and nature tabs in the inventory, etc.). If you replace a screen wholesale and leave these toggles out, an assert occurs in development builds. Keep them even if hidden (MOD-06)."
    },
    "sources": "BW-doc \"HardCoded Toggles\""
  },
  "MOD-17": {
    "id": "MOD-17",
    "category": "MOD",
    "page": "reference/rules",
    "anchor": "mod-17",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "`modifications`는 같은 항목의 일반 속성 병합이 끝난 뒤에 적용된다. 한 번의 `modifications` 안에서 뒤 연산은 원래 원소만 고를 수 있어, 앞에서 넣은 원소를 같은 목록에서 다시 옮기거나 지울 수 없다.",
      "en": "`modifications` is applied after ordinary property merging of the same entry finishes. Within one `modifications`, a later operation can select only original elements, so an element inserted earlier cannot be moved or deleted again in the same list."
    },
    "detail": {
      "ko": "`modifications`는 같은 항목의 일반 속성 병합이 끝난 뒤에 적용된다. 한 번의 `modifications` 안에서 뒤 연산은 원래 원소만 고를 수 있어, 앞에서 넣은 원소를 같은 목록에서 다시 옮기거나 지울 수 없다.",
      "en": "`modifications` is applied after the ordinary property merge of the same item is finished. Within one `modifications`, later operations can pick only original elements, so you cannot move or delete in the same list an element inserted earlier."
    },
    "sources": "CN"
  },
  "MOD-18": {
    "id": "MOD-18",
    "category": "MOD",
    "page": "reference/rules",
    "anchor": "mod-18",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "`where`가 객체면 멤버 하나라도 같은 첫 원소를 고른다(전부 같을 필요 없음). `where: {}`는 아무것도 고르지 않고, 조건이 없으면 첫 원소를 고른다. 지울 바인딩은 고유한 멤버(`binding_name`)로 지정한다.",
      "en": "If `where` is an object, it selects the first element where even one member is equal (they need not all be equal). `where: {}` selects nothing, and with no condition the first element is selected. Specify a binding to delete with a unique member (`binding_name`)."
    },
    "detail": {
      "ko": "`where`가 객체면 멤버 하나라도 같은 첫 원소를 고른다(전부 같을 필요 없음). `where: {}`는 아무것도 고르지 않고, 조건이 없으면 첫 원소를 고른다. 지울 바인딩은 고유한 멤버(`binding_name`)로 지정한다.",
      "en": "If `where` is an object, it picks the first element where even one member is equal (they need not all be equal). `where: {}` picks nothing, and with no condition it picks the first element. Specify the binding to delete by a unique member (`binding_name`)."
    },
    "sources": "CN"
  },
  "MOD-19": {
    "id": "MOD-19",
    "category": "MOD",
    "page": "reference/rules",
    "anchor": "mod-19",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "같은 경로 재선언에서 기존과 다른 `@base`를 적으면 기존 정의(타입, 팩토리, 바인딩)가 버려지고 새 정의가 된다. 바닐라 정의의 속성만 바꿀 때는 `@`를 적지 않는다.",
      "en": "If a same-path redeclaration writes a `@base` different from the existing one, the existing definition (type, factory, bindings) is discarded and it becomes a new definition. When changing only properties of a vanilla definition, do not write `@`."
    },
    "detail": {
      "ko": "같은 경로 재선언에서 기존과 다른 `@base`를 적으면 기존 정의(타입, 팩토리, 바인딩)가 버려지고 새 정의가 된다. 바닐라 정의의 속성만 바꿀 때는 `@`를 적지 않는다.",
      "en": "If a redeclaration at the same path writes a different `@base` from the existing one, the existing definition (type, factory, bindings) is discarded and it becomes a new definition. Do not write `@` when only changing properties of a vanilla definition."
    },
    "sources": "CN"
  },
  "MOD-20": {
    "id": "MOD-20",
    "category": "MOD",
    "page": "json-ui/modifying-vanilla",
    "anchor": "mod-20",
    "proposal": true,
    "evidence": [
      "추론"
    ],
    "title": {
      "ko": "Marketplace 협력형 애드온 공식 지침은 `ui/`와 `font/` 파일 덮어쓰기를 금지한다(여러 애드온이 같은 자산을 함께 고칠 수 없어서).",
      "en": "(proposal) The official guideline for Marketplace cooperative add-ons forbids overriding `ui/` and `font/` files (because several add-ons cannot modify the same asset together)."
    },
    "detail": {
      "ko": "Marketplace 협력형 애드온 공식 지침은 `ui/`와 `font/` 파일 덮어쓰기를 금지한다(여러 애드온이 같은 자산을 함께 고칠 수 없어서). 협력형으로 낼 팩은 MOD-13의 `modifications`조차 피하고 JSON UI 밖의 우회를 먼저 고른다. 실측이 아니라 정책 문서이므로 실제 심사에서 `modifications`만 쓴 팩도 거부되는지는 확인이 필요하다.",
      "en": "(proposal) The official guideline for Marketplace cooperative add-ons forbids overriding `ui/` and `font/` files (because several add-ons cannot modify the same asset together). A pack to be released as cooperative should avoid even the `modifications` of MOD-13 and first choose a workaround outside JSON UI. It is a policy document, not a measurement, so whether a pack using only `modifications` is also rejected in actual review needs to be checked."
    },
    "sources": "ms-learn, Guidelines for Building Cooperative Add-Ons"
  },
  "MOD-21": {
    "id": "MOD-21",
    "category": "MOD",
    "page": "json-ui/modifying-vanilla",
    "anchor": "mod-21",
    "proposal": true,
    "evidence": [
      "작동팩",
      "추론"
    ],
    "title": {
      "ko": "같은 경로에서 `server_form.long_form`의 `controls`를 바꾸는 서버 폼 팩(Chest-UI, upgrader)은 서로 공존하지 못한다.",
      "en": "(proposal) Server form packs that change the `controls` of `server_form.long_form` at the same path (Chest-UI, upgrader) cannot coexist with each other."
    },
    "detail": {
      "ko": "같은 경로에서 `server_form.long_form`의 `controls`를 바꾸는 서버 폼 팩(Chest-UI, upgrader)은 서로 공존하지 못한다. 두 팩 모두 `long_form`을 같은 경로에서 `@` 없이 재선언하고(`type: panel`, `controls` 두 개) 제목 접두사 검사식으로 바닐라 모양과 자기 화면을 가른다. 팩 순서상 나중 것의 `controls`만 남는다(FILE-21). 공존이 필요하면 MOD-09 감싸기나 MOD-13 `modifications`만 쓰기로 바꾼다.",
      "en": "(proposal) Server form packs that change the `controls` of `server_form.long_form` at the same path (Chest-UI, upgrader) cannot coexist with each other. Both packs redeclare `long_form` at the same path without `@` (`type: panel`, two `controls`) and split the vanilla look and their own screen with a title prefix check expression. Only the `controls` of the later pack in pack order remain (FILE-21). If coexistence is needed, switch to MOD-09 wrapping or MOD-13 `modifications` only."
    },
    "sources": "jua-chest-ui, jua-upgrader"
  },
  "MOD-22": {
    "id": "MOD-22",
    "category": "MOD",
    "page": "json-ui/modifying-vanilla",
    "anchor": "mod-22",
    "proposal": true,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "여러 바닐라 컨트롤이 함께 쓰는 텍스처를 교체할 때는 원본을 `_original` 같은 다른 이름으로 복사하고, 바꾸지 않을 컨트롤은 같은 경로 UI 파일의 경로 키(`\"부모/자식\": {\"texture\": \"…_original\"}`)로 사본에 다시 연결한다.",
      "en": "(proposal) When replacing a texture shared by several vanilla controls, copy the original under another name such as `_original`, and relink the controls you will not change to the copy with path keys"
    },
    "detail": {
      "ko": "여러 바닐라 컨트롤이 함께 쓰는 텍스처를 교체할 때는 원본을 `_original` 같은 다른 이름으로 복사하고, 바꾸지 않을 컨트롤은 같은 경로 UI 파일의 경로 키(`\"부모/자식\": {\"texture\": \"…_original\"}`)로 사본에 다시 연결한다.",
      "en": "(proposal) When replacing a texture shared by several vanilla controls, copy the original under another name such as `_original`, and relink the controls you will not change to the copy with path keys in a same-path UI file (`\"parent/child\": {\"texture\": \"…_original\"}`)."
    },
    "sources": "jua-small-packs"
  },
  "MOD-23": {
    "id": "MOD-23",
    "category": "MOD",
    "page": "reference/rules",
    "anchor": "mod-23",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "엔진의 `operation` 이름표는 MOD-14의 11개가 전부다(번호 1~11). 이름은 정확히 같아야 하고, 그 밖의 연산은 없다. 각 연산의 게임 동작은 여전히 실측이 필요하다(MOD-14).",
      "en": "The engine's `operation` name table is exactly the 11 of MOD-14 (numbers 1~11). The names must match exactly and there are no other operations. The game behavior of each operation still needs measurement (MOD-14)."
    },
    "detail": {
      "ko": "엔진의 `operation` 이름표는 MOD-14의 11개가 전부다(번호 1~11). 이름은 정확히 같아야 하고, 그 밖의 연산은 없다. 각 연산의 게임 동작은 여전히 실측이 필요하다(MOD-14).",
      "en": "The engine's `operation` name table is exactly the 11 of MOD-14 (numbers 1~11). Names must match exactly and there are no other operations. The in-game behavior of each operation still needs measurement (MOD-14)."
    },
    "sources": "NB-01"
  },
  "MOD-24": {
    "id": "MOD-24",
    "category": "MOD",
    "page": "reference/rules",
    "anchor": "mod-24",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "연산 항목의 두 번째 기준은 `target_control`(문자열)을 먼저 읽고, 없을 때만 `target`을 읽는다. 엔진이 읽는 항목 키는 `array_name`, `control_name`, `operation`, `where`, `target_control`, `target`, `value`다. MOD-03의 \"`target_control`은 근거가 없다\"는 해석 단계에서는 틀렸다.",
      "en": "The second reference of an operation entry reads `target_control` (a string) first and reads `target` only when it is absent. The entry keys the engine reads are `array_name`, `control_name`, `operation`, `where`, `target_control`, `target`, and `value`. The statement in MOD-03 that \"`target_control` has no basis\" was wrong at the interpretation stage."
    },
    "detail": {
      "ko": "연산 항목의 두 번째 기준은 `target_control`(문자열)을 먼저 읽고, 없을 때만 `target`을 읽는다. 엔진이 읽는 항목 키는 `array_name`, `control_name`, `operation`, `where`, `target_control`, `target`, `value`다. MOD-03의 \"`target_control`은 근거가 없다\"는 해석 단계에서는 틀렸다.",
      "en": "For the second reference of an operation item, `target_control` (a string) is read first and `target` only when it is absent. The item keys the engine reads are `array_name`, `control_name`, `operation`, `where`, `target_control`, `target` and `value`. The statement in MOD-03 that \"`target_control` has no basis\" was wrong at the resolution stage."
    },
    "sources": "NB-02"
  },
  "MOD-25": {
    "id": "MOD-25",
    "category": "MOD",
    "page": "reference/rules",
    "anchor": "mod-25",
    "proposal": false,
    "evidence": [
      "코드",
      "충돌"
    ],
    "title": {
      "ko": "`array_name`은 고정 목록과 비교하지 않고 정의에서 같은 이름의 멤버를 찾아 배열이면 대상으로 쓴다. `array_name`이 비어 있고 `control_name`이 문자열이면 `\"controls\"`로 채우므로, 컨트롤 연산은 `array_name`을 생략해도 된다. 그래서 해석 단계에서는 `controls`·`bindings` 밖의 배열도 대상이 될 수 있지만, `variables`가 무시됐다는 실측(MOD-03)과 어긋나 효과는 확인되지 않았다.",
      "en": "`array_name` is not compared against a fixed list; the engine finds the member with the same name in the definition and uses it as the target if it is an array. If `array_name` is empty and `control_name` is a string it is filled with `\"controls\"`, so control operations may omit `array_name`. So at the interpretation stage arrays other than `controls` and `bindings` can also be targets, but this disagrees with the measurement that `variables` was ignored (MOD-03), so the effect is unconfirmed."
    },
    "detail": {
      "ko": "`array_name`은 고정 목록과 비교하지 않고 정의에서 같은 이름의 멤버를 찾아 배열이면 대상으로 쓴다. `array_name`이 비어 있고 `control_name`이 문자열이면 `\"controls\"`로 채우므로, 컨트롤 연산은 `array_name`을 생략해도 된다. 그래서 해석 단계에서는 `controls`·`bindings` 밖의 배열도 대상이 될 수 있지만, `variables`가 무시됐다는 실측(MOD-03)과 어긋나 효과는 확인되지 않았다.",
      "en": "`array_name` is not compared against a fixed list; it finds the same-named member in the definition and uses it as the target if it is an array. If `array_name` is empty and `control_name` is a string it is filled with `\"controls\"`, so control operations may omit `array_name`. So at the resolution stage arrays outside `controls` and `bindings` can also be targets, but this conflicts with the measurement that `variables` was ignored (MOD-03) and the effect was not confirmed."
    },
    "sources": "NB-03, 부록A C-64"
  },
  "PAT-01": {
    "id": "PAT-01",
    "category": "PAT",
    "page": "reference/rules",
    "anchor": "pat-01",
    "proposal": false,
    "evidence": [
      "코드",
      "작동팩"
    ],
    "title": {
      "ko": "액션 폼 커스텀 화면의 최소 구성은 ① 바닐라 `long_form`·`custom_form`을 제목 접두사로 숨기고 ② `main_screen_content`에 `server_form_factory`를 쓰는 두 번째 팩토리를 넣어 ③ 내 화면을 만드는 것이다.",
      "en": "The minimal composition of an action form custom screen is (1) hide the vanilla `long_form` and `custom_form` by a title prefix, (2) put a second factory that uses `server_form_factory` into `main_screen_content`, and (3) build your own screen."
    },
    "detail": {
      "ko": "액션 폼 커스텀 화면의 최소 구성은 ① 바닐라 `long_form`·`custom_form`을 제목 접두사로 숨기고 ② `main_screen_content`에 `server_form_factory`를 쓰는 두 번째 팩토리를 넣어 ③ 내 화면을 만드는 것이다. , BA 2장, VN server_form.json)",
      "en": "The minimal setup of an action form custom screen is (1) hide vanilla `long_form` and `custom_form` by a title prefix, (2) put a second factory that uses `server_form_factory` into `main_screen_content`, and (3) make your own screen. , BA chapter 2, VN server_form.json)"
    },
    "sources": "BC 4.1-(1), BA 2장, VN server_form.json"
  },
  "PAT-02": {
    "id": "PAT-02",
    "category": "PAT",
    "page": "reference/rules",
    "anchor": "pat-02",
    "proposal": false,
    "evidence": [
      "실측",
      "바닐라",
      "코드"
    ],
    "title": {
      "ko": "누르는 셀은 버튼 자신에 `collection_details` + `form_button_click` 매핑을, 값을 그리는 셀은 라벨 자신에 `collection` 바인딩을 둔다.",
      "en": "A pressable cell puts a `collection_details` + `form_button_click` mapping on the button itself, and a cell that draws a value puts a `collection` binding on the label itself."
    },
    "detail": {
      "ko": "누르는 셀은 버튼 자신에 `collection_details` + `form_button_click` 매핑을, 값을 그리는 셀은 라벨 자신에 `collection` 바인딩을 둔다. ·(4), VN server_form.json:211-246)",
      "en": "For a pressable cell, put `collection_details` + the `form_button_click` mapping on the button itself, and for a cell that draws a value, put a `collection` binding on the label itself. and (4), VN server_form.json:211-246)"
    },
    "sources": "BC-S1, BC-S7, BC 4.1-(3)·(4), VN server_form.json:211-246"
  },
  "PAT-03": {
    "id": "PAT-03",
    "category": "PAT",
    "page": "reference/rules",
    "anchor": "pat-03",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "화면 루트에 크기 0짜리 데이터 소스 컨트롤을 하나 두고, 게이트들은 `source_control_name` view 바인딩으로 그 값을 읽는다.",
      "en": "Put one size-0 data source control at the screen root, and let the gates read that value with `source_control_name` view bindings."
    },
    "detail": {
      "ko": "화면 루트에 크기 0짜리 데이터 소스 컨트롤을 하나 두고, 게이트들은 `source_control_name` view 바인딩으로 그 값을 읽는다. , BC-samples home.document.json)",
      "en": "Put one size-0 data source control at the screen root, and have the gates read that value with a `source_control_name` view binding. , BC-samples home.document.json)"
    },
    "sources": "BC 4.1-(5), BC-samples home.document.json"
  },
  "PAT-04": {
    "id": "PAT-04",
    "category": "PAT",
    "page": "reference/rules",
    "anchor": "pat-04",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "`visible` 대신 `#collection_length`를 계산해 0이면 아무것도 만들지 않는 팩토리로 게이트한다.",
      "en": "Instead of `visible`, compute `#collection_length` and gate with a factory that creates nothing when it is 0."
    },
    "detail": {
      "ko": "`visible` 대신 `#collection_length`를 계산해 0이면 아무것도 만들지 않는 팩토리로 게이트한다.",
      "en": "Instead of `visible`, gate with a factory that computes `#collection_length` and creates nothing when it is 0."
    },
    "sources": "BC-S11, BC-S8"
  },
  "PAT-05": {
    "id": "PAT-05",
    "category": "PAT",
    "page": "reference/rules",
    "anchor": "pat-05",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "엔트리 문자열 하나에 `[종류 5][번호 4][제목 …]`처럼 바이트 폭이 고정된 필드를 싣고, 자르기 → 빼기 → 자르기 → 패딩 제거로 꺼낸다.",
      "en": "Carry fields of fixed byte width such as `[kind 5][number 4][title ...]` in one entry string, and take them out by cutting, subtracting, cutting, and stripping padding."
    },
    "detail": {
      "ko": "엔트리 문자열 하나에 `[종류 5][번호 4][제목 …]`처럼 바이트 폭이 고정된 필드를 싣고, 자르기 → 빼기 → 자르기 → 패딩 제거로 꺼낸다.",
      "en": "Carry byte-width-fixed fields like `[kind 5][number 4][title …]` in one entry string, and take them out by cut -> subtract -> cut -> remove padding."
    },
    "sources": "BA 3장, AP 4.5"
  },
  "PAT-06": {
    "id": "PAT-06",
    "category": "PAT",
    "page": "reference/rules",
    "anchor": "pat-06",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "2의 거듭제곱 크기 spacer를 세로 스택에 쌓고 비트 토큰으로 각각 켜고 끄면, 켜진 spacer 크기의 합이 y좌표가 된다. 컨트롤 수가 비트 수만큼 늘어나므로 항목 수가 많으면 페이징한다.",
      "en": "Stack power-of-two-size spacers in a vertical stack and turn each on and off with bit tokens, and the sum of the enabled spacer sizes is the y coordinate. The control count grows with the number of bits, so page when there are many items."
    },
    "detail": {
      "ko": "2의 거듭제곱 크기 spacer를 세로 스택에 쌓고 비트 토큰으로 각각 켜고 끄면, 켜진 spacer 크기의 합이 y좌표가 된다. 컨트롤 수가 비트 수만큼 늘어나므로 항목 수가 많으면 페이징한다.",
      "en": "Stack power-of-two size spacers in a vertical stack and turn each on and off with a bit token, and the sum of the sizes of the spacers that are on becomes the y coordinate. The number of controls grows by the bit count, so page when there are many items."
    },
    "sources": "BA 4장"
  },
  "PAT-07": {
    "id": "PAT-07",
    "category": "PAT",
    "page": "reference/rules",
    "anchor": "pat-07",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "라디오 토글 그룹의 각 토글 `checked` 상태 컨트롤 안에 탭 내용을 넣고, 8개 상태와 토글 매핑을 모두 준다.",
      "en": "Put the tab content inside the `checked` state control of each toggle in a radio toggle group, and give all 8 states and the toggle mappings."
    },
    "detail": {
      "ko": "라디오 토글 그룹의 각 토글 `checked` 상태 컨트롤 안에 탭 내용을 넣고, 8개 상태와 토글 매핑을 모두 준다.",
      "en": "Put the tab content inside each toggle's `checked` state control of a radio toggle group, and give all 8 states and the toggle mappings."
    },
    "sources": "BC-S4, BC 5장, BC-samples tabbed.document.json"
  },
  "PAT-08": {
    "id": "PAT-08",
    "category": "PAT",
    "page": "reference/rules",
    "anchor": "pat-08",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "HUD 내 레이어에 `hud_title_text_factory`를 하나 더 두어 토스트를 만들고, 바닐라 타이틀은 내 접두사일 때 숨긴다. 타이틀을 보낼 때마다 컨트롤이 새로 생겨 애니메이션이 처음부터 재생된다.",
      "en": "Put one more `hud_title_text_factory` in your HUD layer to make toasts, and hide the vanilla title when it has your prefix. A control is created anew each time a title is sent, so the animation plays from the start."
    },
    "detail": {
      "ko": "HUD 내 레이어에 `hud_title_text_factory`를 하나 더 두어 토스트를 만들고, 바닐라 타이틀은 내 접두사일 때 숨긴다. 타이틀을 보낼 때마다 컨트롤이 새로 생겨 애니메이션이 처음부터 재생된다.",
      "en": "Place one more `hud_title_text_factory` in a layer inside the HUD to make toasts, and hide the vanilla title when it has my prefix. Every time a title is sent a control is newly created, so the animation plays from the beginning."
    },
    "sources": "BA 6장, AP 4.1, AP-samples hud_screen.json"
  },
  "PAT-09": {
    "id": "PAT-09",
    "category": "PAT",
    "page": "reference/rules",
    "anchor": "pat-09",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "내 레이어에 `chat_item_factory`를 하나 더 두고(최대 개수 지정), 내 접두사 메시지만 보이게 한다. 원래 채팅에서는 `chat_screen.json`의 `messages_text`와 HUD `chat_grid_item` 두 곳에서 숨긴다. 사라질 때 `size` 애니메이션으로 높이를 0으로 줄이면 스택이 당겨진다.",
      "en": "Put one more `chat_item_factory` in your layer (specifying a maximum count) and show only messages with your prefix. In the original chat, hide it in two places: `messages_text` of `chat_screen.json` and the HUD `chat_grid_item`. When disappearing, shrinking the height to 0 with a `size` animation pulls the stack up."
    },
    "detail": {
      "ko": "내 레이어에 `chat_item_factory`를 하나 더 두고(최대 개수 지정), 내 접두사 메시지만 보이게 한다. 원래 채팅에서는 `chat_screen.json`의 `messages_text`와 HUD `chat_grid_item` 두 곳에서 숨긴다. 사라질 때 `size` 애니메이션으로 높이를 0으로 줄이면 스택이 당겨진다.",
      "en": "Place one more `chat_item_factory` in my layer (set the maximum count) and show only messages with my prefix. In the original chat, hide it in two places: `messages_text` of `chat_screen.json` and the HUD `chat_grid_item`. When disappearing, shrinking the height to 0 with a `size` animation pulls the stack up."
    },
    "sources": "AP 4.5, AP-samples hud_screen.json·chat_screen.json"
  },
  "PAT-10": {
    "id": "PAT-10",
    "category": "PAT",
    "page": "reference/rules",
    "anchor": "pat-10",
    "proposal": false,
    "evidence": [
      "바닐라",
      "실측",
      "충돌"
    ],
    "title": {
      "ko": "막대 이미지에 `clip_direction`을 주고 `#clip_ratio`(잘라낼 비율, 0~1)를 바인딩한다. 소수가 필요하므로 정수 연산 문제(EXP-18)를 피해 float 채널(내구도 등)을 쓰거나, 구간별 리터럴 사본을 만든다.",
      "en": "Give a bar image `clip_direction` and bind `#clip_ratio` (the ratio to clip, 0~1). It needs a decimal, so avoid the integer arithmetic problem (EXP-18) by using a float channel (durability and so on), or make literal copies per range."
    },
    "detail": {
      "ko": "막대 이미지에 `clip_direction`을 주고 `#clip_ratio`(잘라낼 비율, 0~1)를 바인딩한다. 소수가 필요하므로 정수 연산 문제(EXP-18)를 피해 float 채널(내구도 등)을 쓰거나, 구간별 리터럴 사본을 만든다.",
      "en": "Give the bar image `clip_direction` and bind `#clip_ratio` (the ratio to cut off, 0~1). A decimal is needed, so avoid the integer arithmetic problem (EXP-18) by using a float channel (durability, etc.) or by making per-interval literal copies."
    },
    "sources": "VN, BC-facts, BC-S14, BA 3.2"
  },
  "PAT-11": {
    "id": "PAT-11",
    "category": "PAT",
    "page": "reference/rules",
    "anchor": "pat-11",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "변수 하나로 텍스처 경로와 숫자 아이템 ID를 함께 받고, `$v > 'a'`/`$v > 0`으로 이미지와 아이템 렌더러 중 하나만 생성한다. 런타임 문자열이면 앞 9바이트가 `textures/`인지로 고른다.",
      "en": "Receive both a texture path and a numeric item ID with one variable, and create only one of the image and item renderer with `$v > 'a'`/`$v > 0`. For a runtime string, choose by whether the first 9 bytes are `textures/`."
    },
    "detail": {
      "ko": "변수 하나로 텍스처 경로와 숫자 아이템 ID를 함께 받고, `$v > 'a'`/`$v > 0`으로 이미지와 아이템 렌더러 중 하나만 생성한다. 런타임 문자열이면 앞 9바이트가 `textures/`인지로 고른다.",
      "en": "Receive both a texture path and a numeric item ID in one variable, and create only one of an image and an item renderer with `$v > 'a'`/`$v > 0`. For a runtime string, choose by whether the first 9 bytes are `textures/`."
    },
    "sources": "AP 4.5·4.7"
  },
  "PAT-12": {
    "id": "PAT-12",
    "category": "PAT",
    "page": "reference/rules",
    "anchor": "pat-12",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "바닐라 버튼 템플릿에 기본값이 꺼진 슬롯을 추가해 필요한 버튼만 호버 툴팁을 갖게 한다. 2장 MOD-10 예제를 그대로 쓴다.",
      "en": "Add a slot that defaults to off to a vanilla button template so only the buttons that need it have a hover tooltip. Use the MOD-10 example of chapter 2 as is."
    },
    "detail": {
      "ko": "바닐라 버튼 템플릿에 기본값이 꺼진 슬롯을 추가해 필요한 버튼만 호버 툴팁을 갖게 한다. 아래 예제가 그것이다(MOD-10).",
      "en": "Add a slot that is off by default to the vanilla button template so that only the buttons that need it get a hover tooltip. The example below is that (MOD-10)."
    },
    "sources": "AP 4.8"
  },
  "PAT-13": {
    "id": "PAT-13",
    "category": "PAT",
    "page": "json-ui/factory-synthesis",
    "anchor": "pat-13",
    "proposal": false,
    "evidence": [
      "작동팩",
      "추론"
    ],
    "title": {
      "ko": "키로 짜는 2차원 배치.",
      "en": "A 2D layout made with keys."
    },
    "detail": {
      "ko": "키로 짜는 2차원 배치. 세로 팩토리 항목마다 (1) 가로 스택의 왼쪽·오른쪽 spacer를 버튼 문자열 키로 켜서 버튼을 옆으로 밀고, (2) 그림은 높이 0 패널 안에 두고 항목 높이는 키로 끌 수 있는 sizer가 정하게 하면, \"높이 없음\" 키가 붙은 항목 다음 항목이 같은 줄에 놓인다. 서버는 평범한 버튼 목록만 보내고 `selection` 번호는 바뀌지 않는다. 겹친 항목끼리 눌림 영역이 겹치지 않도록 가로 spacer를 같이 준다.",
      "en": "A 2D layout made with keys. For each vertical factory item, (1) turn on the left and right spacers of a horizontal stack with keys in the button string to push the button sideways, and (2) put the picture inside a zero-height panel and let a sizer that can be turned off by a key decide the item height, and the item after one carrying a \"no height\" key is placed on the same row. The server sends only an ordinary button list and the `selection` numbers do not change. Give horizontal spacers together so that the press areas of overlapping items do not overlap."
    },
    "sources": "SLB 4장, GrimUI 키 문서"
  },
  "PAT-14": {
    "id": "PAT-14",
    "category": "PAT",
    "page": "json-ui/recipes-toast-and-widgets",
    "anchor": "pat-14",
    "proposal": true,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "상자형 서버 폼 레시피: 제목 플래그(HOST-34 반영안)로 크기 선택 → 크기별 템플릿은 전역 변수 `ignored`로 쓰는 것만 생성 → `grid` + `collection_name: form_buttons` → 칸마다 `'%.8s' = 'textures'`로 이미지와 `inventory_item_renderer` 분기(PAT-11) → 버튼 텍스트",
      "en": "A chest-style server form recipe: choose the size by a title flag (HOST-34 proposal) -> per-size templates generate only the one used with a global variable `ignored` -> `grid` + `collection_name: for"
    },
    "detail": {
      "ko": "상자형 서버 폼 레시피: 제목 플래그(HOST-34 반영안)로 크기 선택 → 크기별 템플릿은 전역 변수 `ignored`로 쓰는 것만 생성 → `grid` + `collection_name: form_buttons` → 칸마다 `'%.8s' = 'textures'`로 이미지와 `inventory_item_renderer` 분기(PAT-11) → 버튼 텍스트 고정 폭 머리말로 수량·내구도(EXP-11) → hover에 툴팁(INP-28). 숫자 ID는 `(#v - 0)`으로 넣는다.",
      "en": "A chest-style server form recipe: choose the size by a title flag (HOST-34 proposal) -> per-size templates generate only the one used with a global variable `ignored` -> `grid` + `collection_name: form_buttons` -> per cell, branch between an image and `inventory_item_renderer` with `'%.8s' = 'textures'` (PAT-11) -> quantity and durability with a fixed-width header in the button text (EXP-11) -> a tooltip on hover (INP-28). Put numeric IDs in with `(#v - 0)`."
    },
    "sources": "Chest-UI"
  },
  "TXT-01": {
    "id": "TXT-01",
    "category": "TXT",
    "page": "reference/rules",
    "anchor": "txt-01",
    "proposal": false,
    "evidence": [
      "실측",
      "바닐라"
    ],
    "title": {
      "ko": "라벨은 기본으로 현지화된다. 텍스트를 먼저 번역 키로 찾아보고, 없으면 그대로 찍는다. 리터럴로 찍어야 하는 텍스트(사용자 입력, 채팅, 타이틀 등)는 `\"localize\": false`를 준다. 바닐라는 `localize`를 쓸 때 거의 항상 `false`로 쓴다(31 대 1). 위키 속성표의 기본값 `false`는 오기다(부록A C-32).",
      "en": "A label is localized by default. It looks the text up as a translation key first and prints it as is if there is none. Text that must print as a literal (user input, chat, titles, and so on) gets `\"localize\": false`. When vanilla uses `localize`, it almost always writes `false` (31 to 1). The wiki property table's default `false` is a typo (Appendix A C-32)."
    },
    "detail": {
      "ko": "라벨은 기본으로 현지화된다. 텍스트를 먼저 번역 키로 찾아보고, 없으면 그대로 찍는다. 리터럴로 찍어야 하는 텍스트(사용자 입력, 채팅, 타이틀 등)는 `\"localize\": false`를 준다. 바닐라는 `localize`를 쓸 때 거의 항상 `false`로 쓴다(31 대 1). 위키 속성표의 기본값 `false`는 오기다(부록A C-32).",
      "en": "A label is localized by default. It looks up the text as a translation key first and prints it as is if there is none. For text that must be printed as a literal (user input, chat, titles, etc.), give `\"localize\": false`. When vanilla uses `localize` it almost always uses `false` (31 to 1). The default `false` in the wiki property table is a typo (Appendix A C-32)."
    },
    "sources": "BC-facts, VN, BW-doc"
  },
  "TXT-02": {
    "id": "TXT-02",
    "category": "TXT",
    "page": "reference/rules",
    "anchor": "txt-02",
    "proposal": false,
    "evidence": [
      "바닐라"
    ],
    "title": {
      "ko": "라벨의 주요 속성: `text`(리터럴, `#바인딩`, `$변수`), `color`, `font_type`, `font_size`, `font_scale_factor`, `text_alignment`(`left`, `center`, `right`), `shadow`, `enable_profanity_filter`, `localize`.",
      "en": "Main label properties: `text` (literal, `#binding`, `$variable`), `color`, `font_type`, `font_size`, `font_scale_factor`, `text_alignment` (`left`, `center`, `right`), `shadow`, `enable_profanity_filter`, `localize`."
    },
    "detail": {
      "ko": "라벨의 주요 속성: `text`(리터럴, `#바인딩`, `$변수`), `color`, `font_type`, `font_size`, `font_scale_factor`, `text_alignment`(`left`, `center`, `right`), `shadow`, `enable_profanity_filter`, `localize`.",
      "en": "Main label properties: `text` (literal, `#binding`, `$variable`), `color`, `font_type`, `font_size`, `font_scale_factor`, `text_alignment` (`left`, `center`, `right`), `shadow`, `enable_profanity_filter`, `localize`."
    },
    "sources": "VN hud_screen.json:2287-2310, 부록B"
  },
  "TXT-03": {
    "id": "TXT-03",
    "category": "TXT",
    "page": "reference/rules",
    "anchor": "txt-03",
    "proposal": false,
    "evidence": [
      "실측",
      "바닐라"
    ],
    "title": {
      "ko": "`font_type` 값은 `default`, `smooth`, `rune`, `unicode`, `MinecraftTen`이다. 바닐라는 `smooth`(193)와 `MinecraftTen`(21)을 주로 쓴다. `MinecraftSeven` 같은 내부 글꼴 이름을 쓰면 오류 없이 아무것도 그리지 않는다.",
      "en": "The `font_type` values are `default`, `smooth`, `rune`, `unicode`, `MinecraftTen`. Vanilla mainly uses `smooth` (193) and `MinecraftTen` (21). Using an internal font name such as `MinecraftSeven` draws nothing without an error."
    },
    "detail": {
      "ko": "`font_type` 값은 `default`, `smooth`, `rune`, `unicode`, `MinecraftTen`이다. 바닐라는 `smooth`(193)와 `MinecraftTen`(21)을 주로 쓴다. `MinecraftSeven` 같은 내부 글꼴 이름을 쓰면 오류 없이 아무것도 그리지 않는다.",
      "en": "The `font_type` values are `default`, `smooth`, `rune`, `unicode` and `MinecraftTen`. Vanilla mainly uses `smooth` (193) and `MinecraftTen` (21). Using an internal font name such as `MinecraftSeven` draws nothing with no error."
    },
    "sources": "BC 6.6-6, BC-S7, VN"
  },
  "TXT-04": {
    "id": "TXT-04",
    "category": "TXT",
    "page": "reference/rules",
    "anchor": "txt-04",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "`#font_type`은 엔진 예약 속성이라 쓰는 즉시 검증된다. 잘못된 별칭은 `NonAssertErrorLog`에 줄마다 남고 마켓플레이스 제출이 막힌다.",
      "en": "`#font_type` is an engine-reserved property and is validated the moment it is used. A wrong alias is left line by line in `NonAssertErrorLog` and blocks Marketplace submission."
    },
    "detail": {
      "ko": "`#font_type`은 엔진 예약 속성이라 쓰는 즉시 검증된다. 잘못된 별칭은 `NonAssertErrorLog`에 줄마다 남고 마켓플레이스 제출이 막힌다.",
      "en": "`#font_type` is an engine-reserved property, so it is validated the moment it is used. A wrong alias is logged line by line in `NonAssertErrorLog` and blocks marketplace submission."
    },
    "sources": "BC 6.6-7"
  },
  "TXT-05": {
    "id": "TXT-05",
    "category": "TXT",
    "page": "reference/rules",
    "anchor": "txt-05",
    "proposal": false,
    "evidence": [
      "바닐라"
    ],
    "title": {
      "ko": "`font_size`는 `small`, `normal`, `large`, `extra_large`이고 바닐라는 공식 enum에 없는 `medium`도 4회 쓴다.",
      "en": "`font_size` is `small`, `normal`, `large`, `extra_large`, and vanilla also uses `medium`, which is not in the official enum, 4 times."
    },
    "detail": {
      "ko": "`font_size`는 `small`, `normal`, `large`, `extra_large`이고 바닐라는 공식 enum에 없는 `medium`도 4회 쓴다.",
      "en": "`font_size` is `small`, `normal`, `large` and `extra_large`, and vanilla also uses `medium`, which is not in the official enum, 4 times."
    },
    "sources": "VN, 부록B"
  },
  "TXT-06": {
    "id": "TXT-06",
    "category": "TXT",
    "page": "reference/rules",
    "anchor": "txt-06",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "라벨은 숫자 바인딩을 그대로 그리지 못한다. 문자열과 이어 붙여 `text`에 바인딩한다: `('n=' + #raw)`. 정수만 이어 붙여지고 문자열 + float은 아무것도 나오지 않는다.",
      "en": "A label cannot draw a numeric binding as is. Concatenate it with a string and bind that to `text`: `('n=' + #raw)`. Only integers are concatenated, and string + float gives nothing."
    },
    "detail": {
      "ko": "라벨은 숫자 바인딩을 그대로 그리지 못한다. 문자열과 이어 붙여 `text`에 바인딩한다: `('n=' + #raw)`. 정수만 이어 붙여지고 문자열 + float은 아무것도 나오지 않는다.",
      "en": "A label cannot draw a numeric binding as is. Join it to a string and bind it to `text`: `('n=' + #raw)`. Only integers join, and string + float outputs nothing."
    },
    "sources": "BC-facts, BC 6.6-5, BW-type"
  },
  "TXT-07": {
    "id": "TXT-07",
    "category": "TXT",
    "page": "reference/rules",
    "anchor": "txt-07",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "빈 라벨이나 `§r`만 든 `default` 크기 라벨도 높이는 한 줄이다. 0으로 접히지 않으므로 행을 없애려면 `#visible`로 숨긴다.",
      "en": "An empty label or a `default`-size label holding only `§r` is still one line high. It does not collapse to 0, so to remove the row hide it with `#visible`."
    },
    "detail": {
      "ko": "빈 라벨이나 `§r`만 든 `default` 크기 라벨도 높이는 한 줄이다. 0으로 접히지 않으므로 행을 없애려면 `#visible`로 숨긴다.",
      "en": "An empty label, or a `default` size label containing only `§r`, still has a height of one line. It does not collapse to 0, so to remove a row, hide it with `#visible`."
    },
    "sources": "BC-S10"
  },
  "TXT-08": {
    "id": "TXT-08",
    "category": "TXT",
    "page": "reference/rules",
    "anchor": "txt-08",
    "proposal": false,
    "evidence": [
      "실측",
      "바닐라",
      "작동팩"
    ],
    "title": {
      "ko": "`§` 색 코드는 바인딩된 텍스트에서도 유지된다. 바닐라 `_global_variables.json`에 색 코드 16색이 `$0_color_format` … `$f_color_format`으로 정의되어 있어 `\"color\": \"$f_color_format\"`처럼 쓸 수 있다.",
      "en": "`§` color codes are kept in bound text too. Vanilla `_global_variables.json` defines the 16 color codes as `$0_color_format` ... `$f_color_format`, so you can write `\"color\": \"$f_color_format\"`."
    },
    "detail": {
      "ko": "`§` 색 코드는 바인딩된 텍스트에서도 유지된다. 바닐라 `_global_variables.json`에 색 코드 16색이 `$0_color_format` … `$f_color_format`으로 정의되어 있어 `\"color\": \"$f_color_format\"`처럼 쓸 수 있다.",
      "en": "`§` color codes are kept in bound text too. Vanilla `_global_variables.json` defines the 16 color codes as `$0_color_format` … `$f_color_format`, so you can write `\"color\": \"$f_color_format\"`."
    },
    "sources": "BC-S7, VN _global_variables.json:247, AP 4.9"
  },
  "TXT-09": {
    "id": "TXT-09",
    "category": "TXT",
    "page": "reference/rules",
    "anchor": "txt-09",
    "proposal": false,
    "evidence": [
      "작동팩"
    ],
    "title": {
      "ko": "번호만 보내고 번역은 RP가 한다. 데이터 문자열에서 잘라 낸 조각에 키 접두를 붙여 `localize: true` 라벨에 넣는다: `('myui.toast.' + #category)`. 스크립트는 고정 폭 번호(0으로 채움)만 보낸다. 언어 28개를 지원하는 AP가 이 방식이다.",
      "en": "Send only numbers and let the RP translate. Prefix a piece cut from the data string with a key prefix and put it in a `localize: true` label: `('myui.toast.' + #category)`. The script sends only fixed-width numbers (zero-padded). AP, which supports 28 languages, does it this way."
    },
    "detail": {
      "ko": "번호만 보내고 번역은 RP가 한다. 데이터 문자열에서 잘라 낸 조각에 키 접두를 붙여 `localize: true` 라벨에 넣는다: `('myui.toast.' + #category)`. 스크립트는 고정 폭 번호(0으로 채움)만 보낸다. 언어 28개를 지원하는 AP가 이 방식이다.",
      "en": "Send only a number and let the RP do the translation. Attach a key prefix to a piece cut out of the data string and put it in a `localize: true` label: `('myui.toast.' + #category)`. The script sends only fixed-width numbers (padded with 0). AP, which supports 28 languages, works this way."
    },
    "sources": "AP 4.5, BA 6장"
  },
  "TXT-10": {
    "id": "TXT-10",
    "category": "TXT",
    "page": "reference/rules",
    "anchor": "txt-10",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "lang 값 규칙.",
      "en": "Rules for lang values."
    },
    "detail": {
      "ko": "lang 값 규칙.",
      "en": "lang value rules."
    },
    "sources": "BC-S10, BC-facts"
  },
  "TXT-11": {
    "id": "TXT-11",
    "category": "TXT",
    "page": "reference/rules",
    "anchor": "txt-11",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "서버 폼 엔트리 문자열의 성질: `§` 색 코드 유지, 숫자로 시작해도 문제없음, 200자도 됨, bare 번역 키 문자열은 엔진이 번역하지 않음, RawMessage(`{ rawtext: [...] }`)는 클라이언트가 플레이어 언어로 번역해 바인딩에 넣어 줌. 그래서 여러 번역 키를 합친 문장도 엔트리 하나로 보낼 수 있다.",
      "en": "Properties of server form entry strings: `§` color codes are kept, starting with a number is fine, even 200 characters work, a bare translation key string is not translated by the engine, and a RawMessage (`{ rawtext: [...] }`) is translated by the client into the player's language and put into the binding. So a sentence combining several translation keys can also be sent as one entry."
    },
    "detail": {
      "ko": "서버 폼 엔트리 문자열의 성질: `§` 색 코드 유지, 숫자로 시작해도 문제없음, 200자도 됨, bare 번역 키 문자열은 엔진이 번역하지 않음, RawMessage()는 클라이언트가 플레이어 언어로 번역해 바인딩에 넣어 줌. 그래서 여러 번역 키를 합친 문장도 엔트리 하나로 보낼 수 있다. `{실측}` )",
      "en": "Properties of server form entry strings: the `§` color codes are kept, starting with a digit is no problem, even 200 characters work, a bare translation key string is not translated by the engine, and a RawMessage () is translated into the player's language by the client and put into the binding. So a sentence made of several translation keys can also be sent as one entry. `{measured}` )"
    },
    "sources": "BC-S7, BC 4.1-(4)"
  },
  "TXT-12": {
    "id": "TXT-12",
    "category": "TXT",
    "page": "reference/rules",
    "anchor": "txt-12",
    "proposal": false,
    "evidence": [
      "실측",
      "코드"
    ],
    "title": {
      "ko": "텍스트를 직접 못 다루는 표면(상자 슬롯)에 글자를 쓰려면 숫자 → lang 키 → 글자로 바꾼다. 슬롯 스택 수량 n을 `('core.ui.c.' + #count)` 키로 만들고 `.lang`에 `core.ui.c.<n>=<글자>`를 둔다. 수량 1은 `#inventory_stack_count`가 비어 있으므로 공백 글자로 정한다.",
      "en": "To write letters on a surface that cannot handle text directly (chest slots), convert number, then lang key, then letter. Make the slot stack count n into the key `('core.ui.c.' + #count)` and put `core.ui.c.<n>=<character>` in the `.lang`. A count of 1 leaves `#inventory_stack_count` empty, so it is set to a blank character."
    },
    "detail": {
      "ko": "텍스트를 직접 못 다루는 표면(상자 슬롯)에 글자를 쓰려면 숫자 → lang 키 → 글자로 바꾼다. 슬롯 스택 수량 n을 `('core.ui.c.' + #count)` 키로 만들고 `.lang`에 `core.ui.c.<n>=<글자>`를 둔다. 수량 1은 `#inventory_stack_count`가 비어 있으므로 공백 글자로 정한다. , BC-facts)",
      "en": "To write text on a surface that cannot handle text directly (a chest slot), convert number -> lang key -> character. Make the slot stack count n into the key `('core.ui.c.' + #count)` and put `core.ui.c.<n>=<character>` in `.lang`. A count of 1 leaves `#inventory_stack_count` empty, so set it to a space character. , BC-facts)"
    },
    "sources": "BC 4.3-(3), BC-facts"
  },
  "TXT-13": {
    "id": "TXT-13",
    "category": "TXT",
    "page": "reference/rules",
    "anchor": "txt-13",
    "proposal": false,
    "evidence": [
      "코드",
      "추론"
    ],
    "title": {
      "ko": "`'%.Ns'`는 바이트 단위라 한글 필드를 중간에서 자르면 글자가 깨진다(EXP-09). 한글이 들어가는 고정 폭 필드는 인코더가 UTF-8 바이트로 패딩한다. 색 코드 `§`는 2바이트, 이모지는 대부분 4바이트다(EXP-24).",
      "en": "`'%.Ns'` is in bytes, so cutting a Hangul field in the middle breaks the character (EXP-09). For fixed-width fields that hold Hangul, the encoder pads in UTF-8 bytes. The color code `§` is 2 bytes and most emoji are 4 bytes (EXP-24)."
    },
    "detail": {
      "ko": "`'%.Ns'`는 바이트 단위라 한글 필드를 중간에서 자르면 글자가 깨진다(EXP-09). 한글이 들어가는 고정 폭 필드는 인코더가 UTF-8 바이트로 패딩한다. 색 코드 `§`는 2바이트, 이모지는 대부분 4바이트다(EXP-24).",
      "en": "`'%.Ns'` is in bytes, so cutting a Hangul field in the middle breaks the character (EXP-09). Fixed-width fields that contain Hangul are padded by the encoder with UTF-8 bytes. The color code `§` is 2 bytes and most emoji are 4 bytes (EXP-24)."
    },
    "sources": "BA 3.1, BW-intro"
  },
  "TXT-14": {
    "id": "TXT-14",
    "category": "TXT",
    "page": "reference/rules",
    "anchor": "txt-14",
    "proposal": false,
    "evidence": [
      "작동팩",
      "추론"
    ],
    "title": {
      "ko": "빈 화면 문구처럼 lang 키를 하드코딩할 때 키 이름 오타는 키 자체가 화면에 찍히는 것으로만 드러난다(AP v4.2의 `_r4ui:ancements.empty`). lang 파일과 키 목록을 기계적으로 대조한다.",
      "en": "When hardcoding lang keys such as for an empty-screen message, a typo in a key name shows only as the key itself printed on screen (`_r4ui:ancements.empty` in AP v4.2). Compare the lang file and the key list mechanically."
    },
    "detail": {
      "ko": "빈 화면 문구처럼 lang 키를 하드코딩할 때 키 이름 오타는 키 자체가 화면에 찍히는 것으로만 드러난다(AP v4.2의 `_r4ui:ancements.empty`). lang 파일과 키 목록을 기계적으로 대조한다.",
      "en": "When hardcoding a lang key, such as for an empty-screen message, a typo in the key name shows up only as the key itself printed on the screen (`_r4ui:ancements.empty` in AP v4.2). Compare the lang file and the key list mechanically."
    },
    "sources": "AP 5장"
  },
  "TXT-15": {
    "id": "TXT-15",
    "category": "TXT",
    "page": "reference/rules",
    "anchor": "txt-15",
    "proposal": false,
    "evidence": [
      "미검증"
    ],
    "title": {
      "ko": "바닐라 `common.hover_text`에 `property_bag`의 `#hover_text`로 넣은 문자열은 현지화되지 않는다. 번역이 필요하면 툴팁 라벨을 직접 만든다.",
      "en": "A string put into `#hover_text` in `property_bag` of vanilla `common.hover_text` is not localized. If translation is needed, build the tooltip label yourself."
    },
    "detail": {
      "ko": "바닐라 `common.hover_text`에 `property_bag`의 `#hover_text`로 넣은 문자열은 현지화되지 않는다. 번역이 필요하면 툴팁 라벨을 직접 만든다.",
      "en": "A string put into vanilla `common.hover_text` through `#hover_text` of `property_bag` is not localized. If translation is needed, make the tooltip label yourself."
    },
    "sources": "BW-btn"
  },
  "TXT-16": {
    "id": "TXT-16",
    "category": "TXT",
    "page": "reference/rules",
    "anchor": "txt-16",
    "proposal": false,
    "evidence": [
      "바닐라"
    ],
    "title": {
      "ko": "라벨 보조 속성: `line_padding`(줄 간격, 바닐라 14), `backup_font_type`(4), `hide_hyphen`(3), `locked_color`·`locked_alpha`(부모가 `enabled: false`일 때, 4·17), `notify_on_ellipses`(말줄임이 생기거나 사라지면 지정한 컨트롤의 `#using_ellipses`가 바뀜, 4).",
      "en": "Auxiliary label properties: `line_padding` (line spacing, 14 in vanilla), `backup_font_type` (4), `hide_hyphen` (3), `locked_color` and `locked_alpha` (when the parent is `enabled: false`, 4 and 17), `notify_on_ellipses` (when an ellipsis appears or disappears, the `#using_ellipses` of the specified control changes, 4)."
    },
    "detail": {
      "ko": "라벨 보조 속성: `line_padding`(줄 간격, 바닐라 14), `backup_font_type`(4), `hide_hyphen`(3), `locked_color`·`locked_alpha`(부모가 `enabled: false`일 때, 4·17), `notify_on_ellipses`(말줄임이 생기거나 사라지면 지정한 컨트롤의 `#using_ellipses`가 바뀜, 4).",
      "en": "Label helper properties: `line_padding` (line spacing, vanilla 14), `backup_font_type` (4), `hide_hyphen` (3), `locked_color` and `locked_alpha` (when the parent is `enabled: false`, 4 and 17), `notify_on_ellipses` (when an ellipsis appears or disappears, `#using_ellipses` of the specified control changes, 4)."
    },
    "sources": "BW-doc Text 표, VN"
  },
  "TXT-17": {
    "id": "TXT-17",
    "category": "TXT",
    "page": "reference/rules",
    "anchor": "txt-17",
    "proposal": false,
    "evidence": [
      "코드"
    ],
    "title": {
      "ko": "현지화 라벨의 텍스트에 `%`가 있으면 `%토큰`(영문·숫자·`-`·`.`·`_`)마다 따로 번역하고, 없는 토큰은 글자 그대로 둔다. 그래서 `\"50%\"` 같은 글자의 `%`는 사라진다. `%`를 보여야 하면 `localize: false`.",
      "en": "If the text of a localized label has `%`, each `%token` (letters, digits, `-`, `.`, `_`) is translated separately, and a token that does not exist is left as text. So the `%` in text like `\"50%\"` disappears. If you must show `%`, use `localize: false`."
    },
    "detail": {
      "ko": "현지화 라벨의 텍스트에 `%`가 있으면 `%토큰`(영문·숫자·`-`·`.`·`_`)마다 따로 번역하고, 없는 토큰은 글자 그대로 둔다. 그래서 `\"50%\"` 같은 글자의 `%`는 사라진다. `%`를 보여야 하면 `localize: false`.",
      "en": "If the text of a localized label has `%`, each `%token` (letters, digits, `-`, `.`, `_`) is translated separately, and a token that does not exist is left as literal text. So the `%` in text like `\"50%\"` disappears. To show `%`, use `localize: false`."
    },
    "sources": "CN"
  },
  "TXT-22": {
    "id": "TXT-22",
    "category": "TXT",
    "page": "reference/rules",
    "anchor": "txt-22",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "칸 옆에 직접 그린 호버 상자는 스크롤 창에 잘렸다. 바닐라 `common.hover_text`(`hover_text_renderer`)를 버튼의 호버 상태 자식으로 두고 `#hover_text`에 버튼 글을 넣으면 포인터 옆에 잘리지 않고 뜬다. `$hover_text_max_width`가 0이면 글의 `\\n`에서만 줄을 바꾸고, 150이면 한글이 다섯 글자쯤에서 꺾였다.",
      "en": "A hover box drawn directly beside a cell was clipped by the scroll window. Putting vanilla `common.hover_text` (`hover_text_renderer`) as a child of the button's hover state and putting the button's text into `#hover_text` made it appear beside the pointer without clipping. If `$hover_text_max_width` is 0, lines break only at `\\n` in the text, and at 150 Hangul wrapped at about five characters."
    },
    "detail": {
      "ko": "칸 옆에 직접 그린 호버 상자는 스크롤 창에 잘렸다. 바닐라 `common.hover_text`(`hover_text_renderer`)를 버튼의 호버 상태 자식으로 두고 `#hover_text`에 버튼 글을 넣으면 포인터 옆에 잘리지 않고 뜬다. `$hover_text_max_width`가 0이면 글의 `\\n`에서만 줄을 바꾸고, 150이면 한글이 다섯 글자쯤에서 꺾였다.",
      "en": "A hover box drawn directly next to a cell was clipped by the scroll window. If you put vanilla `common.hover_text` (`hover_text_renderer`) as a child of the button's hover state and put the button text in `#hover_text`, it appears next to the pointer without being clipped. With `$hover_text_max_width` at 0, lines break only at `\\n` in the text, and at 150 Hangul broke at about five characters."
    },
    "sources": "DF"
  },
  "TXT-23": {
    "id": "TXT-23",
    "category": "TXT",
    "page": "reference/rules",
    "anchor": "txt-23",
    "proposal": false,
    "evidence": [
      "실측"
    ],
    "title": {
      "ko": "스코어보드 줄 라벨이 번역을 거치면 `%`가 사라졌다(TXT-17을 게임에서 확인). `localize: false`.",
      "en": "When a scoreboard line label went through translation, the `%` disappeared (TXT-17 confirmed in game). Use `localize: false`."
    },
    "detail": {
      "ko": "스코어보드 줄 라벨이 번역을 거치면 `%`가 사라졌다(TXT-17을 게임에서 확인). `localize: false`.",
      "en": "When a scoreboard line label went through translation, `%` disappeared (TXT-17 confirmed in game). `localize: false`."
    },
    "sources": "DF"
  },
  "TXT-24": {
    "id": "TXT-24",
    "category": "TXT",
    "page": "reference/rules",
    "anchor": "txt-24",
    "proposal": false,
    "evidence": [
      "코드",
      "추론"
    ],
    "title": {
      "ko": "`§` 색 코드의 실제 색은 `ui/_global_variables.json`의 변수 29개에서 만든다: `$0_color_format`~`$f_color_format`, `$coin_color`(`§g`), `$material_quartz_color`·`iron`·`netherite`·`redstone`·`copper`·`gold`·`emerald`·`diamond`·`lapis`·`amethyst`·`resin`(`§h`~`§v`), `$party_blue_color`(`§w`). 그래서 `§w` 색을 라벨 `color`에 쓰려면 `$party_blue_color`를 쓴다. 팩에서 이 변수를 바꾸면 `§` 색도 바뀔 것으로 보이지만 게임에서는 확인하지 않았다. 변수와 코드의 대응은 순서와 바닐라 주석으로 판단했다.",
      "en": "The actual colors of `§` color codes come from 29 variables in `ui/_global_variables.json`: `$0_color_format` to `$f_color_format`, `$coin_color` (`§g`), `$material_quartz_color`, `iron`, `netherite`, `redstone`, `copper`, `gold`, `emerald`, `diamond`, `lapis`, `amethyst`, `resin` (`§h` to `§v`), and `$party_blue_color` (`§w`). So to use the `§w` color in a label `color`, use `$party_blue_color`. Changing these variables in a pack seems to change the `§` colors too, but this was not confirmed in game. The mapping between variables and codes was judged from order and vanilla comments."
    },
    "detail": {
      "ko": "`§` 색 코드의 실제 색은 `ui/_global_variables.json`의 변수 29개에서 만든다: `$0_color_format`~`$f_color_format`, `$coin_color`(`§g`), `$material_quartz_color`·`iron`·`netherite`·`redstone`·`copper`·`gold`·`emerald`·`diamond`·`lapis`·`amethyst`·`resin`(`§h`~`§v`), `$party_blue_color`(`§w`). 그래서 `§w` 색을 라벨 `color`에 쓰려면 `$party_blue_color`를 쓴다. 팩에서 이 변수를 바꾸면 `§` 색도 바뀔 것으로 보이지만 게임에서는 확인하지 않았다. 변수와 코드의 대응은 순서와 바닐라 주석으로 판단했다.",
      "en": "The actual colors of `§` color codes are built from 29 variables in `ui/_global_variables.json`: `$0_color_format` to `$f_color_format`, `$coin_color` (`§g`), `$material_quartz_color`, `iron`, `netherite`, `redstone`, `copper`, `gold`, `emerald`, `diamond`, `lapis`, `amethyst` and `resin` (`§h` to `§v`), and `$party_blue_color` (`§w`). So to use the `§w` color in a label `color`, use `$party_blue_color`. If a pack changes these variables, the `§` colors appear to change too, but this was not checked in game. The mapping between variables and codes was judged from the order and vanilla comments."
    },
    "sources": "NB-11, VN _global_variables.json:238-312"
  }
};
