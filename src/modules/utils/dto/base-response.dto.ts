import { ApiProperty } from '@nestjs/swagger';

export class BaseResponseDto {
  @ApiProperty({
    type: 'string',
    description: 'Result message',
    example: 'Operation success',
  })
  message: string;
}
