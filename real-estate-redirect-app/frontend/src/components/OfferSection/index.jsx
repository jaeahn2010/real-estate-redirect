import { useState, useEffect } from "react"
import { postOffer, getOffers } from "../../../utils/backend"
import Offer from "../Offer"

export default function offerSection({ listingId }) {
    // Save offers queried from the database in state
    const [offers, setOffers] = useState([])
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [createFormData, setCreateFormData] = useState({
        // buyerId: buyerId,
        listingId: listingId,
        status: 'pending',
        offerPrice: 0,
        // expiration: new Date(),
        // listingShown: false,
        EMD: 0,
        downPayment: 0,
        loanType: '',
        loanAmount: 0,
        // proofOfFunds: false,
    })

    // Query the database for all comments that pertain to this offer on component mount
    useEffect(() => {
        getOffers(listingId)
            .then(offers => setOffers(offers))
    }, [])

    // Update the form fields as the user types
    function handleInputChange(event) {
        setCreateFormData({
            ...createFormData,
            [event.target.name]: event.target.value
        })
    }

    // Render a form that allows a user to create an offer on submit
    function toggleCreateForm() {
        setShowCreateForm(!showCreateForm)
    }

    // Update the offers in the offer section after a database transaction
    function refreshOffers() {
        getOffers(listingId)
            .then(newOfferData => setOffers(newOfferData))
    }

    // Execute form submission logic
    function handleSubmit(event) {
        event.preventDefault()
        // clear the form
        setCreateFormData({
            listingId: listingId,
            status: 'pending',
            offerPrice: 0,
            // expiration: new Date(),
            // listingShown: false,
            EMD: 0,
            downPayment: 0,
            loanType: '',
            loanAmount: 0,
            // proofOfFunds: false,
        })
        // close the form
        setShowCreateForm(false)
        // create the offer in the backend
        postOffer({ ...createFormData, listingId: listingId })
            .then(() => refreshOffers())
    }

    // conditionally render offers
    let offerElements = [<p key='0' className='text-center'>No offers yet</p>]
    if (offers.length > 0) {
        offerElements = offers.map(offer => {
            return <Offer
                key={offer._id}
                data={offer}
                refreshOffers={refreshOffers}
            />
        })
    }

    // conditionally display the text of the create form button
    let btnText = 'Create'
    if (showCreateForm) {
        btnText = 'Close'
    }

    return (
        <div className='comment-section bg-gray-300 rounded-t-lg p-4 pb-10 mt-4 mx-10 space-y-4 relative'>
            <h1 className='text-xl font-bold'>Offers</h1>
            <button
                onClick={toggleCreateForm}
                className="top-0 right-5 absolute text-white hover:bg-green-800 font-bold py-2 px-4 bg-green-900 rounded cursor-pointer mr-2"
            >
                {btnText}
            </button>

            {/* Conditionally render the create form */}
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
                    {/* <label htmlFor="expiration">This offer expires on: </label>
                    <input
                        name="expiration"
                        type="date"
                        className="mx-2 bg-gray-100"
                        defaultValue={createFormData.expiration}
                        onChange={handleInputChange}
                    />
                    <br /> */}
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
                    <button
                        type="submit"
                        className="text-white hover:bg-gray-800 font-bold py-2 px-4 bg-gray-700 rounded cursor-pointer mr-2">
                        Post
                    </button>
                </form>
            }

            {/* Display the value of the offerElements variable */}
            {offerElements}
        </div>
    )
}
