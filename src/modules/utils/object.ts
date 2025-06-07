import * as _ from 'lodash';

import type { IObjectLiteral } from './types';

export function convertSnakeCaseKeysToCamelCase<T1 extends IObjectLiteral, T2 extends IObjectLiteral>(
  object: T1,
): Partial<T2> {
  const newObject: Partial<T2> = {};

  for (const key in object) {
    const updatedKey = _.camelCase(key) as keyof T2;
    newObject[updatedKey] = object[key];
  }

  return newObject;
}

export function pick<T1 extends IObjectLiteral>(object: T1, array: Array<string>): Pick<T1, (typeof array)[number]> {
  return _.pick(object, array);
}

export function cloneDeep<T1 extends IObjectLiteral>(object: T1): Partial<T1> {
  return _.cloneDeep(object);
}

export function getValueByKey<T>(object: object | undefined, key: string): T | null {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,unicorn/no-null
  let value: any = null;
  if (!object) {
    return value;
  }
  const keys = key.split('.');

  keys.forEach((separateKey) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    value = value ? value[`${separateKey}`] : object[`${separateKey}`];
  });

  return value;
}
