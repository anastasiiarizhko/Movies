import React, { useState, useEffect } from 'react';
import './home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBars, faArrowRightFromBracket, faHome } from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-regular-svg-icons';
import AuthModal from "./AuthModal";
import { auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSearch } from '../../context/ContextSearch';

function Header({ onToggleOffcanvas }) {
  const { handleSearch } = useSearch();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || "Guest");
      } else {
        setUserName(null);
      }
    });

    return () => unsubscribe();
  }, []);


  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const executeSearch = () => {
    if (query.trim() === '') return;

    handleSearch(query); 
    setQuery('');
    navigate('/search'); 
    closeMenu();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeSearch();
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out');
      closeMenu();
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  const goToHome = () => {
    navigate('/');
    closeMenu();
  };

  const isNotHomePage = location.pathname !== '/';

    return (
        <div>    
          <div className='header'>
          <img src='/movie.png' alt='logo movie' className='img-logo'/>
          <button onClick={toggleMenu} className='menu-toggle-button'>
          <FontAwesomeIcon icon={faBars} className='menu-open-button' />
        </button>
        <div className={`menu ${menuOpen ? 'menu-open' : ''}`}>
          <button  onClick={() => {
            onToggleOffcanvas();
            closeMenu();
            }} 
            className='category-button'> 
            <FontAwesomeIcon icon={faBars} className='icon-menu' />
            Movie genres</button>
          <div className='search-input'>
              <FontAwesomeIcon icon={faMagnifyingGlass} className='icon-search' />
              <input type='text' value={query}  onChange={handleInputChange}  onKeyDown={handleKeyDown}
               placeholder='Find a movie' className='input-header' />
               <div className='search-base-button'>
              <button className='search-button' onClick={executeSearch}>Search</button>
              </div>
            </div>     
              <button onClick={goToHome} className='home-button'>
                <FontAwesomeIcon icon={faHome} className='home-icon' /> Home
              </button>
            {userName ? (
            <div className="auth-controls">
              <button onClick={handleLogout} className="logout-button">
                Log Out <FontAwesomeIcon className='fs-5' icon={faArrowRightFromBracket} />
              </button>
            </div>
          ) : (
            <button onClick={() => setShowAuthModal(true)} className='login-button'>
            <FontAwesomeIcon icon={faUser} className='icon-login' />
             Sign in</button>
              )}
             <AuthModal show={showAuthModal} onClose={() => setShowAuthModal(false)} />
          </div>
          </div>
        </div>
    );
}

export default Header;