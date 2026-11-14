// virtual-list-500: 2열 가상 목록 500칸.
import type { Pack } from "../../src/pack.ts";
import type { Slots } from "../../src/slots.ts";
import { defineVirtualList } from "./virtual-list.tsx";

export const defineVirtualList500 = (pack: Pack, slots: Slots): string => defineVirtualList(pack, slots, "v5", 500);
