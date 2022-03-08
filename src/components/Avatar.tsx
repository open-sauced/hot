import React from 'react';
import ReactTooltip from 'react-tooltip';
import { getAvatarLink, getProfileLink } from '../lib/github';

export declare interface AvatarProps {
  contributor: string;
  list?: boolean;
}

const Avatar = ({contributor, list = false}: AvatarProps): JSX.Element => (
  <div
    className= {`bg-blue-400 overflow-hidden rounded-full ${!list ? 'w-10 h-10 mr-3' : 'w-7 sm:w-10 h-7 sm:h-10 mb-2'}`}
    data-tip={contributor}
    data-for={contributor}
  >
    <a
      href={getProfileLink(contributor)}
      title={contributor}
      target="_blank"
      rel="noopener"
    >
      <img
        className='object-cover'
        src={getAvatarLink(contributor)}
        alt={contributor}
        width={500}
        height={500}
      />
    </a>
    <ReactTooltip
      id={contributor}
      type='light'
      className='flex flex-row items-center md:drop-shadow-[0_15px_15px_rgba(0,0,0,0.45)] !opacity-100'/>
  </div>
);

export default Avatar;
