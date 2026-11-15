// 자동 생성(json-ui-react buildScreens): 직접 고치지 마세요.
import { ActionFormData } from "@minecraft/server-ui";

// 데이터가 모자란 칸에 보내는 빈 칸 표식
export const EMPTY = "§0§e§r";

// 화면 id -> 폼 제목(라우터 키)
export const TITLES = {
  "router": "jur:ro",
  "tabs-inside": "jur:ti",
  "tabs-follow": "jur:tf",
  "tabs-lazy": "jur:tl",
  "slot-grid": "jur:sg",
  "virtual-list-500": "jur:v5",
  "virtual-list-2000": "jur:v2",
  "research": "jur:re"
};

// 화면 id -> 버튼 배치(구간·블록, 시작 번호, 개수)
export const LAYOUTS = {
  "router": {
    "total": 4,
    "ranges": [
      {
        "name": "buttons",
        "start": 0,
        "count": 4
      }
    ],
    "blocks": []
  },
  "tabs-inside": {
    "total": 6,
    "ranges": [
      {
        "name": "tabs",
        "start": 0,
        "count": 2
      },
      {
        "name": "tab1",
        "start": 2,
        "count": 2
      },
      {
        "name": "tab2",
        "start": 4,
        "count": 2
      }
    ],
    "blocks": []
  },
  "tabs-follow": {
    "total": 6,
    "ranges": [
      {
        "name": "tabs",
        "start": 0,
        "count": 2
      },
      {
        "name": "tab1",
        "start": 2,
        "count": 2
      },
      {
        "name": "tab2",
        "start": 4,
        "count": 2
      }
    ],
    "blocks": []
  },
  "tabs-lazy": {
    "total": 6,
    "ranges": [
      {
        "name": "tabs",
        "start": 0,
        "count": 2
      },
      {
        "name": "tab1",
        "start": 2,
        "count": 2
      },
      {
        "name": "tab2",
        "start": 4,
        "count": 2
      }
    ],
    "blocks": []
  },
  "slot-grid": {
    "total": 24,
    "ranges": [
      {
        "name": "cells",
        "start": 0,
        "count": 24
      }
    ],
    "blocks": []
  },
  "virtual-list-500": {
    "total": 500,
    "ranges": [
      {
        "name": "list",
        "start": 0,
        "count": 500
      }
    ],
    "blocks": []
  },
  "virtual-list-2000": {
    "total": 2000,
    "ranges": [
      {
        "name": "list",
        "start": 0,
        "count": 2000
      }
    ],
    "blocks": []
  },
  "research": {
    "total": 2022,
    "ranges": [
      {
        "name": "needed",
        "start": 0,
        "count": 48
      },
      {
        "name": "done",
        "start": 48,
        "count": 48
      },
      {
        "name": "tabs",
        "start": 96,
        "count": 2
      },
      {
        "name": "neededPages",
        "start": 98,
        "count": 2
      },
      {
        "name": "donePages",
        "start": 100,
        "count": 2
      }
    ],
    "blocks": [
      {
        "name": "needed.detail",
        "start": 102,
        "count": 48,
        "fields": [
          "name",
          "status",
          "desc",
          "mats0",
          "mats1",
          "mats2",
          "mats3",
          "mats4",
          "mats5",
          "mats6",
          "mats7",
          "rewards0",
          "rewards1",
          "rewards2",
          "rewards3",
          "rewards4",
          "rewards5",
          "rewards6",
          "rewards7",
          "action"
        ]
      },
      {
        "name": "done.detail",
        "start": 1062,
        "count": 48,
        "fields": [
          "name",
          "status",
          "desc",
          "mats0",
          "mats1",
          "mats2",
          "mats3",
          "mats4",
          "mats5",
          "mats6",
          "mats7",
          "rewards0",
          "rewards1",
          "rewards2",
          "rewards3",
          "rewards4",
          "rewards5",
          "rewards6",
          "rewards7",
          "action"
        ]
      }
    ]
  }
};

// 화면 id -> 구간 이름 -> 칸별 기본 글자(Tab label)
const DEFAULTS = {
  "router": {},
  "tabs-inside": {},
  "tabs-follow": {},
  "tabs-lazy": {},
  "slot-grid": {},
  "virtual-list-500": {},
  "virtual-list-2000": {},
  "research": {
    "neededPages": [
      "§r",
      "§r"
    ],
    "donePages": [
      "§r",
      "§r"
    ]
  }
};

