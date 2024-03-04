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
        // listingShown: false,
        EMD: 0,
        downPayment: 0,
        loanType: '',
        loanAmount: 0,
        // proofOfFunds: false,
        appraisalContingencyDate: new Date(),
        loanContingencyDate: new Date(),
        personalPropertyIncluded: '',
        escrowCompany: '',
        walkthrough: new Date(),
        closeOfEscrow: new Date(),
        additionalTerms: '',
    })

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
        //reset form
        setCreateFormData({
            userId: localStorage.getItem("userToken"),
            listingId: listingId,
            status: 'pending',
            offerPrice: 0,
            expiration: new Date(),
            // listingShown: false,
            EMD: 0,
            downPayment: 0,
            loanType: '',
            loanAmount: 0,
            // proofOfFunds: false,
            appraisalContingencyDate: new Date(),
            loanContingencyDate: new Date(),
            personalPropertyIncluded: '',
            escrowCompany: '',
            walkthrough: new Date(),
            closeOfEscrow: new Date(),
            additionalTerms: '',
        })
        setShowCreateForm(false)
        postOffer({ ...createFormData, listingId: listingId })
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
            className="top-0 right-5 absolute text-stone-300 hover:bg-green-800 font-bold py-2 px-4 bg-green-700 rounded cursor-pointer mr-2"
            >
                {btnText}
            </button>
    }

    let offerForm = ''
    if (loginStatus && localStorage.userCategory === 'buyer' && showCreateForm) {
        offerForm =
        <form
            onSubmit={handleSubmit}
            className="bg-stone-400 rounded-lg p-4 my-4 border-gray-700 border-2 w-[80vw] mx-auto">
            <table>
                {/* input for buyer id, autopopulate name/email */}
                <tbody>
                    <tr>
                        <td><label htmlFor="listingId">Listing ID:</label></td>
                        <td><input
                            name="listingId"
                            disabled={true}
                            value={listingId}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="status">Status:</label></td>
                        <td><input
                            name="status"
                            disabled={true}
                            value="pending"
                        /></td>
                    </tr>
                    <tr className="border-y-2 border-black"><td><p className="text-right text-black">TERMS</p></td><td></td></tr>
                    <tr>
                        <td><label htmlFor="offerPrice">Your offer price: $</label></td>
                        <td><input
                            name="offerPrice"
                            type="number"
                            placeholder="Your offer price"
                            defaultValue={createFormData.offerPrice}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="expiration">This offer expires on: </label></td>
                        <td><input
                            name="expiration"
                            type="date"
                            defaultValue={createFormData.expiration}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        {/* <td><label htmlFor="listingShown">Have you already seen the property in person?</label></td>
                        <td><input
                            name="listingShown"
                            type="text" //change to boolean
                            placeholder="Y / N"
                            defaultValue={createFormData.listingShown}
                            onChange={handleInputChange}
                        /></td> */}
                    </tr>
                    <tr>
                        <td><label htmlFor="EMD">Earnest money deposit: $</label></td>
                        <td><input
                            name="EMD"
                            type="number"
                            defaultValue={createFormData.EMD}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="downPayment">Down payment: $</label></td>
                        <td><input
                            name="downPayment"
                            type="number"
                            defaultValue={createFormData.downPayment}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="loanType">Loan type: </label></td>
                        <td><input
                            name="loanType"
                            type="text"
                            defaultValue={createFormData.loanType}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="loanAmount">Loan amount: $</label></td>
                        <td><input
                            name="loanAmount"
                            type="number"
                            defaultValue={createFormData.loanAmount}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        {/* <td><label htmlFor="proofOfFunds">Upload your proof of funds or preapproval letter here: $</label></td>
                        <td><input
                            name="proofOfFunds"
                            type="file"
                            defaultValue={createFormData.proofOfFunds}
                            onChange={handleInputChange}
                        /></td> */}
                    </tr>
                    <tr>
                        <td><label htmlFor="appraisalContingencyDate">Appraisal Contingency Date: </label></td>
                        <td><input
                            name="appraisalContingencyDate"
                            type="date"
                            defaultValue={createFormData.appraisalContingencyDate}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="loanContingencyDate">Loan Contingency Date: </label></td>
                        <td><input
                            name="loanContingencyDate"
                            type="date"
                            defaultValue={createFormData.loanContingencyDate}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="personalPropertyIncluded">Personal properties to be included in sale: </label></td>
                        <td><input
                            name="personalPropertyIncluded"
                            type="text"
                            defaultValue={createFormData.personalPropertyIncluded}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="escrowCompany">Escrow company: </label></td>
                        <td><input
                            name="escrowCompany"
                            type="text"
                            defaultValue={createFormData.escrowCompany}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                    <td><label htmlFor="walkthrough">Walkthrough Date: </label></td>
                    <td><input
                        name="walkthrough"
                        type="date"
                        defaultValue={createFormData.walkthrough}
                        onChange={handleInputChange}
                    /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="closeOfEscrow">Closing Date: </label></td>
                        <td><input
                            name="closeOfEscrow"
                            type="date"
                            defaultValue={createFormData.closeOfEscrow}
                            onChange={handleInputChange}
                        /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="additionalTerms">Additional Terms: </label></td>
                        <td><input
                            name="additionalTerms"
                            type="text"
                            defaultValue={createFormData.additionalTerms}
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
    } 
    return (
        <div className='offer-section bg-stone-600 rounded-lg p-4 pb-10 mt-4 mx-10 space-y-4 relative text-stone-300'>
            <h1 className='text-xl font-bold'>Offers</h1>
            {createBtn}
            {offerForm}
            {offerElements}
        </div>
    )
}
