import React from 'react';
import {User} from "@supabase/supabase-js";

export declare interface SecondaryNavProps {
  setLimit: (limit: number) => void;
  activeLink: string | null;
  setActiveLink: (link: string | null) => void;
  user: User | null;
}

const SecondaryNav = ({setLimit, activeLink, setActiveLink, user}: SecondaryNavProps): JSX.Element => {
  const handleChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const button: HTMLButtonElement = e.currentTarget;
    const linkName = button.getAttribute('data-name');
    setLimit(25);
    setActiveLink(linkName);
  };
  const links = [
    {
      link: 'popular',
      title: 'Popular',
    },
    {
      link: 'upvoted',
      title: 'Upvoted',
    },
    {
      link: 'discussed',
      title: 'Discussed',
    },
    {
      link: 'recent',
      title: 'Recent',
    },
  ];
  user && links.push({
    link: 'myVotes',
    title: 'My Votes',
  });

  return (
    <div>
      <div className="bg-darkestGrey py-14 md:py-16">
        <nav className="container">
          <div className="flex flex-col space-y-2 sm:flex-row text-xl font-righteous text-accent font-bold justify-center items-center cursor-pointer">
            {links.map(({link, title}) => (
              <button
                key={`${link}-nav-button`}
                data-name={link}
                onClick={(e) => handleChange(e)}
                className={`${
                  activeLink === link ? 'bg-cheesyYellow text-grey ' : ' '
                } rounded-xl font-bold hover:text-saucyRed transition-all duration-300 mr-3 p-2 sm:mr-11`}
              >
                {title}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default SecondaryNav;
