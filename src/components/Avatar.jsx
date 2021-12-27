/* eslint-disable */
import React from "react";
import ReactTooltip from "react-tooltip";

import getAvatar from "../lib/getAvatar";

const Avatar = ({contributor}) => (
  <div
    className="bg-blue-400 w-10 h-10 overflow-hidden  rounded-full mr-3"
    data-tip={contributor}
    data-for={contributor}
  >
    <img
      className="object-cover"
      src={getAvatar(contributor)}
      alt={contributor}
      width={500}
      height={500}
    />
    <ReactTooltip id={contributor} className="flex flex-row items-center md:drop-shadow-[0_15px_15px_rgba(0,0,0,0.45)] bg-gray-50"/>
  </div>
);
export default Avatar;
