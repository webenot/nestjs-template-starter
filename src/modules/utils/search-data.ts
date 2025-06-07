import type { Pagination } from 'nestjs-typeorm-paginate';
import type { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

import { OrderEnum } from '~/modules/utils/enums';

import { SEARCH_PRECISION_COEFFICIENT } from './constants';
import type { ISearchOptions } from './types';

export async function searchData<TEntity extends ObjectLiteral>(
  query: SelectQueryBuilder<TEntity>,
  options: ISearchOptions,
  searchFields: (keyof TEntity)[],
): Promise<Pagination<TEntity>> {
  const page = Number(options.page);
  const limit = Number(options.limit);
  const search = options.search;
  const skip = (page - 1) * limit;

  if (search && searchFields.length > 0) {
    const searchPattern = `%${search}%`;
    const searchStartPattern = `${search}%`;

    const conditions = searchFields.map((field, index) => {
      return `(CASE 
                WHEN ${field.toString()} ILIKE :searchStartPattern THEN ${searchFields.length - index + 1}
                WHEN ${field.toString()} ILIKE :searchPattern THEN ${searchFields.length - index}
                WHEN SIMILARITY(${field.toString()}, :searchPattern) > ${SEARCH_PRECISION_COEFFICIENT} 
                  THEN ${searchFields.length - index - 0.5}
                ELSE 0
              END)`;
    });

    const priorityCondition = conditions.join(' + ');

    const searchConditions = searchFields
      .map(
        (field) =>
          `(${field.toString()} ILIKE :searchStartPattern 
        OR ${field.toString()} ILIKE :searchPattern 
        OR SIMILARITY(${field.toString()}, :searchPattern) > ${SEARCH_PRECISION_COEFFICIENT})`,
      )
      .join(' OR ');

    query.andWhere(`(${searchConditions})`, { searchPattern, searchStartPattern });

    query
      .addSelect(`${priorityCondition}`, 'priority')
      .addOrderBy('priority', OrderEnum.DESC)
      .addOrderBy(`${query.alias}.id`, OrderEnum.ASC);
  }

  const items = await query.skip(skip).take(limit).getMany();

  const totalItems = await query.getCount();

  return {
    items,
    meta: {
      totalItems,
      itemCount: items.length,
      itemsPerPage: limit,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
    },
  };
}

export async function searchDataWithoutPagination<TEntity extends ObjectLiteral>(
  query: SelectQueryBuilder<TEntity>,
  options: ISearchOptions,
  searchFields: (keyof TEntity)[],
): Promise<TEntity[]> {
  const search = options.search;

  if (search && searchFields.length > 0) {
    const searchPattern = `%${search}%`;
    const searchStartPattern = `${search}%`;

    const conditions = searchFields.map((field, index) => {
      return `(CASE 
                WHEN ${field.toString()} ILIKE :searchStartPattern THEN ${searchFields.length - index + 1}
                WHEN ${field.toString()} ILIKE :searchPattern THEN ${searchFields.length - index}
                WHEN SIMILARITY(${field.toString()}, :searchPattern) > ${SEARCH_PRECISION_COEFFICIENT} 
                  THEN ${searchFields.length - index - 0.5}
                ELSE 0
              END)`;
    });

    const priorityCondition = conditions.join(' + ');

    const searchConditions = searchFields
      .map(
        (field) =>
          `(${field.toString()} ILIKE :searchStartPattern 
        OR ${field.toString()} ILIKE :searchPattern 
        OR SIMILARITY(${field.toString()}, :searchPattern) > ${SEARCH_PRECISION_COEFFICIENT})`,
      )
      .join(' OR ');

    query.andWhere(`(${searchConditions})`, { searchPattern, searchStartPattern });

    query.addSelect(`${priorityCondition}`, 'priority').addOrderBy('priority', OrderEnum.DESC);
  }

  return await query.getMany();
}
