import { FC } from 'react'
import useSupabaseAuth from '../hooks/useSupabaseAuth'
import { version } from "../../package.json";
import { capturePostHogAnayltics } from "../lib/analytics";
import { Menu } from '@headlessui/react'
import { CgMenuGridO } from 'react-icons/cg';



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

const MobileNav:FC = () => {
  const { signIn, signOut, user } = useSupabaseAuth();

  return (

       <div className=' tablet:hidden'>
                  <Menu as="div" className="relative">
                    <Menu.Button>
                      <CgMenuGridO className='w-[35px] h-[35px] text-gray-600 ' />
                    </Menu.Button>

                    <Menu.Items className="absolute z-50 right-0 w-56 origin-top-right rounded-md shadow-sm border-gray-100 border-[1px] focus:outline-none px-1 py-1 bg-white text-sm font-semibold">


                      {
                        navs.map( nav => (
                          <Menu.Item key={nav.placeholder}>
                            <div className='bg-w p-[5px] text-[14px] text-gray150 rounded-md hover:bg-gray100 '>
                              <a href={nav.links}>{nav.placeholder}</a>
                            </div>
                          </Menu.Item>
                        ))
                      }

                      {
                        !user && 
                        <Menu.Item>
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
                                <button className='inline-block bg-white px-[15px] py-[5px] h rounded-md hover:bg-gray100 text-gray150   ' >Login</button>
                              </a>
                        </Menu.Item>
                      }

                      {
                        user && 
                        <div>
                            <Menu.Item>
                              {({ active }) => (
                                <a href={`https://github.com/${user.user_metadata.user_name}`}>
                                  <span className={`${active && "bg-gray-200"} block px-4 py-2 rounded-md text-gray150`}>
                                    {user.user_metadata.user_name}
                                  </span>
                                </a>
                              )}
                            </Menu.Item>

                            <Menu.Item>
                              {({ active }) => (
                                <span className={`${active && "bg-gray-200"} block  px-[15px] py-[5px] rounded-md text-gray150`}>
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
                                <span className={`${active && "bg-gray-200"} block px-[15px] py-[5px] rounded-md text-gray150 cursor-pointer z-50`}>
                                  Logout
                                </span>
                              )}
                            </Menu.Item>
                        </div>
                      }

                    </Menu.Items>
                </Menu>
                </div>

  )
}

export default MobileNav