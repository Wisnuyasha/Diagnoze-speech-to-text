import React from "react";
import { Link } from "react-router-dom";
import DiagnozeIcon from "../../assets/Navbar/DiagnozeIcon";
import HospitalIcon from "../../assets/Navbar/HospitalIcon";
import PharmacyIcon from "../../assets/Navbar/PharmacyIcon";
import DoctorsIcon from "../../assets/Navbar/DoctorsIcon";
import BookmarksIcon from "../../assets/Navbar/BookmarksIcon";

export default function Navbar() {
  return (
    <div className="hidden w-1/3 rounded-xl lg:block">
      <aside
        id="default-sidebar"
        className="fixed h-full w-1/4 -translate-x-full rounded-xl transition-transform sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full flex flex-col justify-center overflow-y-auto rounded-xl bg-white px-3 py-4">
          <div class="flex flex-col items-center justify-center ">
            <div className="h-32 w-32 rounded-full bg-dpurple xl:h-40 xl:w-40"></div>
            <p class="mx-2 mt-2 text-3xl font-extrabold text-dpurple xl:text-4xl ">
              Diagno.ze
            </p>
          </div>
          <div className="mx-8 xl:mx-10">
            <ul className="mt-8 flex flex-col gap-1 space-y-2 font-medium hover:text-white xl:mt-12">
              <li className="flex items-center rounded-full bg-dpurple px-4">
                <Link
                  to={{
                    pathname: `/`,
                  }}
                  className="mx-auto flex items-center justify-center rounded-lg p-4 text-white "
                >
                  <DiagnozeIcon />
                  <span className="ml-3 font-nunito text-xl font-bold xl:text-2xl">
                    Diagnoze
                  </span>
                </Link>
              </li>
              <li className="flex items-center rounded-full px-4 hover:bg-dpurple hover:text-white">
                <Link
                  to={{
                    pathname: `/hospitals`,
                  }}
                  className="mx-auto flex items-center justify-center  rounded-lg p-4 text-center text-dpurple hover:text-white"
                >
                  <HospitalIcon />
                  <span className="ml-3 font-nunito text-xl font-bold xl:text-2xl">
                    Hospital
                  </span>
                </Link>
              </li>
              <li className="flex items-center rounded-full px-4 hover:bg-dpurple">
                <Link
                  to={{
                    pathname: `/pharmacy`,
                  }}
                  className="mx-auto flex items-center justify-center  rounded-lg p-4 text-center text-dpurple hover:text-white "
                >
                  <PharmacyIcon />
                  <span className="ml-3 font-nunito text-xl font-bold xl:text-2xl">
                    Pharmacy
                  </span>
                </Link>
              </li>
              <li className="flex items-center rounded-full px-4 hover:bg-dpurple">
                <Link
                  to={{
                    pathname: `/bookmarks`,
                  }}
                  className="mx-auto flex items-center justify-center  rounded-lg p-4 text-center text-dpurple hover:text-white "
                >
                  <BookmarksIcon />
                  <span className="ml-3 font-nunito text-xl font-bold xl:text-2xl">
                    Bookmarks
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}
