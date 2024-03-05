import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import OfferSection from "../OfferSection"
import ShowingRequestSection from "../ShowingRequestSection"
import { getListingById, getUser, getUserByToken } from '../../../utils/backend'
import attention from '../../assets/attention.png'
import './styles.css'

export default function DetailsPage(props) {
    const [userId, setUserId] = useState('')
    const [listing, setListing] = useState({ ...props.listing})
    const [homeowners, setHomeowners] = useState([])
    const [loginStatus, setLoginStatus] = useState(props.loginStatus)
    const params = useParams()
    async function getListingData() {
        const listingData = await getListingById(params.listingId)
        setListing(listingData)
        setHomeowners([])
        let ownerName = ''
        for (let owner of listingData.homeowner) {
            const homeownerData = await getUser(owner)
            ownerName = `${homeownerData.firstName} ${homeownerData.lastName}`
            setHomeowners(homeowners => homeowners.concat(ownerName))
        }
    }

    async function getUserData() {
        const currentUserData = await getUserByToken()
        setUserId(currentUserData.userId)
    }
    
    useEffect(() => {
        getListingData()
        if (loginStatus) getUserData()
    }, [])

    useEffect(() => {
        localStorage.getItem("userToken") ? setLoginStatus(true) : setLoginStatus(false)
    }, [])

    if (listing.identifier) {
        function displayBool(attr) {
            return attr ? 'Yes' : 'No'
        }
        let detached = displayBool(listing.generalInfo.isDetached)
        let solar = displayBool(listing.exterior.hasSolar)
        let balcony = displayBool(listing.exterior.hasBalcony)
        let pool = displayBool(listing.exterior.hasPool)
        let spa = displayBool(listing.exterior.hasSpa)
        let senior = displayBool(listing.community.isSeniorCommunity)

        function displayDate(dateStr) {
            let dateObj = new Date(dateStr)
            return `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()}`
        }

        let listed = displayDate(listing.currentActivity.listDate)
        let sold = displayDate(listing.lastSoldInfo.soldDate)

        let level = ''
        if (listing.generalInfo.propertyType === 'condominium') {
            level = <p>Unit located on: level {listing.generalInfo.level}</p>
        }

        let dom = Math.floor((new Date() - new Date(listing.currentActivity.listDate)) / 1000 / 60 / 60 / 24) + 1

        let homeownersStr = ''
        for (let i = 0; i < homeowners.length; i++) {
            if (i === 0) {
                homeownersStr = homeowners[i]
            } else {
                homeownersStr += `, ${homeowners[i]}`
            }
        }

        let hoas = ''
        if (listing.HOA.length === 0) {
            hoas = 'None'
        } else {
            for (let j = 0; j < listing.HOA.length; j++) {
                hoas += `${listing.HOA[j].name}: $${listing.HOA[j].monthlyFee} / mo\n`
            }
        }

        let offersAndShowingRequests = ''
        //show offers & showing requests sections only if logged in as a buyer or the seller of this listing
        if (loginStatus && localStorage.userCategory === "buyer" || loginStatus && localStorage.userCategory === "seller" && userId == listing.homeowner[0]) {
            offersAndShowingRequests = 
            <>
                <div>
                    <p className="text-center">OFFERS</p>
                    <OfferSection listingId={listing._id} loginStatus={loginStatus}/>
                </div>
                <div>
                    <p className="text-center">SHOWING REQUESTS</p>
                    <ShowingRequestSection listingId={listing._id} loginStatus={loginStatus}/>
                </div>
            </>
        } else if (loginStatus && localStorage.userCategory === "seller" || !loginStatus) {
            offersAndShowingRequests =
            <div className="flex justify-center items-center border-2 my-5 bg-yellow-400">
                <img src={attention} className="max-h-[30px] max-w-[30px]"/>
                <h1 className="my-3 text-center text-slate-800 mx-2">Please log in as a buyer or the seller of this listing to see information on offers and showing requests for this property.</h1>
                <img src={attention} className="max-h-[30px] max-w-[30px]"/>
            </div>
        } 

        let addressForGoogle = listing.location.address.split(" ").join("+")

        return (
            <>
                <div className="w-4/5 mx-auto min-h-[300px] border-2 border-stone-400 rounded-lg text-stone-400 p-5 m-5 flex-col justify-center bg-stone-700">
                    <img src="/src/assets/placeholder.jpeg" className="card-image rounded-xl mb-5 min-h-[200px] min-w-full object-cover cursor-pointer"/>
                    <div className="detail-section">
                        <p className="detail-section-title">LOCATION</p>
                        <p>{listing.location.address}</p>
                        <p>{listing.location.city}, {listing.location.state} {listing.location.zip}</p>
                        <p>Subdivision: {listing.location.subdivision}</p>
                    </div>
                    <iframe
                        className="mx-auto w-5/6 border-solid border-black border-2"
                        height="450"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDdwlwZ1lufnj3okOOPi4qY38RWUTH5ndg&q=${addressForGoogle}`}>
                    </iframe>
                    <br/>
                    <div className="detail-section">
                        <p className="detail-section-title">IDENTIFICATION</p>
                        <p>RER ID: {listing._id}</p>
                        <p>Parcel number: {listing.identifier.apn}</p>
                    </div>
                    <div className="detail-section">
                        <p className="detail-section-title">CURRENT STATUS</p>
                        <p>Status: {listing.currentActivity.status}</p>
                        <p>Sale price: ${listing.currentActivity.price.toLocaleString()}</p>
                        <p>Price per sq ft: ${listing.currentActivity.pricePerSF}</p>
                        <p>List date: {listed}</p>
                        <p>Days on market: {dom}</p>
                    </div>
                    <div className="detail-section">
                        <p className="detail-section-title">HOMEOWNER INFORMATION</p>
                        <p>Owner(s): {homeownersStr}</p>
                    </div>
                    <div className="detail-section">
                        <p className="detail-section-title">GENERAL PROPERTY INFORMATION</p>
                        <p>Property type: {listing.generalInfo.propertyType}</p>
                        <p>Zoning description: {listing.generalInfo.zoning}</p>
                        <p>Stories: {listing.generalInfo.stories}</p>
                        {level}
                        <p>Year built: {listing.generalInfo.yearBuilt}</p>
                        <p>Detached: {detached}</p>
                        <p>House faces: {listing.generalInfo.houseFaces}</p>
                    </div>
                    <div className="detail-section">
                        <p className="detail-section-title">EXTERIOR DETAILS</p>
                        <p>Roof: {listing.exterior.construction.roof}</p>
                        <p>Walls: {listing.exterior.construction.walls}</p>
                        <p>Fencing: {listing.exterior.construction.fencing}</p>
                        <p>Lot size: {listing.exterior.lot.size}</p>
                        <p>Lot features: {listing.exterior.lot.features.join(", ")}</p>
                        <p>Vegetation: {listing.exterior.lot.vegetation.join(", ")}</p>
                        <p>Solar panels: {solar}</p>
                        <p>Balcony: {balcony}</p>
                        <p>Pool: {pool}</p>
                        <p>Spa: {spa}</p>
                    </div>
                    <div className="detail-section">
                        <p className="detail-section-title">INTERIOR DETAILS</p>
                        <p>Bedrooms: {listing.interior.rooms.bedrooms}</p>
                        <p>Bathrooms: {listing.interior.rooms.bathrooms}</p>
                        <p>Total number of rooms: {listing.interior.rooms.roomsTotal}</p>
                        <p>Flooring: {listing.interior.construction.flooring.join(", ")}</p>
                        <p>Living area: {listing.interior.livingArea.toLocaleString()} sq ft</p>
                        <p>Cooling: {listing.interior.cooling}</p>
                        <p>Heating: {listing.interior.heating}</p>
                        <p>Appliances included: {listing.interior.appliancesIncluded.join(", ")}</p>
                        <p>Fixtures: {listing.interior.features.fixtures.join(", ")}</p>
                        <p>Window: {listing.interior.features.window.join(", ")}</p>
                        <p>Fireplace: {listing.interior.features.fireplace}</p>
                        <p>Other: {listing.interior.features.other}</p>
                    </div>
                    <div className="detail-section">
                        <p className="detail-section-title">PARKING INFORMATION</p>
                        <p>Type: {listing.parking.type}</p>
                        <p>Size: {listing.parking.size}</p>
                    </div>
                    <div className="detail-section">
                        <p className="detail-section-title">UTILITIES</p>
                        <p>Sewer: {listing.utilities.sewer}</p>
                        <p>Water: {listing.utilities.water}</p>
                        <p>Other: {listing.utilities.otherUtilities}</p>
                    </div>
                    <div className="detail-section">
                        <p className="detail-section-title">HOA INFORMATION</p>
                        <p>{hoas}</p>
                    </div>
                    <div className="detail-section">
                        <p className="detail-section-title">COMMUNITY FEATURES</p>
                        <p>Amenities: {listing.community.amenities.join(", ")}</p>
                        <p>Community is age restricted (55+): {senior}</p>
                    </div>
                    <div className="detail-section">
                        <p className="detail-section-title">MOST RECENT SALE HISTORY</p>
                        <p>Sold date: {sold}</p>
                        <p>Sale price: ${listing.lastSoldInfo.price.toLocaleString()}</p>
                        <p>Sale price per sq ft: ${listing.lastSoldInfo.pricePerSF}</p>
                    </div>
                    <div className="detail-section">
                        <p className="detail-section-title">TAX INFORMATION</p>
                        <p>Annual tax for year {listing.tax.year}: ${listing.tax.annualTax.toLocaleString()}</p>
                    </div>
                    {offersAndShowingRequests}
                </div>
            </>
        )
    }
}
