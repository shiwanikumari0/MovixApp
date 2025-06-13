import { createContext, useContext, useState, useEffect } from 'react';
import { API_KEY } from '../data';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState({ results: [] });
  const randomNm = Math.floor((Math.random() * 20 )+1)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(randomNm);

  const fetchMovies = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`);
      const data = await res.json();
      setMovies((prev) => ({
        ...data,
        results: page === 1 ? data.results : [...prev.results, ...data.results],
      }));
      setError('');
    } catch (err) {
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  return (
    <MovieContext.Provider value={{ movies, loading, error, setPage }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => useContext(MovieContext);
