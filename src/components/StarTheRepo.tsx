import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { UserAndTokens } from "../hooks/useSupabaseAuth";
import { getUserStarredHotRepo } from "../lib/githubAPI";

export interface StarTheRepoProps {
  userAndTokens?: UserAndTokens;
}

enum RepoStarred {
  Anonymous,
  Pending,
  NotStarred,
  Starred,
}

export const StarTheRepo = ({ userAndTokens }: StarTheRepoProps): JSX.Element | null => {
  const [starred, setStarred] = useState(RepoStarred.Pending);
  const opacity = starred === RepoStarred.Pending ? 0 : 100;
  const [Icon, message] = starred === RepoStarred.Starred ? [AiFillStar, "Starred on GitHub"] : [AiOutlineStar, "Star us on GitHub"];

  useEffect(() => {
    if (!userAndTokens?.providerToken) {
      setStarred(RepoStarred.Anonymous);
      return;
    }

    setStarred(RepoStarred.Pending);

    getUserStarredHotRepo(userAndTokens.providerToken)
      .then(isStarred => setStarred(isStarred ? RepoStarred.Starred : RepoStarred.NotStarred))
      .catch(() => setStarred(RepoStarred.NotStarred));
  }, [userAndTokens?.providerToken]);

  return (
    <div className={`hidden sm:flex items-center opacity-${opacity} text-osGrey transition-opacity font-Inter`}>
      <a
        href="https://github.com/open-sauced/hot"
        rel="noreferrer"
        target="_blank"
      >
        <Icon className="inline-block mr-2.5" />

        <span className="text-md font-light mr-2.5">
          {message}
        </span>
      </a>
    </div>
  );
};
