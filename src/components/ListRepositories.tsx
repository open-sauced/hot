import React from 'react';
import PostList from './PostList';
import {User} from "@supabase/supabase-js";
import popularIcon from "../assets/popularIcon.svg"
import camelCaseToTitleCase from "../lib/camelCaseToTitleCase";

export declare interface ListRepositoriesProps {
  activeLink: string | null;
  limit: number;
  handleLoadingMore: () => void;
  fetchedData: DbRecomendation[];
  user: User | null;
}

const ListRepositories = ({activeLink, limit, handleLoadingMore, fetchedData, user}: ListRepositoriesProps): JSX.Element => (
  <div className="mx-auto max-w-7xl px-[16px] mt-[40px]">
    <div className='flex flex-col gap-y-[20px]'>
      <div className='flex items-center gap-x-[10px]'>
        <img className='w-[26px] h-[26px]' src={popularIcon} alt="Popular" />
        {activeLink && <h1 className='text-[24px] text-white font-semibold'>{camelCaseToTitleCase(activeLink)} Repositories</h1>}
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
        <div className='flex justify-center'>
          <button
            onClick={() => handleLoadingMore()}
            className="bg-white text-gray-700 mt-[15px] mb-[15px] text-[15px] border-gray-400 border-[1px] font-normal py-1 px-4 rounded-[5px] ">
            Load More
          </button>
        </div>
    }
  </div>
);

export default ListRepositories;
