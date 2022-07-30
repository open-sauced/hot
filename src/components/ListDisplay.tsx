import React from 'react';
import PostList from './PostList';
import {User} from "@supabase/supabase-js";

export declare interface ListDisplayProps {
  activeLink: string | null;
  limit: number;
  handleLoadingMore: () => void;
  fetchedData: DbRecomendation[];
  user: User | null;
}

const ListDisplay = ({activeLink, limit, handleLoadingMore, fetchedData, user}: ListDisplayProps): JSX.Element => (
  <div className="">
    {
      fetchedData.map((item, i) =>
        <PostList
        user={user}
        data={item}
        key={`${item.full_name}_${i}`}
        />
      )
    }
    {
      fetchedData.length > 0
        && activeLink !== 'myVotes'
        && limit <= 100
        &&
        <button
          onClick={() => handleLoadingMore()}
          className="bg-grey hover:bg-lightGrey text-white font-bold py-2 px-4 rounded-xl">
          Load More
        </button>
    }
  </div>
);

export default ListDisplay;