// 화면 id -> 레코드 격자 이름 -> { block: 상세 블록 이름, fields: 상세 필드 }(SelectGrid)
const RECORDS = {
  "router": {},
  "tabs-inside": {},
  "tabs-follow": {},
  "tabs-lazy": {},
  "slot-grid": {},
  "virtual-list-500": {},
  "virtual-list-2000": {},
  "research": {
    "needed": {
      "block": "needed.detail",
      "fields": [
        {
          "field": "name",
          "kind": "title",
          "key": "name"
        },
        {
          "field": "status",
          "kind": "text",
          "key": "status"
        },
        {
          "field": "desc",
          "kind": "text",
          "key": "desc"
        },
        {
          "field": "mats0",
          "kind": "icon",
          "key": "mats",
          "index": 0
        },
        {
          "field": "mats1",
          "kind": "icon",
          "key": "mats",
          "index": 1
        },
        {
          "field": "mats2",
          "kind": "icon",
          "key": "mats",
          "index": 2
        },
        {
          "field": "mats3",
          "kind": "icon",
          "key": "mats",
          "index": 3
        },
        {
          "field": "mats4",
          "kind": "icon",
          "key": "mats",
          "index": 4
        },
        {
          "field": "mats5",
          "kind": "icon",
          "key": "mats",
          "index": 5
        },
        {
          "field": "mats6",
          "kind": "icon",
          "key": "mats",
          "index": 6
        },
        {
          "field": "mats7",
          "kind": "icon",
          "key": "mats",
          "index": 7
        },
        {
          "field": "rewards0",
          "kind": "icon",
          "key": "rewards",
          "index": 0,
          "badge": "+1"
        },
        {
          "field": "rewards1",
          "kind": "icon",
          "key": "rewards",
          "index": 1,
          "badge": "+1"
        },
        {
          "field": "rewards2",
          "kind": "icon",
          "key": "rewards",
          "index": 2,
          "badge": "+1"
        },
        {
          "field": "rewards3",
          "kind": "icon",
          "key": "rewards",
          "index": 3,
          "badge": "+1"
        },
        {
          "field": "rewards4",
          "kind": "icon",
          "key": "rewards",
          "index": 4,
          "badge": "+1"
        },
        {
          "field": "rewards5",
          "kind": "icon",
          "key": "rewards",
          "index": 5,
          "badge": "+1"
        },
        {
          "field": "rewards6",
          "kind": "icon",
          "key": "rewards",
          "index": 6,
          "badge": "+1"
        },
        {
          "field": "rewards7",
          "kind": "icon",
          "key": "rewards",
          "index": 7,
          "badge": "+1"
        },
        {
          "field": "action",
          "kind": "text",
          "key": "action"
        }
      ]
    },
    "done": {
      "block": "done.detail",
      "fields": [
        {
          "field": "name",
          "kind": "title",
          "key": "name"
        },
        {
          "field": "status",
          "kind": "text",
          "key": "status"
        },
        {
          "field": "desc",
          "kind": "text",
          "key": "desc"
        },
        {
          "field": "mats0",
          "kind": "icon",
          "key": "mats",
          "index": 0
        },
        {
          "field": "mats1",
          "kind": "icon",
          "key": "mats",
          "index": 1
        },
        {
          "field": "mats2",
          "kind": "icon",
          "key": "mats",
          "index": 2
        },
        {
          "field": "mats3",
          "kind": "icon",
          "key": "mats",
          "index": 3
        },
        {
          "field": "mats4",
          "kind": "icon",
          "key": "mats",
          "index": 4
        },
        {
          "field": "mats5",
          "kind": "icon",
          "key": "mats",
          "index": 5
        },
        {
          "field": "mats6",
          "kind": "icon",
          "key": "mats",
          "index": 6
        },
        {
          "field": "mats7",
          "kind": "icon",
          "key": "mats",
          "index": 7
        },
        {
          "field": "rewards0",
          "kind": "icon",
          "key": "rewards",
          "index": 0,
          "badge": "+1"
        },
        {
          "field": "rewards1",
          "kind": "icon",
          "key": "rewards",
          "index": 1,
          "badge": "+1"
        },
        {
          "field": "rewards2",
          "kind": "icon",
          "key": "rewards",
          "index": 2,
          "badge": "+1"
        },
        {
          "field": "rewards3",
          "kind": "icon",
          "key": "rewards",
          "index": 3,
          "badge": "+1"
        },
        {
          "field": "rewards4",
          "kind": "icon",
          "key": "rewards",
          "index": 4,
          "badge": "+1"
        },
        {
          "field": "rewards5",
          "kind": "icon",
          "key": "rewards",
          "index": 5,
          "badge": "+1"
        },
        {
          "field": "rewards6",
          "kind": "icon",
          "key": "rewards",
          "index": 6,
          "badge": "+1"
        },
        {
          "field": "rewards7",
          "kind": "icon",
          "key": "rewards",
          "index": 7,
          "badge": "+1"
        },
        {
          "field": "action",
          "kind": "text",
          "key": "action"
        }
      ]
    }
  }
};

// 상세 블록 이름 -> 그 블록을 가진 레코드 격자 이름
function ownerOf(id, block) {
  for (const [name, r] of Object.entries(RECORDS[id])) if (r.block === block) return name;
  return null;
}

