import React, { useState, useEffect } from 'react';
import LayoutToggle from './LayoutToggle';
import Modal from './Modal';
import SecondaryNav from './SecondaryNav';
import GridDisplay from './GridDisplay';
import ListDisplay from './ListDisplay';
import { fetchRecommendations } from '../lib/supabase';
import useSupabaseAuth from '../hooks/useSupabaseAuth';
import { useSearchParams } from 'react-router-dom';

interface PostWrapProps{
  textToSearch: string
}

const PostsWrap = ({ textToSearch } :PostWrapProps): JSX.Element => {
  const [isGrid, setIsGrid] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [fetchedData, setFetchedData] = useState<DbRecomendation[]>([]);
  const [limit, setLimit] = useState(25);
  const { user } = useSupabaseAuth();
  
  const activeLink = searchParams.get('filter') || "popular";
  
  const handleLoadingMore = () => {
    setLimit((prevLimit) => prevLimit + 25);
  };

  const handleLinkChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const button: HTMLButtonElement = e.currentTarget;
    const linkName = button.getAttribute("data-name") || "";
    setLimit(25);
    setSearchParams({ filter: linkName });
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
        handleLinkChange={handleLinkChange}
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
