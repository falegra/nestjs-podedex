import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Response } from 'express';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  executeSeed(@Res() res: Response) {
    return this.seedService.executeSeed(res);
  }

}
