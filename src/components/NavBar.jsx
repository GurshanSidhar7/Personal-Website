import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/" id="navbar__logo">gurshan.sidhar</Link>
        <div className="navbar__toggle" id="mobile-menu">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <ul className="navbar__menu">
          <li className="navbar__item">
            <Link to="/" className="navbar__links">Home</Link>
          </li>
          <li className="navbar__item">
            <Link to="/projects" className="navbar__links">Projects</Link>
          </li>
          <li className="navbar__item">
            <Link to="/gallery" className="navbar__links">About Me</Link>
          </li>
          <li className="navbar__btn">
            <a href="/resume.pdf" className="button" target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
