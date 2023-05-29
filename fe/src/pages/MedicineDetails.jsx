import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Layouts/Navbar";
import axios from "axios";

export default function MedicineDetail() {
  const [medicineDetail, setMedicineDetail] = useState(null);
  const [type, setType] = useState("deskripsi");
  const { id } = useParams();

  function TypeComponent({ title, description }) {
    return (
      <>
        <span className="mt-3 text-center font-nunito text-2xl font-extrabold text-dblack sm:text-3xl lg:text-start xl:text-4xl">
          {title}
        </span>
        <p className="mt-1 text-justify font-inter text-sm font-medium leading-tight tracking-tight text-dblack sm:mt-2 sm:text-base md:mt-3 lg:mt-1 xl:text-lg">
          {description}
        </p>
      </>
    );
  }

  let renderDiv;

  if (type === "deskripsi") {
    renderDiv = medicineDetail ? (
      <TypeComponent
        title="Deskripsi"
        description={medicineDetail.description}
      />
    ) : null;
  } else if (type === "indikasi") {
    renderDiv = medicineDetail ? (
      <TypeComponent
        title="Indikasi Umum"
        description={medicineDetail.general_indication}
      />
    ) : null;
  } else if (type === "efek") {
    renderDiv = medicineDetail ? (
      <TypeComponent
        title="Efek Samping"
        description={medicineDetail.side_effects}
      />
    ) : null;
  } else if (type === "petunjuk") {
    renderDiv = medicineDetail ? (
      <TypeComponent
        title="Petunjuk Penggunaan"
        description={medicineDetail.how_to_use}
      />
    ) : null;
  } else {
    renderDiv = medicineDetail ? (
      <TypeComponent
        title="Deskripsi"
        description={medicineDetail.description}
      />
    ) : null;
  }

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
  }, [id]);

  return (
    <div className="flex max-h-full min-h-screen w-full bg-dbg">
      <Navbar />
      {medicineDetail ? (
        <div className="flex h-full w-full flex-col p-8 sm:p-14 lg:p-20 lg:pl-10">
          <span className="text-center font-nunito text-3xl font-black text-dblack sm:text-4xl lg:text-5xl 2xl:text-6xl">
            {medicineDetail.name}
          </span>
          <div className="mt-8 flex h-full w-full flex-col items-center rounded-[2rem] bg-white p-8 sm:p-10 md:p-14 lg:flex-row lg:gap-2 xl:gap-6">
            <img
              src={medicineDetail.image_url}
              alt={medicineDetail.name}
              width="400"
              className=" mx-auto"
            />
            <div className="flex flex-col">
              {renderDiv}
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => setType("deskripsi")}
                  className="h-fit w-fit rounded-full border-2 border-dpurple bg-white px-6 py-1 font-nunito text-lg font-extrabold text-dpurple transition hover:scale-110 hover:bg-dpurple hover:text-white hover:delay-100 hover:duration-300 hover:ease-in-out"
                >
                  Deskripsi
                </button>
                <button
                  onClick={() => setType("indikasi")}
                  className="h-fit w-fit rounded-full border-2 border-dpurple bg-white px-6 py-1 font-nunito text-lg font-extrabold text-dpurple transition hover:scale-110 hover:bg-dpurple hover:text-white hover:delay-100 hover:duration-300 hover:ease-in-out"
                >
                  Indikasi Umum
                </button>
                <button
                  onClick={() => setType("efek")}
                  className="h-fit w-fit rounded-full border-2 border-dpurple bg-white px-6 py-1 font-nunito text-lg font-extrabold text-dpurple transition hover:scale-110 hover:bg-dpurple hover:text-white hover:delay-100 hover:duration-300 hover:ease-in-out"
                >
                  Efek Samping
                </button>
                <button
                  onClick={() => setType("petunjuk")}
                  className="h-fit w-fit rounded-full border-2 border-dpurple bg-white px-6 py-1 font-nunito text-lg font-extrabold text-dpurple transition hover:scale-110 hover:bg-dpurple hover:text-white hover:delay-100 hover:duration-300 hover:ease-in-out"
                >
                  Petunjuk Penggunaan
                </button>
              </div>
            </div>
          </div>
          <Link
            to={{
              pathname: "/",
            }}
            className="mx-auto mt-6 h-fit w-fit rounded-lg bg-dpurple px-12 py-1 font-nunito font-extrabold text-white transition delay-150 duration-300 hover:scale-110 hover:ease-in-out lg:px-16 lg:py-2 lg:text-lg xl:mt-10 xl:px-20 xl:py-3 xl:text-xl"
          >
            Kembali
          </Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
