import React, { useState, useEffect } from 'react';
import LayoutToggle from './LayoutToggle';
import Modal from './Modal';
import SecondaryNav from './SecondaryNav';
import GridDisplay from './GridDisplay';
import ListDisplay from './ListDisplay';
import { fetchRecommendations, fetchMyVotes } from '../lib/supabase';
import useSupabaseAuth from '../hooks/useSupabaseAuth';

const activeLinkColumns = {
  popular: { orderBy: 'total_stars' },
  upvoted: { orderBy: 'votes' },
  discussed: { orderBy: 'issues' },
  recent: { orderBy: 'avg_recency_score' },
  myVotes: { orderBy: 'my_votes' },
};

const PostsWrap = (): JSX.Element => {
  const [isGrid, setIsGrid] = useState(true);
  const [activeLink, setActiveLink] = useState<any>('popular');
  const [fetchedData, setFetchedData] = useState<DbRecomendation[] | DbVote[]>([]);
  const [limit, setLimit] = useState(25);
  const { user } = useSupabaseAuth();
  const handleLoadingMore = () => {
    setLimit((prevLimit) => prevLimit + 25);
  };

  useEffect(() => {
    if (activeLink === 'myVotes') {
      fetchMyVotes(user).then((data) => {
        setFetchedData(data);
      });
      return;
    }
    const { orderBy } = (activeLinkColumns as any)[activeLink];
    fetchRecommendations(orderBy, limit).then((data) => {
      setFetchedData(data);
    });
  }, [activeLink, limit]);

  return (
    <>
      <Modal/>
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
