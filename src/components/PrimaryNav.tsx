import { Menu, Transition } from "@headlessui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineStar } from "react-icons/ai";
import { capturePostHogAnayltics } from "../lib/analytics";
import { getAvatarLink } from "../lib/github";
import useSupabaseAuth from "../hooks/useSupabaseAuth";
import { version } from "../../package.json";
import openSaucedLogo from "../assets/openSauced.svg";
import { supabase } from "../lib/supabase";

import RepoSubmission from "./RepoSubmission";

import { useState } from "react";

const bugReportLink =
  "https://github.com/open-sauced/hot/issues/new?assignees=&labels=%F0%9F%91%80+needs+triage%2C%F0%9F%90%9B+bug&template=bug_report.yml&title=Bug%3A+";

const StarTheRepo = (): JSX.Element => (
  <div className="hidden sm:flex items-center text-osGrey font-Inter">
    <a
      href="https://github.com/open-sauced/hot"
      rel="noreferrer"
      target="_blank"
    >
      <AiOutlineStar className="inline-block mr-2.5" />

      <span className="text-md font-light mr-2.5">Star us on GitHub</span>
    </a>
  </div>
);

const PrimaryNav = (): JSX.Element => {
  const { signIn, signOut, user } = useSupabaseAuth();
  const currentUser = supabase.auth.session();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleFormOpen = (state: boolean) => setIsFormOpen(state);

  return (
    <header>
      <div className="flex font-OpenSans py-6 px-10 justify-between max-w-screen-2xl mx-auto">
        <div className="flex items-center text-osGrey">
          <a href="/">
            <img
              alt="Open Sauced Logo"
              className="inline-block w-6 h-6 mr-1"
              src={openSaucedLogo}
            />

            <span className="text-lg leading-snug font-black tracking-tighter">OpenSauced</span>
          </a>
        </div>

        {user && (
          <Menu
            as="div"
            className="flex z-50 text-left relative"
          >
            <Menu.Button>
              <div className="flex items-center">
                <StarTheRepo />

                <div className="hidden md:flex pl-4 border-l border-lightOrange">
                  <div className="w-8 h-8 overflow-hidden rounded-full border-osOrange border">
                    <img
                      alt={String(user.user_metadata.user_name)}
                      className="w-full h-full"
                      src={getAvatarLink(String(user.user_metadata.user_name))}
                    />
                  </div>
                </div>

                <div className="flex md:hidden w-5 h-5">
                  <GiHamburgerMenu size={24} />
                </div>
              </div>
            </Menu.Button>

            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="z-40 absolute right-0 top-10 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  <div className="flex items-center px-2 py-2.5 mb-1 gap-x-2.5">
                    <div className="flex-col shrink-0 grow-0 w-8 h-8 overflow-hidden rounded-full border-osOrange border">
                      <img
                        alt={String(user.user_metadata.user_name)}
                        className="w-full h-full"
                        src={getAvatarLink(String(user.user_metadata.user_name))}
                      />
                    </div>

                    <div className="flex-col shrink">
                      <p className="text-osGrey text-xs font-semibold">
                        {user.user_metadata.full_name}
                      </p>

                      <p className="text-gray-500 text-xs font-normal">
                        {user.user_metadata.user_name}
                      </p>
                    </div>
                  </div>
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-100 text-gray-700" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-5 py-1.5 text-sm`}
                    >
                      {`v${version}`}
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-100 text-gray-700" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-5 py-1.5 text-sm`}
                      onClick={() => handleFormOpen(true)}
                    >
                      Submit a repository
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-100 text-gray-700" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-5 py-1.5 text-sm`}
                      onClick={() => console.log("Token: ", currentUser?.access_token)}
                    >
                      Print auth token
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <a
                      href={bugReportLink}
                      rel="noreferrer"
                      target="_blank"
                      className={`${
                        active ? "bg-gray-100 text-gray-700" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-5 py-1.5 text-sm`}
                    >
                      Report a bug
                    </a>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-100 text-gray-700" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-5 py-1.5 text-sm`}
                      onClick={async () => signOut()}
                    >
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        )}

        {!user && (
          <div className="flex items-center">
            <StarTheRepo />

            <button
              className="bg-osOrange w-16 h-9 rounded-md px-3 py-0.5 text-xs font-semibold text-white md:ml-5"
              onClick={async () => {
                capturePostHogAnayltics("User Login", "userLoginAttempt", "true");
                await signIn({ provider: "github" });
              }}
            >
              Sign in
            </button>
          </div>
        )}
      </div>

      <RepoSubmission
        handleFormOpen={handleFormOpen}
        isFormOpen={isFormOpen}
      />
    </header>
  );
};

export default PrimaryNav;
