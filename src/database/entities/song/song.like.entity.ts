import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { SongEntity } from './song.entity';

@Entity('song_like')
export class SongLikeEntity {
  @PrimaryColumn({ unique: true, nullable: false })
  song_id: string;

  @ManyToOne(() => UserEntity, (user) => user.song_likes, { nullable: false })
  user: UserEntity;

  @ManyToOne(() => SongEntity, (song) => song.song_likes, { nullable: false })
  song: SongEntity;
}
