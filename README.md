# Boilerplate API app

## Install
From project repository to initialize app with necessary configuration please run:
```bash
$ npm run init
```
this command will install all packages for your app

## Launch

### Using of docker-compose for local deployment (recommended)

Launch it from root directory

```bash
$ docker-compose up
```

Using this command will start 4 containers: `redis`, `postgres`, `rabbitmq` and `api`.

To disable any of these containers and to use an existing one please delete the related section in `docker-compose.yaml`

After adding a new module to the project please use:

```bash
$ docker-compose up --build
```

### Using of npm for local deployment (in case you need connect external database or external Redis instance)

To start project, launch it from project repository:
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Database Access

Local database `db_name` by default is available on `localhost:5432`.

Please use `.env` file for details.

If you previously have started another PostgreSQL container on `localhost:5432` you have to stop the container before running the app.

## Redis Access

Local Redis instance by default is available on `localhost:6379`.

## RabbitMQ Access

Local RabbitMQ instance by default is available on `localhost:15672`.

## File structure

In case creating a new service, module, controller, entity or spec file, please use default file structure:
* all providers, like database, redis, message queues, external APIs should be stored by `src/providers`
* in order to provide additional logs security, you should use logger, stored by `src/logger`
* directory `src/modules` uses default file structure:
  * `src/modules/configurations` only to store configuration service with DTO for `.env` file (in order to check validity of `.env` content)
  * `src/modules/cron-scheduler` only to store cron schedule (without any logic)
  * `src/modules/fundamentals` only to store low-level services with access only to related database's table/entity
  * `src/modules/managers` to store services with complicated logic with access to more than 1 service from fundamentals or providers
  * `src/modules/utils` to provide access to common for all app utils, like math etc.
  * `src/modules/apis` for all provided by app controllers with related modules/services:
    * `src/modules/apis/admins-api` - all provided by app APIs for administrators part of app
    * `src/modules/apis/clients-api` - all provided by app APIs for clients part of app
    * `src/modules/apis/guests-api` - all provided by app APIs for guests part of app
    * `src/modules/apis/common-api` - all provided by app APIs for common part of app

## Entities, fundamentals services and DTOs

All entities should be created with extending `/src/providers/database/postgresql/base-service/base.entity.ts`

The `BaseEntity` have 3 mandatory fields for any new entity:
* `id: uuid`
* `createdAt: timestamp with tz`
* `updatedAt: timestamp with tz`

You don't need to set this fields additionally (please avoid code duplication).

In similar way you should use `BaseService` and `GetBaseEntityResponseDto` to extending this classes in your fundamentals services and DTOs:
* `/src/modules/fundamentals/base/base.service.ts` - implemented `create()`, `findOne()`, `update()`, `remove()` etc. public methods
* `/src/providers/database/postgresql/dtos/get-base-entity-response.dto.ts` - implemented `id`, `createdAt`, `updatedAt` fields with Swagger properties

For all methods of `BaseService`, in case you need database transactions, you have to use `entityManager: EntityManager` - manager, provided by TypeORM's `Connection`.
EntityManager is always the second optional parameter of each `BaseService's` extended method.

## Migrate

Nest.js uses TypeORM. It has built in methods to migrate and synchronize DB.

Each Entity for typeORM you need to export in `/src/modules/fundamentals/entities.ts` file in a list of entities because of typeORM v0.3 requirements. Each migration for typeORM you need to export in `/src/providers/database/migrations/migrations.ts` file in a list of migrations because of typeORM v0.3 requirements.

If you're updating entities, you would need to create and run a migration to apply it.

To generate a migration from entities changes:
```bash
$ npm run typeorm:generate
$ Migration name: <migration name in pascal case>
```

To create empty migration:
```bash
$ npm run typeorm:create
$ Migration name: <migration name in pascal case>
```

To manual run migration:
```bash
$ npm run typeorm:run
```

To revert the last migration:
```bash
$ npm run typeorm:revert
```

In case you need replace a few migrations with only one union migration in current branch - please make sure you delete previously created migration from:
* `src/providers/database/migrations/`
* `dist/src/providers/database/migrations/`

## Default features

### Request-logger middleware

In order to provide detailed logs with time measurement of response time, has been implemented `LoggerInterceptor`.

If you need add details to default request/response logs, please use `src/logger/logger.interceptor.ts`.

### Default logger

In order to provide a unified approach to logging methods, `logger` was created and stored in `src/logger/logger.ts`.
If you need dependency injection you can also use `src/logger/logger.service.ts`

Please define the platform in the `SERVICE_PLATFORM` environment before using the logger. It could be:
- `gcp` for Google Cloud Platform
- `aws` from Amazon Web Services
- `local` for local development

Each option contains platform-specific logic for tracing in the cloud provider.
The locale option enables the display of logs in human-readable mode.
You can freely remove configurations of unused platforms

>If you are going to use AWS, please extend the configuration that is stored in `src/logger/config/aws` with platform-specific logic.

## Cron jobs

To manage cron jobs NestJS uses `Bull`. To only register cron job add it to `src/modules/cron-scheduler/cron-scheduler.service.ts`.

After that create a cron consumer to handle job functionality. Example: `src/modules/cron-scheduler/test-cron.consumer.ts`.

The implementation of cron job business logic must be only in managers. Example: `src/modules/managers/cron-manager/cron-manager.service.ts`

Bull queues are ready to scale and have been tested on scaled pods.

To add time for cron job edit `src/modules/cron-scheduler/enums/cron-expressions.enum.ts` file.

## Architecture Decision Records

An architecture decision record (ADR) is a document that captures an important architecture decision made along with its context and consequences.

The boilerplate uses [**log4brains**](https://github.com/thomvaill/log4brains) to manage ADR.

To get started, run
```bash
npm install -g log4brains
```

To preview the knowledge base locally run
```bash
log4brains preview
```

>In this mode, the Hot Reload feature is enabled

To create a new ADR interactively from template, run:
```bash
log4brains adr new
```
Then you can edit template in `docs/adr/${date}-${decision_name}.md`

ADR is immutable. Only its status can change in the future.

### Template
The original template had a few parts:

- **Title**: Which sums up the solved problem and its solution
- **Context**: Probably the essential part, which describes "the forces at play, including technological, political, social, and project local"
- **Decision**
- **Status**: Proposed, accepted, deprecated, superseded...
- **Consequences**: The positive and negative ones for the future of the project

### More information:
- [Log4brains documentation](https://github.com/thomvaill/log4brains/tree/master#readme)
- [What is an ADR and why should you use them](https://github.com/thomvaill/log4brains/tree/master#-what-is-an-adr-and-why-should-you-use-them)
- [ADR GitHub organization](https://adr.github.io/)
