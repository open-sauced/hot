import { supabase } from "./supabase";

async function getDeploymentEnvironment() {
  const authSession = supabase.auth.session()?.access_token;

  const res = await fetch(`https://api.github.com/repos/open-sauced/hot/environments`)

  const data = await res.json()
  if(res.ok) {
    return data
  } else {
    console.error(data)
    return null
  }
}

async function getOpensaucedGoalsReposCount(): Promise<number> {
  const res = await fetch(`https://api.github.com/search/repositories?q=open-sauced-goals&order=asc&per_page=100`)

  const data = await res.json()
  if(res.ok) {
    return data.total_count
  } else {
    console.error(data)
    return 0
  }
}


const githubAPI = {
  getDeploymentEnvironment,
  getOpensaucedGoalsReposCount
}
export default githubAPI;
