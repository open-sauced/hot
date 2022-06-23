import React from 'react';
import { FaThLarge, FaThList } from 'react-icons/fa';

export declare interface LayoutToggleProps {
  gridState: boolean;
  setGridState: (state: boolean) => void;
}

const LayoutToggle = ({ gridState, setGridState }: LayoutToggleProps): JSX.Element => {

  return (
    <div className="">
      <div className="flex justify-center ">
        <div className="flex items-center cursor-pointer gap-[8px] relative text-md">

          <button
            className={`z-10 flex-1 flex justify-center ${gridState ? "text-gray-800": "text-gray-300"} `}
            onClick={() => setGridState(true)}>
            <FaThLarge className="transition" />
          </button>

          <button
            className={`z-10 flex-1 flex justify-center ${gridState ? "text-gray-300": "text-gray-800"}` }
            onClick={() => setGridState(false)}>
            <FaThList className="transition" />
          </button>

        </div>

      </div>
    </div>
  );
}

export default LayoutToggle;
