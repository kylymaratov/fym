import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SongEntity } from './song.entity';

@Entity({ name: 'songs_caches' })
export class SongCacheEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bytea' })
  buffer: Buffer;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_accessed: Date;

  @OneToOne(() => SongEntity, (song) => song.cache)
  song: SongEntity;
}
