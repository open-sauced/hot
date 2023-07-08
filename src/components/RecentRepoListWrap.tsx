// ...

const RecentRepoListWrap = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const activeLink = (locationsHash[location.pathname] ?? "recent") as keyof typeof RepoOrderByEnum;
  const limit = parseLimitValue(searchParams.get("limit"));

  const { data, isLoading } = useRepositoriesList(RepoOrderByEnum[activeLink], limit);
  const [thisWeek, setThisWeek] = useState<DbRepo[] | null>(null);
  const [lastWeek, setLastWeek] = useState<DbRepo[] | null>(null);
  const [older, setOlder] = useState<DbRepo[] | null>(null);

  useEffect(() => {
    const lastSunday = new Date();
    lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay());
    lastSunday.setHours(0, 0, 0, 0);

    if (!isLoading) {
      const thisWeekData = data.filter((repo) => repo.created_at && new Date(repo.created_at) > lastSunday);

      thisWeekData.sort((a, b) => (new Date(a.created_at!) > new Date(b.created_at!) ? 1 : -1));
      thisWeekData.sort((a, b) => (a.votesCount! > b.votesCount! ? -1 : 1));
      setThisWeek(thisWeekData.slice(0, 101)); // Fix: Limit the number of repositories displayed to 101

      const lastWeekData = data.filter(
        (repo) =>
          repo.created_at &&
          new Date(repo.created_at) < lastSunday &&
          new Date(repo.created_at) > new Date(lastSunday.getTime() - 7 * 24 * 60 * 60 * 1000)
      );

      lastWeekData.sort((a, b) => (new Date(a.created_at!) > new Date(b.created_at!) ? 1 : -1));
      lastWeekData.sort((a, b) => (a.votesCount! > b.votesCount! ? -1 : 1));
      setLastWeek(lastWeekData.slice(0, 101)); // Fix: Limit the number of repositories displayed to 101

      const olderData = data.filter(
        (repo) =>
          repo.created_at && new Date(repo.created_at) < new Date(lastSunday.getTime() - 7 * 24 * 60 * 60 * 1000)
      );

      olderData.sort((a, b) => (new Date(a.created_at!) > new Date(b.created_at!) ? 1 : -1));
      olderData.sort((a, b) => (a.votesCount! > b.votesCount! ? -1 : 1));
      setOlder(olderData);
    }
  }, [data]);

  const handleLoadingMore = () => {
    setSearchParams({ limit: String(limit + 10) });
  };

  return (
    <>
      {!isLoading && (
        <>
          {thisWeek && thisWeek.length > 0 && (
            <ListRepositories
              activeLink={activeLink}
              fetchedData={thisWeek}
              handleLoadingMore={handleLoadingMore}
              limit={101} // Fix: Set the limit to 101 to hide the "Load More" button
              title="This Week"
            />
          )}

          {lastWeek && lastWeek.length > 0 && (
            <ListRepositories
              activeLink={activeLink}
              fetchedData={lastWeek}
              handleLoadingMore={handleLoadingMore}
              limit={101} // Fix: Set the limit to 101 to hide the "Load More" button
              title="Last Week"
            />
          )}

          {older && older.length > 0 && (
            <ListRepositories
              activeLink={activeLink}
              fetchedData={older}
              handleLoadingMore={handleLoadingMore}
              limit={limit} // Fix: Set the limit to the actual limit value
              title="Older"
            />
          )}
        </>
      )}
    </>
  );
};

export default RecentRepoListWrap;
