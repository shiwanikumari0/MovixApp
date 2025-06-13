import React from 'react';
import { useMovies } from '../context/MovieContext';
import Cards from './Cards';

function CardContainer() {
  const { movies, error, loading, setPage } = useMovies();
  const { results, page } = movies;

  const handleNextPage = () => {
    setPage(prev => prev + 1);
  };

  if (loading && (!results || results.length === 0))
    return <div className="text-center text-white py-8">Loading...</div>;

  if (error)
    return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      
      <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 '>For You</h2>

      {/* Grid layout for movie cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {results.map(movie => (
          <Cards key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Load more button */}
      <div className="text-center mt-10">
        <button
          className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-full transition"
          onClick={handleNextPage}
        >
          Load More →
        </button>
      </div>
    </div>
  );
}

export default CardContainer;
