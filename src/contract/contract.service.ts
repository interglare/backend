import { HttpException, Injectable } from '@nestjs/common';
import { ConverterService } from 'src/converter/converter.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { convert as numberToWordsRu } from 'number-to-words-ru';
import { SecondApiService } from 'src/second-api/second-api.service';

@Injectable()
export class ContractService {
  constructor(
    private readonly converterService: ConverterService,
    private readonly secondApiService: SecondApiService,
  ) {}
  async createContract(createContractDto: CreateContractDto) {
    const getNumberWords = (price: number) => {
        return numberToWordsRu(price, {
            currency: {
                currencyNameCases: [
                    "тенге",
                    "тенге",
                    "тенге"
                ],
                currencyNameDeclensions: {
                    nominative: [
                        "тенге",
                        ""
                    ],
                    genitive: [
                        "тенге",
                        "тенге"
                    ],
                    dative: [
                        "тенге",
                        "тенге"
                    ],
                    accusative: [
                        "тенге",
                        ""
                    ],
                    instrumental: [
                        "тенге",
                        "тенге"
                    ],
                    prepositional: [
                        "тенге",
                        "тенге"
                    ]
                },
                fractionalPartNameCases: [
                    "тиын",
                    "тиын",
                    "тиын"
                ],
                fractionalPartNameDeclensions: {
                    nominative: [
                        "тиын",
                        ""
                    ],
                    genitive: [
                        "тиын",
                        "тиын"
                    ],
                    dative: [
                        "тиын",
                        "тиын"
                    ],
                    accusative: [
                        "тиын",
                        ""
                    ],
                    instrumental: [
                        "тиын",
                        "тиын"
                    ],
                    prepositional: [
                        "тиын",
                        "тиын"
                    ]
                },
                currencyNounGender: {
                    integer: 0,
                    fractionalPart: 0
                },
                fractionalPartMinLength: 2
            }
        })
    }
    const PizZip = require('pizzip');
    const Docxtemplater = require('docxtemplater');

    const fs = require('fs');
    const path = require('path');

    // Load the docx file as binary content
    const content = fs.readFileSync(
      path.resolve(__dirname, '..', '..', 'src', 'templates', 'smart.docx'),
      'binary',
    );

    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
    let createContract: any = createContractDto

    Object.keys(createContract).reduce((acc, k) => {
        acc[k.toLowerCase()] = createContract[k];
        return acc;
      }, createContract);
    createContract.sum = `${createContract.sum.toLocaleString().replaceAll('.', ' ').replaceAll(',', ' ')} (${getNumberWords(createContract.sum)})`
    doc.render(createContract);

    const blobWord = doc.getZip().generate({
      type: 'blob',
      compression: 'DEFLATE',
    });
    let response = await this.converterService.convertWordToPdf(blobWord);

    const formData = new FormData();
    formData.append(
        'file',
        new Blob(
            [await response.data], 
            { type: 'application/pdf', },
        ),
        'Договор об оказании услуг.pdf'
    );
    try {
        const res = await this.secondApiService.saveFile(formData);
        return { id: res.response.id };
    } catch (error) {
        throw new HttpException({
            status: error.response.status,
            error: error,
        }, error.response.status, {
            cause: 'saveFile'
        });
    }
  }
}
