import Link from "next/link";
import SearchInput from "./SearchInput";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Mzg4OTJkZjA1ZTE0OTgwOWUyYWEwMTczNjcyMTAxNSIsInN1YiI6IjY1OTcyM2Q0M2EzNDBiMDJhZmYwYzI0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2K8yvVLPmkvDhvV_aJdwywnPUpE6_pE60oleiSXmaMQ",
  },
};

function fetchGenres() {
  return fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=en",
    options
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data.genres;
    })
    .catch((error) => {
      console.error("Error fetching genres:", error);
      return [];
    });
}

export async function SideBar() {
  const data = await fetchGenres();
  return (
    <div className="sticky top-0 bottom-0 left-0 bg-neutral-900 min-w-[315px] hidden sm:flex flex-col  h-screen p-4 gap-4">
      <h1 className="text-center font-bold uppercase text-2xl mb-3">Géneros</h1>
      <div className="">
        <ul className="grid grid-cols-2 gap-5">
          {data.map((cat, index) => (
            <Link key={index} href={`/genre/${cat.id}`}>
              <li
                className=" transition bg-neutral-800 hover:bg-red-500 font-semibold cursor-pointer  flex items-center  justify-center p-3 text-wrap rounded-full"
                key={index}
              >
                {cat.name}
              </li>
            </Link>
          ))}
        </ul>
        <div className="flex items-center justify-center mt-6 p-10">
          <Link
            className=" transition bg-neutral-800 hover:bg-red-500 font-semibold cursor-pointer  flex items-center  justify-center h-10 w-40 text-wrap rounded-full"
            href={"/search"}
          >
            Buscar
          </Link>
        </div>
      </div>
    </div>
  );
}
