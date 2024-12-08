import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './movie-page.css';

function MovieDetail() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_MOVIES_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;

    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!movie) {
    return <div className='loading-movies'>Loading...</div>;
  }

  return (
    <div className="movie-detail"  style={{
      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
    }}>
      <div className='custom-bg'>
      <div className="movie-detail-container">
        <div className='movie-detail-base-image'>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-detail-image"
        />
        </div>
        <div className="movie-detail-info">
          <h1 className='movie-title'>{movie.title}</h1>
          <h3 className='movie-tagline'> {movie.tagline}</h3>
          <p className='movie-description'><strong>Release Date:</strong> {movie.release_date}</p>
          <p className='movie-description'><strong>Country:</strong> {movie.production_countries.map((country) => country.name).join(', ')}</p>
          <p className="movie-description">
              <strong>Genres:</strong>{' '}
              {movie.genres.map((genre) => (
                <Link
                  key={genre.id}
                  to={`/genre/${genre.id}`}
                  className="genre-link-detail"
                >
                  {genre.name}
                </Link>
              )).reduce((prev, curr) => [prev, ', ', curr])}
            </p>
          <p className='movie-description'><strong>Runtime:</strong> {movie.runtime}min</p>
          <p className='movie-description'><strong>Language:</strong> {movie.spoken_languages.map((language) => language.name)}</p>
          <p className='movie-description'><strong>Rating:</strong> {movie.vote_average}</p>
          <p className='movie-description'><strong>Overview:</strong> {movie.overview}</p>
        </div>
      </div>
      </div>
    </div>
  );
}

export default MovieDetail;