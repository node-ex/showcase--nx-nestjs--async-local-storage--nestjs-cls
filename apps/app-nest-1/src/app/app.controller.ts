import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.appService.getData();
  }
}
