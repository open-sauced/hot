import React from 'react';
import PostList from './PostList';
import {User} from "@supabase/supabase-js";
import popularIcon from "../assets/popularIcon.svg"

export declare interface ListDisplayProps {
  activeLink: string | null;
  limit: number;
  handleLoadingMore: () => void;
  fetchedData: DbRecomendation[];
  user: User | null;
}

const ListDisplay = ({activeLink, limit, handleLoadingMore, fetchedData, user}: ListDisplayProps): JSX.Element => (
  <div className="mx-auto max-w-7xl px-[16px] mt-[40px]">
    <div className='flex flex-col gap-y-[20px]'>
      <div className='flex items-center gap-x-[10px]'>
        <img className='w-[26px] h-[26px]' src={popularIcon} alt="Popular" />
        <h1 className='text-[24px]'>Popular repositories</h1>
      </div>
      {
        fetchedData.map((item, i) =>
          <PostList
          user={user}
          data={item}
          key={`${item.full_name}_${i}`}
          />
        )
      }
    </div>

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
