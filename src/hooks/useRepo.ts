import useSWR from "swr";

const useRepo = (name: string) => {
  console.log(name);
  const { data, error, mutate } = useSWR<DbRepo, Error>(`repos/${name}`);

  console.log(data);

  return {
    repo: data,
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};

export default useRepo;
