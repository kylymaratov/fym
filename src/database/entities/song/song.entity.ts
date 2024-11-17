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
import { SongCacheEntity } from './song.cache.entity';
import { SongMetadataEntity } from './song.metadata.entity';
import { SongLikeEntity } from './song.like.entity';

@Entity({ name: 'songs' })
export class SongEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ unique: true, nullable: false })
  song_id: string;

  @Column()
  original_title: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  author: string;

  @Column({ nullable: true })
  artist: string;

  @Column()
  duration: number;

  @Column()
  is_official: boolean;

  @Column({ nullable: true })
  upload_date: Date | null;

  @Column({ default: false })
  is_downloading: boolean;

  @Column({ default: 0 })
  listened_count: number;

  @OneToMany(() => SongLikeEntity, (song_like) => song_like.song)
  song_likes: SongLikeEntity[];

  @JoinColumn()
  @OneToOne(() => SongCacheEntity, (cache) => cache.song, {
    cascade: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  cache: SongCacheEntity | null;

  @JoinColumn()
  @OneToOne(() => SongMetadataEntity, (metadata) => metadata.song, {
    cascade: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  metadata: SongMetadataEntity | null;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
