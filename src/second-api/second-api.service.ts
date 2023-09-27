import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

interface ISaveFile {
    response: {
      id: string,
      filename: string,
      virtualPath: string,
      physicalPath: string | null,
      bytes: string,
      backet: string,
      dateCreated: string,
      originalFileName: string,
    },
    success: true,
    message: "",
    validationResult: {
    },
}
interface ILoginResponse {
    token: string,
    user: {
        lastName: string,
        firstName: string,
        middleName: null | string,
        idn: null,
        phoneNumber: string,
        fullName: string,
        email: string,
        roleId: number,
        roleName: string,
        isCompanyDisplayed: boolean,
        isAgreeWithPrivacyPolicy: boolean,
        id: string,
        created: string,
        updated: string,
        deleted: null,
        isDeleted: boolean
    },
}

@Injectable()
export class SecondApiService {

    constructor(
        private readonly configService: ConfigService<IEnvironmentVariables>,) { }

    async saveFile(files: FormData): Promise<ISaveFile> {
        const { token } = await this.login();
        try {
            const { data } = await axios.post(
                `${this.configService.get('SECOND_API')}/api/minio/SaveFile`, 
                files, 
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
    
            return await data;
        } catch (error) {
            throw new HttpException({
              status: error.response.status,
              error: error,
            }, error.response.status, {
              cause: 'saveFileSecondApi'
            });
        }
    }

    private async login(payload?: { login: string, password: string }): Promise<ILoginResponse> {

        let loginPayload = payload ?? {
            login: this.configService.get('UPLOAD_LOGIN'),
            password: this.configService.get('UPLOAD_PASSWORD')
        };
        try {
            const { data } = await axios.post(
                `${this.configService.get('SECOND_API')}/api/user/login`, 
                loginPayload, {
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                }
            )
            
            return await data;
        } catch (error) {
            throw new HttpException({
              status: error.response.status,
              error: error,
            }, error.response.status, {
              cause: 'loginSecondApi'
            });
        }
    }
}
