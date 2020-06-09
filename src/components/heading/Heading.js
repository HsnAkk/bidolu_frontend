import React from 'react';
import './Heading.css';


function Heading({head}) {
    return (
        <div className="heading">
            <div className="outer">
                <div className="inner"></div>
            </div>
            {head}
        </div>
    )
}

export default Heading
