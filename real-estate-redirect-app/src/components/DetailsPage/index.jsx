import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function DetailsPage(props) {
    const [listing, setListing] = useState({ ...props.listing})
    const params = useParams()
    console.log(listing)

    useEffect(() => {
        if (!listing.identifier || !listing.summary) {
            async function getListingFromAPI() {
                const res = await fetch(`https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail?attomid=${params.listingId}`, {
                    mode: 'cors',
                    headers: {
                      'apikey': '8eaefa810fce7a9efaed84eb8b9559c9',
                      'Accept': 'applicaton/json'
                    }
                })
                const data = await res.json()
                setListing(data.property[0])
            }
            getListingFromAPI()
        }
    }, [])

    if (listing.identifier && listing.summary) {
        return (
            <div className="w-4/5 mx-auto min-h-[300px] border-2 border-black rounded-lg">
                <img src="/src/assets/placeholder.jpeg" className="card-image rounded-t-xl min-h-[200px] min-w-full object-cover cursor-pointer"/>
                <h1>Address:</h1>
                <h1 className="p-2 text-center">{listing.address.line1}</h1>
                <h1 className="p-2 text-center">{listing.address.line2}</h1>
                <p>Parcel number: {listing.identifier.apn}</p>
                <p>Property type: {listing.summary.propertyType}</p>
                <p>Subdivision: {listing.area.subdname}</p>
                <p>Year Built: {listing.summary.yearbuilt}</p>
                <p>Bedrooms: {listing.building.rooms.beds}</p>
                <p>Bathrooms: {listing.building.rooms.bathstotal}</p>
                <p>Total rooms: {listing.building.rooms.roomsTotal}</p>
                <p>Stories/Level: {listing.building.summary.levels}</p>
                <p>Living area: {listing.building.size.livingsize}</p>
                <p>Lot size &#40;in acres&#41;: {listing.lot.lotsize1}</p>
                <p></p>
                <p>Parking type: {listing.building.parking.prkgType}</p>
                <p>Parking size: {listing.building.parking.prkgSize} sq ft &#40;{listing.building.parking.prkgSpaces} cars&#41;</p>
                <p>Pool: {listing.lot.pooltype}</p>
                <p>Cooling: {listing.utilities.coolingtype}</p>
                <p>Heating: {listing.utilities.heatingtype}</p>
                <p>Views: {listing.building.summary.view}</p>
                <p>Current Occupancy: {listing.summary.absenteeInd}</p>
            </div>
        )
    } else {
        return (
            <p>The listing data is loading...</p>
        )
    }
}
