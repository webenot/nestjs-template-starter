import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { PaginationParametersRequestDto } from './pagination-parameters-request.dto';

export class SearchParametersRequestDTO extends PaginationParametersRequestDto {
  @ApiPropertyOptional({
    description: 'The search query',
  })
  @IsOptional()
  @IsString()
  search?: string;
}
