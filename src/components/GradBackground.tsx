import { FC } from 'react'
import gradBG from '../../public/gradBG.svg'


const GradBackground: FC = ({ children }) => {
  return (
    <div className="h-fit relative">
      <div className="absolute w-[100vw] left-[-3px] z-[-1]">
        <img className='mx-auto' src={gradBG} alt="" />
      </div>

      {children}
    </div>
  )
}

export default GradBackground