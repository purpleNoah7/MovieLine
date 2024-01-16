import ShowMovie from "@/app/components/ShowMovie";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Mzg4OTJkZjA1ZTE0OTgwOWUyYWEwMTczNjcyMTAxNSIsInN1YiI6IjY1OTcyM2Q0M2EzNDBiMDJhZmYwYzI0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2K8yvVLPmkvDhvV_aJdwywnPUpE6_pE60oleiSXmaMQ",
  },
};

async function fetchMovie({ id }) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}`,
      options // Aquí se deben pasar las opciones directamente
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return [data];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

export default async function MoviePage({ params }) {
  const { id } = params;
  const movies = await fetchMovie({ id });
  return (
    <div>
      {movies.map((movie, index) => (
        <ShowMovie
          key={index}
          popularity={movie.popularity}
          title={movie.title}
          overview={movie.overview}
          website={movie.homepage}
          movieUrl={movie.poster_path}
          id={movie.id}
          backdrop={movie.backdrop_path}
        />
      ))}
    </div>
  );
}
