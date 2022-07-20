import React from 'react'
import key from '../assets/key.svg'
import cmdK from '../assets/cmdK.svg'

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
          <img className='pt-[7px]' src={cmdK} alt="command k" />
        </div>
        <div className='mt-[10px] flex w-full justify-center relative'>
          <div className='flex min-w-[400px] absolute z-50 max-w-[400px] flex-col bg-white rounded-[10px]'>
            <div className='bg-gray-100 py-[10px] px-[10px] border-b-gray-100 border-b-[2px] rounded-[10px] rounded-b-none w-full'>
              <p className='text-gray-500 text-[14px] font-semibold'>Repository</p>
            </div>
            <div className='flex flex-col'>

              <div className='flex flex-col px-[10px] py-[10px]'>
                <div className='flex items-center gap-x-[10px]'>
                  <div className='w-[25px] h-[25px] border-gray-400 border-[1px] bg-red-100  rounded-full'>

                  </div>

                  <p className='text-[16px] text-gray-500 font-semibold'>Awesome repository</p>
                </div>

                <p className='text-[14px] text-gray-500'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio, quam, maiores reiciendis molestiae cupiditate distinctio, nisi saepe nulla commodi facere rerum?</p>

                <div className='flex'>
                  <div className='flex gap-x-[5px]'>
                    <div className='w-[20px] h-[20px] bg-red-200 rounded-full'></div>
                    <div className='w-[20px] h-[20px] bg-red-200 rounded-full'></div>
                    <div className='w-[20px] h-[20px] bg-red-200 rounded-full'></div>
                  </div>

                </div>
              </div>
              
              
            </div>
          </div>
        </div>
    </div>
  )
}

export default Hero