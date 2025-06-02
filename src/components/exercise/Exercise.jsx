import React from 'react';
import './Exercise.css';
import { useNavigate } from 'react-router-dom';

const ProductCard = () => {
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
        image: 'https://media.istockphoto.com/id/542197916/photo/running-on-treadmill.jpg?s=612x612&w=0&k=20&c=CYywmb71uOepSHWa534hG9230AzawSa4i3sA89o4qCQ=',
        category: 'MORE',
        title: 'Aerobic Exercise',
        link: '/aerobic',
    },
    {
        image: 'https://st2.depositphotos.com/1845763/8361/i/450/depositphotos_83612668-stock-photo-man-doing-cable-fly-in.jpg',
        category: 'MORE',
        title: 'Anaerobic Exercise',
        link: '/anaerobic',
    },
    {
        image: 'https://media.istockphoto.com/id/829288012/photo/athletic-woman-doing-exercise-outdoors_tone.jpg?s=612x612&w=0&k=20&c=R7JvY2dlx2tFb_xHsCBHzlR3CoZL7_pksTbxNSVVRO0=',
        category: 'MORE',
        title: 'Flexibility Exercise',
        link: '/flexibility',
    },
    {
        image: 'https://img.freepik.com/premium-photo/full-length-portrait-young-woman-black-sportwear-park-doing-yoga-park-trees-background-vertical-view_246930-1346.jpg?w=360',
        category: 'MORE',
        title: 'Balance Exercise',
        link: '/balance',
    },
    {
        image: 'https://media.istockphoto.com/id/519275366/photo/strengthening-muscles.jpg?s=612x612&w=0&k=20&c=7JjfLPQGnmPe91ixYDcTgInIBfWhnP5Cg15BfScfR_Y=',
        category: 'MORE',
        title: 'Strength Exercise',
        link: '/strength',
    },
    {
        image: 'https://media.istockphoto.com/id/538125577/photo/young-man-running-at-treadmill-in-gym.jpg?s=612x612&w=0&k=20&c=y4WbJA1Yz81pDsBNILqu2Z-fqV_YHRJj5JrJSW-FL2w=',
        category: 'MORE',
        title: 'Agility Training',
        link: '/exe',
    },
];

export default ProductCard;
