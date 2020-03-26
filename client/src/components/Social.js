import React from 'react';
import facebook from '../assets/img/facebook.svg';

const Social = () => {

    return (
        <div className="mb-2">
            <a href="#">
            <img className="icon-social" src={facebook} alt="facebook" />
            </a>
        </div>
    )
}

export default Social;
