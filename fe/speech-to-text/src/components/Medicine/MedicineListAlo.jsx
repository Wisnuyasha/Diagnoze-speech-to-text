import React, { useState, useEffect } from "react";

export default function MedicineListAlo({ medicine }) {
  const [bookmarkedMedicines, setBookmarkedMedicines] = useState(
    JSON.parse(localStorage.getItem("bookmarkedMedicines") || "[]")
  );

  useEffect(() => {
    setBookmarkedMedicines(
      JSON.parse(localStorage.getItem("bookmarkedMedicines") || "[]")
    );
  }, []);

  const isBookmarked = (med) => {
    return bookmarkedMedicines.some((medicine) => medicine.id === med.id);
  };

  const bookmarkMedicine = (med) => {
    if (!isBookmarked(med)) {
      const newBookmarkedMedicines = [...bookmarkedMedicines, med];
      setBookmarkedMedicines(newBookmarkedMedicines);
      localStorage.setItem(
        "bookmarkedMedicines",
        JSON.stringify(newBookmarkedMedicines)
      );
    }
  };

  const unbookmarkMedicine = (med) => {
    const newBookmarkedMedicines = bookmarkedMedicines.filter(
      (medicine) => medicine.id !== med.id
    );
    setBookmarkedMedicines(newBookmarkedMedicines);
    localStorage.setItem(
      "bookmarkedMedicines",
      JSON.stringify(newBookmarkedMedicines)
    );
  };

  const newMedicine = medicine.map((med) => {
    const newItem = { ...med };
    const newStr = med.name.replace(/\s+/g, "-");
    newItem.slug = newStr;
    return newItem;
  });

  function handleRedirectClick({ slug, id }) {
    window.location.href = `https://www.alodokter.com/aloshop/products/${slug}/${id}`;
  }

  return (
    <div className="mt-3 grid h-full w-full grid-cols-1 gap-7 p-2 px-8 sm:mt-5 sm:grid-cols-2 sm:p-0 md:mt-5 md:gap-11 lg:grid-cols-3">
      {newMedicine
        ? newMedicine.map((med) => (
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
              <div className="flex w-full justify-between">
                <span className="mx-auto font-inter text-base font-semibold text-dblack">
                  Rating: {med.rating}
                </span>
                <span className="mx-auto font-inter text-base font-semibold text-dblack">
                  Stock: {med.stock}
                </span>
              </div>
              <button
                onClick={() =>
                  handleRedirectClick({ slug: med.slug, id: med.id })
                }
                className="w-full rounded-lg bg-dpurple py-2 font-nunito text-base font-extrabold text-white sm:text-lg"
              >
                Lihat Detail
              </button>
              <button
                onClick={() =>
                  isBookmarked(med)
                    ? unbookmarkMedicine(med)
                    : bookmarkMedicine(med)
                }
                className={`w-full rounded-lg py-2 font-nunito text-base font-extrabold ${
                  isBookmarked(med)
                    ? "bg-red-500 text-white"
                    : "bg-blue-500 text-white"
                } sm:text-lg`}
              >
                {isBookmarked(med) ? "Bookmarked" : "Bookmark"}
              </button>
            </div>
          ))
        : ""}
    </div>
  );
}
