export const apiConfig = {
  admin: {
    login: "/admin/login",
    getAdmin: "/admin",
    updateAdmin: "/admin/update",
    updatePassword: "/admin/password",
  },
  albums: {
    getAlbums: "/albums",
    createAlbum: "/albums",
    updateAlbum: (albumId) => `/albums/${albumId}`,
    deleteAlbum: (albumId) => `/albums/${albumId}`,
    getAlbumById: (albumId) => `/albums/${albumId}`,
  },
  photos: {
    getPhotosByAlbum: (albumId) => `/photos/${albumId}`,
    createPhoto: "/photos",
    getPhotos: "/photos",
    getFeaturedPhotos: "/photos/featured",
    deletePhoto: (photoId) => `/photos/${photoId}`,     
  },
};
