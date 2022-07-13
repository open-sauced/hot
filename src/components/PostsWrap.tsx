import React, { useState, useEffect } from 'react';
import LayoutToggle from './LayoutToggle';
import SecondaryNav from './SecondaryNav';
import GridDisplay from './GridDisplay';
import ListDisplay from './ListDisplay';
import { fetchRecommendations } from '../lib/supabase';
import useSupabaseAuth from '../hooks/useSupabaseAuth';
import PrimaryNav from './PrimaryNav';
import pizza from '../../public/pizza.svg'


const PostsWrap = (): JSX.Element => {
  const [isGrid, setIsGrid] = useState(true);
  const [activeLink, setActiveLink] = useState('popular');
  const [fetchedData, setFetchedData] = useState<DbRecomendation[]>([]);
  const [limit, setLimit] = useState(25);
  const { user } = useSupabaseAuth();
  const handleLoadingMore = () => {
    setLimit((prevLimit) => prevLimit + 25);
  };
  const [textToSearch, setTextToSearch ] = useState<string>("")

  useEffect(() => {
    fetchRecommendations(activeLink, limit, user, textToSearch).then((data) => {
      setFetchedData(data);
    });
  }, [activeLink, limit, textToSearch]);


  return (
    <div className='mx-auto max-w-6xl'>
      <div className='flex items-center gap-[20px] px-[5px] tablet:px-0 mb-[20px] mt-[165px]'>
        <img src={pizza} alt="" />
        <p className='uppercase font-bold text-gray50 text-[36px] leading-[54px] tracking-[-3%] '>project</p>
      </div>

      <div className='flex md:gap-y-0 gap-y-[15px] flex-col tablet:flex-row border-t-[1px] tablet:justify-between border-gray-200 pt-[20px] pb-[70px]'>
        <PrimaryNav setTextToSearch={setTextToSearch}  />
        <SecondaryNav
          setLimit={setLimit}
          activeLink={activeLink}
          setActiveLink={setActiveLink}
          user={user}
        />
        <LayoutToggle gridState={isGrid} setGridState={setIsGrid} />
      </div>

      <div className=" py-6 w-full min-h-screen">
        {isGrid ?
          <GridDisplay
            limit={limit}
            activeLink={activeLink}
            handleLoadingMore={handleLoadingMore}
            user={user}
            fetchedData={fetchedData} /> :

          <ListDisplay
            limit={limit}
            activeLink={activeLink}
            handleLoadingMore={handleLoadingMore}
            user={user}
            fetchedData={fetchedData} />
        }
      </div>
    </div>
  );
};

export default PostsWrap;
