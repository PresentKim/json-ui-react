// 엔티티 인벤토리 화면 런타임 타입.
export interface ScreenInfo {
  title: string;
  nameTag: string;
  inventorySize: 27 | 243;
  slots: Record<string, number[]>;
  buttons: Record<string, number[]>;
}

export interface Session {
  player: any;
  box: any;
  screen: ScreenInfo;
  storage: any;
  state: Record<string, any>;
  /** 슬롯 이름과 그 안의 순번으로 쓴다(차등 쓰기). */
  put(name: string, i: number, item: any | undefined): void;
  /** 버튼 칸마다 표식 아이템을 다시 채운다(꺼진 버튼 칸은 비워 둔다). */
  buttons(): void;
  /**
   * 버튼을 켜고 끈다(기본 켜짐). 끄면 칸을 비워 두고 눌림으로 세지 않아 hideWhenEmpty 버튼이 숨는다.
   * `index`는 screen.buttons[name] 안의 순번이다.
   */
  setButton(name: string, index: number, active: boolean): void;
}

export interface EntityMenuOptions {
  screen: ScreenInfo;
  entityType: string;
  /** 손에 든 아이템이 이 아이템 태그를 갖거나 typeId가 이 값이면 화면을 연다. 기본 "bwiki:test_launcher". */
  launcherTag?: string;
  tag: string;
  mark: string;
  buttonItem?: string;
  onStart?(s: Session): void;
  onPress(s: Session, name: string, index: number): void;
  render(s: Session): void;
  tickEvery?: Record<number, (s: Session) => void>;
}

export function createEntityMenu(opts: EntityMenuOptions): { sessions: Map<string, Session>; start(): void };
export function paper(name: string, lore?: string[]): any | undefined;
/** durabilityDamage를 주면 minecraft:durability 컴포넌트의 damage로 설정한다. */
export function stack(typeId: string, amount?: number, name?: string, lore?: string[], durabilityDamage?: number): any;
/** 차등 쓰기: typeId, amount, nameTag, lore, durability damage가 모두 같으면 쓰지 않는다. */
export function writeSlots(s: { storage: any }, entries: Record<number, any | undefined>): void;
/** 숫자로 시작하면 §r을 붙인다(EXP-30). */
export function text(str: string): string;
