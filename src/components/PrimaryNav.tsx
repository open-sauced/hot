import React from 'react';
import { Menu } from '@headlessui/react';
import logo from '../assets/logo.svg';
import useSupabaseAuth from '../hooks/useSupabaseAuth';
import { version } from '../../package.json';

const PrimaryNav = (): JSX.Element => {
  const { signIn, signOut, user } = useSupabaseAuth();

  return (
    <nav className="flex bg-offWhite min-h-10 w-full font-roboto font-bold px-4 py-4 sm:py-2">
      <div className="flex-1 flex text-2xl font-medium items-center">
        <a href="https://opensauced.pizza">
          <img
            className="h-7 mr-4"
            alt="open sauced"
            src={logo}
          />
        </a>
      </div>
      {!user && (
        <div className="items-center">
          <div
            role="button"
            tabIndex={0}
            aria-pressed="false"
            className="cursor-pointer"
            onClick={async () => {
              await signIn({ provider: 'github' });
            }}
            onKeyDown={async (e) => {
              if (e.key === 'Enter') {
                await signIn({ provider: 'github' });
              }
            }}
          >
            Login
          </div>
        </div>
      )}
      {user && (
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button>
            <div className="items-center">
              <div className="rounded-full w-10 h-10 overflow-hidden ring-2 ring-red-800">
                {user && (
                  <img
                    className="object-cover w-[500] h-[500]"
                    src={user.user_metadata.avatar_url}
                    alt={`${user.user_metadata.user_name}-avatar`}
                  />
                )}
              </div>
            </div>
          </Menu.Button>
          <Menu.Items className="absolute right-0 w-56 origin-top-right rounded-md shadow-lg shadow-gray-700/80 border-gray-700 border-2 focus:outline-none px-1 py-1 bg-darkestGrey text-sm font-semibold">
            <Menu.Item>
              {({ active }) => (
                <a href={`https://github.com/${user.user_metadata.user_name}`}>
                  <span className={`${active && 'bg-gray-700'} block px-4 py-2 rounded-md text-gray-200`}>
                    {user.user_metadata.user_name}
                  </span>
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <span className={`${active && 'bg-gray-700'} block px-4 py-2 rounded-md text-gray-200`}>
                  v{version}
                </span>
              )}
            </Menu.Item>
            <Menu.Item
              onClick={async () => {
                await signOut();
              }}
            >
              {({ active }) => (
                <span className={`${active && 'bg-gray-700'} block px-4 py-2 rounded-md text-gray-200 cursor-pointer`}>
                  Logout
                </span>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      )}
    </nav>
  );
};

export default PrimaryNav;
