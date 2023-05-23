import React from "react";

export default function Navbar() {
  return (
    <>
      <div className="hidden w-1/3 rounded-xl lg:block">
        {/* <button
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-800 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8"
          >
            <path
              fill-rule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clip-rule="evenodd"
            />
          </svg>
        </button> */}

        <aside
          id="default-sidebar"
          className="fixed h-full w-1/4 -translate-x-full rounded-xl transition-transform sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full overflow-y-auto rounded-xl bg-white px-3 py-4">
            <div class="mt-16 flex flex-col items-center justify-center ">
              <div className="h-32 w-32 rounded-full bg-dpurple xl:h-40 xl:w-40"></div>
              <p class="mx-2 mt-2 text-3xl font-extrabold text-dpurple xl:text-4xl ">
                Diagno.ze
              </p>
            </div>

            <div className="mx-8 xl:mx-10">
              <ul className="mt-8 xl:mt-12 space-y-2 flex flex-col gap-1 font-medium hover:text-white">
                <li className="flex items-center rounded-full bg-dpurple px-4">
                  <a
                    href="/"
                    className="mx-auto flex items-center justify-center rounded-lg p-4 text-white "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-9 w-9"
                      viewBox="0 0 41 42"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M18.7917 7.4427C12.1873 7.4427 6.83342 12.7966 6.83342 19.401C6.83342 26.0054 12.1873 31.3594 18.7917 31.3594C25.3962 31.3594 30.7501 26.0054 30.7501 19.401C30.7501 12.7966 25.3962 7.4427 18.7917 7.4427ZM3.41675 19.401C3.41675 10.9097 10.3004 4.02603 18.7917 4.02603C27.2831 4.02603 34.1668 10.9097 34.1668 19.401C34.1668 27.8924 27.2831 34.776 18.7917 34.776C10.3004 34.776 3.41675 27.8924 3.41675 19.401Z"
                        fill="white"
                        stroke="white"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M27.8339 28.443C28.501 27.7759 29.5827 27.7759 30.2498 28.443L37.0831 35.2764C37.7503 35.9435 37.7503 37.0252 37.0831 37.6923C36.416 38.3595 35.3343 38.3595 34.6672 37.6923L27.8339 30.859C27.1667 30.1918 27.1667 29.1102 27.8339 28.443Z"
                        fill="white"
                        stroke="white"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span className="ml-3 font-nunito text-xl xl:text-2xl font-bold">
                      Diagnoze
                    </span>
                  </a>
                </li>
                <li className="flex items-center rounded-full px-4 hover:bg-dpurple hover:text-white">
                  <a
                    href="hospitals"
                    className="mx-auto flex items-center justify-center  rounded-lg p-4 text-center text-dpurple hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-9 w-9"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.5 2.25a.75.75 0 000 1.5v16.5h-.75a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5h-.75V3.75a.75.75 0 000-1.5h-15zM9 6a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9zm-.75 3.75A.75.75 0 019 9h1.5a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM9 12a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9zm3.75-5.25A.75.75 0 0113.5 6H15a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM13.5 9a.75.75 0 000 1.5H15A.75.75 0 0015 9h-1.5zm-.75 3.75a.75.75 0 01.75-.75H15a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM9 19.5v-2.25a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75h-4.5A.75.75 0 019 19.5z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span className="ml-3 font-nunito text-xl xl:text-2xl font-bold">
                      Hospital
                    </span>
                  </a>
                </li>
                <li className="flex items-center rounded-full px-4 hover:bg-dpurple">
                  <a
                    href="pharmacy"
                    className="mx-auto flex items-center justify-center  rounded-lg p-4 text-center text-dpurple hover:text-white "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-9 w-9 hover:fill-white"
                      viewBox="0 0 43 44"
                      fill="none"
                    >
                      <rect
                        x="5.375"
                        y="7.63031"
                        width="31.5513"
                        height="4.47917"
                        rx="1.18"
                        className="fill-dpurple hover:fill-white"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.91457 15.4911C8.27179 15.1339 8.75766 14.9354 9.26282 14.9402H33.0562C33.5613 14.9354 34.0472 15.1339 34.4044 15.4911C34.7616 15.8483 34.9602 16.3342 34.9553 16.8394V32.5523C34.9649 33.8781 34.4473 35.1533 33.5166 36.0975C32.5859 37.0417 31.3182 37.5774 29.9924 37.5869H12.3266C11.0008 37.5774 9.73311 37.0417 8.80238 36.0975C7.87164 35.1533 7.35412 33.8781 7.36365 32.5523V16.8394C7.35882 16.3342 7.55736 15.8483 7.91457 15.4911ZM16.8775 23.5582H25.3879H25.4416C25.9537 23.5582 26.4269 23.285 26.6829 22.8415C26.939 22.398 26.939 21.8516 26.6829 21.4082C26.4269 20.9647 25.9537 20.6915 25.4416 20.6915H16.8775C16.0859 20.6915 15.4441 21.3332 15.4441 22.1248C15.4441 22.9164 16.0859 23.5582 16.8775 23.5582Z"
                        fill="#45486E"
                      />
                    </svg>
                    <span className="ml-3 font-nunito text-xl xl:text-2xl font-bold">
                      Pharmacy
                    </span>
                  </a>
                </li>
                <li className="flex items-center rounded-full px-4 hover:bg-dpurple">
                  <a
                    href="/doctors"
                    className="mx-auto flex items-center justify-center  rounded-lg p-4 text-center text-dpurple hover:text-white "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-9 w-9"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
                        clip-rule="evenodd"
                      />
                      <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                    </svg>
                    <span className="ml-3 font-nunito text-xl xl:text-2xl font-bold">
                      Doctors
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
