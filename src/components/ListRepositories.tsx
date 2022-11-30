import { BsFillCalendar2Fill } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import RepoList from "./RepoList";

export declare interface ListRepositoriesProps {
  activeLink: string | null;
  limit: number;
  handleLoadingMore: () => void;
  fetchedData: DbRepo[];
  loading: boolean;
  error: Error | undefined | boolean
  title: string;
}

const ListRepositories = ({
  activeLink,
  limit,
  handleLoadingMore,
  fetchedData,
  loading,
  error,
  title,
}: ListRepositoriesProps): JSX.Element => {
  if (error) {
    console.error(error);
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 mt-10">
        <div className="flex flex-col gap-y-5 overflow-hidden mb-12">
          {Array.from(Array(10).keys()).map(item => (
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
    <div className="mx-auto max-w-7xl px-4 mt-10">
      <div className="flex flex-col gap-y-5">
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

      {fetchedData.length > 0 && activeLink !== "myVotes" && limit <= 100 && (
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
