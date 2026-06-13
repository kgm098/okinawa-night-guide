import type { ShopArea, ShopGenre } from "@/lib/supabase/types";

export const AREA_LABEL: Record<ShopArea, string> = {
  naha:         "那覇",
  chatan:       "北谷",
  okinawa_city: "沖縄市",
  nago:         "名護",
  itoman:       "糸満",
  urasoe:       "浦添",
  ginowan:      "宜野湾",
  other:        "その他",
};

export const GENRE_LABEL: Record<ShopGenre, string> = {
  bar:        "BAR",
  club:       "クラブ",
  lounge:     "ラウンジ",
  izakaya:    "居酒屋",
  karaoke:    "カラオケ",
  live_house: "ライブハウス",
  snack:      "スナック",
  restaurant: "レストラン",
  cafe:       "カフェ",
  other:      "その他",
};

// ----------------------------------------------------------------
// フィルター用：URL クエリ値 → 表示ラベル
// ----------------------------------------------------------------

/** area クエリ値 → 日本語ラベル */
export const AREA_FILTER_LABEL: Record<string, string> = {
  naha:        "那覇",
  chatan:      "北谷",
  okinawa_city:"沖縄市",
  nago:        "名護",
  itoman:      "糸満",
  urasoe:      "浦添",
  ginowan:     "宜野湾",
  // sub_area 指定（URLフレンドリーな独自キー）
  matsuyama:   "松山",
  kumoji:      "久茂地",
  miebashi:    "美栄橋",
  wakasa:      "若狭",
  sakurazaka:  "桜坂",
};

/** genre クエリ値 → 日本語ラベル */
export const GENRE_FILTER_LABEL: Record<string, string> = {
  bar:        "BAR",
  club:       "クラブ",
  lounge:     "ラウンジ",
  izakaya:    "居酒屋",
  karaoke:    "カラオケ",
  live_house: "ライブハウス",
  snack:      "スナック",
  restaurant: "レストラン",
  cafe:       "カフェ",
  // タグ検索系（schema の genre enum に直接ない検索語）
  solo:       "一人飲み",
  date:       "デート",
  latenight:  "深夜営業",
  whisky:     "ウイスキーバー",
  cocktail:   "カクテルバー",
};

// ----------------------------------------------------------------
// sub_area の URL キー → 日本語（ILIKE 検索用）
// ----------------------------------------------------------------
export const SUB_AREA_MAP: Record<string, string> = {
  matsuyama:  "松山",
  kumoji:     "久茂地",
  miebashi:   "美栄橋",
  wakasa:     "若狭",
  sakurazaka: "桜坂",
};

// genre enum に存在する値かどうかを判定
const GENRE_ENUM_VALUES: ShopGenre[] = [
  "bar","club","lounge","izakaya","karaoke",
  "live_house","snack","restaurant","cafe","other",
];
export function isShopGenre(v: string): v is ShopGenre {
  return GENRE_ENUM_VALUES.includes(v as ShopGenre);
}

// area enum に存在する値かどうかを判定
const AREA_ENUM_VALUES: ShopArea[] = [
  "naha","chatan","okinawa_city","nago","itoman","urasoe","ginowan","other",
];
export function isShopArea(v: string): v is ShopArea {
  return AREA_ENUM_VALUES.includes(v as ShopArea);
}
