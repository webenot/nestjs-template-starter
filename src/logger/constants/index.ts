import type { PlatformsEnum } from '../../modules/utils/enums';
import { LogLevelEnum } from '../enums';

export const MESSAGE_KEY = 'message';
export const SERVICE_PLATFORM = (process.env['SERVICE_PLATFORM'] || 'local') as PlatformsEnum;
export const LOG_LEVEL = process.env['LOG_LEVEL'] || LogLevelEnum.INFO;

export const NOT_LOG_ENDPOINTS = new Set(['/']);

export { name as SERVICE_NAME, version as SERVICE_VERSION } from '../../../package.json';
