import React from "react";
import PostGrid from "./PostGrid";
import { User } from "@supabase/supabase-js";

export declare interface GridDisplayProps {
  activeLink: string | null;
  limit: number;
  handleLoadingMore: () => void;
  fetchedData: DbRecomendation[];
  user: User | null;
}

const GridDisplay = ({ activeLink, limit, handleLoadingMore, fetchedData, user }: GridDisplayProps): JSX.Element => (
  <div>
    <div className="container grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-screen-xl mx-auto auto-rows-fr">
      {fetchedData.map((item, i) => (
        <PostGrid user={user} data={item} key={`${item.full_name}_${i}`} />
      ))}
      {fetchedData.length > 0 && activeLink !== "myVotes" && limit <= 100 && (
        <button
          onClick={() => handleLoadingMore()}
          className="bg-grey100 uppercase border-[1px] hover:text-white border-grey120 hover:bg-grey150 text-grey150 font-bold py-2 px-4 rounded-xl"
        >
          Load More
        </button>
      )}
    </div>
  </div>
);

export default GridDisplay;
