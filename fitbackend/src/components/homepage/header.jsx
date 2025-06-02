import React from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import Style from './home.module.css';
import { Link } from "react-router-dom";

export default function Header() {
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
        <>
            <div className={Style.headdd}>
                <p className={`${Style.fitt} ${Style.noUnderlinee}`} style={{ fontSize: '35px' }}>
                    <span style={{ color: '#55E6A5' }}>Fit </span>
                    <span style={{ color: 'white' }}>Track </span>
                    <span style={{ color: '#55E6A5' }}>Pro</span>
                </p>
                <p onClick={() => scrollToSection("home")} style={{ cursor: 'pointer' }}>Home Page</p>
                {/* <p onClick={() => scrollToSection("dashboard")} style={{ cursor: 'pointer' }}>Dashboard</p> */}
                <p onClick={() => scrollToSection("services")} style={{ cursor: 'pointer' }}>Our Services</p>
                <p onClick={() => scrollToSection("contact")} style={{ cursor: 'pointer' }}>Contact Us</p>
                <p onClick={() => scrollToSection("about-us")} style={{ cursor: 'pointer' }}>About Us</p>
                <div className={Style.dropDown}>
                <Link to='/login' style={{ textDecoration: 'none' }}>

                <button>
                        <FaRegCircleUser />&nbsp;Login&nbsp;<IoIosArrowDown className={Style.arrowIcon} />
                    </button>
                   </Link>
                   <div className={Style.content}>
                   <Link to='/login' style={{ textDecoration: 'none' }}>
            <a >Login/<br/>Signup</a></Link>
          <Link to="/dashboard">  <a href="">Dashboard</a></Link>
            {/* <a href="">Opt 3</a> */}
                    </div>  
                </div>
            </div>
        </>
    );
}
