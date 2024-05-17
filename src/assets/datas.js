import slide1 from './images/Slideshow-01.jpg'
import slide2 from './images/Slideshow-02.jpg'
import slide3 from './images/MAO-01.jpg'
import ridingPic from './images/riding-cities.jpg'
import jazzdelune from './music/Au Jazz de Lune (court métrage).mp3'
import waves from './music/Waves.mp3'
import looh from './music/locked out of heaven.mp3'
import summon from './music/Summon the Megalodon.mp3'

export const slides = [
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

export const projects = [
    {
        id: 1,
        title: 'Riding Cities',
        desc: ['Ce projet était une initiation aux bases du HTML et du CSS'],
        image: ridingPic,
        imageAlt: 'Visuel du site',
    },
    {
        id: 2,
        title: 'Booki',
        desc: [
            `Ce projet consistait en l'élaboration de la page d'accueil d'une agence de location immobilère en utilisant HTML et CSS avec les grid et les flexbox`,
        ],
        url: 'https://github.com/Le-Melfu/booki-starter-code',
    },
    {
        id: 3,
        title: 'Oh My Food',
        desc: [
            `Ce projet consistait en l'élaboration d'animations simple afin de dynamiser la page d'une application de restauration`,
        ],
        url: 'https://github.com/Le-Melfu/Site_OhMyFood',
    },
    {
        id: 4,
        title: 'Print It',
        desc: [
            `Ce projet m'a permis d'appréhender les bases de JAVASCRIPT dans la réalisation d'un carousel dynamique`,
        ],
        url: 'https://github.com/Le-Melfu/Print-it-JS',
    },
    {
        id: 5,
        title: 'Architecte Sophie Bluel',
        desc: [
            `Dans ce projet j'ai pu apprendre le fonctionnement des API et comment s'en servir au sein d'une application classique HTML/CSS/JS grâce aux différentes requêtes
            `,
        ],
        url: 'https://github.com/Le-Melfu/Portfolio-architecte-sophie-bluel',
    },
    {
        id: 6,
        title: 'Kasa',
        desc: [
            `Ce projet m'a permis d'apprendre les bases de fonctionnement de React pour créer une Single Page Application
            `,
        ],
        url: 'https://github.com/Le-Melfu/Kasa',
    },
    {
        id: 7,
        title: 'Nina Carducci',
        desc: [
            `Dans ce projet j'ai du optimiser le site internet d'une photographe afin que celui-ci gagne en performance, en accessibilité et en SEO.
            `,
        ],
        url: 'https://github.com/Le-Melfu/ninacarducci.github.io',
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
