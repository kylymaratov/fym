import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { SongEntity } from './song.entity';

@Entity('song_likes')
export class SongLikeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.song_likes, { cascade: true })
  user: UserEntity;

  @ManyToOne(() => SongEntity, (song) => song.song_likes, { cascade: true })
  song: SongEntity;
}
