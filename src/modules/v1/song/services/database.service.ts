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
  private SONG_FIELDS = [
    'song.id AS id',
    'song.source_id AS source_id',
    'song.original_title AS original_title',
    'song.title AS title',
    'song.author AS author',
    'song.artist AS artist',
    'song.duration AS duration',
    'song.is_official AS is_official',
    'song.upload_date AS upload_date',
    'song.is_downloading AS is_downloading',
    'song.created AS created',
    'song.updated AS updated',
  ];
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

  async findBySourceId(source_id: string, relations: string[] = []) {
    return await this.songRepository.findOne({
      where: { source_id },
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

  async saveNewSong(song: TSong): Promise<SongEntity> {
    try {
      const ext_song = await this.songRepository.findOne({
        where: { source_id: song.source_id },
      });

      if (ext_song) return ext_song;

      const newSong = this.songRepository.create(song);

      return await this.songRepository.save(newSong);
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

  async incListenCount(songId: string) {
    await this.songRepository.increment(
      { source_id: songId },
      'listened_count',
      1,
    );
  }

  async updateSongMetadata(song: SongEntity, metadata: SongMetadataEntity) {
    const newMetadata = this.songMetadataRepository.create(metadata);

    await this.songMetadataRepository.save(newMetadata);

    song.metadata = newMetadata;

    await this.songRepository.save(song);
  }
  async findTopListenedSongs() {
    const songs = await this.songRepository
      .createQueryBuilder('song')
      .orderBy('listened_count', 'DESC')
      .getMany();

    return songs;
  }

  async findUserLikedSongs(user: UserEntity) {
    const songs = await this.songRepository
      .createQueryBuilder('song')
      .leftJoin('song.song_likes', 'like')
      .select(this.SONG_FIELDS)
      .addSelect('COUNT(like.id)', 'like_count')
      .where('like.userId = :userId', { userId: user.id })
      .groupBy('song.id')
      .addGroupBy('song.source_id')
      .orderBy('like_count', 'DESC')
      .getRawMany();

    return songs;
  }

  async findTopSongs(limit: number = 20): Promise<SongEntity[]> {
    const songs = await this.songRepository
      .createQueryBuilder('song')
      .leftJoin('song.song_likes', 'like')
      .select(this.SONG_FIELDS)
      .addSelect('COUNT(like.id)', 'like_count')
      .groupBy('song.id')
      .addGroupBy('song.source_id')
      .orderBy('like_count', 'DESC')
      .limit(limit)
      .getRawMany();

    return songs;
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
