import { useState } from 'react'
import './article.scss'

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

            {mediaItems.map((item, index) =>
                item.image ? (
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
                        onClick={() => openModalWithContent(project)}
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
                        onClick={() => openModalWithContent(project)}
                    >
                        <source src={item.url} type="video/mp4" />
                    </video>
                )
            )}
        </div>
    )
}

export default ArticleCarousel
