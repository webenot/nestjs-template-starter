import type { IPaginateOptions } from './paginate-options.interface';

export interface IPaginateItemsOptions extends Required<IPaginateOptions> {
  totalItems: number;
}
