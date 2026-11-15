// 자동 생성(json-ui-react buildScreens): 직접 고치지 마세요.
import type { Player } from "@minecraft/server";

/** 버튼 하나: 글자, [글자, 아이콘], { text, icon } */
export type Button = string | [text: string, icon?: string] | { text: string; icon?: string };

/** 아이콘 줄(IconRow) 칸 하나: 아이콘, 또는 [아이콘, 숫자]. 숫자가 없으면 IconRow badge 글자. */
export type IconEntry = string | [icon: string, count?: string | number];

/** 화면 id -> openScreen data 모양(키는 컴포넌트 name). */
export interface ScreenData {
  "router": { "buttons"?: Button[] };
  "tabs-inside": { "tabs"?: Button[]; "tab1"?: Button[]; "tab2"?: Button[] };
  "tabs-follow": { "tabs"?: Button[]; "tab1"?: Button[]; "tab2"?: Button[] };
  "tabs-lazy": { "tabs"?: Button[]; "tab1"?: Button[]; "tab2"?: Button[] };
  "slot-grid": { "cells"?: Button[] };
  "virtual-list-500": { "list"?: Button[] };
  "virtual-list-2000": { "list"?: Button[] };
  "research": { "needed"?: { "icon"?: string; "name"?: string; "status"?: string; "desc"?: string; "mats"?: IconEntry[]; "rewards"?: IconEntry[]; "action"?: string }[]; "done"?: { "icon"?: string; "name"?: string; "status"?: string; "desc"?: string; "mats"?: IconEntry[]; "rewards"?: IconEntry[]; "action"?: string }[]; "tabs"?: Button[]; "neededPages"?: Button[]; "donePages"?: Button[] };
}

/** 화면 id -> 응답 name */
export interface ScreenHitNames {
  "router": "buttons";
  "tabs-inside": "tabs" | "tab1" | "tab2";
  "tabs-follow": "tabs" | "tab1" | "tab2";
  "tabs-lazy": "tabs" | "tab1" | "tab2";
  "slot-grid": "cells";
  "virtual-list-500": "list";
  "virtual-list-2000": "list";
  "research": "needed" | "done" | "tabs" | "neededPages" | "donePages";
}

export type ScreenId = keyof ScreenData;
export interface ScreenHit<N extends string = string> { name: N; index: number; field?: string }
export interface ScreenLayout {
  total: number;
  ranges: { name: string; start: number; count: number }[];
  blocks: { name: string; start: number; count: number; fields: string[] }[];
}

export declare const EMPTY: string;
export declare const TITLES: Record<ScreenId, string>;
export declare const LAYOUTS: Record<ScreenId, ScreenLayout>;
export declare function screenTitle(id: ScreenId): string;
export declare function decode<K extends ScreenId>(id: K, selection: number): ScreenHit<ScreenHitNames[K]> | null;
export declare function buttons<K extends ScreenId>(id: K, data?: ScreenData[K]): [string, string?][];
export declare function openScreen<K extends ScreenId>(player: Player, id: K, data?: ScreenData[K]): Promise<ScreenHit<ScreenHitNames[K]> | null>;
