import {
  DeleteResult,
  EntityManager,
  EntityTarget,
  type FindManyOptions,
  FindOneOptions,
  type FindOptionsOrder,
  type FindOptionsRelations,
  FindOptionsWhere,
  In,
  ObjectLiteral,
  Repository,
  type SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { ON_CONFLICT_DO_NOTHING } from '~/modules/utils/constants';
import { isQueryFailedError } from '~/modules/utils/is-query-failed-error';
import { DatabaseErrorCodesEnum } from '~/providers/database/postgresql/enums';

import { CreateRecordErrors, FindOneErrors, QueryFailedError, UpdateError } from './errors';
import type { FindOptions, IInsertResult, IOnConflictRequest } from './types';

export class BaseService<Entity extends ObjectLiteral> {
  protected entity: EntityTarget<Entity>;
  protected repository: Repository<Entity>;

  constructor(entity: EntityTarget<Entity>, repository: Repository<Entity>) {
    this.entity = entity;
    this.repository = repository;
  }

  public async create(data: QueryDeepPartialEntity<Entity>, entityManager?: EntityManager): Promise<Entity> {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const entity = new this.entity(data);
      const newEntity = await this.getRepository(entityManager).insert(entity);
      return newEntity.raw[0] as Entity;
    } catch (error) {
      if (isQueryFailedError(error) && error.code === DatabaseErrorCodesEnum.UNIQUE_VIOLATION) {
        throw new CreateRecordErrors.CreateConflictError(data, error);
      }
      if (isQueryFailedError(error)) {
        throw new QueryFailedError(data, undefined, error);
      }

      throw error;
    }
  }

  public async findByID(
    id: string,
    options?: Parameters<this['findOne']>[1],
    entityManager?: EntityManager,
  ): Promise<Entity | null> {
    return await this.findOne({ id } as unknown as FindOptionsWhere<Entity>, options, entityManager);
  }

  public async findOne(
    criteria: FindOptionsWhere<Entity>,
    options: FindOptions<Entity> = {},
    entityManager?: EntityManager,
  ): Promise<never | Entity | null> {
    const findOneOptions: FindOneOptions<Entity> = { where: criteria };

    if (options.lock !== undefined) {
      findOneOptions.lock = options.lock;
    }

    try {
      return await this.getRepository(entityManager).findOne(
        this.addRelationsIfProvided(findOneOptions, options.relations),
      );
    } catch (error) {
      if (isQueryFailedError(error) && error.code === DatabaseErrorCodesEnum.LOCK_NOT_AVAILABLE) {
        throw new FindOneErrors.CannotObtainLockError(criteria, options, error);
      }

      if (isQueryFailedError(error)) {
        throw new QueryFailedError(criteria, options, error);
      }

      throw error;
    }
  }

  public async find(filters: FindOptionsWhere<Entity>, entityManager?: EntityManager): Promise<Entity[]> {
    const repository = this.getRepository(entityManager);
    try {
      return await repository.find({ where: filters });
    } catch (error) {
      if (isQueryFailedError(error)) {
        throw new QueryFailedError(filters, undefined, error);
      }

      throw error;
    }
  }

  public async findManyByIds(ids: Array<string>, entityManager?: EntityManager): Promise<Entity[]> {
    if (ids.length === 0) return [];

    const repository = this.getRepository(entityManager);
    try {
      return await repository.find({
        // Known typeorm issue https://github.com/typeorm/typeorm/issues/8939
        // typeorm@0.3.20 still did not fixed
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        where: {
          id: In(ids),
        },
      });
    } catch (error) {
      if (isQueryFailedError(error)) {
        throw new QueryFailedError(ids, undefined, error);
      }

      throw error;
    }
  }

  public async update(
    id: string | string[] | FindOptionsWhere<Entity>,
    data: QueryDeepPartialEntity<Entity>,
    entityManager?: EntityManager,
  ): Promise<UpdateResult> {
    const repository = this.getRepository(entityManager);
    try {
      return await repository.update(id, data);
    } catch (error) {
      if (isQueryFailedError(error) && error.code === DatabaseErrorCodesEnum.UNIQUE_VIOLATION) {
        throw new UpdateError<Entity>(id, data, error);
      }

      if (isQueryFailedError(error)) {
        throw new QueryFailedError(id, data, error);
      }

      throw error;
    }
  }

  public async delete(id: string | FindOptionsWhere<Entity>, entityManager?: EntityManager): Promise<DeleteResult> {
    const repository = this.getRepository(entityManager);
    try {
      return await repository.delete(id);
    } catch (error) {
      if (isQueryFailedError(error)) {
        throw new QueryFailedError(id, undefined, error);
      }

      throw error;
    }
  }

  public async softDelete(id: string | FindOptionsWhere<Entity>, entityManager?: EntityManager): Promise<UpdateResult> {
    const repository = this.getRepository(entityManager);
    try {
      return await repository.softDelete(id);
    } catch (error) {
      if (isQueryFailedError(error)) {
        throw new QueryFailedError(id, undefined, error);
      }

      throw error;
    }
  }

  public async updateManyToManyRelations(
    id: string,
    relations: FindOptionsRelations<Entity>,
    relationName: keyof Entity,
    entityTarget: EntityTarget<Entity>,
    entityManager?: EntityManager,
  ): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const entity = await this.findOne({ id }, { relations: { [relationName]: true } }, entityManager);
    if (!entity) return;

    try {
      await this.getRepository(entityManager)
        .createQueryBuilder()
        .relation(entityTarget, relationName as string)
        .of(id)
        // eslint-disable-next-line security/detect-object-injection
        .addAndRemove(relations, entity[relationName]);
    } catch (error) {
      if (isQueryFailedError(error)) {
        throw new QueryFailedError(id, undefined, error);
      }

      throw error;
    }
  }

  public async upsert(
    data: QueryDeepPartialEntity<Entity> | QueryDeepPartialEntity<Entity>[],
    onConflict: string | string[] | IOnConflictRequest = ON_CONFLICT_DO_NOTHING,
    entityManager?: EntityManager,
    returning: string | string[] = [],
  ): Promise<IInsertResult<Entity>> {
    const query = this.getRepository(entityManager).createQueryBuilder().insert().values(data);

    if (onConflict === ON_CONFLICT_DO_NOTHING) {
      query.orIgnore();
    } else if (Array.isArray(onConflict)) {
      query.orUpdate(onConflict);
    } else if (typeof onConflict === 'object') {
      query.orUpdate(onConflict.overwrite, onConflict.conflictTarget, onConflict.orUpdateOptions);
    }

    try {
      return await query.returning(returning).execute();
    } catch (error) {
      if (isQueryFailedError(error)) {
        throw new QueryFailedError(data, onConflict, error);
      }

      throw error;
    }
  }

  public async count(criteria: FindOptionsWhere<Entity>, entityManager?: EntityManager): Promise<number> {
    try {
      return this.getRepository(entityManager).count({ where: criteria });
    } catch (error) {
      if (isQueryFailedError(error)) {
        throw new QueryFailedError(criteria, undefined, error);
      }

      throw error;
    }
  }

  protected getRepository(entityManager?: EntityManager): Repository<Entity> {
    return entityManager ? entityManager.getRepository(this.entity) : this.repository;
  }

  protected addRelationsIfProvided<Options extends FindOneOptions<Entity> | FindManyOptions<Entity>>(
    findOptions: Options,
    relations?: FindOptionsRelations<Entity> | undefined,
    order?: FindOptionsOrder<Entity>,
  ): Options {
    return {
      ...findOptions,
      ...(typeof relations === 'object' && relations !== null && { relations }),
      ...(typeof order === 'object' && order !== null && { order }),
    };
  }

  protected createQueryBuilder(alias?: string, entityManager?: EntityManager): SelectQueryBuilder<Entity> {
    return this.getRepository(entityManager).createQueryBuilder(alias);
  }
}
