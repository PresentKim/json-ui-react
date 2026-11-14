import { describe, it, expect } from "vitest";
import * as api from "../../src/index";

describe("src/index barrel", () => {
  it.each(["render","createPack","createSlots","lintFiles","ScreenRouter","TabBar","SlotGrid","VirtualList","useTabs","useSelection","useBinding"])("exports %s", (n) => {
    expect(typeof (api as Record<string, unknown>)[n]).toBe("function");
  });
});
