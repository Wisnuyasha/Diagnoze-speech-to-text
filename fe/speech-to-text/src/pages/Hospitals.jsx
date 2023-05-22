import axios from "axios";
import React, { useEffect, useState } from "react";


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
      console.log(currentCity)
      getNearestHospitals(currentCity);
    }
  }, [currentCity]);

  const getCurrentCity = async (position) => {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    const res = await axios
      .get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=jsonv2`
      )
      .then((response) => {
        const city = response.data.address.city;
        setCurrentCity(city);
      });

      const response = axios.get(
        `https://nominatim.openstreetmap.org/search.php?q=hospital+in+${currentCity}&format=json&bounded=1&viewbox=${
          long - 0.5
        },${lat - 0.5},${long + 0.5},${lat + 0.5}&limit=10`, () => {
          try {
            const address = response.data.address;
            console.log(address);
          } catch (error) {
            throw error;
          }
        }
      );
  };

  const getNearestHospitals = (currentCity) => {
    axios
      .put(`http://localhost:5000/hospital/location`, {
        search: currentCity,
      })
      .then((response) => {
        let hospitals = response.data;
        setHospitals(hospitals);
        console.log(hospitals);
      })
      .catch((error) => {
        throw error;
      });
  };

  return (
    <>
      <div className="container">
        <h2>Nearest Hospitals</h2>
        <p>You are in {currentCity}</p>
        <div>
          {/* {hospitals
            ? hospitals.map((h) => (
                <>
                  <p>{h.name}</p>
                </>
              ))
            : null} */}
        </div>
      </div>
    </>
  );
};

export default Hospitals;