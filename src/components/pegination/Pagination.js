import React from 'react';
import './Pegination.css';



const Pagination = (props) => {

    const {home, productsPerPage, totalProducts, paginate } = props

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage ); i++) {
        pageNumbers.push(i);
    }

    const clickHandler = (value) => {
        paginate(value)
    }
    
    return (
        <div className="pegination-box">
            <nav>
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" href="!#" aria-label="Previous" onClick={ e => {
                                                                                                e.preventDefault();
                                                                                                clickHandler(pageNumbers[0])
                                                                                                home ? window.scrollTo(0, 650) : window.scrollTo(0, 0)
                                                                                                }
                                                                                        }>
                        <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    { pageNumbers.map( number => (
                        <li key={number} className="page-item" >
                            <a href="!#" className="page-link" onClick={ e => {
                                                                                e.preventDefault();
                                                                                clickHandler(number)
                                                                                home ? window.scrollTo(0, 650) : window.scrollTo(0, 0)
                                                                            }
                                                                      }>
                                {number}
                            </a>
                        </li>
                    ))}
                    <li className="page-item">
                        <a className="page-link" href="!#" aria-label="Next" onClick={ e => {
                                                                                                e.preventDefault();
                                                                                                clickHandler(pageNumbers.length)
                                                                                                home ? window.scrollTo(0, 650) : window.scrollTo(0, 0)
                                                                                            }
                                                                                    }>
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination;
