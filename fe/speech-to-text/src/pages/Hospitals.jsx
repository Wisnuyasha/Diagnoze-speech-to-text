import axios from "axios";
import React, { useEffect, useState } from "react";


const Hospitals = () => {
  const [currentCity, setCurrentCity] = useState("")

  const getCurrentCity = async (position) => {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    const res = await axios
      .get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=jsonv2`
      )
      .then((response) => {
        const city = response.data.address.city
        setCurrentCity(city)
      });
    console.log(currentCity);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCurrentCity);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, [currentCity]);


  return (
    <>
      <div className="container">
        <h2>Nearest Hospitals</h2>
        <p>You are at {currentCity}</p>
        <ul>
          <li></li>
        </ul>
      </div>
    </>
  );
};

export default Hospitals;
