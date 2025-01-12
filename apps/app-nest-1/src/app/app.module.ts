import { Module } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ClsModule, ClsService } from 'nestjs-cls';
import { RequestIpInterceptor } from './request-ip.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import type { Request } from 'express';
import { ScheduleModule } from '@nestjs/schedule';
import { CustomClsServiceProvider } from './custom-cls-service.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      // No need to import in other modules
      isGlobal: true,
      expandVariables: true,
      // cache: true,
    }),
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        generateId: true,
        idGenerator(request: Request) {
          let requestIdHeader = request.headers['x-request-id'];
          if (Array.isArray(requestIdHeader)) {
            requestIdHeader = requestIdHeader[0];
          }
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          return requestIdHeader || uuid();
        },
        setup(cls) {
          const clsService = cls as CustomClsServiceProvider;
          clsService.set('mode', 'http');
        },
      },
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: CustomClsServiceProvider,
      useExisting: ClsService,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestIpInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
