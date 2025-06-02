import React from "react";
import Style from './home.module.css';
import Header from "./header";
import Logo from "./Logo";
import Hello from "./sidebar";
import Toggle from "./toggle";
import Services from "../servicespage/ServicesPage";
import Contact from "../Contact/contact";
import Footer1 from "../footer/footer1";

export default function HomePage() {
    return ( 
        <>
            <div className={Style.homepage} id="home">  
                <Toggle />
                <Logo />
                
            </div> 
            <div id="services">
              <Services/>
            </div>
            <div id="contact">
                <Contact/>
            </div>
            <div id="about-us">
                <Footer1/>
            </div>
        </> 
    );
}
