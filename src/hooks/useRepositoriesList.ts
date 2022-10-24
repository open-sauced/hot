import useSWR from "swr";
import { supabase } from "../lib/supabase";

interface PaginatedRepoResponse {
  readonly data: DbRepo[];
  readonly meta: PageMetaDto;
}

const apiFetcherWithToken = async (apiUrl: string, token: string) => {
  const res = token
    ? await fetch(`${import.meta.env.VITE_API_URL}/${apiUrl}`, { headers: { accept: "application/json", Authorization: `Bearer ${token}` } })
    : await fetch(`${import.meta.env.VITE_API_URL}/${apiUrl}`, { headers: { accept: "application/json" } });

  if (!res.ok) {
    const error = new Error("HttpError");

    error.message = `${res.status} ${res.statusText}`;
    error.stack = JSON.stringify(await res.json());

    throw error;
  }

  return res.json();
};

const useRepositoriesList = (orderBy = "stars", limit = 10) => {
  const currentUser = supabase.auth.session()?.access_token;
  const { data, error, mutate } = useSWR<PaginatedRepoResponse, Error>(
    orderBy !== "myvotes"
      ? `repos/list?orderDirection=DESC&orderBy=${orderBy}&limit=${limit}`
      : [`repos/listUserVoted?orderDirection=DESC&orderBy=stars&limit=${limit}`, currentUser],
    apiFetcherWithToken,
  );

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0 },
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};

export { useRepositoriesList };
