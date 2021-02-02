import React, { useEffect, useState } from 'react';
import './nav.css';

function Nav() {

    // default state for scroll when calling functiom
    const [ show, handleShow ] = useState(false);


    // useEffect(() =>{}, []); template of starting for this function
    useEffect(() =>{
        window.addEventListener("scroll", () =>{
            if (window.scrollY > 100) {
                handleShow(true);
            }else handleShow(false);
        });
        return()=>{
            window.removeEventListener("scroll");
        };
    }, []);

    return (
        <div className={`nav ${show && "nav_black"}`}>
            <img
                className="nav_logo"
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                alt="Netflix Logo"
            />
             <img
                className="nav_avatar"
                src="https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
                alt="Nav Logo"
            />
        </div>
    )
}

export default Nav
