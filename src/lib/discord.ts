import { User } from "@supabase/supabase-js"

const sendMessage = (user: User, repoUrl : string) => {
  const request = new XMLHttpRequest();
  request.open("POST", "https://discord.com/api/webhooks/998629882764476448/ItO3_kUsGTKdDgqc6sTrraOmJFhIVTQmSbygV0z-dk-IjUXRB6H7MN5zakOB6ili7YTd");

  request.setRequestHeader('Content-type', 'application/json');

  const params = {
    username: "Hot Sauced!",
    avatar_url: "",
    content: `${user} has made a new hot repo submission: [${repoUrl}](https://github.com/${repoUrl})`
  }

  request.send(JSON.stringify(params));
}

export {
  sendMessage
};
