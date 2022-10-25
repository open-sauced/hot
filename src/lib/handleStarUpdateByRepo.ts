import { capturePostHogAnayltics } from "./analytics";

import { updateStarsByRepo } from "./supabase";
import { ToastTrigger } from "./reactHotToast";

// this function handles stars update across components
async function handleStarUpdateByRepo (stars: number, repo_id: number, user_id: unknown): Promise<number> {
  const checkUserId = parseInt(String(user_id));

  if (checkUserId !== 0) {
    capturePostHogAnayltics("User starred", "starClick", "true");

    const updatedStars = await updateStarsByRepo(stars, repo_id, checkUserId);

    return updatedStars;
  }

  ToastTrigger({ message: "You must be signed in to star", type: "error" });
  return 0;
}

export default handleStarUpdateByRepo;
