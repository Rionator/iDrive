import React from 'react'
import { Link } from 'react-router-dom'
import './footerManagement.css'

const FooterManagement = ({ launchesPerPage, allLaunches, paginate }) => {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allLaunches / launchesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <footer>
            <ul>
                {pageNumbers.map(number => (
                    <li key={number}>
                        <Link to='/launches' onClick={() => paginate(number)}>
                            {number}
                        </Link>
                    </li>
                ))}
            </ul>
        </footer>
    )
}

export default FooterManagement