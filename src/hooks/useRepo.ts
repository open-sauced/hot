import useSWR from "swr";

const useRepo = (name: string) => {
  const { data, error } = useSWR<DbRecomendation, Error>(`repos/${name}`);

  return {
    repo: data,
    isLoading: !error && !data,
    isError: !!error,
  };
};

export default useRepo;
