import { useState } from "react"
import { updateOffer, deleteOffer } from "../../../utils/backend"

export default function Offer({ data, refreshOffers }) {
    const [showEditForm, setShowEditForm] = useState(false)
    const [editFormData, setEditFormData] = useState({
        id: data._id,
        listingId: data.listingId,
        status: data.status,
        // expiration: data.terms.expiration,
        // listingShown: data.terms.listingShown,
        EMD: data.terms.EMD,
        downPayment: data.terms.downPayment,
        loanType: data.terms.loanType,
        loanAmount: data.terms.loanAmount,
        // proofOfFunds: data.terms.proofOfFunds,
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
                <label htmlFor="listingId">Status:</label>
                <input
                    name="status"
                    className="pl-2 bg-gray-100"
                    defaultValue={data.status}
                />
                <br />
                <p>Terms of the counteroffer (if any):</p>
                <label htmlFor="offerPrice">Your offer price: $</label>
                <input
                    name="offerPrice"
                    className="mx-2 bg-gray-100"
                    defaultValue={data.terms.offerPrice}
                    onChange={handleInputChange}
                />
                <br />
                    {/* <label htmlFor="expiration">This offer expires on: </label>
                    <input
                        name="expiration"
                        type="date"
                        className="mx-2 bg-gray-100"
                        defaultValue={data.terms.expiration}
                        onChange={handleInputChange}
                    />
                    <br /> */}
                    {/* <label htmlFor="listingShown">Have you already seen the property in person?</label>
                    <input
                        name="listingShown"
                        type="text" //change to boolean
                        className="mx-2 bg-gray-100"
                        placeholder="Y / N"
                        defaultValue={data.terms.listingShown}
                        onChange={handleInputChange}
                    /> */}
                    <label htmlFor="EMD">Earnest money deposit: $</label>
                    <input
                        name="EMD"
                        type="number"
                        className="mx-2 bg-gray-100"
                        defaultValue={data.terms.EMD}
                        onChange={handleInputChange}
                    />
                    <br />
                    <label htmlFor="downPayment">Down payment: $</label>
                    <input
                        name="downPayment"
                        type="number"
                        className="mx-2 bg-gray-100"
                        defaultValue={data.terms.downPayment}
                        onChange={handleInputChange}
                    />
                    <br />
                    <label htmlFor="loanType">Loan type: </label>
                    <input
                        name="loanType"
                        type="text"
                        className="mx-2 bg-gray-100"
                        defaultValue={data.terms.loanType}
                        onChange={handleInputChange}
                    />
                    <br />
                    <label htmlFor="loanAmount">Loan amount: $</label>
                    <input
                        name="loanAmount"
                        type="number"
                        className="mx-2 bg-gray-100"
                        defaultValue={data.terms.loanAmount}
                        onChange={handleInputChange}
                    />
                    <br />
                    {/* <label htmlFor="proofOfFunds">Upload your proof of funds or preapproval letter here: $</label>
                    <input
                        name="proofOfFunds"
                        type="file"
                        className="mx-2 bg-gray-100"
                        defaultValue={editFormData.terms.proofOfFunds}
                        onChange={handleInputChange}
                    /> */}
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
                <p className="font-bold">Offer #{data._id}</p>
                <p className="my-2">for listing #{data.listingId}</p>
                <p>Status: {data.status}</p>
                <p>Terms:</p>
                <p>Offer price: ${data.terms.offerPrice}</p>
                {/* <p>Offer expires on: ${data.terms.expiration}</p> */}
                {/* <p>Buyer has seen the property? ${data.terms.listingShown}</p> */}
                <p>Earnest money deposit: ${data.terms.EMD}</p>
                <p>Down payment: ${data.terms.downPayment}</p>
                <p>Loan type: {data.terms.loanType}</p>
                <p>Loan amount: ${data.terms.loanAmount}</p>
                {/* <p>Proof of funds: ${data.terms.proofOfFunds}</p> */}
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
