const sendMessage = (user: string, repoUrl: string) => {
  const request = (new XMLHttpRequest);

  request.open(
    "POST",
    import.meta.env.DISCORD_WEBHOOK_URL as string | URL,
  );

  request.setRequestHeader("Content-type", "application/json");

  const params = {
    username: "Hot Sauced!",
    avatar_url: "",
    content: `${user} has made a new hot repo submission: [${repoUrl}](https://github.com/${repoUrl})`,
  };

  request.send(JSON.stringify(params));
};

export { sendMessage };
