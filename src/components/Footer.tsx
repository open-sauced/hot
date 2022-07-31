import { FaGithub, FaTwitter, FaDiscord, FaYoutube, FaDev } from "react-icons/fa";

const Footer = (): JSX.Element => (
  <div>
    <div className="bg-darkestGrey py-14 md:py-16">
      <nav className="container">
        <ul className="flex sm:flex-row text-xl font-righteous text-accent font-bold justify-center items-center cursor-pointer">
          <li className="p-2 sm:mr-5">
            <a target="_blank" href="https://github.com/open-sauced/hot" rel="noreferrer" aria-label="Hot Open Sauced on GitHub">
              <FaGithub aria-hidden="true" className="text-offWhite hover:text-accent" />
            </a>
          </li>
          <li className="p-2 sm:mr-5">
            <a target="_blank" href="https://twitter.com/saucedopen" rel="noreferrer" aria-label="@saucedopen on Twitter">
              <FaTwitter aria-hidden="true" className="text-offWhite hover:text-accent" />
            </a>
          </li>
          <li className="p-2 sm:mr-5">
            <a target="_blank" href="https://discord.com/invite/U2peSNf23P" rel="noreferrer" aria-label="Open Sauced on Discord">
              <FaDiscord aria-hidden="true" className="text-offWhite hover:text-accent" />
            </a>
          </li>
          <li className="p-2 sm:mr-5">
            <a target="_blank" href="https://www.youtube.com/opensauced" rel="noreferrer" aria-label="Open Sauced on Discord">
              <FaYoutube aria-hidden="true" className="text-offWhite hover:text-accent" />
            </a>
          </li>
          <li className="p-2 sm:mr-5">
            <a target="_blank" href="https://www.dev.to/opensauced" rel="noreferrer" aria-label="Open Sauced on dev.to">
              <FaDev aria-hidden="true" className="text-offWhite hover:text-accent" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
);

export default Footer;
