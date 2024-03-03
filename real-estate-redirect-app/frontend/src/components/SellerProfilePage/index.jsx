import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Gallery from '../Gallery'

export default function SellerProfilePage({loginStatus, listings, setListings, updateDetails, getFilteredData}) {
    const params = useParams()

    useEffect(() => {
        // setListings([])
        getFilteredData("userToken", "none")
    }, [])

    return (
        <>
            <h1>My Seller Profile Page</h1>
            <Gallery 
                listings={listings}
                getFilteredData={getFilteredData}
                updateDetails={updateDetails}
                loginStatus={loginStatus}
            />
        </>
    )
}