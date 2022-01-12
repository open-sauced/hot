import React from 'react';
import av1 from './placeholders/av01.jpg';
import logo from './logo.svg';
import useSupabaseAuth from '../hooks/useSupabaseAuth';

const PrimaryNav = () => {
  const { signIn, signOut, user } = useSupabaseAuth();
  user && console.log(user.user_metadata.avatar_url)

  return (
    <nav className="flex bg-offWhite min-h-10 w-full font-roboto font-bold px-4 py-4 sm:py-2">
      <div className="flex-1 flex text-2xl font-medium items-center">
        <a href="https://opensauced.pizza">
          <img
            className="h-7 mr-4"
            alt="open
        sauced"
            src={logo}
          />
        </a>
      </div>

      {!user && <div className="items-center">
        <div
          onClick={async () => {
            await signIn({ provider: 'github' });
          }}
        >
          Login
        </div>
      </div>}

      {user && <div className="items-center">
        <div
          className="rounded-full w-10 h-10 overflow-hidden ring-2 ring-red-800"
          onClick={async () => {
            await signOut();
          }}
        >
          {user && <img className="object-cover w-[500] h-[500]" src={user.user_metadata.avatar_url} alt="Avatar 02" />}
        </div>
      </div>}
    </nav>
  );
};

export default PrimaryNav;