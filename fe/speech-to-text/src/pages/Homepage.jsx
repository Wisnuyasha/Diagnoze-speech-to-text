import React, { useState, useEffect } from "react";
import MedicineList from "../components/MedicineList";
import MedicineListAlo from "../components/MedicineListAlo";

import LandingPage from "../components/LandingPage";
import axios from "axios";
import Navbar from "../components/Navbar";
import { TrashIcon } from "../assets/Diagnoze/TrashIcon";
import SearchIcon from "../assets/Diagnoze/SearchIcon";
import UnmuteIcon from "../assets/Diagnoze/UnmuteIcon";
import MuteIcon from "../assets/Diagnoze/MuteIcon";

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
  const [med, setMed] = useState([]);
  const [category, setCategory] = useState("");

  async function getData(query) {
    await axios
      .get("http://localhost:5000/api/buy-medicine/products/search", {
        params: {
          query: query,
        },
      })
      .then((response) => {
        const api = response.data.result;
        console.log(api);
        setMed(api);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function getMedicine(query) {
    await axios
      .get("http://localhost:5000/api/alo/medicine/search", {
        params: {
          query: query,
        },
      })
      .then((response) => {
        console.log(response.data.result.data);
        const api = response.data.result.data;
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
    await getMedicine(diagnoze);
    setSavedDiagnoze([...savedDiagnoze, diagnoze]);
    setDiagnoze("");
  };

  const handleClearDiagnoze = () => {
    setDiagnoze([]);
  };

  let categoryRender;

  const priceMed = medicine.sort((a, b) => {
    return a.price.amount - b.price.amount;
  });
  const ratingMed = medicine.sort((a, b) => {
    return a.price.amount - b.price.amount;
  });

  if (category === "price") {
    categoryRender = med ? <MedicineListAlo medicine={priceMed} /> : null;
  } else if (category === "rating") {
    categoryRender = med ? <MedicineListAlo medicine={ratingMed} /> : null;
  } else if (category === "") {
    categoryRender = med ? <MedicineListAlo medicine={medicine} /> : null;
  }

  return (
    <>
      <div className="flex max-h-full min-h-screen w-full bg-dbg">
        <Navbar />

        <div className="flex h-full w-full flex-col">
          <LandingPage />

          {/* Diagnoze bar*/}
          <div className="flex h-fit w-full flex-col border-black p-6 sm:px-9 md:px-11 md:pt-8">
            <span className="mb-2 font-nunito text-2xl font-black text-dblack sm:mb-3 sm:text-3xl md:text-4xl">
              Diagnoze
            </span>
            <div className="flex items-center md:gap-6">
              <div className="flex h-10 w-full items-center rounded-lg bg-white px-3 pl-4 md:h-12 xl:h-14 xl:px-5">
                {isListen ? (
                  <div className="flex w-full items-center justify-between">
                    <span className="font-nunito text-base font-bold text-dblack lg:text-lg">
                      {diagnoze}
                    </span>
                    <div className="flex gap-4">
                      <button onClick={() => handleClearDiagnoze()}>
                        <TrashIcon />
                      </button>
                      <button
                        onClick={async () => await handleSaveDiagnoze()}
                        disabled={!diagnoze}
                      >
                        <SearchIcon />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <span className="block font-nunito text-base font-bold text-dblack md:hidden lg:text-lg">
                      Tekan tombol mikrofon
                    </span>
                    <span className="hidden font-nunito text-base font-bold text-dblack md:block lg:hidden lg:text-lg">
                      Tekan tombol mikrofon dan sebutkan gejala yang kamu alami
                    </span>
                    <span className="hidden font-nunito text-base font-bold text-dblack lg:block xl:text-lg">
                      Tekan tombol mikrofon disebelah kanan dan sebutkan gejala
                      yang kamu alami
                    </span>
                  </div>
                )}
              </div>
              <button onClick={() => setIsListen((prevState) => !prevState)}>
                {isListen ? <UnmuteIcon /> : <MuteIcon />}
              </button>
            </div>

            {/* Mobile Mic */}
            <div class="flex flex-col items-center justify-center text-center">
              <div className="fixed bottom-12 mx-auto block md:hidden">
                <button onClick={() => setIsListen((prevState) => !prevState)}>
                  {isListen ? <UnmuteIcon /> : <MuteIcon />}
                </button>
              </div>
            </div>

            <div className="mt-4 flex h-fit w-full justify-center gap-4 pr-16">
              <button
                onClick={() => setCategory("price")}
                className="w-fit rounded-xl bg-dpurple px-4  py-1 font-nunito font-bold text-white"
              >
                Price
              </button>
              <button
                onClick={() => setCategory("rating")}
                className="w-fit rounded-xl bg-dpurple px-4 py-1 font-nunito font-bold text-white"
              >
                Rating
              </button>
            </div>
            {categoryRender}
            {/* <MedicineListAlo medicine={medicine} />
            <MedicineList medicine={med} /> */}
          </div>
        </div>
        {/* */}
      </div>
    </>
  );
};

export default Homepage;
