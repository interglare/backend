import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { ConverterModule } from 'src/converter/converter.module';
import { SecondApiModule } from 'src/second-api/second-api.module';

@Module({
  imports: [ConverterModule, SecondApiModule],
  controllers: [ContractController],
  providers: [ContractService]
})
export class ContractModule {}
