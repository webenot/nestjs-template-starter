import type { Pagination } from 'nestjs-typeorm-paginate';

import type { IPaginateItemsOptions } from '~/modules/utils/types';

export function paginateItems<T>(items: T[], { page, limit, totalItems }: IPaginateItemsOptions): Pagination<T> {
  return {
    items,
    meta: {
      itemCount: items.length,
      itemsPerPage: limit,
      totalItems,
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
    },
  };
}
