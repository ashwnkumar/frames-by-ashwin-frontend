import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../components/Layout";
import Protected from "./Protected";
import AdminLogin from "../pages/admin/AdminLogin";
import Gallery from "../pages/Gallery";
import About from "../pages/About";
import Albums from "../pages/Albums";
import AdminSettings from "../pages/admin/AdminSettings";
import PageNotFound from "../pages/PageNotFound";
import ManageAlbums from "../pages/admin/ManageAlbums";
import AlbumDetails from "../pages/AlbumDetails";
import UploadPhoto from "../pages/admin/UploadPhoto";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "albums",
        element: <Albums />,
      },
      {
        path: "albums/:albumId",
        element: <AlbumDetails />,
      },
      {
        path: "gallery",
        element: <Gallery />,
      },
      {
        element: <Protected />,
        children: [
          {
            path: "settings",
            element: <AdminSettings />,
          },
          {
            path: "manage-albums",
            element: <ManageAlbums />
          },
          {
            path: "upload",
            element: <UploadPhoto />
          }
        ],
      }

    ],
  },
  {
    path: "/login",
    element: <AdminLogin />,
  },
  {
    path: "*",
    element: <PageNotFound />
  }
]);
