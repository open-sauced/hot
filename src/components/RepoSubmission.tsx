import { useState } from "react";

import { sendMessage } from "../lib/discord";
import isValidRepoUrl from "../lib/validateUrl";
import { ToastTrigger } from "../lib/reactHotToast";
import useSupabaseAuth from "../hooks/useSupabaseAuth";

export declare interface RepoSubmissionProps {
  isFormOpen: boolean;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RepoSubmission = ({ isFormOpen, setIsFormOpen }: RepoSubmissionProps) => {
  const { user } = useSupabaseAuth();
  const [isSubmissionInProcess, setIsSubmissionInProcess] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [input, setInput] = useState("");

  if (!user) {
    return null;
  }

  const userName = String(user.user_metadata.user_name);

  const saveToDataBase = (repoUrl: string): void => {
    setIsSubmissionInProcess(true);

    setTimeout(() => {
      setIsSubmissionInProcess(false);

      const { isValid, sanitizedUrl } = isValidRepoUrl(repoUrl.replace(/\s+/g, ""));

      if (!isValid) {
        ToastTrigger({ message: "Invalid repo url", type: "error" });
        return setIsSubmissionInProcess(false);
      }

      if (userName === "undefined") {
        ToastTrigger({ message: "Invalid user name", type: "error" });
        return setIsFormOpen(false);
      }

      setSubmitted(true);
      sendMessage(userName, sanitizedUrl);
      return ToastTrigger({ message: "Data Submitted", type: "success" });
    }, 500);
  };

  const submitButtonHandler = (): void => {
    if (isFormOpen && !submitted) {
      saveToDataBase(input);
    }

    if (submitted) {
      setSubmitted(false);
      return setIsFormOpen(false);
    }
  };

  // listening outside focus
  document.querySelector(".App")?.addEventListener("click", e => {
    if (isSubmissionInProcess) {
      return;
    }

    if (!document.querySelector(".submission-form")?.contains(e.target as unknown as Node)) {
      setIsFormOpen(false);
      setSubmitted(false);
    }
  });

  return (
    <div className="fixed top-[60px] right-[120px] flex items-end flex-col gap-[10px] submission-form z-10">
      {isFormOpen}

      {isFormOpen && !isSubmissionInProcess && !submitted && (
        <div className="bg-white p-[15px] rounded-md min-w-[300px] shadow-xl">
          <h6 className="text-lg mb-[8px] text-gray-700 font-medium">Suggest Repository</h6>

          <p className="text-xs mb-[5px] text-gray-500 font-medium">Repository URL</p>

          <input
            className="bg-gray-200 py-[4px] w-full px-[10px] rounded-md outline-yellow-300 text-gray-500 text-xs  "
            placeholder="https://github.com/open-sauced/hot"
            type="text"
            onChange={e => setInput(e.target.value)}
          />

          <button
            className="bg-saucyRed p-[10px] mt-[15px] w-full text-xs shadow-lg rounded-md text-white font-bold transform transition-all hover:bg-orange-700"
            disabled={isSubmissionInProcess}
            onClick={submitButtonHandler}
          >
            Submit now
          </button>
        </div>
      )}

      {isSubmissionInProcess && (
        <div className="bg-white p-[15px] rounded-md min-w-[300px]">
          <p className="text-xs mb-[5px] text-gray-500 font-medium">Submission in process ...</p>
        </div>
      )}

      {submitted && !isSubmissionInProcess && (
        <div className="bg-white p-[15px] rounded-md min-w-[300px]">
          <p className="text-xs mb-[5px] text-gray-500 font-medium">Submission succeeded!</p>
        </div>
      )}
    </div>
  );
};

export default RepoSubmission;
