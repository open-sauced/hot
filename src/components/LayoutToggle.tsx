import React from 'react';
import { FaThLarge, FaThList } from 'react-icons/fa';

export declare interface LayoutToggleProps {
  gridState: boolean;
  setGridState: (state: boolean) => void;
}

const LayoutToggle = ({ gridState, setGridState }: LayoutToggleProps): JSX.Element => {
  const position = gridState ? 'left-0' : 'right-0';

  return (
    <div className="bg-darkestGrey pt-4 md:pt-4 pb-5">
      <div className="container flex justify-center">
        <div className="bg-saucyRed w-20 h-8 rounded-xl flex items-center cursor-pointer relative  text-grey text-md">
          <div className={`absolute bottom-0.1 w-10 h-10 rounded-xl bg-gray-100 ${position}`}></div>
          <button
            className="z-10 flex-1 flex justify-center"
            onClick={() => setGridState(true)}>
            <FaThLarge className="transition" />
          </button>
          <button
            className="z-10 flex-1 flex justify-center"
            onClick={() => setGridState(false)}>
            <FaThList className="transition" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default LayoutToggle;
