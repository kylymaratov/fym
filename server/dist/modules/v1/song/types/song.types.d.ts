export interface TSong {
    song_id: string;
    original_title: string;
    title: string;
    artist: string | null;
    author: string | null;
    duration: number;
    upload_date: Date | null;
    is_official: boolean;
}
