import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex w-full h-screen items-center justify-center">
      <a href="#">
        <img
          className="w-full h-screen absolute top-0 left-0 blur-xl pointer-events-none -z-50"
          src="https://image.tmdb.org/t/p/w500/sRLC052ieEzkQs9dEtPMfFxYkej.jpg"
        ></img>
      </a>
      <div className="w-[800px] h-[500px] rounded-2xl justify-center flex-col items-center bg-neutral-950 shadow-xl shadow-black/70 flex">
        <div className="flex h-full items-center">
          <h1 className="font-bold bg-gradient-to-br from-orange-300 to-orange-500 bg-clip-text text-transparent  text-7xl">
            MoviesLine
          </h1>
        </div>

        <div className="flex h-full items-center">
          <Link
            className="bg-gradient-to-br from-orange-300 to-orange-500 font-bold uppercase rounded-3xl flex items-center justify-center w-40 h-10 hover:scale-110 transition"
            href={"/home"}
          >
            Iniciar
          </Link>
        </div>
      </div>
    </div>
  );
}
