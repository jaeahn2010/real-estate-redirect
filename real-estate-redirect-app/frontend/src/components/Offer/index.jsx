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
        // listingShown: data.terms.listingShown,
        EMD: data.terms.EMD,
        downPayment: data.terms.downPayment,
        loanType: data.terms.loanType,
        loanAmount: data.terms.loanAmount,
        // proofOfFunds: data.terms.proofOfFunds,
        appraisalContingencyDate: data.terms.appraisalContingencyDate,
        loanContingencyDate: data.terms.loanContingencyDate,
        personalPropertyIncluded: data.terms.personalPropertyIncluded,
        escrowCompany: data.terms.escrowCompany,
        walkthrough: data.terms.walkthrough,
        closeOfEscrow: data.terms.closeOfEscrow,
        additionalTerms: data.terms.additionalTerms,
    })

    useEffect(() => {
        if (loginStatus) {
            getUser(data.userId)
                .then(user => setOfferUserToken(user.token))
        setCurrentUserToken(localStorage.getItem("userToken"))
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
        updateOffer(editFormData, data._id)
            .then(() => refreshOffers())
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
        buyerIdDisplay = data.userId.slice(-6) + " (Your offer)"
        offerForm =
            <form
                onSubmit={handleSubmit}
                className="bg-stone-400 rounded-lg p-4 my-4 border-gray-700 border-2 w-[80vw] mx-auto">
                    <table>
                        {/* input for buyer id, autopopulate name/email */}
                        <tbody>
                            <tr>
                                <td></td>
                                <td><input 
                                    type="hidden"
                                    name="_id"
                                    defaultValue={data._id}
                                /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="listingId">Listing ID:</label></td>
                                <td><input
                                    name="listingId"
                                    disabled={true}
                                    defaultValue={data.listingId}
                                /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><input
                                    name="listingId"
                                    disabled={true}
                                    defaultValue={data.listingId}
                                /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="status">Status:</label></td>
                                <td><input
                                    name="status"
                                    disabled={true}
                                    defaultValue={data.status}
                                /></td>
                            </tr>
                            <tr>
                                <td><p>Terms of the counteroffer</p></td>
                                <td><p>(if any)</p></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="offerPrice">Your offer price: $</label></td>
                                <td><input
                                    name="offerPrice"
                                    defaultValue={data.terms.offerPrice}
                                    onChange={handleInputChange}
                                /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="expiration">This offer expires on: </label></td>
                                <td><input
                                    name="expiration"
                                    type="date"
                                    defaultValue={data.terms.expiration}
                                    onChange={handleInputChange}
                                /></td>
                            </tr>
                            {/*<tr>
                                <td><label htmlFor="listingShown">Have you already seen the property in person?</label></td>
                                <td><input
                                    name="listingShown"
                                    type="text" //change to boolean
                                    placeholder="Y / N"
                                    defaultValue={data.terms.listingShown}
                                    onChange={handleInputChange}
                                /></td>
                            </tr>*/}
                            <tr>
                                <td><label htmlFor="EMD">Earnest money deposit: $</label></td>
                                <td><input
                                    name="EMD"
                                    type="number"
                                    defaultValue={data.terms.EMD}
                                    onChange={handleInputChange}
                                /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="downPayment">Down payment: $</label></td>
                                <td><input
                                    name="downPayment"
                                    type="number"
                                    className="mx-2 bg-gray-100"
                                    defaultValue={data.terms.downPayment}
                                    onChange={handleInputChange}
                                /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="loanType">Loan type: </label></td>
                                <td><input
                                    name="loanType"
                                    type="text"
                                    defaultValue={data.terms.loanType}
                                    onChange={handleInputChange}
                                /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="loanAmount">Loan amount: $</label></td>
                                <td><input
                                    name="loanAmount"
                                    type="number"
                                    defaultValue={data.terms.loanAmount}
                                    onChange={handleInputChange}
                                /></td>
                            </tr>
                            {/* <tr>
                                <td><label htmlFor="proofOfFunds">Upload your proof of funds or preapproval letter here: $</label></td>
                                <td><input
                                    name="proofOfFunds"
                                    type="file"
                                    defaultValue={editFormData.terms.proofOfFunds}
                                    onChange={handleInputChange}
                                /></td>
                            </tr> */}
                            <tr>
                                <td><label htmlFor="appraisalContingencyDate">Appraisal Contingency Date: </label></td>
                                <td><input
                                    name="appraisalContingencyDate"
                                    type="date"
                                    defaultValue={data.terms.appraisalContingencyDate}
                                    onChange={handleInputChange}
                                /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="loanContingencyDate">Loan Contingency Date: </label></td>
                                <td><input
                                    name="loanContingencyDate"
                                    type="date"
                                    defaultValue={data.terms.loanContingencyDate}
                                    onChange={handleInputChange}
                                /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="personalPropertyIncluded">Personal properties to be included in sale: </label></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="escrowCompany">Escrow company: </label></td>
                                <td><input
                                    name="personalPropertyIncluded"
                                    type="text"
                                    defaultValue={data.terms.personalPropertyIncluded}
                                    onChange={handleInputChange}
                                /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="walkthrough">Walkthrough Date: </label></td>
                                <td><input
                                    name="walkthrough"
                                    type="date"
                                    defaultValue={data.terms.walkthrough}
                                    onChange={handleInputChange}
                                /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="closeOfEscrow">Closing Date: </label></td>
                                <td><input
                                    name="closeOfEscrow"
                                    type="date"
                                    defaultValue={data.terms.closeOfEscrow}
                                    onChange={handleInputChange}
                                /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="additionalTerms">Additional Terms: </label></td>
                                <td><input
                                    name="additionalTerms"
                                    type="text"
                                    defaultValue={data.terms.additionalTerms}
                                    onChange={handleInputChange}
                                /></td>
                            </tr>
                                                        
                        </tbody>
                    </table>
                <div>
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
            <div className="flex justify-end">
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
            className="bg-stone-400 rounded-lg p-4 my-4 border-gray-700 border-2 w-[80vw] mx-auto">
            <table>
                {/* input for buyer id, autopopulate name/email */}
                <tbody>
                    <tr>
                        <td><input
                            name="status"
                            id="accept"
                            type="radio"
                            defaultValue="accept"
                            onChange={handleInputChange}
                        /></td>
                        <td><label htmlFor="accept">Accept</label></td>
                    </tr>
                    <tr>
                        <td><input
                            name="status"
                            id="reject"
                            type="radio"
                            defaultValue="reject"
                            onChange={handleInputChange}
                        /></td>
                        <td><label htmlFor="accept">Reject</label></td>
                    </tr>
                    <tr>
                        <td><input
                            name="status"
                            id="counter"
                            type="radio"
                            defaultValue="counter"
                            onChange={handleInputChange}
                        /></td>
                        <td><label htmlFor="accept">Counteroffer</label></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="additionalTerms">Proposed counteroffer terms (if any): </label></td>
                        <td><input
                            name="additionalTerms"
                            type="text"
                            defaultValue=''
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                </tbody>
            </table>
            <button
                type="submit"
                className="text-white hover:bg-gray-800 font-bold py-2 px-4 bg-gray-700 rounded cursor-pointer mr-2">
                Submit
            </button>
        </form>
        btns = 
        <div className="flex justify-end">
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
        if (loginStatus && currentUserToken === offerUserToken) {
            return (
                <div
                    className="bg-stone-400 text-stone-800 rounded-lg p-4 my-4 border-gray-700 border-2 w-[80vw] mx-auto">
                    <p className="font-bold">Offer from {buyerIdDisplay}</p>
                    <p className="my-2">for listing #{data.listingId}</p>
                    <p>Status: {data.status}</p>
                    <p>TERMS</p>
                    <p>Offer price: ${data.terms.offerPrice.toLocaleString()}</p>
                    <p>Offer expires on: {data.terms.expiration}</p>
                    {/* <p>Buyer has seen the property? ${data.terms.listingShown}</p> */}
                    <p>Earnest money deposit: ${data.terms.EMD}</p>
                    <p>Down payment: ${data.terms.downPayment.toLocaleString()}</p>
                    <p>Loan type: {data.terms.loanType}</p>
                    <p>Loan amount: ${data.terms.loanAmount.toLocaleString()}</p>
                    {/* <p>Proof of funds: ${data.terms.proofOfFunds}</p> */}
                    <p>Appraisal contingency date: {data.terms.appraisalContingencyDate}</p>
                    <p>Loan contingency date: {data.terms.loanContingencyDate}</p>
                    <p>Personal properties to be included in sale: {data.terms.personalPropertyIncluded}</p>
                    <p>Escrow company: {data.terms.escrowCompany}</p>
                    <p>Walkthrough date: {data.terms.walkthrough}</p>
                    <p>Closing date: {data.terms.closeOfEscrow}</p>
                    <p>Additional terms: {data.terms.additionalTerms}</p>
                    {btns}
                </div>
            )
        } else {
            return (
                <>
                    <div
                        className="bg-stone-400 text-stone-800 rounded-lg p-4 my-4 border-gray-700 border-2 w-[80vw] mx-auto">
                        <p className="font-bold">Offer from {buyerIdDisplay}</p>
                        <p className="my-2">for listing #{data.listingId}</p>
                        <p>Status: {data.status}</p>
                        <p>TERMS</p>
                        <p>Offer price: ${data.terms.offerPrice.toLocaleString()}</p>
                        <p>Offer expires on: {data.terms.expiration}</p>
                        {/* <p>Buyer has seen the property? ${data.terms.listingShown}</p> */}
                    </div>
                    {btns}
                </>
            )
        }
    }
}
