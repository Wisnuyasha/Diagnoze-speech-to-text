import React from "react";
import { Link } from "react-router-dom";

export default function DoctorList({ doctors }) {
  return (
    <div className="w-full h-full mt-3 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-7 p-2 px-7 ">
      {doctors
        ? doctors.map((doc) => (
            <div
              className=" p-4 shadow-md border-gray-200 border-[1px]"
              key={doc.external_id}
            >
              <p>{doc.name}</p>
              <img
                src={doc.image_url}
                alt={doc.name}
                className="w-40 mx-auto"
              />
              <Link
                to={{
                  pathname: `/doctor-details/${doc.slug}`,
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
