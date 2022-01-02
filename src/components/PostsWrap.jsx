import { useState } from "react";
import LayoutToggle from "./LayoutToggle";
import PostGrid from "./PostGrid.jsx";
import PostList from "./PostList.jsx";
import postData from "../data/hot.json";
import Modal from "../components/Modal";
import SecondaryNav from "./SecondaryNav";
import GridDisplay from "./GridDisplay";
import ListDisplay from "./ListDisplay";

const PostsWrap = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [activeLink, setActiveLink] = useState("popular");
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
