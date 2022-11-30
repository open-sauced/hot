// import {writeFile} from "node:fs/promises";
// import {App} from "octokit";

// const app = new App({
//   appId: +process.env.OPEN_SAUCED_APP_ID,
//   privateKey: process.env.OPEN_SAUCED_PRIVATE_KEY,
// });

// const installation = app.installationAccessToken({installationId: +process.env.OPEN_SAUCED_INSTALLATION_ID})

// const {data} = await octokit.rest.repos.getContent({
//   owner: installation.account.login,
//   repo: 'open-sauced-goals',
//   path: 'stars.json'
// }).catch((err) => {
//   console.log(`${installation.account.login} stars.json: ${err}`)
//   return {data: {content: btoa("[]")}}
// })

// // convert from base64 to parseable JSON
// const content = Buffer.from(data.content, "base64").toString()
// const starsRepos = JSON.parse(content)
// const starsJsonExists = data.content.length > 0


//-- the above is sample code to put into a netlify/function--


// api call to the serverless function to read and write the file - https://github.com/open-sauced/open-sauced-goals/blob/main/stars.json

// fetch(https://serverlessfunctc.om/api/stars.json)
