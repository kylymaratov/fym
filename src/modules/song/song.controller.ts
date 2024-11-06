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
import { ApiAuthGuard } from 'src/guards/api.auth.guard';
import { ListenSongDto } from './dto/listen.dto';
import { Request, Response } from 'express';
import { Readable } from 'stream';
import { SearchSongsDto } from './dto/search.dto';
import { CurrentUser } from 'src/decorators/user.decorator';
import { UserEntity } from 'src/database/entities/user/user.entity';
import { LikeSongDto } from './dto/like.dto';

@ApiTags('song')
@Controller(`/api/${serverEnv.sv}/song`)
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Get('top')
  getTopSongs() {
    return this.songService.getTopSongs();
  }

  @Get('token')
  getTempToken(@CurrentUser() user: UserEntity) {
    return this.songService.getTempToken(user);
  }

  @UseGuards(ApiAuthGuard)
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

    res.setHeader('Content-Type', contentType);

    if (!req.headers['range']) {
      res.setHeader('Content-Length', contentLength);
      return Readable.from(buffer).pipe(res);
    }

    const range = req.headers['range'].replace(/bytes=/, '').split('-');
    const start = parseInt(range[0], 10);
    const end = range[1] ? parseInt(range[1], 10) : contentLength - 1;

    res.setHeader('Content-Length', start - end);
    res.setHeader('Content-Range', `bytes ${start}-${end}/${contentLength}`);
    res.setHeader('Accept-Ranges', 'bytes');

    return Readable.from(buffer.slice(start, end + 1)).pipe(res);
  }
  @Post('search')
  @HttpCode(200)
  searchSongs(@Body() body: SearchSongsDto) {
    return this.songService.search(body);
  }

  @Put('like')
  @UseGuards(ApiAuthGuard)
  @HttpCode(200)
  likeSong(@CurrentUser() user: UserEntity, @Query() query: LikeSongDto) {
    const { songId } = query;
    return this.songService.like(user, songId);
  }
}
