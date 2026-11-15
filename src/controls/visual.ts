// 시각/레이아웃 컨트롤 속성 타입: panel, stack_panel, grid, image, label, custom, factory 등.
// 값 목록은 docs/json-ui/value-dictionary.mdx B.3, 제외 이름은 B.1 기준.

import type {
  BoolOrExpr,
  ChildPosProps,
  Color,
  CollectionNameProps,
  CommonProps,
  JsonValue,
  OrVar,
  Var,
} from "./common.ts";

export { ANCHORS } from "./common.ts";
export type { Anchor, CommonProps } from "./common.ts";

/** 바닐라 type 값 25종 (value-dictionary `type`) */
export const CONTROL_TYPES = [
  "panel", "stack_panel", "image", "label", "grid", "input_panel", "custom", "button",
  "factory", "screen", "collection_panel", "edit_box", "scroll_view", "tooltip_trigger",
  "toggle", "carousel_label", "slider_box", "slider", "dropdown", "scroll_track",
  "scrollbar_box", "image_cycler", "label_cycler", "selection_wheel", "grid_page_indicator",
] as const;
export type ControlType = (typeof CONTROL_TYPES)[number];

export const ORIENTATIONS = ["horizontal", "vertical"] as const;
export type Orientation = (typeof ORIENTATIONS)[number];

export const TEXT_ALIGNMENTS = ["center", "left", "right"] as const;
export type TextAlignment = (typeof TEXT_ALIGNMENTS)[number];

export const FONT_TYPES = ["smooth", "MinecraftTen", "default", "rune", "unicode"] as const;
export type FontType = (typeof FONT_TYPES)[number];

export const FONT_SIZES = ["normal", "medium", "large", "small", "extra_large"] as const;
export type FontSize = (typeof FONT_SIZES)[number];

export const GRID_RESCALING_TYPES = ["horizontal", "vertical", "none"] as const;
export type GridRescalingType = (typeof GRID_RESCALING_TYPES)[number];

/** 바닐라는 vertical 만 쓴다 (실측 2회); horizontal 은 대칭값으로 허용 */
export const GRID_FILL_DIRECTIONS = ["vertical", "horizontal"] as const;
export type GridFillDirection = (typeof GRID_FILL_DIRECTIONS)[number];

export const CLIP_DIRECTIONS = ["left", "down", "right", "up"] as const;
export type ClipDirection = (typeof CLIP_DIRECTIONS)[number];

/** 바닐라 renderer 값 (value-dictionary `renderer`) */
export const RENDERERS = [
  "inventory_item_renderer", "paper_doll_renderer", "profile_image_renderer",
  "progress_bar_renderer", "gradient_renderer", "name_tag_renderer", "animated_gif_renderer",
  "equipment_preview_renderer", "enchanting_book_renderer", "vignette_renderer",
  "banner_pattern_renderer", "live_horse_renderer", "trial_time_renderer", "armor_renderer",
  "live_player_renderer", "qr_code_renderer", "cursor_renderer", "debug_screen_renderer",
  "hover_text_renderer", "flying_item_renderer", "credits_renderer", "3d_structure_renderer",
  "bundle_tooltip_renderer", "actor_portrait_renderer", "hud_player_renderer", "hotbar_renderer",
  "hotbar_cooldown_renderer", "heart_renderer", "horse_heart_renderer", "horse_jump_renderer",
  "dash_renderer", "locator_bar", "hunger_renderer", "bubbles_renderer", "mob_effects_renderer",
  "editor_gizmo_renderer", "progress_indicator_renderer", "camera_renderer",
  "editor_volume_highlight_renderer", "editor_compass_renderer", "panorama_renderer",
  "web_view_renderer", "splash_text_renderer",
] as const;
export type Renderer = (typeof RENDERERS)[number];

/** [행, 열] 같은 정수 쌍 */
type Pair = [number, number] | Var;

/** panel: 자식을 겹쳐 놓는 기본 컨테이너 */
export interface PanelProps extends CommonProps, ChildPosProps {}

/** stack_panel: 자식을 한 방향으로 쌓는다 */
export interface StackPanelProps extends CommonProps, ChildPosProps, CollectionNameProps {
  /** 쌓는 방향 */
  orientation?: OrVar<Orientation>;
}

/** grid: 격자 배치. 자식은 grid_item_template 로 만든다 */
export interface GridProps extends CommonProps, ChildPosProps, CollectionNameProps {
  /** 격자 크기 [열, 행] */
  grid_dimensions?: Pair;
  /** 항목 템플릿 컨트롤 이름 */
  grid_item_template?: string;
  /** 격자 크기를 늘리는 방향 */
  grid_rescaling_type?: OrVar<GridRescalingType>;
  /** 채우는 방향 */
  grid_fill_direction?: OrVar<GridFillDirection>;
  /** 최대 항목 수 */
  maximum_grid_items?: number | Var;
  /** 격자 크기를 바인딩으로 받는 이름 (`#...`) */
  grid_dimension_binding?: string;
  /** 격자 안 자식 위치 [행, 열] */
  grid_position?: Pair;
}

