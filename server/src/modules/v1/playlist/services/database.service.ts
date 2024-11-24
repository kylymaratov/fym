import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaylistEntity } from 'src/database/entities/playlist/playlist.entity';
import { UserEntity } from 'src/database/entities/user/user.entity';
import { Repository } from 'typeorm';
import { CreatePlaylistDto } from '../dto/create.playlist.dto';
import { AddPlaylistDto } from '../dto/add.playlist.dto';
import { SongEntity } from 'src/database/entities/song/song.entity';
import { GetPlaylistSongsDto } from '../dto/get.playlist.songs.dto';

@Injectable()
export class PlaylistDatabaseService {
  constructor(
    @InjectRepository(PlaylistEntity)
    private playlistRepository: Repository<PlaylistEntity>,
    @InjectRepository(SongEntity)
    private songRepository: Repository<SongEntity>,
  ) {}

  async findPlaylists() {
    const playlists = await this.playlistRepository
      .createQueryBuilder('playlist')
      .leftJoinAndSelect('playlist.playlist_likes', 'like')
      .leftJoinAndSelect('playlist.user', 'user')
      .where('playlist.is_private = :isPrivate', { isPrivate: false })
      .loadRelationCountAndMap('playlist.likesCount', 'playlist.playlist_likes')
      .getMany();

    return playlists.map((item) => ({
      ...item,
      playlist_likes: Number(item.playlist_likes) || 0,
      user: item.user?.user_sub_id || null,
    }));
  }

  async findMyPlaylists(user: UserEntity) {
    const playlists = await this.playlistRepository.find({
      where: { user: { id: user.id } },
    });

    return playlists;
  }

  async createPlaylist(user: UserEntity, body: CreatePlaylistDto) {
    const ext_playlist_name = await this.playlistRepository.findOne({
      where: { name: body.name },
    });

    if (ext_playlist_name)
      throw new BadRequestException('Playlist with name exists');

    const playlist = this.playlistRepository.create({
      user,
      name: body.name,
      is_private: body.is_private,
    });

    const savedPlaylist = await this.playlistRepository.save(playlist);

    return savedPlaylist;
  }

  async addToPlaylist(user: UserEntity, body: AddPlaylistDto) {
    const playlist = await this.playlistRepository.findOne({
      where: { playlist_id: body.playlist_id },
      relations: ['songs', 'user'],
    });

    if (!playlist) {
      throw new BadRequestException('Playlist not found');
    }

    if (playlist.user.id !== user.id) {
      throw new BadRequestException(
        'You are not authorized to add songs to this playlist',
      );
    }

    for (let song_id of body.songs) {
      const song = await this.songRepository.findOne({ where: { song_id } });

      if (!song) continue;

      playlist.songs.push(song);

      await this.playlistRepository.save(playlist);
    }

    return playlist;
  }

  async findPlaylistSongs(user: UserEntity, body: GetPlaylistSongsDto) {
    const playlist = await this.playlistRepository.findOne({
      where: { playlist_id: body.playlist_id },
      relations: ['songs', 'user'],
    });

    if (playlist.is_private && user?.id !== playlist.user?.id)
      throw new BadRequestException('Is private playlist');

    return playlist;
  }
}
