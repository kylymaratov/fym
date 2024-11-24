import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SongCacheEntity } from 'src/database/entities/song/song.cache.entity';
import { SongEntity } from 'src/database/entities/song/song.entity';
import { SongMetadataEntity } from 'src/database/entities/song/song.metadata.entity';
import { Repository } from 'typeorm';
import { TSong } from '../types/song.types';
import { UserEntity } from 'src/database/entities/user/user.entity';
import { SongLikeEntity } from 'src/database/entities/song/song.like.entity';
import { ServerLogger } from 'src/server/server.logger';

@Injectable()
export class SongDatabaseService {
  private SONG_FIELDS = [
    'song.song_id AS song_id',
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
  private MAX_CACHE_SIZE: number = 500;

  constructor(
    @InjectRepository(SongEntity)
    private songRepository: Repository<SongEntity>,
    @InjectRepository(SongCacheEntity)
    private songCacheRepository: Repository<SongCacheEntity>,
    @InjectRepository(SongMetadataEntity)
    private songMetadataRepository: Repository<SongMetadataEntity>,
    @InjectRepository(SongLikeEntity)
    private songLikeRepository: Repository<SongLikeEntity>,
    private logger: ServerLogger,
  ) {}

  async findBySongId(song_id: string, relations: string[] = []) {
    return await this.songRepository.findOne({
      where: { song_id },
      relations,
    });
  }

  async likeToSong(user: UserEntity, song: SongEntity) {
    const like = await this.songLikeRepository.findOne({
      where: { user: { id: user.id }, song: { song_id: song.song_id } },
    });

    if (like) {
      await this.songLikeRepository.remove(like);
      return false;
    }

    const new_like = this.songLikeRepository.create({
      song_id: song.song_id,
      user,
      song,
    });

    await this.songLikeRepository.save(new_like);

    return true;
  }

  async findRandomSongs(limit: number) {
    const randomSong = await this.songRepository
      .createQueryBuilder('song')
      .orderBy('RANDOM()')
      .limit(limit)
      .getMany();

    return randomSong;
  }

  async saveNewSong(song: TSong): Promise<SongEntity> {
    try {
      const ext_song = await this.songRepository.findOne({
        where: { song_id: song.song_id },
      });

      if (ext_song) return ext_song;

      const newSong = this.songRepository.create(song);

      return await this.songRepository.save(newSong);
    } catch {}
  }

  async setSongCache(song: SongEntity, buffer: Buffer) {
    if (song.cache) return;

    this.cleanOldCachedSongs();
    const cache = this.songCacheRepository.create({
      song_id: song.song_id,
      buffer,
    });

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
      .where('song_id = :song_id', { song_id: song.cache.song_id })
      .execute();
  }

  async incListenCount(songId: string) {
    await this.songRepository.increment(
      { song_id: songId },
      'listened_count',
      1,
    );
  }

  async updateSongMetadata(song: SongEntity, metadata: SongMetadataEntity) {
    const newMetadata = this.songMetadataRepository.create({
      song_id: song.song_id,
      ...metadata,
    });

    await this.songMetadataRepository.save(newMetadata);

    song.metadata = newMetadata;

    await this.songRepository.save(song);
  }
  async findMoreAuidionsSongs(limit: number) {
    const songs = await this.songRepository
      .createQueryBuilder('song')
      .orderBy('listened_count', 'DESC')
      .limit(limit)
      .getMany();

    return songs;
  }

  async findUserLikedSongs(user: UserEntity, limit: number) {
    const songs = await this.songRepository
      .createQueryBuilder('song')
      .leftJoin('song.song_likes', 'like')
      .select(this.SONG_FIELDS)
      .addSelect('COUNT(like.song_id)', 'like_count')
      .where('like.userId = :userId', { userId: user.id })
      .groupBy('song.id')
      .addGroupBy('song.song_id')
      .orderBy('like_count', 'DESC')
      .limit(limit)
      .getRawMany();

    return songs;
  }

  async findTopSongsByLike(limit: number): Promise<SongEntity[]> {
    const songs = await this.songRepository
      .createQueryBuilder('song')
      .leftJoin('song.song_likes', 'like')
      .select(this.SONG_FIELDS)
      .addSelect('COUNT(like.song_id)', 'likes')
      .groupBy('song.id')
      .addGroupBy('song.song_id')
      .orderBy('likes', 'DESC')
      .limit(limit)
      .getRawMany();

    return songs.map((song) => ({ ...song, likes: Number(song.likes) || 0 }));
  }

  private async cleanOldCachedSongs() {
    try {
      const totalCacheSize = await this.songCacheRepository
        .createQueryBuilder('cache')
        .getCount();

      if (totalCacheSize >= this.MAX_CACHE_SIZE) {
        const oldCacheIds = await this.songCacheRepository
          .createQueryBuilder('cache')
          .select('cache.song_id')
          .orderBy('cache.last_accessed', 'ASC')
          .limit(totalCacheSize - this.MAX_CACHE_SIZE)
          .getMany();

        if (oldCacheIds.length > 0) {
          await this.songCacheRepository
            .createQueryBuilder()
            .delete()
            .from(SongCacheEntity)
            .whereInIds(oldCacheIds.map((cache) => cache.song_id))
            .execute();
        }
      }
    } catch (error) {
      this.logger.error(
        'Error while clear old songs caches: ' + (error as Error).message,
      );
    }
  }
}
