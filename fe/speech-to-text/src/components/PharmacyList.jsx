import React from 'react'

export const PharmacyList = ({ pharmacy }) => {
  return (
    <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-3 sm:mt-5 md:mt-5 gap-7 md:gap-11 p-2 px-8 sm:p-0">
    {
        pharmacy ? pharmacy
            .sort((a, b) => a.distance - b.distance)
            .map((p) => (
                <div
                className=" p-4 sm:p-5 md:p-6 bg-white shadow-lg flex flex-col gap-2 rounded-2xl "
                key={p}
              >
                <span className="mx-auto font-nunito font-black text-dblack text-lg">{p.display_name}</span>
                <p className="mx-auto font-inter font-semibold text-dblack text-base">
                  Jarak : {p.distance.toFixed(2)} km
                </p>
              </div>
        )) 
    : ""}
    </div>
  )
}
