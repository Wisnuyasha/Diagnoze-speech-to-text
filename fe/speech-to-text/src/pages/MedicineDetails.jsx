import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Navbar from "../components/Navbar";
import axios from "axios";


export default function MedicineDetail() {
  const [medicineDetail, setMedicineDetail] = useState(null);
  const [category, setCategory] = useState([])
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
    <div className="min-h-screen max-h-full w-full flex items-center bg-dbg">
      <Navbar />
      {medicineDetail ? (
        <div className="flex flex-col w-full h-full p-8 sm:p-14 lg:p-20 lg:pl-10">
          <span className="font-nunito font-black text-center text-dblack text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl">
            {medicineDetail.name}
          </span>
          <div className="flex flex-col w-full h-full items-center lg:flex-row bg-white p-8 sm:p-10 md:p-14 mt-8 lg:gap-2 xl:gap-6 rounded-[2rem]">
            <img src={medicineDetail.image_url} alt={medicineDetail.name} width="400" className=" mx-auto" />
            <div className="flex flex-col">
              <span className="font-nunito font-extrabold text-center lg:text-start text-dblack mt-3 text-2xl sm:text-3xl xl:text-4xl">Deskripsi</span>
              <p className="text-justify font-inter font-medium text-sm sm:text-base xl:text-lg text-dblack mt-1 sm:mt-2 md:mt-3 lg:mt-1 tracking-tight leading-tight">{medicineDetail.description}</p>
              <div className="flex flex-wrap gap-3 mt-4">
                <button className="font-nunito font-extrabold text-lg bg-white rounded-full border-dpurple text-dpurple border-2 hover:bg-dpurple hover:delay-100 hover:text-white transition hover:scale-110 hover:duration-300 hover:ease-in-out py-1 px-6 w-fit h-fit">
                  Deskripsi
                </button>
                <button className="font-nunito font-extrabold text-lg bg-white rounded-full border-dpurple text-dpurple border-2 hover:bg-dpurple hover:delay-100 hover:text-white transition hover:scale-110 hover:duration-300 hover:ease-in-out py-1 px-6 w-fit h-fit">
                  Indikasi Umum
                </button>
                <button className="font-nunito font-extrabold text-lg bg-white rounded-full border-dpurple text-dpurple border-2 hover:bg-dpurple hover:delay-100 hover:text-white transition hover:scale-110 hover:duration-300 hover:ease-in-out py-1 px-6 w-fit h-fit">
                  Efek Samping
                </button>
                <button className="font-nunito font-extrabold text-lg bg-white rounded-full border-dpurple text-dpurple border-2 hover:bg-dpurple hover:delay-100 hover:text-white transition hover:scale-110 hover:duration-300 hover:ease-in-out py-1 px-6 w-fit h-fit">
                  Petunjuk Penggunaan
                </button>
              </div>
            </div>
          </div>
          <div className="bg-dpurple h-fit w-fit mx-auto text-white font-nunito font-extrabold px-12 lg:px-16 py-1 lg:py-2 lg:text-lg xl:text-xl xl:py-3 xl:px-20 rounded-lg mt-6 xl:mt-10">
            Kembali
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}