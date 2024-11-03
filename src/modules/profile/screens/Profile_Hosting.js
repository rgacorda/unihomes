"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Title from "../components/Title";
import Profile from "../components/Profile";
import Hosting_Verification from "../components/Hosting_Verification";

const Profile_Hosting = () => {
  const [activeItem, setActiveItem] = useState("account");

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <section className="dark:bg-secondary pt-[35px] lg:pt-[60px] md:pt-[80px] md:p-8 md:pt-[100px] lg:pt-[30px] lg:p-16 h-full">
      <div className=" flex justify-center ">
        <div className="w-[550px] sm:w-[90%] md:w-[95%] lg:w-[1300px]">
          <div className="flex flex-col ">
            <div className="">
              <Title />
            </div>
            <div className="md:flex lg:flex ">
              <div className="md:w-1/4 lg:w-1/6">
                <Sidebar
                  activeItem={activeItem}
                  onItemClick={handleItemClick}
                />
              </div>
              <div className="md:w-3/4 lg:w-5/6">
                {activeItem === "account" ? (
                  <Profile />
                ) : (
                  <Hosting_Verification />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile_Hosting;
