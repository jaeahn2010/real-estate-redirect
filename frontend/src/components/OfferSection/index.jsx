import { useState, useEffect } from "react"
import { postOffer, getOffers } from "../../../utils/backend"
import Offer from "../Offer"
import './styles.css'

export default function OfferSection({ listingId, loginStatus }) {
    const [offers, setOffers] = useState([])
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [createFormData, setCreateFormData] = useState({
        userId: localStorage.getItem("userToken"),
        listingId: listingId,
        status: 'pending',
        offerPrice: 0,
        expiration: new Date(),
        EMD: 0,
        downPayment: 0,
        loanType: '',
        loanAmount: 0,
        proofOfFunds: '',
        appraisalContingencyDate: new Date(),
        loanContingencyDate: new Date(),
        personalPropertyIncluded: '',
        escrowCompany: '',
        walkthrough: new Date(),
        closeOfEscrow: new Date(),
        additionalTerms: '',
    })

    let loanTypes = ["Conventional", "FHA", "VA", "Other - please specify", "None - Cash offer"]
    let loanTypeOptions = []
    for (let loanType of loanTypes) {
        loanTypeOptions.push(<option key={loanType} value={loanType}>{loanType}</option>)
    }

    useEffect(() => {
        getOffers(listingId)
            .then(offers => setOffers(offers))
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

    function refreshOffers() {
        getOffers(listingId)
            .then(newOfferData => setOffers(newOfferData))
    }

    function handleSubmit(event) {
        event.preventDefault()
        setCreateFormData({
            userId: localStorage.getItem("userToken"),
            listingId: listingId,
            status: 'pending',
            offerPrice: 0,
            expiration: new Date(),
            EMD: 0,
            downPayment: 0,
            loanType: '',
            loanAmount: 0,
            proofOfFunds: '',
            appraisalContingencyDate: new Date(),
            loanContingencyDate: new Date(),
            personalPropertyIncluded: '',
            escrowCompany: '',
            walkthrough: new Date(),
            closeOfEscrow: new Date(),
            additionalTerms: '',
        })
        setShowCreateForm(false)
        postOffer({
            ...createFormData,
            listingId: listingId,
            POFFile: event.target[6].files[0]
        })
            .then(() => refreshOffers())
    }

    let offerElements = [<p key='0' className='text-center'>No offers yet</p>]
    if (offers.length > 0) {
        offerElements = offers.map(offer => {
            return <Offer
                key={offer._id}
                data={offer}
                refreshOffers={refreshOffers}
                loginStatus={loginStatus}
            />
        })
    }

    let createBtn
    if (loginStatus && localStorage.userCategory === "buyer") {
        let btnText = 'Make an Offer'
        if (showCreateForm) btnText = 'Close'
        createBtn = 
            <button
            onClick={toggleCreateForm}
            className="text-stone-300 hover:bg-green-800 font-bold py-2 px-4 bg-green-700 rounded cursor-pointer"
            >
                {btnText}
            </button>
    }

    let offerForm = ''
    if (loginStatus && localStorage.userCategory === 'buyer' && showCreateForm) {
        offerForm =
        <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="offer-form bg-stone-400 rounded-lg border-gray-700 border-2 !text-black">
            <p className="text-center !text-black underline">TERMS</p>
            <label htmlFor="offerPrice">Your offer price:</label>
            <div className="flex ml-2">
            <p className="!text-black">$</p>
            <input
                name="offerPrice"
                type="number"
                placeholder="Your offer price"
                defaultValue={createFormData.offerPrice}
                onChange={handleInputChange}
                required
            />
            </div>
            <label htmlFor="expiration">This offer expires on: </label>
            <input
                name="expiration"
                type="date"
                defaultValue={createFormData.expiration}
                onChange={handleInputChange}
                required
            />
            <label htmlFor="EMD">Earnest money deposit:</label>
            <div className="flex ml-2">
            <p className="!text-black">$</p><input
                name="EMD"
                type="number"
                defaultValue={createFormData.EMD}
                onChange={handleInputChange}
                required
            />
            </div>
            <label htmlFor="downPayment">Down payment:</label>
            <div className="flex ml-2">
            <p className="!text-black">$</p>
            <input
                name="downPayment"
                type="number"
                defaultValue={createFormData.downPayment}
                onChange={handleInputChange}
                required
            />
            </div>
            <label htmlFor="loanType">Loan type: </label>
            <select
                name="loanType"
                id="loanType"
                defaultValue={null}
                onChange={handleInputChange}
                required
            >
                <option key="default" value={null} selected disabled>Select a loan type</option>
                {loanTypeOptions}
            </select>
            <label htmlFor="loanAmount">Loan amount:</label>
            <div className="flex ml-2">
            <p className="!text-black">$</p>
            <input
                name="loanAmount"
                type="number"
                defaultValue={createFormData.loanAmount}
                onChange={handleInputChange}
                required
            />
            </div>
            <label htmlFor="proofOfFunds" className="block">Upload your proof of funds or preapproval letter below </label>
            <input
                className="file-input"
                type="file"
                name="proofOfFunds"
                id="proofOfFunds"
                required
            />
            <label htmlFor="appraisalContingencyDate">Appraisal Contingency Date: </label><input
                name="appraisalContingencyDate"
                type="date"
                defaultValue={createFormData.appraisalContingencyDate}
                onChange={handleInputChange}
            />
            <label htmlFor="loanContingencyDate">Loan Contingency Date: </label>
            <input
                name="loanContingencyDate"
                type="date"
                defaultValue={createFormData.loanContingencyDate}
                onChange={handleInputChange}
            />
            <label htmlFor="personalPropertyIncluded" className="block">Personal properties to be included in sale: </label>
            <input
                name="personalPropertyIncluded"
                type="text"
                defaultValue={createFormData.personalPropertyIncluded}
                onChange={handleInputChange}
                required
            />
            <label htmlFor="escrowCompany">Escrow company: </label>
            <input
                name="escrowCompany"
                type="text"
                defaultValue={createFormData.escrowCompany}
                onChange={handleInputChange}
                required
            />
            <label htmlFor="walkthrough">Walkthrough Date: </label><input
            name="walkthrough"
            type="date"
            defaultValue={createFormData.walkthrough}
            onChange={handleInputChange}
            required
            />
            <label htmlFor="closeOfEscrow">Closing Date: </label>
            <input
                name="closeOfEscrow"
                type="date"
                defaultValue={createFormData.closeOfEscrow}
                onChange={handleInputChange}
                required
                />
            <label htmlFor="additionalTerms">Additional Terms: </label>
            <textarea
                className="bg-stone-700 ml-3"
                name="additionalTerms"
                rows="10"
                cols="40"
                defaultValue={createFormData.additionalTerms}
                onChange={handleInputChange}
                />
            <div className="text-center py-5">
                <button
                    type="submit"
                    className="mx-auto text-white hover:bg-gray-800 font-bold py-2 px-4 bg-gray-700 rounded cursor-pointer mr-2">
                    Submit
                </button>
            </div>
        </form>
    } 
    return (
        <div className='offer-section bg-stone-600 rounded-lg p-4 pb-10 mt-4 flex-col justify-center items-center space-y-4 text-stone-300'>
            {createBtn}
            {offerForm}
            {offerElements}
        </div>
    )
}
