"use client";

import { useState, useEffect } from "react";
import CardMovie from "@/app/components/CardMovie";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Mzg4OTJkZjA1ZTE0OTgwOWUyYWEwMTczNjcyMTAxNSIsInN1YiI6IjY1OTcyM2Q0M2EzNDBiMDJhZmYwYzI0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2K8yvVLPmkvDhvV_aJdwywnPUpE6_pE60oleiSXmaMQ",
  },
};

async function fetchPopularMovie({ id, page }) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${id}`,
      options
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
}

export default function GenrePage({ params }) {
  const { id } = params;
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadMovies() {
      const fetchedMovies = await fetchPopularMovie({ id, page: currentPage });
      setMovies(fetchedMovies);
    }
    loadMovies();
  }, [id, currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="flex flex-col p-5 items-center">
      <div className="grid  grid-cols-1 gap-5 xl:grid-cols-7 sm:grid-cols-3">
        {movies.map((movie, index) => (
          <CardMovie
            link={movie.id}
            key={movie.title}
            index={index}
            img={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            movieName={movie.title}
            years={movie.release_date}
          />
        ))}
      </div>
      <div className="mt-4 gap-4 flex flex-row bottom-0 fixed sm:relative">
        <button
          className="transition bg-neutral-800 hover:bg-red-500 font-semibold cursor-pointer  flex items-center  justify-center p-3 text-wrap rounded-full"
          onClick={handlePrevPage}
        >
          Previous Page
        </button>
        <button
          className="transition bg-neutral-800 hover:bg-red-500 font-semibold cursor-pointer  flex items-center  justify-center p-3 text-wrap rounded-full"
          onClick={handleNextPage}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}
