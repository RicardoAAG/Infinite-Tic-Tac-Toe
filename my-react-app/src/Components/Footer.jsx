import React from 'react'
import './Footer.css'
import { AnimatePresence, motion } from 'framer-motion'

function Footer(props) {

    window.addEventListener('scroll', function () {
        if (window.scrollY > 0) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    });


    return (
        <>
            <AnimatePresence>
                {props.visible && (
                    <motion.section className="footer"
                        animate={{
                            left: "2.5vw",
                        }}
                        exit={{
                            left: "-101vw",
                        }}
                        transition={{
                            duration: .75,
                            ease: "backInOut",
                        }}
                    >
                        <div className="footer--container">
                            <ref className="footer-exit" onClick={() => props.setVisible(!props.visible)}>X</ref>
                            <div className="footer--title-container">
                                <p className="footer--title-text">
                                    Thanks for trying my page ^^
                                </p>
                            </div>
                            <hr className="footer--info--line" />
                            <div className="footer--info--container">
                                <div className="footer--info-tutorial">
                                    <ul className="footer--info--tutorial-list">
                                        <li className="footer--info--tutorial--list-item">How to Start: Select a gamemode, name, token and hit play!</li>
                                        <li className="footer--info--tutorial--list-item">Rules: "Infinite Tic Tac Toe" has the same rules as its normal version,
                                            the screen shows whos turn is it and the all time loser always goes first.
                                        </li>
                                        <li className="footer--info--tutorial--list-item">The difference here is; as you are about to place your fourth token the oldest
                                            one you placed will turn grey, cant use it to win, you cant place a new token in that tile
                                            and the token will disappear immediately after you place your fourth token, this cycle will continue until someone chains 3 tokens together, winning, have fun :D
                                        </li>
                                    </ul>
                                </div>
                                <hr className="footer--info--line" />
                                <div className="footer--info--extra">
                                    <p className="footer--info--extra-item">Github</p>
                                    <p className="footer--info--extra-item">Youtube</p>
                                    <p className="footer--info--extra-item">LinkedIn</p>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </>
    )
}

export default Footer