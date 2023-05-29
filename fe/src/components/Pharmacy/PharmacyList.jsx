import React from "react";
import HouseIcon from "../../assets/HospitalPharmacy/HouseIcon";
import CompassIcon from "../../assets/HospitalPharmacy/CompassIcon";

export const PharmacyList = ({ pharmacy }) => {
  return (
    <div className="mt-3 grid h-full w-full grid-cols-1 gap-7 p-2 px-8 sm:mt-5 sm:grid-cols-2 sm:p-0 md:mt-5 md:gap-11 lg:grid-cols-3">
      {pharmacy
        ? pharmacy
            .sort((a, b) => a.distance - b.distance)
            .map((p) => (
              <div
                className=" flex flex-col gap-2 rounded-2xl bg-white p-4 shadow-lg sm:p-5 md:p-6 "
                key={p}
              >
                <HouseIcon />
                <span className="font-nunito text-lg font-black text-dblack">
                  {p.display_name}
                </span>
                <p className="flex items-center gap-x-2 font-inter text-base font-semibold text-dblack">
                  <CompassIcon /> {p.distance.toFixed(2)} km
                </p>
              </div>
            ))
        : ""}
    </div>
  );
};
