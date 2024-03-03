import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import AboutPage from '../AboutPage'
import NotFoundPage from '../NotFoundPage'
import HomePage from '../HomePage'
import DetailsPage from '../DetailsPage'
import AuthFormPage from '../AuthFormPage'
import './styles.css'

import { getListings } from '../../../utils/backend'

export default function App() {
  const [listings, setListings] = useState([])
  const [detailsData, setDetailsData] = useState({})
  const [loginStatus, setLoginStatus] = useState(false)
  const navigate = useNavigate()

  // don't use until api problem resolved
  // async function getData(url) {
  //   const res = await fetch(url, {
  //     mode: 'cors',
  //     headers: {
  //       'apikey': '8eaefa810fce7a9efaed84eb8b9559c9',
  //       'Accept': 'applicaton/json'
  //     }
  //   })
  //   const { property } = await res.json()
  //   setListings(listings => listings.concat(property))
  //   console.log("current list: ", listings)
  // }

  // useEffect(() => {
  //   getData("https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail?latitude=36.188110&longitude=-115.176468&radius=20&pageSize=20")
  // }, [])

  //for when seed data was in front end
  // async function getData(filteredData) {
  //   setListings(listings => listings.concat(filteredData))
  // }
  // useEffect(() => {
  //   getData(seedData)
  // }, [])

  // async function getData(url) {
  //   const res = await fetch(url)
  //   const data = await res.json()
  //   setListings(listings => listings.concat(data))
  // }

  async function getData(category, filter) {
    const data = await getListings()
    let filteredData = []
    if (category === "none") {
      filteredData = data
    } else if (category === "zip") {
      filteredData = data.filter(listing => listing.location.zip == filter)
    }
    setListings(filteredData)
    //   setListings(listings => listings.concat(data))
  }
  useEffect(() => {
    getData("none", "none")
  }, [])

  let authLink = <div className="flex lg:gap-5 md:gap-4 sm:gap-3 gap-2">
    <Link to="/auth/signup">
        <h2 className="text-white md:text-lg sm:text-md">Sign Up</h2>
    </Link>
    <Link to="/auth/login">
        <h2 className="text-white md:text-lg sm:text-md">Log In</h2>
    </Link>
  </div>

  if (loginStatus) {
    authLink = <div className="flex lg:gap-5 md:gap-4 sm:gap-3 gap-2">
      <button
          className="text-white md:text-lg sm:text-md"
          onClick={() => {
            if (confirm("Are you sure you would like to log out?")) {
              localStorage.clear()
              setLoginStatus(false)
              navigate('/')
            }
          }}>
          Log Out
      </button>
    </div>
  } else if (localStorage.userToken) {
    setLoginStatus(true)
  }

  return (
    <>
      <nav className="flex items-center justify-between h-16 bg-gray-800 shadow-lg lg:px-9 md:px-6 px-3">
        <Link to="/">
          <h1 className="text-white font-bold md:text-3xl sm:text-2xl">Real Estate Redirect</h1>
        </Link>
        <Link to="/about">
          <h2 className="text-white md:text-lg sm:text-md">About</h2>
        </Link>
        {authLink}
      </nav>
      <Routes>
        <Route path="/" element={
          <HomePage
            listings={listings}
            setListings={setListings}
            getFilteredData={getData}
            updateDetails={setDetailsData}
            loginStatus={loginStatus}
          />}
        />
        <Route path="/auth/:formType" element={<AuthFormPage setLoginStatus={setLoginStatus}/>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/details/:listingId" element={<DetailsPage listing={detailsData} loginStatus={loginStatus}/>} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}