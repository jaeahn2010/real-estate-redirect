import Gallery from '../Gallery'

export default function HomePage(props) {
    return (
        <>
            <h1 className="mt-5 text-center md:text-3xl text-2xl font-bold">Real estate Redirect</h1>
            <h2 className="text-center md:text-xl text-lg font-semibold italic">A platform for home buyers and sellers to communicate directly and save on commissions</h2>
            <br />
            <h3 className="text-center text-lg font-bold">Browse the gallery below!</h3>

            <Gallery {...props}/>
        </>
    )
}
