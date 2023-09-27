import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class ConverterService {

    constructor(
        private readonly configService: ConfigService<IEnvironmentVariables>,) { }
        
    async convertWordToPdf(wordFile) {
        
        const formData = new FormData();
        formData.append('file', wordFile, `${new Date().toISOString().replaceAll(':', '_')}.docx`);
        try {
            return await axios.post(
                `${this.configService.get('CONVERTER_URL')}/api/Document/ConvertFile`, 
                formData, 
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    responseType: 'arraybuffer',
                },
            );
        } catch (error) {
            throw new HttpException({
              status: error.response.status,
              error: error,
            }, error.response.status, {
              cause: 'convertWordToPdf'
            });
        }
    }
}
