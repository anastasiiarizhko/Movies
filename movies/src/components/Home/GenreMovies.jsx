import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './home.css';
import { Link } from 'react-router-dom';
import BootstrapPagination from './BootstrapPagination';

function GenreMovies() {
    const { genreId } = useParams();
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [hoveredMovieId, setHoveredMovieId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 12;
    const totalPages = Math.ceil(movies.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedMovies = movies.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        const fetchMoviesByGenre = async () => {
            const apiKey = import.meta.env.VITE_MOVIES_API_KEY;

            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&language=en-US`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }

                const data = await response.json();
                setMovies(data.results || []);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchMoviesByGenre();
    }, [genreId]);

    if (error) return <div className='loading-movies'>Error: {error}</div>;
    if (!movies.length) return <div className='loading-movies'>Loading...</div>;

    return (
      <div className='movies-container'>
        <div className='search-movies'>  
        <div className='movies'>
        {paginatedMovies.map((movie) => (
          <div key={movie.id} className='movies-item'
          style={{
            boxShadow: hoveredMovieId === movie.id ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
            transition: 'box-shadow 0.3s ease', 
          }}
          onMouseEnter={() => setHoveredMovieId(movie.id)}
          onMouseLeave={() => setHoveredMovieId(null)}
          >
             <div className='container-img'>
             <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} className='movie-image' />
             </div>
             <h2 className='title-movie'>{movie.title}</h2>
             <p className='description category'><strong>Release date: </strong>{movie.release_date}</p>
             <p className='description'><strong>Rating: </strong>{movie.vote_average}</p>
             <div className='movie-button'
             style={{
              maxHeight: hoveredMovieId === movie.id ? '100px' : '0',
              opacity: hoveredMovieId === movie.id ? 1 : 0,
              transition: 'max-height 0.3s ease, opacity 0.3s ease',
              }}
              >
                <Link
                  to={`/movie/${movie.id}`}
                  className="movie-item-button"
                >
                  Watch a movie
                </Link>
             </div>
         </div>
          ))}
         </div>            
          <BootstrapPagination
           currentPage={currentPage}
           totalPages={totalPages}
           onPageChange={(page) => setCurrentPage(page)}
         />
         
        </div>
        </div>
    );
}

export default GenreMovies;
