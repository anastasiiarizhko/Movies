import React from 'react';
import { Offcanvas, ListGroup } from 'react-bootstrap';
import './home.css';
import { Link } from 'react-router-dom';

function ListMovie({ show, onClose }) {

  const genres = [
    { id: 28, name: 'Action' },
    { id: 35, name: 'Comedy' },
    { id: 18, name: 'Drama' },
    { id: 27, name: 'Horror' },
    { id: 10749, name: 'Romance' },
    { id: 14, name: 'Fantasy' },
];
    return (
        <div>          
            <Offcanvas show={show} onHide={onClose} placement="start">
            <Offcanvas.Header closeButton>
            <Offcanvas.Title><h3 className='genre-title ms-2'>Genres</h3></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            <ListGroup variant="flush">
             {genres.map((genre) => (
            <ListGroup.Item
              key={genre.id}
            >
           <Link
               to={`/genre/${genre.id}`}
               onClick={onClose}
               className='genre-link'
           >
               {genre.name}
           </Link>
           </ListGroup.Item>
           ))}
           </ListGroup>
            </Offcanvas.Body>
            </Offcanvas> 
           
        </div>
    );
}

export default ListMovie;