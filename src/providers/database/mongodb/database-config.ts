/* eslint-disable max-len */
import { config } from 'dotenv';

import { ConfigurationService } from '~/modules/configurations/configuration.service';

config();

const configurationService = new ConfigurationService();

const { password, username, database, host, port } = configurationService.getDBConfiguration();
const protocol = configurationService.get('DB_PROTOCOL');
const mongoUri = `${protocol}://${username}:${password}@${host}${port ? `:${port}` : ''}/${database}`;

// In this file you can configure migrate-mongo
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export = {
  mongodb: {
    url: mongoUri,
    databaseName: database,
    options: {
      useNewUrlParser: true, // removes a deprecation warning when connecting
      useUnifiedTopology: true, // removes a deprecating warning when connecting
      //   connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
      //   socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
    },
  },
  // The migrations' dir, can be a relative or absolute path. Only edit this when really necessary.
  migrationsDir: 'src/providers/database/migrations',
  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: 'migrations',
  // The file extension to create migrations and search for in migration dir
  migrationFileExtension: '.ts',
  // Enable the algorithm to create a checksum of the file contents and use that in the comparison to determin
  // if the file should be run.  Requires that scripts are coded to be run multiple times.
  useFileHash: false,
  // Don't change this, unless you know what you're doing
  moduleSystem: 'esm',
};