/** image: 텍스처 그리기. collection_index 불가 (COL-02), collection_name 불가 (COL-01) */
export interface ImageProps extends CommonProps {
  /** 텍스처 경로 (확장자 없이) */
  texture?: string;
  /** 텍스처 시작 좌표 [u, v] */
  uv?: Pair | string;
  /** 텍스처 읽기 크기 [w, h] */
  uv_size?: Pair | string;
  /** 9분할 경계: 숫자 하나 또는 [좌, 상, 우, 하] */
  nineslice_size?: number | [number, number, number, number] | Var;
  /** 타일 반복 (true/"x"/"y"/"none") */
  tiled?: BoolOrExpr;
  /** 타일 배율 */
  tiled_scale?: Pair;
  /** 비율 유지 */
  keep_ratio?: BoolOrExpr;
  /** 이중선형 보간 */
  bilinear?: BoolOrExpr;
  /** 영역 채우기 (true 또는 세부 객체) */
  fill?: boolean | { [k: string]: JsonValue } | Var;
  /** 자르기 시작 방향 */
  clip_direction?: OrVar<ClipDirection>;
  /** 자르기 비율 0..1 */
  clip_ratio?: number | string;
  /** 자르기 픽셀 정렬 */
  clip_pixelperfect?: BoolOrExpr;
  /** 색 곱 */
  color?: Color | string;
  /** 흑백 */
  grayscale?: BoolOrExpr;
  /** 텍스처 강제 재로딩 */
  force_texture_reload?: BoolOrExpr;
  /** 누락 텍스처 디버그 표시 허용 */
  allow_debug_missing_texture?: BoolOrExpr;
  /** 텍스처 파일 시스템 */
  texture_file_system?: string;
  /** 9분할 기준 원본 크기 */
  base_size?: Pair;
  /** zip 폴더 */
  zip_folder?: string;
}

/** label: 글자 그리기. collection_index 불가 (COL-02), collection_name 불가 (COL-01) */
export interface LabelProps extends CommonProps {
  /** 표시 글자 (또는 `#바인딩`) */
  text?: string;
  /** 글자 색 */
  color?: Color | string;
  /** 잠긴 상태 색 */
  locked_color?: Color | string;
  /** 글꼴 */
  font_type?: OrVar<FontType>;
  /** 대체 글꼴 */
  backup_font_type?: OrVar<FontType>;
  /** 글자 크기 단계 */
  font_size?: OrVar<FontSize>;
  /** 글자 배율 */
  font_scale_factor?: number | Var | string;
  /** 그림자 */
  shadow?: BoolOrExpr;
  /** 정렬 */
  text_alignment?: OrVar<TextAlignment>;
  /** 번역 키로 취급 */
  localize?: BoolOrExpr;
  /** 줄 간격 */
  line_padding?: number | Var;
  /** 욕설 필터 */
  enable_profanity_filter?: BoolOrExpr;
  /** 말줄임 알림 */
  notify_on_ellipses?: string[];
  /** 하이픈 숨김 */
  hide_hyphen?: BoolOrExpr;
  /** 잠긴 상태 알파 */
  locked_alpha?: number | Var;
}

/** custom: 엔진 렌더러 호출 */
export interface CustomProps extends CommonProps, ChildPosProps {
  /** 렌더러 이름 */
  renderer?: OrVar<Renderer>;
  /** 렌더러별 보조 속성 */
  rotation?: number | string;
  starting_rotation?: number | string;
  camera_tilt_degrees?: number | string;
  use_selected_skin?: BoolOrExpr;
  skeleton_model_name?: string;
  entity_identifier?: string;
}

/** factory 설정 */
export interface FactorySpec {
  /** 팩토리 이름 (예: chat_item_factory) */
  name: string;
  /** 단일 템플릿 컨트롤 이름 */
  control_name?: string;
  /** 바인딩 값에 따라 고르는 템플릿 맵 */
  control_ids?: { [k: string]: string };
  /** 최대 자식 수 */
  max_children_size?: number;
}

/** factory: 템플릿에서 자식을 동적 생성 */
export interface FactoryProps extends CommonProps, ChildPosProps {
  factory?: FactorySpec | Var;
}

/** collection_panel: 컬렉션 바인딩 컨테이너 */
export interface CollectionPanelProps extends CommonProps, ChildPosProps, CollectionNameProps {}

/** screen: 화면 루트 */
export interface ScreenProps extends CommonProps, ChildPosProps {
  /** 최상단일 때만 그린다 */
  render_only_when_topmost?: BoolOrExpr;
  /** 아래 화면도 그린다 */
  render_game_behind?: BoolOrExpr;
  /** 입력을 흡수한다 */
  absorbs_input?: BoolOrExpr;
  /** 항상 입력 허용 */
  always_accepts_input?: BoolOrExpr;
  /** 마우스 포인터 표시 */
  should_steal_mouse?: BoolOrExpr;
  /** 화면 스택 비플러시 */
  screen_not_flushable?: BoolOrExpr;
  /** 닫기 이벤트 */
  close_on_player_hurt?: BoolOrExpr;
  /** 화면 캐시 */
  cache_screen?: BoolOrExpr;
  /** 즉시 로딩 */
  load_screen_immediately?: BoolOrExpr;
  /** 하단 렌더 강제 */
  force_render_below?: BoolOrExpr;
  /** 메뉴 표시 상태 */
  is_showing_menu?: BoolOrExpr;
}
