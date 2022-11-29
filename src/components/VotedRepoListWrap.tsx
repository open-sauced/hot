import { useLocation, useSearchParams } from "react-router-dom";
import locationsHash from "../lib/locationsHash";
import ListRepositories from "./ListRepositories";
import { useVotedRepositoriesList } from "../hooks/useVotedRepositoriesList";
import { BsFillCalendar2Fill } from "react-icons/bs";

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

  if (!isLoading && !data.length) {
    return (
      <div className="mx-auto max-w-7xl px-4 pb-1 mt-10">
        <div className="flex flex-col gap-y-5 overflow-hidden mb-12">
          <div className="flex items-center gap-x-2.5">
            <BsFillCalendar2Fill className="w-8 h-8 text-white" />

            <h1 className="text-2xl text-white font-semibold">
              My Votes Repositories
            </h1>
          </div>

          <div
            className="p-4 border rounded-2xl bg-white w-full space-y-1 relative"
          >
            <h1 className="text-2xl text-center">You didn&apos;t vote on any Repositories. Your votes will appear here.</h1>
          </div>
        </div>
      </div>
    );
  }

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
