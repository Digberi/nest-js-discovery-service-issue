import { Module } from '@nestjs/common';
import { TaquitoModule } from '@nestjs/quipuswap';
import { AppService } from './app.service';

const taquitoFactory = {
  useFactory: (configsService) => "https://mainnet-node.madfish.solutions",
};

@Module({
  imports: [
    TaquitoModule.forRoot(taquitoFactory),
  ],
  providers: [AppService],
})
export class AppModule {}
