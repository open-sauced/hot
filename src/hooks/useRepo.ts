import useSWR from "swr";

const useRepo = (name: string) => {
  console.log(name);
  const { data, error, mutate } = useSWR<DbRepo, Error>(`repos/${name}`);

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  console.log(`this is the ${data}`);

  return {
    repo: data,
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};

export default useRepo;
