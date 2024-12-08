import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import {Autoplay, Keyboard, Pagination, Navigation } from 'swiper/modules';
import './home.css';
import { Link } from 'react-router-dom';

function Slider() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = import.meta.env.VITE_MOVIES_API_KEY; 

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        setMovies(data.results.slice(0, 10));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <p className='loading-movies'>Loading movies...</p>;
  }

    return (
        <div className='slider'>
            <Swiper
             slidesPerView={3}
             spaceBetween={30}
             keyboard={{
             enabled: true,
             }}
            scrollbar={true}
            autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            }}
            navigation={true}
            pagination={{
            clickable: true,
            }}
            modules={[Autoplay, Keyboard, Navigation, Pagination]}
            className="mySwiper"
         >
           {movies.map((movie) => (
        <SwiperSlide key={movie.id}>   
         <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
               className='swiper-slide-img'
              />   
         </Link>
        </SwiperSlide>
          ))}
      </Swiper>
        </div>
    );
}

export default Slider;