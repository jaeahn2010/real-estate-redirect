import { useState, useEffect } from 'react'
import { Routes, Route, Link } from "react-router-dom"
import AboutPage from '../AboutPage'
import NotFoundPage from '../NotFoundPage'
import HomePage from '../HomePage'
import Gallery from '../Gallery'
import Card from '../Card'
import DetailsPage from '../DetailsPage'
import './styles.css'

export default function App() {
  const [listings, setListings] = useState([])
  const [detailsData, setDetailsData] = useState({})
  async function getData(url) {
    const res = await fetch(url, {
      mode: 'cors',
      headers: {
        'apikey': '8eaefa810fce7a9efaed84eb8b9559c9',
        'Accept': 'applicaton/json'
      }
    })
    const { property } = await res.json()
    setListings(listings => listings.concat(property))
    console.log("current list: ", listings)
  }

  useEffect(() => {
    getData("https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail?latitude=36.188110&longitude=-115.176468&radius=20&pageSize=20")
  }, [])

  return (
    <>
      <nav className="flex items-center justify-between h-16 bg-gray-800 shadow-lg lg:px-9 md:px-6 px-3">
        <Link to="/">
          <h1 className="text-white font-bold md:text-3xl sm:text-2xl">Real Estate Redirect</h1>
        </Link>
        <Link to="/about">
          <h2 className="text-white md:text-lg sm:text-md">About</h2>
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={
          <HomePage
            listings={listings}
            refreshQueue={getData}
            setListings={setListings}
            updateDetails={setDetailsData}
          />}
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/details/:listingId" element={<DetailsPage listing={detailsData} />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}
