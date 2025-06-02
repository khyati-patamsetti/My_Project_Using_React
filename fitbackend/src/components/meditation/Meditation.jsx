import React from 'react';
import '../exercise/Exercise.css';
import { Link, useNavigate } from 'react-router-dom';

const Meditation = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="container text-center"></div>  
            <div className="shell">
                <div className="product-grid">
                    {productData.map((product, index) => (
                        <div className="product-card" key={index}>
                            <div className="wsk-cp-product">
                                <div className="wsk-cp-img">
                                    <img src={product.image} alt="Product" className="img-responsive" />
                                </div>
                                <div className="wsk-cp-text">
                                    <div className="category">
                                        <button className='more-button' onClick={() => navigate(product.link)}>
                                            {product.category}
                                        </button>
                                    </div>
                                    <div className="title-product">
                                        <h3>{product.title}</h3>
                                    </div>
                                    <div className="card-footer">
                                        <div className="wcf-right">
                                            <a href="#" className="buy-btn">
                                                <i className="zmdi zmdi-shopping-basket"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <span>
                        <i>
                            <button onClick={() => navigate('/navigate')} className="wsk-btn">BACK</button>
                        </i>
                    </span>
                </div>
            </div>
        </div>
    );
};  

const productData = [
    {
        image: 'https://img.freepik.com/free-photo/woman-doing-yoga-mat-outside_23-2148732890.jpg?t=st=1729884380~exp=1729887980~hmac=e7195e61873cd37ecaa29d97ba2afe69beb1754cbd28d33dbbe74c2eed330b0e&w=360',
        category: 'MORE',
        title: 'Mantra Meditation',
        link:'/mantra',
    },
    {
        image: 'https://img.freepik.com/free-photo/front-view-fit-young-girl-exercising_23-2148309145.jpg?t=st=1729884565~exp=1729888165~hmac=8c9e193eedf4d9d5da94f1377952b8a59499168821fccccba72c7358908336dc&w=360',
        category: 'MORE',
        title: 'Mindfulness Meditation',
        link:'/mindful',
    },
    {
        image: 'https://media.istockphoto.com/id/173150406/photo/yoga-exercise.webp?s=1024x1024&w=is&k=20&c=Ws6Rx_NXNl_ubVsZcoMLo5B0WKoIPLEt1uZTkz81QIk=',
        category: 'MORE',
        title: 'Chakra Meditation',
        link:'/chakra',
    },
    {
        image: 'https://img.freepik.com/free-photo/woman-standing-meditating_23-2147648579.jpg?t=st=1729885316~exp=1729888916~hmac=b10e2a63b6e13c03237fd799c60cba0e9a954345baa045cf3c01a24c39b50ab1&w=740',
        category: 'MORE',
        title: 'Movement Meditation',
        link:'/movement',
    },
    {
        image: 'https://img.freepik.com/free-photo/mature-woman-is-doing-yoga-sky-background-high-tops-mountains_1157-41509.jpg?t=st=1729885649~exp=1729889249~hmac=719ab2af2f2eecd67666a8afaeccd28b994001e293dbc95854ebe8af3d1732ab&w=360',
        category: 'MORE',
        title: 'Visualization Meditation',
        link:'/visualization',
    },
    {
        image: 'https://img.freepik.com/free-photo/portrait-beautiful-young-woman-sitting-yoga-pose_23-2148185995.jpg?t=st=1729885806~exp=1729889406~hmac=ea7ff6e3c13ceafa355f051f0a29d8dd5b1fa962c4363a511cc1fd9b064a8ae3&w=360',
        category: 'MORE',
        title: 'Spiritual Meditation',
        link:'/spiritual'
    },
];

export default Meditation;
