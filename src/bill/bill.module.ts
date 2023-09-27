import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import configuration from 'src/config/configuration';
import { ConfigModule } from '@nestjs/config';
import { FirstApiModule } from 'src/first-api/first-api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    }),
    FirstApiModule
  ],
  controllers: [BillController],
  providers: [BillService]
})
export class BillModule {}
