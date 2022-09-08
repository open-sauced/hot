import { BsFillCalendar2Fill } from "react-icons/bs";
import camelCaseToTitleCase from "../lib/camelCaseToTitleCase";
import PostList from "./PostList";

export declare interface ListRepositoriesProps {
  activeLink: string | null;
  limit: number;
  handleLoadingMore: () => void;
  fetchedData: DbRepo[];
}

const ListRepositories = ({ activeLink, limit, handleLoadingMore, fetchedData }: ListRepositoriesProps): JSX.Element => (
  <div className="mx-auto max-w-7xl px-[16px] mt-[40px]">
    <div className="flex flex-col gap-y-[20px]">
      <div className="flex items-center gap-x-[10px]">
        <BsFillCalendar2Fill className="w-[26px] h-[26px] text-white" />

        {activeLink &&
          <h1 className="text-[24px] text-white font-semibold">
            {`${camelCaseToTitleCase(activeLink)} Repositories`}
          </h1>}
      </div>

      {
        fetchedData?.map((item, i) => (
          <PostList
            key={`${item.full_name}_${i}`}
            data={item}
          />
        ))
      }
    </div>

    {
      fetchedData?.length > 0 &&
        activeLink !== "myVotes" &&
        limit <= 100 &&
          <div className="flex justify-center">
            <button
              className="bg-white text-gray-700 mt-[15px] mb-[15px] text-[15px] border-gray-400 border-[1px] font-normal py-1 px-4 rounded-[5px] "
              onClick={() => handleLoadingMore()}
            >
              Load More
            </button>
          </div>
    }
  </div>
);

export default ListRepositories;
