import axios from "axios";
import React, { useEffect, useState } from "react";
import LandingPage from "../components/LandingPage";
import Navbar from "../components/Navbar";
import { PharmacyList } from "../components/PharmacyList";

export default function Pharmacy() {
  const [currentCity, setCurrentCity] = useState("");
  const [pharmacy, setPharmacy] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCurrentCity);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (currentCity) {
      searchNearestPharmacy();
    }
  }, [currentCity]);

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const getCurrentCity = async (position) => {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    await axios
      .get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=jsonv2`
      )
      .then((response) => {
        const city = response.data.address.city;

        searchNearestPharmacy(lat, long);
        setCurrentCity(city);

        return long;
      });
  };

  const searchNearestPharmacy = (lat, long) => {
    getCurrentCity();

    axios
      .get(
        `https://nominatim.openstreetmap.org/search.php?q=pharmacy+in+${currentCity}&format=json&bounded=1&viewbox=${
          long - 0.5
        },${lat - 0.5},${long + 0.5},${lat + 0.5}&limit=10`
      )
      .then((response) => {
        let pharms = response.data;
        pharms.forEach((p) => {
          p.distance = getDistance(lat, long, p.lat, p.lon);
        });
        setPharmacy(pharms);
      });
  };
  return (
    <div className="flex max-h-full min-h-screen w-full bg-dbg">
      <Navbar />
      <div className="flex h-full w-full flex-col">
        <LandingPage />
        <div className="mx-6 mt-3 flex flex-col sm:mt-4 md:mt-5 lg:mx-10 lg:mt-6 xl:mt-7">
            <span className="mb-2 font-nunito text-2xl font-black text-dblack sm:mb-3 sm:text-3xl md:text-4xl">
              Nearby Hospitals
            </span>
            <div className="flex items-center md:gap-6">
              <div className="flex h-10 w-full items-center rounded-lg bg-white px-3 pl-4 md:h-12 xl:h-14 xl:px-5">
                <div className="flex w-full items-center justify-between">
                  {currentCity ? (
                    <>
                      <span className="block font-nunito text-base font-bold text-dblack md:hidden lg:text-lg">
                        Kamu sedang di{" "}
                        <span className="font-black">Kota {currentCity}</span>
                      </span>
                      <span className="hidden font-nunito text-base font-bold text-dblack md:block lg:text-lg">
                        Kamu saat ini sedang berada di{" "}
                        <span className="font-black">Kota {currentCity}</span>
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M15 2.50044C10.8325 2.47102 7.37084 5.70823 7.12123 9.86834C6.87162 14.0285 9.92139 17.6564 14.0625 18.1254V23.5004C14.0625 24.0182 14.4822 24.4379 15 24.4379C15.5178 24.4379 15.9375 24.0182 15.9375 23.5004V18.1254C20.0786 17.6564 23.1284 14.0285 22.8788 9.86834C22.6292 5.70823 19.1675 2.47102 15 2.50044ZM14.1875 6.83794C12.7495 6.83793 11.5819 7.99998 11.575 9.43794C11.575 9.95571 11.1553 10.3754 10.6375 10.3754C10.1197 10.3754 9.7 9.95571 9.7 9.43794C9.70689 6.96445 11.714 4.96293 14.1875 4.96294C14.7053 4.96294 15.125 5.38268 15.125 5.90044C15.125 6.41821 14.7053 6.83794 14.1875 6.83794ZM19.775 19.7379C20.0135 19.2873 20.5651 19.1052 21.025 19.3254C22.5599 19.9166 23.6194 21.3359 23.75 22.9754C23.75 25.7379 20 27.8254 15 27.8254C10 27.8254 6.25 25.7379 6.25 22.9754C6.40343 21.3592 7.45914 19.9693 8.975 19.3879C9.43754 19.1532 10.0028 19.3379 10.2375 19.8004C10.4722 20.263 10.2875 20.8282 9.825 21.0629C8.725 21.6254 8.1 22.3254 8.1 22.9754C8.1 24.3254 11.0625 25.8754 15.0125 25.8754C18.9625 25.8754 21.9125 24.3129 21.9125 22.9004C21.9125 22.2379 21.2875 21.5504 20.1875 20.9879C19.7314 20.7541 19.5477 20.1973 19.775 19.7379Z"
                          fill="#343434"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      <span className="block font-nunito text-base font-bold text-dblack lg:text-lg">
                        Sedang Mencari Lokasimu..
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M15 2.50044C10.8325 2.47102 7.37084 5.70823 7.12123 9.86834C6.87162 14.0285 9.92139 17.6564 14.0625 18.1254V23.5004C14.0625 24.0182 14.4822 24.4379 15 24.4379C15.5178 24.4379 15.9375 24.0182 15.9375 23.5004V18.1254C20.0786 17.6564 23.1284 14.0285 22.8788 9.86834C22.6292 5.70823 19.1675 2.47102 15 2.50044ZM14.1875 6.83794C12.7495 6.83793 11.5819 7.99998 11.575 9.43794C11.575 9.95571 11.1553 10.3754 10.6375 10.3754C10.1197 10.3754 9.7 9.95571 9.7 9.43794C9.70689 6.96445 11.714 4.96293 14.1875 4.96294C14.7053 4.96294 15.125 5.38268 15.125 5.90044C15.125 6.41821 14.7053 6.83794 14.1875 6.83794ZM19.775 19.7379C20.0135 19.2873 20.5651 19.1052 21.025 19.3254C22.5599 19.9166 23.6194 21.3359 23.75 22.9754C23.75 25.7379 20 27.8254 15 27.8254C10 27.8254 6.25 25.7379 6.25 22.9754C6.40343 21.3592 7.45914 19.9693 8.975 19.3879C9.43754 19.1532 10.0028 19.3379 10.2375 19.8004C10.4722 20.263 10.2875 20.8282 9.825 21.0629C8.725 21.6254 8.1 22.3254 8.1 22.9754C8.1 24.3254 11.0625 25.8754 15.0125 25.8754C18.9625 25.8754 21.9125 24.3129 21.9125 22.9004C21.9125 22.2379 21.2875 21.5504 20.1875 20.9879C19.7314 20.7541 19.5477 20.1973 19.775 19.7379Z"
                          fill="#343434"
                        />
                      </svg>
                    </>
                  )}
                </div>
              </div>
            </div>
            <PharmacyList pharmacy={pharmacy} />
          </div>
      </div>
    </div>
  );
}
