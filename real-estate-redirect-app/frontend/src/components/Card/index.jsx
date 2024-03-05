import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import heartIcon from '../../assets/heart.svg'
import './styles.css'
import { updateListing, deleteListing, getUser } from "../../../utils/backend"

export default function Card({ listing, getFilteredData, updateDetails, loginStatus }) {
    const [homeownerToken, setHomeownerToken] = useState('')
    const [showEditForm, setShowEditForm] = useState(false)
    const [editFormData, setEditFormData] = useState({
        apn: listing.identifier.apn,
        address: listing.location.address,
        city: listing.location.city,
        state: listing.location.state,
        zip: listing.location.zip,
        subdivision: listing.location.subdivision,
        price: listing.currentActivity.price,
        pricePerSF: listing.currentActivity.pricePerSF,
        listDate: listing.currentActivity.listDate,
        status: listing.currentActivity.status,
        homeowner: listing.homeowner[0],
        propertyType: listing.generalInfo.propertyType,
        zoning: listing.generalInfo.zoning,
        stories: listing.generalInfo.stories,
        level: listing.generalInfo.level,
        yearBuilt: listing.generalInfo.yearBuilt,
        isDetached: listing.generalInfo.isDetached,
        houseFaces: listing.generalInfo.houseFaces,
        roof: listing.exterior.construction.roof,
        walls: listing.exterior.construction.walls,
        fencing: listing.exterior.construction.fencing,
        lotSize: listing.exterior.lot.size,
        lotFeatures: listing.exterior.lot.features,
        vegetation: listing.exterior.lot.vegetation,
        hasSolar: listing.exterior.hasSolar,
        hasBalcony: listing.exterior.hasBalcony,
        hasPool: listing.exterior.hasPool,
        hasSpa: listing.exterior.hasSpa,
        flooring: listing.interior.construction.flooring,
        bedrooms: listing.interior.rooms.bedrooms,
        bathrooms: listing.interior.rooms.bathrooms,
        bathsFull: listing.interior.rooms.bathsFull,
        roomsTotal: listing.interior.rooms.roomsTotal,
        livingArea: listing.interior.livingArea,
        cooling: listing.interior.cooling,
        heating: listing.interior.heating,
        appliancesIncluded: listing.interior.appliancesIncluded,
        fixtures: listing.interior.features.fixtures,
        window: listing.interior.features.window,
        fireplace: listing.interior.features.fireplace,
        other: listing.interior.features.other,
        parkingType: listing.parking.type,
        parkingSize: listing.parking.size,
        sewer: listing.utilities.sewer,
        water: listing.utilities.water,
        otherUtilities: listing.utilities.otherUtilities,
        HOACount: listing.HOA.length,
        HOAName: listing.HOA[0].name,
        HOAMonthlyFee: listing.HOA[0].monthlyFee,
        HOAPhone: listing.HOA[0].phone,
        HOAFeeIncludes: listing.HOA[0].feeIncludes,
        communityAmenities: listing.community.amenities,
        isSeniorCommunity: listing.community.isSeniorCommunity,
        lastSoldDate: listing.lastSoldInfo.soldDate,
        lastSoldPrice: listing.lastSoldInfo.price,
        lastSoldPricePerSF: listing.lastSoldInfo.pricePerSF,
        annualTax: listing.tax.annualTax,
        lastTaxYear: listing.tax.year,
    })

    async function getHomeownerData() {
        const ownerData = await getUser(listing.homeowner[0])
        setHomeownerToken(ownerData.token)
    }
    
    useEffect(() => {
        if (loginStatus) {
            getHomeownerData()
        }
    }, [])

    function handleInputChange(event) {
        setEditFormData({
            ...editFormData,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        setShowEditForm(false)
        updateListing(editFormData, listing._id)
            .then(() => getFilteredData("none", "none"))
    }

    function handleDelete() {
        if (confirm("Are you sure you would like to delete this listing?")) {
            deleteListing(listing._id)
                .then(() => getFilteredData("none", "none"))
        }
    }

    let listingBtns = ''
    if (loginStatus && localStorage.userToken === homeownerToken && localStorage.userCategory === 'seller') {
        listingBtns =
        <>
            <p className="text-xs text-center my-5">This is your listing. You may edit or delete.</p>
            <div className="flex justify-center">
                <button
                    onClick={() => { setShowEditForm(true) }}
                    className="text-white text-xs hover:bg-gray-700 font-bold py-2 px-4 bg-gray-600 rounded cursor-pointer mr-2">
                    Edit this Listing
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 px-4 rounded">
                    Delete this Listing
                </button>
            </div>
        </>
    }

    let editForm = ''
    if (showEditForm) {
        editForm =
        <form
            onSubmit={handleSubmit}
            className="bg-stone-400 rounded-lg p-10 my-4 border-gray-700 border-2 w-[100%]">
            <table className="w-[90%]">
                <tbody className="w-[90%]">
                    <tr className="border-solid border-white border-2 pr-20">
                        <td><label htmlFor="apn">Parcel number: </label></td>
                        <td><input
                            name="apn"
                            id="apn"
                            type="text"
                            defaultValue={listing.identifier.apn}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="address">Street address: </label></td>
                        <td><input
                            name="address"
                            id="address"
                            type="text"
                            defaultValue={listing.location.address}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="city">City: </label></td>
                        <td><input
                            name="city"
                            id="city"
                            type="text"
                            defaultValue={listing.location.city}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="state">State: </label></td>
                        <td><input
                            name="state"
                            id="state"
                            type="text"
                            disabled={true}
                            defaultValue={listing.location.state}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="zip">Zip code: </label></td>
                        <td><input
                            name="zip"
                            id="zip"
                            type="number"
                            defaultValue={listing.location.zip}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="subdivision">Subdivision: </label></td>
                        <td><input
                            name="subdivision"
                            id="subdivision"
                            type="text"
                            defaultValue={listing.location.subdivision}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="price">List price: $</label></td>
                        <td><input
                            name="price"
                            id="price"
                            type="number"
                            defaultValue={listing.currentActivity.price}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="pricePerSF">Price per square foot: </label></td>
                        <td><input
                            name="pricePerSF"
                            type="number"
                            defaultValue={listing.currentActivity.pricePerSF}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="listDate">List Date: </label></td>
                        <td><input
                            name="listDate"
                            id="listDate"
                            type="date"
                            defaultValue={listing.currentActivity.listDate}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="status">Status: </label></td>
                        <td><input
                            name="status"
                            type="text"
                            defaultValue={listing.currentActivity.status}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="homeowner">Homeowner ID: </label></td>
                        <td><input
                            name="homeowner"
                            id="homeowner"
                            disabled={true}
                            type="text"
                            defaultValue={listing.homeowner[0]}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="propertyType">Property Type: </label></td>
                        <td><input
                            name="propertyType"
                            id="propertyType"
                            type="text"
                            defaultValue={listing.generalInfo.propertyType}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="zoning">Zoning: </label></td>
                        <td><input
                            name="zoning"
                            type="text"
                            defaultValue={listing.generalInfo.zoning}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="stories">Stories: </label></td>
                        <td><input
                            name="stories"
                            id="stories"
                            type="number"
                            defaultValue={listing.generalInfo.stories}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="level">This property is located on level: </label></td>
                        <td><input
                            name="level"
                            id="level"
                            type="number"
                            defaultValue={listing.generalInfo.level}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="yearBuilt">Year Built: </label></td>
                        <td><input
                            name="yearBuilt"
                            id="yearBuilt"
                            type="number"
                            defaultValue={listing.generalInfo.yearBuilt}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="isDetached">Is this property detached? </label></td>
                        <td><input
                            name="isDetached"
                            id="isDetached"
                            type="text"
                            defaultValue={listing.generalInfo.isDetached}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="houseFaces">Which direction does the house face? </label></td>
                        <td><input
                            name="houseFaces"
                            id="houseFaces"
                            type="text"
                            defaultValue={listing.generalInfo.houseFaces}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="roof">Roof materials: </label></td>
                        <td><input
                            name="roof"
                            id="roof"
                            type="text"
                            defaultValue={listing.exterior.construction.roof}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="walls">Wall materials: </label></td>
                        <td><input
                            name="walls"
                            id="walls"
                            type="text"
                            defaultValue={listing.exterior.construction.walls}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="fencing">Fencing materials: </label></td>
                        <td><input
                            name="fencing"
                            id="fencing"
                            type="text"
                            defaultValue={listing.exterior.construction.fencing}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="lotSize">Lot size (sq ft): </label></td>
                        <td><input
                            name="lotSize"
                            id="lotSize"
                            type="number"
                            defaultValue={listing.exterior.lot.size}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr><td><p>Lot features:</p></td></tr>
                    <tr>
                        <td>
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
                        </td>
                    </tr>
                    <tr><td><p>Vegetation:</p></td></tr>
                    <tr>
                        <td>
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
                        </td>
                    </tr>
                    <tr>
                        <td><label htmlFor="hasSolar">Does this property have solar panels? </label></td>
                        <td><input
                            name="hasSolar"
                            id="hasSolar"
                            type="text"
                            defaultValue={listing.exterior.hasSolar}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="hasBalcony">Does this property have a balcony? </label></td>
                        <td><input
                            name="hasBalcony"
                            id="hasBalcony"
                            type="text"
                            defaultValue={listing.exterior.hasBalcony}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="hasPool">Does this property have a pool? </label></td>
                        <td><input
                            name="hasPool"
                            id="hasPool"
                            type="text"
                            defaultValue={listing.exterior.hasPool}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="isDetached">Does this property have a spa? </label></td>
                        <td><input
                            name="hasSpa"
                            id="hasSpa"
                            type="text"
                            defaultValue={listing.exterior.hasSpa}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr><td><p>Flooring:</p></td></tr>
                    <tr>
                        <td>
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
                        </td>
                    </tr>
                    <tr>
                        <td><label htmlFor="bedrooms">Bedrooms: </label></td>
                        <td><input
                            name="bedrooms"
                            id="bedrooms"
                            type="number"
                            defaultValue={listing.interior.rooms.bedrooms}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="bathrooms">Bathrooms: </label></td>
                        <td><input
                            name="bathrooms"
                            id="bathrooms"
                            type="number"
                            defaultValue={listing.interior.rooms.bathrooms}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="bathsFull">Full baths: </label></td>
                        <td><input
                            name="bathsFull"
                            id="bathsFull"
                            type="number"
                            defaultValue={listing.interior.rooms.bathsFull}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="roomsTotal">Total rooms: </label></td>
                        <td><input
                            name="roomsTotal"
                            id="roomsTotal"
                            type="number"
                            defaultValue={listing.interior.rooms.roomsTotal}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="livingArea">Living area (sq ft): </label></td>
                        <td><input
                            name="livingArea"
                            id="livingArea"
                            type="number"
                            defaultValue={listing.interior.livingArea}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="cooling">Cooling: </label></td>
                        <td><input
                            name="cooling"
                            id="cooling"
                            type="text"
                            defaultValue={listing.interior.cooling}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="heating">Heating: </label></td>
                        <td><input
                            name="heating"
                            id="heating"
                            type="text"
                            defaultValue={listing.interior.heating}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr><td><p>Appliances to be included in sale:</p></td></tr>
                    <tr>
                        <td>
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
                        </td>
                    </tr>
                    <tr><td><p>Fixtures:</p></td></tr>
                    <tr>
                        <td>
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
                        </td>
                    </tr>
                    <tr><td><p>Window features:</p></td></tr>
                    <tr>
                        <td>
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
                        </td>
                    </tr>
                    <tr>
                        <td><label htmlFor="fireplace">Fireplace: </label></td>
                        <td><input
                            name="fireplace"
                            id="fireplace"
                            type="text"
                            defaultValue={listing.interior.features.fireplace}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="other">Other interior features: </label></td>
                        <td><input
                            name="other"
                            id="other"
                            type="text"
                            placeholder="Other features"
                            defaultValue={listing.interior.features.other}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="parkingType">Parking type: </label></td>
                        <td><input
                            name="parkingType"
                            id="parkingType"
                            type="text"
                            defaultValue={listing.parking.type}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="parkingSize">Parking size: </label></td>
                        <td><input
                            name="parkingSize"
                            id="parkingSize"
                            type="number"
                            defaultValue={listing.parking.size}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="sewer">Sewer: </label></td>
                        <td><input
                            name="sewer"
                            id="sewer"
                            type="text"
                            defaultValue={listing.utilities.sewer}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="water">Water: </label></td>
                        <td><input
                            name="water"
                            id="water"
                            type="text"
                            defaultValue={listing.utilities.water}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="otherUtilities">Other Utilities: </label></td>
                        <td><input
                            name="otherUtilities"
                            id="otherUtilities"
                            type="text"
                            defaultValue={listing.utilities.otherUtilities}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="HOACount">How many HOAs? </label></td>
                        <td><input
                            name="HOACount"
                            id="HOACount"
                            type="number"
                            defaultValue={listing.HOA.length}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="HOAName">HOA name: </label></td>
                        <td><input
                            name="HOAName"
                            id="HOAName"
                            type="text"                            defaultValue={listing.HOA[0].name}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="HOAMonthlyFee">HOA monthly fee: </label></td>
                        <td><input
                            name="HOAMonthlyFee"
                            id="HOAMonthlyFee"
                            type="number"
                            defaultValue={listing.HOA[0].monthlyFee}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="HOAPhone">HOA Phone Number: </label></td>
                        <td><input
                            name="HOAPhone"
                            id="HOAPhone"
                            type="text"
                            defaultValue={listing.HOA[0].phone}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr><td><p>What does the HOA fee cover?</p></td></tr>
                    <tr>
                        <td>
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
                        </td>
                    </tr>
                    <tr><td><p>Community amenities:</p></td></tr>
                    <tr>
                        <td>
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
                        </td>
                    </tr>
                    <tr>
                        <td><label htmlFor="isSeniorCommunity">Is this property in a senior community? </label></td>
                        <td><input
                            name="isSeniorCommunity"
                            id="isSeniorCommunity"
                            type="text"
                            defaultValue={listing.community.isSeniorCommunity}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="lastSoldDate">Last Sold Date: </label></td>
                        <td><input
                            name="lastSoldDate"
                            id="lastSoldDate"
                            type="date"
                            defaultValue={listing.lastSoldInfo.soldDate}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="lastSoldPrice">Last Sold Price: </label></td>
                        <td><input
                            name="lastSoldPrice"
                            id="lastSoldPrice"
                            type="number"
                            defaultValue={listing.lastSoldInfo.price}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="lastSoldPricPerSF">Last Sold Price Per SF: </label></td>
                        <td><input
                            name="lastSoldPricPerSF"
                            id="lastSoldPricPerSF"
                            type="number"
                            defaultValue={listing.lastSoldInfo.pricePerSF}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="annualTax">Annual Tax: </label></td>
                        <td><input
                            name="annualTax"
                            id="annualTax"
                            type="number"
                            defaultValue={listing.tax.annualTax}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="lastTaxYear">Last Tax Year: </label></td>
                        <td><input
                            name="lastTaxYear"
                            id="lastTaxYear"
                            type="number"
                            placeholder="Last Tax Year"
                            defaultValue={listing.tax.year}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                </tbody>
            </table>
            <div className="flex justify-center mt-5">
                <button
                    onClick={() => { setShowEditForm(false) }}
                    className="text-white text-xs hover:bg-gray-700 font-bold py-2 px-4 bg-gray-600 rounded cursor-pointer mr-2">
                    Close
                </button>
                <button
                    type="submit"
                    className="text-white text-xs hover:bg-gray-700 font-bold py-2 px-4 bg-gray-600 rounded cursor-pointer mr-2">
                    Submit
                </button>
            </div>
        </form>
    }

    let statusColor = ""
    switch(listing.currentActivity.status) {
        case "active":
            statusColor = "green-600"
            break;
        case "under contract":
            statusColor = "yellow-400"
            break;
        case "sold":
            statusColor = "sky-500"
            break;
        case "expired":
            statusColor = "red-600"
            break;
        case "withdrawn":
            statusColor = "stone-200"
            break;
    }

    return (
        <figure className="relative mb-4 text-stone-400 break-inside-avoid-column border-2 border-stone-400 rounded-xl bg-stone-800 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <img src="/src/assets/placeholder.jpeg" className="card-image rounded-t-xl min-h-[200px] min-w-full object-cover"/> 
                     
            <figcaption className="py-2 px-2">
                <h1 className="p-2 text-center">{listing.location.address}</h1>
                <h1 className="p-2 text-center">{listing.location.city}, {listing.location.state} {listing.location.zip}</h1>
                <h1 className="p-2 text-center">${listing.currentActivity.price.toLocaleString()}</h1>
                <div className="p-2 flex justify-center items-center">
                    <p className={`border-2 border-white px-1 rounded-3xl w-4 h-4 bg-${statusColor}`}></p>
                    <p className="px-1">{listing.currentActivity.status.toUpperCase()}</p>
                </div>
                <div className="flex justify-between items-center">
                    <img src={heartIcon} className="cursor-pointer my-5 mx-5 hover:transform hover:scale-150 transition-all duration-200 ease-in-out"/>
                    <Link to={"/details/" + listing._id} onClick={() => updateDetails(listing)}>
                        <p className="border-white border-2 text-center w-40 rounded-xl bg-sky-800 text-slate-800 text-l mx-5" id='hover-msg'>See Details</p>
                    </Link>
                </div>
                {listingBtns}
                {editForm}
            </figcaption>
        </figure>
    )
}