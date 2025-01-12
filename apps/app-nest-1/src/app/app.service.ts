import { Injectable, Logger } from '@nestjs/common';
import { CLS_ID, UseCls } from 'nestjs-cls';
import { Cron, CronExpression } from '@nestjs/schedule';
import { v4 as uuid } from 'uuid';
import { CustomClsServiceProvider } from './custom-cls-service.provider';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly clsService: CustomClsServiceProvider) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  @UseCls({
    generateId: true,
    idGenerator: () => uuid(),
    setup(cls) {
      const clsService = cls as CustomClsServiceProvider;
      clsService.set('mode', 'cron');
    },
  })
  printData() {
    const data = JSON.stringify(this.getData(), null, 2);

    this.logger.log(data);

    return Promise.resolve();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getData(): any {
    const ip = this.clsService.get('ip');

    return {
      mode: this.clsService.get('mode'),
      correlationId: {
        fromMethod: this.clsService.getId(),
        fromConstant: this.clsService.get(CLS_ID),
      },
      ...(ip ? { ipFromInterceptor: ip } : {}),
    };
  }
}
