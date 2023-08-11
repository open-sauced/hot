import { BsFillCalendar2Fill } from "react-icons/bs";
import RepoList from "./RepoList";
import Skeleton from "react-loading-skeleton";

export declare interface ListRepositoriesProps {
  activeLink: string | null;
  handleLoadingMore: () => void;
  fetchedData: DbRepo[];
  title: string;
  hasNextPage: boolean;
}

const ListRepositories = ({
  activeLink,
  handleLoadingMore,
  fetchedData,
  title,
  hasNextPage,
}: ListRepositoriesProps): JSX.Element => {
  if (!fetchedData.length) {
    return (
      <div className="mx-auto max-w-7xl px-4 mt-10">
        <div className="flex flex-col gap-y-5 overflow-hidden mb-12">
          {Array.from(Array(25).keys()).map(item => (
            <div
              key={item}
              className="p-4 border rounded-2xl bg-white w-full space-y-1 relative"
            >
              <Skeleton
                enableAnimation
                count={4}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-1 mt-10">
      <div className="flex flex-col gap-y-5 mb-12">
        <div className="flex items-center gap-x-2.5">
          <BsFillCalendar2Fill className="w-8 h-8 text-white" />

          {activeLink && (
            <h1 className="text-2xl text-white font-semibold">
              {title}
            </h1>
          )}
        </div>

        {fetchedData.map((item, i) => (
          <RepoList
            key={`${item.full_name}_${i}`}
            data={item}
          />
        ))}
      </div>

      {fetchedData.length > 0 && activeLink !== "myVotes" && hasNextPage && (
        <div className="flex justify-center">
          <button
            className="bg-white text-gray-700 mt-4 mb-4 text-base border-gray-400 border font-normal py-1 px-4 rounded"
            onClick={() => handleLoadingMore()}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ListRepositories;
