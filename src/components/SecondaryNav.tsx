import React from "react";
import { User } from "@supabase/supabase-js";
import { Link } from "react-router-dom";

export declare type SecondaryNavProps = {
  activeLink: string | null;
  user: User | null;
};

const SecondaryNav = ({ activeLink, user }: SecondaryNavProps): JSX.Element => {
  const links = [
    {
      link: "popular",
      title: "Popular",
    },
    {
      link: "upvoted",
      title: "Upvoted",
    },
    {
      link: "discussed",
      title: "Discussed",
    },
    {
      link: "recent",
      title: "Recent",
    },
  ];
  user &&
    links.push({
      link: "myVotes",
      title: "My Votes",
    });

  return (
    <div>
      <div className="bg-darkestGrey py-14 md:py-16">
        <nav className="container">
          <div className="flex flex-col space-y-2 sm:flex-row text-xl font-righteous text-accent font-bold justify-center items-baseline cursor-pointer">
            {links.map(({ link, title }) => (
              <Link key={link} to={link}>
                <span
                  className={`${
                    activeLink === link ? "bg-cheesyYellow text-grey " : " "
                  } rounded-xl font-bold hover:text-saucyRed transition-all duration-300 mr-3 p-2 sm:mr-11`}
                >
                  {title}
                </span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default SecondaryNav;
