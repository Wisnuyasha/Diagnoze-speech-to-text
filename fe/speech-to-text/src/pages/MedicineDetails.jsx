import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

export default function MedicineDetail(props) {
  const [medicineDetail, setMedicineDetail] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function getMedicineDetail() {
        await axios
          .get(`http://localhost:5000/api/buy-medicine/products/details`, {
            params: {
              query: id,
            },
          })
          .then((response) => {
            console.log(response.data);
            setMedicineDetail(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      getMedicineDetail();
  }, []);

  return (
    <div>
      {medicineDetail ? (
        <div>
          <h1>{medicineDetail.name}</h1>
          <img src={medicineDetail.image_url} alt={medicineDetail.name} />
          <p>{medicineDetail.description}</p>
        </div>
      ) : (
        <p>Loading... {id}</p>
      )}
    </div>
  );
}