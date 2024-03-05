import { useState } from 'react'
import Card from '../Card'

export default function Gallery({ listings, getFilteredData, updateDetails, loginStatus }) {
    const [endDisplayIndex, setEndDisplayIndex] = useState(5)
    let galleryContent = <p>None found</p>

    if (listings.length > 0) {
        galleryContent = listings
            .slice(0, endDisplayIndex)
            .map(listing => <Card
                key={listing._id}
                listing={listing}
                getFilteredData={getFilteredData}
                updateDetails={updateDetails}
                loginStatus={loginStatus}
            />)
    }

    window.onscroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight && endDisplayIndex < listings.length) {
            setEndDisplayIndex(endDisplayIndex + 5)
        }
    }

    return (
        <div className="w-4/5 mt-10 mx-auto md:columns-2">
            {galleryContent}
        </div>
    )
}