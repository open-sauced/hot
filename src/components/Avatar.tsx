import React from 'react';
import { getAvatarLink, getProfileLink } from '../lib/github';
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import cx from "classnames";
export declare interface AvatarProps {
  contributor: string;
  list?: boolean;
}

const Avatar = ({contributor, list = false}: AvatarProps): JSX.Element => (
  <HoverCardPrimitive.Root>
  <HoverCardPrimitive.Trigger asChild>
    <div
      className={cx(
        "inline-flex h-12 w-12 items-center justify-center rounded-full bg-white mr-3 dark:bg-white"
      )}
    >
       <img
        className='object-cover rounded-full'
        src={getAvatarLink(contributor)}
        alt={contributor}
        width={500}
        height={500}
      />    </div>
  </HoverCardPrimitive.Trigger>
  <HoverCardPrimitive.Content
    align="center"
    sideOffset={4}
    className={cx(
      " radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
      "max-w-md rounded-lg p-4 md:w-full",
      "bg-white dark:bg-gray-800",
      "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
    )}
  >
    <HoverCardPrimitive.Arrow className="fill-current text-white dark:text-gray-800" />

  <div className="flex h-full w-full space-x-4">
    <div
      className={cx(
        "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900"
      )}
    >
    <a
      href={getProfileLink(contributor)}
      title={contributor}
      target="_blank"
    >
      <img
        className='object-cover rounded-full'
        src={getAvatarLink(contributor)}
        alt={contributor}
        width={500}
        height={500}
      />
    </a>
    </div>

    <div>
      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
        {contributor}
      </h3>

      <p className="mt-1 text-sm font-normal text-gray-700 dark:text-gray-400">
        Last contribution was X mins ago.
      </p>
    </div>
    </div>
    </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Root>
);

export default Avatar;
