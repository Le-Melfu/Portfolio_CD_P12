import jazzdelune from './music/Au Jazz de Lune (court métrage).mp3'
import waves from './music/Waves.mp3'
import looh from './music/locked out of heaven.mp3'
import summon from './music/Summon the Megalodon.mp3'

import slide1 from '../assets/images/Slideshow-01.webp'
import slide2 from '../assets/images/Slideshow-02.webp'
import slide3 from '../assets/images/MAO-01.webp'
import slide1Tablet from '../assets/images/tablet/Slideshow-01-tablet.webp'
import slide2Tablet from '../assets/images/tablet/Slideshow-02-tablet.webp'
import slide3Tablet from '../assets/images/tablet/MAO-01-tablet.webp'
import slide1Mobile from '../assets/images/mobile/Slideshow-01-mobile.webp'
import slide2Mobile from '../assets/images/mobile/Slideshow-02-mobile.webp'
import slide3Mobile from '../assets/images/mobile/MAO-01-mobile.webp'

import ridingPic from '../assets/images/riding-cities.webp'
import ocProject from '../assets/icons/Logo_OpenClassrooms.png'


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

export const projects = [
    {
        id: 1,
        title: 'Riding Cities',
        desc: ['Ce projet était une initiation aux bases du HTML et du CSS'],
        image: ridingPic,
        imageAlt: 'Visuel du site',
        pin: ocProject,
        pinAlt: 'Logo OpenClassRooms',
    },
    {
        id: 2,
        title: 'Booki',
        desc: [
            `Ce projet consistait en l'élaboration de la page d'accueil d'une agence de location immobilère en utilisant HTML et CSS avec les grid et les flexbox`,
        ],
        url: 'https://github.com/Le-Melfu/booki-starter-code',
        pin: ocProject,
        pinAlt: 'Logo OpenClassRooms',
    },
    {
        id: 3,
        title: 'Oh My Food',
        desc: [
            `Ce projet consistait en l'élaboration d'animations simple afin de dynamiser la page d'une application de restauration`,
        ],
        url: 'https://github.com/Le-Melfu/Site_OhMyFood',
        pin: ocProject,
        pinAlt: 'Logo OpenClassRooms',
    },
    {
        id: 4,
        title: 'Print It',
        desc: [
            `Ce projet m'a permis d'appréhender les bases de JAVASCRIPT dans la réalisation d'un carousel dynamique`,
        ],
        url: 'https://github.com/Le-Melfu/Print-it-JS',
        pin: ocProject,
        pinAlt: 'Logo OpenClassRooms',
    },
    {
        id: 5,
        title: 'Architecte Sophie Bluel',
        desc: [
            `Dans ce projet j'ai pu apprendre le fonctionnement des API et comment s'en servir au sein d'une application classique HTML/CSS/JS grâce aux différentes requêtes
            `,
        ],
        url: 'https://github.com/Le-Melfu/Portfolio-architecte-sophie-bluel',
        pin: ocProject,
        pinAlt: 'Logo OpenClassRooms',
    },
    {
        id: 6,
        title: 'Kasa',
        desc: [
            `Ce projet m'a permis d'apprendre les bases de fonctionnement de React pour créer une Single Page Application
            `,
        ],
        url: 'https://github.com/Le-Melfu/Kasa',
        pin: ocProject,
        pinAlt: 'Logo OpenClassRooms',
    },
    {
        id: 7,
        title: 'Nina Carducci',
        desc: [
            `Dans ce projet j'ai du optimiser le site internet d'une photographe afin que celui-ci gagne en performance, en accessibilité et en SEO.
            `,
        ],
        url: 'https://github.com/Le-Melfu/ninacarducci.github.io',
        pin: ocProject,
        pinAlt: 'Logo OpenClassRooms',
    },
    {
        id: 8,
        title: '724 events',
        desc: [
            `Dans ce projet j'ai eu à trouver et régler plusieurs bug sur un site d'une agence d'événementiel, que ce soit des bugs fonctionnel mais également des bugs d'intégration
            `,
            `J'ai également dù écrire plusieurs tests unitaire et aborder cet aspect du travail de développeur WEB`,
        ],
        url: 'https://github.com/Le-Melfu/Debuggez-une-application-React.JS',
        pin: ocProject,
        pinAlt: 'Logo OpenClassRooms',
    },
]

export const musicData = [
    {
        id: 1,
        title: 'Au Jazz de Lune (composition court-métrage)',
        audioSrc: jazzdelune,
        duration: '03:21',
    },
    {
        id: 2,
        title: 'Waves (cover guitare)',
        audioSrc: waves,
        duration: '05:11',
    },
    {
        id: 3,
        title: 'Locked out of heaven (cover basse)',
        audioSrc: looh,
        duration: '04:06',
    },
    {
        id: 4,
        title: 'Summon the Megalodon (cover MAO)',
        audioSrc: summon,
        duration: '02:07',
    },
]
