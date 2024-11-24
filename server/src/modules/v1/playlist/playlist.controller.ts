import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { serverEnv } from 'src/server/server.env';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { CurrentUser } from 'src/decorators/user.decorator';
import { UserEntity } from 'src/database/entities/user/user.entity';
import { CreatePlaylistDto } from './dto/create.playlist.dto';
import { AddPlaylistDto } from './dto/add.playlist.dto';
import { GetPlaylistSongsDto } from './dto/get.playlist.songs.dto';

@Controller(`/api/${serverEnv.sv}/playlist`)
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Get('all')
  getPlaylists() {
    return this.playlistService.getPlaylists();
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  getMyPlaylists(@CurrentUser() user: UserEntity) {
    return this.playlistService.getMyPlaylists(user);
  }

  @Get('songs')
  getPlaylistSongs(
    @CurrentUser() user: UserEntity,
    @Body() body: GetPlaylistSongsDto,
  ) {
    return this.playlistService.getPlaylistSongs(user, body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createPlaylist(
    @CurrentUser() user: UserEntity,
    @Body() body: CreatePlaylistDto,
  ) {
    return this.playlistService.createPlaylist(user, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('add')
  addToPlaylist(@CurrentUser() user: UserEntity, @Body() body: AddPlaylistDto) {
    return this.playlistService.addToPlaylist(user, body);
  }
}
