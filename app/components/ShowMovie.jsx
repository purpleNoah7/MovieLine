"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Component({ title, movieUrl, website, overview, id,backdrop }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const addToFavorites = () => {
    if (!favorites.some((fav) => fav.id === id)) {
      const newFavorite = {
        id,
        title,
        movieUrl,
        website,
        overview,
        imageUrl: `https://image.tmdb.org/t/p/w500/${backdrop}`,
      };

      const newFavorites = [...favorites, newFavorite];
      setFavorites(newFavorites);

      // Guarda en el localStorage
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    } else {
      // Si ya está en favoritos, elimínalo
      const updatedFavorites = favorites.filter((fav) => fav.id !== id);
      setFavorites(updatedFavorites);

      // Actualiza el localStorage
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  const isFavorite = favorites.some((fav) => fav.id === id);

  return (
    <section className="w-full h-screen min-h-full flex items-center justify-center py-12 md:py-24 lg:py-32 bg-gray-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="relative container px-4 md:px-6">
          <div
            className="absolute top-0 left-5 hover:bg-blue-700 transition cursor-pointer -translate-y-10 rounded bg-blue-500 p-3 inline-block"
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
          <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <img
              alt={title}
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              height={550}
              src={`https://image.tmdb.org/t/p/w500/${movieUrl}`}
              width={310}
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                  {title}
                </h1>
                <a
                  href={website}
                  className="text-lg mt-3 text-blue-300 underline"
                >
                  Sitio Oficial
                </a>
              </div>
              <p className="text-gray-400">{overview}</p>
              <div className="flex items-center space-x-2">
                <StarIcon className="h-6 w-6 text-yellow-400" />
                <span className="text-lg">4.5/5</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  className={`mt-4 px-6 py-2 ${
                    isFavorite ? "bg-red-700" : "bg-red-500"
                  } text-white rounded-md hover:bg-red-600 transition-colors duration-200`}
                  onClick={addToFavorites}
                >
                  {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </button>
                <button
                  disabled
                  className="mt-4 px-6 py-2 cursor-not-allowed bg-blue-900 opacity-70 text-white rounded-md transition-colors duration-200"
                >
                  Watch
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
