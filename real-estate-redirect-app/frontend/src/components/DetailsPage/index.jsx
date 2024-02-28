import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import OfferSection from "../OfferSection"

//for seed data
import {seedData} from '../../assets/seedData'

export default function DetailsPage(props) {
    const [listing, setListing] = useState({ ...props.listing})
    const params = useParams()
    // useEffect(() => {
    //     if (!listing.identifier || !listing.summary || !listing.building) {
    //         async function getListingFromAPI() {
    //             const res = await fetch(`https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/expandedprofile?attomId=${params.listingId}`, {
    //                 mode: 'cors',
    //                 headers: {
    //                   'apikey': '8eaefa810fce7a9efaed84eb8b9559c9',
    //                   'Accept': 'applicaton/json'
    //                 }
    //             })
    //             const data = await res.json()
    //             setListing(data.property[0])
    //         }
    //         getListingFromAPI()
    //     }
    // }, [])

    useEffect(() => {
        if (!listing.identifier) {
            async function getListing() {
                const property = seedData.filter(listing => listing.identifier.rerListingId == params.listingId)
                setListing(property[0])
            }
            getListing()
        }
    }, [])

    // if (listing.identifier && listing.summary && listing.building) {
    //     return (
    //         <div className="w-4/5 mx-auto min-h-[300px] border-2 border-black rounded-lg">
    //             <img src="/src/assets/placeholder.jpeg" className="card-image rounded-t-xl min-h-[200px] min-w-full object-cover cursor-pointer"/>
    //             <h1>Address:</h1>
    //             <h1 className="p-2 text-center">{listing.address.line1}</h1>
    //             <h1 className="p-2 text-center">{listing.address.line2}</h1>
    //             <h3>General facts:</h3>
    //             <p>Parcel number: {listing.identifier.apn}</p>
    //             <p>Property type: {listing.summary.propertyType}</p>
    //             <p>Subdivision: {listing.area.subdName}</p>
    //             <p>Year Built: {listing.summary.yearBuilt}</p>
    //             <p>Stories/Level: {listing.building.summary.levels}</p>
    //             <p>Living area: {listing.building.size.livingSize} sq ft</p>
    //             <p>Lot size: {listing.lot.lotSize1} acres</p>
    //             <p>Pool/Spa: {listing.lot.poolType}</p>
    //             <p>Views: {listing.building.summary.view}</p>
    //             <p>Current Occupancy: {listing.summary.absenteeInd}</p>
    //             <p>Bank-owned: {listing.summary.REOflag}</p>
    //             <br/>
    //             <h3>Rooms information:</h3>
    //             <p>Total rooms: {listing.building.rooms.roomsTotal}</p>
    //             <p>Bedrooms: {listing.building.rooms.beds}</p>
    //             <p>Total bathrooms: {listing.building.rooms.bathsTotal}</p>
    //             <p>Full bathrooms: {listing.building.rooms.bathsFull}</p>
    //             <p>Partial bathrooms: {listing.building.rooms.bathsPartial}</p>
    //             <br/>
    //             <h3>Parking information:</h3>
    //             <p>Type: {listing.building.parking.prkgType}</p>
    //             <p>Size: {listing.building.parking.prkgSize} sq ft</p>
    //             <p>Parking spaces: {listing.building.parking.prkgSpaces}</p>
    //             <br/>
    //             <h3>Utilities information:</h3>
    //             <p>Cooling: {listing.utilities.coolingType}</p>
    //             <p>Heating: {listing.utilities.heatingType}</p>
    //             <br/>
    //             <h3>Construction information:</h3>
    //             <p>Construction type: {listing.building.construction.constructionType}</p>
    //             <p>Frame type: {listing.building.construction.frameType}</p>
    //             <p>Roof: {listing.building.construction.roofCover}</p>
    //             <p>Wall: {listing.building.construction.wallType}</p>
    //             <p>Floor: {listing.building.interior.floors}</p>
    //             <br/>
    //             <h3>Primary owner information:</h3>
    //             <p>Name: {listing.assessment.owner.owner1.lastName}, {listing.assessment.owner.owner1.firstNameAndMi}</p>
    //             <p>Type: {listing.assessment.owner.type}</p>
    //             <br/>
    //             <h3>Mortgage information:</h3>
    //             <p>Mortgage company: {listing.assessment.mortgage.title.companyName}</p>
    //             <p>Mortgage amount: ${listing.assessment.mortgage.FirstConcurrent.amount}</p>
    //             <p>Mortgage type: {listing.assessment.mortgage.FirstConcurrent.loanTypeCode}, {listing.assessment.mortgage.FirstConcurrent.interestRateType}</p>
    //             <p>Mortgage start date: {listing.assessment.mortgage.FirstConcurrent.date}</p>
    //             <br/>
    //             <h2>Tax information</h2>
    //             <p>Annual tax: ${listing.assessment.tax.taxAmt}</p>
    //             <br/>
    //             <h3>Most recent sale information</h3>
    //             <p>Recorded date: {listing.sale.amount.saleRecDate}</p>
    //             <p>Sales price: ${listing.sale.amount.saleAmt}</p>
    //             <p>Price per sq ft: ${listing.sale.calculation.pricePerSizeUnit}</p>
    //             <p>Seller: {listing.sale.sellerName}</p>
    //         </div>
    //     )
    // } else {
    //     return (
    //         <p>The listing data is loading...</p>
    //     )
    // }
    if (listing.identifier) {
        return (
            <>
                <div className="w-4/5 mx-auto min-h-[300px] border-2 border-black rounded-lg">
                    <img src="/src/assets/placeholder.jpeg" className="card-image rounded-t-xl min-h-[200px] min-w-full object-cover cursor-pointer"/>
                    <p>ADDRESS</p>
                    <p>{listing.location.address}</p>
                    <p>{listing.location.city}, {listing.location.state} {listing.location.zip}</p>
                    <p>Subdivision: {listing.location.subdivision}</p>
                    <br/>
                    <p>IDENTIFICATION</p>
                    <p>RER ID: {listing.identifier.rerListingId}</p>
                    <p>Parcel number: {listing.identifier.apn}</p>
                    <br/>
                    <p>CURRENT STATUS</p>
                    <p>Status: {listing.currentActivity.status}</p>
                    <p>Sale price: ${listing.currentActivity.price}</p>
                    <p>Price per sq ft: ${listing.currentActivity.pricePerSF}</p>
                    <p>List date: {listing.currentActivity.listDate.toString()}</p>
                    <p>Days on market: {listing.currentActivity.daysOnMarket}</p>
                    <p>Offers: {listing.currentActivity.offers.length}</p>
                    <p>Showing requests: {listing.currentActivity.showingRequests.length}</p>
                    <br/>
                    <p>HOMEOWNER INFORMATION</p>
                    <p>Name: {listing.homeowner[0].lastName}, {listing.homeowner[0].firstName}</p>
                    <br/>
                    <p>GENERAL PROPERTY INFORMATION</p>
                    <p>Property type: {listing.generalInfo.propertyType}</p>
                    <p>Zoning description: {listing.generalInfo.zoning}</p>
                    <p>Stories: {listing.generalInfo.stories}</p>
                    <p>Level: {listing.generalInfo.level}</p>
                    <p>Year built: {listing.generalInfo.yearBuilt}</p>
                    <p>Detached: {listing.generalInfo.isDetached}</p>
                    <p>House faces: {listing.generalInfo.houseFaces}</p>
                    <br/>
                    <p>EXTERIOR DETAILS</p>
                    <p>Roof: {listing.exterior.construction.roof}</p>
                    <p>Walls: {listing.exterior.construction.walls}</p>
                    <p>Fencing: {listing.exterior.construction.fencing}</p>
                    <p>Lot size: {listing.exterior.lot.size}</p>
                    <p>Lot features: {listing.exterior.lot.features.join(", ")}</p>
                    <p>Vegetation: {listing.exterior.lot.vegetation.join(", ")}</p>
                    <p>Solar panels: {listing.exterior.hasSolar}</p>
                    <p>Balcony: {listing.exterior.hasBalcony}</p>
                    <p>Pool: {listing.exterior.hasPool}</p>
                    <p>Spa: {listing.exterior.hasSpa}</p>
                    <br/>
                    <p>INTERIOR DETAILS</p>
                    <p>Bedrooms: {listing.interior.rooms.bedrooms}</p>
                    <p>Bathrooms: {listing.interior.rooms.bathrooms}</p>
                    <p>Total number of rooms: {listing.interior.rooms.roomsTotal}</p>
                    <p>Flooring: {listing.interior.construction.flooring.join(", ")}</p>
                    <p>Living area: {listing.interior.livingArea}</p>
                    <p>Cooling: {listing.interior.cooling}</p>
                    <p>Heating: {listing.interior.heating}</p>
                    <p>Appliances included: {listing.interior.appliancesIncluded.join(", ")}</p>
                    <p>Fixtures: {listing.interior.features.fixtures.join(", ")}</p>
                    <p>Window: {listing.interior.features.window.join(", ")}</p>
                    <p>Fireplace: {listing.interior.features.fireplace}</p>
                    <p>Other: {listing.interior.features.other}</p>
                    <br/>
                    <p>PARKING INFORMATION</p>
                    <p>Type: {listing.parking.type}</p>
                    <p>Size: {listing.parking.size}</p>
                    <br/>
                    <p>UTILITIES</p>
                    <p>Sewer: {listing.utilities.sewer}</p>
                    <p>Water: {listing.utilities.water}</p>
                    <p>Other: {listing.utilities.otherUtilities}</p>
                    <br/>
                    <p>HOA INFORMATION</p>
                    <p>Name: {listing.HOA[0].name}</p>
                    <p>Monthly fee: {listing.HOA[0].monthlyFee}</p>
                    <p>Phone: {listing.HOA[0].phone}</p>
                    <p>Fee includes: {listing.HOA[0].feeIncludes.join(", ")}</p>
                    <br/>
                    <p>COMMUNITY FEATURES</p>
                    <p>Amenities: {listing.community.amenities.join(", ")}</p>
                    <p>Community is age restricted (55+): {listing.community.isSeniorCommunity}</p>
                    <br/>
                    <p>MOST RECENT SALE HISTORY</p>
                    <p>Sold date: {listing.lastSoldInfo.soldDate.toString()}</p>
                    <p>Sale price: ${listing.lastSoldInfo.price}</p>
                    <p>Sale price per sq ft: ${listing.lastSoldInfo.pricePerSF}</p>
                    <br/>
                    <p>TAX INFORMATION</p>
                    <p>Annual tax for year {listing.tax.year}: ${listing.tax.annualTax}</p>
                    <br/>
                    <br/>
                </div>
                <div>
                    <p>OFFERS</p>
                    <OfferSection listingId={listing.identifier.rerListingId} />
                </div>
            </>
        )
    }
}
