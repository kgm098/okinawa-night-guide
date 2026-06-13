export type ShopGenre =
  | "bar"
  | "club"
  | "lounge"
  | "izakaya"
  | "karaoke"
  | "live_house"
  | "snack"
  | "restaurant"
  | "cafe"
  | "other";

export type ShopArea =
  | "naha"
  | "chatan"
  | "okinawa_city"
  | "nago"
  | "itoman"
  | "urasoe"
  | "ginowan"
  | "other";

export interface Shop {
  id: string;
  slug: string;
  name: string;
  area: ShopArea;
  sub_area: string | null;
  genres: ShopGenre[];
  tags: string[];
  description: string | null;
  catch_copy: string | null;
  address: string | null;
  business_hours: string | null;
  closed_days: string | null;
  budget: string | null;
  google_map_url: string | null;
  instagram_url: string | null;
  website_url: string | null;
  main_image: string | null;
  gallery_images: string[];
  is_featured: boolean;
  is_popular: boolean;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
  updated_at: string;
}

export type ShopInsert = Omit<Shop, "id" | "created_at" | "updated_at">;
export type ShopUpdate = Partial<ShopInsert>;

// Supabase Database 型定義
export interface Database {
  public: {
    Tables: {
      shops: {
        Row: Shop;
        Insert: ShopInsert;
        Update: ShopUpdate;
      };
    };
    Enums: {
      shop_genre: ShopGenre;
      shop_area: ShopArea;
    };
  };
}
