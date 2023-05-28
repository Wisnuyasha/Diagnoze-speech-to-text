import React, { useState, useEffect } from 'react';
import Navbar from "../components/Layouts/Navbar";
import LandingPage from "../components/Layouts/LandingPage";
import MedicineListAlo from "../components/Medicine/MedicineListAlo";

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
        <MedicineListAlo medicine={bookmarkedMedicines} />
      </div>
    </div>
  );
}
