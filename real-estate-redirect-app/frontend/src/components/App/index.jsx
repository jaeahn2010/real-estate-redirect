import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import AboutPage from '../AboutPage'
import NotFoundPage from '../NotFoundPage'
import HomePage from '../HomePage'
import DetailsPage from '../DetailsPage'
import AuthFormPage from '../AuthFormPage'
import SellerProfilePage from '../SellerProfilePage'
// import BuyerProfilePage from '../BuyerProfilePage'
import './styles.css'
import { getListings, getUserByToken } from '../../../utils/backend'

export default function App() {
  const [username, setUsername] = useState('')
  const [listings, setListings] = useState([])
  const [detailsData, setDetailsData] = useState({})
  const [loginStatus, setLoginStatus] = useState(false)
  const navigate = useNavigate()

  async function getData(category, filter) {
    const data = await getListings()
    let filteredData = []
    if (category === "none") {
      filteredData = data
    } else if (category === "zip") {
      filteredData = data.filter(listing => listing.location.zip == filter)
    } else if (category === "userToken" && filter === "none") {
      const currentUserData = await getUserByToken()
      filteredData = data.filter(listing => {
        if (listing.homeowner.includes(currentUserData.userId)) return listing
      })
    }
    setListings(filteredData)
    return filteredData
  }

  async function getUserData() {
    const currentUserData = await getUserByToken()
    setUsername(`${currentUserData.firstName} ${currentUserData.lastName}`)
  }
  
  useEffect(() => {
    getData("none", "none")
    if (loginStatus) getUserData()
  }, [])

  useEffect(() => {
    getData("none", "none")
  }, [loginStatus])

  let authLink = <div className="flex lg:gap-5 md:gap-4 sm:gap-3 gap-2">
    <Link to="/auth/signup">
        <h2 className="text-white md:text-lg sm:text-md">Sign Up</h2>
    </Link>
    <Link to="/auth/login">
        <h2 className="text-white md:text-lg sm:text-md">Log In</h2>
    </Link>
  </div>
  let profileLink = ''
  let userGreeting = ''

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
    userGreeting = <h1 className="bg-stone-700 z-10 text-white text-right text-sm sticky top-0">Hello, {username}!</h1>
    if (localStorage.getItem("userCategory") === "seller") {
      profileLink = <div className="flex lg:gap-5 md:gap-4 sm:gap-3 gap-2">
      <Link to={"/sellerProfile/" + localStorage.getItem("userToken")}>
          <h2 className="text-white md:text-lg sm:text-md">My Seller Profile</h2>
      </Link>
    </div>
    } else {
      profileLink = <div className="flex lg:gap-5 md:gap-4 sm:gap-3 gap-2">
      <Link to="/buyerProfile">
          <h2 className="text-white md:text-lg sm:text-md">My Buyer Profile</h2>
      </Link>
    </div>
    }
  } else if (localStorage.userToken) {
    setLoginStatus(true)
  }

  return (
    <>
      <nav className="rer-font-nav flex items-center justify-between h-16 bg-gray-800 shadow-lg lg:px-9 md:px-6 px-3">
        <Link to="/" onClick={(evt) => {
          getData("none", "none")
        }}>
          <h1 className="text-white font-bold md:text-3xl sm:text-2xl">Real Estate Redirect</h1>
        </Link>
        <Link to="/about">
          <h2 className="text-white md:text-lg sm:text-md">About</h2>
        </Link>
        {profileLink}
        {authLink}
      </nav>
      {userGreeting}
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
        <Route path="/sellerProfile/:userId" element={
          <SellerProfilePage
            loginStatus={loginStatus}
            listings={listings}
            setListings={setListings}
            getFilteredData={getData}
            updateDetails={setDetailsData}
          />}
        />
        <Route path="/auth/:formType" element={
          <AuthFormPage
            setLoginStatus={setLoginStatus}
          />}
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/details/:listingId" element={<DetailsPage listing={detailsData} loginStatus={loginStatus}/>} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}