import { ReactNode } from "react";

interface Props {
  children?: ReactNode
}

const GradBackground = ({ children }: Props): JSX.Element => (
  <div className="h-fit bg-[url('../assets/gradBackground.svg')] bg-no-repeat bg-center bg-cover ">
    {children}
  </div>
);

export default GradBackground;
