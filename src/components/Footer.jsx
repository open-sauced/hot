import React from 'react';

const Footer = () => (
 <div>
      <div className="bg-darkestGrey py-14 md:py-16">
        <nav className="container">
          <ul className="flex sm:flex-row text-xl font-righteous text-accent font-bold justify-center items-center cursor-pointer">
            <li
              className="p-2 sm:mr-5"
            >

              <a target="_blank" href="https://github.com/open-sauced/hot" rel="noreferrer">
                <i className="fab fa-github text-offWhite hover:text-accent "></i>
              </a>
            </li>
            <li
              className="p-2 sm:mr-5"
            >
              <a target="_blank" href="https://twitter.com/saucedopen" rel="noreferrer">
                <i className="fab fa-twitter text-offWhite hover:text-accent "></i>
              </a>
            </li>
            <li
              className="p-2 sm:mr-5"
            >
              <a target="_blank" href="https://discord.com/invite/U2peSNf23P" rel="noreferrer">
                <i className="fab fa-discord text-offWhite hover:text-accent "></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
);

export default Footer;
