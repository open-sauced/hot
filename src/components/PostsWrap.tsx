import React, { useState, useEffect } from 'react';
import LayoutToggle from './LayoutToggle';
import Modal from './Modal';
import SecondaryNav from './SecondaryNav';
import GridDisplay from './GridDisplay';
import ListDisplay from './ListDisplay';
import { fetchRecommendations } from '../lib/supabase';
import useSupabaseAuth from '../hooks/useSupabaseAuth';
import PrimaryNav from './PrimaryNav';

interface PostWrapProps{
  textToSearch: string
}

const PostsWrap = ({  } :PostWrapProps): JSX.Element => {
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
    <>
      <PrimaryNav setTextToSearch={setTextToSearch}  />
      <SecondaryNav
        setLimit={setLimit}
        activeLink={activeLink}
        setActiveLink={setActiveLink}
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
