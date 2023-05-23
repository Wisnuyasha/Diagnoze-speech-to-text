import React from "react";
import { Link } from "react-router-dom";

export default function MedicineList({ medicine }) {
  return (
    <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-3 sm:mt-5 md:mt-5 gap-7 md:gap-11 p-2 px-8 sm:p-0">
      {medicine
        ? medicine.map((med) => (
            <div
              className=" p-4 sm:p-5 md:p-6 bg-white shadow-lg flex flex-col gap-2 rounded-2xl "
              key={med.external_id}
            >
              <img
                src={med.image_url}
                alt={med.name}
                className="w-40 mx-auto"
              />
              <span className="mx-auto font-nunito font-black text-dblack text-lg">
                {med.name}
              </span>
              <p className="mx-auto font-inter font-semibold text-dblack text-base">
                IDR {med.min_price} - {med.base_price}
              </p>
              <Link
                to={{
                  pathname: `/details/${med.slug}`,
                }}
              >
                <button className="w-full bg-dpurple rounded-lg font-nunito font-extrabold text-base sm:text-lg text-white py-2">
                  Lihat Detail
                </button>
              </Link>
            </div>
          ))
        : ""}
    </div>
  );
}
