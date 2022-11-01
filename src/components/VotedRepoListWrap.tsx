import { useLocation, useSearchParams } from "react-router-dom";
import locationsHash from "../lib/locationsHash";
import useSupabaseAuth from "../hooks/useSupabaseAuth";
import HotRepositories from "./HotRepositories";
import ListRepositories from "./ListRepositories";
import SecondaryNav from "./SecondaryNav";
import { useRepositoriesList } from "../hooks/useRepositoriesList";
import { useVotedRepositoriesList } from "../hooks/useVotedRepositoriesList";
import { useEffect, useState } from "react";
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

const VotedRepoListWrap = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useSupabaseAuth();
  const location = useLocation();

  const activeLink = (locationsHash[location.pathname] ?? "recent") as keyof typeof RepoOrderByEnum;
  const limit = parseLimitValue(searchParams.get("limit"));

  const { data, isLoading } = useVotedRepositoriesList(RepoOrderByEnum[activeLink], limit);
  const [thisWeek, setThisWeek] = useState<DbRepo[] | null>(null);
  const [lastWeek, setLastWeek] = useState<DbRepo[] | null>(null);
  const [older, setOlder] = useState<DbRepo[] | null>(null);

  useEffect( () => {
    const lastSunday = new Date()
    lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay())
    lastSunday.setHours(0, 0, 0, 0)

    if(!isLoading) {
      let thisWeekData = data.filter( (repo) => repo.created_at && new Date(repo.created_at) > lastSunday);
      thisWeekData.sort( (a, b) => new Date(a.created_at!) > new Date(b.created_at!) ? 1 : -1);
      setThisWeek(thisWeekData);

      let lastWeekData = data.filter( (repo) => repo.created_at && new Date(repo.created_at) < lastSunday && new Date(repo.created_at) > new Date(lastSunday.getTime() - 7 * 24 * 60 * 60 * 1000));
      lastWeekData.sort( (a, b) => new Date(a.created_at!) > new Date(b.created_at!) ? 1 : -1);
      setLastWeek(lastWeekData);

      let olderData = data.filter( (repo) => repo.created_at && new Date(repo.created_at) < new Date(lastSunday.getTime() - 7 * 24 * 60 * 60 * 1000));
      olderData.sort( (a, b) => new Date(a.created_at!) > new Date(b.created_at!) ? 1 : -1);
      setOlder(olderData);
    }
  }, [data])

  const handleLoadingMore = () => {
    setSearchParams({ limit: String(limit + 10) });
  };

  return (
    <div className="bg-darkestGrey">
      <SecondaryNav
        activeLink={activeLink}
        user={user}
      />

      <HotRepositories />

      {!isLoading &&
        (
          <>
            {thisWeek && thisWeek.length > 0 &&
              <ListRepositories
                activeLink={activeLink}
                title={`this week`}
                fetchedData={thisWeek}
                handleLoadingMore={handleLoadingMore}
                limit={limit}
              />
            }
            {lastWeek && lastWeek.length > 0 &&
              <ListRepositories
                activeLink={activeLink}
                title={`last week`}
                fetchedData={lastWeek}
                handleLoadingMore={handleLoadingMore}
                limit={limit}
              />
            }
            {older && older.length > 0 &&
              <ListRepositories
                activeLink={activeLink}
                title={`Older`}
                fetchedData={older}
                handleLoadingMore={handleLoadingMore}
                limit={limit}
              />
            }
          </>
        )
      }
    </div>
  );
};

export default VotedRepoListWrap;
