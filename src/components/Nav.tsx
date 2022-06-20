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
    <div className='min-h-[40px] relative overflow-hidden '>
      <div className='max-w-[1200px] mx-auto'>
      <img className=' absolute top-0 left-[900px]' src={headerBG} alt="gradient background" />

      <div className='flex justify-between'>
          <div className='z-10 w-[172px] h-[43px] '>
            <img src={brandLogo} alt="Open Sauced" className='w-full h-full' />
          </div>

          <div className='z-10'>
            <ul className='flex text-white font-semibold leading-[20px] tracking-[-0.03em] '>
              {
                navs.map( nav => (
                  <li><a href={nav.links}>{nav.placeholder}</a></li>
                ))
              }
            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Nav