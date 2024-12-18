import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserInfoEntity } from './user.info.entity';
import { SongLikeEntity } from '../song/song.like.entity';
import { PlaylistEntity } from '../playlist/playlist.entity';
import { PlaylistLikeEntity } from '../playlist/playlist.like.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true, default: () => 'uuid_generate_v4()' })
  user_sub_id: string;

  @Column({ unique: true, nullable: false })
  @Index()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  verified: boolean;

  @OneToMany(() => SongLikeEntity, (song_like) => song_like.user)
  song_likes: SongLikeEntity[];

  @OneToMany(() => PlaylistLikeEntity, (playlist_like) => playlist_like.user)
  playlist_likes: PlaylistLikeEntity[];

  @JoinColumn()
  @OneToOne(() => UserInfoEntity, (userInfo) => userInfo.user, {
    cascade: true,
    onDelete: 'SET NULL',
    nullable: true,
  })
  user_info: UserInfoEntity | null;

  @JoinColumn()
  @OneToMany(() => PlaylistEntity, (playlist) => playlist.user)
  playlists: PlaylistEntity[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
