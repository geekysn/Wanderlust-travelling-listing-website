if(process.env.NODE_ENV!="production"){
    require('dotenv').config()
}

const Listing = require('../models/listing.js')
const key = process.env.MAP_KEY;
 
module.exports.index = async (req, res) => {
    let allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}

module.exports.renderNewForm = (req, res) => {    
    res.render("listings/new.ejs");
}

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path: "reviews",
        populate:{
            path: 'author'
        }
    })
    .populate('owner');
    if (!listing) {
        req.flash("error", "Cannot find that listing!");
        return res.redirect('/listings');
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
}

module.exports.createListing = async (req, res, next) => {
    try {
        // console.log(req.file);
        // console.log(req.body);
        
        let url = req.file.path;
        let filename = req.file.filename;
        
        const { title, description, price, location, country } = req.body;
        const urlMap = `https://api.maptiler.com/geocoding/${encodeURIComponent(location)},${encodeURIComponent(country)}.json?key=${key}`;
        
        // Fetch the geometry using the geocoding API
        const response = await fetch(urlMap);
        const data = await response.json();
        
        if (data && data.features && data.features.length > 0) {
            const geometry = data.features[0].geometry;

            const newListing = new Listing({
                title,
                description,
                image: {
                    filename: filename || "Not Provided",
                    url: url || "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
                },
                price,
                location,
                country,
                owner: req.user._id,
                geometry
            });
            
            let savedListing = await newListing.save();
            console.log(savedListing);
            req.flash("success", "New listing added");
            res.redirect('/listings');
        } else {
            req.flash('error', 'Location not found');
            res.redirect('/listings/new');
        }
    } catch (err) {
        console.error(err);
        req.flash('error', 'Geocoding failed');
        res.redirect('/listings/new');
    }
}

module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Cannot find that listing!");
        return res.redirect('/listings');
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250")
    res.render("listings/edit.ejs", { listing, originalImageUrl });
}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    const { title, description, price, location, country } = req.body;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Cannot find that listing!");
        return res.redirect('/listings');
    }
    let filename = listing.image.filename;
    let url = listing.image.url;
    if(typeof req.file !== "undefined"){
        url = req.file.path;
        filename = req.file.filename;
    }
    const updatedListing = {
        title,
        description,
        image: {
            filename: filename,
            url: url,
        },
        price,
        location,
        country,
    };
    await Listing.findByIdAndUpdate(id, updatedListing);
    // let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    // if(typeof req.file !== "undefined"){
    //     let url = req.file.path;
    //     let filename = req.file.filename;
    //     listing.image = {filename,url};
    //     await listing.save();
    // }
    req.flash("success", "Listing updated");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted");
    res.redirect("/listings");
}

// function geocode(city, country) {
//     var url = `https://api.maptiler.com/geocoding/${encodeURIComponent(city)},${encodeURIComponent(country)}.json?key=${key}`;
//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             if (data && data.features && data.features.length > 0) {
//                 console.log(data.features[0].geometry);
//                 // var latlng = data.features[0].geometry.coordinates.reverse(); // [longitude, latitude] -> [latitude, longitude]
//                 // map.setView(latlng, 13);
//                 // L.marker(latlng).addTo(map)
//                 //     .bindPopup(`${city}, ${country}`)
//                 //     .openPopup();
//             } else {
//                 alert('Location not found');
//             }
//         })
//         .catch(err => {
//             console.error(err);
//             alert('Geocoding failed');
//         });
// }