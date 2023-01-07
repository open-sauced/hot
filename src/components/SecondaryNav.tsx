import { Link, useLocation } from "react-router-dom";
import useSupabaseAuth from "../hooks/useSupabaseAuth";
import locationsHash from "../lib/locationsHash";
import { RepoOrderByEnum } from "./RepoListWrap";

const SecondaryNav = (): JSX.Element => {
  const { userAndTokens } = useSupabaseAuth();
  const location = useLocation();
  const activeLink = (locationsHash[location.pathname] ?? "recent") as keyof typeof RepoOrderByEnum;

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

  userAndTokens &&
    links.push({
      link: "myVotes",
      title: "My Votes",
    });

  return (
    <div>
      <div className="bg-darkestGrey py-12 md:py-16 ">
        <nav className="container">
          <div className="flex space-y-3 flex-row flex-wrap text-sm sm:text-xl font-righteous text-accent font-bold justify-center items-baseline cursor-pointer">
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
