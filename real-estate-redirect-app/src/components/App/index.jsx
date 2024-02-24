import { useEffect } from 'react'
import './styles.css'

export default function App() {
  useEffect(() => {

    async function getData() {
      const res = await fetch("https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/detail?address1=4529%20Winona%20Court&address2=Denver%2C%20CO", {
        mode: 'cors',
        headers: {
          'apikey': '8eaefa810fce7a9efaed84eb8b9559c9',
          'User-Agent': 'real-estate-redirect-app',
          'Accept': '*/*'
        }
      })
      const property = await res.json()
      console.log(property)
    }

    getData()
  }, [])

  return <h1>Real Estate Redirect</h1>
}
