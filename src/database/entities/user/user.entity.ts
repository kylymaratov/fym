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

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryGeneratedColumn('uuid')
  user_sub_id: string;

  @PrimaryColumn({ unique: true, nullable: false })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  verified: boolean;

  @OneToMany(() => SongLikeEntity, (song_like) => song_like.user)
  song_likes: SongLikeEntity[];

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
