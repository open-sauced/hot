import { FaDev, FaDiscord } from "react-icons/fa";
import OpenSaucedLogo from "../assets/openSauced-icon.png";

// icons
import
{
  AiOutlineTwitter,
  AiOutlineGithub,
  AiFillInstagram,
  AiFillYoutube,
} from "react-icons/ai";


const footerContext = [
  {
    privacy: { url: "https://app.termly.io/document/privacy-policy/5e303854-d262-468a-80ec-54b645d01c2e", text: "Privacy" },
    terms: { url: "https://app.termly.io/document/terms-of-use-for-saas/03e4e1c1-53ad-4fc4-b415-5c3f0e8c25ef", text: "Terms" },
    status: { url: "https://status.opensauced.pizza", text: "Status" },
  },
  {
    hot: { url: "https://hot.opensauced.pizza", text: "hot.opensauced.pizza" },
    openSauced: { url: "https://opensauced.pizza", text: "opensauced.pizza" },
  },
  {
    socials: [
      {
        icon: AiOutlineTwitter,
        label: "Twitter",
        url: "https://twitter.com/saucedopen",
      },
      {
        icon: AiOutlineGithub,
        label: "GitHub",
        url: "https://github.com/open-sauced",
      },
      {
        icon: AiFillInstagram,
        label: "Instagram",
        url: "https://www.instagram.com/opensauced/",
      },
      {
        icon: AiFillYoutube,
        label: "YouTube",
        url: "https://www.youtube.com/opensauced",
      },
      {
        icon: FaDiscord,
        label: "Discord",
        url: "https://discord.com/invite/U2peSNf23P",
      },
      {
        icon: FaDev,
        label: "Devto",
        url: "https://dev.to/opensauced/",
      },
    ],
  },
];

const Footer = (): JSX.Element => (
  <div>
    <footer className="px-6 md:px-16 w-full bg-light-slate-2 transition">
      <div className=" font-medium lg:border-t lg:py-8 lg:items-center lg:justify-between lg:gap-x-4 flex flex-col gap-y-4 lg:flex-row py-2 w-full">
        <div className="text-center lg:text-left justify-center gap-1 flex items-center">
          <div className="w-6 h-6 relative !min-w-[24px] min-h-[24px]">
            <img
              alt="brand logo"
              src={OpenSaucedLogo}
            />
          </div>

          <span className="lg:hidden font-bold text-light-slate-12 ">OpenSauced</span>

          <p className="hidden !text-light-slate-9 lg:inline-block">
            ©
            {" "}

            {(new Date).getFullYear()}

            {" "}

            <span className="hidden lg:inline-block">OpenSauced</span>
          </p>
        </div>

        <div className="flex lg:mr-auto lg:text-sm text-light-slate-11 justify-center gap-x-4">
          <a
            className="px-2 hover:text-light-slate-12 "
            href={footerContext[1].hot?.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {footerContext[1].hot?.text}
          </a>

          <a
            className="px-2 hover:text-light-slate-12"
            href={footerContext[1].openSauced?.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {footerContext[1].openSauced?.text}
          </a>
        </div>

        <div className="flex justify-center gap-x-4 ">
          <div className=" hidden lg:flex items-center border-r pr-4   gap-x-4 text-light-slate-11 text-sm">
            <a
              className="px-2 hover:text-light-slate-12"
              href={footerContext[0].terms?.url}
              rel="noreferrer"
              target="_blank"
            >
              {footerContext[0].terms?.text}
            </a>

            <a
              className="px-2 hover:text-light-slate-12"
              href={footerContext[0].privacy?.url}
              rel="noreferrer"
              target="_blank"
            >
              {footerContext[0].privacy?.text}
            </a>

            <a
              className="px-2 hover:text-light-slate-12"
              href={footerContext[0].status?.url}
              rel="noreferrer"
              target="_blank"
            >
              {footerContext[0].status?.text}
            </a>
          </div>

          {footerContext[2].socials?.map(({ icon: Icon, label, url }, index) => (
            <a
              key={index}
              href={url}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon
                aria-label={label}
                className="text-2xl hover:text-light-slate-10 text-light-slate-9"
              />
            </a>
          ))}
        </div>

        <div className="flex md:justify-center lg:hidden lg:border-none lg:order-2 border-t py-3 pb-4 mt-2 text-sm justify-between">
          <p className="text-light-slate-9">
            ©
            {" "}

            {(new Date).getFullYear()}

            {" "}

            <span className="hidden md:inline-block">Open sauced</span>
          </p>

          <div className="flex items-center gap-x-3 text-light-slate-11 text-sm">
            <a
              className="px-2"
              href={footerContext[0].terms?.url}
              rel="noreferrer"
              target="_blank"
            >
              {footerContext[0].terms?.text}
            </a>

            <a
              className="px-2"
              href={footerContext[0].privacy?.url}
              rel="noreferrer"
              target="_blank"
            >
              {footerContext[0].privacy?.text}
            </a>

            <a
              className="px-2"
              href={footerContext[0].status?.url}
              rel="noreferrer"
              target="_blank"
            >
              {footerContext[0].status?.text}
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

export default Footer;
