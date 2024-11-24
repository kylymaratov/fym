import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { PlaylistEntity } from './playlist.entity';

@Entity({ name: 'playlist_like' })
export class PlaylistLikeEntity {
  @PrimaryColumn()
  playlist_id: string;

  @PrimaryColumn()
  user_id: string;

  @ManyToOne(() => UserEntity, (user) => user.playlist_likes, {
    nullable: false,
  })
  user: UserEntity;

  @ManyToOne(() => PlaylistEntity, (playlist) => playlist.playlist_likes, {
    nullable: false,
  })
  playlist: PlaylistEntity;
}
