const request = require("request");

//WE WANT TO MAKE THIS FUNTION HIGHLY REUSABLE AND FLEXIBLE
const geoCode = (placeName, callback) => {
  const geoCodingKey =
    "pk.eyJ1IjoicmFqYW50YW5kYW4iLCJhIjoiY2tjOGxqaXF6MWN1dzJ5bXM0b2Y3ZWFlZSJ9.UchPgrUGorQ35FuZFESzzA";
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${placeName}.json?access_token=${geoCodingKey}&limit=1`;

  request({ url, json: true }, (error, response, body) => {
    if (error) {
      callback("Unable to connect to geoservices.", undefined);
    }else if (body.message) {
      callback('Unable to fetch data lol');
    }
    else if (body.features.length === 0) {
      callback("Unable to get location, Search agian!", undefined);
    } else {
      callback(undefined, {
        logitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        place_name: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
