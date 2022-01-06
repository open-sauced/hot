import { createClient } from '@supabase/supabase-js';

// probably should move these to an env.
const supabase = createClient('https://ibcwmlhcimymasokhgvn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyOTkzMDc3OCwiZXhwIjoxOTQ1NTA2Nzc4fQ.zcdbd7kDhk7iNSMo8SjsTaXi0wlLNNQcSZkzZ84NUDg')

export async function fetchVotesByRepo(repoName) {
  const { data: recommendations, error } = await supabase
    .from('recommendations')
    .select('votes')
    .eq('repo_name', repoName);

  console.error(error);

  return recommendations[0].votes ? recommendations[0].votes : 0;
}

export async function updateVotesByRepo(repoName, votes) {
  const { data: recommendations, error } = await supabase
    .from('recommendations')
    .update({'votes': votes + 1})
    .eq('repo_name', repoName);

  console.error(error);

  return recommendations[0].votes;
}
