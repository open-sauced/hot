import useSWR, { Key, Fetcher } from "swr";

const fetcher: Fetcher<DbRecomendation, string> = async name =>
  fetch(`${import.meta.env.VITE_API_URL}/repos/${name}`, { headers: { accept: "application/json" } })
    .then(async r => r.json());

const useRepo = (name: Key) => {
  const { data, error } = useSWR(name, fetcher, { revalidateOnFocus: false });

  return {
    repo: data,
    isLoading: !error && !data,
    isError: !!error,
  };
};

export default useRepo;
