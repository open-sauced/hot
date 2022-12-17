import hotIcon from "../assets/hotIcon.png";
import HotRepoCard from "./HotRepoCard";

const HotRepositories = (): JSX.Element => {
  const staticHot = ["pocketbase/pocketbase", "ThePrimeagen/undefined", "open-sauced/insights"];

  return (
    <div className="flex flex-col px-4 max-w-screen-xl mx-auto">
      <div className="flex space-x-3 items-center">
        <img
          alt="Hot Repo Icon"
          className="h-5 w-5"
          src={hotIcon}
        />

        <h1 className="text-white font-bold text-2xl">Hot Repositories</h1>
      </div>

      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full my-5">
        {staticHot.map(repo => (
          <HotRepoCard
            key={`hot-repo-card-${repo}`}
            repoName={repo}
          />
        ))}
      </div>
    </div>
  );
};

export default HotRepositories;
