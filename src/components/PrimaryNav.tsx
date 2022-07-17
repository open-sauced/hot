import { FC } from "react";
import openSaucedLogo from '../../public/openSaucedLogo.svg'

const PrimaryNav:FC = () => {

  return (
    <div className='font-Inter py-[26px] px-[42px] flex justify-between'>
      <div className="flex items-center text-osGray">
        <img className="w-[22px] h-[22px] mr-[5px]" src={openSaucedLogo} alt="Open Sauced Logo"/>

        <p className="text-[16px] font-semibold">OpenSauced</p>

        <div>
          <p className="font-semibold text-[12px] ml-[10px]">My Votes</p>
        </div>
      </div>
      <div>
        <div className="w-[80px] pl-[16px] border-l-[1px] border-lightOrange">
          <button className="bg-osOrange w-[64px] h-[24px]  rounded-[6px] px-[12px] py-[2px] text-[12px] font-semibold text-white ">
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrimaryNav;
