const key = mapToken;

// Initialize the map without setting the view yet
// console.log(coordinates);

if (coordinates && coordinates.length > 0) {
  let c = coordinates.reverse();
  var map = L.map("map").setView(c, 15);
  L.tileLayer(
    `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${key}`,
    {
      tileSize: 512,
      zoomOffset: -1,
      minZoom: 1,
      attribution:
        '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
      crossOrigin: true,
    }
  ).addTo(map);
  var airbnb = L.icon({
    iconUrl: 'airbnb.png',
    iconSize:     [38, 95], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
  var marker = L.marker(c).addTo(map);
  marker.bindPopup("This is your location").openPopup();
  var circle = L.circle(c, {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.3,
    radius: 200,
  }).addTo(map);
}

// Function to perform geocoding using MapTiler
// function geocode(city, country) {
//     var url = `https://api.maptiler.com/geocoding/${encodeURIComponent(city)},${encodeURIComponent(country)}.json?key=${key}`;
//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             if (data && data.features && data.features.length > 0) {
//                 var latlng = data.features[0].geometry.coordinates.reverse(); // [longitude, latitude] -> [latitude, longitude]
//                 map.setView(latlng, 13);
//                 L.marker(latlng).addTo(map)
//                     .bindPopup(`${city}, ${country}`)
//                     .openPopup();
//             } else {
//                 alert('Location not found');
//             }
//         })
//         .catch(err => {
//             console.error(err);
//             alert('Geocoding failed');
//         });
// }

// // Call the geocode function with the desired city and country
// geocode("Seattle", "USA");

// var geocodingControl = L.control.maptilerGeocoding({
//     apiKey: key,
//     placeholder: "Seattle",
//     collapsed: true,
//     country: 'us',
//     language: 'en',
//     autocomplete: true
// }).addTo(map);

// // Listen for geocoding result and update the map
// geocodingControl.on('select', function(e) {
//     var latlng = e.feature.geometry.coordinates.reverse(); // [longitude, latitude] -> [latitude, longitude]
//     map.setView(latlng, 13); // Zoom to the selected location
//     L.marker(latlng).addTo(map)
//         .bindPopup(e.feature.place_name)
//         .openPopup();
// });
