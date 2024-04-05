import { useEffect, useState } from 'react'
import './carousel.scss'
import slide1 from '../../assets/images/Slideshow-01.jpg'
import slide2 from '../../assets/images/Slideshow-02.jpg'

const Carousel = () => {
    const slides = [
        {
            id: 1,
            image: slide1,
            alt: 'Clément Degardenzi jouant de la guitare',
        },
        {
            id: 2,
            image: slide2,
            alt: 'Scène de concert',
        },
    ]

    const [currentSlide, setCurrentSlide] = useState(1)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
        }, 12000)

        return () => clearInterval(interval)
    }, [slides.length])

    return (
        <div className="carousel-wrapper">
            <div className="carousel">
                {slides.map((slide) => (
                    <div key={`${slide.id}`}>
                        <img
                            className={`slide slide--${
                                slides[currentSlide].id === slide.id
                                    ? 'display'
                                    : 'hide'
                            }`}
                            src={slide.image}
                            alt={slide.alt}
                        />
                    </div>
                ))}
            </div>

            <span className="catch">"Do or do not there is no try" - yoda</span>
        </div>
    )
}

export default Carousel
