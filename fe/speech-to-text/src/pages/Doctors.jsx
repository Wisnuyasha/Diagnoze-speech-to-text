import React from 'react'
// import axios from "axios";
// import DoctorList from "../components/DoctorList";
import LandingPage from "../components/LandingPage";
import Navbar from "../components/Navbar";

export default function Doctors() {
  return (
    <div className="flex max-h-full min-h-screen w-full bg-dbg">
    <Navbar />
    <div className="flex h-full w-full flex-col">
      <LandingPage />
      <div className="mx-6 flex flex-col lg:mx-10">
        <p className="mb-2 mt-5 text-center font-nunito text-2xl font-black text-dblack sm:mb-3 sm:text-3xl md:text-4xl">
          Doctor Page
        </p>
        {/* <DoctorList doctors={doctors} /> */}
      </div>
    </div>
  </div>
  )
}
