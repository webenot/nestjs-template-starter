import { IsBooleanString, IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

import { LogLevelEnum } from '~/logger/enums';

import { EMPTY_STRING } from '../../utils/constants';
import { PlatformsEnum } from '../../utils/enums';

export class ConfigurationDto {
  @IsNotEmpty()
  @IsNumberString()
  SERVICE_PORT: string;

  @IsNotEmpty()
  @IsString()
  FE_BASE_APP_URL: string;

  @IsNotEmpty()
  @IsString()
  NODE_ENV: string;

  @IsNotEmpty()
  @IsEnum(PlatformsEnum)
  SERVICE_PLATFORM = PlatformsEnum;

  @IsNotEmpty()
  @IsEnum(LogLevelEnum)
  LOG_LEVEL = LogLevelEnum;

  /**
   * Database's section
   */
  @IsNotEmpty()
  @IsString()
  DB_PASSWORD: string;

  @IsNotEmpty()
  @IsString()
  DB_USERNAME: string;

  @IsNotEmpty()
  @IsString()
  DB_NAME: string;

  @IsNotEmpty()
  @IsString()
  DB_HOST: string;

  @IsNotEmpty()
  @IsString()
  DB_PORT: string;

  @IsNotEmpty()
  @IsBooleanString()
  DB_LOGGING: string;

  @IsString()
  @IsOptional()
  DB_PROTOCOL = EMPTY_STRING;

  /**
   * Redis's section
   */
  @IsNotEmpty()
  @IsString()
  REDIS_HOST: string;

  @IsNotEmpty()
  @IsString()
  REDIS_PORT: string;

  @IsNotEmpty()
  @IsString()
  REDIS_USER: string;

  @IsNotEmpty()
  @IsString()
  REDIS_PASSWORD: string;

  /**
   * Rabbit MQ section
   */
  @IsNotEmpty()
  @IsString()
  RMQ_HOST: string;

  @IsNotEmpty()
  @IsNumberString()
  RMQ_AMQP_PORT: string;

  @IsNotEmpty()
  @IsNumberString()
  RMQ_MANAGEMENT_PORT: string;

  @IsNotEmpty()
  @IsString()
  RMQ_CONNECT_STRING: string;

  @IsNotEmpty()
  @IsString()
  RMQ_USER: string;

  @IsNotEmpty()
  @IsString()
  RMQ_PASS: string;

  @IsNotEmpty()
  @IsString()
  RMQ_MANAGER_USER: string;

  @IsNotEmpty()
  @IsString()
  RMQ_MANAGER_PASS: string;

  @IsNotEmpty()
  @IsBooleanString()
  IS_RMQ_CONNECTION_WAIT: string;

  @IsNotEmpty()
  @IsBooleanString()
  IS_RMQ_CONTROLLER_DISCOVERY: string;
}
