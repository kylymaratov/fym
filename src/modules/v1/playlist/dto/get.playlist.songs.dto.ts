import { IsNotEmpty } from 'class-validator';

export class GetPlaylistSongsDto {
  @IsNotEmpty()
  playlist_id: string;
}
