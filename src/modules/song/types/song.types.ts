export interface TSong {
  sourceId: string;
  original_title: string;
  title: string;
  artist: string | null;
  author: string | null;
  duration: number;
  upload_date: Date | null;
  is_official: boolean;
}
