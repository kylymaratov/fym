import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SongCacheEntity } from './song.cache.entity';
import { SongMetadataEntity } from './song.metadata.entity';

@Entity({ name: 'songs' })
export class SongEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ unique: true, nullable: false })
  sourceId: string;

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
