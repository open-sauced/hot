import { useState } from "react";
import { useOutsideClickRef } from "rooks";
import { sendMessage } from "../lib/discord";
import isValidRepoUrl from "../lib/validateUrl";
import { ToastTrigger } from "../lib/reactHotToast";
import useSupabaseAuth from "../hooks/useSupabaseAuth";
import { supabase } from "../lib/supabase";

export declare interface RepoSubmissionProps {
  isFormOpen: boolean;
  handleFormOpen: (state: boolean) => void;
}

const RepoSubmission = ({ isFormOpen, handleFormOpen }: RepoSubmissionProps): JSX.Element => {
  const { user } = useSupabaseAuth();
  const currentUser = supabase.auth.session();
  const [isSubmissionInProcess, setIsSubmissionInProcess] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [input, setInput] = useState("");
  const [submissionRef] = useOutsideClickRef(handleClickOutsideRepoSubmission);

  const userName = String(user?.user_metadata.user_name);

  const saveToDataBase = (repoUrl: string): void => {
    setIsSubmissionInProcess(true);

    setTimeout(() => {
      setIsSubmissionInProcess(false);

      const { isValid, sanitizedUrl } = isValidRepoUrl(repoUrl.replace(/\s+/g, ""));

      if (!isValid) {
        ToastTrigger({ message: "Invalid repo url", type: "error" });
        return setIsSubmissionInProcess(false);
      }

      if (!userName) {
        ToastTrigger({ message: "Invalid user name", type: "error" });
        return handleFormOpen(false);
      }

      if (currentUser?.access_token) submitRepo(sanitizedUrl, currentUser.access_token);
      setSubmitted(true);
      sendMessage(userName, sanitizedUrl);
      return ToastTrigger({ message: "Data Submitted", type: "success" });
    }, 500);
  };

  const submitRepo = async (sanitizedUrl: string, userToken: string) => {
    await fetch(`${import.meta.env.VITE_API_URL}/repos/${sanitizedUrl}`, {
      method: "PUT",
      headers: { accept: "application/json", Authorization: `Bearer ${userToken}` },
    })
      .then((res) => console.log("response: ", res))
      .catch((err) => console.log("error: ", err));
  };

  const submitButtonHandler = (): void => {
    if (isFormOpen && !submitted) {
      saveToDataBase(input);
    }

    if (submitted) {
      setSubmitted(false);
      return handleFormOpen(false);
    }
  };

  // listening outside focus
  function handleClickOutsideRepoSubmission(): void {
    if (isSubmissionInProcess) {
      return;
    }

    handleFormOpen(false);
    setSubmitted(false);
  }

  return (
    <div ref={submissionRef} className="fixed top-14 right-40 flex items-end flex-col gap-2.5 submission-form z-10">
      {isFormOpen}

      {isFormOpen && !isSubmissionInProcess && !submitted && (
        <div className="bg-white p-3.5 rounded-md shadow-xl">
          <h6 className="text-lg mb-2 text-gray-700 font-medium">Suggest Repository</h6>

          <p className="text-xs mb-1.5 text-gray-500 font-medium">Repository URL</p>

          <input
            className="bg-gray-200 py-1 w-full px-2.5 rounded-md outline-yellow-300 text-gray-500 text-xs  "
            placeholder="https://github.com/open-sauced/hot"
            type="text"
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            className="bg-saucyRed p-2.5 mt-4 w-full text-xs shadow-lg rounded-md text-white font-bold transform transition-all hover:bg-orange-700"
            disabled={isSubmissionInProcess}
            onClick={submitButtonHandler}
          >
            Submit now
          </button>
        </div>
      )}

      {isSubmissionInProcess && (
        <div className="bg-white p-4 rounded-md">
          <p className="text-xs mb-1.5 text-gray-500 font-medium">Submission in process ...</p>
        </div>
      )}

      {submitted && !isSubmissionInProcess && (
        <div className="bg-white p-1.5 rounded-md ">
          <p className="text-xs mb-1.5 text-gray-500 font-medium">Submission succeeded!</p>
        </div>
      )}
    </div>
  );
};

export default RepoSubmission;
