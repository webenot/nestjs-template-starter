import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class PaginationParametersRequestDto {
  @ApiPropertyOptional({
    description: 'The amount of items to be requested per page',
    default: 10,
  })
  @IsOptional()
  @IsNumberString()
  limit?: number;

  @ApiPropertyOptional({
    description: 'The page that is requested',
    default: 1,
  })
  @IsOptional()
  @IsNumberString()
  page?: number;
}
