import { useState } from 'react'
import './article.scss'
import { useMediaQuery } from 'react-responsive'

const ArticleCarousel = ({ project, openModal, modalContentSelection }) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    // Combine videos and images, placing videos first
    const mediaItems = [
        ...(project.medias?.videos || []),
        ...(project.medias?.images || []),
    ]

    const totalItems = mediaItems.length

    const getPreviousIndex = () => (currentIndex - 1 + totalItems) % totalItems
    const getNextIndex = () => (currentIndex + 1) % totalItems

    const handleNext = () => setCurrentIndex(getNextIndex())
    const handlePrev = () => setCurrentIndex(getPreviousIndex())

    const openModalWithContent = async (project) => {
        await modalContentSelection(project)
        openModal()
    }

    const isMobile = useMediaQuery({ maxWidth: 768 })

    return (
        <div className="article__image-container">
            {totalItems > 1 && (
                <>
                    <button
                        className="carousel-button left"
                        onClick={handlePrev}
                    >
                        &#8249;
                    </button>
                    <button
                        className="carousel-button right"
                        onClick={handleNext}
                    >
                        &#8250;
                    </button>
                </>
            )}
            <>
                {mediaItems.map((item, index) => {
                    const isFirstIndex = index === 0
                    return item.image ? (
                        <img
                            key={index}
                            className={`article__image ${
                                index === currentIndex
                                    ? 'article__image-center'
                                    : index === getPreviousIndex()
                                    ? 'article__image-previous'
                                    : index === getNextIndex()
                                    ? 'article__image-next'
                                    : 'article__image-unselected'
                            }`}
                            src={item.image}
                            alt={item.alternativeText}
                            loading={isFirstIndex ? 'eager' : 'lazy'}
                        />
                    ) : (
                        <video
                            key={index}
                            className={`article__image ${
                                index === currentIndex
                                    ? 'article__image-center'
                                    : index === getPreviousIndex()
                                    ? 'article__image-previous'
                                    : index === getNextIndex()
                                    ? 'article__image-next'
                                    : 'article__image-unselected'
                            }`}
                            controls
                            controlsList="nodownload nofullscreen"
                            muted
                        >
                            <source src={item.url} type="video/mp4" />
                        </video>
                    )
                })}
            </>
            {!isMobile && (
                <button
                    className="fullscreen-btn"
                    onClick={() => openModalWithContent(project)}
                >
                    <i className="fa-solid fa-expand"></i>
                </button>
            )}
        </div>
    )
}

export default ArticleCarousel
