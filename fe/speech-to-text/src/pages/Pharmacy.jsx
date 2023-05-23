import axios from "axios";
import React, { useEffect, useState } from "react";
import LandingPage from "../components/LandingPage";
import Navbar from "../components/Navbar";
import { PharmacyList } from "../components/PharmacyList";

export default function Pharmacy() {
    const [currentCity, setCurrentCity] = useState("");
    const [pharmacy, setPharmacy] = useState([])

    useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(getCurrentCity);
        } else {
          alert("Geolocation is not supported by this browser.");
        }
      }, []);

    useEffect(() => {
      if(currentCity){
        searchNearestPharmacy()
      }
    }, [currentCity])
    
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

          searchNearestPharmacy(lat, long)
          setCurrentCity(city);

          return long;
        });
    };
    
    const searchNearestPharmacy = (lat, long) => {
        getCurrentCity();
    
        axios.get(
          `https://nominatim.openstreetmap.org/search.php?q=pharmacy+in+${currentCity}&format=json&bounded=1&viewbox=${
            long - 0.5
          },${lat - 0.5},${long + 0.5},${lat + 0.5}&limit=10`
        ).then((response) => {
          let pharms = response.data
          pharms.forEach((p) => {
            p.distance = getDistance(lat, long, p.lat, p.lon)
          })
          setPharmacy(pharms)
        });
      }
  return (
    <div className="min-h-screen max-h-full w-full flex bg-dbg">
    <Navbar />
    <div className="flex flex-col w-full h-full pt-5 md:pt-7">
    <LandingPage />
    <p className="font-nunito font-black text-2xl sm:text-3xl md:text-4xl text-dblack mb-2 sm:mb-3 mt-5">You are in <span className="text-2xl sm:text-3xl">{currentCity}</span></p>
    <PharmacyList pharmacy={pharmacy} />
    </div>
  </div>
  )
}
