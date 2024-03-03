import { useState } from 'react'
import Gallery from '../Gallery'

export default function HomePage({ listings, setListings, getFilteredData, updateDetails, loginStatus }) {
    let zipCodesList = [89002, 89011, 89012, 89014, 89015, 89030, 89031, 89032, 89044, 89052, 89054, 89074, 89081, 89084, 89086, 89087, 89101, 89102, 89103, 89104, 89106, 89107, 89108, 89109, 89110, 89113, 89115, 89117, 89118, 89119, 89120, 89121, 89122, 89123, 89124, 89128, 89129, 89130, 89131, 89134, 89135, 89138, 89139, 89141, 89142, 89143, 89144, 89145, 89146, 89147, 89148, 89149, 89156, 89158, 89161, 89166, 89169, 89178, 89179, 89183, 89191]
    let zipCodeOptions = []
    for (let zip of zipCodesList) {
        zipCodeOptions.push(<option key={zip} value={zip}>{zip}</option>)
    }
    const [zipCode, setZipCode] = useState(0)
    
    // don't use until api problem resolved
    // function handleSubmit(event) {
    //     event.preventDefault()
    //     setListings([])
    //     refreshQueue(`https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/address?postalcode=${zipCode}&page=1&pageSize=20`)
    // }

    function handleSubmit(evt) {
        evt.preventDefault()
        setListings([])
        getFilteredData("zip", zipCode)
    }
    
    return (
        <main className="text-stone-400">
            <h1 className="mt-5 text-center md:text-3xl text-2xl font-bold">Real estate Redirect</h1>
            <h2 className="text-center md:text-xl text-lg font-semibold italic">A platform for home buyers and sellers to communicate directly and save on commissions</h2>
            <br />
            <h3 className="text-center text-lg font-bold">Browse the gallery below!</h3>
            <div className="pb-10">
                <p className="text-center">SEARCH CRITERIA</p>
                <form onSubmit={handleSubmit} className="mt-4 text-center">
                    <label htmlFor="zip-code" className="text-stone-400">Zip code:</label>
                    <select
                        name="zip-code" 
                        id="zip-code"
                        defaultValue='0'
                        onChange={event => setZipCode(event.target.value)}>
                        <option key='0' value='0' disabled>Select a zip code</option>
                        {zipCodeOptions}
                    </select>
                    <button
                        type="submit"
                        className="box-border mx-1 px-3 py-[6px] text-lg border-2 border-gray-700 rounded-lg font-semibold hover:bg-gray-700 hover:opacity-70 transition-all duration-200 ease-in-out">
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