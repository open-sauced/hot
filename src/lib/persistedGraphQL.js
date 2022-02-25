import fetch from "node-fetch"

// This file is temporary and meant to be a workaround for GitHub App limitations
// https://github.com/open-sauced/open-sauced/blob/main/src/lib/persistedGraphQL.js
const url = 'https://serve.onegraph.com/graphql?app_id=06238984-0a96-4774-95ad-d7b654c980c5';

// variables are generically labelled for easy updating.
const docId1 = 'a0722788-adb0-4731-96fb-9e50c72a2528'; // RepoQuery

// TODO: Move this entire file to an npm package
const makeFetch = (docId, requiredVariables = [], operationName = false) => {
  return async function (variables = {}) {
    const body = { doc_id: docId };
    if (operationName) body.operationName = operationName;
    // Validate required variables by presence
    if (requiredVariables.length > 0) {
      if (!variables) throw Error('No required variables provided for persisted fetch');
      const missing = [];
      for (const name of requiredVariables) {
        if (!variables.hasOwnProperty(name)) missing.push(name);
      }
      if (missing.length > 0) throw Error(`Missing required variables: ${missing.join(', ')}.`);
    }
    if (variables) body.variables = variables;
    const options = {
      method: 'POST',
      body: JSON.stringify(body),

    };
    const response = await fetch(url, options)
      .then((res) => res.json())
      .then((json) => json);
    return response;
  };
}

const persistedRepoDataFetch = makeFetch(docId1, ['repo', 'owner']);

const api = {
  persistedRepoDataFetch,
};

export default api;
