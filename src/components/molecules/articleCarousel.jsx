import { useState } from 'react'
import './article.scss'

const ArticleCarousel = ({ project, openModal, modalContentSelection }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const totalImages = project.medias?.images?.length || 0

    // Calculate indices for the current, previous, and next images
    const getPreviousImageIndex = () =>
        (currentImageIndex - 1 + totalImages) % totalImages
    const getNextImageIndex = () => (currentImageIndex + 1) % totalImages

    const handleNextImage = () => {
        setCurrentImageIndex(getNextImageIndex())
    }

    const handlePrevImage = () => {
        setCurrentImageIndex(getPreviousImageIndex())
    }

    const openModalWithContent = async (project) => {
        await modalContentSelection(project)
        openModal()
    }

    return (
        <div className="article__image-container">
            {project.medias?.images?.length > 1 && (
                <>
                    <button
                        className="carousel-button left"
                        onClick={() =>
                            handlePrevImage(project.medias.images.length)
                        }
                    >
                        &#8249;
                    </button>
                    <button
                        className="carousel-button right"
                        onClick={() =>
                            handleNextImage(project.medias.images.length)
                        }
                    >
                        &#8250;
                    </button>
                </>
            )}
            {project.medias?.images?.map((image, index) => (
                <img
                    key={index}
                    className={`article__image ${
                        index === currentImageIndex
                            ? 'article__image-center'
                            : index === getPreviousImageIndex()
                            ? 'article__image-previous'
                            : index === getNextImageIndex()
                            ? 'article__image-next'
                            : 'article__image-unselected'
                    }`}
                    src={image.image}
                    alt={image.alternativeText}
                    onClick={() => openModalWithContent(project)}
                />
            ))}
        </div>
    )
}

export default ArticleCarousel
