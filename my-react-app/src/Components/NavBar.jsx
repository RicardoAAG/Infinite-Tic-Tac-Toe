import React, { useState } from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom';
import Footer from './Footer';

function NavBar() {

    const [infoVisible, setInfoVisible] = useState(false)

    return (
        <>
            <section className="navbar">
                <nav className="navbar-container">
                    <p className="navbar-info" onClick={() => setInfoVisible(!infoVisible)}>HELP</p>
                    <Link className="navbar-title" to="/">INFINITE TIC TAC TOE</Link>
                </nav>
            </section>
            <Footer visible={infoVisible} setVisible={setInfoVisible} />
        </>
    )
}

export default NavBar