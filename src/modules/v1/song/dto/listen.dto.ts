import { IsNotEmpty, Matches } from 'class-validator';
import { REXEGP } from 'src/constants/regexp';

export class ListenSongDto {
  @IsNotEmpty()
  @Matches(REXEGP.SONG_ID)
  song_id: string;

  quality: number = 1;
}
