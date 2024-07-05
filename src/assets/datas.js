import slide1 from '../assets/images/Slideshow-01.webp'
import slide2 from '../assets/images/Slideshow-02.webp'
import slide3 from '../assets/images/MAO-01.webp'
import slide1Tablet from '../assets/images/tablet/Slideshow-01-tablet.webp'
import slide2Tablet from '../assets/images/tablet/Slideshow-02-tablet.webp'
import slide3Tablet from '../assets/images/tablet/MAO-01-tablet.webp'
import slide1Mobile from '../assets/images/mobile/Slideshow-01-mobile.webp'
import slide2Mobile from '../assets/images/mobile/Slideshow-02-mobile.webp'
import slide3Mobile from '../assets/images/mobile/MAO-01-mobile.webp'

export const slides = [
    {
        id: 1,
        image: slide1,
        imageTablet: slide1Tablet,
        imageMobile: slide1Mobile,
        alt: 'Clément Degardenzi jouant de la guitare',
    },
    {
        id: 2,
        image: slide2,
        imageTablet: slide2Tablet,
        imageMobile: slide2Mobile,
        alt: 'Scène de concert',
    },
    {
        id: 3,
        image: slide3,
        imageTablet: slide3Tablet,
        imageMobile: slide3Mobile,
        alt: 'Ordinateur affichant un logiciel de MAO',
    },
]
