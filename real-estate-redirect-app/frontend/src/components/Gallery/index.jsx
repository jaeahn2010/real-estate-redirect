import { useState } from 'react'
import Card from '../Card'

export default function Gallery({ listings, getFilteredData, updateDetails, zipCode, loginStatus }) {
    const [endDisplayIndex, setEndDisplayIndex] = useState(5)

    // don't user until api problem solved
    // function getNextPage() {
    //     if (!zipCode) {
    //         refreshQueue(`https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail?latitude=36.188110&longitude=-115.176468&radius=20&page=${listings.length / 20 + 1}&pageSize=20`)
    //     } else {
    //         let zipCodeParam = `postalcode=${zipCode}`
    //         refreshQueue(`https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/address?${zipCodeParam}&page=${listings.length / 20 + 1}&pageSize=20`)
    //     }
    //     setCurrentPage(currentPage + 1)
    // }

    // function getNextPage() {
    //     if (!zipCode) {
    //         refreshQueue(listings.slice(currentPage * 5, (currentPage + 1) * 5))
    //     } else {
    //         const filtered = listings.filter(listing => listing.location.zip == zipCode)
    //         refreshQueue(filtered.slice(currentPage * 5, (currentPage + 1) * 5))
    //     }
    //     setCurrentPage(currentPage + 1)
    // }
    
    // function getPrevPage() {
    //     setCurrentPage(currentPage - 1)
    // }

    let galleryContent = <p>None found</p>

    // don't use until api problem resolved
    // if (listings.length > 0) {
    //     const startIndex = (currentPage - 1) * 20;
    //     const endIndex = startIndex + 20
    //     galleryContent = listings
    //         .slice(startIndex, endIndex)
    //         .map(listing => <Card key={listing.identifier.attomId} listing={listing} updateDetails={updateDetails}/>)
    // }

    if (listings.length > 0) {
        galleryContent = listings
            .slice(0, endDisplayIndex)
            .map(listing => <Card
                key={listing.identifier.rerListingId}
                listing={listing}
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
