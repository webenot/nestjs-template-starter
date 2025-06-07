import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BaseResponseDto } from '../../../utils/dto/base-response.dto';
import { TestApiService } from './test-api.service';

@Controller('test-api')
@ApiTags('Test api')
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
export class TestApiController {
  constructor(private readonly testApiService: TestApiService) {}

  @Get()
  @ApiOperation({ summary: 'Test logger' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: BaseResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong',
  })
  public testLogger(): BaseResponseDto {
    this.testApiService.testLogger();
    return {
      message: 'Testing logger',
    };
  }
}
