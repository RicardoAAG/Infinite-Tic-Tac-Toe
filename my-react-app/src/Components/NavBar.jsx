import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <>
            <section className="navbar">
                <nav className="navbar-container">
                    <Link className="navbar-title" to="/">INFINITE TIC TAC TOE</Link>
                </nav>
            </section>
        </>
    )
}

export default NavBar