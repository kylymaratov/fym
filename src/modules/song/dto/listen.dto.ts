import { IsNotEmpty, Matches } from 'class-validator';
import { REXEGP } from 'src/constants/regexp';

export class ListenSongDto {
  @IsNotEmpty()
  @Matches(REXEGP.SONG_ID)
  songId: string;

  quality: number = 1;
}
