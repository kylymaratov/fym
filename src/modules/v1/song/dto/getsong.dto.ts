import { Matches } from 'class-validator';
import { REXEGP } from 'src/constants/regexp';

export class GetSongDto {
  @Matches(REXEGP.SONG_ID)
  songId: string;
}
