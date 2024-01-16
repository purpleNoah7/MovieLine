"use client";
import CardMovie from "@/app/components/CardMovie";
import { useEffect, useState } from "react";

export default function Favorites() {
  const [moviesList, setList] = useState([]);
  useEffect(() => {
    const movies = localStorage.getItem("favorites");
    if (movies) {
      setList(JSON.parse(movies));
    }
  }, []);
  const removeFromFavorites = (index) => {
    const updatedMoviesList = [...moviesList];
    updatedMoviesList.splice(index, 1); // Elimina la película en el índice especificado
    setList(updatedMoviesList);
    localStorage.setItem("favorites", JSON.stringify(updatedMoviesList));
  };

  return (
    <div className="flex flex-1 flex-col p-5 items-center gap-5">
      {moviesList.length === 0 ? (
        <div className="w-full h-screen flex flex-col items-center justify-center">
          <h1 className=" text-6xl font-black uppercase text-red-500">
            You don't have favorites
          </h1>
          <button
            className=" w-24 h-10 mt-2 hover:bg-red-950 transition rounded-lg bg-red-800"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 xl:grid-cols-7 sm:grid-cols-2">
          {moviesList.map((movie, index) => (
            <div className="group relative">
              <CardMovie
                link={movie.id}
                key={movie.title}
                index={index}
                img={movie.imageUrl}
                movieName={movie.title}
                years={movie.release_date}
              />
              <div
                className="absolute group-hover:scale-110 cursor-pointer hover:scale-110  transition top-2 right-2 bg-neutral-600/75 rounded-lg p-3"
                onClick={() => removeFromFavorites(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-trash-x-filled"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16zm-9.489 5.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z"
                    stroke-width="0"
                    fill="currentColor"
                  />
                  <path
                    d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z"
                    stroke-width="0"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-4 gap-4 flex flex-row bottom-0 fixed sm:relative">
        <button className="transition bg-neutral-800 hover:bg-red-500 font-semibold cursor-pointer  flex items-center  justify-center p-3 text-wrap rounded-full">
          Previous Page
        </button>
        <button className="transition bg-neutral-800 hover:bg-red-500 font-semibold cursor-pointer  flex items-center  justify-center p-3 text-wrap rounded-full">
          Next Page
        </button>
      </div>
    </div>
  );
}
