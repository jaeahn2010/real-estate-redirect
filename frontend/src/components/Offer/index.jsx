import { useState, useEffect } from "react"
import { updateOffer, deleteOffer, getUser } from "../../../utils/backend"
import './styles.css'

export default function Offer({ data, refreshOffers, loginStatus }) {
    const [currentUserToken, setCurrentUserToken] = useState('')
    const [offerUserToken, setOfferUserToken] = useState('')
    const [showEditForm, setShowEditForm] = useState(false)
    const [editFormData, setEditFormData] = useState({
        offerId: data._id,
        userId: data.userId,
        listingId: data.listingId,
        status: data.status,
        offerPrice: data.terms.offerPrice,
        expiration: data.terms.expiration,
        EMD: data.terms.EMD,
        downPayment: data.terms.downPayment,
        loanType: data.terms.loanType,
        loanAmount: data.terms.loanAmount,
        appraisalContingencyDate: data.terms.appraisalContingencyDate,
        loanContingencyDate: data.terms.loanContingencyDate,
        personalPropertyIncluded: data.terms.personalPropertyIncluded,
        escrowCompany: data.terms.escrowCompany,
        walkthrough: data.terms.walkthrough,
        closeOfEscrow: data.terms.closeOfEscrow,
        additionalTerms: data.terms.additionalTerms,
    })
    let loanTypes = ["Conventional", "FHA", "VA", "Other - please specify", "None - Cash offer"]
    let loanTypeOptions = []
    for (let loanType of loanTypes) {
        loanTypeOptions.push(<option key={loanType} value={loanType}>{loanType}</option>)
    }

    useEffect(() => {
        if (loginStatus) {
            getUser(data.userId)
                .then(user => setOfferUserToken(user.token))
        setCurrentUserToken(localStorage.getItem("userToken"))
        }
    }, [])

    function zeroPad(num) {
        return num < 10 ? `0${String(num)}` : String(num)
    }

    function extractDate(date) {
        return `${date.getFullYear()}-${zeroPad(date.getMonth() + 1)}-${zeroPad(date.getDate())}`
    }
    let formattedExpiration = extractDate(new Date(data.terms.expiration))
    let formattedAppraisalContingencyDate = extractDate(new Date(data.terms.appraisalContingencyDate))
    let formattedLoanContingencyDate = extractDate(new Date(data.terms.loanContingencyDate))
    let formattedWalkthrough = extractDate(new Date(data.terms.walkthrough))
    let formattedCloseOfEscrow = extractDate(new Date(data.terms.closeOfEscrow))

    function handleInputChange(event) {
        setEditFormData({
            ...editFormData,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        setShowEditForm(false)
        if (localStorage.userCategory === 'buyer') {
            updateOffer(editFormData, data._id)
                .then(() => refreshOffers())
        } else {
            if (event.target[0].checked) {
                alert("You have accepted this buyer's offer.")
                setEditFormData({...editFormData, status: "accepted"})
            } else if (event.target[1].checked) {
                alert("You have rejected this buyer's offer.")
                setEditFormData({...editFormData, status: "rejected"})
            } else if (event.target[2].checked) {
                alert(`You have countered this buyer's offer with the terms: ${event.target[3].value}`)
                setEditFormData({...editFormData, status: "countered"})
            }
            updateOffer(editFormData, data._id)
                .then(() => refreshOffers)
        }
        
    }

    function handleDelete() {
        if (confirm("Are you sure you would like to delete this offer?")) {
            deleteOffer(data._id)
                .then(() => refreshOffers())
        }
    }

    let btns = ''
    let buyerIdDisplay = " Buyer **********" + data.userId.slice(-6)
    let offerForm = ''
    //only display edit/delete buttons if user is logged in & offer is their own
    if (loginStatus && currentUserToken === offerUserToken && localStorage.userCategory === 'buyer') {
        buyerIdDisplay += data.userId.slice(-6) + " (Your offer)"
        offerForm =
            <form
                onSubmit={handleSubmit}
                className="buyer-offer-form bg-stone-400 rounded-lg p-4 my-4 border-gray-700 border-2 mx-auto">
                {buyerIdDisplay}
                <input
                    name="status"
                    disabled={true}
                    hidden={true}
                    defaultValue="pending"
                /><br/>
                <p className="!text-black">Terms of the counteroffer (if any)</p>
                <label htmlFor="offerPrice">Your offer price: $</label><br/>
                <input
                    name="offerPrice"
                    defaultValue={data.terms.offerPrice}
                    onChange={handleInputChange}
                    required
                /><br/>
                <label htmlFor="expiration">This offer expires on: </label><br/>
                <input
                    name="expiration"
                    type="date"
                    defaultValue={formattedExpiration}
                    onChange={handleInputChange}
                    required
                /><br/>
                <label htmlFor="EMD">Earnest money deposit: $</label><br/>
                <input
                    name="EMD"
                    type="number"
                    defaultValue={data.terms.EMD}
                    onChange={handleInputChange}
                    required
                /><br/>
                <label htmlFor="downPayment">Down payment: $</label><br/>
                <input
                    name="downPayment"
                    type="number"
                    className="mx-2 bg-gray-100"
                    defaultValue={data.terms.downPayment}
                    onChange={handleInputChange}
                    required
                /><br/>
                <label htmlFor="loanType">Loan type: </label><br/>
                <select
                    name="loanType"
                    id="loanType"
                    defaultValue={null}
                    onChange={handleInputChange}
                    required
                >
                    <option key="default" value={null} disabled>Select a loan type</option>
                {loanTypeOptions}
                </select>
                <label htmlFor="loanAmount">Loan amount: $</label><br/>
                <input
                    name="loanAmount"
                    type="number"
                    defaultValue={data.terms.loanAmount}
                    onChange={handleInputChange}
                    required
                /><br/>
                <label htmlFor="appraisalContingencyDate">Appraisal Contingency Date: </label><br/>
                <input
                    name="appraisalContingencyDate"
                    type="date"
                    defaultValue={formattedAppraisalContingencyDate}
                    onChange={handleInputChange}
                /><br/>
                <label htmlFor="loanContingencyDate">Loan Contingency Date: </label><br/>
                <input
                    name="loanContingencyDate"
                    type="date"
                    defaultValue={formattedLoanContingencyDate}
                    onChange={handleInputChange}
                /><br/>
                <label htmlFor="personalPropertyIncluded">Personal properties to be included in sale: </label><br/>
                <input
                    name="personalPropertyIncluded"
                    type="text"
                    defaultValue={data.terms.personalPropertyIncluded}
                    onChange={handleInputChange}
                    required
                /><br/>
                <label htmlFor="escrowCompany">Escrow company: </label><br/>
                <input
                    name="escrowCompany"
                    type="text"
                    defaultValue={data.terms.escrowCompany}
                    onChange={handleInputChange}
                    required
                /><br/>
                <label htmlFor="walkthrough">Walkthrough Date: </label><br/>
                <input
                    name="walkthrough"
                    type="date"
                    defaultValue={formattedWalkthrough}
                    onChange={handleInputChange}
                    required
                /><br/>
                <label htmlFor="closeOfEscrow">Closing Date: </label><br/>
                <input
                    name="closeOfEscrow"
                    type="date"
                    defaultValue={formattedCloseOfEscrow}
                    onChange={handleInputChange}
                    required
                /><br/>
                <label htmlFor="additionalTerms">Additional Terms: </label><br/>
                <textarea
                    className="bg-stone-700 ml-3"
                    name="additionalTerms"
                    rows='10'
                    cols='40'
                    defaultValue={data.terms.additionalTerms}
                    onChange={handleInputChange}
                /><br/>
                <div className="flex justify-center py-5">
                    <button
                        onClick={() => { setShowEditForm(false) }}
                        className="text-white hover:bg-gray-800 font-bold py-2 px-4 bg-gray-700 rounded cursor-pointer mr-2">
                        Close
                    </button>
                    <button
                        type="submit"
                        className="text-white hover:bg-green-800 font-bold py-2 px-4 bg-green-900 rounded cursor-pointer mr-2">
                        Submit Changes
                    </button>
                </div>
            </form>
        btns = 
            <div className="flex justify-center">
                <button
                    onClick={() => { setShowEditForm(true) }}
                    className="text-white hover:bg-gray-700 font-bold py-2 px-4 bg-gray-600 rounded cursor-pointer mr-2">
                    Edit this Offer
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Delete this Offer
                </button>
            </div>
    } else if (loginStatus && localStorage.userCategory === 'seller'){
        offerForm = 
        <form
            onSubmit={handleSubmit}
            className="seller-offer-form bg-stone-400 rounded-lg p-4 my-4 border-gray-700 border-2">
            <input
                name="status"
                id="accept"
                type="radio"
                defaultValue="accepted"
                onChange={handleInputChange}
            />
            <label htmlFor="accept">Accept</label><br/>
            <input
                name="status"
                id="reject"
                type="radio"
                defaultValue="rejected"
                onChange={handleInputChange}
            />
            <label htmlFor="accept">Reject</label><br/>
            <input
                name="status"
                id="counter"
                type="radio"
                defaultValue="countered"
                onChange={handleInputChange}
            />
            <label htmlFor="accept">Counteroffer</label><br/><br/>
            <label className="py-5" htmlFor="additionalTerms">Proposed counteroffer terms (if any): </label><br/><br/>
            <input
                className="h-20 text-center"
                name="additionalTerms"
                type="text"
                defaultValue=''
                onChange={handleInputChange}
            /><br/>
            <div className="text-center my-3">
                <button
                    onClick={() => { setShowEditForm(false) }}
                    className="text-white hover:bg-gray-800 font-bold py-2 px-4 bg-gray-700 rounded cursor-pointer mr-2 my-3">
                    Close
                </button>
                <button
                    type="submit"
                    className="text-white hover:bg-gray-800 font-bold py-2 px-4 bg-gray-700 rounded cursor-pointer mr-2 my-3">
                    Submit Response
                </button>
            </div>
        </form>
        btns = 
        <div className="text-center">
            <button
                onClick={() => { setShowEditForm(true) }}
                className="text-white hover:bg-gray-700 font-bold py-2 px-4 bg-gray-600 rounded cursor-pointer mr-2">
                Respond
            </button>
        </div>
    }

    if (showEditForm) {
        return (
            <>
                {offerForm}
                {btns}
            </>
        )
    } else {
        // display more details if user logged in and viewing own offer
        function dateDisplay(dateStr) {
            let dateObj = new Date(dateStr)
            return `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()}`
        }
        if (loginStatus && currentUserToken === offerUserToken) {
            let POF = data.terms.proofOfFunds ? "Yes" : "No";
            return (
                <div
                    className="offer-display-div bg-stone-400 text-stone-800 rounded-lg p-4 my-4 border-gray-700 border-2 mx-auto">
                    <p className="font-bold">Offer from {buyerIdDisplay}</p>
                    <p>Status: {data.status}</p>
                    <p>TERMS</p>
                    <p>Offer price: ${data.terms.offerPrice.toLocaleString()}</p>
                    <p>Offer expires on: {dateDisplay(data.terms.expiration)}</p>
                    <p>Earnest money deposit: ${data.terms.EMD}</p>
                    <p>Down payment: ${data.terms.downPayment.toLocaleString()}</p>
                    <p>Loan type: {data.terms.loanType}</p>
                    <p>Loan amount: ${data.terms.loanAmount.toLocaleString()}</p>
                    <p>Proof of funds submitted: {POF}</p>
                    <p>Appraisal contingency date: {dateDisplay(data.terms.appraisalContingencyDate)}</p>
                    <p>Loan contingency date: {dateDisplay(data.terms.loanContingencyDate)}</p>
                    <p>Personal properties to be included in sale: {data.terms.personalPropertyIncluded}</p>
                    <p>Escrow company: {data.terms.escrowCompany}</p>
                    <p>Walkthrough date: {dateDisplay(data.terms.walkthrough)}</p>
                    <p>Closing date: {dateDisplay(data.terms.closeOfEscrow)}</p>
                    <p>Additional terms: {data.terms.additionalTerms}</p>
                    {btns}
                </div>
            )
        } else {
            return (
                <>
                    <div
                        className="offer-display-div bg-stone-400 text-stone-800 rounded-lg p-4 my-4 border-gray-700 border-2 mx-auto">
                        <p className="font-bold">Offer from {buyerIdDisplay}</p>
                        <p>Status: {data.status}</p>
                        <p>TERMS</p>
                        <p>Offer price: ${data.terms.offerPrice.toLocaleString()}</p>
                        <p>Offer expires on: {dateDisplay(data.terms.expiration)}</p>
                    </div>
                    {btns}
                </>
            )
        }
    }
}