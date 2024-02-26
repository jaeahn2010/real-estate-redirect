import { useState, useEffect } from 'react'
import Gallery from '../Gallery'
import Card from '../Card'
import './styles.css'

export default function App() {
  const [listings, setListings] = useState([])

  async function getData(url) {
    const res = await fetch(url, {
      mode: 'cors',
      headers: {
        'apikey': '8eaefa810fce7a9efaed84eb8b9559c9',
        'Accept': 'applicaton/json'
      }
    })
    const { property } = await res.json()
    console.log(property)
    setListings(listings.concat(property))
  }

  useEffect(() => {
    getData("https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail?latitude=36.188110&longitude=-115.176468&radius=20&pageSize=20")
  }, [])

  return (
    <>
      <h1 className="text-6xl text-center">Real Estate Redirect</h1>
      <Gallery listings={listings} refreshQueue={getData}/>
    </>
  )
}
