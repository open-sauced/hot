import { ReactNode } from 'react'
interface Props {
  children?: ReactNode
}

const GradBackground = ({ children }: Props): JSX.Element => {
  return (
    <div className="h-fit bg-[url('../assets/gradBG.svg')] bg-no-repeat bg-center">
      {children}
    </div>
  )
}

export default GradBackground