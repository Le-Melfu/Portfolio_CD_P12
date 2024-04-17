import { useEffect, useState } from 'react'
import './carousel.scss'
import { slides } from '../../assets/datas'

const Carousel = () => {
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
                    <div key={`slide-${slide.id}`}>
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
                    <>
                        <label
                            htmlFor={`radio-btn-${slide.id}`}
                            className="hidden"
                            aria-hidden
                            key={`label-${slide.id}`}
                        >
                            {slide.alt}
                        </label>
                        <input
                            className="carousel__pagination__radio"
                            key={`pagination-${slide.id}`}
                            type="radio"
                            name={`radio-btn-${slide.id}`}
                            id={`radio-btn-${slide.id}`}
                            checked={index === radioIdx}
                            readOnly
                        />
                    </>
                ))}
            </div>

            <span className="catch">"Do or do not there is no try" - yoda</span>
        </div>
    )
}

export default Carousel
