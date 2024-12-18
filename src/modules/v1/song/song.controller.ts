import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { serverEnv } from 'src/server/server.env';
import { SongService } from './song.service';
import { ListenSongDto } from './dto/listen.dto';
import { Request, Response } from 'express';
import { Readable } from 'stream';
import { SearchSongsDto } from './dto/search.dto';
import { CurrentUser } from 'src/decorators/user.decorator';
import { UserEntity } from 'src/database/entities/user/user.entity';
import { LikeSongDto } from './dto/like.dto';
import { GetSongDto } from './dto/getsong.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';

@ApiTags('song')
@Controller(`/api/${serverEnv.sv}/song`)
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Get('/')
  @HttpCode(200)
  getSongById(@Query() query: GetSongDto) {
    return this.songService.getSongById(query);
  }

  @Get('more-auditions')
  @HttpCode(200)
  getMoreAuidionsSongs(@Query() query: { limit: number }) {
    return this.songService.getMoreAuidionsSongs(query.limit);
  }

  @Get('related')
  @HttpCode(200)
  getRelatedSongs(@Query() query: { song_id: string }) {
    return this.songService.getRelatedSongs(query.song_id);
  }

  @Get('random')
  @HttpCode(200)
  getRandomSongs(@Query() query: { limit: number }) {
    return this.songService.getRandomSongs(query.limit);
  }

  @Get('top-by-likes')
  @HttpCode(200)
  getTopSongsByLike(@Query() query: { limit: number }) {
    return this.songService.getTopSongsByLike(query.limit);
  }

  @Get('recently')
  @HttpCode(200)
  getRecentlySongs(@Req() req: Request, @Query() query: { limit: number }) {
    return this.songService.getRecentlySongs(
      req.session.recently_plays || [],
      query.limit,
    );
  }

  @Get('liked')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  getLikedSongs(
    @CurrentUser() user: UserEntity,
    @Query() query: { limit: number },
  ) {
    return this.songService.getLikedSongs(user, query.limit);
  }

  @Get('recommendations')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  getRecomendSongs(@CurrentUser() user: UserEntity) {
    return this.songService.getRecomendSongs(user);
  }

  @Get('listen')
  @HttpCode(206)
  async listenSong(
    @Query() query: ListenSongDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const { buffer, metadata } = await this.songService.listen(query);
    const contentLength = metadata.file_size;
    const contentType = metadata.mime_type;

    let start = 0;
    let end = contentLength - 1;

    if (req.headers['range']) {
      const range = req.headers['range'].replace(/bytes=/, '').split('-');
      start = parseInt(range[0], 10);
      end =
        range[1] && parseInt(range[1], 10) < contentLength
          ? parseInt(range[1], 10)
          : end;
    }

    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', end - start + 1);
    res.setHeader('Content-Range', `bytes ${start}-${end}/${contentLength}`);

    Readable.from(buffer.slice(start, end + 1)).pipe(res);

    if (start === 0) {
      this.songService.icnListenCount(query.song_id);
      this.songService.addRecentlyPlays(req, query.song_id);
    }
  }

  @Post('search')
  @HttpCode(200)
  searchSongs(@Body() body: SearchSongsDto) {
    return this.songService.search(body);
  }

  @Put('like')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  likeToSong(@CurrentUser() user: UserEntity, @Query() query: LikeSongDto) {
    const { song_id } = query;
    return this.songService.likeToSong(user, song_id);
  }
}
