import React, { useState, useEffect } from "react";
import axios from "axios";

export default function MedicineDetail(props) {
  const [medicineDetail, setMedicineDetail] = useState(null);

  useEffect(() => {
    async function fetchMedicineDetail() {
      await axios
        .get(
          `http://localhost:5000/api/buy-medicine/products/details?id=${props.match.params.id}`
        )
        .then((response) => {
          console.log(response.data);
          setMedicineDetail(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    fetchMedicineDetail();
  }, [props.match.params.id]);

  return (
    <div>
      {medicineDetail ? (
        <div>
          <h1>{medicineDetail.name}</h1>
          <img src={medicineDetail.image_url} alt={medicineDetail.name} />
          <p>{medicineDetail.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}