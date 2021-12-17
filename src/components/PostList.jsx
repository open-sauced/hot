import React from "react";
import av1 from "./placeholders/av01.jpg";
import av2 from "./placeholders/av02.jpg";
import cover1 from "./placeholders/cover1.jpg";
import cover2 from "./placeholders/cover2.jpg";

function PostList({ data }) {
  return (
    <div className=" bg-offWhite rounded-xl p-6 font-roboto w-full">
      {/* Flex container */}
      <div className="flex ">
        {/* Avatar Container */}
        <div className=" flex flex-col ">
          {/* Avatar */}
          <div className="bg-blue-400 w-10 h-10 overflow-hidden  rounded-full mb-2 ">
            <img
              className="object-cover"
              src={av1}
              alt="Avatar 01"
              width={500}
              height={500}
            />
          </div>
          {/* Avatar */}
          <div className="bg-blue-400 w-10 h-10 overflow-hidden  rounded-full ">
            <img
              className="object-cover"
              src={av2}
              alt="Avatar 02"
              width={500}
              height={500}
            />
          </div>
        </div>

        {/* Content */}
        <div className=" ml-5 border-l-2 pl-5">
          <div className=" text-grey text-md font-medium  overflow-hidden ">
            <h1>{data.repo_name} </h1>
          </div>
          {/* Date and Time */}
          <div className=" text-lightGrey text-sm mb-2 ">
            <h3> Yesterday - 5 m read time </h3>
          </div>
          {/* Action Button Container */}
          <div className=" flex justify-between w-full ">
            {/* Upvote */}
            <div className=" flex justify-center items-center text-xl text-grey hover:text-saucyRed cursor-pointer transition-all duration-200  ">
              <i className="fas fa-arrow-alt-circle-up mr-2 "></i>
              <p className="font-bold">5</p>
            </div>

            {/* Comment */}
            <div className=" flex justify-center items-center text-xl  text-grey hover:text-saucyRed cursor-pointer transition-all duration-200  ">
              <i className="fas fa-comment-dots mr-2 "></i>

              <p className="font-bold">55</p>
            </div>

            {/* Bookmark */}
            <div className=" flex justify-center items-center text-xl  text-grey hover:text-saucyRed cursor-pointer transition-all duration-200 ">
              <i className="fas fa-bookmark mr-2 "></i>
              <p className="font-bold">14</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostList;
