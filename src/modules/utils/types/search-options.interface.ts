import { IPaginateOptions } from './paginate-options.interface';

export interface ISearchOptions extends IPaginateOptions {
  search?: string;
}
