import React, { useState } from 'react';
import Header from './Header';
import './home.css';
import Footer from './Footer';
import Main from './Main';
import ListMovie from './ListMovie';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieDetail from '../MoviePage/MovieDetail';
import GenreMovies from './GenreMovies';
import SearchResults from './SearchResults';
import { useSearch } from '../../context/ContextSearch';

function NotFound() {
  return (
    <div className='massage-notfound'>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

function Home() {
    const { movies } = useSearch();
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    return (
      <Router>
        <div>
            <Header onToggleOffcanvas={() => setShowOffcanvas(!showOffcanvas)}></Header>
            <ListMovie
              show={showOffcanvas}
              onClose={() => setShowOffcanvas(false)}
            />
            
            <Routes>
              <Route path="/" element={<Main movies={movies} />} />
              <Route path="/movie/:movieId" element={<MovieDetail />} />
              <Route path="/genre/:genreId" element={<GenreMovies />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="*" element={<NotFound />} />
            </Routes>

            <Footer></Footer>
        </div>
      </Router>
    );
}

export default Home; 