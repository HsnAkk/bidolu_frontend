import React from 'react'
import { Link } from 'react-router-dom';
import './Breadcrumbs.css';



function Breadcrumbs({prev_url, prev_title, title}) {

    return (
        <div className="content">
            <Link to="/">Home</Link>
            <span>/</span>
            { prev_url && <Link to={prev_url}>{prev_title}</Link> }
            { prev_url && <span>/</span> }
            <span>{title}</span> 
        </div>
    )
}

export default Breadcrumbs
