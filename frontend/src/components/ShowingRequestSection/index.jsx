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
        let convertedDateTime = new Date(event.target[0].value + "T" + event.target[1].value + ":00Z")
        postShowingRequest({
            ...createFormData,
            listingId: listingId,
            requestedDateTime: convertedDateTime
        })
            .then(() => refreshShowingRequests())
    }

    let showingRequestElements = [<p key='0' className='text-center'>No showing requests yet</p>]
    if (showingRequests.length > 0) {
        showingRequestElements = showingRequests.map(showingRequest => {
            return <ShowingRequest
                key={showingRequest._id}
                data={showingRequest}
                refreshShowingRequests={refreshShowingRequests}
                loginStatus={loginStatus}
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
            className="top-0 right-5 text-stone-300hover:bg-green-800 font-bold py-2 px-4 bg-green-700 rounded cursor-pointer mr-2"
            >
                {btnText}
            </button>
    }

    return (
        <div className='showingRequest-section bg-stone-600 rounded-lg p-4 pb-10 my-5 space-y-4 text-stone-300'>
            <h1 className='text-xl text-center font-bold'>Showing Requests</h1>
            {createBtn}
            {
                showCreateForm && <form
                    onSubmit={handleSubmit}
                    className="bg-stone-400 rounded-lg p-4 my-4 border-gray-700 border-2 text-center">
                    <br />
                    <label htmlFor="requestedDateTime" className="text-black">Requested date:</label><br/>
                    <input
                        name="requestedDate"
                        type="date"
                        className="mx-2 bg-gray-700 my-5"
                        onChange={handleInputChange}
                    />
                    <br/>
                    <label htmlFor="requestedDateTime" className="text-black">Requested time:</label><br/>
                    <input
                        name="requestedTime"
                        type="time"
                        className="mx-2 bg-gray-700"
                        onChange={handleInputChange}
                    />
                    <br />
                    <div className="text-center my-5">
                        <button
                            type="submit"
                            className="text-white hover:bg-gray-800 font-bold py-2 px-4 bg-gray-700 rounded cursor-pointer mr-2">
                            Submit
                        </button>
                    </div>
                </form>
            }
            {showingRequestElements}
        </div>
    )
}