import { CameraOff } from 'lucide-react'
import React from 'react'
import Button from '../components/form/Button'

const headings = [
    "404 – Frame Not Found",
    "404 – Shot Missing",
    "404 – Exposure Error",
    "404 – No Image Captured",
    "404 – Out of Focus",
    "404 – Negative Space",
    "404 – Lost in the Darkroom"
];

const messages = [
    "Looks like this frame didn’t develop. Try a different shot!",
    "Oops! This gallery is out of focus.",
    "Shutter error. The page you’re looking for isn’t in this album.",
    "This negative didn’t turn positive—page not found.",
    "Exposure failed. No picture here.",
    "Lost in the darkroom—no page to display.",
    "This moment was never captured.",
    "The light meter says: 404.",
    "This composition doesn’t exist.",
    "Your lens found nothing here.",
    "Flash failed—no image detected.",
    "Bokeh blur: this page is out of reach.",
    "Sorry, this snapshot was deleted.",
    "No pixels here—try another location.",
    "Your viewfinder came up empty.",
    "Page not found—must have been cropped out.",
    "Looks like we underexposed this page.",
    "The film roll ended here.",
    "This capture slipped out of the frame.",
    "You’ve zoomed into nothingness."
];

const PageNotFound = () => {
    const randomHeading = headings[Math.floor(Math.random() * headings.length)];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center gap-4">
            <div className="bg-dark/5 p-8 rounded-full flex items-center justify-center">
                <CameraOff size={60} strokeWidth={1.5} />
            </div>
            <div className="text-center">
                <p className='text-3xl font-medium'>{randomHeading}</p>
                <p className='text-xl mt-2'>{randomMessage}</p>
            </div>
            <Button label={"Go Back Home"} navTo={'/'} />
        </div>
    )
}

export default PageNotFound
