"use client";

import { useState, useEffect } from "react";
import CardMovie from "../components/CardMovie";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Mzg4OTJkZjA1ZTE0OTgwOWUyYWEwMTczNjcyMTAxNSIsInN1YiI6IjY1OTcyM2Q0M2EzNDBiMDJhZmYwYzI0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2K8yvVLPmkvDhvV_aJdwywnPUpE6_pE60oleiSXmaMQ",
  },
};

export default function Search() {
  const [value, setValue] = useState("");
  const [movies, setMovies] = useState([]);
  const [searchError, setSearchError] = useState(false);

  const fetchMovies = async (value) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${value}`,
        options
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      return data.results;
    } catch (error) {
      console.error("Error fetching movies:", error);
      return [];
    }
  };

  const loadMovies = async () => {
    setMovies([]);
    setSearchError(false);

    if (value.trim() !== "") {
      const fetchedMovies = await fetchMovies(value);
      setMovies(fetchedMovies);
      setSearchError(fetchedMovies.length === 0);
    }
  };

  useEffect(() => {
    loadMovies();
  }, [value]);

  const handleSearchChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div
      className={`w-full relative min-h-screen flex flex-col justify-center`}
    >
      <div
        className="absolute top-14 left-5 hover:bg-red-900 flex items-center justify-center transition cursor-pointer -translate-y-10 rounded bg-red-500 p-3 "
        onClick={() => window.history.back()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-arrow-back"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" />
        </svg>
      </div>
      <div>
        <div className="max-w-md px-4 mx-auto mt-12">
          <div className="relative flex flex-col gap-3">
            <div className="flex relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search"
                onChange={handleSearchChange}
                value={value}
                className="w-full py-3 pl-12 pr-4 text-white border rounded-xl outline-none bg-neutral-800 focus:bg-neutral-600 focus:border-red-600"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="p-20 grid grid-cols-1 gap-5 lg:grid-cols-3 xl:grid-cols-7 sm:grid-cols-2">
        {searchError ? (
          <h2 className="text-2xl text-center text-white">Not Found</h2>
        ) : (
          movies.map((movie, index) =>
            movie.poster_path ? (
              <CardMovie
                link={movie.id}
                key={movie.id}
                index={index}
                img={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                movieName={movie.title}
                years={movie.release_date}
              />
            ) : null
          )
        )}
      </div>
    </div>
  );
}
