import useSWR from "swr";

interface PaginatedRepoResponse {
  readonly data: DbRepo[];
  readonly meta: PageMetaDto;
}

/*
 * submissionsCount
 * if user submit a repo
 * check if repo already exist, if it exist increase the count,
 * if user has submitted a repo already existing and was submitted previously by the user return 0
 */

const useUserSubmittedRepos = (orderBy = "stars") => {
  const { data, error, mutate } = useSWR<PaginatedRepoResponse, Error>(`repos/listUserSubmitted?orderDirection=DESC&orderBy=${orderBy}`);

  console.log(data);
  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0 },
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};

export { useUserSubmittedRepos };
