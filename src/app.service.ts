import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getUsers(): string[] {
    return ['app users'];
  }
}
