import React from 'react'
import key from '../../public/key.svg'
import cmdK from '../../public/cmdK.svg'

const Hero = () => {
  return (
    <div className='flex flex-col my-[95px] items-center'>
        <div>
            <h1 className='font-Lexend text-[48px] text-center text-lightSlate leading-[52.8px] tracking-[-6%] '>
                Find <span className='bg-gradient-to-r from-gradFirst via-gradMiddle to-gradLast bg-clip-text text-transparent' >Open-Source Repositories</span> <br/> to  contribute today
            </h1>
        </div>
        <div className='mt-[45px] px-[15px] gap-x-[10px] py-[10px] justify-between bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] rounded-[16px] min-w-[422px]  flex'>
            <img src={key} alt="key" />
            <input type="text" placeholder='Search repositories' className='w-full outline-none text-[16px] text-lightSlate' />
            <img src={cmdK} alt="command k" />
        </div>
    </div>
  )
}

export default Hero