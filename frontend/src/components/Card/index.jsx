import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import heartIcon from '../../assets/heart.svg'
import placeholder from '../../assets/placeholder.png'
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
            className="listing-edit-form bg-stone-400 rounded-lg p-5 my-4 border-gray-700 border-2 w-[100%]">
            <label htmlFor="apn">Parcel number: </label><br/>
            <input
                name="apn"
                id="apn"
                type="text"
                defaultValue={listing.identifier.apn}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="address">Street address: </label><br/>
            <input
                name="address"
                id="address"
                type="text"
                defaultValue={listing.location.address}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="city">City: </label><br/>
            <input
                name="city"
                id="city"
                type="text"
                defaultValue={listing.location.city}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="state">State: </label><br/>
            <input
                name="state"
                id="state"
                type="text"
                disabled={true}
                defaultValue={listing.location.state}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="zip">Zip code: </label><br/>
            <input
                name="zip"
                id="zip"
                type="number"
                defaultValue={listing.location.zip}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="subdivision">Subdivision: </label><br/>
            <input
                name="subdivision"
                id="subdivision"
                type="text"
                defaultValue={listing.location.subdivision}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="price">List price: $</label><br/>
            <input
                name="price"
                id="price"
                type="number"
                defaultValue={listing.currentActivity.price}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="pricePerSF">Price per square foot: </label><br/>
            <input
                name="pricePerSF"
                type="number"
                defaultValue={listing.currentActivity.pricePerSF}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="listDate">List Date: </label><br/>
            <input
                name="listDate"
                id="listDate"
                type="date"
                defaultValue={listing.currentActivity.listDate}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="status">Status: </label><br/>
            <input
                name="status"
                type="text"
                defaultValue={listing.currentActivity.status}
                onChange={handleInputChange}
            /><br/>
            <input
                name="homeowner"
                id="homeowner"
                disabled={true}
                hidden={true}
                type="text"
                defaultValue={listing.homeowner[0]}
            /><br/>
            <label htmlFor="propertyType">Property Type: </label><br/>
            <input
                name="propertyType"
                id="propertyType"
                type="text"
                defaultValue={listing.generalInfo.propertyType}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="zoning">Zoning: </label><br/>
            <input
                name="zoning"
                type="text"
                defaultValue={listing.generalInfo.zoning}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="stories">Stories: </label><br/>
            <input
                name="stories"
                id="stories"
                type="number"
                defaultValue={listing.generalInfo.stories}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="level">This property is located on level: </label><br/>
            <input
                name="level"
                id="level"
                type="number"
                defaultValue={listing.generalInfo.level}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="yearBuilt">Year Built: </label><br/>
            <input
                name="yearBuilt"
                id="yearBuilt"
                type="number"
                defaultValue={listing.generalInfo.yearBuilt}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="isDetached">Is this property detached? </label><br/>
            <input
                name="isDetached"
                id="isDetached"
                type="text"
                defaultValue={listing.generalInfo.isDetached}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="houseFaces">Which direction does the house face? </label><br/>
            <input
                name="houseFaces"
                id="houseFaces"
                type="text"
                defaultValue={listing.generalInfo.houseFaces}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="roof">Roof materials: </label><br/>
            <input
                name="roof"
                id="roof"
                type="text"
                defaultValue={listing.exterior.construction.roof}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="walls">Wall materials: </label><br/>
            <input
                name="walls"
                id="walls"
                type="text"
                defaultValue={listing.exterior.construction.walls}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="fencing">Fencing materials: </label><br/>
            <input
                name="fencing"
                id="fencing"
                type="text"
                defaultValue={listing.exterior.construction.fencing}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="lotSize">Lot size (sq ft): </label><br/>
            <input
                name="lotSize"
                id="lotSize"
                type="number"
                defaultValue={listing.exterior.lot.size}
                onChange={handleInputChange}
            /><br/>
            <p className="!text-black py-3 text-center">Lot features:</p>
            <input
                name="lotFeatures"
                id="desertLandscaping"
                type="checkbox"
                defaultValue="desertLandscaping"
                onChange={handleInputChange}
                />
            <label htmlFor="desertLandscaping">Desert Landscaping</label><br/>
            <input
                name="lotFeatures"
                id="rockGravelLandscaping"
                type="checkbox"
                defaultValue="rockGravelLandscaping"
                onChange={handleInputChange}
            />
            <label htmlFor="rockGravelLandscaping">Rock/Gravel Landscaping</label><br/>
            <input
                name="lotFeatures"
                id="rearLawn"
                type="checkbox"
                defaultValue="rearLawn"
                onChange={handleInputChange}
            />
            <label htmlFor="rearLawn">Rear Lawn</label><br/>
            <input
                name="lotFeatures"
                id="shed"
                type="checkbox"
                defaultValue="shed"
                onChange={handleInputChange}
            />
            <label htmlFor="shed">Shed</label><br/>
            <input
                name="lotFeatures"
                id="rvHookup"
                type="checkbox"
                defaultValue="rvHookup"
                onChange={handleInputChange}
            />
            <label htmlFor="rvHookup">RV Hookup</label><br/>
            <input
                name="lotFeatures"
                id="patio"
                type="checkbox"
                defaultValue="patio"
                onChange={handleInputChange}
            />
            <label htmlFor="patio">Patio</label><br/>
            <input
                name="lotFeatures"
                id="syntheticGrass"
                type="checkbox"
                defaultValue="syntheticGrass"
                onChange={handleInputChange}
            />
            <label htmlFor="syntheticGrass">Synthetic Grass</label><br/>
            <input
                name="lotFeatures"
                id="matureLandscaping"
                type="checkbox"
                defaultValue="matureLandscaping"
                onChange={handleInputChange}
            />
            <label htmlFor="matureLandscaping">Mature Landscaping</label><br/>
            <input
                name="lotFeatures"
                id="grass"
                type="checkbox"
                defaultValue="grass"
                onChange={handleInputChange}
            />
            <label htmlFor="grass">Grass</label><br/>
            <input
                name="lotFeatures"
                id="coveredPatio"
                type="checkbox"
                defaultValue="coveredPatio"
                onChange={handleInputChange}
            />
            <label htmlFor="desertLandscaping">Covered Patio</label><br/>
            <input
                name="lotFeatures"
                id="paved"
                type="checkbox"
                defaultValue="paved"
                onChange={handleInputChange}
            />
            <label htmlFor="paved">Paved</label><br/>
            <p className="!text-black py-3 text-center">Vegetation:</p>
            <input
                name="vegetation"
                id="shrubs"
                type="checkbox"
                defaultValue="shrubs"
                onChange={handleInputChange}
            />
            <label htmlFor="shrubs">Shrubs</label><br/>
            <input
                name="vegetation"
                id="fountain"
                type="checkbox"
                defaultValue="fountain"
                onChange={handleInputChange}
            />
            <label htmlFor="fountain">Fountain</label><br/>
            <input
                name="vegetation"
                id="trees"
                type="checkbox"
                defaultValue="trees"
                onChange={handleInputChange}
            />
            <label htmlFor="trees">Trees</label><br/>
            <input
                name="vegetation"
                id="grass"
                type="checkbox"
                defaultValue="grass"
                onChange={handleInputChange}
            />
            <label htmlFor="grass">Grass</label><br/>
            <input
                name="vegetation"
                id="brush"
                type="checkbox"
                defaultValue="brush"
                onChange={handleInputChange}
            />
            <label htmlFor="brush">Brush</label><br/>
            <input
                name="vegetation"
                id="bushes"
                type="checkbox"
                defaultValue="bushes"
                onChange={handleInputChange}
            />
            <label htmlFor="bushes">Bushes</label><br/>
            <label htmlFor="hasSolar">Does this property have solar panels? </label><br/>
            <input
                name="hasSolar"
                id="hasSolar"
                type="text"
                defaultValue={listing.exterior.hasSolar}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="hasBalcony">Does this property have a balcony? </label><br/>
            <input
                name="hasBalcony"
                id="hasBalcony"
                type="text"
                defaultValue={listing.exterior.hasBalcony}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="hasPool">Does this property have a pool? </label><br/>
            <input
                name="hasPool"
                id="hasPool"
                type="text"
                defaultValue={listing.exterior.hasPool}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="isDetached">Does this property have a spa? </label><br/>
            <input
                name="hasSpa"
                id="hasSpa"
                type="text"
                defaultValue={listing.exterior.hasSpa}
                onChange={handleInputChange}
            /><br/>
            <p className="!text-black py-3 text-center">Flooring:</p>
            <input
                name="flooring"
                id="tile"
                type="checkbox"
                defaultValue="tile"
                onChange={handleInputChange}
            />
            <label htmlFor="tile">Tile</label><br/>
            <input
                name="flooring"
                id="vinyl"
                type="checkbox"
                defaultValue="vinyl"
                onChange={handleInputChange}
            />
            <label htmlFor="vinyl">Vinyl</label><br/>
            <input
                name="flooring"
                id="hardwood"
                type="checkbox"
                defaultValue="hardwood"
                onChange={handleInputChange}
            />
            <label htmlFor="hardwood">Hardwood</label><br/>
            <input
                name="flooring"
                id="laminate"
                type="checkbox"
                defaultValue="laminate"
                onChange={handleInputChange}
            />
            <label htmlFor="laminate">Laminate</label><br/>
            <input
                name="flooring"
                id="marble"
                type="checkbox"
                defaultValue="marble"
                onChange={handleInputChange}
            />
            <label htmlFor="marble">Marble</label><br/>
            <input
                name="flooring"
                id="concrete"
                type="checkbox"
                defaultValue="concrete"
                onChange={handleInputChange}
            />
            <label htmlFor="concrete">Concrete</label><br/>
            <input
                name="flooring"
                id="stone"
                type="checkbox"
                defaultValue="stone"
                onChange={handleInputChange}
            />
            <label htmlFor="stone">Stone</label><br/>
            <input
                name="flooring"
                id="linoleum"
                type="checkbox"
                defaultValue="linoleum"
                onChange={handleInputChange}
            />
            <label htmlFor="linoleum">Linoleum</label><br/>
            <input
                name="flooring"
                id="carpet"
                type="checkbox"
                defaultValue="carpet"
                onChange={handleInputChange}
            />
            <label htmlFor="carpet">Carpet</label><br/>
            <label htmlFor="bedrooms">Bedrooms: </label><br/>
            <input
                name="bedrooms"
                id="bedrooms"
                type="number"
                defaultValue={listing.interior.rooms.bedrooms}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="bathrooms">Bathrooms: </label><br/>
            <input
                name="bathrooms"
                id="bathrooms"
                type="number"
                defaultValue={listing.interior.rooms.bathrooms}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="bathsFull">Full baths: </label><br/>
            <input
                name="bathsFull"
                id="bathsFull"
                type="number"
                defaultValue={listing.interior.rooms.bathsFull}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="roomsTotal">Total rooms: </label><br/>
            <input
                name="roomsTotal"
                id="roomsTotal"
                type="number"
                defaultValue={listing.interior.rooms.roomsTotal}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="livingArea">Living area (sq ft): </label><br/>
            <input
                name="livingArea"
                id="livingArea"
                type="number"
                defaultValue={listing.interior.livingArea}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="cooling">Cooling: </label><br/>
            <input
                name="cooling"
                id="cooling"
                type="text"
                defaultValue={listing.interior.cooling}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="heating">Heating: </label><br/>
            <input
                name="heating"
                id="heating"
                type="text"
                defaultValue={listing.interior.heating}
                onChange={handleInputChange}
            /><br/>
            <p className="!text-black py-3 text-center">Appliances to be included in sale:</p>
            <input
                name="appliancesIncluded"
                id="washer"
                type="checkbox"
                defaultValue="washer"
                onChange={handleInputChange}
            />
            <label htmlFor="washer">Washer</label><br/>
            <input
                name="appliancesIncluded"
                id="dryer"
                type="checkbox"
                defaultValue="dryer"
                onChange={handleInputChange}
            />
            <label htmlFor="dryer">Dryer</label><br/>
            <input
                name="appliancesIncluded"
                id="refrigerator"
                type="checkbox"
                defaultValue="refrigerator"
                onChange={handleInputChange}
            />
            <label htmlFor="refrigerator">Refrigerator</label><br/>
            <input
                name="appliancesIncluded"
                id="dishwasher"
                type="checkbox"
                defaultValue="dishwasher"
                onChange={handleInputChange}
            />
            <label htmlFor="dishwasher">Dishwasher</label><br/>
            <input
                name="appliancesIncluded"
                id="stove"
                type="checkbox"
                defaultValue="stove"
                onChange={handleInputChange}
            />
            <label htmlFor="stove">Stove/Oven</label><br/>
            <input
                name="appliancesIncluded"
                id="microwave"
                type="checkbox"
                defaultValue="microwave"
                onChange={handleInputChange}
            />
            <label htmlFor="microwave">Microwave</label><br/>
            <input
                name="appliancesIncluded"
                id="garbageDisposal"
                type="checkbox"
                defaultValue="garbageDisposal"
                onChange={handleInputChange}
            />
            <label htmlFor="garbageDisposal">Garbage Disposal</label><br/>
            <p className="!text-black text-center py-3">Fixtures:</p>
            <input
                name="fixtures"
                id="ceilingFans"
                type="checkbox"
                defaultValue="ceilingFans"
                onChange={handleInputChange}
            />
            <label htmlFor="ceilingFans">Ceiling Fans</label><br/>
            <input
                name="fixtures"
                id="potShelves"
                type="checkbox"
                defaultValue="potShelves"
                onChange={handleInputChange}
            />
            <label htmlFor="potShelves">Pot Shelves</label><br/>
            <input
                name="fixtures"
                id="chandeliers"
                type="checkbox"
                defaultValue="chandeliers"
                onChange={handleInputChange}
            />
            <label htmlFor="chandeliers">Chandeliers</label><br/>
            <p className="!text-black text-center py-3">Window features:</p>
            <input
                name="window"
                id="curtains"
                type="checkbox"
                defaultValue="curtains"
                onChange={handleInputChange}
            />
            <label htmlFor="curtains">Curtains</label><br/>
            <input
                name="window"
                id="blinds"
                type="checkbox"
                defaultValue="blinds"
                onChange={handleInputChange}
            />
            <label htmlFor="blinds">Blinds</label><br/>
            <input
                name="window"
                id="drapes"
                type="checkbox"
                defaultValue="drapes"
                onChange={handleInputChange}
            />
            <label htmlFor="drapes">Drapes</label><br/>
            <input
                name="window"
                id="plantationShutters"
                type="checkbox"
                defaultValue="plantationShutters"
                onChange={handleInputChange}
            />
            <label htmlFor="plantationShutters">Plantation Shutters</label><br/>
            <label htmlFor="fireplace">Fireplace: </label><br/>
            <input
                name="fireplace"
                id="fireplace"
                type="text"
                defaultValue={listing.interior.features.fireplace}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="other">Other interior features: </label><br/>
            <input
                name="other"
                id="other"
                type="text"
                placeholder="Other features"
                defaultValue={listing.interior.features.other}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="parkingType">Parking type: </label><br/>
            <input
                name="parkingType"
                id="parkingType"
                type="text"
                defaultValue={listing.parking.type}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="parkingSize">Parking size: </label><br/>
            <input
                name="parkingSize"
                id="parkingSize"
                type="number"
                defaultValue={listing.parking.size}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="sewer">Sewer: </label><br/>
            <input
                name="sewer"
                id="sewer"
                type="text"
                defaultValue={listing.utilities.sewer}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="water">Water: </label><br/>
            <input
                name="water"
                id="water"
                type="text"
                defaultValue={listing.utilities.water}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="otherUtilities">Other Utilities: </label><br/>
            <input
                name="otherUtilities"
                id="otherUtilities"
                type="text"
                defaultValue={listing.utilities.otherUtilities}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="HOACount">How many HOAs? </label><br/>
            <input
                name="HOACount"
                id="HOACount"
                type="number"
                defaultValue={listing.HOA.length}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="HOAName">HOA name: </label><br/>
            <input
                name="HOAName"
                id="HOAName"
                type="text"                            
                defaultValue={listing.HOA[0].name}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="HOAMonthlyFee">HOA monthly fee: </label><br/>
            <input
                name="HOAMonthlyFee"
                id="HOAMonthlyFee"
                type="number"
                defaultValue={listing.HOA[0].monthlyFee}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="HOAPhone">HOA Phone Number: </label><br/>
            <input
                name="HOAPhone"
                id="HOAPhone"
                type="text"
                defaultValue={listing.HOA[0].phone}
                onChange={handleInputChange}
            /><br/>
            <p className="!text-black text-center py-3">What does the HOA fee cover?</p>
            <input
                name="HOAFeeIncludes"
                id="management"
                type="checkbox"
                defaultValue="management"
                onChange={handleInputChange}
            />
            <label htmlFor="management">Management</label><br/>
            <input
                name="HOAFeeIncludes"
                id="landscapeMaintenance"
                type="checkbox"
                defaultValue="landscapeMaintenance"
                onChange={handleInputChange}
            />
            <label htmlFor="landscapeMaintenance">Landscape Maintenance</label><br/>
            <input
                name="HOAFeeIncludes"
                id="recreationalFacilities"
                type="checkbox"
                defaultValue="recreationalFacilities"
                onChange={handleInputChange}
            />
            <label htmlFor="recreationalFacilities">Reacreational Facilities</label><br/>
            <input
                name="HOAFeeIncludes"
                id="gated"
                type="checkbox"
                defaultValue="gated"
                onChange={handleInputChange}
            />
            <label htmlFor="gated">Gated</label><br/>
            <input
                name="HOAFeeIncludes"
                id="HOAWater"
                type="checkbox"
                defaultValue="HOAWater"
                onChange={handleInputChange}
            />
            <label htmlFor="HOAWater">Water</label><br/>
            <input
                name="HOAFeeIncludes"
                id="HOASewer"
                type="checkbox"
                defaultValue="HOASewer"
                onChange={handleInputChange}
            />
            <label htmlFor="HOASewer">Sewer</label><br/>
            <input
                name="HOAFeeIncludes"
                id="HOATrash"
                type="checkbox"
                defaultValue="HOATrash"
                onChange={handleInputChange}
            />
            <label htmlFor="HOATrash">Trash</label><br/>
            <input
                name="HOAFeeIncludes"
                id="guardGated"
                type="checkbox"
                defaultValue="guardGated"
                onChange={handleInputChange}
            />
            <label htmlFor="guardGated">Guard Gated</label><br/>
            <p className="!text-black text-center py-3">Community amenities:</p>
            <input
                name="communityAmenities"
                id="communityPool"
                type="checkbox"
                defaultValue="communityPool"
                onChange={handleInputChange}
            />
            <label htmlFor="communityPool">Community Pool</label><br/>
            <input
                name="communityAmenities"
                id="communitySpa"
                type="checkbox"
                defaultValue="communitySpa"
                onChange={handleInputChange}
            />
            <label htmlFor="communitySpa">Community Spa</label><br/>
            <input
                name="communityAmenities"
                id="communityPark"
                type="checkbox"
                defaultValue="communityPark"
                onChange={handleInputChange}
            />
            <label htmlFor="communityPark">Community Park</label><br/>
            <input
                name="communityAmenities"
                id="fitnessCenter"
                type="checkbox"
                defaultValue="fitnessCenter"
                onChange={handleInputChange}
            />
            <label htmlFor="fitnessCenter"> Fitness Center</label><br/>
            <input
                name="communityAmenities"
                id="playgrounds"
                type="checkbox"
                defaultValue="playgrounds"
                onChange={handleInputChange}
            />
            <label htmlFor="playgrounds">Playgrounds</label><br/>
            <input
                name="communityAmenities"
                id="clubhouse"
                type="checkbox"
                defaultValue="clubhouse"
                onChange={handleInputChange}
            />
            <label htmlFor="clubhouse">Clubhouse</label><br/>
            <input
                name="communityAmenities"
                id="golfCourse"
                type="checkbox"
                defaultValue="golfCourse"
                onChange={handleInputChange}
            />
            <label htmlFor="golfCourse">Golf Course</label><br/>
            <input
                name="communityAmenities"
                id="basketballCourt"
                type="checkbox"
                defaultValue="basketballCourt"
                onChange={handleInputChange}
            />
            <label htmlFor="basketballCourt">Basketball Court</label><br/>
            <input
                name="communityAmenities"
                id="tennisCourt"
                type="checkbox"
                defaultValue="tennisCourt"
                onChange={handleInputChange}
            />
            <label htmlFor="tennisCourt">Tennis Court</label><br/>
            <input
                name="communityAmenities"
                id="joggingPath"
                type="checkbox"
                defaultValue="joggingPath"
                onChange={handleInputChange}
            />
            <label htmlFor="joggingPath">Jogging Path</label><br/>
            <br/>
            <label htmlFor="isSeniorCommunity" className="text-black">Is this property in a senior community? </label><br/>
            <input
                name="isSeniorCommunity"
                id="isSeniorCommunity"
                type="text"
                defaultValue={listing.community.isSeniorCommunity}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="lastSoldDate">Last Sold Date: </label>
            <input
                name="lastSoldDate"
                id="lastSoldDate"
                type="date"
                defaultValue={listing.lastSoldInfo.soldDate}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="lastSoldPrice">Last Sold Price: </label><br/>
            <input
                name="lastSoldPrice"
                id="lastSoldPrice"
                type="number"
                defaultValue={listing.lastSoldInfo.price}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="lastSoldPricPerSF">Last Sold Price Per SF: </label><br/>
            <input
                name="lastSoldPricPerSF"
                id="lastSoldPricPerSF"
                type="number"
                defaultValue={listing.lastSoldInfo.pricePerSF}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="annualTax">Annual Tax: </label><br/>
            <input
                name="annualTax"
                id="annualTax"
                type="number"
                defaultValue={listing.tax.annualTax}
                onChange={handleInputChange}
            /><br/>
            <label htmlFor="lastTaxYear">Last Tax Year: </label><br/>
            <input
                name="lastTaxYear"
                id="lastTaxYear"
                type="number"
                placeholder="Last Tax Year"
                defaultValue={listing.tax.year}
                onChange={handleInputChange}
            /><br/>
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
            statusColor = <p className="rounded-3xl w-4 h-4 bg-green-600"></p>
            break;
        case "under contract":
            statusColor = <p className="rounded-3xl w-4 h-4 bg-yellow-400"></p>
            break;
        case "sold":
            statusColor = <p className="rounded-3xl w-4 h-4 bg-sky-500"></p>
            break;
        case "expired":
            statusColor = <p className="rounded-3xl w-4 h-4 bg-red-600"></p>
            break;
        case "withdrawn":
            statusColor = <p className="rounded-3xl w-4 h-4 bg-stone-200"></p>
            break;
    }

    return (
        <figure className=" mb-4 text-stone-400 break-inside-avoid-column border-2 border-stone-400 rounded-xl bg-stone-800 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <img src={placeholder} className="card-image rounded-t-xl min-h-[200px] min-w-full object-cover"/> 
                     
            <figcaption className="py-2 px-2">
                <h1 className="p-2 text-center">{listing.location.address}</h1>
                <h1 className="p-2 text-center">{listing.location.city}, {listing.location.state} {listing.location.zip}</h1>
                <h1 className="p-2 text-center">${listing.currentActivity.price.toLocaleString()}</h1>
                <div className="p-2 flex justify-center items-center">
                    {statusColor}
                    <p className="px-1">{listing.currentActivity.status.toUpperCase()}</p>
                </div>
                <div className="flex justify-between items-center">
                    <img src={heartIcon} className="cursor-pointer my-5 mx-5 hover:transform hover:scale-150 transition-all duration-200 ease-in-out"/>
                    <Link to={"/details/" + listing._id} onClick={() => updateDetails(listing)}>
                        <p className="border-white border-2 text-center w-40 rounded-xl bg-sky-800 text-slate-800 text-l mx-5 hover:bg-sky-600">See Details</p>
                    </Link>
                </div>
                {listingBtns}
                {editForm}
            </figcaption>
        </figure>
    )
}