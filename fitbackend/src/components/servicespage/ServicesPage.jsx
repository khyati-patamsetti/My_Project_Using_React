import React from "react";
import ServStyles from './services.module.css'
import ServCards from "./Cards";

export default function Services(){
    return(
        <>
            <div className={ServStyles.servMain}>
                <p>Our Services</p>
                <ServCards/>
            </div>
        </>
    )
}
  