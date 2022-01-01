import React from "react";
import PostGrid from "./PostGrid";

const GridDisplay = ({ fetchedData, activeLink }) => {
  return (
    <div>
      <div className=" container grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        {activeLink == "popular"
          ? fetchedData.map((item, i) => <PostGrid data={item} key={i} />)
          : activeLink == "upvoted"
          ? fetchedData.map((item, i) => <PostGrid data={item} key={i} />)
          : activeLink == "discussed"
          ? fetchedData.sort((a, b) => b.issues - a.issues).map((item, i) => <PostGrid data={item} key={i} />)
          : fetchedData
              .sort((a, b) => b.avg_recency_score - a.avg_recency_score)
              .map((item, i) => <PostGrid data={item} key={i} />)}
      </div>
    </div>
  );
};

export default GridDisplay;
