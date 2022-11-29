import { useLocation, useSearchParams } from "react-router-dom";
import locationsHash from "../lib/locationsHash";
import HotRepositories from "./HotRepositories";
import ListRepositories from "./ListRepositories";
import { useVotedRepositoriesList } from "../hooks/useVotedRepositoriesList";

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

const VotedRepoListWrap = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const activeLink = (locationsHash[location.pathname] ?? "recent") as keyof typeof RepoOrderByEnum;
  const limit = parseLimitValue(searchParams.get("limit"));

  const { data, isLoading } = useVotedRepositoriesList(RepoOrderByEnum[activeLink], limit);

  const handleLoadingMore = () => {
    setSearchParams({ limit: String(limit + 10) });
  };

  return (
    <ListRepositories
      activeLink={activeLink}
      fetchedData={data}
      handleLoadingMore={handleLoadingMore}
      limit={limit}
      title="My Votes Repositories"
    />
  );
};

export default VotedRepoListWrap;
