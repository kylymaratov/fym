export interface SongTypes {
  id: number;
  title: string;
  author: string;
  artist: string;
  upload_date: string;
  duration: number;
  song_id: string;
  original_title: string;
  is_official: boolean;
  is_downloading: boolean;
  listened_count: number;
  created: string;
  updated: string;
}

export interface SongShowCaseTypes {
  title: string;
  songs: SongTypes[];
}
