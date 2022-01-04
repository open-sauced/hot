import React, { useState } from 'react';

import Modal from './Modal.jsx';
import PostGrid from './PostGrid.jsx';
import PostList from './PostList.jsx';
import LayoutToggle from './LayoutToggle.jsx';

import postData from '../data/hot.json';

const PostsWrap = () => {
  const [isGrid, setIsGrid] = useState(true);
  return (
    <>
      <Modal />
      <LayoutToggle gridState={isGrid} setGridState={setIsGrid} />
      <div className="bg-darkestGrey py-6 w-full min-h-screen">
        {isGrid ? (
          <div className=" container grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
            {postData.map((item, i) => (
              <PostGrid data={item} key={i} contri={item.contributors[0]}/>
            ))}
          </div>
        ) : (
          <div className=" container space-y-3 ">
            {postData.map((item, i) => (
              <PostList data={item} key={i} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PostsWrap;
