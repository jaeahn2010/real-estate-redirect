import { useState, useEffect } from "react"
import { postShowingRequest, getShowingRequests } from "../../../utils/backend"
import ShowingRequest from "../ShowingRequest"

export default function showingRequestSection({ listingId }) {
    // Save showing requests queried from the database in state
    const [showingRequests, setShowingRequests] = useState([])
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [createFormData, setCreateFormData] = useState({
        // buyerId: buyerId,
        listingId: listingId,
        status: 'pending',
        requestedDateTime: new Date(),
    })

    // Query the database for all comments that pertain to this offer on component mount
    useEffect(() => {
        getShowingRequests(listingId)
            .then(showingRequests => setShowingRequests(showingRequests))
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
    function refreshShowingRequests() {
        getShowingRequests(listingId)
            .then(newShowingRequestData => setShowingRequests(newShowingRequestData))
    }

    // Execute form submission logic
    function handleSubmit(event) {
        event.preventDefault()
        // clear the form
        setCreateFormData({
            // buyerId: buyerId,
            listingId: listingId,
            status: 'pending',
            requestedDateTime: new Date()
        })
        // close the form
        setShowCreateForm(false)
        // create the showing request in the backend
        postShowingRequest({ ...createFormData, listingId: listingId })
            .then(() => refreshShowingRequests())
    }

    // conditionally render showing requests
    let showingRequestElements = [<p key='0' className='text-center'>No showing requests yet</p>]
    if (showingRequests.length > 0) {
        showingRequestElements = showingRequests.map(showingRequest => {
            return <ShowingRequest
                key={showingRequest._id}
                data={showingRequest}
                refreshShowingRequests={refreshShowingRequests}
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
            <h1 className='text-xl font-bold'>Showing Requests</h1>
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
                    <label htmlFor="requestedDateTime">Requested date & time:</label>
                    <input
                        name="requestedDateTime"
                        type="date"
                        className="mx-2 bg-gray-100"
                        defaultValue={createFormData.requestedDateTime}
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

            {/* Display the value of the showingRequestElements variable */}
            {showingRequestElements}
        </div>
    )
}
