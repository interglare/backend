import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

interface ISaveFile {
    created: string;
    deleted: string | null;
    id: string;
    isDeleted: boolean;
    name: string;
    size: number;
    type: string;
    updated: string | null;
    isImage?: boolean;
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
    roles: []
}

@Injectable()
export class FirstApiService {
    
  constructor(
    private readonly configService: ConfigService<IEnvironmentVariables>,) { }

    async saveFile(files: FormData): Promise<ISaveFile> { 
        const { token } = await this.login();
        const { data } = await axios.post(`${this.configService.get('BASE_URL')}/api/file`, files, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        })
        return await data;
    }

    private async login(payload?: {login: string, password: string}): Promise<ILoginResponse> {

        let loginPayload = payload ?? {
          login: this.configService.get('UPLOAD_LOGIN'),
          password: this.configService.get('UPLOAD_PASSWORD')
        };

        const { data } = await axios.post(`${this.configService.get('BASE_URL')}/api/user/login`, loginPayload, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        return await data;
    }
}
