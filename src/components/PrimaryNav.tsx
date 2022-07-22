import { FC, Fragment } from "react";
import openSaucedLogo from '../assets/openSauced.svg'
import { Menu, Transition } from '@headlessui/react'
import useSupabaseAuth from "../hooks/useSupabaseAuth";
import { capturePostHogAnayltics } from "../lib/analytics";
import { GiHamburgerMenu } from "react-icons/gi"
import { version } from "../../package.json";
interface NavProps {
  auth: {
    signIn: (provider: object)=> void,
    signOut: ()=> void,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any
  }
}
interface MenuProps {
  auth: {
    signIn: (provider: object)=> void,
    signOut: ()=> void,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any
  }
}
const PrimaryNav:FC = () => {
  const { signIn, signOut, user } = useSupabaseAuth();

  return (
    <header>
      <MobileNav auth={{ signIn, signOut, user }}/>
      <DesktopNav auth={{ signIn, signOut, user }}/>
    </header>
  );
};
// visible on bigger screen
const DesktopNav:FC<NavProps> = ({auth}) => {
  return(
    <div className='hidden md:flex  font-Inter py-[26px] px-[42px] justify-between'>
      <div className="flex items-center text-osGrey">
        <a href="/">
          <img className="w-[22px] h-[22px] mr-[5px]" src={openSaucedLogo} alt="Open Sauced Logo"/>
        </a>
        <a href="/">
          <p className="text-[16px] font-semibold">OpenSauced</p>
        </a>
        {
          auth?.user &&
          <div>
            <p className="font-semibold text-[12px] ml-[10px]">My Votes</p>
          </div>
        }
      </div>
      <div>
        <div className="w-[80px] pl-[16px] border-l-[1px] border-lightOrange">
          {
            auth?.user ? (
              <UserMenu auth={auth}/>
            ) : (
              <button
              onClick={async () => {
                capturePostHogAnayltics('User Login', 'userLoginAttempt', 'true');
                await auth.signIn({ provider: 'github' });
              }}
              className="bg-osOrange w-[64px] h-[24px]  rounded-[6px] px-[12px] py-[2px] text-[12px] font-semibold text-white">
                Sign in
              </button>
            )
          }
        </div>
      </div>
    </div>
  )
}
// visible on smaller screen
const MobileNav:FC<NavProps> = ({auth}) => {
  return(
    <div className='md:hidden font-Inter py-[26px] px-[42px] flex justify-between'>
      <div className="flex items-center text-osGrey">
        <img className="w-[22px] h-[22px] mr-[5px]" src={openSaucedLogo} alt="Open Sauced Logo"/>
        <p className="text-[16px] font-semibold">OpenSauced</p>
      </div>
      <div>
        <Menu as="div" className="relative z-50 inline-block text-left">
          <Menu.Button>
            <GiHamburgerMenu className="w-[20px] h-[20px] " />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-[8px] py-[10px] ">
                {
                  auth?.user ? (
                    <div>
                      <Menu.Item>
                        <div className="flex items-center mb-[5px] gap-x-[10px]">
                          <div className="w-[30px] h-[30px] overflow-hidden rounded-full border-osOrange border-[1px]">
                            <img className="w-full h-full" src={auth?.user?.user_metadata?.avatar_url} alt={auth?.user?.user_metadata?.user_name} />
                          </div>
                          <div className="flex flex-col">
                            <p className="text-osGrey text-[12px] font-semibold ">{auth?.user?.user_metadata?.full_name}</p>
                            <p className="text-gray-500 text-[12px] font-normal">{auth?.user?.user_metadata?.user_name}</p>
                          </div>
                        </div>
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={async () => {
                              await auth.signOut();
                            }}
                            className={`${
                              active ? 'bg-gray-100 text-gray-700' : 'text-gray-900'
                            } group flex w-full items-center rounded-md px-[20px] py-[6px] text-[15px]`}
                          >
                            {active ? (
                              <div
                                className="mr-[5px] h-[2px] w-[15px]"
                                aria-hidden="true"
                              />
                            ) : (
                              <div
                                className="mr-[5px] h-[2px] w-[15px]"
                                aria-hidden="true"
                              />
                            )}
                            V{version}
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={async () => {
                              await auth.signOut();
                            }}
                            className={`${
                              active ? 'bg-gray-100 text-gray-700' : 'text-gray-900'
                            } group flex w-full items-center rounded-md px-[20px] py-[6px] text-[15px]`}
                          >
                            {active ? (
                              <div
                                className="mr-[5px] h-[2px] w-[15px]"
                                aria-hidden="true"
                              />
                            ) : (
                              <div
                                className="mr-[5px] h-[2px] w-[15px]"
                                aria-hidden="true"
                              />
                            )}
                            My votes
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={async () => {
                              await auth.signOut();
                            }}
                            className={`${
                              active ? 'bg-gray-100 text-gray-700' : 'text-gray-900'
                            } group flex w-full items-center rounded-md px-[20px] py-[6px] text-[15px]`}
                          >
                            {active ? (
                              <div
                                className="mr-[5px] h-[2px] w-[15px]"
                                aria-hidden="true"
                              />
                            ) : (
                              <div
                                className="mr-[5px] h-[2px] w-[15px]"
                                aria-hidden="true"
                              />
                            )}
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  ) : (
                    <button
                      onClick={async () => {
                        capturePostHogAnayltics('User Login', 'userLoginAttempt', 'true');
                        await auth.signIn({ provider: 'github' });
                      }}
                      className="bg-osOrange w-[64px] h-[24px]  rounded-[6px] px-[12px] py-[2px] text-[12px] font-semibold text-white ">
                        Sign in
                    </button>
                  )
                }
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  )
}
const UserMenu:FC<MenuProps> = ({auth}) => {
  console.log(auth)
  return(
      <Menu as="div" className="relative z-50 inline-block text-left">
        <div>
          <Menu.Button className="w-[30px] h-[30px] overflow-hidden rounded-full border-osOrange border-[1px]">
            <img className="w-full h-full" src={auth?.user?.user_metadata?.avatar_url} alt={auth?.user?.user_metadata?.user_name} />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-[8px] py-[10px] ">
              <Menu.Item>
                <div className="flex items-center mb-[5px] gap-x-[10px]">
                  <div className="w-[30px] h-[30px] overflow-hidden rounded-full border-osOrange border-[1px]">
                    <img className="w-full h-full" src={auth?.user?.user_metadata?.avatar_url} alt={auth?.user?.user_metadata?.user_name} />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-osGrey text-[12px] font-semibold ">{auth?.user?.user_metadata?.full_name}</p>
                    <p className="text-gray-500 text-[12px] font-normal">{auth?.user?.user_metadata?.user_name}</p>
                  </div>
                </div>
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-gray-100 text-gray-700' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-[20px] py-[6px] text-[15px]`}
                  >
                    {active ? (
                      <div
                        className="mr-[5px] h-[2px] w-[15px]"
                        aria-hidden="true"
                      />
                    ) : (
                      <div
                        className="mr-[5px] h-[2px] w-[15px]"
                        aria-hidden="true"
                      />
                    )}
                    v{version}
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={async () => {
                      await auth.signOut();
                    }}
                    className={`${
                      active ? 'bg-gray-100 text-gray-700' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-[20px] py-[6px] text-[15px]`}
                  >
                    {active ? (
                      <div
                        className="mr-[5px] h-[2px] w-[15px]"
                        aria-hidden="true"
                      />
                    ) : (
                      <div
                        className="mr-[5px] h-[2px] w-[15px]"
                        aria-hidden="true"
                      />
                    )}
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
  )
}
export default PrimaryNav;
