import React from "react";
import logo from "./logo.svg";
import useSupabaseAuth from "../hooks/useSupabaseAuth";

const PrimaryNav = () => {
  const { signIn, signOut, user } = useSupabaseAuth();

  return (
    <nav className="flex bg-offWhite min-h-10 w-full font-roboto font-bold px-2 sm:px-4 py-4 sm:py-2 items-center">
      <div className="flex-1 flex items-center">
        <a href="https://opensauced.pizza">
          <img
            className="h-7 mr-2 sm:mr-4 "
            alt="open
        sauced"
            src={logo}
          />
        </a>
      </div>
      <div className="flex justify-center items-center space-x-2 sm:space-x-3">
        <input
          className=" ring-1 rounded-lg shadow-md w-[120px] h-full p-2 text-[9px] sm:text-xs sm:w-40 "
          type="search"
          placeholder="search open sauced 🔍"
          id="repo-search"
          name="repo-search"
          aria-label="Search through repositories rendered out"
        />
        {!user && (
          <div className="items-center">
            <div
              className="cursor-pointer"
              onClick={async () => {
                await signIn({ provider: "github" });
              }}
            >
              Login
            </div>
          </div>
        )}
      </div>

      {user && (
        <div className="items-center">
          <div
            className="rounded-full w-10 h-10 overflow-hidden ring-2 ring-red-800"
            onClick={async () => {
              await signOut();
            }}
          >
            {user && (
              <img
                className="object-cover w-[500] h-[500]"
                src={user.user_metadata.avatar_url}
                altalt={`${user.user_metadata.user_name}-avatar`}
              />
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default PrimaryNav;
