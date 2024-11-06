import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserInfoEntity } from './user.info.entity';
import { SongLikeEntity } from '../song/song.like.entity';
// import { RecentlyPlayedEntity } from '../recently/recently.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ unique: true, nullable: false })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  verified: boolean;

  @OneToMany(() => SongLikeEntity, (song_like) => song_like.user)
  song_likes: SongLikeEntity[];

  // @OneToMany(() => RecentlyPlayedEntity, (recently) => recently.user)
  // recently_played: RecentlyPlayedEntity[];

  @JoinColumn()
  @OneToOne(() => UserInfoEntity, (userInfo) => userInfo.user, {
    cascade: true,
    onDelete: 'SET NULL',
    nullable: true,
  })
  user_info: UserInfoEntity;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
