import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ErrorResponseDto implements Error {
  @ApiProperty({
    type: 'string',
    description: 'Error name',
    example: 'ENOTFOUND',
  })
  name: string;

  @ApiProperty({
    type: 'string',
    description: 'Error message',
    example: 'Source not found',
  })
  message: string;

  @ApiPropertyOptional({
    type: 'string',
    description: 'Error stack trace',
  })
  stack?: string;
}
