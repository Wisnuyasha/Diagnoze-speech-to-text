import React from "react";
import { Link } from "react-router-dom"

export default function MedicineList({ medicine }) {

  return (
    <div className="w-full h-full mt-3 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-7 p-2 px-7 ">
      {medicine
        ? medicine.map((med) => (
            <div
              className=" p-4 shadow-md border-gray-200 border-[1px]"
              key={med.external_id}
            >
              <p>{med.name}</p>
              <img
                src={med.image_url}
                alt={med.name}
                className="w-40 mx-auto"
              />
              <p>
                Range Harga: Rp.{med.min_price} - Rp.{med.base_price}
              </p>
              <Link
                to={{
                  pathname: `/details/${med.slug}`,
                }}
              >
                <button
                >
                  Details
                </button>
              </Link>
            </div>
          ))
        : ""}
    </div>
  );
}
