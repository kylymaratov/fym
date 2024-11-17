import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { SongEntity } from './song.entity';

@Entity({ name: 'song_cache' })
export class SongCacheEntity {
  @PrimaryColumn({ unique: true, nullable: false })
  song_id: string;

  @Column({ type: 'bytea' })
  buffer: Buffer;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_accessed: Date;

  @OneToOne(() => SongEntity, (song) => song.cache)
  song: SongEntity;
}
