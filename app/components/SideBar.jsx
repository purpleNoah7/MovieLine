"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MotionConfig, motion, AnimatePresence, delay } from "framer-motion";
export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Mzg4OTJkZjA1ZTE0OTgwOWUyYWEwMTczNjcyMTAxNSIsInN1YiI6IjY1OTcyM2Q0M2EzNDBiMDJhZmYwYzI0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2K8yvVLPmkvDhvV_aJdwywnPUpE6_pE60oleiSXmaMQ",
  },
};
const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: 0 },
};
export function SideBar() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const genres = await fetchGenres();
        setData(genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
        setData([]);
      }
    }

    fetchData();
  }, []);

  const [menuOpen, SetMenuOpen] = useState(false);

  function toggleMenu() {
    SetMenuOpen(!menuOpen);
  }

  return (
    <div className="z-[1000]">
      <div className="w-full  fixed sm:hidden pt-1 flex items-center mb-10 z-[1000] h-12 ">
        <button
          onClick={toggleMenu}
          className="bg-neutral-800 hover:bg-neutral-700 transition p-2 rounded-lg ml-5"
        >
          {" "}
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      <div
        className={`fixed sm:sticky  top-0 bottom-0 z-[1000] left-0 bg-neutral-900 min-w-[315px]  sm:flex flex-col  min-h-screen h-full p-4 gap-4 ${
          menuOpen ? "flex w-full " : "hidden"
        } `}
      >
        <h1 className="text-center font-bold uppercase text-2xl mb-3">
          Géneros
        </h1>
        <div className="flex z-[1000] flex-col gap-3">
          <Link
            className="transition bg-red-500 hover:opacity-60 font-semibold cursor-pointer  flex items-center  justify-center p-3 text-wrap rounded-full"
            href={"/favorites"}
          >
            Favorites
          </Link>
          <ul className="grid grid-cols-2 gap-5">
            <MotionConfig>
              <AnimatePresence>
                {data.map((cat, index) => (
                  <motion.div
                    key={index}
                    initial="closed"
                    animate="open"
                    variants={variants}
                    transition={{ duration: 0.4, delay: index * 0.2 }}
                  >
                    <Link key={index} href={`/genre/${cat.id}`}>
                      <li
                        className=" transition bg-neutral-800 hover:bg-red-500 font-semibold cursor-pointer  flex items-center  justify-center p-3 text-wrap rounded-full"
                        key={index}
                      >
                        {cat.name}
                      </li>
                    </Link>{" "}
                  </motion.div>
                ))}{" "}
              </AnimatePresence>
            </MotionConfig>
          </ul>
          <div className="flex items-center justify-center">
            <Link
              className=" transition bg-neutral-800 hover:bg-red-500 font-semibold cursor-pointer  flex items-center  justify-center h-10 w-full text-wrap rounded-full"
              href={"/search"}
            >
              Buscar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
async function fetchGenres() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      options
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
}
