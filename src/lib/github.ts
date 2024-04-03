const getAvatarLink = (username: string | null) =>
  `https://github.com/${username ?? "github"}.png?size=460`;

const getProfileLink = (username: string | null) =>
  `https://app.opensauced.pizza/user/${username ?? ""}`;

const getRepoLink = (repoName: string | null) =>
  `https://app.opensauced.pizza/s/${repoName ?? ""}`;

const getRepoIssuesLink = (repoName: string | null) =>
  `https://github.com/${repoName && `${repoName}/issues` || ""}`;

async function userStatusCode(owner: String) {
  const apiUserUrl = `https://api.github.com/users/${owner}`;
  const response = await fetch(apiUserUrl);
  const {login} = await response.json();
  if (apiUserUrl !== response.url) {
    return [301, login];
  } else {
    return [response.status,""];
  }
}

export {
  getAvatarLink,
  getProfileLink,
  getRepoLink,
  getRepoIssuesLink,
  userStatusCode,
};
