import React from 'react';
import { FaPlay } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Card({ movie }) {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : 'https://via.placeholder.com/200x300?text=No+Image';

  return (
    <Link
    to={`/movie/${movie.id}`}
    >
    <div className="relative group bg-slate-800 rounded-lg overflow-hidden shadow-md cursor-pointer min-w-[120px] xs:min-w-[140px] sm:min-w-[160px] flex-shrink-0 hover:scale-103 transition-transform duration-300">
      <div className="aspect-[2/3] w-full">
        <img
          src={poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-60"
          loading="lazy"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
          <FaPlay className="text-white text-2xl" />
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white">
          <h3 className="text-[10px] xs:text-xs font-medium line-clamp-2 leading-tight">
            {movie.title || movie.name}
          </h3>
          <div className="mt-0.5 flex items-center text-[10px] text-gray-300 space-x-1">
            <span>{new Date(movie.release_date).getFullYear()}</span>
            <span>•</span>
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
}

export default Card;