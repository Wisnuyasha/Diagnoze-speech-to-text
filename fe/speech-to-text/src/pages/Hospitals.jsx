import axios from "axios";
import React, { useEffect, useState } from "react";


const Hospitals = () => {
  const [currentCity, setCurrentCity] = useState("")

  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCurrentCity);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

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
  };

  const getNearestHospitals = (currentCity) => { 
    axios
      .put(`http://localhost:5001/hospital/location`, {
        search : currentCity
      })
      .then((response) => {
        console.log(response.data);
      }).catch((error) => {
        throw error;
      });
   }


  return (
    <>
      <div className="container">
        <h2>Nearest Hospitals</h2>
        <p>You are at {currentCity}</p>
        <ul>
          <li></li>
        </ul>
        <button onClick={getNearestHospitals}>anjay</button>
      </div>
    </>
  );
};

export default Hospitals;
