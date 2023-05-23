import React from "react";
import { Link } from "react-router-dom";

export default function MedicineList({ medicine }) {
  return (
    <div className="mt-3 grid h-full w-full grid-cols-1 gap-7 p-2 px-8 sm:mt-5 sm:grid-cols-2 sm:p-0 md:mt-5 md:gap-11 lg:grid-cols-3">
      {medicine
        ? medicine.map((med) => (
            <div
              className=" flex flex-col gap-2 rounded-2xl bg-white p-4 shadow-lg sm:p-5 md:p-6 "
              key={med.external_id}
            >


              <img
                src={med.image_url}

                alt={med.name}
                className="mx-auto w-40"
              />
              <span className="mx-auto font-nunito text-lg font-black text-dblack">
                {med.name}
              </span>
              <p className="mx-auto font-inter text-base font-semibold text-dblack">

                IDR {med.min_price} - {med.base_price}
              </p>

              <Link
                to={{
                  pathname: `/details/${med.slug}`,
                }}
              >
                <button className="w-full rounded-lg bg-dpurple py-2 font-nunito text-base font-extrabold text-white sm:text-lg">
                  Lihat Detail
                </button>
              </Link>
            </div>
          ))
        : ""}
    </div>
  );
}
