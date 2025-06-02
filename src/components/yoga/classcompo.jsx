import React from 'react';
import '../exercise/Exercise.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Yoga = () => {
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
        image: 'https://media.istockphoto.com/id/1178171645/photo/woman-doing-hatha-yoga-headstand-or-sirsasana-on-nature.jpg?s=612x612&w=0&k=20&c=5_VSwno-hpwpLnUE9jb4wZo-UJ0zzFGc42R9n1h5NjA=',
        category: 'MORE',
        title: 'Hatha Yoga',
        link: '/hatha-yoga',
    },
    {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5RXXzi0u9hMEIx-Gl-Y-2bu3eq7JFv9EK75CQKKGMg9NUhNvkIpFuuc6vsqGFlX4M4DQ&usqp=CAU',
        category: 'MORE',
        title: 'Iyengar Yoga',
        link:'/iyengar-yoga',
    },
    {
        image: 'https://www.bikramnl.com/wp-content/uploads/2018/04/tree-pose-1-366x549.jpg',
        category: 'MORE',
        title: ' Bikram Yoga',
        link: '/bikram-yoga',
    },
    {
        image: 'https://media.istockphoto.com/id/675317596/photo/woman-practicing-aerial-yoga.jpg?s=612x612&w=0&k=20&c=Dwh1xLPzmktDoUYhTzP2BalNZHZG5ZAfE0qXWX-_NXo=',
        category: 'MORE',
        title: ' Air Yoga',
        link:'/air-yoga',
    },
    {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9wyo8M3R-bPTveRUh0z2vyg8Ax1Ip_HrL2FRK061NbjYFaPR0djx21C-IKO9AoKHPLtg&usqp=CAU',
        category: 'MORE',
        title: 'Ashtanga Yoga',
        link: '/ashtanga-yoga',
    },
    {
        image: 'https://img.freepik.com/free-photo/portrait-woman-trying-facial-yoga-massage-stay-young_23-2150520742.jpg?t=st=1730051329~exp=1730054929~hmac=735264751b802a96fa9391e7806f4ab800a1c0226b1f77ca972a5f0c75db1fd5&w=360',
        category: 'MORE',
        title: ' Facial Yoga',
        link: '/facial-yoga',
    },
];

export default Yoga;