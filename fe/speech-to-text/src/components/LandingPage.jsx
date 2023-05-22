import React from "react";

export default function LandingPage() {
  return (
    <>
      {/* <div role="status" class="max-w-sm animate-pulse">
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
      </div> */}

      <div class="max-w-sm p-6 bg-[#45486E] font-nunito border border-gray-200 rounded-xl shadow w-full mt-6 m-2 mr-8">
        <a href="#">
          <h5 class="mb-2 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Temukan Obat,
          </h5>
          <h5 class="mb-2 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Hingga RS Terdekat
          </h5>
        </a>

        <div className="flex flex-row justify-center mt-8">
          <a
            href="#"
            class="inline-flex items-center px-3 py-2 text-md font-nunito text-center text-[#45486E] rounded-full focus:ring-4 focus:outline-none focus:ring-blue-300 bg-white font-extrabold w-1/3"
          >
            Discover
            <svg
              aria-hidden="true"
              class="w-4 h-4 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
          <h5 class="w-2/3 mb-2 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white ml-28 sm:visible">
            Diagno.ze
          </h5>
        </div>
      </div>
    </>
  );
}
