import React, { useState } from 'react';
import LayoutToggle from './LayoutToggle.jsx';

import postData from '../data/hot.json';
import Modal from './Modal.jsx';
import SecondaryNav from './SecondaryNav.jsx';
import GridDisplay from './GridDisplay.jsx';
import ListDisplay from './ListDisplay.jsx';

const PostsWrap = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [activeLink, setActiveLink] = useState('popular');
  const fetchedData = [...postData];

  return (
    <>
      <Modal />
      <SecondaryNav activeLink={activeLink} setActiveLink={setActiveLink} />
      <LayoutToggle gridState={isGrid} setGridState={setIsGrid} />
      <div className="bg-darkestGrey py-6 w-full min-h-screen">
        {isGrid ? (
          <GridDisplay fetchedData={fetchedData} activeLink={activeLink} />
        ) : (
          <ListDisplay fetchedData={fetchedData} activeLink={activeLink} />
        )}
      </div>
    </>
  );
};

export default PostsWrap;
