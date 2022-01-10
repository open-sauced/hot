import React from 'react';
import PropTypes from 'prop-types';
import PostGrid from './PostGrid.jsx';

const GridDisplay = ({ fetchedData, activeLink }) => (
    <div>
      <div className=" container grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-screen-xl mx-auto">
        {((activeLink === 'popular' || activeLink === 'upvoted')
            && fetchedData.map((item, i) => <PostGrid data={item} key={i}/>))
          || (((activeLink === 'discussed')
              && fetchedData.sort((a, b) => b.issues - a.issues)
                .map((item, i) => <PostGrid data={item} key={i} />))
            || fetchedData
              .sort((a, b) => a.avg_recency_score - b.avg_recency_score)
              .map((item, i) => <PostGrid data={item} key={i} />))
        }
      </div>
    </div>
);

GridDisplay.propTypes = {
  fetchedData: PropTypes.array.isRequired,
  activeLink: PropTypes.string.isRequired,
};

export default GridDisplay;
