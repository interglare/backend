import * as React from 'react';
import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { FirstApiService } from 'src/first-api/first-api.service';
import { renderToBuffer } from '@react-pdf/renderer';
import MyDocument from 'src/components/MyDocument';


@Injectable()
export class BillService {
  constructor(
    private readonly firstApiService: FirstApiService) { }

  async generatePdf(createBillDto: CreateBillDto) {
    const value = await renderToBuffer(<MyDocument data={createBillDto} />);

    let blob = new Blob([value]);
    blob = blob.slice(0, blob.size, "application/pdf")

    const formData = new FormData();
    formData.append('files', blob, `Счет на оплату № ${createBillDto.number} от ${new Date().toLocaleDateString('ru-RU', { year: 'numeric', month: 'numeric', day: 'numeric' })}.pdf`);

    const response = await this.firstApiService.saveFile(formData);

    return { id: response[0].id };
  }
}
