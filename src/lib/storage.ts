const BUCKET = "shop-images";

export function getStorageUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return null;
  return `${base}/storage/v1/object/public/${BUCKET}/${path}`;
}

export function getGalleryUrls(paths: string[]): string[] {
  return paths.map((p) => getStorageUrl(p)).filter(Boolean) as string[];
}
