import React, { useState, useEffect } from 'react';
import Navbar from "../components/Layouts/Navbar";
import LandingPage from "../components/Layouts/LandingPage";
import MedicineList from "../components/Medicine/MedicineList";

export default function Bookmarks() {
  const [bookmarkedMedicines, setBookmarkedMedicines] = useState([]);

  const getBookmarkedMedicines = () => {
    let medicines = JSON.parse(localStorage.getItem("bookmarkedMedicines") || "[]");
    setBookmarkedMedicines(medicines);
  }

  useEffect(() => {
    getBookmarkedMedicines();
  }, [bookmarkedMedicines]);
  
  return (
    <div className="flex max-h-full min-h-screen w-full bg-dbg">
      <Navbar />
      <div className="flex h-full w-full flex-col">
        <LandingPage />
        <div className="flex h-fit w-full flex-col border-black p-6 sm:px-9 md:px-11 md:pt-8">
            <span className="mb-2 font-nunito text-2xl font-black text-dblack sm:mb-3 sm:text-3xl md:text-4xl">
              Bookmarked Medicine
            </span>
            <MedicineList medicine={bookmarkedMedicines} />
        </div>
      </div>
    </div>
  );
}
