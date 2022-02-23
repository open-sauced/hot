import React from 'react';
import PropTypes from 'prop-types';
import PostList from './PostList.jsx';

const ListDisplay = ({
  activeLink, limit, handleLoadingMore, fetchedData, user,
}) => (
    <div>
      <div className=" container space-y-3 max-w-screen-xl mx-auto ">
        {fetchedData.map((item, i) => <PostList user={user} data={item} key={`${item.repo_name}_${i}`} />)}
        {fetchedData.length > 0 && activeLink !== 'myVotes' && limit <= 100
          && <button onClick={() => handleLoadingMore()}
            className="bg-grey hover:bg-lightGrey text-white font-bold py-2 px-4 rounded-xl">
            Load More
          </button>
        }
      </div>
    </div>
);

ListDisplay.propTypes = {
  fetchedData: PropTypes.array.isRequired,
  user: PropTypes.object,
  limit: PropTypes.number,
  handleLoadingMore: PropTypes.func,
  activeLink: PropTypes.string,
};

export default ListDisplay;
