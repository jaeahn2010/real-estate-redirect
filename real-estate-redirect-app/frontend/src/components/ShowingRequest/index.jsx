import { useState } from "react"
import { updateShowingRequest, deleteShowingRequest } from "../../../utils/backend"

export default function ShowingRequest({ data, refreshShowingRequests }) {
    const [showEditForm, setShowEditForm] = useState(false)
    const [editFormData, setEditFormData] = useState({
        showingRequestId: data._id,
        listingId: data.listingId,
        status: data.status,
        requestedDateTime: data.requestedDateTime,
    })

    // Update the form fields as the user types
    function handleInputChange(event) {
        setEditFormData({
            ...editFormData,
            [event.target.name]: event.target.value
        })
    }

    // Execute form submission logic
    function handleSubmit(event) {
        event.preventDefault()
        // close the form
        setShowEditForm(false)
        // update the showing request in the backend
        updateShowingRequest(editFormData, data._id)
            .then(() => refreshShowingRequests())
    }

    // Delete a showing request
    function handleDelete() {
        deleteShowingRequest(data._id)
            .then(() => refreshShowingRequests())
    }

    // Change the showing request to a form if the showEditForm state variable is true
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
                        Post
                    </button>
                </div>
            </form>
        )

        //  Default JSX of each comment
    } else {
        return (
            <div
                className="bg-gray-100 rounded-lg p-4 my-4 border-gray-700 border-2 w-[80vw] mx-auto">
                <p className="font-bold">Showing Request #{data._id}</p>
                <p className="my-2">for listing #{data.listingId}</p>
                <p>Status: {data.status}</p>
                <p>Requested date & time: {data.requestedDateTime}</p>
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
            </div>
        )
    }
}