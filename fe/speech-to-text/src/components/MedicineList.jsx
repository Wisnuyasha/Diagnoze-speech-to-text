import React, { useState } from "react";
import Modal from "../modal/Modal";
import axios from "axios";


export default function MedicineList({ medicine }) {
  const [medicineDetail, setMedicineDetail] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const handleOnClose = () => setShowModal(false)

  async function getMedicineDetail(slug) {
    await axios
      .get(`http://localhost:5000/api/buy-medicine/products/details`, {
        params: {
          query: slug,
        },
      })
      .then((response) => {
        console.log(response.data)
        setMedicineDetail(response.data)
        alert(response.data.description);
      })
      .catch((error) => {
        console.error(error);
      });
  }
    
    return (
        <div className="w-full h-full mt-3 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-7 p-2 px-7 ">
            {medicine
                ? medicine.map((med) => (
                    <div
                      className=" p-4 shadow-md border-gray-200 border-[1px]"
                      key={med.external_id}
                    >
                      <p>{med.name}</p>
                      <img
                        src={med.image_url}
                        alt={med.name}
                        className="w-40 mx-auto"
                      />
                      <p>
                        Range Harga: Rp.{med.min_price} - Rp.{med.base_price}
                      </p>
                      <button
                        onClick={async () => {
                          await getMedicineDetail(med.slug) 
                          setShowModal(true)
                        }}
                      >
                        Details
                      </button>
                      <Modal visible={showModal} medicineDetail={medicineDetail} OnClose={handleOnClose}/>
                    </div>
                  ))
                : ""
            }
        </div>
    )
}