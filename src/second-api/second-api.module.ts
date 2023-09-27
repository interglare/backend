import { Module } from '@nestjs/common';
import { SecondApiService } from './second-api.service';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';

@Module({
  imports:[
    ConfigModule.forRoot({
      load: [configuration]
    }),
  ],
  providers: [SecondApiService],
  exports: [SecondApiService],
})
export class SecondApiModule {}
