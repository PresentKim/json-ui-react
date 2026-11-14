// virtual-list-2000: 2열 가상 목록 2000칸(COL-49 한계 이내).
import type { Pack } from "../../src/pack.ts";
import type { Slots } from "../../src/slots.ts";
import { defineVirtualList } from "./virtual-list.tsx";

export const defineVirtualList2000 = (pack: Pack, slots: Slots): string => defineVirtualList(pack, slots, "v2", 2000);
