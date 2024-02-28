import { useState } from "react"
import { updateOffer, deleteOffer } from "../../../utils/backend"

export default function Offer({ data, refreshOffers }) {
    const [showEditForm, setShowEditForm] = useState(false)
    const [editFormData, setEditFormData] = useState({
        id: data.id,
        listingId: data.listingId,
        status: data.status,
        // terms: data.terms
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
        // update the offer in the backend
        updateOffer(editFormData, data._id)
            .then(() => refreshOffers())
    }

    // Delete an offer
    function handleDelete() {
        deleteOffer(data._id)
            .then(() => refreshOffers())
    }

    // Change the offer to a form if the showEditForm state variable is true
    if (showEditForm) {
        return (
            <form
                onSubmit={handleSubmit}
                className="bg-gray-100 rounded-lg p-4 my-4 border-gray-700 border-2 w-[80vw] mx-auto text-right">
                {/* input for buyer id, autopopulate name/email */}
                <br />
                <input
                    name="listingId"
                    className="px-2 py-1 w-full bg-gray-100"
                    placeholder={data.listingId}
                    disabled={true}
                    value={data.listingId}
                />
                <br />
                <input
                    name="status"
                    className="px-2 py-1 w-full bg-gray-100"
                    placeholder="pending"
                    disabled={true}
                    value={data.status}
                />
                <br />
                {/* <p>Terms:</p>
                <input
                    name="offerPrice"
                    className="p-2 my-2 h-[100px] w-full bg-gray-100"
                    placeholder="Your offer price"
                    value={editFormData.terms.offerPrice}
                    onChange={handleInputChange}
                /> */}
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
                <p className="font-bold">Offer #{data.id}</p>
                <p className="my-2">for listing #{data.listingId}</p>
                <p>Status: {data.status}</p>
                {/* <p>Terms:</p>
                <p>Offer price: {data.terms.offerPrice}</p> */}
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
