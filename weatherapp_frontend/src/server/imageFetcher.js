let googleApiKey = 'AIzaSyBqNoOLP6a2YUToDRFYFRZpkZT4B1C2gqk';
const fetch = require('node-fetch');

let imageHandler = {};

imageHandler.fetchImage = (req, res) => {
    let lat = req.query.lat;
    let lng = req.query.lng;
    let fetchPlaceId = fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&key=${googleApiKey}`);
    fetchPlaceId
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            console.log(err);

        })
}






module.exports = imageHandler;