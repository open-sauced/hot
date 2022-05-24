import React, {useState, useEffect} from "react";
import { Menu } from "@headlessui/react";
import logo from "../assets/logo.svg";
import useSupabaseAuth from "../hooks/useSupabaseAuth";
import { version } from "../../package.json";
import { fetchWithSearch } from "../lib/supabase";

// TODO: move to hooks/debounce.ts
function useDebounce<T>(value: T, delay: number): T {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

const PrimaryNav = (): JSX.Element => {
  const { signIn, signOut, user } = useSupabaseAuth();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);
  // TODO: Searching status (whether there is pending API request)
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [hasFocus, setFocus] = useState<boolean>(false);
  const debouncedSearchTerm: string = useDebounce<string>(searchTerm, 500);

  // Effect for API call
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);

        fetchWithSearch("stars", 3, debouncedSearchTerm).then((results) => {
          setIsSearching(false);
          setResults(results as unknown as any[]);
        });
      } else {
        setResults([]);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  // TODO: remove
  console.log(results)

  return (
    <nav className="flex bg-offWhite min-h-10 w-full font-roboto font-bold px-2 sm:px-4 py-4 sm:py-2 items-center">
      <div className="flex-1 flex items-center">
        <a href="https://opensauced.pizza">
          <img className="h-7 mr-4" alt="open sauced" src={logo} />
        </a>
        <div id="search-container" className="flex flex-col relative w-full max-w-lg">
          <input
            className=" bg-gray-200 rounded-lg shadow-md h-full p-2 text-[9px] ml-2 sm:ml-0 sm:text-xs w-3/4 sm:w-2/3 focus:outline-none focus:border-saucyRed focus:ring-1 focus:ring-saucyRed"
            type="search"
            placeholder="search or jump to...   "
            id="repo-search"
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            name="repo-search"
            aria-label="Search through repositories rendered out"
          />
          {
            hasFocus && results.length >0 &&
            <div className="bg-offWhite rounded-xl font-roboto w-full absolute pb-2 top-12 md:drop-shadow-[0_15px_15px_rgba(0,0,0,0.45)] z-50">
              <div className="flex">
                <div className="w-full">
                      <h1 className="text-lightGrey p-2 uppercase text-xs border-b-2 w-full">Repository</h1>

                      <div>
                        {
                          results.map( result => (
                            <a

                              className=" text-grey text-xs sm:text-lg font-medium overflow-hidden cursor-pointer"
                              href="https://opensauced.pizza"
                              title={`Visit placeholder`}
                              target="_blank"
                              rel="noopener"
                              
                            >
                              <div>
                                <h2 className="pl-6 pt-2">{result.full_name}</h2>
                                <p className="text-sm text-gray-500 pl-6">{result.description}</p>
                              </div>
                            </a>
                          ))

                        }
                      </div>

                </div>
              </div>
            </div>
          }
        </div>
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
              <div className="rounded-full shadow-md w-10 h-10 overflow-hidden ring-2 ring-saucyRed">
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
                  <span className={`${active && "bg-gray-700"} block px-4 py-2 rounded-md text-gray-200`}>
                    {user.user_metadata.user_name}
                  </span>
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <span className={`${active && "bg-gray-700"} block px-4 py-2 rounded-md text-gray-200`}>
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
                <span className={`${active && "bg-gray-700"} block px-4 py-2 rounded-md text-gray-200 cursor-pointer`}>
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
