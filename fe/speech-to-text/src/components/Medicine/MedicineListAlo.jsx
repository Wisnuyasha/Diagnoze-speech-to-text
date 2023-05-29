import React, { useState, useEffect } from "react";
import RatingStar from "../../assets/Medicine/RatingStar";
import StockBox from "../../assets/Medicine/StockBox";

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

  const handleRedirectClick = (slug, id) => {
    window.open(
      `https://www.alodokter.com/aloshop/products/${slug}/${id}`,
      "_blank"
    );
  };

  return (
    <div className="mt-3 grid h-full w-full grid-cols-1 gap-7 p-2 px-8 sm:mt-5 sm:grid-cols-2 sm:p-0 md:mt-5 md:gap-11 lg:grid-cols-3">
      {newMedicine
        ? newMedicine.map((med) => (
            <div
              className=" flex flex-col gap-1 rounded-2xl bg-white p-4 shadow-lg sm:p-5 md:p-6 "
              key={med.id}
            >
              <div className="mb-0 flex w-full justify-end gap-0 pb-0">
                {" "}
                <button
                  onClick={() =>
                    isBookmarked(med)
                      ? unbookmarkMedicine(med)
                      : bookmarkMedicine(med)
                  }
                  className="w-fit"
                >
                  {isBookmarked(med) ? "Bd" : "B"}
                </button>
              </div>
              <img
                src={med.image_300}
                alt={med.name}
                className="mx-auto w-40"
              />
              <div className="w-full h-[0.15rem] bg-dline my-3"></div>
              <span className="mx-auto text-left font-nunito text-lg font-black text-dblack">
                {med.name}
              </span>
              <p className="font-inter text-base font-semibold text-dblack">
                IDR {med.price.amount}
              </p>
              <div className="flex w-full gap-2">
                <span className="font-inter flex gap-1 items-center text-base font-semibold text-dblack">
                  <RatingStar /> {med.rating}
                </span>
                <span className="font-inter flex gap-1 items-center text-base font-semibold text-dblack">
                  <StockBox /> {med.stock}
                </span>
              </div>
              <button
                onClick={() => handleRedirectClick(med.slug, med.id)}
                className="w-full rounded-lg bg-dpurple py-2 font-nunito text-base font-extrabold text-white sm:text-lg"
              >
                Lihat Detail
              </button>
            </div>
          ))
        : ""}
    </div>
  );
}
