import type { OrderByCondition } from 'typeorm';

export const prepareOrderParameters = (orderByConditions: OrderByCondition): OrderByCondition => {
  const order: Partial<OrderByCondition> = {};
  for (const condition in orderByConditions) {
    if (orderByConditions.hasOwnProperty(condition)) {
      // eslint-disable-next-line security/detect-object-injection
      order[`${condition}`] = orderByConditions[condition];
    }
  }
  return order as OrderByCondition;
};
