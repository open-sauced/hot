import { FC } from 'react'
import headerBG from '../../public/nav-bg.svg'
import brandLogo from '../../public/logo_brand.svg'

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
  return (
    <div className='min-h-[50px] relative overflow-hidden '>
      <div className='max-w-[950px] mx-auto'>
      <img className=' absolute top-0 left-[750px]' src={headerBG} alt="gradient background" />

      <div className='flex items-center justify-between'>
          <div className='z-10 w-[172px] h-[43px] '>
            <img src={brandLogo} alt="Open Sauced" className='w-full h-full' />
          </div>

          <div className='z-10 flex gap-[50px] items-center text-white font-semibold leading-[20px] tracking-[-0.03em]'>
            <ul className='flex gap-[50px]  '>
              {
                navs.map( nav => (
                  <li><a href={nav.links}>{nav.placeholder}</a></li>
                ))
              }

            </ul>
            
            <a href="https://app.opensauced.pizza/">
              <button className='uppercase inline-block bg-white bg-opacity-[.35] font-semibold px-[10px] py-[5px] rounded-md  ' >Login</button>
            </a>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Nav