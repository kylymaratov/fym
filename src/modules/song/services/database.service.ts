import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SongCacheEntity } from 'src/database/entities/song/song.cache.entity';
import { SongEntity } from 'src/database/entities/song/song.entity';
import { SongMetadataEntity } from 'src/database/entities/song/song.metadata.entity';
import { Repository } from 'typeorm';
import { TSong } from '../types/song.types';
import { UserEntity } from 'src/database/entities/user/user.entity';
import { SongLikeEntity } from 'src/database/entities/song/song.like.entity';

@Injectable()
export class SongDatabaseService {
  private MAX_CACHE_SIZE: number = 1000;

  constructor(
    @InjectRepository(SongEntity)
    private songRepository: Repository<SongEntity>,
    @InjectRepository(SongCacheEntity)
    private songCacheRepository: Repository<SongCacheEntity>,
    @InjectRepository(SongMetadataEntity)
    private songMetadataRepository: Repository<SongMetadataEntity>,
    @InjectRepository(SongLikeEntity)
    private songLikeRepository: Repository<SongLikeEntity>,
  ) {}

  async findBySourceId(sourceId: string, relations: string[] = []) {
    return await this.songRepository.findOne({
      where: { sourceId },
      relations,
    });
  }

  async likeSong(user: UserEntity, song: SongEntity) {
    const like = await this.songLikeRepository.findOne({
      where: { user: { id: user.id }, song: { id: song.id } },
    });

    if (like) {
      await this.songLikeRepository.remove(like);
      return false;
    }

    const new_like = this.songLikeRepository.create({ user, song });

    await this.songLikeRepository.save(new_like);

    return true;
  }

  async saveNewSong(song: TSong): Promise<void> {
    try {
      const ext_song = await this.songRepository.findOne({
        where: { sourceId: song.sourceId },
      });

      if (ext_song) return;

      const newSong = this.songRepository.create(song);

      await this.songRepository.save(newSong);
    } catch {}
  }

  async setSongCache(song: SongEntity, buffer: Buffer) {
    if (song.cache) return;

    await this.cleanOldCachedSongs();
    const cache = this.songCacheRepository.create({ buffer });

    await this.songCacheRepository.save(cache);

    song.cache = cache;

    await this.songRepository.save(song);
  }

  async updateDownloadingStatus(song: SongEntity, is_downloading: boolean) {
    await this.songRepository.save({ ...song, is_downloading });
  }

  async updateSongLastAccessed(song: SongEntity) {
    await this.songCacheRepository
      .createQueryBuilder()
      .update(SongCacheEntity)
      .set({ last_accessed: () => 'NOW()' })
      .where('id = :id', { id: song.cache.id })
      .execute();
  }

  async updateSongMetadata(song: SongEntity, metadata: SongMetadataEntity) {
    const newMetadata = this.songMetadataRepository.create(metadata);

    await this.songMetadataRepository.save(newMetadata);

    song.metadata = newMetadata;

    await this.songRepository.save(song);
  }

  private async cleanOldCachedSongs() {
    try {
      const totalCacheSize = await this.songCacheRepository
        .createQueryBuilder('cache')
        .getCount();

      if (totalCacheSize > this.MAX_CACHE_SIZE) {
        const oldCacheIds = await this.songCacheRepository
          .createQueryBuilder('cache')
          .select('cache.id')
          .orderBy('cache.last_accessed', 'ASC')
          .limit(totalCacheSize - this.MAX_CACHE_SIZE)
          .getMany();

        if (oldCacheIds.length > 0) {
          await this.songCacheRepository
            .createQueryBuilder()
            .delete()
            .from(SongCacheEntity)
            .whereInIds(oldCacheIds.map((cache) => cache.id))
            .execute();
        }
      }
    } catch {}
  }
}
