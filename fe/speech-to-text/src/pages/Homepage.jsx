import React, { useState, useEffect, useRef } from "react";
import MedicineList from "../components/MedicineList";
import axios from "axios";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = ("en-US", "id-ID");

const Homepage = () => {
  const [isListen, setIsListen] = useState(false);
  const [diagnoze, setDiagnoze] = useState(null);
  const [savedDiagnoze, setSavedDiagnoze] = useState([]);
  const [medicine, setMedicine] = useState([]);
  const [medicineDetail, setMedicineDetail] = useState(null);
  const [showModal, setShowModal] = useState(false)

  const handleOnClose = () => setShowModal(false)

  const modalRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  async function getMedicineDetail(slug) {
    await axios
      .get(`http://localhost:5000/api/buy-medicine/products/details`, {
        params: {
          query: slug,
        },
      })
      .then((response) => {
        console.log(response.data);
        setMedicineDetail(response.data);
        // alert(response.data.description);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function getData(query) {
    await axios
      .get("http://localhost:5000/api/buy-medicine/products/search", {
        params: {
          query: query,
        },
      })
      .then((response) => {
        const api = response.data.result;
        setMedicine(api);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    handleListen();
  }, [isListen]);

  useEffect(() => {
    console.log("useEffect", medicine);
  }, [medicine]);

  const handleListen = () => {
    if (isListen) {
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }
    mic.onstart = () => {
      console.log("Mics on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript);
      setDiagnoze(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  const handleSaveDiagnoze = async () => {
    await getData(diagnoze);
    setSavedDiagnoze([...savedDiagnoze, diagnoze]);
    setDiagnoze("");
  };

  const handleClearDiagnoze = () => {
    setSavedDiagnoze([]);
  };

  return (
    <>
      <div className="min-h-screen w-full p-5">
        <h1 className="font-semibold text-center text-2xl mb-4">Diagnoze</h1>
        <div className="h-full w-full flex flex-col lg:flex-row lg:justify-center gap-8">
          <div className="h-64 w-full max-w-lg shadow-md border-gray-200 border-[1px]  mx-auto lg:mx-2 p-2">
            <h2 className="font-medium text-center text-lg mb-3">
              Tell your condition
            </h2>
            <div className="w-full flex flex-col justify-center ">
              {isListen ? (
                <div className="w-fit p-8 mx-auto border-gray-200 border-[1px]">
                  <p className="text-center">{diagnoze}</p>
                </div>
              ) : (
                <span></span>
              )}
              {isListen ? (
                <span>
                  ▶️<span className="text-gray-400">Speak now</span>
                </span>
              ) : (
                <span></span>
              )}
              <button onClick={() => setIsListen((prevState) => !prevState)}>
                {isListen ? (
                  <span className="px-2 py-1 rounded-lg bg-slate-200 font-semibold text-xs">
                    Off
                  </span>
                ) : (
                  <span className="px-2 py-1 rounded-lg bg-slate-200 font-semibold text-xs ">
                    ON
                  </span>
                )}
              </button>
              <button
                onClick={async () => await handleSaveDiagnoze()}
                disabled={!diagnoze}
              >
                Save Diagnoze
              </button>
            </div>
          </div>
          <div className="h-64 w-full max-w-lg shadow-md border-gray-200 border-[1px] mx-auto lg:mx-2 p-2">
            <h2 className="font-medium text-center text-lg">Diagnoze</h2>
            {savedDiagnoze.map((n) => (
              <p key={n}>{n}</p>
            ))}
            <button onClick={handleClearDiagnoze}> Clear Diagnoze </button>
          </div>
        </div>
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
                      {showModal ? 
                        <div
                        onClick={() => setShowModal(false)}
                        className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-5 backdrop-blur-md"
                      >
                        <div ref={modalRef} className="bg-slate-100 p-4 w-56 rounded-md">
                          <p onClick={() => setShowModal(false)}>X</p>
                          {medicineDetail.description}
                        </div>
                      </div>
                        : null
                      }
                    </div>
                  ))
                : ""
            }
        </div>
        {/* <MedicineList medicine={medicine} /> */}
      </div>
    </>
  );
};

export default Homepage;
