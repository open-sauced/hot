import { ReactNode } from "react";
import Skeleton, { SkeletonProps } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export declare interface BoxProps {
  children: ReactNode;
  css?: string;
}

export const LoaderSkeleton = (props: SkeletonProps) => {
  return (
    <Box css={props.className}>
      <Skeleton {...props} />
    </Box>
  );
};

const Box = ({ children, css }: BoxProps) => {
  return <div className={css}>{children}</div>;
};
