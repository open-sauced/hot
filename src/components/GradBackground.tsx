import { ReactNode } from 'react'
import './styles/grandBackground.css'

interface Props {
  children?: ReactNode
}

const GradBackground = ({ children }: Props): JSX.Element => {
  return (
    <div className="translate-background__color">
      {children}
    </div>
  )
}

export default GradBackground
