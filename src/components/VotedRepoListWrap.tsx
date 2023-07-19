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
  const pageNumber = parseInt(searchParams.get("pageNumber")!) || 1;


  const { data, meta, isLoading } = useVotedRepositoriesList(RepoOrderByEnum[activeLink], limit, pageNumber);

  const handleLoadingMore = () => {
    setSearchParams({ pageNumber: String(pageNumber + 1), limit: String(limit) });
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
            <h1 className="text-2xl text-center">Try voting on any repository. Your vote will appear here.</h1>
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
      hasNextPage={meta.hasNextPage}
      title="My Votes Repositories"
    />
  );
};

export default VotedRepoListWrap;
