const getAvatarLink = (username: string | null) =>
  `https://github.com/${username ?? "github"}.png?size=460`;

const getProfileLink = (username: string | null) =>
  `https://github.com/${username ?? ""}`;

const getRepoLink = (repoName: string | null) =>
  `https://app.opensauced.pizza/repos/${repoName ?? ""}`;

const getRepoIssuesLink = (repoName: string | null) =>
  `https://github.com/${repoName && `${repoName}/issues` || ""}`;

export {
  getAvatarLink,
  getProfileLink,
  getRepoLink,
  getRepoIssuesLink,
};
