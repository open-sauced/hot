import useSWR from "swr";
import { supabase } from "../lib/supabase";

interface PaginatedRepoResponse {
  readonly data: DbRepo[];
  readonly meta: PageMetaDto;
}

const useRepositoriesList = (orderBy = "stars", limit = 10) => {
  const currentUser = supabase.auth.session();
  const { data, error, mutate } = useSWR<PaginatedRepoResponse, Error>(`repos/listUserVoted?orderDirection=DESC&orderBy=${orderBy}&limit=${limit}`);

  useSWR()

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0 },
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};

export { useRepositoriesList };
