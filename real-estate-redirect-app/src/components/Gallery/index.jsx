import { useState } from 'react'
import Card from '../Card'

export default function Gallery({ listings, refreshQueue, updateDetails, zipCode }) {
    const [currentPage, setCurrentPage] = useState(1)
    function getNextPage() {
        if (!zipCode) {
            refreshQueue(`https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail?latitude=36.188110&longitude=-115.176468&radius=20&page=${listings.length / 20 + 1}&pageSize=20`)
        } else {
            refreshQueue(`https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/address?postalcode=${zipCode}&page=1&pageSize=20`)
        }
        setCurrentPage(currentPage + 1)
    }
    
    function getPrevPage() {
        setCurrentPage(currentPage - 1)
    }

    let galleryContent = <p>Property data is loading...</p>

    if (listings.length > 0) {
        const startIndex = (currentPage - 1) * 20;
        const endIndex = startIndex + 20
        galleryContent = listings
            .slice(startIndex, endIndex)
            .map(listing => <Card key={listing.identifier.attomId} listing={listing} updateDetails={updateDetails}/>)
    }

    let prevBtn = <button onClick={getPrevPage} className='mx-10 border-2 border-neutral-900 border-solid rounded-xl p-2'>&#11104; Previous Page</button>
    let nextBtn = <button onClick={getNextPage} className='mx-10 border-2 border-neutral-900 border-solid rounded-xl p-2'>Next Page &#11106;</button>
    let btnsDisplay =
        <p className='text-xl'>
            <span>{prevBtn}</span>
            <span> Current page: {currentPage} </span>
            <span>{nextBtn}</span>
        </p>

    if (currentPage === 1) {
        btnsDisplay = 
        <p className='text-xl'>
            <span> Current page: {currentPage} </span>
            <span>{nextBtn}</span>
        </p>
    } else if (currentPage === 10) {
        btnsDisplay =
        <p className='text-xl'>
            <span>{prevBtn}</span>
            <span> Current page: {currentPage} </span>
        </p>    
    }
    
    return (
        <>
            <div className='page-controls text-center'>
                {btnsDisplay}
            </div>  

            <div className="w-4/5 mt-10 mx-auto xl:columns-4 lg:columns-3 md:columns-2">
                {galleryContent}
            </div>
        </>
    )
}
