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
import DropDownIcon from "../assets/Diagnoze/DropDownIcon";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = ("en-US", "id-ID");

const Homepage = () => {
  const [isListen, setIsListen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [diagnoze, setDiagnoze] = useState(null);
  const [savedDiagnoze, setSavedDiagnoze] = useState([]);

  // const [med, setMed] = useState([]);
  const [medicine, setMedicine] = useState([]);
  const [medicinePriceAsc, setMedicinePriceAsc] = useState([]);
  const [medicinePriceDesc, setMedicinePriceDesc] = useState([]);
  const [medicineRatingAsc, setMedicineRatingAsc] = useState([]);
  const [medicineRatingDesc, setMedicineRatingDesc] = useState([]);

  const [category, setCategory] = useState("");
  const [sorting, setSorting] = useState("Harga Termurah");

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

        if (category === "priceAsc") {
          const priceSort = api.sort((a, b) => {
            return a.price.amount - b.price.amount;
          });
          console.log(priceSort);
          setMedicinePriceAsc(priceSort);
        } else {
          setMedicinePriceAsc(api);
        }

        if (category === "priceDesc") {
          const priceSort = api.sort((a, b) => {
            return b.price.amount - a.price.amount;
          });
          console.log(priceSort);
          setMedicinePriceDesc(priceSort);
        } else {
          setMedicinePriceDesc(api);
        }

        if (category === "ratingAsc") {
          const ratingSort = api.sort((a, b) => {
            const isAflot = parseFloat(a.rating);
            const isBflot = parseFloat(b.rating);
            if (isNaN(isAflot)) return 1;
            if (isNaN(isBflot)) return -1;
            return isAflot - isBflot;
          });
          console.log(ratingSort);
          setMedicineRatingAsc(ratingSort);
        } else {
          setMedicineRatingAsc(api);
        }

        if (category === "ratingDesc") {
          const ratingSort = api.sort((a, b) => {
            const isAflot = parseFloat(a.rating);
            const isBflot = parseFloat(b.rating);
            if (isNaN(isAflot)) return 1;
            if (isNaN(isBflot)) return -1;
            return isBflot - isAflot;
          });
          console.log(ratingSort);
          setMedicineRatingDesc(ratingSort);
        } else {
          setMedicineRatingDesc(api);
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
    // console.log("sort", medicinePrice);
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
    setSavedDiagnoze([]);
    setDiagnoze([]);
  };

  let categoryRender;

  if (category === "priceAsc") {
    categoryRender = medicinePriceAsc ? (
      <MedicineListAlo medicine={medicinePriceAsc} />
    ) : null;
  } else if (category === "priceDesc") {
    categoryRender = medicineRatingDesc ? (
      <MedicineListAlo medicine={medicineRatingDesc} />
    ) : null;
  } else if (category === "ratingAsc") {
    categoryRender = medicineRatingAsc ? (
      <MedicineListAlo medicine={medicineRatingAsc} />
    ) : null;
  } else if (category === "ratingDesc") {
    categoryRender = medicineRatingAsc ? (
      <MedicineListAlo medicine={medicineRatingDesc} />
    ) : null;
  } else if (category === "") {
    categoryRender = medicine ? <MedicineListAlo medicine={medicine} /> : null;
  }

  const handleSortCategory = async (category, sorting) => {
    setCategory(category);
    setSorting(sorting);
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
                        onClick={async () => {
                          await handleSaveDiagnoze();
                          setIsSearch(true);
                        }}
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

            {/* Sorting */}
            {isSearch ? (
              <>
                {" "}
                <div className="mt-5 flex h-fit w-full items-center justify-between gap-4">
                  <div className="font-inter text-dblack">
                    <p className="font-semibold lg:text-lg">
                      Menampilkan produk untuk{" "}
                      <span className="font-extrabold">"{savedDiagnoze}"</span>
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-x-4">
                    <p className="font-inter font-extrabold text-dblack lg:text-lg">
                      Urutkan
                    </p>
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="relative flex items-center gap-x-2 rounded-lg bg-white px-4 py-3"
                    >
                      <p className="font-inter font-bold text-dblack">
                        {sorting}
                      </p>
                      <DropDownIcon />
                      {isOpen ? (
                        <div className="absolute inset-x-0 -bottom-44 z-50 h-fit w-full overflow-hidden rounded-lg border-2 border-dpurple bg-white/80 backdrop-blur-sm transition-all ">
                          <div
                            onClick={() =>
                              handleSortCategory("priceAsc", "Harga Termurah")
                            }
                            className="flex px-4 py-2 text-dblack hover:bg-dpurple hover:text-white"
                          >
                            <p className="font-inter font-bold ">
                              Harga Termurah
                            </p>
                          </div>
                          <div
                            onClick={() =>
                              handleSortCategory("priceDesc", "Harga Termahal")
                            }
                            className="flex px-4 py-2 text-dblack hover:bg-dpurple hover:text-white"
                          >
                            {" "}
                            <p className="font-inter font-bold ">
                              Harga Termahal
                            </p>
                          </div>
                          <div
                            onClick={() =>
                              handleSortCategory(
                                "ratingAsc",
                                "Rating Tertinggi"
                              )
                            }
                            className="flex px-4 py-2 text-dblack hover:bg-dpurple hover:text-white"
                          >
                            {" "}
                            <p className="font-inter font-bold ">
                              Rating Tertinggi
                            </p>
                          </div>
                          <div
                            onClick={() =>
                              handleSortCategory(
                                "ratingDesc",
                                "Rating Terendah"
                              )
                            }
                            className="flex px-4 py-2 text-dblack hover:bg-dpurple hover:text-white"
                          >
                            {" "}
                            <p className="font-inter font-bold ">
                              Rating Terendah
                            </p>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}

            {/* Medicine List */}
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
