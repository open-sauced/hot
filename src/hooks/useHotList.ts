import useSWR from "swr";

interface PaginatedRepoResponse {
  readonly data: DbRepo[];
  readonly meta: PageMetaDto;
}

const useHotList = () => {
  const { data } = useSWR<PaginatedRepoResponse, Error>(`histogram/top/stars`);

  return { data: data ?? [] };
};

export { useHotList };
