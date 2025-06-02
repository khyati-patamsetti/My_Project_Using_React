import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { MdCall } from "react-icons/md";
import constyle from './contact.module.css';

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    }); 
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:9000/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);
            // navigate("/")
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    };
    return (  
        <div className={constyle.contactbody}>
            <h1 className={constyle.hding}>Contact Us</h1>
            <div className={constyle.contact}>
                <div className={constyle.headlogo}>
                    <div className={constyle.heading1}>
                        <span className={constyle.fit}>Fit </span>
                        <span className={constyle.track}>Track </span>
                        <span className={constyle.pro}>Pro</span></div>
                        <div className={constyle.div1}><MdCall color="#55E6A5" size={25} /> <br /><span className={constyle.phno}>Phno:</span> 8345671234</div>
                        <div className={constyle.div2}><IoIosMail color="#55E6A5" size={25} /> <br />Support: fittrackpro@gmail.com</div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={constyle.forms}>
                        <p className={constyle.name1}>Your Name <br /><br />
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className={constyle.name} required />
                        </p>
                        <p className={constyle.name1}>Your Email <br /><br />
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className={constyle.email} required />
                        </p>
                        <p className={constyle.name1}>Subject <br /><br />
                            <input type="text" name="subject" value={formData.subject} onChange={handleChange} className={constyle.name} required />
                        </p>
                        <p className={constyle.name1}>Message <br /><br />
                            <textarea name="message" value={formData.message} onChange={handleChange} className={constyle.msg} required></textarea>
                        </p>
                    </div>
                    <button type="submit" className={constyle.send}>Send &nbsp;<FaArrowRight size={15} /></button>
                </form>
            </div>
        </div>
    );
}
export default Contact;