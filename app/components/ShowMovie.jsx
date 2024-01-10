"use client";

import { motion } from "framer-motion";

export default function Component({ title, movieUrl, website, overview }) {
  return (
    <section className="w-full h-screen min-h-full flex items-center justify-center py-12 md:py-24 lg:py-32 bg-gray-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="container px-4 md:px-6">
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
              <button className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200">
                Add to Favorites
              </button>
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
