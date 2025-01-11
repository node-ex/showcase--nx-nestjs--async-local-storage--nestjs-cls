import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Observable } from 'rxjs';
import type { Request } from 'express';
import { IMyClsServiceStore } from './my-cls-service-store.interface';

@Injectable()
export class RequestIpInterceptor implements NestInterceptor {
  constructor(private readonly clsService: ClsService<IMyClsServiceStore>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const ip = request.socket.remoteAddress;

    this.clsService.set('ip', ip);

    return next.handle();
  }
}
