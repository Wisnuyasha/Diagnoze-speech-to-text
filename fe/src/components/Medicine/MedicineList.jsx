import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function MedicineList({ medicine }) {
  const theme = createTheme({
    palette: {
      redheart: {
        main: "#2733C7",
      },
    },
  });

  const [bookmarkedMedicines, setBookmarkedMedicines] = useState(
    JSON.parse(localStorage.getItem("bookmarkedMedicines") || "[]")
  );

  useEffect(() => {
    setBookmarkedMedicines(
      JSON.parse(localStorage.getItem("bookmarkedMedicines") || "[]")
    );
  }, []);

  const isBookmarked = (med) => {
    return bookmarkedMedicines.some(
      (medicine) => medicine.external_id === med.external_id
    );
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
      (medicine) => medicine.external_id !== med.external_id
    );
    setBookmarkedMedicines(newBookmarkedMedicines);
    localStorage.setItem(
      "bookmarkedMedicines",
      JSON.stringify(newBookmarkedMedicines)
    );
  };

  return (
    <div className="mt-3 grid h-full w-full grid-cols-1 gap-7 p-2 px-8 sm:mt-5 sm:grid-cols-2 sm:p-0 md:mt-5 md:gap-11 lg:grid-cols-3">
      {medicine
        ? medicine.map((med) => (
            <div
              className=" flex flex-col gap-1 rounded-2xl bg-white p-4 pt-3 shadow-lg sm:p-5 sm:pt-4 md:p-6 md:pt-5 "
              key={med.external_id}
            >
              <div className="mb-0 flex w-full justify-end gap-0 pb-0">
                <ThemeProvider theme={theme}>
                  <Checkbox
                    checked={isBookmarked(med)}
                    onChange={() =>
                      isBookmarked(med)
                        ? unbookmarkMedicine(med)
                        : bookmarkMedicine(med)
                    }
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    color="redheart"
                  />
                </ThemeProvider>
              </div>
              <img
                src={med.image_url}
                alt={med.name}
                className="mx-auto w-40"
              />
              <div className="my-3 h-[0.15rem] w-full bg-dline"></div>
              <span className="text-left font-nunito text-lg font-black text-dblack">
                {med.name}
              </span>
              <p className="font-inter text-base font-semibold text-dblack">
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
