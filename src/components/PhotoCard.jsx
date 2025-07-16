import React from 'react'

const PhotoCard = ({ photo }) => {
    if (!photo) {
        return null
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <img src={photo.imageUrl} alt={photo.title} className="w-full h-full object-cover" />
            <div className="w-full h-full flex flex-col items-center justify-center">
            </div>
        </div>
    )
}

export default PhotoCard