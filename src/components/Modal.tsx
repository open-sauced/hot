import React, {useState} from 'react';
import {FaPizzaSlice, FaMedal} from 'react-icons/fa';

function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const show = isOpen ? 'block' : 'hidden';
  const levels = [
    {
      name: 'Bronze Level',
      daysRequired: 3,
      color: '#CD7F32'
    },
    {
      name: 'Silver Level',
      daysRequired: 4,
      color: 'silver'
    },
    {
      name: 'Gold Level',
      daysRequired: 6,
      color: 'gold'
    }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(false)}
        className={`z-20 bg-gray-800 opacity-80 w-full h-full top-0 left-0 absolute ${show}`}
      >
      </button>

      <div className="flex justify-center">
        <div className="absolute top-14 flex justify-center flex-col items-center sm:top-10">

          <div className="z-40">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className=" bg-grey h-14 w-14 rounded-full border-dashed border-4 border-cheesyYellow flex justify-center items-center text-2xl transition-all duration-200 transform hover:scale-105 cursor-pointer"
            >
              <FaPizzaSlice className="text-offWhite hover:text-accent"/>
            </button>
          </div>

          <div
            className={`z-20 bg-darkestGrey relative -top-5 rounded-2xl border-2 px-4 pt-14 pb-8 border-offWhite shadow-2xl flex flex-col justify-center items-center font-roboto text-offWhite ${show}`}
          >
            <div className="flex flex-col justify-center items-center mb-5">
              <h1 className="text-3xl">HOT OPEN SAUCED</h1>
              <h2 className="text-lg text-lightGrey">Find the hottest Open Source projects.</h2>
            </div>

            <div className=" flex flex-col w-full">
              {levels.map(({name, daysRequired, color}) => (
                <div className="flex mb-4" key={`level-${name}`}>
                  <div className="text-2xl mr-5">
                    <FaMedal color={color}/>
                  </div>
                  <div className="flex flex-col">
                    <div className="font-bold text-sm">{name}</div>
                    <div className="text-sm text-lightGrey">
                      Star at least one repository on {daysRequired} different days
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
