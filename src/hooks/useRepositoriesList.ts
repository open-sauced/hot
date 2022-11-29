import useSWR from "swr";

interface PaginatedRepoResponse {
  readonly data: DbRepo[];
  readonly meta: PageMetaDto;
}

const useRepositoriesList = (orderBy = "stars", limit = 10) => {
  const { data, error, mutate } = useSWR<PaginatedRepoResponse, Error>(`repos/list?orderDirection=DESC&orderBy=${orderBy}&limit=${limit}`);

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0 },
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};

export { useRepositoriesList };
