import React, { useState, useEffect } from 'react';
import LayoutToggle from './LayoutToggle';
import Modal from './Modal';
import SecondaryNav from './SecondaryNav';
import GridDisplay from './GridDisplay';
import ListDisplay from './ListDisplay';
import { fetchRecommendations } from '../lib/supabase';
import useSupabaseAuth from '../hooks/useSupabaseAuth';
import { useLocation, useSearchParams } from 'react-router-dom';

interface PostWrapProps{
  textToSearch: string
}

const locationsHash: { [index: string] : string | undefined } = {
  "/most-popular-repositories": "popular",
  "/most-upvoted-repositories": "upvoted",
  "/most-discussed-repositories": "discussed",
  "/most-recent-repositories": "recent",
  "/my-votes-repositories": "myVotes",
}

const PostsWrap = ({ textToSearch }: PostWrapProps): JSX.Element => {
  const [isGrid, setIsGrid] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [fetchedData, setFetchedData] = useState<DbRecomendation[]>([]);
  const { user } = useSupabaseAuth();
  const location = useLocation();

  const activeLink = locationsHash[location.pathname] || "popular";
  const limit = Number(searchParams.get('limit')) || 25;

  const handleLoadingMore = () => {
    setSearchParams({ limit: String(limit + 25) })
  };

  useEffect(() => {
    fetchRecommendations(activeLink, limit, user, textToSearch).then((data) => {
      setFetchedData(data);
    });
  }, [activeLink, limit, textToSearch]);

  return (
    <>
      <Modal/>
      <SecondaryNav 
        activeLink={activeLink} 
        user={user} 
      />
      <LayoutToggle gridState={isGrid} setGridState={setIsGrid} />
      <div className="bg-darkestGrey py-6 w-full min-h-screen">
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
    </>
  );
};

export default PostsWrap;
