import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { IpGuard } from './guards/ip.guard';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('env')
  @UseGuards(IpGuard)
  @ApiExcludeEndpoint()
  getBackUpInfo() {
    return this.appService.getServerEnv();
  }
}
