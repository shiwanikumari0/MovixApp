import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { API_KEY } from '../data';

function Hero() {
  const [trending, setTrending] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);
  const timeoutRef = useRef(null);
  const touchStartX = useRef(null);

  // Fetch trending movies
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
        );
        const data = await res.json();
        setTrending(data.results.slice(0, 10));
      } catch (err) {
        setError('Failed to load trending movie.');
      }
    };

    fetchTrending();
  }, []);

  // Autoplay every 5s
  useEffect(() => {
    if (!trending.length) return;
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % trending.length);
    }, 5000);
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, trending]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % trending.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? trending.length - 1 : prev - 1));
  const goToSlide = (index) => setCurrentIndex(index);

  // Swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 50) prevSlide();
    else if (deltaX < -50) nextSlide();
    touchStartX.current = null;
  };

  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  if (trending.length === 0) return <div className="text-white text-center p-4">Loading...</div>;

  const currentMovie = trending[currentIndex];

  return (
    <div
      className="relative w-full h-[500px] bg-black overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Link to={`/movie/${currentMovie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
          alt={currentMovie.title}
          className="w-full h-full object-cover brightness-75 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute bottom-10 left-10 text-white max-w-lg">
          <h2 className="text-2xl sm:text-4xl font-bold mb-2">{currentMovie.title}</h2>
          <p className="hidden sm:block text-sm text-gray-300">
            {currentMovie.overview.slice(0, 150)}...
          </p>
        </div>
      </Link>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-40 rounded-full p-2 hover:bg-opacity-70 z-10"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-40 rounded-full p-2 hover:bg-opacity-70 z-10"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {trending.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-3 h-3 rounded-full ${
              idx === currentIndex ? 'bg-red-500' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Hero;
