import React, { useState } from "react";

const SecondaryNav = ({ activeLink, setActiveLink }) => {
  const handleChange = (e) => {
    e.preventDefault();
    const linkName = e.target.getAttribute("data-name");
    setActiveLink(linkName);
  };
  return (
    <div>
      <div className="bg-darkestGrey py-14 md:py-16">
        <nav className="container">
          <ul className="flex flex-col space-y-2 sm:flex-row text-xl font-righteous text-accent font-bold justify-center items-center cursor-pointer">
            <li
              data-name="popular"
              onClick={(e) => handleChange(e)}
              className={`${
                activeLink === "popular" ? "bg-cheesyYellow rounded-xl text-grey " : " "
              } hover:text-saucyRed transition-all duration-300 mr-3 p-2 sm:mr-11`}
            >
              Popular
            </li>
            <li
              data-name="upvoted"
              onClick={(e) => handleChange(e)}
              className={`${
                activeLink === "upvoted" ? "bg-cheesyYellow rounded-xl text-grey " : " "
              } hover:text-saucyRed transition-all duration-300 mr-3 p-2 sm:mr-11`}
            >
              Upvoted
            </li>
            <li
              data-name="discussed"
              onClick={(e) => handleChange(e)}
              className={`${
                activeLink === "discussed" ? "bg-cheesyYellow rounded-xl text-grey " : " "
              } hover:text-saucyRed transition-all duration-300 mr-3 p-2 sm:mr-11`}
            >
              Discussed
            </li>
            <li
              data-name="recent"
              onClick={(e) => handleChange(e)}
              className={`${
                activeLink === "recent" ? "bg-cheesyYellow rounded-xl text-grey " : " "
              } hover:text-saucyRed transition-all duration-300 mr-3 p-2 sm:mr-11`}
            >
              Recent
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SecondaryNav;
