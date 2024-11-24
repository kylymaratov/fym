import { IsNotEmpty, Matches } from 'class-validator';

export class AddPlaylistDto {
  @IsNotEmpty()
  playlist_id: string;

  @IsNotEmpty()
  songs: string[];
}
