import { describe, it, expect } from "vitest";
import * as api from "../../src/index";

describe("src/index barrel", () => {
  it.each(["render","createPack","createSlots","lintFiles","ScreenRouter","TabBar","SlotGrid","VirtualList","useTabs","useSelection","useBinding",
    "Screen","ButtonList","Tabs","Tab","buildScreens","themeTextures","LowSlotGrid","LowVirtualList"])("exports %s", (n) => {
    expect(typeof (api as Record<string, unknown>)[n]).toBe("function");
  });
  it("고수준이 기본 이름, 저수준은 Low 접두와 하위 경로로", async () => {
    const high = await import("../../src/high/index.ts");
    const grid = await import("../../src/components/grid.tsx");
    expect(api.SlotGrid).toBe(high.SlotGrid);
    expect(api.VirtualList).toBe(high.VirtualList);
    expect(api.LowSlotGrid).toBe(grid.SlotGrid);
    expect(api.LowVirtualList).toBe(grid.VirtualList);
  });
});
