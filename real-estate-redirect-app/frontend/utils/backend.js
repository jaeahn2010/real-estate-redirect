import axios from 'axios'

//offers CRUD
export async function getOffers(listingId) {
    const { data } = await axios.get(`/api/offers/${listingId}`)
    return data
}

export async function postOffer(offer) {
    const { data } = await axios.post('/api/offers', offer)
    return data
}
export async function updateOffer(offer, offerId) {
    const { data } = await axios.put(`/api/offers/${offerId}`, offer)
    return data
}

export async function deleteOffer(offerId) {
    const { data } = await axios.delete(`/api/offers/${offerId}`)
    return data
}

//showing requests CRUD
export async function getShowingRequests(listingId) {
    const { data } = await axios.get(`/api/showingRequests/${listingId}`)
    return data
}

export async function postShowingRequest(showingRequest) {
    const { data } = await axios.post('/api/showingRequests', showingRequest)
    return data
}
export async function updateShowingRequest(showingRequest, showingRequestId) {
    const { data } = await axios.put(`/api/showingRequests/${showingRequestId}`, showingRequest)
    return data
}

export async function deleteShowingRequest(showingRequestId) {
    const { data } = await axios.delete(`/api/showingRequests/${showingRequestId}`)
    return data
}