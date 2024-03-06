# real-estate-redirect
MERN full-stack app to facilitate seller-buyer real estate transaction

# How to navigate this website

Please click the link below to be redirected to the website.
[Real Estate Redirect (RER)](https://real-estate-redirect-b5a52228fa63.herokuapp.com)
![home page](README-screenshots/Screenshot%202024-03-05%20at%2017.47.42.png)

## List of technologies used
![html](https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white)
![css](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)
![js](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![mongodb](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)
![jwt](https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink)

## Installation instructions
- None required

## User stories
- As a potential employer, I want to view this candidate's project and analyze their proficiency in making a fully functioning MERN full-stack application, so that I can make a clear decision whether he is fit for our company or not. I also want to determine the usefulness of this application so that I can determine whether this potential employee is fit to tackle and solve real-world problems.
- As a seller, I want to be able to post my house for sale and have a platform to clearly and easily communicate/negotiate directly with buyers and review their offers and showing requests, without having to rely on an agent.
- As a buyer, I want to be able to see available listings in my area, save some of them as favorites, and have a platform that can fill in a complicated offer/contract form in a user-friendly way, as well as facilitate scheduling showings for me, all to be directly reviewed by the seller, without having to rely on an agent.

## What to expect from this website

### The home page
![homePage](README-screenshots/Screenshot%202024-03-05%20at%2017.47.42.png)

The home page will show a gallery of available listings of sellers that have chosen to use this platform to sell their real estate. The gallery is visible to every user, and the user can click the "see details" button to see details about each property. Continue scrolling, and the page will continue to load until it reaches the end of the database.

![detailPage](README-screenshots/Screenshot%202024-03-05%20at%2017.48.03.png)

However, as shown on the bottom of the details page, a user must be logged in to interact with the listings.

![detailPageWarn](README-screenshots/Screenshot%202024-03-05%20at%2017.48.12.png)

Back on the home page, a user may filter their search either by zip code or the street name (case-insensitive).

![zipSearch](README-screenshots/Screenshot%202024-03-05%20at%2017.50.23.png)
![nameSearch](README-screenshots/Screenshot%202024-03-05%20at%2017.50.43.png)

A user can either sign up for a new account or log in to an existing account by clicking the "sign up" or the "log in" link on the top right corner.
![signup](README-screenshots/Screenshot%202024-03-05%20at%2017.51.26.png)
![login](README-screenshots/Screenshot%202024-03-05%20at%2017.51.47.png)

If signed up and logged in as a buyer, the user can now click the "see details" button on any property, scroll to the bottom, and either make an offer and/or request a showing for the particular property.
![offerShowingRequestSection](README-screenshots/Screenshot%202024-03-05%20at%2017.52.31.png)

The user can click the "Make an offer" button to start filling out the form to make an offer for the selected property. As a buyer, the user will be required to upload a proof of funds or a preapproval letter to be reviewed by the seller, alongside the offer.
![makeOffer](README-screenshots/Screenshot%202024-03-05%20at%2017.53.15.png)

Once the user has submitted an offer, it will automatically be assigned the status of "pending" until the seller accepts or rejects the offer. The buyer has the option to edit or delete this offer in the meantime; notice that the edit/delete buttons are only available for the offers that belong to the logged in buyer.
![editDeleteBtns1](README-screenshots/Screenshot%202024-03-05%20at%2017.53.48.png)

Clicking the "edit this offer" button will pull up a form where the buyer may edit any of the information previously submitted.
![editOffer](README-screenshots/Screenshot%202024-03-05%20at%2017.54.06.png)

Clicking the "delete this offer" button will pop up a confirm window where the buyer may make the final decision to withdraw this offer or not.
![deleteOffer](README-screenshots/Screenshot%202024-03-05%20at%2017.54.20.png)

Similar operation can be done with a showing request. A buyer may create, edit, or delete a showing request for any given property. It will also be assigned a status of "pending" until the seller approves or denies the request.
![makeShowingRequest](README-screenshots/Screenshot%202024-03-05%20at%2017.54.41.png)
![editDeleteBtns2](README-screenshots/Screenshot%202024-03-05%20at%2017.55.02.png)
![editShowingRequest](README-screenshots/Screenshot%202024-03-05%20at%2017.55.16.png)
![deleteShowingRequest](README-screenshots/Screenshot%202024-03-05%20at%2017.55.22.png)

If a user logs in as a seller, the "My Seller Profile" link will appear on the nav bar above.
![sellerProfilePageBtn](README-screenshots/Screenshot%202024-03-05%20at%2017.56.08.png)

Upon clicking this "My Seller Profile" button, the seller may view their history of listings in one place. 
![sellerProfilePage](README-screenshots/Screenshot%202024-03-05%20at%2017.56.46.png)

Clicking the green "Put a new listing on the market" button, the seller may fill out the given form to upload a new listing to this database, to be made available for potential showings and offers.
![newListing](README-screenshots/Screenshot%202024-03-05%20at%2017.57.00.png)

The seller may also edit or delete any of their listings anytime.
![editListing](README-screenshots/Screenshot%202024-03-05%20at%2017.57.20.png)
![deleteListing](README-screenshots/Screenshot%202024-03-05%20at%2017.57.32.png)

If there are any showing requests or offers made by any buyers on the seller's listing, the seller has the option to approve or deny the requests. Once the response has been submitted, the status will change accordingly.
![approveDenyShowingRequest](README-screenshots/Screenshot%202024-03-05%20at%2017.58.22.png)
![statusChange1](README-screenshots/Screenshot%202024-03-05%20at%2017.58.13.png)
![acceptRejectOffer](README-screenshots/Screenshot%202024-03-05%20at%2017.59.42.png)
![statusChange2](README-screenshots/Screenshot%202024-03-05%20at%2017.59.52.png)

## Unsolved problems and major hurdles
- The website is functional, but doesn't have much use in the real world yet. Much more needs to be incorporated in order for a real estate trasaction to securely take place.
- Two major hurdles are as follows:
    - Making sure each component has exactly the properties it needs: in many places, the code repeats itself or becomes confusing to keep track of, especially because there are some parent/child complexity in this app.
    - Keeping track of who has what kind of authorization: conditional rendering was used extensively for almost all components in order to keep separate what's visible to a buyer, a seller, or a user who is not logged in. This often contributed to the messy code.

## Next steps for this project
- Incorporate ATTOM API
    - I unfortunately misunderstood the terms of the free trial for this API, and ran out out free data well before the project presentation. Once it reaches a level where real users may use this app, this API will be incorporated again - publicly available property details will then be able to auto-populate when a seller uploads a new listing.
- Auto-contract & Auto-email (with tools such as Nodemailer)
    - Once a seller accepts a buyer's offer, the site should lock them in a legal real estate contract, and be the third party that keeps both of them within deadlines, automatically asking them in a timely manner to upload necessary documents, schedule events (inspections, appraisals, signing, walkthrough, closing, etc.), and email one another notices and aforementioned documents.
- Incorporate small logical bits that make sense in terms of real estate or makes the website much more user-friendly
    - Contingency dates should make sense: for example, an appraisal should happen before the loan underwriting, and a walkthrough and the signing should happen before the closing
    - Many more filters should be added to the search: a user should be able to search for properties by multiple zip codes, property type, number of bedrooms/bathrooms, presence of a garage, etc.
    - A buyer's profile page should be available for each buyer to be able to see their currently pending offers, showing requests, and history of transactions.
    - A seller should be able to upload photos of their listing and make it visible to buyers.
    - There should be a resources page with links to websites, to guide both buyers and sellers to shop for involved third parties: escrow, title companies, home warranty companies, repairmen, appraisers, lenders, etc.