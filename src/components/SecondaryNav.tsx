import { User } from "@supabase/supabase-js";
import { Link } from "react-router-dom";

export declare interface SecondaryNavProps {
  activeLink: string | null;
  user?: User;
}

const SecondaryNav = ({ activeLink, user }: SecondaryNavProps): JSX.Element => {
  const links = [
    {
      link: "recent",
      title: "Recent",
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
      link: "popular",
      title: "Popular",
    },
  ];

  user &&
    links.push(
      {
        link: "myVotes",
        title: "My Votes",
      },
      {
        link: "myStars",
        title: "My Stars",
      },
    );

  return (
    <div>
      <div className="bg-darkestGrey py-14 md:py-16">
        <nav className="container">
          <div className="flex space-y-2 flex-row text-sm sm:text-xl font-righteous text-accent font-bold justify-center items-baseline cursor-pointer">
            {links.map(({ link, title }) => (
              <Link
                key={link}
                to={link}
              >
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
