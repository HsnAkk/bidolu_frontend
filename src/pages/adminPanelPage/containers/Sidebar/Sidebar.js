import React from 'react';
import { Data, Extra } from './data';
import { Link } from 'react-router-dom';


function Sidebar () {

    return (
    
        <div className="page-wrapper chiller-theme">
            <nav className="sidebar-wrapper">
                <div className="sidebar-content">
                    <div className="sidebar-brand">
                        <Link className="link" to="/">BIDOLU</Link>
                    </div>
            
            
                    <div className="sidebar-menu">
                        <ul>
                            <li className="header-menu">
                                <span>General</span>
                            </li>
                            { Data.map( item => (
                                <li key={item.id} className="sidebar-dropdown">
                                    <Link to={item.path} className="link">
                                        <i className={item.icon}></i>
                                        <span className="text-capitalize">{ item.title }</span>
                                    </Link>
                                </li>
                            ))}
                            
                            <li className="header-menu">
                                <span>Extra</span>
                            </li>
                            { Extra.map( item => (
                                <li key={item.id} className="sidebar-dropdown">
                                    <Link to={item.path} className="link">
                                        <i className={item.icon}></i>
                                        <span className="text-capitalize">{ item.title }</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                </div>
            </nav>
        </div>
    )

}


export default Sidebar;