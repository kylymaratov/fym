import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { SongEntity } from '../song/song.entity';
import { PlaylistLikeEntity } from './playlist.like.entity';

@Entity('playlists')
export class PlaylistEntity {
  @PrimaryGeneratedColumn('uuid')
  playlist_id: string;

  @Column({ default: false })
  is_private: boolean;

  @Column({ nullable: false })
  name: string;

  @JoinTable()
  @ManyToMany(() => SongEntity, (song) => song.playlists)
  songs: SongEntity[];

  @ManyToOne(() => UserEntity, (user) => user.playlists)
  user: UserEntity;

  @OneToMany(() => PlaylistLikeEntity, (playlist) => playlist.playlist)
  playlist_likes: PlaylistLikeEntity[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
