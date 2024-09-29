import React, { useEffect, useState } from 'react'
import './carousel.scss'
import { slides } from '../../assets/datas'

const Carousel = () => {
    const [index, setIndex] = useState(0)
    const [prevIndex, setPrevIndex] = useState(slides.length)
    const [nextIndex, setNextIndex] = useState(1)

    const nextSlide = () => {
        setTimeout(() => {
            setPrevIndex(prevIndex < slides.length - 1 ? prevIndex + 1 : 0)
            setIndex(index < slides.length - 1 ? index + 1 : 0)
            setNextIndex(nextIndex < slides.length - 1 ? nextIndex + 1 : 0)
        }, 7000)
    }
    useEffect(() => {
        nextSlide()
    })

    return (
        <div className="carousel-wrapper">
            <div className="carousel">
                {slides.map((slide, idx) => (
                    <div key={`slide-${slide.id + slide.alt}`}>
                        <img
                            key={`slide-image-${slide.id}`}
                            className={`slide slide--${
                                index === idx
                                    ? 'display'
                                    : nextIndex === idx
                                    ? 'right'
                                    : prevIndex === idx
                                    ? 'left'
                                    : 'hide'
                            }`}
                            srcSet={`${slide.image} 1024w, ${slide.imageTablet} 768w, ${slide.imageMobile} 480w`}
                            sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, 1024px"
                            alt={slide.alt}
                            fetchpriority={idx > 0 ? 'low' : 'high'}
                            loading={idx > 0 ? 'lazy' : ''}
                        />
                    </div>
                ))}
            </div>

            <span className="catch">"Do or do not there is no try" - yoda</span>
        </div>
    )
}

export default Carousel
