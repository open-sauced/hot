import React from "react";
import openSaucedLogo from "../assets/openSauced.svg";
import {Menu, Transition} from "@headlessui/react";
import useSupabaseAuth from "../hooks/useSupabaseAuth";
import { capturePostHogAnayltics } from "../lib/analytics";
import { GiHamburgerMenu } from "react-icons/gi"
import { version } from "../../package.json";

const PrimaryNav = (): JSX.Element => {
  const {signIn, signOut, user} = useSupabaseAuth();

  return (
    <header>
      <div className="hidden md:flex font-Inter py-[26px] px-[42px] justify-between">
        <div className="flex items-center text-osGrey">
          <a href="/">
            <img className="inline-block w-[22px] h-[22px] mr-[5px]" src={openSaucedLogo} alt="Open Sauced Logo"/>
            <span className="text-base leading-snug font-semibold">OpenSauced</span>
          </a>

          {user && (
            <div>
              <p className="font-semibold text-xs ml-[10px]">My Votes</p>
            </div>
          )}
        </div>
        <div className="w-[80px] pl-[16px] border-l-[1px] border-lightOrange">
          {user ? (
            <Menu as="div" className="relative z-50 inline-block text-left">
              <Menu.Button className="w-[30px] h-[30px] overflow-hidden rounded-full border-osOrange border-[1px]">
                <img
                  className="w-full h-full"
                  src={user.user_metadata.avatar_url}
                  alt={user.user_metadata.user_name}
                />
              </Menu.Button>
              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
              <Menu.Items
                className="z-40 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-[8px] py-[10px]">
                  <Menu.Item>
                    <div className="flex items-center mb-[5px] gap-x-[10px]">
                      <div className="w-[30px] h-[30px] overflow-hidden rounded-full border-osOrange border-[1px]">
                        <img
                          className="w-full h-full"
                          src={user.user_metadata.avatar_url}
                          alt={user.user_metadata.user_name}
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-osGrey text-xs font-semibold">{user.user_metadata.full_name}</p>
                        <p className="text-gray-500 text-xs font-normal">{user.user_metadata.user_name}</p>
                      </div>
                    </div>
                  </Menu.Item>
                </div>
                <Menu.Item>
                  {({active}) => (
                    <button
                      className={`${
                        active ? "bg-gray-100 text-gray-700" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-[20px] py-[6px] text-sm`}
                    >
                      v{version}
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({active}) => (
                    <button
                      onClick={async () => {
                        await signOut();
                      }}
                      className={`${
                        active ? "bg-gray-100 text-gray-700" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-[20px] py-[6px] text-sm`}
                    >
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <button
              onClick={async () => {
                capturePostHogAnayltics("User Login", "userLoginAttempt", "true");
                await signIn({provider: "github"});
              }}
              className="bg-osOrange w-[64px] h-[24px]  rounded-[6px] px-[12px] py-[2px] text-xs font-semibold text-white"
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default PrimaryNav;
