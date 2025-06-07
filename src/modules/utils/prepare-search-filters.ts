import { EMPTY_STRING } from './constants';
import { SearchParametersRequestDTO } from './dto/search-parameters-request.dto';
import { preparePaginateFilters } from './pagination/prepare-paginate-filters';

export const prepareSearchFilters = (
  filters: SearchParametersRequestDTO,
): ReturnType<typeof preparePaginateFilters> & { search: string } => {
  const { limit, offset, page } = preparePaginateFilters(filters);
  const search = filters.search || EMPTY_STRING;

  return { limit, offset, page, search };
};
