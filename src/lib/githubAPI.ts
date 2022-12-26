export interface ReposCountFetchObject {
  total_count: number;
}

export async function getOpensaucedGoalsReposCount (): Promise<number> {
  const res = await fetch(`https://api.github.com/search/repositories?q=open-sauced-goals&order=asc&per_page=100`);

  const data = (await res.json()) as ReposCountFetchObject;

  if (res.ok) {
    return data.total_count;
  }
  console.error(data);
  return 0;
}

export async function getUserStarredHotRepo (githubToken: string): Promise<boolean> {
  const result = await fetch("https://api.github.com/user/starred/open-sauced/hot", {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${githubToken}`,
    },
  });

  return result.status === 204;
}
