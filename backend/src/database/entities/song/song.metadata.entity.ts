import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SongEntity } from './song.entity';

@Entity({ name: 'song_metadata' })
export class SongMetadataEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  file_id: string;

  @Column()
  file_unique_id: string;

  @Column()
  duration: number;

  @Column({ nullable: true })
  performer: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  file_name: string;

  @Column({ nullable: true })
  mime_type: string;

  @Column({ nullable: true })
  file_size: number;

  @Column({ nullable: true, type: 'json' })
  thumbnail: {
    file_id: string;
    file_unique_id: string;
    width: number;
    height: number;
    file_size?: number;
  };

  @OneToOne(() => SongEntity, (song) => song.metadata)
  song: SongEntity;
}
