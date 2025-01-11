import { CLS_ID, ClsStore } from 'nestjs-cls';

export interface IMyClsServiceStore extends ClsStore {
  [CLS_ID]: string;
  ip: string | undefined;
}
