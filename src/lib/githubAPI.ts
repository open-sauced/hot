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

const githubAPI = {
  getDeploymentEnvironment
}

export default githubAPI;
