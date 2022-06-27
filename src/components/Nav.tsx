import { FC } from 'react'
import headerBG from '../../public/nav-bg.svg'
import brandLogo from '../../public/logo_brand.svg'
import useSupabaseAuth from '../hooks/useSupabaseAuth'
import { Menu } from "@headlessui/react";
import { version } from "../../package.json";
import { capturePostHogAnayltics } from "../lib/analytics";

const navs = [
  {
    placeholder: 'Docs',
    links: "#"
  },
  {
    placeholder: 'Blog',
    links: "#"
  },
  {
    placeholder: 'Github',
    links: "#"
  },
  {
    placeholder: 'YouTube',
    links: "#"
  }
]

const Nav:FC = () => {
  const { signIn, signOut, user } = useSupabaseAuth();

  return (
    <div className='relative h-fit'>
      <div className="absolute w-[180vw]  laptop:w-[90vw] left-[270px] laptop:left-[638px] overflow-hidden z-[-1]">
        <img src={headerBG} alt="" />
      </div>
      {/* <img className='absolute object-cover top-0 right-[-600px] ' src={headerBG} alt="gradient background" /> */}
      <div className='max-w-[950px] mx-auto px-[7px] '>

        <div className='flex items-center justify-between'>
            <div className='z-10 w-[172px] h-[43px] '>
              <img src={brandLogo} alt="Open Sauced" className='w-full h-full' />
            </div>

            <div className='z-10 py-[9px] flex gap-[50px] text-[14px] items-center text-white font-semibold leading-[20px] tracking-[-0.03em]'>
              <ul className='flex gap-[50px]  '>
                {
                  navs.map( nav => (
                    <li><a href={nav.links}>{nav.placeholder}</a></li>
                  ))
                }

              </ul>

              {
                !user && 
                <a
                onClick={async () => {
                  capturePostHogAnayltics("User Login", "userLoginAttempt", "true");
                  await signIn({ provider: "github" });
                }}
                onKeyDown={async (e) => {
                  capturePostHogAnayltics("User Login", "userLoginAttempt", "true");
                  if (e.key === "Enter") {
                    await signIn({ provider: "github" });
                  }
                }}
                >
                  <button className='uppercase inline-block bg-white bg-opacity-[.35] font-semibold px-[10px] py-[5px] rounded-md  ' >Login</button>
                </a>
              }

              {
                user &&
                <div className='mt-[4px]'>
                  <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button>
                      <div className="items-center">
                        <div className="rounded-full shadow-md w-10 h-10 overflow-hidden ring-2 ring-white ">
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

                    <Menu.Items className="absolute z-50 right-0 w-56 origin-top-right rounded-md shadow-lg shadow-gray-700/80 border-gray-100 border-[1px] focus:outline-none px-1 py-1 bg-white text-sm font-semibold">
                      <Menu.Item>
                        {({ active }) => (
                          <a href={`https://github.com/${user.user_metadata.user_name}`}>
                            <span className={`${active && "bg-gray-200"} block px-4 py-2 rounded-md text-gray-600`}>
                              {user.user_metadata.user_name}
                            </span>
                          </a>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <span className={`${active && "bg-gray-200"} block px-4 py-2 rounded-md text-gray-600`}>
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
                          <span className={`${active && "bg-gray-200"} block px-4 py-2 rounded-md text-gray-600 cursor-pointer z-50`}>
                            Logout
                          </span>
                        )}
                      </Menu.Item>
                  </Menu.Items>
                </Menu>
                </div>
                
              }
            </div>
          </div>
      </div>
    </div>
  )
}

export default Nav