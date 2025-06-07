import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { Pagination } from '../classes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ApiPaginatedResponse = <TModel extends Type<any>>(model: TModel): any => {
  return applyDecorators(
    ApiExtraModels(Pagination),
    ApiOkResponse({
      description: 'Successfully received list',
      schema: {
        allOf: [
          { $ref: getSchemaPath(Pagination) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};
