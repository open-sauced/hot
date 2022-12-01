import { useLocation, useSearchParams } from "react-router-dom";
import locationsHash from "../lib/locationsHash";
import ListRepositories from "./ListRepositories";
import { useRepositoriesList } from "../hooks/useRepositoriesList";
import camelCaseToTitleCase from "../lib/camelCaseToTitleCase";

export enum RepoOrderByEnum {
  popular = "stars",
  recent = "created_at",
  upvoted = "votesCount",
  discussed = "issues",
  myVotes = "myVotes"
}

const parseLimitValue = (limit: string | null): number => {
  if (!limit) {
    return 25;
  }
  const value = parseInt(limit);

  if (isNaN(value) || value <= 0) {
    return 15;
  }
  if (value > 25) {
    return 50;
  }
  return value;
};

const RepoListWrap = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const activeLink = (locationsHash[location.pathname] ?? "recent") as keyof typeof RepoOrderByEnum;
  const limit = parseLimitValue(searchParams.get("limit"));
  const { data, isLoading, isError } = useRepositoriesList(RepoOrderByEnum[activeLink], limit);

  const handleLoadingMore = () => {
    setSearchParams({ limit: String(limit + 10) });
  };

  return (
    <ListRepositories
      activeLink={activeLink}
      error={isError}
      fetchedData={data}
      handleLoadingMore={handleLoadingMore}
      limit={limit}
      loading={isLoading}
      title={`${camelCaseToTitleCase(activeLink)} Repositories`}
    />
  );
};

export default RepoListWrap;
