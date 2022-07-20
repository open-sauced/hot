function relativeUrlValidator(url: string) {
  try {
    const githubLink = 'github.com/';
    const newUrl = `https://${githubLink}${url}`;
    const urlObject = new URL(newUrl);

    const [owner, repo] = url.split('/');
    if (!owner || !repo || !(urlObject.protocol === 'http:' || urlObject.protocol === 'https:')) {
      return [false, "Invalid URL"];
    }
    return [true, `${owner}/${repo}`];
  } catch (failedToConstructURL) {
    return [false, "failed to construct url"];
  }
}

function absoluteUrlValidator(url: string) {
  try {
    const githubLink = 'github.com/';
    const urlObject = new URL(url);

    const getIndexGithub = url.indexOf(githubLink) + githubLink.length;
    const relativeRepoUrl = url.substr(getIndexGithub, url.length);

    const [owner, repo] = relativeRepoUrl.split('/');

    if (urlObject.hostname !== 'github.com') {
      return [false, "Invalid URL"];
    }
    if (!owner || !repo || !(urlObject.protocol === 'http:' || urlObject.protocol === 'https:')) {
      return [false, "Invalid URL"];
    }
    return [true, `${owner}/${repo}`];
  } catch (failedToConstructURL) {
    return [false, "failed to construct url"];
  }
}

export default function isValidRepoUrl(url: string) {
  const trimmedUrl = url.trim();
  const urlString = trimmedUrl.substr(0, 1) === '/' ? trimmedUrl.substr(1) : trimmedUrl;

  const isRelativeUrl = !(urlString.substr(0, 4) === 'http' || urlString.includes('.com') || urlString.includes('www.'));
  if (isRelativeUrl) {
    return relativeUrlValidator(urlString);
  }

  return absoluteUrlValidator(urlString);
}
