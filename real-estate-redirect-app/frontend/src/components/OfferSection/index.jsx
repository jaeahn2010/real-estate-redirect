import { useState, useEffect } from "react"
import { postOffer, getOffers } from "../../../utils/backend"
import Offer from "../Offer"

export default function offerSection({ listingId, loginStatus }) {
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
    if (loginStatus) {
        let btnText = 'Create'
        if (showCreateForm) btnText = 'Close'
        createBtn = 
            <button
            onClick={toggleCreateForm}
            className="top-0 right-5 absolute text-white hover:bg-green-800 font-bold py-2 px-4 bg-green-900 rounded cursor-pointer mr-2"
            >
                {btnText}
            </button>
    }

    return (
        <div className='comment-section bg-gray-300 rounded-lg p-4 pb-10 mt-4 mx-10 space-y-4 relative'>
            <h1 className='text-xl font-bold'>Offers</h1>
            {createBtn}
            {
                showCreateForm && <form
                    onSubmit={handleSubmit}
                    className="bg-gray-100 rounded-lg p-4 my-4 border-gray-700 border-2 w-[80vw] mx-auto">
                    {/* input for buyer id, autopopulate name/email */}
                    <label htmlFor="listingId">Listing ID:</label>
                    <input
                        name="listingId"
                        className="pl-2 bg-gray-100"
                        disabled={true}
                        value={listingId}
                    />
                    <br />
                    <label htmlFor="status">Status:</label>
                    <input
                        name="status"
                        className="pl-2 bg-gray-100"
                        disabled={true}
                        value="pending"
                    />
                    <br />
                    <p>Terms:</p>
                    <label htmlFor="offerPrice">Your offer price: $</label>
                    <input
                        name="offerPrice"
                        type="number"
                        className="mx-2 bg-gray-100"
                        placeholder="Your offer price"
                        defaultValue={createFormData.offerPrice}
                        onChange={handleInputChange}
                    />
                    <br />
                    <label htmlFor="expiration">This offer expires on: </label>
                    <input
                        name="expiration"
                        type="date"
                        className="mx-2 bg-gray-100"
                        defaultValue={createFormData.expiration}
                        onChange={handleInputChange}
                    />
                    <br />
                    {/* <label htmlFor="listingShown">Have you already seen the property in person?</label>
                    <input
                        name="listingShown"
                        type="text" //change to boolean
                        className="mx-2 bg-gray-100"
                        placeholder="Y / N"
                        defaultValue={createFormData.listingShown}
                        onChange={handleInputChange}
                    /> */}
                    <label htmlFor="EMD">Earnest money deposit: $</label>
                    <input
                        name="EMD"
                        type="number"
                        className="mx-2 bg-gray-100"
                        defaultValue={createFormData.EMD}
                        onChange={handleInputChange}
                    />
                    <br />
                    <label htmlFor="downPayment">Down payment: $</label>
                    <input
                        name="downPayment"
                        type="number"
                        className="mx-2 bg-gray-100"
                        defaultValue={createFormData.downPayment}
                        onChange={handleInputChange}
                    />
                    <br />
                    <label htmlFor="loanType">Loan type: </label>
                    <input
                        name="loanType"
                        type="text"
                        className="mx-2 bg-gray-100"
                        defaultValue={createFormData.loanType}
                        onChange={handleInputChange}
                    />
                    <br />
                    <label htmlFor="loanAmount">Loan amount: $</label>
                    <input
                        name="loanAmount"
                        type="number"
                        className="mx-2 bg-gray-100"
                        defaultValue={createFormData.loanAmount}
                        onChange={handleInputChange}
                    />
                    <br />
                    {/* <label htmlFor="proofOfFunds">Upload your proof of funds or preapproval letter here: $</label>
                    <input
                        name="proofOfFunds"
                        type="file"
                        className="mx-2 bg-gray-100"
                        defaultValue={createFormData.proofOfFunds}
                        onChange={handleInputChange}
                    /> */}
                    <br />
                    <label htmlFor="appraisalContingencyDate">Appraisal Contingency Date: </label>
                    <input
                        name="appraisalContingencyDate"
                        type="date"
                        className="mx-2 bg-gray-100"
                        defaultValue={createFormData.appraisalContingencyDate}
                        onChange={handleInputChange}
                    />
                    <br />
                    <label htmlFor="loanContingencyDate">Loan Contingency Date: </label>
                    <input
                        name="loanContingencyDate"
                        type="date"
                        className="mx-2 bg-gray-100"
                        defaultValue={createFormData.loanContingencyDate}
                        onChange={handleInputChange}
                    />
                    <br />
                    <label htmlFor="personalPropertyIncluded">Personal properties to be included in sale: </label>
                    <input
                        name="personalPropertyIncluded"
                        type="text"
                        className="mx-2 bg-gray-100"
                        defaultValue={createFormData.personalPropertyIncluded}
                        onChange={handleInputChange}
                    />
                    <br />
                    <label htmlFor="escrowCompany">Escrow company: </label>
                    <input
                        name="escrowCompany"
                        type="text"
                        className="mx-2 bg-gray-100"
                        defaultValue={createFormData.escrowCompany}
                        onChange={handleInputChange}
                    />
                    <br />
                    <label htmlFor="walkthrough">Walkthrough Date: </label>
                    <input
                        name="walkthrough"
                        type="date"
                        className="mx-2 bg-gray-100"
                        defaultValue={createFormData.walkthrough}
                        onChange={handleInputChange}
                    />
                    <br />
                    <label htmlFor="closeOfEscrow">Closing Date: </label>
                    <input
                        name="closeOfEscrow"
                        type="date"
                        className="mx-2 bg-gray-100"
                        defaultValue={createFormData.closeOfEscrow}
                        onChange={handleInputChange}
                    />
                    <br />
                    <label htmlFor="additionalTerms">Additional Terms: </label>
                    <input
                        name="additionalTerms"
                        type="text"
                        className="mx-2 bg-gray-100"
                        defaultValue={createFormData.additionalTerms}
                        onChange={handleInputChange}
                    />
                    <br />
                    <button
                        type="submit"
                        className="text-white hover:bg-gray-800 font-bold py-2 px-4 bg-gray-700 rounded cursor-pointer mr-2">
                        Post
                    </button>
                </form>
            }
            {offerElements}
        </div>
    )
}
