import React from 'react';
import { getAvatarLink, getProfileLink } from '../lib/github';
import * as HoverCard from '@radix-ui/react-hover-card';
import cx from "classnames";
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
    <HoverCard.Root>
      <HoverCard.Trigger>
        <a
          href={getProfileLink(contributor)}
          title={contributor}
          target="_blank"
        >
          <img
            className='object-cover'
            src={getAvatarLink(contributor)}
            alt={contributor}
            width={500}
            height={500}
          />
        </a>
      </HoverCard.Trigger>
      <HoverCard.Content
      align="center"
      sideOffset={4}
      className={cx(
        " radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
        "max-w-md rounded-lg p-4 md:w-full",
        "bg-white dark:bg-gray-800",
        "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
      )}
      >
        {contributor}
      </HoverCard.Content>
    </HoverCard.Root>
  </div>
);

export default Avatar;
