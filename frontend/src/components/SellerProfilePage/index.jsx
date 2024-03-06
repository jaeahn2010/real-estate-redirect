import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Gallery from '../Gallery'
import { postListing, getListings, getUserByToken } from "../../../utils/backend"
import './styles.css'

export default function SellerProfilePage(props) {
    const [username, setUsername] = useState('')
    const [listings, setListings] = useState([...props.listings])
    const [loginStatus, setLoginStatus] = useState({...props.loginStatus})
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [createFormData, setCreateFormData] = useState({
        apn: '',
        address: '',
        city: '',
        state: 'NV',
        zip: 0,
        subdivision: '',
        price: 0,
        pricePerSF: 0,
        listDate: new Date(),
        status: "active",
        homeowner: '',
        propertyType: '',
        zoning: '',
        stories: 0,
        level: 0,
        yearBuilt: 0,
        isDetached: true,
        houseFaces: '',
        roof: '',
        walls: '',
        fencing: '',
        lotSize: 0,
        lotFeatures: '',
        vegetation: '',
        hasSolar: false,
        hasBalcony: false,
        hasPool: false,
        hasSpa: false,
        flooring: '',
        bedrooms: 0,
        bathrooms: 0,
        bathsFull: 0,
        roomsTotal: 0,
        livingArea: 0,
        cooling: '',
        heating: '',
        appliancesIncluded: '',
        fixtures: '',
        window: '',
        fireplace: '',
        other: '',
        parkingType: '',
        parkingSize: 0,
        sewer: '',
        water: '',
        otherUtilities: '',
        HOACount: 0,
        HOAName: '',
        HOAMonthlyFee: 0,
        HOAPhone: '',
        HOAFeeIncludes: '',
        communityAmenities: '',
        isSeniorCommunity: false,
        lastSoldDate: new Date(),
        lastSoldPrice: 0,
        lastSoldPricePerSF: 0,
        annualTax: 0,
        lastTaxYear: 0,
    })
    const params = useParams()

    async function getUserData() {
        const currentUserData = await getUserByToken()
        setUsername(`${currentUserData.firstName} ${currentUserData.lastName}`)
    }
    
    useEffect(() => {
        getUserData()
    }, [])

    useEffect(() => {
        props.getFilteredData("userToken", "none")
            .then(listings => setListings(listings))
    }, [])

    function handleInputChange(event) {
        setCreateFormData({
            ...createFormData,
            [event.target.name]: event.target.value
        })
    }

    function toggleCreateForm() {
        setShowCreateForm(!showCreateForm)
    }

    function refreshListings() {
        props.getFilteredData("userToken", "none")
            .then(newListingsData => setListings(newListingsData))
    }

    function handleSubmit(event) {
        event.preventDefault()
        setCreateFormData({
            apn: '',
            address: '',
            city: '',
            state: 'NV',
            zip: 0,
            subdivision: '',
            price: 0,
            pricePerSF: 0,
            listDate: new Date(),
            status: "active",
            homeowner: listings[0].homeowner[0],
            propertyType: '',
            zoning: '',
            stories: 0,
            level: 0,
            yearBuilt: 0,
            isDetached: true,
            houseFaces: '',
            roof: '',
            walls: '',
            fencing: '',
            lotSize: 0,
            lotFeatures: '',
            vegetation: '',
            hasSolar: false,
            hasBalcony: false,
            hasPool: false,
            hasSpa: false,
            flooring: '',
            bedrooms: 0,
            bathrooms: 0,
            bathsFull: 0,
            roomsTotal: 0,
            livingArea: 0,
            cooling: '',
            heating: '',
            appliancesIncluded: '',
            fixtures: '',
            window: '',
            fireplace: '',
            other: '',
            parkingType: '',
            parkingSize: 0,
            sewer: '',
            water: '',
            otherUtilities: '',
            HOACount: 0,
            HOAName: '',
            HOAMonthlyFee: 0,
            HOAPhone: '',
            HOAFeeIncludes: '',
            communityAmenities: '',
            isSeniorCommunity: false,
            lastSoldDate: new Date(),
            lastSoldPrice: 0,
            lastSoldPricePerSF: 0,
            annualTax: 0,
            lastTaxYear: 0,      
        })
        setShowCreateForm(false)
        postListing({...createFormData, homeowner: listings[0].homeowner[0]})
            .then(() => refreshListings())
    }

    let listingElements = [<p key='0' className="text-center">You have no listings yet.</p>]
    if (listings.length > 0) {
        listingElements =
        <Gallery 
            listings={listings}
            getFilteredData={props.getFilteredData}
            refreshListings={refreshListings}
            updateDetails={props.updateDetails}
            loginStatus={props.loginStatus}
        />
    }

    let createBtn
    if (loginStatus) {
        let btnText = 'Put a new listing on the market'
        if (showCreateForm) btnText = 'Close'
        createBtn = 
            <button
            onClick={toggleCreateForm}
            className="top-0 right-5 absolute text-stone-300 hover:bg-green-800 font-bold py-2 px-4 bg-green-700 rounded cursor-pointer mr-2"
            >
                {btnText}
            </button>
    }

    return (
        <div className='bg-stone-600 rounded-lg p-4 pb-10 mt-4 mx-10 space-y-4 relative text-stone-300'>
            <h1 className='text-xl font-bold'>Listings</h1>
            {createBtn}
            {
                showCreateForm && <form
                    onSubmit={handleSubmit}
                    className="bg-stone-400 rounded-lg p-4 my-4 border-gray-700 border-2 mx-auto">
                    <p className="table-title text-black-800">IDENTIFIER</p>
                    <label htmlFor="apn">Parcel number: </label>
                    <input
                        name="apn"
                        id="apn"
                        type="text"
                        placeholder="Parcel number"
                        defaultValue={createFormData.apn}
                        onChange={handleInputChange}
                    />
                    <p className="table-title text-black-800">LOCATION</p>
                    <label htmlFor="address">Street address: </label>
                    <input
                        name="address"
                        id="address"
                        type="text"
                        placeholder="Street number and name"
                        defaultValue={createFormData.address}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="city">City: </label>
                    <input
                        name="city"
                        id="city"
                        type="text"
                        placeholder="City"
                        defaultValue={createFormData.city}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="state">State: </label>
                    <input
                        name="state"
                        id="state"
                        type="text"
                        placeholder="NV"
                        disabled={true}
                        defaultValue={createFormData.state}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="zip">Zip code: </label>
                    <input
                        name="zip"
                        id="zip"
                        type="number"
                        placeholder="Zip code"
                        defaultValue={createFormData.zip}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="subdivision">Subdivision: </label>
                    <input
                        name="subdivision"
                        id="subdivision"
                        type="text"
                        placeholder="Subdivision"
                        defaultValue={createFormData.subdivision}
                        onChange={handleInputChange}
                    />
                    <p className="table-title text-black-800">LISTING DATA</p>
                    <label htmlFor="price">List price: $</label>
                    <input
                        name="price"
                        id="price"
                        type="number"
                        placeholder="List price"
                        defaultValue={createFormData.price}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="pricePerSF">Price per square foot: </label>
                    <input
                        name="pricePerSF"
                        type="number"
                        placeholder="Price per sq ft"
                        defaultValue={createFormData.pricePerSF}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="listDate">List Date: </label>
                    <input
                        name="listDate"
                        id="listDate"
                        type="date"
                        defaultValue={createFormData.listDate}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="status">Status: </label>
                    <input
                        name="status"
                        type="text"
                        placeholder="Status"
                        defaultValue={createFormData.status}
                        onChange={handleInputChange}
                    />
                    <input
                        name="homeowner"
                        id="homeowner"
                        hidden={true}
                        disabled={true}
                        type="text"
                        defaultValue={listings[0].homeowner[0]}
                    />
                <p className="table-title text-black-800">ZONING & STRUCTURE</p>
                    <label htmlFor="propertyType">Property Type: </label>
                    <input
                        name="propertyType"
                        id="propertyType"
                        type="text"
                        placeholder="Property Type"
                        defaultValue={createFormData.propertyType}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="zoning">Zoning: </label>
                    <input
                        name="zoning"
                        type="text"
                        placeholder="Zoning"
                        defaultValue={createFormData.zoning}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="stories">Stories: </label>
                    <input
                        name="stories"
                        id="stories"
                        type="number"
                        placeholder="Stories"
                        defaultValue={createFormData.stories}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="level">This property is located on level: </label>
                    <input
                        name="level"
                        id="level"
                        type="number"
                        placeholder="Level"
                        defaultValue={createFormData.level}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="yearBuilt">Year Built: </label>
                    <input
                        name="yearBuilt"
                        id="yearBuilt"
                        type="number"
                        placeholder="Year Built"
                        defaultValue={createFormData.yearBuilt}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="isDetached">Is this property detached? </label>
                    <input
                        name="isDetached"
                        id="isDetached"
                        type="text"
                        placeholder="Y/N"
                        defaultValue={createFormData.isDetached}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="houseFaces">Which direction does the house face? </label>
                    <input
                        name="houseFaces"
                        id="houseFaces"
                        type="text"
                        placeholder="Direction"
                        defaultValue={createFormData.houseFaces}
                        onChange={handleInputChange}
                    />
                <p className="table-title text-black-800">EXTERIOR: CONSTRUCTION</p>
                    <label htmlFor="roof">Roof materials: </label>
                    <input
                        name="roof"
                        id="roof"
                        type="text"
                        placeholder="Roof materials"
                        defaultValue={createFormData.roof}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="walls">Wall materials: </label>
                    <input
                        name="walls"
                        id="walls"
                        type="text"
                        placeholder="Walls"
                        defaultValue={createFormData.walls}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="fencing">Fencing materials: </label>
                    <input
                        name="fencing"
                        id="fencing"
                        type="text"
                        placeholder="Fencing materials"
                        defaultValue={createFormData.fencing}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="lotSize">Lot size (sq ft): </label>
                    <input
                        name="lotSize"
                        id="lotSize"
                        type="number"
                        placeholder="Lot size"
                        defaultValue={createFormData.lotSize}
                        onChange={handleInputChange}
                    />
                <p className="table-title text-black-800">EXTERIOR: LOT</p>
                        <input
                        name="lotFeatures"
                        id="desertLandscaping"
                        type="checkbox"
                        defaultValue="desertLandscaping"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="desertLandscaping">Desert Landscaping</label>
                        <input
                        name="lotFeatures"
                        id="rockGravelLandscaping"
                        type="checkbox"
                        defaultValue="rockGravelLandscaping"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="rockGravelLandscaping">Rock/Gravel Landscaping</label>
                        <input
                        name="lotFeatures"
                        id="rearLawn"
                        type="checkbox"
                        defaultValue="rearLawn"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="rearLawn">Rear Lawn</label>
                        <input
                        name="lotFeatures"
                        id="shed"
                        type="checkbox"
                        defaultValue="shed"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="shed">Shed</label>
                        <input
                        name="lotFeatures"
                        id="rvHookup"
                        type="checkbox"
                        defaultValue="rvHookup"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="rvHookup">RV Hookup</label>
                        <input
                        name="lotFeatures"
                        id="patio"
                        type="checkbox"
                        defaultValue="patio"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="patio">Patio</label>
                        <input
                        name="lotFeatures"
                        id="syntheticGrass"
                        type="checkbox"
                        defaultValue="syntheticGrass"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="syntheticGrass">Synthetic Grass</label>
                        <input
                        name="lotFeatures"
                        id="matureLandscaping"
                        type="checkbox"
                        defaultValue="matureLandscaping"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="matureLandscaping">Mature Landscaping</label>
                        <input
                        name="lotFeatures"
                        id="grass"
                        type="checkbox"
                        defaultValue="grass"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="grass">Grass</label>
                        <input
                        name="lotFeatures"
                        id="coveredPatio"
                        type="checkbox"
                        defaultValue="coveredPatio"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="desertLandscaping">Covered Patio</label>
                        <input
                        name="lotFeatures"
                        id="paved"
                        type="checkbox"
                        defaultValue="paved"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="paved">Paved</label>
                <p className="table-title text-black-800">EXTERIOR: VEGETATION</p>
                        <input
                        name="vegetation"
                        id="shrubs"
                        type="checkbox"
                        defaultValue="shrubs"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="shrubs">Shrubs</label>
                        <input
                        name="vegetation"
                        id="fountain"
                        type="checkbox"
                        defaultValue="fountain"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="fountain">Fountain</label>
                        <input
                        name="vegetation"
                        id="trees"
                        type="checkbox"
                        defaultValue="trees"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="trees">Trees</label>
                        <input
                        name="vegetation"
                        id="grass"
                        type="checkbox"
                        defaultValue="grass"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="grass">Grass</label>
                        <input
                        name="vegetation"
                        id="brush"
                        type="checkbox"
                        defaultValue="brush"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="brush">Brush</label>
                        <input
                        name="vegetation"
                        id="bushes"
                        type="checkbox"
                        defaultValue="bushes"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="bushes">Bushes</label>
                <p className="table-title text-black-800">EXTERIOR: OTHER</p>
                    <label htmlFor="hasSolar">Does this property have solar panels? </label>
                    <input
                        name="hasSolar"
                        id="hasSolar"
                        type="text"
                        placeholder="Y/N"
                        defaultValue={createFormData.hasSolar}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="hasBalcony">Does this property have a balcony? </label>
                    <input
                        name="hasBalcony"
                        id="hasBalcony"
                        type="text"
                        placeholder="Y/N"
                        defaultValue={createFormData.hasBalcony}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="hasPool">Does this property have a pool? </label>
                    <input
                        name="hasPool"
                        id="hasPool"
                        type="text"
                        placeholder="Y/N"
                        defaultValue={createFormData.hasPool}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="isDetached">Does this property have a spa? </label>
                    <input
                        name="hasSpa"
                        id="hasSpa"
                        type="text"
                        placeholder="Y/N"
                        defaultValue={createFormData.hasSpa}
                        onChange={handleInputChange}
                    />
                <p className="table-title text-black-800">INTERIOR: FLOORING</p>
                        <input
                        name="flooring"
                        id="tile"
                        type="checkbox"
                        defaultValue="tile"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="tile">Tile</label>
                        <input
                        name="flooring"
                        id="vinyl"
                        type="checkbox"
                        defaultValue="vinyl"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="vinyl">Vinyl</label>
                        <input
                        name="flooring"
                        id="hardwood"
                        type="checkbox"
                        defaultValue="hardwood"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="hardwood">Hardwood</label>
                        <input
                        name="flooring"
                        id="laminate"
                        type="checkbox"
                        defaultValue="laminate"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="laminate">Laminate</label>
                        <input
                        name="flooring"
                        id="marble"
                        type="checkbox"
                        defaultValue="marble"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="marble">Marble</label>
                        <input
                        name="flooring"
                        id="concrete"
                        type="checkbox"
                        defaultValue="concrete"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="concrete">Concrete</label>
                        <input
                        name="flooring"
                        id="stone"
                        type="checkbox"
                        defaultValue="stone"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="stone">Stone</label>
                        <input
                        name="flooring"
                        id="linoleum"
                        type="checkbox"
                        defaultValue="linoleum"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="linoleum">Linoleum</label>
                        <input
                        name="flooring"
                        id="carpet"
                        type="checkbox"
                        defaultValue="carpet"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="carpet">Carpet</label>
                <p className="table-title text-black-800">INTERIOR: ROOMS</p>
                    <label htmlFor="bedrooms">Bedrooms: </label>
                    <input
                        name="bedrooms"
                        id="bedrooms"
                        type="number"
                        placeholder="Bedrooms"
                        defaultValue={createFormData.bedrooms}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="bathrooms">Bathrooms: </label>
                    <input
                        name="bathrooms"
                        id="bathrooms"
                        type="number"
                        placeholder="Bathrooms"
                        defaultValue={createFormData.bathrooms}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="bathsFull">Full baths: </label>
                    <input
                        name="bathsFull"
                        id="bathsFull"
                        type="number"
                        placeholder="Full baths"
                        defaultValue={createFormData.bathsFull}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="roomsTotal">Total rooms: </label>
                    <input
                        name="roomsTotal"
                        id="roomsTotal"
                        type="number"
                        placeholder="Total rooms"
                        defaultValue={createFormData.roomsTotal}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="livingArea">Living area (sq ft): </label>
                    <input
                        name="livingArea"
                        id="livingArea"
                        type="number"
                        placeholder="Living area (sq ft)"
                        defaultValue={createFormData.livingArea}
                        onChange={handleInputChange}
                    />
                <p className="table-title text-black-800">INTERIOR: COOLING/HEATING</p>
                    <label htmlFor="cooling">Cooling: </label>
                    <input
                        name="cooling"
                        id="cooling"
                        type="text"
                        placeholder="Cooling"
                        defaultValue={createFormData.cooling}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="heating">Heating: </label>
                    <input
                        name="heating"
                        id="heating"
                        type="text"
                        placeholder="Heating"
                        defaultValue={createFormData.heating}
                        onChange={handleInputChange}
                    />
                <p className="table-title text-black-800">APPLIANCES INCLUDED IN SALE</p>
                        <input
                        name="appliancesIncluded"
                        id="washer"
                        type="checkbox"
                        defaultValue="washer"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="washer">Washer</label>
                        <input
                        name="appliancesIncluded"
                        id="dryer"
                        type="checkbox"
                        defaultValue="dryer"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="dryer">Dryer</label>
                        <input
                        name="appliancesIncluded"
                        id="refrigerator"
                        type="checkbox"
                        defaultValue="refrigerator"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="refrigerator">Refrigerator</label>
                        <input
                        name="appliancesIncluded"
                        id="dishwasher"
                        type="checkbox"
                        defaultValue="dishwasher"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="dishwasher">Dishwasher</label>
                        <input
                        name="appliancesIncluded"
                        id="stove"
                        type="checkbox"
                        defaultValue="stove"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="stove">Stove/Oven</label>
                        <input
                        name="appliancesIncluded"
                        id="microwave"
                        type="checkbox"
                        defaultValue="microwave"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="microwave">Microwave</label>
                        <input
                        name="appliancesIncluded"
                        id="garbageDisposal"
                        type="checkbox"
                        defaultValue="garbageDisposal"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="garbageDisposal">Garbage Disposal</label>
                <p className="table-title text-black-800">FIXTURES</p>
                        <input
                        name="fixtures"
                        id="ceilingFans"
                        type="checkbox"
                        defaultValue="ceilingFans"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="ceilingFans">Ceiling Fans</label>
                        <input
                        name="fixtures"
                        id="potShelves"
                        type="checkbox"
                        defaultValue="potShelves"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="potShelves">Pot Shelves</label>
                        <input
                        name="fixtures"
                        id="chandeliers"
                        type="checkbox"
                        defaultValue="chandeliers"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="chandeliers">Chandeliers</label>
                <p className="table-title text-black-800">WINDOW FEATURES</p>
                        <input
                        name="window"
                        id="curtains"
                        type="checkbox"
                        defaultValue="curtains"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="curtains">Curtains</label>
                        <input
                        name="window"
                        id="blinds"
                        type="checkbox"
                        defaultValue="blinds"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="blinds">Blinds</label>
                        <input
                        name="window"
                        id="drapes"
                        type="checkbox"
                        defaultValue="drapes"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="drapes">Drapes</label>
                        <input
                        name="window"
                        id="plantationShutters"
                        type="checkbox"
                        defaultValue="plantationShutters"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="plantationShutters">Plantation Shutters</label>
                <p className="table-title text-black-800">OTHER</p>
                    <label htmlFor="fireplace">Fireplace: </label>
                    <input
                        name="fireplace"
                        id="fireplace"
                        type="text"
                        placeholder="Fireplace"
                        defaultValue={createFormData.fireplace}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="other">Other interior features: </label>
                    <input
                        name="other"
                        id="other"
                        type="text"
                        placeholder="Other features"
                        defaultValue={createFormData.other}
                        onChange={handleInputChange}
                    />
                <p className="table-title text-black-800">PARKING</p>
                    <label htmlFor="parkingType">Parking type: </label>
                    <input
                        name="parkingType"
                        id="parkingType"
                        type="text"
                        placeholder="Parking Type"
                        defaultValue={createFormData.parkingType}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="parkingSize">Parking size: </label>
                    <input
                        name="parkingSize"
                        id="parkingSize"
                        type="number"
                        placeholder="Parking Size"
                        defaultValue={createFormData.parkingSize}
                        onChange={handleInputChange}
                    />
                <p className="table-title text-black-800">UTILITIES</p>
                
                    <label htmlFor="sewer">Sewer: </label>
                    <input
                        name="sewer"
                        id="sewer"
                        type="text"
                        placeholder="Sewer"
                        defaultValue={createFormData.sewer}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="water">Water: </label>
                    <input
                        name="water"
                        id="water"
                        type="text"
                        placeholder="Water"
                        defaultValue={createFormData.water}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="otherUtilities">Other Utilities: </label>
                    <input
                        name="otherUtilities"
                        id="otherUtilities"
                        type="text"
                        placeholder="Other Utilities"
                        defaultValue={createFormData.otherUtilities}
                        onChange={handleInputChange}
                    />
                <p className="table-title text-black-800">HOA/COMMUNITY</p>
                    <label htmlFor="HOACount">How many HOAs? </label>
                    <input
                        name="HOACount"
                        id="HOACount"
                        type="number"
                        placeholder="HOA count"
                        defaultValue={createFormData.HOACount}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="HOAName">HOA name: </label>
                    <input
                        name="HOAName"
                        id="HOAName"
                        type="text"
                        placeholder="HOA Name"
                        defaultValue={createFormData.HOAName}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="HOAMonthlyFee">HOA monthly fee: </label>
                    <input
                        name="HOAMonthlyFee"
                        id="HOAMonthlyFee"
                        type="number"
                        placeholder="HOA Monthly Fee"
                        defaultValue={createFormData.HOAMonthlyFee}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="HOAPhone">HOA Phone Number: </label>
                    <input
                        name="HOAPhone"
                        id="HOAPhone"
                        type="text"
                        placeholder="HOA Phone number"
                        defaultValue={createFormData.HOAPhone}
                        onChange={handleInputChange}
                    />
                <p className="underline my-5">What does the HOA fee cover?</p>
                        <input
                        name="HOAFeeIncludes"
                        id="management"
                        type="checkbox"
                        defaultValue="management"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="management">Management</label>
                        <input
                        name="HOAFeeIncludes"
                        id="landscapeMaintenance"
                        type="checkbox"
                        defaultValue="landscapeMaintenance"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="landscapeMaintenance">Landscape Maintenance</label>
                        <input
                        name="HOAFeeIncludes"
                        id="recreationalFacilities"
                        type="checkbox"
                        defaultValue="recreationalFacilities"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="recreationalFacilities">Reacreational Facilities</label>
                        <input
                        name="HOAFeeIncludes"
                        id="gated"
                        type="checkbox"
                        defaultValue="gated"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="gated">Gated</label>
                        <input
                        name="HOAFeeIncludes"
                        id="HOAWater"
                        type="checkbox"
                        defaultValue="HOAWater"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="HOAWater">Water</label>
                        <input
                        name="HOAFeeIncludes"
                        id="HOASewer"
                        type="checkbox"
                        defaultValue="HOASewer"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="HOASewer">Sewer</label>
                        <input
                        name="HOAFeeIncludes"
                        id="HOATrash"
                        type="checkbox"
                        defaultValue="HOATrash"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="HOATrash">Trash</label>
                        <input
                        name="HOAFeeIncludes"
                        id="guardGated"
                        type="checkbox"
                        defaultValue="guardGated"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="guardGated">Guard Gated</label>
                <p className="underline my-5">Community amenities</p>
                        <input
                        name="communityAmenities"
                        id="communityPool"
                        type="checkbox"
                        defaultValue="communityPool"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="communityPool">Community Pool</label>
                        <input
                        name="communityAmenities"
                        id="communitySpa"
                        type="checkbox"
                        defaultValue="communitySpa"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="communitySpa">Community Spa</label>
                        <input
                        name="communityAmenities"
                        id="communityPark"
                        type="checkbox"
                        defaultValue="communityPark"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="communityPark">Community Park</label>
                        <input
                        name="communityAmenities"
                        id="fitnessCenter"
                        type="checkbox"
                        defaultValue="fitnessCenter"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="fitnessCenter"> Fitness Center</label>
                        <input
                        name="communityAmenities"
                        id="playgrounds"
                        type="checkbox"
                        defaultValue="playgrounds"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="playgrounds">Playgrounds</label>
                        <input
                        name="communityAmenities"
                        id="clubhouse"
                        type="checkbox"
                        defaultValue="clubhouse"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="clubhouse">Clubhouse</label>
                        <input
                        name="communityAmenities"
                        id="golfCourse"
                        type="checkbox"
                        defaultValue="golfCourse"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="golfCourse">Golf Course</label>
                        <input
                        name="communityAmenities"
                        id="basketballCourt"
                        type="checkbox"
                        defaultValue="basketballCourt"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="basketballCourt">Basketball Court</label>
                        <input
                        name="communityAmenities"
                        id="tennisCourt"
                        type="checkbox"
                        defaultValue="tennisCourt"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="tennisCourt">Tennis Court</label>
                        <input
                        name="communityAmenities"
                        id="joggingPath"
                        type="checkbox"
                        defaultValue="joggingPath"
                        onChange={handleInputChange}
                    />
                        <label htmlFor="joggingPath">Jogging Path</label>
                    <label htmlFor="isSeniorCommunity">Is this property in a senior community? </label>
                    <input
                        name="isSeniorCommunity"
                        id="isSeniorCommunity"
                        type="text"
                        placeholder="Y/N"
                        defaultValue={createFormData.isSeniorCommunity}
                        onChange={handleInputChange}
                    />
                <p className="table-title text-black-800">LAST SALE INFORMATION</p>
                    <label htmlFor="lastSoldDate">Last Sold Date: </label>
                    <input
                        name="lastSoldDate"
                        id="lastSoldDate"
                        type="date"
                        defaultValue={createFormData.lastSoldDate}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="lastSoldPrice">Last Sold Price: </label>
                    <input
                        name="lastSoldPrice"
                        id="lastSoldPrice"
                        type="number"
                        placeholder="Last Sold Price"
                        defaultValue={createFormData.lastSoldPrice}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="lastSoldPricPerSF">Last Sold Price Per SF: </label>
                    <input
                        name="lastSoldPricPerSF"
                        id="lastSoldPricPerSF"
                        type="number"
                        placeholder="Last Sold Price Per SF"
                        defaultValue={createFormData.lastSoldPricPerSF}
                        onChange={handleInputChange}
                    />
                <p className="table-title text-black-800">TAX INFORMATION</p>
                    <label htmlFor="annualTax">Annual Tax: </label>
                    <input
                        name="annualTax"
                        id="annualTax"
                        type="number"
                        placeholder="Annual Tax"
                        defaultValue={createFormData.annualTax}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="lastTaxYear">Last Tax Year: </label>
                    <input
                        name="lastTaxYear"
                        id="lastTaxYear"
                        type="number"
                        placeholder="Last Tax Year"
                        defaultValue={createFormData.lastTaxYear}
                        onChange={handleInputChange}
                    />
                    <button
                        type="submit"
                        className="text-white hover:bg-gray-800 font-bold py-2 px-4 bg-gray-700 rounded cursor-pointer mr-2 my-10">
                        Submit
                    </button>
                </form>
            }
            {listingElements}
        </div>
    )
}