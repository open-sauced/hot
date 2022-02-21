import React from 'react';
import PropTypes from 'prop-types';
import PostGrid from './PostGrid.jsx';

const GridDisplay = ({ limit, handleLoadingMore, fetchedData, user }) => (
  <div>
    <div className=" container grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-screen-xl mx-auto">
      {fetchedData.map((item, i) => (
        <PostGrid user={user} data={item} key={`${item.repo_name}_${i}`} />
      ))}
        {limit <= 100 && <button onClick={() => handleLoadingMore()} className="bg-grey hover:bg-lightGrey text-white font-bold py-2 px-4 rounded-xl">Load More</button>}
    </div>
  </div>
);

GridDisplay.propTypes = {
  fetchedData: PropTypes.array.isRequired,
  user: PropTypes.object,
};

export default GridDisplay;
