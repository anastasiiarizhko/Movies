import React from 'react';
import './home.css'

function Footer(props) {
     const nowYear = new Date().getFullYear();
     const datInfo = `© Movies Info 2004-${nowYear}. All rights reserved`
    return (
        <div>
            <h5 className='footer'>{datInfo}</h5>
        </div>
    );
}

export default Footer;