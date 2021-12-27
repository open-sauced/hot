export default function getAvatar(username) {
  // if for some reason a username isn't present just use github's avatar
  if (!username) return 'https://github.com/github.png?size=460';
  return `https://github.com/${username}.png?size=460`;
}
