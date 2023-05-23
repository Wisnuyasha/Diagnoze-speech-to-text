import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div className="hidden w-1/4 lg:block xl:w-1/3">
        <button
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          className="ml-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:hidden "
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-8 w-8"
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
          className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full overflow-y-auto bg-white px-3 py-4 ">
            <div class="-mx-2 mt-6 flex flex-col items-center">
              <div className="h-28 w-28 rounded-full bg-dpurple"></div>
              <p class="mx-2 mt-2 font-nunito text-3xl font-black text-dpurple">
                Diagno.ze
              </p>
            </div>

            <ul className="mt-8 space-y-2 font-medium">
              <li className="flex items-center rounded-full border-4 bg-[#45486E]">
                <p
                  href="#"
                  className="flex items-center justify-center rounded-lg p-4 text-center text-white "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-8 w-8"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="ml-3 font-nunito text-xl">Diagnoze</span>
                </p>
              </li>
              <Link
                to={{
                  pathname: `/hospitals`,
                }}
              >
                <li className="flex items-center rounded-full border-4 hover:bg-[#45486E]">
                  <p
                    href="#"
                    className="flex items-center justify-center rounded-lg p-4 text-center text-black hover:text-white "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="h-8 w-8"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.5 2.25a.75.75 0 000 1.5v16.5h-.75a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5h-.75V3.75a.75.75 0 000-1.5h-15zM9 6a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9zm-.75 3.75A.75.75 0 019 9h1.5a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM9 12a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9zm3.75-5.25A.75.75 0 0113.5 6H15a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM13.5 9a.75.75 0 000 1.5H15A.75.75 0 0015 9h-1.5zm-.75 3.75a.75.75 0 01.75-.75H15a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM9 19.5v-2.25a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75h-4.5A.75.75 0 019 19.5z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    <span className="ml-3 font-nunito text-xl">Hospital</span>
                  </p>
                </li>
              </Link>

              <li className="flex items-center rounded-full border-4 hover:bg-[#45486E]">
                <p
                  href="#"
                  className="flex items-center justify-center rounded-lg p-4 text-center text-black hover:text-white "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="h-6 w-6"
                  >
                    <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
                    <path
                      fill-rule="evenodd"
                      d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.163 3.75A.75.75 0 0110 12h4a.75.75 0 010 1.5h-4a.75.75 0 01-.75-.75z"
                      clip-rule="evenodd"
                    />
                  </svg>

                  <span className="ml-3 font-nunito text-xl">Products</span>
                </p>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
