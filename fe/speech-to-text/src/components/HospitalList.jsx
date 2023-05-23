import React from "react";

export default function HospitalList({ hospitals }) {
  return (
        <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-3 sm:mt-5 md:mt-5 gap-7 md:gap-11 p-2 px-8 sm:p-0 md:mr-16 md:ml-16 lg:ml-20">
        {hospitals
          ? hospitals
            .sort((a, b) => a.distance - b.distance)
            .map((h) => (
              <div
                className=" p-4 sm:p-5 md:p-6 bg-white shadow-lg flex flex-col gap-2 rounded-2xl "
                key={h}
              >
                <span className="mx-auto font-nunito font-black text-dblack text-lg">{h.display_name}</span>
                <p className="mx-auto font-inter font-semibold text-dblack text-base">
                  Jarak : {h.distance.toFixed(2)} km
                </p>
              </div>
            ))
          : ""}
      </div>
  );
}
