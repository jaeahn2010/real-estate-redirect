import { Link } from 'react-router-dom'
import heartIcon from '../../assets/heart.svg'
import './styles.css'

export default function Card({ listing, updateDetails, loginStatus }) {
    let statusColor = ""
    switch(listing.currentActivity.status) {
        case "active":
            statusColor = "green-600"
            break;
        case "under contract":
            statusColor = "yellow-400"
            break;
        case "sold":
            statusColor = "sky-500"
            break;
        case "expired":
            statusColor = "red-600"
            break;
        case "withdrawn":
            statusColor = "stone-200"
            break;
    }
    return (
        <figure className="relative mb-4 text-stone-400 break-inside-avoid-column border-2 border-stone-400 rounded-xl bg-stone-800 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <Link to={"/details/" + listing._id} onClick={() => updateDetails(listing)}>
                <div className="card-overlay absolute cursor-pointer w-full h-2/3 flex items-center justify-center bg-black rounded-t-lg z-10">
                    <p className="w-40 text-slate-50 text-3xl" id='hover-msg'>See Details</p>
                </div>
            </Link>
            <img src="/src/assets/placeholder.jpeg" className="card-image rounded-t-xl min-h-[200px] min-w-full object-cover cursor-pointer"/>          
            <figcaption className="py-2 px-2">
                <h1 className="p-2 text-center">{listing.location.address}</h1>
                <h1 className="p-2 text-center">{listing.location.city}, {listing.location.state} {listing.location.zip}</h1>
                <h1 className="p-2 text-center">${listing.currentActivity.price.toLocaleString()}</h1>
                <div className="p-2 flex justify-center items-center">
                    <p className={`px-1 rounded-3xl w-4 h-4 bg-${statusColor}`}></p>
                    <p className="px-1">{listing.currentActivity.status.toUpperCase()}</p>
                </div>
                <img src={heartIcon} className="cursor-pointer hover:transform hover:scale-125 transition-all duration-200 ease-in-out"/>
            </figcaption>
        </figure>
    )
}