import { useState, useEffect } from "react"
import { updateShowingRequest, deleteShowingRequest, getUser } from "../../../utils/backend"

export default function ShowingRequest({ data, refreshShowingRequests, loginStatus }) {
    const [currentUserToken, setCurrentUserToken] = useState('')
    const [offerUserToken, setOfferUserToken] = useState('')
    const [showEditForm, setShowEditForm] = useState(false)
    const [editFormData, setEditFormData] = useState({
        showingRequestId: data._id,
        userId: data.userId,
        listingId: data.listingId,
        status: data.status,
        requestedDateTime: data.requestedDateTime,
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
        updateShowingRequest(editFormData, data._id)
            .then(() => refreshShowingRequests())
    }

    function handleDelete() {
        deleteShowingRequest(data._id)
            .then(() => refreshShowingRequests())
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
                <label htmlFor="requestedDateTime">Requested Date & Time</label>
                <input
                    name="requestedDateTime"
                    type="date"
                    className="mx-2 bg-gray-100"
                    defaultValue={data.requestedDateTime}
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
                        Submit Changes
                    </button>
                </div>
            </form>
        )
    } else {
        function dateDisplay(dateStr) {
            let dateObj = new Date(dateStr)
            let ampm = ''
            let hourDisplay = 0
            if (dateObj.getHours() > 12) {
                ampm = "PM"
                hourDisplay = dateObj.getHours() - 12
            } else {
                ampm = dateObj.getHours === 12 ? 'PM' : 'AM'
                hourDisplay = dateObj.getHours()
            }
            function timeDisplay(time) {
                return time < 10 ? `0${String(time)}` : String(time)
            }
            return `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()} ${timeDisplay(hourDisplay)}:${timeDisplay(dateObj.getMinutes())} ${ampm}`
        }
        return (
            <div
                className="bg-gray-100 rounded-lg p-4 my-4 border-gray-700 border-2 w-[80vw] mx-auto">
                <p className="font-bold">Showing Request from {data.userId}</p>
                <p className="my-2">for listing #{data.listingId}</p>
                <p>Status: {data.status}</p>
                <p>Requested date & time: {dateDisplay(data.requestedDateTime)}</p>
                {btns}
            </div>
        )
    }
}