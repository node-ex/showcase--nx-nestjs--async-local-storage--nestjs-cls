import { Injectable } from '@nestjs/common';
import { CLS_ID, ClsService } from 'nestjs-cls';
import { IMyClsServiceStore } from './my-cls-service-store.interface';

@Injectable()
export class AppService {
  constructor(private readonly clsService: ClsService<IMyClsServiceStore>) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getData(): any {
    return {
      message: 'Hello from API',
      request: {
        idFromMethod: this.clsService.getId(),
        idFromConstant: this.clsService.get(CLS_ID),
        ipFromInterceptor: this.clsService.get('ip'),
      },
    };
  }
}
