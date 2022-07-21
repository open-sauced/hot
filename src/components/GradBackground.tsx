import { FC } from 'react'

const GradBackground: FC = ({ children }) => {
  return (
    <div className="h-fit bg-[url('../assets/gradBG.svg')] bg-no-repeat bg-center">
      {children}
    </div>
  )
}

export default GradBackground