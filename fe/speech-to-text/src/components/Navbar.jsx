import React from "react";

export default function Navbar() {
  return (
    <>
      <div className="w-1/4 xl:w-1/3 hidden lg:block">
      <button
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-800 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none  "
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
        </button>

        <aside
          id="default-sidebar"
          className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-white ">
            <div class="flex flex-col items-center mt-6 -mx-2">
              <div className="w-28 h-28 bg-dpurple rounded-full"></div>
              <p class="mx-2 mt-2 font-nunito font-black text-dpurple text-3xl">
                Diagno.ze
              </p>
            </div>

            <ul className="space-y-2 font-medium mt-8">
              <li className="border-4 rounded-full flex items-center bg-[#45486E]">
                <a
                  href="#"
                  className="flex items-center text-center justify-center p-4 text-white rounded-lg "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="ml-3 font-nunito text-xl">Diagnoze</span>
                </a>
              </li>
              <li className="border-4 rounded-full flex items-center hover:bg-[#45486E]">
                <a
                  href="#"
                  className="flex items-center text-center justify-center p-4 text-black hover:text-white rounded-lg "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-6 h-6"
                  >
                    <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
                    <path
                      fill-rule="evenodd"
                      d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.163 3.75A.75.75 0 0110 12h4a.75.75 0 010 1.5h-4a.75.75 0 01-.75-.75z"
                      clip-rule="evenodd"
                    />
                  </svg>

                  <span className="ml-3 font-nunito text-xl">Products</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
