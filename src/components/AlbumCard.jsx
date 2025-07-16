import React from 'react'
import Button from './form/Button'
import { useNavigate } from 'react-router-dom'

const AlbumCard = ({ album }) => {
    const { coverImage, title } = album
    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center justify-center gap-2 w-full">
            <div
                onClick={() => navigate(`/albums/${album._id}`)}
                className={`group relative flex flex-col items-center justify-end gap-2 h-72 w-full cursor-pointer overflow-hidden rounded-lg transition-all md:saturate-0 md:hover:saturate-100`}
                style={{
                    backgroundImage: coverImage ? `url(${coverImage})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: !coverImage ? '#ddd' : undefined,
                }}
                aria-label={`Album cover for ${title}`}
            >
                <div className="absolute bottom-0 left-0 right-0 translate-y-20 group-hover:translate-y-0 flex flex-col items-end justify-center px-4 py-2 w-full text-light bg-gradient-to-b from-transparent to-black/40 transition-transform duration-300 rounded-b-lg">
                    <Button label="View" className="!rounded-full !bg-light !text-dark" />
                </div>
            </div>

            <div className="flex items-center w-full justify-start">
                <h2 className="text-lg font-semibold truncate" title={title}>
                    {title}
                </h2>
            </div>
        </div>
    )
}

export default AlbumCard
