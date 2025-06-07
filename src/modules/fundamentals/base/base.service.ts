import type { ObjectLiteral } from 'typeorm';

import { BaseService as BasePostgreSQLService } from '../../../providers/database/postgresql/base-service/base.service';

export class BaseService<T extends ObjectLiteral> extends BasePostgreSQLService<T> {}
