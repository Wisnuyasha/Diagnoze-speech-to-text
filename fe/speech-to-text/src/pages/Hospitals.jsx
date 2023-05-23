import axios from "axios";
import React, { useEffect, useState } from "react";
import HospitalList from "../components/HospitalList";
import LandingPage from "../components/LandingPage";
import Navbar from "../components/Navbar";

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
        const city = response.data.display_name;

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
      <div className="min-h-screen max-h-full w-full flex bg-dbg">
        <Navbar />
        <div className="flex flex-col w-full h-full pt-5 md:pt-7">
          <LandingPage />
          <p className="font-nunito font-black text-2xl sm:text-3xl md:text-4xl text-dblack mb-2 sm:mb-3 mt-5">
            You are in{" "}
            <span className="text-2xl sm:text-3xl">{currentCity}</span>
          </p>
          <HospitalList hospitals={hospitals} />
        </div>
      </div>
    </>
  );
};

export default Hospitals;
