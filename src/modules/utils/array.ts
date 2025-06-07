import _ from 'lodash';

export function splitArrayToChunks<T>(array: Array<T>, chunkSize: number): Array<Array<T>> {
  const results: Array<Array<T>> = [];
  while (array.length > 0) {
    results.push(array.splice(0, chunkSize));
  }
  return results;
}

export function intersectionBy<T>(array1: Array<T>, array2: Array<T>, key: string): Array<T> {
  return _.intersectionBy(array1, array2, key);
}

export function transformArrayToInCondition(array: string[]): string {
  return array.map((element) => `'${element}'`).join(',');
}
