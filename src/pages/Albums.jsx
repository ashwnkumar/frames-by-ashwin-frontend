import React from 'react'
import { useAuth } from '../context/AuthContext'
import Button from '../components/form/Button'
import PageHeader from '../components/PageHeader'
import AlbumCard from '../components/AlbumCard'
import { useState } from 'react'
import { useEffect } from 'react'
import axiosInstance from '../utils/axiosInstance'
import { apiConfig } from '../utils/apiConfig'

const Albums = () => {
  const { token, setLoading } = useAuth()
  const [albums, setAlbums] = useState([])

  const fetchAlbums = async () => {
    try {
      setLoading(true)
      const res = await axiosInstance.get(apiConfig.albums.getAlbums)
      const { albums } = res.data.data;
      setAlbums(albums)
    } catch (error) {
      console.error("Error fetching albums:", error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAlbums()
  }, [])

  const headerButtons = [{ label: "Manage", navTo: "/manage-albums", className: "!text-xl" }]
  return (
    <div className="w-full min-h-screen  flex flex-col items-center justify-start">
      <PageHeader title="Albums" buttons={token ? headerButtons : []} />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {albums.length === 0 ? (
          <p className="text-gray-700 text-sm">No albums found</p>
        ) : (
          albums.map((album) => (
            <AlbumCard key={album._id} album={album} />
          ))
        )}
      </div>
    </div>
  )
}

export default Albums