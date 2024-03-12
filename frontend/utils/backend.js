import axios from 'axios'

//offers CRUD
export async function getOffers(listingId) {
    const { data } = await axios.get(`/api/offers/${listingId}`)
    return data
}

export async function postOffer(offer) {
    const authHeader = { headers: {
        'Authorization': localStorage.getItem('userToken'),
        'Content-Type': 'multipart/form-data'
    } }
    const { data } = await axios.post('/api/offers', offer, authHeader)
    return data
}
export async function updateOffer(offer, offerId) {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }
    const { data } = await axios.put(`/api/offers/${offerId}`, offer, authHeader)
    return data
}

export async function deleteOffer(offerId) {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }
    const { data } = await axios.delete(`/api/offers/${offerId}`, authHeader)
    return data
}

//showing requests CRUD
export async function getShowingRequests(listingId) {
    const { data } = await axios.get(`/api/showingRequests/${listingId}`)
    return data
}

export async function postShowingRequest(showingRequest) {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }
    try {
        const { data } = await axios.post('/api/showingRequests', showingRequest, authHeader)
        return data
    } catch(err) {
        alert(err.response.data.message)
    }
}
export async function updateShowingRequest(showingRequest, showingRequestId) {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }
    const { data } = await axios.put(`/api/showingRequests/${showingRequestId}`, showingRequest, authHeader)
    return data
}

export async function deleteShowingRequest(showingRequestId) {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }
    const { data } = await axios.delete(`/api/showingRequests/${showingRequestId}`, authHeader)
    return data
}

//listings CRUD
export async function getListings() {
    const { data } = await axios.get(`/api/listings`)
    return data
}

export async function getListingById(listingId) {
    const { data } = await axios.get(`/api/listings/${listingId}`)
    return data
}

export async function postListing(listing) {
    const authHeader = { headers: { 
        'Authorization': localStorage.getItem('userToken'),
        'Content-Type': 'multipart/form-data'
    } }
    
    const { data } = await axios.post('/api/listings', listing, authHeader)
    return data
}
export async function updateListing(listing, listingId) {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }
    const { data } = await axios.put(`/api/listings/${listingId}`, listing, authHeader)
    return data
}

export async function deleteListing(listingId) {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }
    const { data } = await axios.delete(`/api/listings/${listingId}`, authHeader)
    return data
}

//signup & login
export async function signUp(user) {
    const { data } = await axios.post('/api/users/signup', user)
    return data
}

export async function logIn(user) {
    const { data } = await axios.post('/api/users/login', user)
    return data
}

//find user by id
export async function getUser(userId) {
    const { data } = await axios.get(`/api/users/${userId}`)
    return data
}

//find current user by token - need to find alternative method, probably not secure
export async function getUserByToken() {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }
    const { data } = await axios.get(`/api/users/token`, authHeader)
    return data
}