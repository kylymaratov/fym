import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { IpGuard } from './guards/ip.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('env')
  @UseGuards(IpGuard)
  getBackUpInfo() {
    return this.appService.getServerEnv();
  }
}
