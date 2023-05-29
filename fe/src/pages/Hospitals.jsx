import axios from "axios";
import React, { useEffect, useState } from "react";
import HospitalList from "../components/Hospitals/HospitalList";
import LandingPage from "../components/Layouts/LandingPage";
import Navbar from "../components/Layouts/Navbar";
import LocationIcon from "../assets/HospitalPharmacy/LocationIcon";

const Hospitals = () => {
  const [currentCity, setCurrentCity] = useState("");
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCurrentCity);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (currentCity) {
      searchNearestHospitals();
    }
  }, [currentCity]);

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
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

        searchNearestHospitals(lat, long);
        setCurrentCity(city);

        return long;
      });
  };

  const searchNearestHospitals = (lat, long) => {
    getCurrentCity();

    axios
      .get(
        `https://nominatim.openstreetmap.org/search.php?q=hospital+in+${currentCity}&format=json&bounded=1&viewbox=${
          long - 0.5
        },${lat - 0.5},${long + 0.5},${lat + 0.5}&limit=10`
      )
      .then((response) => {
        let hospital = response.data;
        hospital.forEach((h) => {
          h.distance = getDistance(lat, long, h.lat, h.lon);
        });
        setHospitals(hospital);
        console.log(hospitals);
      });
  };

  return (
    <>
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
                      <LocationIcon />
                    </>
                  ) : (
                    <>
                      <span className="block font-nunito text-base font-bold text-dblack lg:text-lg">
                        Sedang Mencari Lokasimu..
                      </span>
                      <LocationIcon />
                    </>
                  )}
                </div>
              </div>
            </div>
            <HospitalList hospitals={hospitals} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hospitals;
