import { useLocation, useSearchParams } from "react-router-dom";
import locationsHash from "../lib/locationsHash";
import HotRepositories from "./HotRepositories";
import ListRepositories from "./ListRepositories";
import { useEffect, useState } from "react";
import { BsFillCalendar2Fill } from "react-icons/bs";
import { useRepositoriesList } from "../hooks/useRepositoriesList";

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

const RecentRepoListWrap = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const activeLink = (locationsHash[location.pathname] ?? "recent") as keyof typeof RepoOrderByEnum;
  const limit = parseLimitValue(searchParams.get("limit"));

  const { data, isLoading } = useRepositoriesList(RepoOrderByEnum[activeLink], limit);
  const [thisWeek, setThisWeek] = useState<DbRepo[] | null>(null);
  const [lastWeek, setLastWeek] = useState<DbRepo[] | null>(null);
  const [older, setOlder] = useState<DbRepo[] | null>(null);

  useEffect( () => {
    const lastSunday = (new Date);

    lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay());
    lastSunday.setHours(0, 0, 0, 0);

    if (!isLoading) {
      const thisWeekData = data.filter( repo => repo.created_at && new Date(repo.created_at) > lastSunday);

      thisWeekData.sort( (a, b) => (new Date(a.created_at!) > new Date(b.created_at!) ? 1 : -1));
      setThisWeek(thisWeekData);

      const lastWeekData = data.filter( repo => repo.created_at && new Date(repo.created_at) < lastSunday && new Date(repo.created_at) > new Date(lastSunday.getTime() - 7 * 24 * 60 * 60 * 1000));

      lastWeekData.sort( (a, b) => (new Date(a.created_at!) > new Date(b.created_at!) ? 1 : -1));
      setLastWeek(lastWeekData);

      const olderData = data.filter( repo => repo.created_at && new Date(repo.created_at) < new Date(lastSunday.getTime() - 7 * 24 * 60 * 60 * 1000));

      olderData.sort( (a, b) => (new Date(a.created_at!) > new Date(b.created_at!) ? 1 : -1));
      setOlder(olderData);
    }
  }, [data]);

  const handleLoadingMore = () => {
    setSearchParams({ limit: String(limit + 10) });
  };

  return (
    <>
      <HotRepositories />

      {!isLoading &&
        (
          <>
            {/* limit set to 101, a temporary fix to hide "Load More" from "This Week" & "Last Week".
              TODO: Make a real solution for this. */}

            {thisWeek && thisWeek.length > 0 &&
              <ListRepositories
                activeLink={activeLink}
                fetchedData={thisWeek}
                handleLoadingMore={handleLoadingMore}
                limit={101}
                title="This Week"
              />}

            {lastWeek && lastWeek.length > 0 &&
              <ListRepositories
                activeLink={activeLink}
                fetchedData={lastWeek}
                handleLoadingMore={handleLoadingMore}
                limit={101}
                title="Last Week"
              />}

            {older && older.length > 0 &&
              <ListRepositories
                activeLink={activeLink}
                fetchedData={older}
                handleLoadingMore={handleLoadingMore}
                limit={limit}
                title="Older"
              />}
          </>
        )}
    </>
  );
};

export default RecentRepoListWrap;
