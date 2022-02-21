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
  const { user } = useSupabaseAuth();

  useEffect(() => {
    if (activeLink === 'myVotes') {
      fetchMyVotes(user).then((data) => {
        setFetchedData(data);
      });
      return;
    }
    const { orderBy } = activeLinkColumns[activeLink];
    fetchRecommendations(orderBy).then((data) => {
      setFetchedData(data);
    });
  }, [activeLink]);

  return (
    <>
      <Modal />
      <SecondaryNav activeLink={activeLink} setActiveLink={setActiveLink} user={user} />
      <LayoutToggle gridState={isGrid} setGridState={setIsGrid} />
      <div className="bg-darkestGrey py-6 w-full min-h-screen">
        {isGrid ? <GridDisplay user={user} fetchedData={fetchedData} />
          : <ListDisplay user={user} fetchedData={fetchedData} />}
      </div>
      <Footer />
    </>
  );
};

export default PostsWrap;
