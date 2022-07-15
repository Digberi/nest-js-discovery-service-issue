import { Injectable } from '@nestjs/common';
import { OnTezosBlock } from '@nestjs/quipuswap';

@Injectable()
export class AppService {

  @OnTezosBlock()
  getHello(): void {
    console.log('Hello World!');
  }
}
