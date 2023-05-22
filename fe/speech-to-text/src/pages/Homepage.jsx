import React, { useState, useEffect } from "react";
import MedicineList from "../components/MedicineList";
import LandingPage from "../components/LandingPage"
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
      <div className="min-h-screen w-full">
        <LandingPage />
        {/* Diagnoze bar*/}
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
        {/* */}
        <MedicineList medicine={medicine} />
      </div>
    </>
  );
};

export default Homepage;
