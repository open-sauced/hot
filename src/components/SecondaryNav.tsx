import React from 'react';
import {User} from "@supabase/supabase-js";

export declare interface SecondaryNavProps {
  setLimit: (limit: number) => void;
  activeLink: string | null;
  setActiveLink: (link: string) => void;
  user: User | null;
}

const SecondaryNav = ({setLimit, activeLink, setActiveLink, user}: SecondaryNavProps): JSX.Element => {
  const handleChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const button: HTMLButtonElement = e.currentTarget;
    const linkName = button.getAttribute('data-name') || '';
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
        <nav className="container">
          <div className="flex flex-col sm:flex-row text-[14px] text-gray-400 font-bold justify-center items-center cursor-pointer">
            {links.map(({link, title}) => (
              <button
                key={`${link}-nav-button`}
                data-name={link}
                onClick={(e) => handleChange(e)}
                className={`${
                  activeLink === link ? 'border-b-osSauce' : 'border-b-white'
                } border-b-[3px] font-bold hover:text-osSauce uppercase transition-all duration-300 p-2 sm:mr-11`}
              >
                {title}
              </button>
            ))}
          </div>
        </nav>
    </div>
  );
};

export default SecondaryNav;
