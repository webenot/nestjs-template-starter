import { type FindOneOptions, type FindOptionsOrder, type FindOptionsRelations, type ObjectLiteral } from 'typeorm';

export type FindOptions<Entity extends ObjectLiteral> = {
  relations?: FindOptionsRelations<Entity>;
  lock?: FindOneOptions<Entity>['lock'];
  order?: FindOptionsOrder<Entity>;
};
