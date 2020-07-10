const request = require("request");

//MAKING THIS FUNCTION FLEXIBLE AND REUSABLE FOR ALL
const foreCast = (latitude, longitude, callback) => {
  const wheatherStackKey = "ed6f7c632d63e04b2bf22d61dc575337";
  const url = `http://api.weatherstack.com/current?access_key=${wheatherStackKey}&query=${encodeURIComponent(
    latitude
  )},${encodeURIComponent(longitude)}`;

  request({ url, json: true }, (error, response, body) => {
    if (error) {
      callback("Unable to connect to forecast services.", undefined);
    } else if (response.body.error) {
      callback(
        `Unable! there may be problems with input. Search again,`,
        undefined
      );
    } else {
      callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. But it feels like ${body.current.feelslike} degrees.`);
    }
  });
};


module.exports = foreCast;
