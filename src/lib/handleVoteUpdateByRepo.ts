import { capturePostHogAnayltics } from "./analytics";
import { updateVotesByRepo } from "./supabase";
import { ToastTrigger } from "./reactHotToast";

// this function handles votes update across components
async function handleVoteUpdateByRepo (votes: number, repo_id: number, user_id: unknown): Promise<number> {
  const checkUserId = parseInt(String(user_id));

  if (checkUserId !== 0) {
    capturePostHogAnayltics("User voted", "voteClick", "true");

    const updatedVotes = await updateVotesByRepo(votes, repo_id, checkUserId);

    return updatedVotes;
  }

  ToastTrigger({ message: "You must be signed in to vote", type: "error" });
  return 0;
}

export default handleVoteUpdateByRepo;
