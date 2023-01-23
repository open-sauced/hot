import { getAvatarLink, getProfileLink } from "../lib/github";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import cx from "classnames";
import getDateFromNow from "../lib/getDatefromNow";

export declare interface AvatarProps {
  contributor: string;
  lastPr?: string;
  list?: boolean;
}

const Avatar = ({ contributor, lastPr }: AvatarProps): JSX.Element => (
  <HoverCardPrimitive.Root>
    <HoverCardPrimitive.Trigger asChild>
      <img
        alt={contributor}
        className="w-full h-full"
        height={500}
        src={getAvatarLink(contributor)}
        width={500}
      />
    </HoverCardPrimitive.Trigger>

    <HoverCardPrimitive.Content
      align="center"
      sideOffset={4}
      className={cx(
        " radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
        "max-w-md rounded-lg p-4 md:w-full",
        "bg-white dark:bg-gray-800",
        "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75",
        "items-center md:drop-shadow-[0_15px_15px_rgba(0,0,0,0.45)] !opacity-100",
      )}
    >
      <HoverCardPrimitive.Arrow
        className="fill-current text-white dark:text-gray-800"
        offset={12}
      />

      <div className="flex h-full w-full space-x-4">
        <div
          className={cx(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900",
          )}
        >
          <a
            href={getProfileLink(contributor)}
            rel="noreferrer"
            target="_blank"
            title={contributor}
          >
            <img
              alt={contributor}
              className="object-cover rounded-full"
              height={500}
              src={getAvatarLink(contributor)}
              width={500}
            />
          </a>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {contributor}
          </h3>

          <p className="mt-1 text-sm font-normal text-gray-700 dark:text-gray-400">
            {`Last contribution was ${getDateFromNow(lastPr ?? "")}.`}
          </p>
        </div>
      </div>
    </HoverCardPrimitive.Content>
  </HoverCardPrimitive.Root>
);

export default Avatar;
