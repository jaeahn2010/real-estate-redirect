import { useState } from 'react'
import Gallery from '../Gallery'
import './styles.css'

export default function HomePage({ listings, setListings, getFilteredData, updateDetails, loginStatus }) {
    let zipCodesList = [89002, 89005, 89011, 89012, 89014, 89015, 89030, 89031, 89032, 89044, 89052, 89054, 89074, 89081, 89084, 89086, 89087, 89101, 89102, 89103, 89104, 89106, 89107, 89108, 89109, 89110, 89113, 89115, 89117, 89118, 89119, 89120, 89121, 89122, 89123, 89124, 89128, 89129, 89130, 89131, 89134, 89135, 89138, 89139, 89141, 89142, 89143, 89144, 89145, 89146, 89147, 89148, 89149, 89156, 89158, 89161, 89166, 89169, 89178, 89179, 89183, 89191]
    let zipCodeOptions = []
    for (let zip of zipCodesList) {
        zipCodeOptions.push(<option key={zip} value={zip}>{zip}</option>)
    }
    const [zipCode, setZipCode] = useState('none')
    const [address, setAddress] = useState('none')

    function handleSubmit(evt) {
        evt.preventDefault()
        setListings([])
        if (zipCode !== "none") getFilteredData("zip", zipCode)
        if (address !== "none") getFilteredData("address", address)
        if (zipCode === "none" && address === "none") getFilteredData("none", "none")
    }
    
    return (
        <main className="rer-font-body text-stone-400">
            <h1 className="mt-5 text-center md:text-3xl text-2xl font-bold">Real estate Redirect</h1>
            <h2 className="text-center md:text-xl text-lg font-semibold italic">A platform for home buyers and sellers to communicate directly and save on commissions</h2>
            <br />
            <h3 className="text-center text-lg font-bold">Browse the gallery below!</h3>
            <div className="border-white border-2 rounded-xl bg-stone-800 py-10 m-5">
                <p className="text-center mb-10 underline">SEARCH CRITERIA</p>
                <form onSubmit={handleSubmit} className="mt-4 text-center lg:flex lg:justify-around lg:items-center">
                    <div>
                        <label htmlFor="zip-code" className="zip-label text-stone-400">Zip code:</label>
                        <select
                            className="mx-5"
                            name="zip-code" 
                            id="zip-code"
                            defaultValue='none'
                            onChange={event => setZipCode(event.target.value)}>
                            <option key='0' value='none' disabled>Select a zip code</option>
                            {zipCodeOptions}
                        </select>
                    </div>
                    <div className="flex justify-center">
                        <label htmlFor="address" className="street-label text-stone-400">Street name:</label>
                        <input
                            className="mx-3"
                            name="address"
                            id="address"
                            defaultValue=""
                            placeholder="Search by street name"
                            onChange={event => setAddress(event.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="submit-btn box-border mx-1 px-3 py-[6px] text-lg text-white border-2 border-gray-700 rounded-lg font-semibold bg-sky-700 hover:bg-sky-500 transition-all duration-200 ease-in-out">
                        Search
                    </button>
                </form>
            </div>

            <Gallery 
                zipCode={zipCode}
                listings={listings}
                getFilteredData={getFilteredData}
                updateDetails={updateDetails}
                loginStatus={loginStatus}
            />
        </main>
    )
}