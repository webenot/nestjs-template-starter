import { NotFoundException } from '@nestjs/common';
import type { DeleteResult, InsertManyResult } from 'mongodb';
import type {
  ClientSession,
  Document,
  FilterQuery,
  HydratedDocument,
  InsertManyOptions,
  Model,
  Query,
  QueryWithHelpers,
  Require_id,
  UpdateQuery,
  UpdateWriteOpResult,
} from 'mongoose';

import type { BaseSchema } from './base.schema';
import { SortOrderEnum } from './enums';
import type { IPagination, IPaginationOptions } from './types';
import { paginateDataUtil } from './utils';

type TSortArguments = { [key: string]: SortOrderEnum };

export class BaseService<T extends BaseSchema | Document> {
  protected model: Model<T>;

  protected constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>, session?: ClientSession): Promise<HydratedDocument<T> | undefined> {
    return (await this.model.create([data], { session }))[0];
  }

  async insertMany(data: Partial<T>[], session?: ClientSession): Promise<InsertManyResult<Require_id<Partial<T>>>> {
    const options: InsertManyOptions & { rawResult: true } = { rawResult: true };
    if (session) {
      options.session = session;
    }
    return this.model.insertMany(data, options);
  }

  async findById(id: string, session?: ClientSession): Promise<T | null> {
    const query = this.model.findById(id);
    return this.getSession(query, session).exec();
  }

  async find(filter: FilterQuery<T>, session?: ClientSession): Promise<T[]> {
    const query = this.model.find({ ...filter });
    return this.getSession(query, session).exec();
  }

  async findAndSort(filter: FilterQuery<T>, sortArguments: TSortArguments, session?: ClientSession): Promise<T[]> {
    const query = this.model.find({ ...filter }).sort(sortArguments);
    return this.getSession(query, session).exec();
  }

  async findOne(filter: FilterQuery<T>, session?: ClientSession, populatePaths?: string[]): Promise<T | null> {
    const query = this.model.findOne(filter);
    if (Array.isArray(populatePaths)) {
      populatePaths.forEach((populate) => {
        query.populate(populate);
      });
    }
    return this.getSession(query, session).exec();
  }

  async findOneOrError(filter: FilterQuery<T>, session?: ClientSession, populatePaths?: string[]): Promise<T> {
    const entity = await this.findOne(filter, session, populatePaths);
    if (!entity) {
      throw new NotFoundException('Entity not found');
    }

    return entity;
  }

  async findOneAndSort(
    filter: FilterQuery<T>,
    sortArguments: TSortArguments,
    session?: ClientSession
  ): Promise<T | null> {
    const query = this.model.findOne(filter).sort(sortArguments);
    return this.getSession(query, session).exec();
  }

  async exists(filter: FilterQuery<T>): Promise<boolean> {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const found = await this.model.exists(filter);

    return !!found;
  }

  async count(filter: FilterQuery<T>): Promise<number> {
    return await this.model.countDocuments(filter).exec();
  }

  async getPaginateMany<U = T & Document, M = undefined>(
    filter: FilterQuery<U>,
    sort: TSortArguments,
    paginateOptions: IPaginationOptions,
    populatePaths?: string[],
    cursorMeta?: M
  ): Promise<IPagination<U & Document>> {
    const query = this.model.find<U & Document>({ ...filter }).sort(sort);
    const sortKey = Object.keys(sort)[0] || '';
    return paginateDataUtil(
      query,
      paginateOptions,
      sortKey,
      sort[`${sortKey}`] || SortOrderEnum.asc,
      populatePaths,
      cursorMeta
    );
  }

  async findByIdAndUpdate(
    id: string,
    updateQuery: UpdateQuery<T>,
    session?: ClientSession,
    upsert = false
  ): Promise<QueryWithHelpers<T, T> | null> {
    const query = this.model.findByIdAndUpdate(id, updateQuery, {
      new: true,
      upsert,
    });
    return this.getSession(query, session).exec();
  }

  async findOneAndUpdate(
    filter: FilterQuery<T>,
    updateQuery: UpdateQuery<T>,
    session?: ClientSession,
    upsert = false
  ): Promise<QueryWithHelpers<T, T> | null> {
    const query = this.model.findOneAndUpdate(filter, updateQuery, {
      new: true,
      upsert,
    });
    return this.getSession(query, session).exec();
  }

  async updateOne(
    filter: FilterQuery<T>,
    updateQuery: UpdateQuery<T>,
    session?: ClientSession,
    upsert = false
  ): Promise<UpdateWriteOpResult> {
    const query = this.model.updateOne(filter, updateQuery, { upsert });
    return this.getSession(query, session).exec();
  }

  async updateMany(
    filter: FilterQuery<T>,
    updateQuery: UpdateQuery<T>,
    session?: ClientSession
  ): Promise<UpdateWriteOpResult> {
    const query = this.model.updateMany(filter, updateQuery);
    return this.getSession(query, session).exec();
  }

  async remove(filter: FilterQuery<T>, session?: ClientSession): Promise<QueryWithHelpers<T, T> | null> {
    const query = this.model.findOneAndDelete(filter);
    return this.getSession(query, session).exec();
  }

  async findOneAndDelete(filter: FilterQuery<T>, session?: ClientSession): Promise<HydratedDocument<T> | null> {
    const query = this.model.findOneAndDelete(filter);
    return this.getSession(query, session).exec();
  }

  async deleteMany(filter: FilterQuery<T>, session?: ClientSession): Promise<DeleteResult> {
    const query = this.model.deleteMany(filter);
    return this.getSession(query, session).exec();
  }

  private getSession<T, Y>(
    query: Query<T, HydratedDocument<Y>>,
    session?: ClientSession
  ): Query<T, HydratedDocument<Y>> {
    if (session) return query.session(session);
    return query;
  }
}
