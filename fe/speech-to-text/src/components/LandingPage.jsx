import React from "react";

export default function LandingPage() {
  return (
    <div className="flex h-fit w-full flex-col gap-5 px-10 sm:px-16 md:px-20  pt-5 md:pt-7 lg:pt-10 xl:pt-12">
      <div className="flex flex-col">
        <span className="font-nunito text-3xl font-black text-dblack sm:text-4xl md:text-5xl">
          Hi, Putih!
        </span>
        <span className="font-inter text-sm font-bold text-dgrey sm:text-base md:text-lg">
          Welcome to Diagno.ze
        </span>
      </div>
      <div className="rounded-3xl bg-dpurple p-4 px-6 sm:px-10 sm:py-8 md:px-11 md:py-9 lg:rounded-[2.3rem] xl:px-14 xl:pt-12">
        <div className="flex flex-col font-nunito text-lg font-black text-white sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          <span>Temukan Obat,</span>
          <span>Hingga RS Terdekat</span>
        </div>
        <div className="mt-4 flex justify-between md:mt-6 lg:mt-7">
          <div className="h-fit rounded-2xl bg-white px-4 py-1 lg:rounded-3xl lg:px-7 lg:py-2">
            <span className="font-nunito text-sm font-black text-dpurple sm:text-lg md:text-xl">
              Discover
            </span>
          </div>
          <span className="mt-5 font-nunito text-lg font-black text-white sm:mt-6 sm:text-xl md:mt-7 md:text-2xl lg:text-3xl xl:text-4xl">
            Diagno.ze
          </span>
        </div>
      </div>
    </div>
  );
}
