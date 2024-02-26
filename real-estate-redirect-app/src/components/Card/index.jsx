import heartIcon from '../../assets/heart.svg'
import './styles.css'

export default function Card({ listing, updateDetails }) {
    return (
        <figure className="relative mb-4 break-inside-avoid-column border-2 border-black rounded-xl bg-sky-100 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <div onClick={() => 
                updateDetails(listing)} className="card-overlay absolute cursor-pointer w-full flex items-center justify-center bg-black rounded-t-lg z-10">
                <p className="w-40 text-slate-50 text-3xl" id='hover-msg'>See Details</p>
            </div>

            <img src="/src/assets/placeholder.jpeg" className="card-image rounded-t-xl min-h-[200px] min-w-full object-cover cursor-pointer"/>          
            <figcaption className="py-2 px-2">
                <h1 className="p-2 text-center">{listing.address.line1}</h1>
                <h1 className="p-2 text-center">{listing.address.line2}</h1>
                <img src={heartIcon} className="cursor-pointer hover:transform hover:scale-125 transition-all duration-200 ease-in-out"/>
            </figcaption>
        </figure>
    )
}
