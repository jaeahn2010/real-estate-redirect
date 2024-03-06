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
        if (localStorage.userCategory === 'buyer') {
            let convertedDateTime = new Date(event.target[0].value + "T" + event.target[1].value + ":00Z")
            setEditFormData({...editFormData, requestedDateTime: convertedDateTime})
            updateShowingRequest(editFormData, data._id)
                .then(() => refreshShowingRequests())
        } else {
            if (event.target[0].checked) {
                alert("You have approved this showing request.")
                setEditFormData({...editFormData, status: "approved"})
            } else if (event.target[1].checked) {
                alert("You have denied this showing request.")
                setEditFormData({...editFormData, status: "denied"})
            }
            updateShowingRequest(editFormData, data._id)
                .then(() => refreshShowingRequests)
        }
    }

    function handleDelete() {
        if (confirm("Are you sure you would like to delete this showing request?")) {
            deleteShowingRequest(data._id)
                .then(() => refreshShowingRequests())
        }
    }

    let btns = ''
    let buyerIdDisplay = " Buyer **********" + data.userId.slice(-6)
    let showingRequestForm = ''
    //only display edit/delete buttons if user is logged in & showing request is their own
    if (loginStatus && currentUserToken === offerUserToken && localStorage.userCategory === 'buyer') {
        buyerIdDisplay += " (Your request)"
        showingRequestForm = 
        <form
            onSubmit={handleSubmit}
            className="bg-stone-400 rounded-lg p-4 my-4 border-gray-700 border-2">
            <br />
            <label htmlFor="requestedDateTime" className="text-black">Requested date: </label>
            <input
                name="requestedDate"
                type="date"
                className="mx-2 bg-gray-700"
                onChange={handleInputChange}
            />
            <br/>
            <br/>
                <label htmlFor="requestedDateTime" className="text-black">Requested time:</label>
                <input
                    name="requestedTime"
                    type="time"
                    className="mx-2 bg-gray-700"
                    onChange={handleInputChange}
                />
            <div className="flex justify-center my-5">
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
            <div className="flex justify-center my-5">
                <button
                    onClick={() => { setShowEditForm(true) }}
                    className="text-white hover:bg-gray-800 font-bold py-2 px-4 bg-gray-700 rounded cursor-pointer mr-2">
                    Edit Request
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded">
                    Delete Request
                </button>
            </div>
    } else if (loginStatus && localStorage.userCategory === 'seller') {
        showingRequestForm = 
        <form
            onSubmit={handleSubmit}
            className="text-black seller-request-form bg-stone-400 rounded-lg p-4 my-4 border-gray-700 border-2">
            <input
                name="status"
                id="approve"
                type="radio"
                defaultValue="approved"
                onChange={handleInputChange}
            />
            <label htmlFor="approve">Approve</label><br/>
            <input
                name="status"
                id="deny"
                type="radio"
                defaultValue="denied"
                onChange={handleInputChange}
            />
            <label htmlFor="deny">Deny</label>
            <div className="text-center my-3">
                <button
                    onClick={() => { setShowEditForm(false) }}
                    className="my-3 text-white hover:bg-gray-800 font-bold py-2 px-4 bg-gray-700 rounded cursor-pointer mr-2">
                    Close
                </button>
                <button
                    type="submit"
                    className="my-3 text-white hover:bg-gray-800 font-bold py-2 px-4 bg-gray-700 rounded cursor-pointer mr-2">
                    Submit Response
                </button>
            </div>
        </form>
        btns = 
            <div className="text-center">
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
                {showingRequestForm}
                {btns}
            </>
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
                className="bg-stone-400 rounded-lg p-4 my-4 border-stone-700 border-2">
                <p className="!text-black font-bold">Showing Request from {buyerIdDisplay}</p>
                <br/>
                <p className="!text-black">Status: {data.status}</p><br/>
                <p className="!text-black">Requested date & time: {dateDisplay(data.requestedDateTime)}</p>
                {btns}
            </div>
        )
    }
}