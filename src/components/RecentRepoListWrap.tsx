import { useLocation, useSearchParams } from "react-router-dom";
import locationsHash from "../lib/locationsHash";
import ListRepositories from "./ListRepositories";
import { useEffect, useState } from "react";
import { useRepositoriesList } from "../hooks/useRepositoriesList";
import Skeleton from "react-loading-skeleton";

export enum RepoOrderByEnum {
  popular = "stars",
  recent = "created_at",
  upvoted = "votesCount",
  discussed = "issues",
  myVotes = "myVotes",
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

const RecentRepoListWrap = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const activeLink = (locationsHash[location.pathname] ?? "recent") as keyof typeof RepoOrderByEnum;
  const limit = parseLimitValue(searchParams.get("limit"));
  const pageNumber = parseInt(searchParams.get("pageNumber")!) || 1;

  const { data, meta, isLoading } = useRepositoriesList(RepoOrderByEnum[activeLink], limit, pageNumber);
  const [thisWeek, setThisWeek] = useState<DbRepo[] | null>(null);
  const [lastWeek, setLastWeek] = useState<DbRepo[] | null>(null);
  const [older, setOlder] = useState<DbRepo[] | null>(null);

  useEffect(() => {
    const lastSunday = (new Date);

    lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay());
    lastSunday.setHours(0, 0, 0, 0);

    if (!isLoading) {
      const thisWeekData = data.filter(repo => repo.created_at && new Date(repo.created_at) > lastSunday);

      thisWeekData.sort((a, b) => (new Date(a.created_at!) > new Date(b.created_at!) ? 1 : -1));
      thisWeekData.sort((a, b) => (a.votesCount! > b.votesCount! ? -1 : 1));
      setThisWeek(thisWeekData);

      const lastWeekData = data.filter(
        repo =>
          repo.created_at &&
          new Date(repo.created_at) < lastSunday &&
          new Date(repo.created_at) > new Date(lastSunday.getTime() - 7 * 24 * 60 * 60 * 1000),
      );

      lastWeekData.sort((a, b) => (new Date(a.created_at!) > new Date(b.created_at!) ? 1 : -1));
      lastWeekData.sort((a, b) => (a.votesCount! > b.votesCount! ? -1 : 1));
      setLastWeek(lastWeekData);

      const olderData = data.filter(
        repo =>
          repo.created_at && new Date(repo.created_at) < new Date(lastSunday.getTime() - 7 * 24 * 60 * 60 * 1000),
      );

      olderData.sort((a, b) => (new Date(a.created_at!) > new Date(b.created_at!) ? 1 : -1));
      olderData.sort((a, b) => (a.votesCount! > b.votesCount! ? -1 : 1));
      setOlder(olderData);
    }
  }, [data]);

  const handleLoadingMore = () => {
    setSearchParams({ pageNumber: String(pageNumber + 1), limit: String(limit) });
  };

  return (
    <>
      {isLoading
        ? (
          <div className="mx-auto max-w-7xl px-4 mt-10">
            <div className="flex flex-col gap-y-5 overflow-hidden mb-12">
              {Array.from(Array(25).keys()).map(item => (
                <div
                  key={item}
                  className="p-4 border rounded-2xl bg-white w-full space-y-1 relative"
                >
                  <Skeleton
                    enableAnimation
                    count={4}
                  />
                </div>
              ))}
            </div>
          </div>
        )
        : (
          <>

            {thisWeek && thisWeek.length > 0 && (
              <ListRepositories
                activeLink={activeLink}
                fetchedData={thisWeek}
                handleLoadingMore={handleLoadingMore}
                hasNextPage={meta.hasNextPage}
                title="This Week"
              />
            )}

            {lastWeek && lastWeek.length > 0 && (
              <ListRepositories
                activeLink={activeLink}
                fetchedData={lastWeek}
                handleLoadingMore={handleLoadingMore}
                hasNextPage={meta.hasNextPage}
                title="Last Week"
              />
            )}

            {older && older.length > 0 && (
              <ListRepositories
                activeLink={activeLink}
                fetchedData={older}
                handleLoadingMore={handleLoadingMore}
                hasNextPage={meta.hasNextPage}
                title="Older"
              />
            )}
          </>
        )}
    </>
  );
};

export default RecentRepoListWrap;
