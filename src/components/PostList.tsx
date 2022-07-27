import React, { useState } from 'react';
import { FaArrowAltCircleUp, FaDotCircle, FaStar } from 'react-icons/fa';
import humanizeNumber from '../lib/humanizeNumber';
import { getRepoLink, getRepoIssuesLink } from '../lib/github';
import Avatar from './Avatar';
import { updateVotesByRepo } from '../lib/supabase';
import { User } from "@supabase/supabase-js";
import useSupabaseAuth from "../hooks/useSupabaseAuth";

export declare interface PostListProps {
  data: DbRecomendation;
  user: User | null;
}

const PostList = ({ data, user }: PostListProps): JSX.Element => {
  const { user_metadata: { sub: user_id }} = user || { user_metadata: { sub: null }};
  const {
    id: repo_id,
    votesRelation: [{votesCount}],
  } = data;

  const [votes, updateVotesState] = useState(votesCount || 0);
  const { signIn } = useSupabaseAuth();

  async function handleVoteUpdateByRepo(votes: number, repo_id: number) {
    const updatedVotes = await updateVotesByRepo(votes, repo_id, user_id);
    updateVotesState(updatedVotes);
  }

  return (
    <div>
      
    </div>
  );
}

export default PostList;
