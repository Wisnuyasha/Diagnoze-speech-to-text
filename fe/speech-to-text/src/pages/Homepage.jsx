import React, { useState, useEffect } from "react";
import MedicineList from "../components/Medicine/MedicineList";
import MedicineListAlo from "../components/Medicine/MedicineListAlo";

import LandingPage from "../components/Layouts/LandingPage";
import axios from "axios";
import Navbar from "../components/Layouts/Navbar";
import { TrashIcon } from "../assets/Diagnoze/TrashIcon";
import SearchIcon from "../assets/Diagnoze/SearchIcon";
import UnmuteIcon from "../assets/Diagnoze/UnmuteIcon";
import MuteIcon from "../assets/Diagnoze/MuteIcon";
import MobileUnmuteIcon from "../assets/Diagnoze/MobileUnmuteIcon";
import MobileMuteIcon from "../assets/Diagnoze/MobileMuteIcon";

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

  const [medicinePrice, setMedicinePrice] = useState([]);
  const [medicineRating, setMedicineRating] = useState([]);
  // const [med, setMed] = useState([]);
  const [category, setCategory] = useState("");
  const [sortPriceAsc, setSortPriceAsc] = useState(true);
  const [sortRatingAsc, setSortRatingAsc] = useState(true);

  // async function getData(query) {
  //   await axios
  //     .get("http://localhost:5000/api/buy-medicine/products/search", {
  //       params: {
  //         query: query,
  //       },
  //     })
  //     .then((response) => {
  //       const api = response.data.result;
  //       console.log(api);
  //       setMed(api);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  async function getMedicine(query, category) {
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

        if (category === "price") {
          const priceSort = api.sort((a, b) => {
            // Mengubah cara pengurutan berdasarkan nilai sortPriceAsc
            return sortPriceAsc
              ? a.price.amount - b.price.amount
              : b.price.amount - a.price.amount;
          });
          console.log(priceSort);
          setMedicinePrice(priceSort);
        } else {
          setMedicinePrice(api);
        }

        if (category === "rating") {
          const ratingSort = api.sort((a, b) => {
            const isAflot = parseFloat(a.rating);
            const isBflot = parseFloat(b.rating);
            if (isNaN(isAflot)) return 1;
            if (isNaN(isBflot)) return -1;
            // Mengubah cara pengurutan berdasarkan nilai sortRatingAsc
            return sortRatingAsc ? isAflot - isBflot : isBflot - isAflot;
          });
          console.log(ratingSort);
          setMedicineRating(ratingSort);
        } else {
          setMedicineRating(api);
        }
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
    console.log("sort", medicinePrice);
    console.log(category);
  }, [medicine, category]);

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
    // await getData(diagnoze);
    await getMedicine(diagnoze, category);

    setSavedDiagnoze([...savedDiagnoze, diagnoze]);
    setDiagnoze("");
  };

  const handleClearDiagnoze = () => {
    setDiagnoze([]);
  };

  let categoryRender;

  if (category === "price") {
    categoryRender = medicinePrice ? (
      <MedicineListAlo medicine={medicinePrice} />
    ) : null;
  } else if (category === "rating") {
    categoryRender = medicineRating ? (
      <MedicineListAlo medicine={medicineRating} />
    ) : null;
  } else if (category === "") {
    categoryRender = medicine ? <MedicineListAlo medicine={medicine} /> : null;
  }

  const handleSortCategory = async (category) => {
    if (category === "price") {
      // Mengubah nilai sortPriceAsc jika category adalah 'price'
      setSortPriceAsc((prev) => !prev);
    }

    if (category === "rating") {
      // Mengubah nilai sortRatingAsc jika category adalah 'rating'
      setSortRatingAsc((prev) => !prev);
    }

    setCategory(category);
    await getMedicine(savedDiagnoze, category);
  };

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
                  {isListen ? <MobileUnmuteIcon /> : <MobileMuteIcon />}
                </button>
              </div>
            </div>

            <div className="mt-4 flex h-fit w-full justify-center gap-4 lg:pr-16">
              <button
                onClick={() => handleSortCategory("price")}
                className="w-fit rounded-xl bg-dpurple px-4  py-1 font-nunito font-bold text-white"
              >
                Price {sortPriceAsc ? "Ascending" : "Descending"}
              </button>
              <button
                onClick={() => handleSortCategory("rating")}
                className="w-fit rounded-xl bg-dpurple px-4 py-1 font-nunito font-bold text-white"
              >
                Rating {sortRatingAsc ? "Ascending" : "Descending"}
              </button>
            </div>
            {categoryRender}
            {/* <MedicineList medicine={med} /> */}
          </div>
        </div>
        {/* */}
      </div>
    </>
  );
};

export default Homepage;
