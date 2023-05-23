import React from "react";

export default function LandingPage() {
  return (
    <div className="w-full flex flex-col gap-5 h-fit px-10 sm:px-16 md:px-20">
      <div className="flex flex-col">
        <span className="font-black font-nunito text-dblack text-3xl sm:text-4xl md:text-5xl">
          Hi, Putih!
        </span>
        <span className="font-inter font-bold text-dgrey text-sm sm:text-base md:text-lg">
          Welcome to Diagno.ze
        </span>
      </div>
      <div className="bg-dpurple rounded-3xl lg:rounded-[2.3rem] p-4 px-6 sm:px-10 sm:py-8 md:px-11 md:py-9 xl:px-14 xl:pt-12">
        <div className="flex flex-col font-black font-nunito text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          <span>Temukan Obat,</span>
          <span>Hingga RS Terdekat</span>
        </div>
        <div className="flex justify-between mt-4 md:mt-6 lg:mt-7">
          <div className="bg-white h-fit py-1 px-4 lg:py-2 lg:px-7 rounded-2xl lg:rounded-3xl">
            <span className="font-black font-nunito text-dpurple text-sm sm:text-lg md:text-xl">
              Discover
            </span>
          </div>
          <span className="font-black font-nunito mt-5 sm:mt-6 md:mt-7 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white">
            Diagno.ze
          </span>
        </div>
      </div>
    </div>
  );
}
