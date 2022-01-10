import React from 'react';
import PropTypes from 'prop-types';
import PostList from './PostList.jsx';

const ListDisplay = ({ fetchedData, activeLink }) => (
    <div>
      <div className=" container space-y-3 max-w-screen-xl mx-auto ">
        {((activeLink === 'popular' || activeLink === 'upvoted')
          && fetchedData.map((item, i) => <PostList data={item} key={i}/>))
          || (((activeLink === 'discussed')
            && fetchedData.sort((a, b) => b.issues - a.issues)
              .map((item, i) => <PostList data={item} key={i} />))
            || fetchedData
              .sort((a, b) => a.avg_recency_score - b.avg_recency_score)
              .map((item, i) => <PostList data={item} key={i} />))
        }
      </div>
    </div>
);

ListDisplay.propTypes = {
  fetchedData: PropTypes.array.isRequired,
  activeLink: PropTypes.string.isRequired,
};

export default ListDisplay;
