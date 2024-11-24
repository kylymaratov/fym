import { Inject, Injectable } from '@nestjs/common';
import { PlaylistDatabaseService } from './services/database.service';
import { UserEntity } from 'src/database/entities/user/user.entity';
import { CreatePlaylistDto } from './dto/create.playlist.dto';
import { AddPlaylistDto } from './dto/add.playlist.dto';
import { GetPlaylistSongsDto } from './dto/get.playlist.songs.dto';

@Injectable()
export class PlaylistService {
  constructor(
    @Inject() private playlistDatabaseService: PlaylistDatabaseService,
  ) {}
  async getPlaylists() {
    const playlists = await this.playlistDatabaseService.findPlaylists();

    return playlists;
  }

  async createPlaylist(user: UserEntity, body: CreatePlaylistDto) {
    await this.playlistDatabaseService.createPlaylist(user, body);

    return { message: 'Created' };
  }

  async addToPlaylist(user: UserEntity, body: AddPlaylistDto) {
    await this.playlistDatabaseService.addToPlaylist(user, body);

    return { message: 'added' };
  }

  async getPlaylistSongs(user: UserEntity, body: GetPlaylistSongsDto) {
    const playlist = await this.playlistDatabaseService.findPlaylistSongs(
      user,
      body,
    );

    return { title: playlist.name, songs: playlist.songs };
  }

  async getMyPlaylists(user: UserEntity) {
    const playlists = await this.playlistDatabaseService.findMyPlaylists(user);

    return playlists;
  }
}
