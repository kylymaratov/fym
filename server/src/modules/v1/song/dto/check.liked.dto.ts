import { Matches } from 'class-validator';
import { REXEGP } from 'src/constants/regexp';

export class CheckLikedSongDto {
  @Matches(REXEGP.SONG_ID)
  song_id: string;
}
