import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode
};

const GradBackground = ({ children }: Props): JSX.Element => {
  return (
    <div className="h-fit bg-[url('../assets/gradBG.svg')] bg-no-repeat bg-center bg-cover">
      {children}
    </div>
  );
};

export default GradBackground;
