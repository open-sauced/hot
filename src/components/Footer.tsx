import { FaDev, FaDiscord, FaGithub, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = (): JSX.Element => (
  <div>
    <div className="bg-darkestGrey py-14 md:py-16">
      <nav className="container">
        <ul className="flex sm:flex-row text-xl font-righteous text-accent font-bold justify-center items-center cursor-pointer">
          <li className="p-2 sm:mr-5">
            <a
              aria-label="Hot Open Sauced on GitHub"
              href="https://github.com/open-sauced/hot"
              rel="noreferrer"
              target="_blank"
            >
              <FaGithub
                aria-hidden="true"
                className="text-offWhite hover:text-accent"
              />
            </a>
          </li>

          <li className="p-2 sm:mr-5">
            <a
              aria-label="@saucedopen on Twitter"
              href="https://twitter.com/saucedopen"
              rel="noreferrer"
              target="_blank"
            >
              <FaTwitter
                aria-hidden="true"
                className="text-offWhite hover:text-accent"
              />
            </a>
          </li>

          <li className="p-2 sm:mr-5">
            <a
              aria-label="Open Sauced on Discord"
              href="https://discord.com/invite/U2peSNf23P"
              rel="noreferrer"
              target="_blank"
            >
              <FaDiscord
                aria-hidden="true"
                className="text-offWhite hover:text-accent"
              />
            </a>
          </li>

          <li className="p-2 sm:mr-5">
            <a
              aria-label="Open Sauced on Discord"
              href="https://www.youtube.com/opensauced"
              rel="noreferrer"
              target="_blank"
            >
              <FaYoutube
                aria-hidden="true"
                className="text-offWhite hover:text-accent"
              />
            </a>
          </li>

          <li className="p-2 sm:mr-5">
            <a
              aria-label="Open Sauced on dev.to"
              href="https://www.dev.to/opensauced"
              rel="noreferrer"
              target="_blank"
            >
              <FaDev
                aria-hidden="true"
                className="text-offWhite hover:text-accent"
              />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
);

export default Footer;
