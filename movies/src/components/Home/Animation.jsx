import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Animation() {
    const canvasRef = useRef(null);
    const navigate = useNavigate();
    const [moviePosters, setMoviePosters] = useState([]);

    const apiKey = import.meta.env.VITE_MOVIES_API_KEY;

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
                );
                const data = await response.json();
                const posters = data.results.map((movie) => ({
                    id: movie.id,
                    poster_path: movie.poster_path,
                }));
                setMoviePosters(posters);
            } catch (error) {
                console.error('Error fetching trending movies:', error);
            }
        };

        fetchTrendingMovies();
    }, []);

    useEffect(() => {
        if (moviePosters.length === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const resizeCanvas = () => {
            const width = window.innerWidth * 0.8;
            let heightPercentage = 0.55;

            if (window.innerWidth <= 450) {
                heightPercentage = 0.2;
            } else if (window.innerWidth <= 650) {
                heightPercentage = 0.3;
            } else if (window.innerWidth <= 900) {
                heightPercentage = 0.4;
            } else if (window.innerWidth <= 1400) {
                heightPercentage = 0.4;
            }

            const height = window.innerHeight * heightPercentage;

            const minWidth = 100;
            const minHeight = 100;
        
            const finalWidth = Math.max(width, minWidth);
            const finalHeight = Math.max(height, minHeight);

            ctx.resetTransform();

            canvas.width = width * window.devicePixelRatio;
            canvas.height = height * window.devicePixelRatio;

            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        

            const createPoster = (movie) => {
            const randomX = Math.random() * canvas.width / window.devicePixelRatio;
            const randomY = Math.random() * canvas.height / window.devicePixelRatio;
            const speed = Math.random() * 1 + 0.5;

            const img = new Image();
            img.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;

            return {
                x: randomX,
                y: randomY,
                width: 80,
                height: 120,
                speed,
                img,
                movie,
                draw() {
                    if (img.complete) {
                        ctx.drawImage(img, this.x, this.y, this.width, this.height);
                    }
                },
                update() {
                    this.y += this.speed;
                    if (this.y > canvas.height / window.devicePixelRatio) {
                        this.y = -this.height;
                        this.x = Math.random() * canvas.width / window.devicePixelRatio;
                    }
                },
                isClicked(clickX, clickY) {
                    return (
                        clickX >= this.x &&
                        clickX <= this.x + this.width &&
                        clickY >= this.y &&
                        clickY <= this.y + this.height
                    );
                },
            };
        };

        const posters = moviePosters.map((movie) => createPoster(movie));

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            posters.forEach((poster) => {
                poster.update();
                poster.draw();
            });

            requestAnimationFrame(animate);
        };

        const handleClick = (e) => {
            const rect = canvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;

            const clickedPoster = posters.find((poster) =>
                poster.isClicked(clickX, clickY)
            );

            if (clickedPoster) {
                navigate(`/movie/${clickedPoster.movie.id}`);
            }
        };

        canvas.addEventListener('click', handleClick);

        animate();

        return () => {
            canvas.removeEventListener('click', handleClick);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [moviePosters, navigate]);

    return (
        <div className='animation'>
            <canvas ref={canvasRef} />
        </div>
    );
}

export default Animation;
