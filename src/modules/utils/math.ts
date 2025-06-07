import BigNumber from 'bignumber.js';

import { AllowedDecimalsEnum } from './enums';

export function pow(a: string | number | BigNumber, b: string | number | BigNumber): BigNumber {
  return new BigNumber(a).pow(new BigNumber(b));
}

export function add(a: string | number | BigNumber, b: string | number | BigNumber): BigNumber {
  return new BigNumber(a).plus(new BigNumber(b));
}

export function subtract(a: string | number | BigNumber, b: string | number | BigNumber): BigNumber {
  return new BigNumber(a).minus(new BigNumber(b));
}

export function dividedBy(a: string | number | BigNumber, b: string | number | BigNumber): BigNumber {
  return new BigNumber(a).dividedBy(new BigNumber(b));
}

export function dividedToIntegerBy(a: string | number | BigNumber, b: string | number | BigNumber): BigNumber {
  return new BigNumber(a).dividedToIntegerBy(new BigNumber(b));
}

export function multipliedBy(a: string | number | BigNumber, b: string | number | BigNumber): BigNumber {
  return new BigNumber(a).multipliedBy(new BigNumber(b));
}

export function toFixed(a: string | number | BigNumber, decimal: string | number = '0'): string {
  return typeof decimal === 'number'
    ? new BigNumber(a).toFixed(decimal)
    : new BigNumber(a).toFixed(Number.parseInt(decimal, 10));
}

export function toFixedMonetary(
  a: string | number | BigNumber,
  decimal: AllowedDecimalsEnum = AllowedDecimalsEnum.DEFAULT_CURRENCY_DECIMALS,
): string {
  return toFixed(a, decimal);
}

export function toFixedPercents(a: string | number | BigNumber): string {
  return toFixed(a, AllowedDecimalsEnum.DEFAULT_PERCENT_DECIMALS);
}

export function toNumber(a: string | number | BigNumber): number {
  return new BigNumber(a).toNumber();
}

export function toFixedRoundDown(a: string | number | BigNumber, decimal: string | number = '0'): string {
  return new BigNumber(a).toFixed(toNumber(decimal), 1);
}

export function isGreaterThan(a: string | number | BigNumber, b: string | number | BigNumber): boolean {
  return new BigNumber(a).isGreaterThan(new BigNumber(b));
}

export function isGreaterThanOrEqualTo(a: string | number | BigNumber, b: string | number | BigNumber): boolean {
  return new BigNumber(a).isGreaterThanOrEqualTo(new BigNumber(b));
}

export function isEqualTo(a: string | number | BigNumber, b: string | number | BigNumber): boolean {
  return new BigNumber(a).isEqualTo(new BigNumber(b));
}

export function isLessThan(a: string | number | BigNumber, b: string | number | BigNumber): boolean {
  return new BigNumber(a).isLessThan(new BigNumber(b));
}

export function isLessThanOrEqualTo(a: string | number | BigNumber, b: string | number | BigNumber): boolean {
  return new BigNumber(a).isLessThanOrEqualTo(new BigNumber(b));
}

export function min(...arguments_: (string | number | BigNumber)[]): BigNumber {
  return BigNumber.minimum(...arguments_);
}

export function max(...arguments_: (string | number | BigNumber)[]): BigNumber {
  return BigNumber.maximum(...arguments_);
}
