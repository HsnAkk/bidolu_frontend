import React from 'react'
import { Carousel, CardGroup } from 'react-bootstrap';
import Jump from 'react-reveal/Jump';
import Slide from 'react-reveal/Slide';
import { FaRegMoneyBillAlt} from 'react-icons/fa';
import {MdLanguage} from 'react-icons/md';
import {GoCreditCard} from 'react-icons/go';
import {AiOutlineImport, AiOutlineCustomerService} from 'react-icons/ai';
import {FiMapPin} from 'react-icons/fi';
import './Banner.css';


const carouselData = [
    { id: 1,
      src: "/images/banner_01.jpg",
      alt: "First slide",
      label: "Live life on full...",
      text: "Your vision... & Your focus..."
    },
    { id: 2,
      src: "/images/banner_02.jpg",
      alt: "Second slide",
      label: "All eyes on you...",
      text: "It’s happening here...!"
    },
    { id: 3,
      src: "/images/banner_03.jpg",
      alt: "Third slide",
      label: "Find yourself...",
      text: "Favorite brands and hottest trends..."
    }
]

const cardsData = [
    {   id:1,
        icon: <MdLanguage />,  
        text: "Shop in 8 languages"
    },
    {   id:2,
        icon: <FaRegMoneyBillAlt />,  
        text: "Shop in 60+ currencies"
    },
    {   id:3,
        icon: <GoCreditCard />,  
        text: "Secure payments"
    },
    {   id:4,
        icon: <AiOutlineImport />,  
        text: "Estimated import fees"
    },
    {   id:5,
        icon: <FiMapPin />,  
        text: "Track your package"
    },
    {   id:6,
        icon: <AiOutlineCustomerService />,  
        text: "24/7 Customer service"
    }
]


function Banner() {
    return (
        <div className="row">
            <div className="banner-box">
                <Carousel fade='true' className="carousel-container" interval= '5000' >
                    {
                        carouselData.map( (item, index) => (
                            <Carousel.Item key={index}>
                                <div className="left-item">
                                    <Carousel.Caption className="carousel-label">
                                        <Slide left cascade mountOnEnter='true' >
                                            <div>
                                                <h3>{item.label}</h3>
                                                <p>{item.text}</p>
                                            </div>
                                        </Slide>
                                    </Carousel.Caption>
                                </div>
                                <div className="right-item">  
                                    <img
                                        className="d-block w-100 img-fluid"
                                        src= {item.src}
                                        alt= {item.alt}
                                    />
                                </div>
                            </Carousel.Item>
                        ))
                    }
                </Carousel>
                <div className="carousel-cards">
                    <CardGroup className="justify-content-center">
                        {
                            cardsData.map( (item, index) => (
                                <div key={index} style={{width: '16%', height: '180px'}}>
                                    <div className="m-2 cardbox">
                                        <Jump>
                                            <div className="icon">
                                                {item.icon}
                                            </div>
                                        </Jump>
                                        <p>{item.text}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </CardGroup>
                </div>
            </div>
        </div>
    )
}

export default Banner;
