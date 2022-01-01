import React from "react";
import PostList from "./PostList";

const ListDisplay = ({ fetchedData, activeLink }) => {
  return (
    <div>
      <div className=" container space-y-3 ">
        {activeLink == "popular"
          ? fetchedData.map((item, i) => <PostList data={item} key={i} />)
          : activeLink == "upvoted"
          ? fetchedData.map((item, i) => <PostList data={item} key={i} />)
          : activeLink == "discussed"
          ? fetchedData.sort((a, b) => b.issues - a.issues).map((item, i) => <PostList data={item} key={i} />)
          : fetchedData
              .sort((a, b) => b.avg_recency_score - a.avg_recency_score)
              .map((item, i) => <PostList data={item} key={i} />)}
      </div>
    </div>
  );
};

export default ListDisplay;
