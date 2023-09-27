import { Module } from '@nestjs/common';
import { ConverterService } from './converter.service';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';

@Module({
  imports:[
    ConfigModule.forRoot({
      load: [configuration]
    }),
  ],
  providers: [ConverterService],
  exports: [ConverterService],
})
export class ConverterModule {}
