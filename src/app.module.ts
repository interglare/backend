import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirstApiModule } from './first-api/first-api.module';
import { BillModule } from './bill/bill.module';
import { ConverterModule } from './converter/converter.module';
import { ContractModule } from './contract/contract.module';
import { SecondApiModule } from './second-api/second-api.module';

@Module({
  imports: [
    BillModule,
    FirstApiModule,
    ConverterModule,
    ContractModule,
    SecondApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
