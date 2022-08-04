import { User } from "@supabase/supabase-js";
import { capturePostHogAnayltics } from "./analytics";
import { updateVotesByRepo } from "./supabase";
import { ToastTrigger } from "./reactHotToast";

// this function handles votes update accross components
async function handleVoteUpdateByRepo (votes: number, repo_id: number, user_id: User) {
  const checkUserId = parseInt(String(user_id));

  if (typeof checkUserId === "number" && checkUserId !== 0) {
    capturePostHogAnayltics("User voted", "voteClick", "true");

    const updatedVotes = await updateVotesByRepo(votes, repo_id, checkUserId);

    return updatedVotes;
  }
  ToastTrigger({ message: "You must be signed in to vote", type: "error" });
}

export default handleVoteUpdateByRepo;
