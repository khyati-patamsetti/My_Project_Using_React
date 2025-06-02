import React, { useState, useEffect } from 'react';
import Hello from './sidebar'; 
import Header from './header'; 

const Toggle = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); 
    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
    };
    useEffect(() => {
        window.addEventListener('resize', handleResize); 

        return () => {
            window.removeEventListener('resize', handleResize); 
        };
    }, []);

    return (
        <div>
            {isMobile ? <Hello /> : <Header />}
        </div>
    );
};
export default Toggle;