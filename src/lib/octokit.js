/* eslint-disable no-loops/no-loops */
import { App } from "octokit";
import dotenv from "dotenv";

dotenv.config();

async function run() {
  const app = new App({
    appId: +process.env.OPEN_SAUCED_APP_ID,
    privateKey: process.env.OPEN_SAUCED_PRIVATE_KEY,
  });

  // iterate over one installation. Leveraging the installation token allows us to make changes across all installed repos

  await app.eachRepository({installationId: 9812988}, async ({ repository, octokit }) => {
    try {
      const { data } = await octokit.rest.repos
        .getContent({
          owner: repository.owner.login,
          repo: repository.name,
          path: "stars.json",
        })
        .catch((err) => {
          console.log(`stars.json: ${err.status}`);
          if (err.status == 404) {
            console.log(`stars.json: ${err.response.data.message}`);
          }

          return { data: { status: 404, content: [] } };
        });

      let parsedData;

      if (data.status != 404) {
        // convert from base64 to parseable JSOON
        const content = Buffer.from(data.content, "base64").toString();
        parsedData = JSON.parse(content);

        // update repo stats
        for (const item of parsedData) {
          const [owner, repo] = item.full_name.split("/");
          const currentRepoResponse = await octokit.rest.repos.get({ owner, repo });
          item.stargazers_count = currentRepoResponse.data.stargazers_count;
          item.forks_count = currentRepoResponse.data.forks_count;
          item.open_issues_count = currentRepoResponse.data.open_issues_count;
        }
      }

      const dataString = JSON.stringify(parsedData, null, 2);
      const base64String = Buffer.from(dataString).toString("base64");

      // only make commit if there are changes
      await octokit.rest.repos.createOrUpdateFileContents({
        owner: repository.owner.login,
        repo: repository.name,
        path: "stars.json",
        content: base64String,
        message: "updated stars data",
        sha: data.sha,
      });

      console.log(`UPDATED: ${repository.html_url}`);
    } catch (err) {
      console.log(`stars.json: ${err}`);
      console.log(`SKIPPED: ${repository.html_url}`);
    }
  });
}

run();

// -- the above is sample code to put into a netlify/function--

// api call to the serverless function to read and write the file - https://github.com/open-sauced/open-sauced-goals/blob/main/stars.json

// fetch(https://serverlessfunctc.om/api/stars.json)
