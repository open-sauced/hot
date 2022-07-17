
import React, { FC } from 'react'
import gradBG from '../../public/gradBG.svg'


const GradBackground: FC = ({ children }) => {
  return (
    <div className="h-fit tablet:min-h-[300px] relative">
      <div className="absolute w-[200vw] z-[-1]">
        <img src={gradBG} alt="" />
      </div>

      {children}
    </div>
  )
}

export default GradBackground