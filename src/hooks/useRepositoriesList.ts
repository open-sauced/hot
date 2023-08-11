import useSWR from "swr";

interface PaginatedRepoResponse {
  readonly data: DbRepo[];
  readonly meta: PageMetaDto;
}

const useRepositoriesList = (orderBy = "stars", limit = 10, pageNumber = 1) => {
  const { data, error, mutate } = useSWR<PaginatedRepoResponse, Error>(`repos/list?orderDirection=DESC&orderBy=${orderBy}&limit=${limit}&page=${pageNumber}`);

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0, hasNextPage: false },
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};

export { useRepositoriesList };
