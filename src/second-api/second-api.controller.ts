import { Controller } from '@nestjs/common';
import { SecondApiService } from './second-api.service';

@Controller()
export class SecondApiController {
  constructor(private readonly secondApiService: SecondApiService) {}
}
