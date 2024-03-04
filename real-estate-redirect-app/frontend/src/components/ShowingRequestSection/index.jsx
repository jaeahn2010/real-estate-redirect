import { useState, useEffect } from "react"
import { postShowingRequest, getShowingRequests } from "../../../utils/backend"
import ShowingRequest from "../ShowingRequest"

export default function ShowingRequestSection({ listingId, loginStatus }) {
    const [showingRequests, setShowingRequests] = useState([])
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [createFormData, setCreateFormData] = useState({
        userId: localStorage.getItem("userToken"),
        listingId: listingId,
        status: 'pending',
        requestedDateTime: new Date(),
    })

    useEffect(() => {
        getShowingRequests(listingId)
            .then(showingRequests => setShowingRequests(showingRequests))
    }, [])

    function handleInputChange(event) {
        console.log(event.target.value)
        setCreateFormData({
            ...createFormData,
            [event.target.name]: event.target.value
        })
    }

    function toggleCreateForm() {
        setShowCreateForm(!showCreateForm)
    }

    function refreshShowingRequests() {
        getShowingRequests(listingId)
            .then(newShowingRequestData => setShowingRequests(newShowingRequestData))
    }

    function handleSubmit(event) {
        event.preventDefault()
        setCreateFormData({
            userId: localStorage.getItem("userToken"),
            listingId: listingId,
            status: 'pending',
            requestedDateTime: new Date()
        })
        setShowCreateForm(false)
        let convertedDateTime = new Date(event.target[2].value + "T" + event.target[3].value + ":00Z")
        postShowingRequest({ ...createFormData, listingId: listingId, convertedDateTime: convertedDateTime })
            .then(() => refreshShowingRequests())
    }

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

    let createBtn
    if (loginStatus && localStorage.userCategory === "buyer") {
        let btnText = 'Request a Showing'
        if (showCreateForm) btnText = 'Close'
        createBtn = 
            <button
            onClick={toggleCreateForm}
            className="top-0 right-5 absolute text-stone-300hover:bg-green-800 font-bold py-2 px-4 bg-green-700 rounded cursor-pointer mr-2"
            >
                {btnText}
            </button>
    }

    return (
        <div className='showingRequest-section bg-stone-600 rounded-lg p-4 pb-10 my-5 mx-10 space-y-4 relative text-stone-300'>
            <h1 className='text-xl font-bold'>Showing Requests</h1>
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
                    <label htmlFor="requestedDateTime">Requested date:</label>
                    <input
                        name="requestedDate"
                        type="date"
                        className="mx-2 bg-gray-100"
                        onChange={handleInputChange}
                    />
                    <br/>
                    <label htmlFor="requestedDateTime">Requested time:</label>
                    <input
                        name="requestedTime"
                        type="time"
                        className="mx-2 bg-gray-100"
                        onChange={handleInputChange}
                    />
                    <br />
                    <button
                        type="submit"
                        className="text-white hover:bg-gray-800 font-bold py-2 px-4 bg-gray-700 rounded cursor-pointer mr-2">
                        Submit
                    </button>
                </form>
            }
            {showingRequestElements}
        </div>
    )
}