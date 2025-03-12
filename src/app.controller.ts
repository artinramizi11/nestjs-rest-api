import { Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  getHello(@Req() req) {
  return req.user
  }
}
