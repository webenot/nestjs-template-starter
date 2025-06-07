import { ApiProperty } from '@nestjs/swagger';

export class GetBaseEntityResponseDto {
  @ApiProperty({
    type: 'string',
    description: 'Entity uuid',
    example: '473ec52e-fe53-42f5-97ca-1042c945f866',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    description: 'Datetime of creating entity',
    example: '2022-02-13T19:26:50.514Z',
  })
  createdAt: string;

  @ApiProperty({
    type: 'string',
    description: 'Last updated entity datetime',
    example: '2022-02-13T19:28:00.5000Z',
  })
  updatedAt: string;
}
