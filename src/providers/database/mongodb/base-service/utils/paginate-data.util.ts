import type { Document, Query } from 'mongoose';

import { PAGINATION_DEFAULT_LIMIT } from '~/modules/utils/constants';

import { PaginationCursorDto } from '../dtos';
import { SortOrderEnum } from '../enums';
import type { IPagination, IPaginationOptions } from '../types';
import { buildPaginatedResponseUtil } from './build-paginated-response.util';
import { createFilterExpressionForSpecificPageUtil } from './create-filter-expression-for-specific-page.util';

export async function paginateDataUtil<TEntity, M>(
  query: Query<(TEntity & Document)[], TEntity & Document>,
  options: IPaginationOptions,
  sortKey: string,
  sortOrder: SortOrderEnum,
  populatePaths?: string[],
  cursorMeta?: M
): Promise<IPagination<TEntity & Document>> {
  const limit = options.limit ?? PAGINATION_DEFAULT_LIMIT;
  const cloneQuery = query.clone();
  if (options.cursor) {
    const cursorDto = PaginationCursorDto.fromBase64(options.cursor);
    query.find(createFilterExpressionForSpecificPageUtil(cursorDto.getValue(), cursorDto.lastId, sortKey, sortOrder));
  }

  const request = query
    .sort({
      _id: SortOrderEnum.desc,
    })
    .limit(limit + 1);

  if (Array.isArray(populatePaths)) {
    populatePaths.forEach((populate) => {
      request.populate(populate);
    });
  }

  const items = await request.exec();
  const totalItems = await cloneQuery.countDocuments();

  return buildPaginatedResponseUtil(items, totalItems, sortKey, limit, cursorMeta);
}
