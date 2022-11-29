async function getOpensaucedGoalsReposCount (): Promise<number> {
  const res = await fetch(`https://api.github.com/search/repositories?q=open-sauced-goals&order=asc&per_page=100`);

  const data = await res.json() as ReposCountFetchObject;

  if (res.ok) {
    return data.total_count;
  }
  console.error(data);
  return 0;
}


const githubAPI = { getOpensaucedGoalsReposCount };

interface ReposCountFetchObject {
  total_count: number;
}

export default githubAPI;
