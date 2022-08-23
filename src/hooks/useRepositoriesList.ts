
import useSWR from "swr";

const useRepositoriesList = () => {
  const { data, error, mutate } = useSWR<{ data: DbRepos[], meta: PaginatedMeta }, Error>("repos/list");

  return {
    repoList: data || { data: [] },
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};

export { useRepositoriesList };
