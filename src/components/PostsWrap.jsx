import React, { useState, useEffect } from "react";
import LayoutToggle from "./LayoutToggle.jsx";

import Modal from "./Modal.jsx";
import SecondaryNav from "./SecondaryNav.jsx";
import GridDisplay from "./GridDisplay.jsx";
import ListDisplay from "./ListDisplay.jsx";
import { fetchRecommendations } from "../lib/database";

const activeLinkColumns = {
  popular: { orderBy: "total_stars" },
  upvoted: { orderBy: "votes" },
  discussed: { orderBy: "issues" },
  recent: { orderBy: "avg_recency_score" },
};

const PostsWrap = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [activeLink, setActiveLink] = useState("popular");
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    const { orderBy } = activeLinkColumns[activeLink];
    fetchRecommendations(orderBy).then((data) => {
      setFetchedData(data);
    });
  }, [activeLink]);

  return (
    <>
      <Modal />
      <SecondaryNav activeLink={activeLink} setActiveLink={setActiveLink} />
      <LayoutToggle gridState={isGrid} setGridState={setIsGrid} />
      <div className="bg-darkestGrey py-6 w-full min-h-screen">
        {isGrid ? <GridDisplay fetchedData={fetchedData} /> : <ListDisplay fetchedData={fetchedData} />}
      </div>
    </>
  );
};

export default PostsWrap;
