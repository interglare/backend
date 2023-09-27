import { Module } from '@nestjs/common';
import { FirstApiService } from './first-api.service';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';

@Module({
  imports:[
    ConfigModule.forRoot({
      load: [configuration]
    }),
  ],
  providers: [FirstApiService],
  exports: [FirstApiService]
})
export class FirstApiModule {}
