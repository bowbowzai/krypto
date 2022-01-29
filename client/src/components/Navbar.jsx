import React, { useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import logo from "../../images/logo.png";

function NavbarItem({ title, classProps }) {
  return <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>;
}

export default function NavBar() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex justify-between items-center p-4 md:justify-center">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="text-white list-none flex-initial items-center hidden md:flex">
        {["Market", "Exchange", "Tutorials", "Wallet"].map((item, index) => (
          <NavbarItem title={item} key={item + index} />
        ))}
        <li className="bg-[#2952e3] mx-3 py-2 px-7 rounded-full cursor-pointer hover:bg-[#2546bd]">
          Login
        </li>
      </ul>
      <div>
        {!isMenuOpen && (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setMenuOpen(true)}
          />
        )}
        {isMenuOpen && (
          <ul className="z-10 fixed top-0 right-0 p-2 w-[70vw] h-screen shadow-2xl md:hidden flex flex-col justify-start items-end blue-glassmorphism text-white animate-slide-in">
            <li className="">
              <AiOutlineClose
                fontSize={20}
                className="text-3xl text-white cursor-pointer"
                onClick={() => setMenuOpen(false)}
              />
            </li>
            {["Market", "Exchange", "Tutorials", "Wallet"].map(
              (item, index) => (
                <NavbarItem
                  title={item}
                  key={item + index}
                  classProps={"text-xl my-2"}
                />
              )
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
