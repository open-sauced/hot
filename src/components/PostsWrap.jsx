import { useState } from "react";
import LayoutToggle from "./LayoutToggle";
import PostGrid from "./PostGrid.jsx";
import PostList from "./PostList.jsx";
import postData from '../data/posts.json';
import Modal from '../components/Modal';
const PostsWrap = () => {
  const [isGrid, setIsGrid] = useState(true);

  return (
    <>
      <Modal />
      <LayoutToggle gridState={isGrid} setGridState={setIsGrid} />
      <div className="bg-darkestGrey py-6 w-full min-h-screen">
        {isGrid ? (
          <div className=" container grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6  gap-4 ">
            {postData.map((item, i) => (
              <PostGrid  data={item} key={i} />
            ))}
          </div>
        ) : (
          <div className=" container grid gap-3 ">
            {postData.map((item, i) => (
              <PostList  data={item} key={i} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PostsWrap;
