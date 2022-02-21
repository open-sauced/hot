import React, { useState, useEffect } from 'react';
import LayoutToggle from './LayoutToggle.jsx';

import Modal from './Modal.jsx';
import SecondaryNav from './SecondaryNav.jsx';
import Footer from './Footer.jsx';
import GridDisplay from './GridDisplay.jsx';
import ListDisplay from './ListDisplay.jsx';
import { fetchRecommendations, fetchMyVotes } from '../lib/database';
import useSupabaseAuth from '../hooks/useSupabaseAuth';

const activeLinkColumns = {
  popular: { orderBy: 'total_stars' },
  upvoted: { orderBy: 'votes' },
  discussed: { orderBy: 'issues' },
  recent: { orderBy: 'avg_recency_score' },
  myVotes: { orderBy: 'my_votes' },
};

const PostsWrap = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [activeLink, setActiveLink] = useState('popular');
  const [fetchedData, setFetchedData] = useState([]);
  const [limit, setLimit] = useState(25);
  const { user } = useSupabaseAuth();

  const handleLoadingMore = () => {
    console.log(limit)
    setLimit(prevLimit => prevLimit + 25);
  };

  useEffect(() => {
    if (activeLink === 'myVotes') {
      fetchMyVotes(user).then((data) => {
        setFetchedData(data);
      });
      return;
    }
    const { orderBy } = activeLinkColumns[activeLink];
    fetchRecommendations(orderBy, limit).then((data) => {
      setFetchedData(data);
    });
  }, [activeLink, limit]);

  return (
    <>
      <Modal />
      <SecondaryNav activeLink={activeLink} setActiveLink={setActiveLink} user={user} />
      <LayoutToggle gridState={isGrid} setGridState={setIsGrid} />
      <div className="bg-darkestGrey py-6 w-full min-h-screen">
        {isGrid ? <GridDisplay limit={limit} handleLoadingMore={handleLoadingMore} user={user} fetchedData={fetchedData} />
          : <ListDisplay limit={limit} handleLoadingMore={handleLoadingMore} user={user} fetchedData={fetchedData} />}
      </div>
      <Footer />
    </>
  );
};

export default PostsWrap;
