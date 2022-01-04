/* eslint-disable */
import React from 'react';
import ReactTooltip from 'react-tooltip';

import getAvatar from '../lib/getAvatar';

const Avatar = ({contributor, type = false, handleRedirect}) => (
  <div
    className= {`bg-blue-400 overflow-hidden rounded-full ${!type ? 'w-10 h-10 mr-3' : 'w-7 sm:w-10 h-7 sm:h-10 mb-2'}`}
    data-tip={contributor}
    data-for={contributor}
  >
    <img
      className='object-cover'
      src={getAvatar(contributor)}
      alt={contributor}
      width={500}
      height={500}
      onClick={() => handleRedirect(contributor)}
    />
<<<<<<< HEAD
    <ReactTooltip id={contributor} type='light' className='flex flex-row items-center md:drop-shadow-[0_15px_15px_rgba(0,0,0,0.45)] !opacity-100'/>
=======
    <ReactTooltip id={contributor} type='light' className="flex flex-row items-center md:drop-shadow-[0_15px_15px_rgba(0,0,0,0.45)]"/>
>>>>>>> 0e911ea8ac81c074bab84ffd92ea66962da84025
  </div>
);
export default Avatar;
