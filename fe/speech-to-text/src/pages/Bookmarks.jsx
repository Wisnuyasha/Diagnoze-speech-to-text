import React from "react";
import Navbar from "../components/Layouts/Navbar";
import LandingPage from "../components/Layouts/LandingPage";

export default function Bookmarks() {
  return (
    <div className="flex max-h-full min-h-screen w-full bg-dbg">
      <Navbar />

      <div className="flex h-full w-full flex-col">
        <LandingPage />
        
        <p>bookmark</p>
      </div>
    </div>
  );
}
