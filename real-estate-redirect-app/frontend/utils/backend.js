import axios from 'axios'

//offers CRUD
export async function getOffers(listingId) {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }
    const { data } = await axios.get(`/api/offers/${listingId}`)
    return data
}

export async function postOffer(offer) {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }
    const { data } = await axios.post('/api/offers', offer)
    return data
}
export async function updateOffer(offer, offerId) {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }
    const { data } = await axios.put(`/api/offers/${offerId}`, offer)
    return data
}

export async function deleteOffer(offerId) {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }
    const { data } = await axios.delete(`/api/offers/${offerId}`)
    return data
}

//showing requests CRUD
export async function getShowingRequests(listingId) {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }
    const { data } = await axios.get(`/api/showingRequests/${listingId}`)
    return data
}

export async function postShowingRequest(showingRequest) {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }
    const { data } = await axios.post('/api/showingRequests', showingRequest)
    return data
}
export async function updateShowingRequest(showingRequest, showingRequestId) {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }
    const { data } = await axios.put(`/api/showingRequests/${showingRequestId}`, showingRequest)
    return data
}

export async function deleteShowingRequest(showingRequestId) {
    const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }
    const { data } = await axios.delete(`/api/showingRequests/${showingRequestId}`)
    return data
}

//signup & login
export async function signUp(user) {
    //code works until line below: need to add other required fields (first, last, category)
    const { data } = await axios.post('/api/users/signup', user)
    return data
}

export async function logIn(user) {
    const { data } = await axios.post('/api/users/login', user)
    return data
}