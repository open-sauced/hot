import useSWR from "swr";

const useRepo = (name: string) => {
  const { data, error, mutate } = useSWR<DbRepo, Error>(`repos/${name}`);

  return {
    repo: data,
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};

export default useRepo;
