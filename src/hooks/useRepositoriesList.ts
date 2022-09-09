import useSWR from "swr";

interface PaginatedRepoResponse {
  readonly data: DbRepo[];
  readonly meta: PageMetaDto;
}

const useRepositoriesList = (orderBy = "stars") => {
  const { data, error, mutate } = useSWR<PaginatedRepoResponse, Error>(`repos/list?orderDirection=DESC&orderBy=${orderBy}`);

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0 },
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};

export { useRepositoriesList };
