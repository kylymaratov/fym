import {
  Body,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { serverEnv } from 'src/server/server.env';
import { LocalAuthGuard } from './guards/local.auth.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ApiAuthGuard } from 'src/guards/api.auth.guard';

@ApiTags('auth')
@Controller(`/api/${serverEnv.sv}/auth`)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(ApiAuthGuard)
  @HttpCode(200)
  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout((err) => {
      if (err) throw new InternalServerErrorException();

      req.session.destroy(() => {
        res.clearCookie('connect.sid');
        return res.status(200).json({
          message: 'OK',
        });
      });
    });
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  @ApiBody({ type: [LoginDto] })
  login(@Req() req: Request) {
    return req.user;
  }

  @ApiBody({ type: [RegisterDto] })
  @Post('register')
  @HttpCode(201)
  createUser(@Body() body: RegisterDto) {
    return this.authService.createUser(body);
  }
}
