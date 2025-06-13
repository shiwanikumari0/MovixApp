import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_KEY } from '../data';
import Navbar from '../components/Navbar';
const IMG_URL = 'https://image.tmdb.org/t/p/original';

function TVDetail() {
  const { id } = useParams();
  const [tv, setTv] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTvDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`
        );
        if (!res.ok) throw new Error('TV Show not found');
        const data = await res.json();
        setTv(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTvDetails();
  }, [id]);

  if (loading) return <div className="text-white text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;
  if (!tv) return null;

  return (
    <>
    
    <Navbar/>
    <div className="text-white px-4 py-8 max-w-6xl mx-auto bg-black my-5 rounded-xl">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Poster */}
        <img
          src={`${IMG_URL}${tv.poster_path}`}
          alt={tv.name}
          className="w-full md:w-1/3 rounded shadow-lg"
        />

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{tv.name}</h1>
          <p className="text-sm text-gray-400 mb-4">
            {tv.first_air_date} • {tv.number_of_seasons} Season{tv.number_of_seasons > 1 ? 's' : ''} • ⭐ {tv.vote_average?.toFixed(1)}
          </p>
          <p className="mb-4 text-gray-200">{tv.overview}</p>

          {/* Genres */}
          {tv.genres?.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold mb-1">Genres:</h4>
              <div className="flex flex-wrap gap-2">
                {tv.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-slate-700 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Creator */}
          {tv.created_by?.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold mb-1">Created by:</h4>
              <div className="flex flex-wrap gap-2 text-sm text-gray-300">
                {tv.created_by.map((creator) => (
                  <span key={creator.id}>{creator.name}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

export default TVDetail;
