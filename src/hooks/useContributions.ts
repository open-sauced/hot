import useSWR from "swr";

interface PaginatedContributorsResponse {
  readonly data: DbContribution[];
  readonly meta: PageMetaDto;
}

const useContributions = (repoName: string, limit = 10, orderBy = "recent") => {
  const baseEndpoint = `repos/${repoName}/contributions`;
  const limitQuery = `&limit=${limit}`;
  const orderByQuery = orderBy ? `&updated_at=${orderBy}` : "";
  const endpointString = `${baseEndpoint}?${limitQuery}${orderByQuery}`;

  const { data, error, mutate } = useSWR<PaginatedContributorsResponse, Error>(endpointString);

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0 },
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};

export default useContributions;
