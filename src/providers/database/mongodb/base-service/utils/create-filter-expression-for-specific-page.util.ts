// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { FilterQuery, Schema } from 'mongoose';

import { SortOrderEnum } from '../enums';
import ObjectId = Schema.Types.ObjectId;

export function createFilterExpressionForSpecificPageUtil<T>(
  cursorNextPage: unknown,
  lastId: string,
  sortKey: string,
  sortOrder: SortOrderEnum
): FilterQuery<T> {
  const op = sortOrder === SortOrderEnum.desc ? '$lt' : '$gt';
  return {
    $expr: {
      $or: [
        { [op]: [`$${sortKey}`, cursorNextPage] },
        {
          $and: [{ $eq: [`$${sortKey}`, cursorNextPage] }, { $lt: ['$_id', new ObjectId(lastId)] }],
        },
      ],
    },
  };
}