function layoutOf(id) {
  const layout = LAYOUTS[id];
  if (!layout) throw new Error(`Unknown screen: ${id}`);
  return layout;
}

export function screenTitle(id) {
  layoutOf(id);
  return TITLES[id];
}

// 버튼 번호 -> { name, index } (블록이면 field도). 범위 밖이면 null.
export function decode(id, selection) {
  const layout = layoutOf(id);
  if (!Number.isInteger(selection) || selection < 0 || selection >= layout.total) return null;
  for (const r of layout.ranges) {
    if (selection >= r.start && selection < r.start + r.count) return { name: r.name, index: selection - r.start };
  }
  for (const b of layout.blocks) {
    const size = b.fields.length;
    if (selection >= b.start && selection < b.start + b.count * size) {
      const off = selection - b.start;
      // 레코드 상세 블록이면 이름은 격자 이름: { name: 격자, index: 칸, field }
      return { name: ownerOf(id, b.name) ?? b.name, index: Math.floor(off / size), field: b.fields[off % size] };
    }
  }
  return null;
}

// 버튼 하나: "글자" | [글자, 아이콘] | { text, icon }
function toButton(v) {
  if (typeof v === "string") return [v];
  if (Array.isArray(v)) return v[1] === undefined ? [String(v[0])] : [String(v[0]), v[1]];
  if (v && typeof v === "object") return v.icon === undefined ? [String(v.text)] : [String(v.text), v.icon];
  throw new Error(`Bad button: ${JSON.stringify(v)}`);
}

// 레코드 상세 필드 하나 -> [글자, 아이콘?]. 값이 없으면 빈 칸 표식.
function fieldButton(rec, f) {
  if (f.kind === "icon") {
    const v = (rec[f.key] ?? [])[f.index];
    if (v === undefined || v === null) return [EMPTY];
    const [icon, count] = Array.isArray(v) ? v : [v];
    return ["§f" + String(count ?? f.badge ?? ""), icon];
  }
  const text = rec[f.key];
  if (text === undefined || text === null) return [EMPTY];
  if (f.kind === "title" && rec.icon !== undefined) return [String(text), rec.icon];
  return [String(text)];
}

// 배치 순서대로 [글자, 아이콘?] 목록을 만든다. 모자란 칸은 기본 글자 또는 빈 칸 표식으로 채운다.
// 레코드 격자(SelectGrid)는 레코드 하나가 칸 버튼 하나와 상세 블록 하나가 된다.
export function buttons(id, data = {}) {
  const layout = layoutOf(id);
  const parts = [
    ...layout.ranges.map((r) => ({ name: r.name, start: r.start, n: r.count })),
    ...layout.blocks.map((b) => ({ name: b.name, start: b.start, n: b.count * b.fields.length, count: b.count })),
  ].sort((a, b) => a.start - b.start);
  for (const k of Object.keys(data)) {
    if (!parts.some((p) => p.name === k && !ownerOf(id, k))) throw new Error(`Screen ${id}: unknown data key ${k}`);
  }
  const out = [];
  for (const p of parts) {
    const owner = ownerOf(id, p.name);
    if (owner) {
      // 상세 블록: 칸 i의 레코드 필드들. 레코드가 없는 칸은 모두 빈 칸 표식.
      const list = data[owner] ?? [];
      for (let i = 0; i < p.count; i++) {
        for (const f of RECORDS[id][owner].fields) out.push(list[i] ? fieldButton(list[i], f) : [EMPTY]);
      }
      continue;
    }
    if (RECORDS[id][p.name]) {
      // 레코드 칸: 아이콘만 보이므로 글자는 CELL_TEXT
      const list = data[p.name] ?? [];
      if (list.length > p.n) throw new Error(`Screen ${id}: ${p.name} has ${list.length} records, max ${p.n}`);
      for (let i = 0; i < p.n; i++) {
        const icon = list[i]?.icon;
        out.push(icon === undefined ? ["§r"] : ["§r", icon]);
      }
      continue;
    }
    const list = data[p.name] ?? [];
    if (list.length > p.n) throw new Error(`Screen ${id}: ${p.name} has ${list.length} buttons, max ${p.n}`);
    const defaults = DEFAULTS[id][p.name] ?? [];
    for (let i = 0; i < p.n; i++) {
      const v = list[i] ?? defaults[i];
      out.push(v === undefined || v === null ? [EMPTY] : toButton(v));
    }
  }
  return out;
}

// 화면을 연다. 결과: null(취소) | { name, index }
export function openScreen(player, id, data = {}) {
  const form = new ActionFormData().title(screenTitle(id));
  for (const [text, icon] of buttons(id, data)) {
    if (icon === undefined) form.button(text);
    else form.button(text, icon);
  }
  return form.show(player).then((res) => {
    if (res.canceled || res.selection === undefined) return null;
    return decode(id, res.selection);
  });
}
