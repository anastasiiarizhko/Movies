import React, { useState } from 'react';
import { useSearch } from '../../context/ContextSearch';
import { Link } from 'react-router-dom';
import BootstrapPagination from './BootstrapPagination';

function SearchResults() {
  const [hoveredMovieId, setHoveredMovieId] = useState(null);
  const { movies } = useSearch();
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(movies.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMovies = movies.slice(startIndex, startIndex + itemsPerPage);

  if (movies.length === 0) {
    return <div className='notfound-massage'>No results found</div>;
  }

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

export default SearchResults;
