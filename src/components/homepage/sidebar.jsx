import React, { useState } from 'react';
import './sidebars.css';
import { FaRegCircleUser } from 'react-icons/fa6';
import { IoIosArrowDown } from 'react-icons/io';
import Logo from './Logo';
import { Link } from "react-router-dom";


const Hello = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
        window.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth',
        });
    }
};
  return (
    <div className="home">
      <div className="header"> 
        <h1 className="fit-track"> 
          <span style={{ color: '#55E6A5' }}>Fit </span>
          <span style={{ color: 'white' }}>Track </span>
          <span style={{ color: '#55E6A5' }}>Pro</span>
        </h1>
        <div className="togg" onClick={toggleSidebar}>
          <div className={`bar ${isOpen ? 'change' : ''}`}></div>
          <div className={`bar ${isOpen ? 'change' : ''}`}></div>
          <div className={`bar ${isOpen ? 'change' : ''}`}></div>
        </div>
      </div>
     <Logo/>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <p onClick={() => scrollToSection("home")} style={{ cursor: 'pointer' }}>Home Page</p>
                {/* <p onClick={() => scrollToSection("dashboard")} style={{ cursor: 'pointer' }}>Dashboard</p> */}
                <p onClick={() => scrollToSection("services")} style={{ cursor: 'pointer' }}>Our Services</p>
                <p onClick={() => scrollToSection("contact")} style={{ cursor: 'pointer' }}>Contact Us</p>
                <p onClick={() => scrollToSection("about-us")} style={{ cursor: 'pointer' }}>About Us</p>
        <div className="dropDown1">
        <Link to='/login' style={{ textDecoration: 'none' }}>
          <button>
            <FaRegCircleUser />&nbsp;Login&nbsp;<IoIosArrowDown className="arrowIcon1" />
          </button></Link>
          <div className="content1">
          <Link to='/login' style={{ textDecoration: 'none' }}>
            <a href="">Login/Signup</a></Link>
            <a href="">Dashboard</a>
            {/* <a href="">Opt 3</a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hello;
