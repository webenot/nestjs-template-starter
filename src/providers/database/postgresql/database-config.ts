import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

import { ConfigurationService } from '~/modules/configurations/configuration.service';

import entities from '../../../modules/fundamentals/entities';
import migrations from '../migrations/migrations';

config();

const configurationService = new ConfigurationService();

export const databaseOptions: DataSourceOptions = {
  type: 'postgres',
  entities,
  migrations,
  migrationsRun: true,
  synchronize: false,
  migrationsTransactionMode: 'each',
  ...configurationService.getDBConfiguration(),
};

export default new DataSource(databaseOptions);
