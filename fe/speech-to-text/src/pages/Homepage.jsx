import React, { useState, useEffect } from "react";
import MedicineList from "../components/MedicineList";
import LandingPage from "../components/LandingPage"
import axios from "axios";
import Navbar from "../components/Navbar";

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
    setDiagnoze([]);
  };

  return (
    <>
      <div className="min-h-screen max-h-full w-full flex pt-5 md:pt-7 bg-dbg">
        <Navbar />
        <div>
        <LandingPage />
        {/* Diagnoze bar*/}
        <div className="w-full flex flex-col border-black h-fit p-6 sm:px-9 md:px-11 md:pt-8">
          <span className="font-nunito font-black text-2xl sm:text-3xl md:text-4xl text-dblack mb-2">Diagnoze</span>
          <div className="flex items-center md:gap-6">
            <div className="bg-white w-full flex h-10 md:h-12 rounded-lg items-center px-3 pl-4">
            {isListen ? (
                <div className="flex justify-between items-center w-full">
                  <span className="text-dblack font-bold lg:text-lg text-base font-nunito">{diagnoze}</span>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleClearDiagnoze()}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.99996 5.83333C4.76784 5.83333 4.54624 5.93014 4.38853 6.10045C4.23081 6.27077 4.15128 6.49914 4.16908 6.73058L4.82486 15.2557C4.95845 16.9923 6.40659 18.3333 8.14837 18.3333H11.8516C13.5933 18.3333 15.0415 16.9923 15.1751 15.2556L15.8308 6.73058C15.8486 6.49914 15.7691 6.27077 15.6114 6.10045C15.4537 5.93014 15.2321 5.83333 15 5.83333H4.99996Z" fill="#BD2B23"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3334 2.5L15.8334 2.50001C16.2936 2.50001 16.6667 2.8731 16.6667 3.33334C16.6667 3.79358 16.2936 4.16667 15.8334 4.16667H4.16671C3.70647 4.16667 3.33337 3.79358 3.33337 3.33334C3.33337 2.8731 3.70647 2.50001 4.16671 2.50001H6.66671V2.5L8.20403 2.5C8.52683 2.5 8.82827 2.33867 9.00733 2.07009C9.47958 1.36171 10.5205 1.36171 10.9928 2.07009C11.1718 2.33867 11.4733 2.5 11.7961 2.5L13.3334 2.5Z" fill="#BD2B23"/>
                      </svg>
                    </button> 
                    <button
                      onClick={async () => await handleSaveDiagnoze()}
                      disabled={!diagnoze}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 35 35" fill="none">
                        <rect width="35" height="35" rx="5" fill="#198961"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16 9C12.134 9 9 12.134 9 16C9 19.866 12.134 23 16 23C19.866 23 23 19.866 23 16C23 12.134 19.866 9 16 9ZM7 16C7 11.0294 11.0294 7 16 7C20.9706 7 25 11.0294 25 16C25 20.9706 20.9706 25 16 25C11.0294 25 7 20.9706 7 16Z" fill="white" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.2929 21.2929C21.6834 20.9024 22.3166 20.9024 22.7071 21.2929L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L21.2929 22.7071C20.9024 22.3166 20.9024 21.6834 21.2929 21.2929Z" fill="white" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button> 
                  </div>
                  
                </div>
              ) : (
                <div>
                  <span className="text-dblack text-base lg:text-lg font-nunito font-bold block md:hidden">
                  Tekan tombol mikrofon
                  </span>
                  <span className="text-dblack text-base lg:text-lg font-nunito font-bold hidden md:block lg:hidden">
                    Tekan tombol mikrofon dan sebutkan gejala yang kamu alami
                  </span>
                  <span className="text-dblack text-base lg:text-lg font-nunito font-bold hidden lg:block">
                    Tekan tombol mikrofon disebelah kanan dan sebutkan gejala yang kamu alami
                  </span> 
                </div>
              )}
            </div>
            <button onClick={() => setIsListen((prevState) => !prevState)}>
            {isListen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="hidden md:block h-12 transition scale-125 duration-300 delay-150 ease-in-out" viewBox="0 0 56 56" fill="none">
                  <rect width="56" height="56" rx="10" fill="#2733C7"/>
                  <path d="M37.8017 27.3362C37.8624 32.4976 33.9849 36.8571 28.8517 37.3987V40.4612C28.8517 40.9859 28.4263 41.4112 27.9017 41.4112C27.377 41.4112 26.9517 40.9859 26.9517 40.4612V37.4487C21.8425 36.9094 17.9733 32.5862 18.0017 27.4487C17.9816 27.1093 18.1441 26.785 18.428 26.5979C18.7118 26.4108 19.074 26.3893 19.378 26.5416C19.6819 26.6939 19.8816 26.9968 19.9017 27.3362C19.8649 29.4933 20.6876 31.5765 22.1883 33.1264C23.689 34.6764 25.7445 35.5659 27.9017 35.5987C30.0588 35.5659 32.1144 34.6764 33.6151 33.1264C35.1158 31.5765 35.9384 29.4933 35.9017 27.3362C35.9017 26.8116 36.327 26.3862 36.8517 26.3862C37.3763 26.3862 37.8017 26.8116 37.8017 27.3362Z" fill="white"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M32.3265 16.0865C30.5452 14.3006 27.8651 13.7605 25.5312 14.717C23.1973 15.6735 21.6671 17.9392 21.6515 20.4615V26.7115C21.6515 30.1633 24.4497 32.9615 27.9015 32.9615C31.3533 32.9615 34.1515 30.1633 34.1515 26.7115V20.4615C34.1413 18.8201 33.4857 17.2486 32.3265 16.0865ZM30.4019 24.724L26.6519 28.474C26.2805 28.8264 25.6983 28.8264 25.3269 28.474C24.9665 28.101 24.9665 27.5095 25.3269 27.1365L29.0769 23.3865C29.4429 23.0209 30.0359 23.0209 30.4019 23.3865C30.7622 23.7595 30.7622 24.351 30.4019 24.724ZM26.6519 23.7865L30.4019 20.0365C30.7622 19.6635 30.7622 19.072 30.4019 18.699C30.0359 18.3334 29.4429 18.3334 29.0769 18.699L25.3269 22.449C24.9665 22.822 24.9665 23.4135 25.3269 23.7865C25.6929 24.152 26.2859 24.152 26.6519 23.7865Z" fill="white"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="hidden md:block h-12 transition duration-300 delay-150 ease-in-out" viewBox="0 0 56 56" fill="none">
                  <rect width="56" height="56" rx="10" fill="#2733C7"/>
                  <path d="M37.8017 27.3362C37.8624 32.4976 33.9849 36.8571 28.8517 37.3987V40.4612C28.8517 40.9859 28.4263 41.4112 27.9017 41.4112C27.377 41.4112 26.9517 40.9859 26.9517 40.4612V37.4487C21.8425 36.9094 17.9733 32.5862 18.0017 27.4487C17.9816 27.1093 18.1441 26.785 18.428 26.5979C18.7118 26.4108 19.074 26.3893 19.378 26.5416C19.6819 26.6939 19.8816 26.9968 19.9017 27.3362C19.8649 29.4933 20.6876 31.5765 22.1883 33.1264C23.689 34.6764 25.7445 35.5659 27.9017 35.5987C30.0588 35.5659 32.1144 34.6764 33.6151 33.1264C35.1158 31.5765 35.9384 29.4933 35.9017 27.3362C35.9017 26.8116 36.327 26.3862 36.8517 26.3862C37.3763 26.3862 37.8017 26.8116 37.8017 27.3362Z" fill="white"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M32.3265 16.0865C30.5452 14.3006 27.8651 13.7605 25.5312 14.717C23.1973 15.6735 21.6671 17.9392 21.6515 20.4615V26.7115C21.6515 30.1633 24.4497 32.9615 27.9015 32.9615C31.3533 32.9615 34.1515 30.1633 34.1515 26.7115V20.4615C34.1413 18.8201 33.4857 17.2486 32.3265 16.0865ZM30.4019 24.724L26.6519 28.474C26.2805 28.8264 25.6983 28.8264 25.3269 28.474C24.9665 28.101 24.9665 27.5095 25.3269 27.1365L29.0769 23.3865C29.4429 23.0209 30.0359 23.0209 30.4019 23.3865C30.7622 23.7595 30.7622 24.351 30.4019 24.724ZM26.6519 23.7865L30.4019 20.0365C30.7622 19.6635 30.7622 19.072 30.4019 18.699C30.0359 18.3334 29.4429 18.3334 29.0769 18.699L25.3269 22.449C24.9665 22.822 24.9665 23.4135 25.3269 23.7865C25.6929 24.152 26.2859 24.152 26.6519 23.7865Z" fill="white"/>
                  <path d="M39.543 40.7147L38.7983 40.0473L39.543 40.7147C40.3179 39.8502 40.3179 38.4892 39.543 37.6246L19.5198 15.2848C18.6879 14.3567 17.2891 14.3567 16.4573 15.2848C15.6824 16.1493 15.6824 17.5103 16.4573 18.3748L36.4805 40.7147C37.3123 41.6428 38.7111 41.6428 39.543 40.7147Z" fill="white" stroke="#2733C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              )}
            </button>
          </div>
          <div class="flex flex-col justify-center items-center text-center">
            <div className="block md:hidden fixed bottom-12 mx-auto">
            <button onClick={() => setIsListen((prevState) => !prevState)}>
              {isListen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="rounded-full w-20 h-20 transition scale-125 duration-300 delay-150 ease-in-out" viewBox="0 0 56 56" fill="none">
                  <rect width="56" height="56" rx="10" fill="#2733C7"/>
                  <path d="M37.8017 27.3362C37.8624 32.4976 33.9849 36.8571 28.8517 37.3987V40.4612C28.8517 40.9859 28.4263 41.4112 27.9017 41.4112C27.377 41.4112 26.9517 40.9859 26.9517 40.4612V37.4487C21.8425 36.9094 17.9733 32.5862 18.0017 27.4487C17.9816 27.1093 18.1441 26.785 18.428 26.5979C18.7118 26.4108 19.074 26.3893 19.378 26.5416C19.6819 26.6939 19.8816 26.9968 19.9017 27.3362C19.8649 29.4933 20.6876 31.5765 22.1883 33.1264C23.689 34.6764 25.7445 35.5659 27.9017 35.5987C30.0588 35.5659 32.1144 34.6764 33.6151 33.1264C35.1158 31.5765 35.9384 29.4933 35.9017 27.3362C35.9017 26.8116 36.327 26.3862 36.8517 26.3862C37.3763 26.3862 37.8017 26.8116 37.8017 27.3362Z" fill="white"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M32.3265 16.0865C30.5452 14.3006 27.8651 13.7605 25.5312 14.717C23.1973 15.6735 21.6671 17.9392 21.6515 20.4615V26.7115C21.6515 30.1633 24.4497 32.9615 27.9015 32.9615C31.3533 32.9615 34.1515 30.1633 34.1515 26.7115V20.4615C34.1413 18.8201 33.4857 17.2486 32.3265 16.0865ZM30.4019 24.724L26.6519 28.474C26.2805 28.8264 25.6983 28.8264 25.3269 28.474C24.9665 28.101 24.9665 27.5095 25.3269 27.1365L29.0769 23.3865C29.4429 23.0209 30.0359 23.0209 30.4019 23.3865C30.7622 23.7595 30.7622 24.351 30.4019 24.724ZM26.6519 23.7865L30.4019 20.0365C30.7622 19.6635 30.7622 19.072 30.4019 18.699C30.0359 18.3334 29.4429 18.3334 29.0769 18.699L25.3269 22.449C24.9665 22.822 24.9665 23.4135 25.3269 23.7865C25.6929 24.152 26.2859 24.152 26.6519 23.7865Z" fill="white"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="rounded-full w-20 h-20 transition duration-300 delay-150 ease-in-out" viewBox="0 0 56 56" fill="none">
                  <rect width="56" height="56" rx="10" fill="#2733C7"/>
                  <path d="M37.8017 27.3362C37.8624 32.4976 33.9849 36.8571 28.8517 37.3987V40.4612C28.8517 40.9859 28.4263 41.4112 27.9017 41.4112C27.377 41.4112 26.9517 40.9859 26.9517 40.4612V37.4487C21.8425 36.9094 17.9733 32.5862 18.0017 27.4487C17.9816 27.1093 18.1441 26.785 18.428 26.5979C18.7118 26.4108 19.074 26.3893 19.378 26.5416C19.6819 26.6939 19.8816 26.9968 19.9017 27.3362C19.8649 29.4933 20.6876 31.5765 22.1883 33.1264C23.689 34.6764 25.7445 35.5659 27.9017 35.5987C30.0588 35.5659 32.1144 34.6764 33.6151 33.1264C35.1158 31.5765 35.9384 29.4933 35.9017 27.3362C35.9017 26.8116 36.327 26.3862 36.8517 26.3862C37.3763 26.3862 37.8017 26.8116 37.8017 27.3362Z" fill="white"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M32.3265 16.0865C30.5452 14.3006 27.8651 13.7605 25.5312 14.717C23.1973 15.6735 21.6671 17.9392 21.6515 20.4615V26.7115C21.6515 30.1633 24.4497 32.9615 27.9015 32.9615C31.3533 32.9615 34.1515 30.1633 34.1515 26.7115V20.4615C34.1413 18.8201 33.4857 17.2486 32.3265 16.0865ZM30.4019 24.724L26.6519 28.474C26.2805 28.8264 25.6983 28.8264 25.3269 28.474C24.9665 28.101 24.9665 27.5095 25.3269 27.1365L29.0769 23.3865C29.4429 23.0209 30.0359 23.0209 30.4019 23.3865C30.7622 23.7595 30.7622 24.351 30.4019 24.724ZM26.6519 23.7865L30.4019 20.0365C30.7622 19.6635 30.7622 19.072 30.4019 18.699C30.0359 18.3334 29.4429 18.3334 29.0769 18.699L25.3269 22.449C24.9665 22.822 24.9665 23.4135 25.3269 23.7865C25.6929 24.152 26.2859 24.152 26.6519 23.7865Z" fill="white"/>
                  <path d="M39.543 40.7147L38.7983 40.0473L39.543 40.7147C40.3179 39.8502 40.3179 38.4892 39.543 37.6246L19.5198 15.2848C18.6879 14.3567 17.2891 14.3567 16.4573 15.2848C15.6824 16.1493 15.6824 17.5103 16.4573 18.3748L36.4805 40.7147C37.3123 41.6428 38.7111 41.6428 39.543 40.7147Z" fill="white" stroke="#2733C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              )}
            </button>
            </div>
          </div>
          <MedicineList medicine={medicine} />
        </div>
        </div>
        {/* */}
      </div>
    </>
  );
};

export default Homepage;
