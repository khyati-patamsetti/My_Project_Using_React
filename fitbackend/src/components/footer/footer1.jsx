import React from "react";
import footstyle from "./footer1.module.css";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { RiWhatsappFill } from "react-icons/ri";
import { FaSquareInstagram } from "react-icons/fa6";
import { MdEmail } from "react-icons/md"; 

function Footer1() { 
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
        <div className={footstyle.footer}>
            <div className={footstyle.heading}>
                <span className={footstyle.fit}>Fit </span>
                <span className={footstyle.track}>Track </span>
                <span className={footstyle.pro}>Pro</span>
            </div>
            <div className={footstyle.flex}>
            <div className={footstyle.names}>
            <p onClick={() => scrollToSection("home")} style={{ cursor: 'pointer' }}  className={footstyle.p1}>Home Page</p>
                {/* <p onClick={() => scrollToSection("dashboard")} style={{ cursor: 'pointer' }}>Dashboard</p> */}
                <p onClick={() => scrollToSection("services")} style={{ cursor: 'pointer' }}  className={footstyle.p3}>Our Services</p>
                <p onClick={() => scrollToSection("contact")} style={{ cursor: 'pointer' }}  className={footstyle.p4}>Contact Us</p>
                <p onClick={() => scrollToSection("about-us")} style={{ cursor: 'pointer' }}  className={footstyle.p5}>About Us</p>
            </div>
            <div className={footstyle.copyright}>
                <p className={footstyle.copyrightText}>copyrights @2024, Fit Track Pro</p>
            </div></div>
            <div className={footstyle.social}>
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                        <FaFacebook size={30}  />
                    </a>
                <a href="https://x.com/?lang=en" target="_blank" rel="noopener noreferrer">
                    <FaSquareXTwitter size={30}  />
                </a>
                <a href="https://whatsapp.com/" target="_blank" rel="noopener noreferrer">
                    <RiWhatsappFill size={30}  />
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                    <FaSquareInstagram size={30}  />
                </a>
                <a href="https://mail.google.com/" target="_blank" rel="noopener noreferrer">
                    <MdEmail size={30} />
                </a>
            </div>
        </div>
    );
}

export default Footer1;
