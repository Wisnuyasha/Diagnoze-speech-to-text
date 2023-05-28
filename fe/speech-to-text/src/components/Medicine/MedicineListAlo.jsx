import React from "react";
import { Link } from "react-router-dom";

export default function MedicineList({ medicine }) {
  // fungsi untuk bookmark
  const bookmarkMedicine = (med) => {
    let bookmarkedMedicines = JSON.parse(localStorage.getItem("bookmarkedMedicines") || "[]");
    let exists = bookmarkedMedicines.some(x => x.id === med.id);
    if (!exists) {
      bookmarkedMedicines.push(med);
      localStorage.setItem("bookmarkedMedicines", JSON.stringify(bookmarkedMedicines));
    }
  };

  // fungsi untuk unbookmark
  const unbookmarkMedicine = (med) => {
    let bookmarkedMedicines = JSON.parse(localStorage.getItem("bookmarkedMedicines") || "[]");
    let newBookmarkedMedicines = bookmarkedMedicines.filter(x => x.id !== med.id);
    localStorage.setItem("bookmarkedMedicines", JSON.stringify(newBookmarkedMedicines));
  };

  // fungsi untuk cek apakah sudah dibookmark
  const isBookmarked = (med) => {
    let bookmarkedMedicines = JSON.parse(localStorage.getItem("bookmarkedMedicines") || "[]");
    return bookmarkedMedicines.some(x => x.id === med.id);
  };
  return (
    <div className="mt-3 grid h-full w-full grid-cols-1 gap-7 p-2 px-8 sm:mt-5 sm:grid-cols-2 sm:p-0 md:mt-5 md:gap-11 lg:grid-cols-3">
      {medicine
        ? medicine.map((med) => (
            <div
              className=" flex flex-col gap-2 rounded-2xl bg-white p-4 shadow-lg sm:p-5 md:p-6 "
              key={med.id}
            >
              <img
                src={med.image_300}
                alt={med.name}
                className="mx-auto w-40"
              />
              <span className="mx-auto text-center font-nunito text-lg font-black text-dblack">
                {med.name}
              </span>
              <p className="mx-auto font-inter text-base font-semibold text-dblack">
                IDR {med.price.display_amount}
              </p>
              {isBookmarked(med) ? 
            <button onClick={() => unbookmarkMedicine(med)}>Unbookmark</button> : 
            <button onClick={() => bookmarkMedicine(med)}>Bookmark</button>
          }
              <div className="flex w-full justify-between">
                <span className="mx-auto font-inter text-base font-semibold text-dblack">
                  Rating: {med.rating}
                </span>
                <span className="mx-auto font-inter text-base font-semibold text-dblack">
                  Stock: {med.stock}
                </span>
              </div>

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
