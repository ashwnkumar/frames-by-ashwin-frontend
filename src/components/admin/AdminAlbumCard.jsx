import React from 'react'
import Button from '../form/Button'

const AdminAlbumCard = ({ album, handleDelete, handleEdit }) => {
    const { coverImage, title } = album

    return (
        <div className="flex flex-col items-center justify-center gap-2 w-full">
            <img src={coverImage} alt={title} className="w-full h-60 object-cover" />
            <div className="flex items-center justify-between w-full">
                <h2 className="text-lg font-semibold truncate" title={title}>
                    {title}
                </h2>
                <div className="flex items-center gap-2">
                    <Button label={"Edit"} onClick={() => handleEdit(album)} />
                    <Button label={"Delete"} variant='danger' onClick={() => handleDelete(album)} />
                </div>
            </div>
        </div>
    )
}

export default AdminAlbumCard