import React, { FC } from 'react'

interface RepoSubmissionProps{

}

const RepoSubmission: FC<RepoSubmissionProps> = ()  => {
  return (
    <div className='fixed bottom-[40px] right-[40px] flex items-end flex-col gap-[10px] ' >
        <div className='bg-white p-[15px] rounded-md min-w-[300px] '>
          <h6 className=' text-[18px] mb-[8px] text-gray-700 font-medium '>Suggest Repository</h6>
          <p className=' text-[12px] mb-[5px] text-gray-500 font-medium '>Repository URL</p>
          <input className='bg-gray-200 py-[4px] w-full px-[10px] rounded-md outline-yellow-300 text-gray-500 text-[12px]  ' type="text" placeholder='https://github.com/open-sauced' />
        </div>
        <button className='bg-saucyRed p-[10px] text-[12px] rounded-md text-white font-bold transform transition-all hover:bg-orange-700 ' >Submit Repo?</button>
    </div>
  )
}

export default RepoSubmission