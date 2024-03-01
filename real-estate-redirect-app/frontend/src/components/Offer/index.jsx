import { useState, useEffect } from "react"
import { updateOffer, deleteOffer, getUser } from "../../../utils/backend"

export default function Offer({ data, refreshOffers, loginStatus }) {
    const [currentUserToken, setCurrentUserToken] = useState('')
    const [offerUserToken, setOfferUserToken] = useState('')
    const [showEditForm, setShowEditForm] = useState(false)
    const [editFormData, setEditFormData] = useState({
        offerId: data._id,
        userId: data.userId,
        listingId: data.listingId,
        status: data.status,
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
        deleteOffer(data._id)
            .then(() => refreshOffers())
    }

    let btns = ''
    if (currentUserToken === offerUserToken) {
        btns = 
            <div className="flex justify-end">
                <button
                    onClick={() => { setShowEditForm(true) }}
                    className="text-white hover:bg-gray-800 font-bold py-2 px-4 bg-gray-700 rounded cursor-pointer mr-2">
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded">
                    Delete
                </button>
            </div>
    }

    if (showEditForm) {
        return (
            <form
                onSubmit={handleSubmit}
                className="bg-gray-100 rounded-lg p-4 my-4 border-gray-700 border-2 w-[80vw] mx-auto">
                {/* input for buyer id, autopopulate name/email */}
                <br />
                <input 
                    type="hidden"
                    name="_id"
                    defaultValue={data._id}
                />
                <label htmlFor="listingId">Listing ID:</label>
                <input
                    name="listingId"
                    className="pl-2 bg-gray-100"
                    disabled={true}
                    defaultValue={data.listingId}
                />
                <br />
                <label htmlFor="status">Status:</label>
                <input
                    name="status"
                    className="pl-2 bg-gray-100"
                    defaultValue={data.status}
                />
                <br />
                <p>Terms of the counteroffer (if any):</p>
                <label htmlFor="offerPrice">Your offer price: $</label>
                <input
                    name="offerPrice"
                    className="mx-2 bg-gray-100"
                    defaultValue={data.terms.offerPrice}
                    onChange={handleInputChange}
                />
                <br />
                <label htmlFor="expiration">This offer expires on: </label>
                <input
                    name="expiration"
                    type="date"
                    className="mx-2 bg-gray-100"
                    defaultValue={data.terms.expiration}
                    onChange={handleInputChange}
                />
                <br />
                {/* <label htmlFor="listingShown">Have you already seen the property in person?</label>
                <input
                    name="listingShown"
                    type="text" //change to boolean
                    className="mx-2 bg-gray-100"
                    placeholder="Y / N"
                    defaultValue={data.terms.listingShown}
                    onChange={handleInputChange}
                /> */}
                <label htmlFor="EMD">Earnest money deposit: $</label>
                <input
                    name="EMD"
                    type="number"
                    className="mx-2 bg-gray-100"
                    defaultValue={data.terms.EMD}
                    onChange={handleInputChange}
                />
                <br />
                <label htmlFor="downPayment">Down payment: $</label>
                <input
                    name="downPayment"
                    type="number"
                    className="mx-2 bg-gray-100"
                    defaultValue={data.terms.downPayment}
                    onChange={handleInputChange}
                />
                <br />
                <label htmlFor="loanType">Loan type: </label>
                <input
                    name="loanType"
                    type="text"
                    className="mx-2 bg-gray-100"
                    defaultValue={data.terms.loanType}
                    onChange={handleInputChange}
                />
                <br />
                <label htmlFor="loanAmount">Loan amount: $</label>
                <input
                    name="loanAmount"
                    type="number"
                    className="mx-2 bg-gray-100"
                    defaultValue={data.terms.loanAmount}
                    onChange={handleInputChange}
                />
                <br />
                {/* <label htmlFor="proofOfFunds">Upload your proof of funds or preapproval letter here: $</label>
                <input
                    name="proofOfFunds"
                    type="file"
                    className="mx-2 bg-gray-100"
                    defaultValue={editFormData.terms.proofOfFunds}
                    onChange={handleInputChange}
                /> */}
                <br />
                <label htmlFor="appraisalContingencyDate">Appraisal Contingency Date: </label>
                <input
                    name="appraisalContingencyDate"
                    type="date"
                    className="mx-2 bg-gray-100"
                    defaultValue={data.terms.appraisalContingencyDate}
                    onChange={handleInputChange}
                />
                <br />
                <label htmlFor="loanContingencyDate">Loan Contingency Date: </label>
                <input
                    name="loanContingencyDate"
                    type="date"
                    className="mx-2 bg-gray-100"
                    defaultValue={data.terms.loanContingencyDate}
                    onChange={handleInputChange}
                />
                <br />
                <label htmlFor="personalPropertyIncluded">Personal properties to be included in sale: </label>
                <input
                    name="personalPropertyIncluded"
                    type="text"
                    className="mx-2 bg-gray-100"
                    defaultValue={data.terms.personalPropertyIncluded}
                    onChange={handleInputChange}
                />
                <br />
                <label htmlFor="escrowCompany">Escrow company: </label>
                <input
                    name="escrowCompany"
                    type="text"
                    className="mx-2 bg-gray-100"
                    defaultValue={data.terms.escrowCompany}
                    onChange={handleInputChange}
                />
                <br />
                <label htmlFor="walkthrough">Walkthrough Date: </label>
                <input
                    name="walkthrough"
                    type="date"
                    className="mx-2 bg-gray-100"
                    defaultValue={data.terms.walkthrough}
                    onChange={handleInputChange}
                />
                <br />
                <label htmlFor="closeOfEscrow">Closing Date: </label>
                <input
                    name="closeOfEscrow"
                    type="date"
                    className="mx-2 bg-gray-100"
                    defaultValue={data.terms.closeOfEscrow}
                    onChange={handleInputChange}
                />
                <br />
                <label htmlFor="additionalTerms">Additional Terms: </label>
                <input
                    name="additionalTerms"
                    type="text"
                    className="mx-2 bg-gray-100"
                    defaultValue={data.terms.additionalTerms}
                    onChange={handleInputChange}
                />
                <br />
                <div>
                    <button
                        onClick={() => { setShowEditForm(false) }}
                        className="text-white hover:bg-gray-800 font-bold py-2 px-4 bg-gray-700 rounded cursor-pointer mr-2">
                        Close
                    </button>
                    <button
                        type="submit"
                        className="text-white hover:bg-green-800 font-bold py-2 px-4 bg-green-900 rounded cursor-pointer mr-2">
                        Post
                    </button>
                </div>
            </form>
        )
    } else {
        return (
            <div
                className="bg-gray-100 rounded-lg p-4 my-4 border-gray-700 border-2 w-[80vw] mx-auto">
                <p className="font-bold">Offer from {data.userId}</p>
                <p className="my-2">for listing #{data.listingId}</p>
                <p>Status: {data.status}</p>
                <p>Terms:</p>
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
    }
}
