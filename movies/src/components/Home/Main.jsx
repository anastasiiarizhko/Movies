import React from 'react';
import './home.css';
import Slider from './Slider';
import Animation from './Animation';

function Main() {
    return (
        <div className='content'>
            <div>
                <h3 className='animation-title'>Click on the movie and find out information about it</h3>
            <Animation />
            </div>
            <Slider /> 
        </div>
    );
}

export default Main;