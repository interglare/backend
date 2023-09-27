import { Controller, Post, Body, } from '@nestjs/common';
import { BillService } from './bill.service';
import { CreateBillDto } from './dto/create-bill.dto';

@Controller('bill')
export class BillController {
  constructor(
    private readonly billService: BillService, 
    ) {}

  @Post()
  create(@Body() createBillDto: CreateBillDto) {    
    return this.billService.generatePdf(createBillDto);
  }
}
