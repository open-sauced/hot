import useSWR from "swr";

interface PaginatedRepoResponse {
  readonly data: DbRepo[];
  readonly meta: PageMetaDto;
}

// submissionsCount

const useUserRepositories = (orderBy = "stars", limit = 10) => {
  const { data, error, mutate } = useSWR<PaginatedRepoResponse, Error>(`repos/listUserSubmitted?orderDirection=DESC&orderBy=${orderBy}&limit=${limit}`);

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0 },
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};

export { useUserRepositories };
