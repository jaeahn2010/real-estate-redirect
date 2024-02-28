import { useState, useEffect } from "react"
import { postOffer, getOffers } from "../../../utils/backend"
import Offer from "../Offer"

export default function offerSection({ listingId }) {
    // Save offered queried from the database in state
    const [offers, setOffers] = useState([])
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [createFormData, setCreateFormData] = useState({
        // buyerId: buyerId,
        listingId: listingId,
        status: 'pending',
        terms: {
            offerPrice: 0,
        },
    })

    // Query the database for all comments that pertain to this offer on component mount
    useEffect(() => {
        getOffers(listingId)
            .then(offers => setOffers(offers))
    }, [])

    // Update the form fields as the user types
    // function handleInputChange(event) {
    //     setCreateFormData({
    //         ...createFormData,
    //         [event.target.name]: event.target.value
    //     })
    // }
    function handleInputChange(event) {
        let newValue = ''
        if (event.target.name === "offerPrice") {
            newValue = Number(event.target.value)
        } else {
            newValue = event.target.value
        }
        setCreateFormData({
            ...createFormData,
            terms: {
                [event.target.name]: newValue
            }
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
            terms: {
                offerPrice: 0,
            },
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
                    <label htmlFor="listingId">Status:</label>
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
                        defaultValue={createFormData.terms.offerPrice}
                        onChange={handleInputChange}
                    />
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
