import useSWR from "swr";
import { supabase } from "../lib/supabase";

interface PaginatedRepoResponse {
  readonly data: DbRepo[];
  readonly meta: PageMetaDto;
}

const apiFetcherWithToken = async (apiUrl: string) => {
  const authSession = supabase.auth.session();

  const authToken = authSession ? authSession.access_token : "";
  const response = await fetch(`${import.meta.env.VITE_API_URL}/${apiUrl}`, { headers: { accept: "application/json", Authorization: `Bearer ${authToken}` } });

  if (!response.ok) {
    const error = new Error("HttpError");

    error.message = `${response.status} ${response.statusText}`;
    error.stack = JSON.stringify(await response.json());

    throw error;
  }

  return response.json();
};

const useVotedRepositoriesList = (orderBy = "stars", limit = 10, pageNumber = 1) => {
  // setting this param as constant, to be avoid lint issue and to be handled in another ticket
  orderBy = "stars";
  const { data, error, mutate } = useSWR<PaginatedRepoResponse, Error>(
    `repos/listUserVoted?orderDirection=DESC&orderBy=${orderBy}&limit=${limit}&page=${pageNumber}`,
    apiFetcherWithToken,
  );

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0, hasNextPage: false },
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};

export { useVotedRepositoriesList };
