import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
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

@ApiTags('song')
@Controller(`/api/${serverEnv.sv}/song`)
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Get('listen')
  @HttpCode(206)
  async listen(
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
  searchSong(@Body() body: SearchSongsDto) {
    return this.songService.search(body);
  }
}
