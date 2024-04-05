import { useEffect, useState } from 'react'
import './carousel.scss'
import slide1 from '../../assets/images/Slideshow-01.jpg'
import slide2 from '../../assets/images/Slideshow-02.jpg'
import slide3 from '../../assets/images/MAO-01.jpg'

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
        {
            id: 3,
            image: slide3,
            alt: 'Ordinateur affichant un logiciel de MAO',
        },
    ]

    const [index, setIndex] = useState(0)

    const nextSlide = () => {
        setTimeout(
            () => setIndex(index < slides.length - 1 ? index + 1 : 0),
            7000
        )
    }
    useEffect(() => {
        nextSlide()
    })

    return (
        <div className="carousel-wrapper">
            <div className="carousel">
                {slides.map((slide, idx) => (
                    <div key={`${slide.id}`}>
                        <img
                            className={`slide slide--${
                                index === idx ? 'display' : 'hide'
                            }`}
                            src={slide.image}
                            alt={slide.alt}
                        />
                    </div>
                ))}
            </div>

            <div className="carousel__pagination">
                {slides.map((slide, radioIdx) => (
                    <input
                        className="carousel__pagination__radio"
                        key={`${slide.alt}`}
                        type="radio"
                        name="radio-button"
                        checked={index === radioIdx}
                        readOnly
                    />
                ))}
            </div>

            <span className="catch">"Do or do not there is no try" - yoda</span>
        </div>
    )
}

export default Carousel
