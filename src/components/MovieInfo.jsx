import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API_KEY } from '../data';

function MovieInfo() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits,recommendations`
        );
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        setError('Failed to fetch movie details');
      }
    };
    fetchMovies();
  }, [id]);

  if (error) return <div className="text-red-500 p-4 text-center">{error}</div>;
  if (!movie) return <div className="text-white p-4 text-center">Loading...</div>;

  const trailer = movie.videos?.results?.find(
    (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
  );
  const youtubeKey = trailer?.key;

  return (
    <div className="p-6 text-white bg-gradient-to-br from-black via-gray-900 to-black w-full max-w-7xl mx-auto space-y-10 my-5 rounded-xl">
      {/* Movie Informations */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-lg shadow-lg object-cover"
        />
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-red-500">{movie.title}</h1>
          <p className="text-gray-300 text-lg leading-relaxed">{movie.overview}</p>
          <div className="grid gap-2 text-sm text-gray-300">
            <p><span className="font-semibold text-white">Genres:</span> {movie.genres?.map((g) => g.name).join(', ')}</p>
            <p><span className="font-semibold text-white">Release Date:</span> {movie.release_date}</p>
            <p><span className="font-semibold text-white">Runtime:</span> {movie.runtime} mins</p>
            <p><span className="font-semibold text-white">Rating:</span> {movie.vote_average} ⭐ ({movie.vote_count} votes)</p>
            <p><span className="font-semibold text-white">Language:</span> {movie.original_language.toUpperCase()}</p>
            <p><span className="font-semibold text-white">Status:</span> {movie.status}</p>
          </div>

          {youtubeKey && (
            <button
              className="mt-4 px-6 py-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 rounded-full transition"
              onClick={() => setShowTrailer(!showTrailer)}
            >
              {showTrailer ? 'Hide Trailer' : '▶ Watch Trailer'}
            </button>
          )}
        </div>
      </div>

      {/* Trailer */}
      {showTrailer && youtubeKey && (
        <div className="w-full aspect-video">
          <iframe
            className="w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${youtubeKey}`}
            title="Movie Trailer"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Cast */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-yellow-400">Top Cast</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {movie.credits?.cast?.slice(0, 12).map((person) => (
            <div
              key={person.id}
              className="bg-yellow-400 text-black p-2 rounded-lg shadow text-center hover:scale-105 transition"
            >
              <img
                src={
                  person.profile_path
                    ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                    : 'https://via.placeholder.com/185x278?text=No+Image'
                }
                alt={person.name}
                className="w-full h-36 object-cover rounded mb-2"
              />
              <p className="font-semibold text-sm">{person.name}</p>
              <p className="text-xs ">{person.character}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h2 className="text-2xl font-bold mb-4  text-yellow-400">You May Also Like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {movie.recommendations?.results?.slice(0, 10).map((rec) => (
            <Link to={`/movie/${rec.id}`}>
            <div
              key={rec.id}
              className="bg-yellow-400 text-black p-2 rounded-lg shadow hover:scale-105 transition"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${rec.poster_path}`}
                alt={rec.title}
                className="w-full h-40 object-cover rounded"
              />
              <p className="mt-2 font-medium text-sm text-center ">{rec.title}</p>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;
