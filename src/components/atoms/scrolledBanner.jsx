import './scrolledBanner.scss'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useContext } from 'react'
import { ThemeContext } from '../../assets/ThemeContext'

const ScrolledBanner = ({ children, bannerNum, className }) => {
    gsap.registerPlugin(useGSAP)
    gsap.registerPlugin(ScrollTrigger)

    useGSAP(() => {
        gsap.set('.banner3d-' + bannerNum, {
            perspectiveOrigin: 'center -100vh',
        })
        gsap.to('.banner3d-' + bannerNum, {
            scrollTrigger: {
                trigger: '.banner3d-' + bannerNum,
                scrub: true,
                start: 'top bottom',
                end: 'bottom top',
            },
            perspectiveOrigin: 'center 100vh',
            ease: 'none',
        })
    }, [])

    const { isDark } = useContext(ThemeContext)

    return (
        <div
            className={`
                xp__content-card banner ${className ? className : ''} ${
                isDark ? 'banner-dark' : 'banner-light'
            }`}
        >
            <div className={'banner3d-' + bannerNum}>
                <div
                    className={`banner3d-${bannerNum}-front ${
                        isDark ? 'banner-dark' : 'banner-light'
                    }`}
                >
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ScrolledBanner
