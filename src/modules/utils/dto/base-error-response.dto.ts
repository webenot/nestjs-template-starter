import { ApiProperty } from '@nestjs/swagger';

import { ErrorResponseDto } from './error-response.dto';

export class BaseErrorResponseDto {
  @ApiProperty({
    type: ErrorResponseDto,
    description: 'Response error',
  })
  error: ErrorResponseDto;
}
