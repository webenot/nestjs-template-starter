import type { Document } from 'mongoose';

import { getValueByKey } from '../../../../../modules/utils/object';
import { PaginationCursorDto } from '../dtos';
import type { IPagination } from '../types';

export function buildPaginatedResponseUtil<T extends Document, M>(
  items: T[],
  totalItems: number,
  sortKey: string,
  limit: number,
  cursorMeta?: M
): IPagination<T> {
  const hasNextPage = items.length > limit;
  if (hasNextPage) {
    items.pop();
  }
  const lastElement = items.at(-1);

  return {
    items,
    meta: {
      totalItems: totalItems ?? 0,
      itemCount: items.length,
      cursor: lastElement
        ? PaginationCursorDto.toBase64(
            getValueByKey<string | number | Date>(lastElement, sortKey),
            lastElement?._id.toString(),
            cursorMeta
          )
        : undefined,
      hasNextPage,
    },
  };
}
