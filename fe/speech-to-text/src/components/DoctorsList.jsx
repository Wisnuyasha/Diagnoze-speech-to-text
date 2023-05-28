import React from "react";
import { Link } from "react-router-dom";

export default function DoctorsList({ doctors }) {
  return (
    <div className="mt-3 grid h-full w-full grid-cols-1 gap-7 p-2 px-8 sm:mt-5 sm:grid-cols-2 sm:p-0 md:mt-5 md:gap-11 lg:grid-cols-3">
      {doctors
        ? doctors.map((doc) => (
            <div
              className=" flex flex-col gap-2 rounded-2xl bg-white p-4 shadow-lg sm:p-5 md:p-6 "
              key={doc.external_id}
            >


              <img
                src={doc.image_url}

                alt={doc.headline}
                className="mx-auto w-40"
              />
              <span className="mx-auto font-nunito text-lg font-black text-dblack">
                {/* {doc.alias_name} */}
              </span>
              <p className="mx-auto font-inter text-base font-semibold text-dblack">
                {/* Rating: {doc.rating_percentage}
                Spesialis: {doc.speciality_name}
                Pasien: {doc.booking_count} */}
              </p>

              <Link
                to={{
                  pathname: `/details/${doc.slug}`,
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
