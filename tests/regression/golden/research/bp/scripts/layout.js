// 자동 생성: 슬롯 배치 모듈
export const LAYOUT = {
  "total": 2022,
  "ranges": [
    {
      "name": "tab0",
      "start": 0,
      "count": 48
    },
    {
      "name": "tab1",
      "start": 48,
      "count": 48
    },
    {
      "name": "tabs",
      "start": 96,
      "count": 2
    },
    {
      "name": "pager0",
      "start": 98,
      "count": 2
    },
    {
      "name": "pager1",
      "start": 100,
      "count": 2
    }
  ],
  "blocks": [
    {
      "name": "detail",
      "start": 102,
      "count": 96,
      "fields": [
        "head",
        "status",
        "desc",
        "mat0",
        "mat1",
        "mat2",
        "mat3",
        "mat4",
        "mat5",
        "mat6",
        "mat7",
        "rew0",
        "rew1",
        "rew2",
        "rew3",
        "rew4",
        "rew5",
        "rew6",
        "rew7",
        "progress"
      ]
    }
  ]
};

export function decode(sel) {
  if (!Number.isInteger(sel) || sel < 0 || sel >= LAYOUT.total) return null;
  for (const r of LAYOUT.ranges) {
    if (sel >= r.start && sel < r.start + r.count) return { name: r.name, index: sel - r.start };
  }
  for (const b of LAYOUT.blocks) {
    const size = b.fields.length;
    if (sel >= b.start && sel < b.start + b.count * size) {
      const off = sel - b.start;
      return { name: b.name, index: Math.floor(off / size), field: b.fields[off % size] };
    }
  }
  return null;
}
