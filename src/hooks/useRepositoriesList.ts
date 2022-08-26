
import useSWR from "swr";

export declare interface PaginatedMetaResponse { data: { data: DbRepos[]; meta: PaginatedMeta; } }

const useRepositoriesList = (orderBy: string) => {
  const { data, error, mutate } = useSWR<PaginatedMetaResponse, Error>(`repos/list?orderDirection=DESC&orderBy${orderBy}`);

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? [],
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};

export { useRepositoriesList };
