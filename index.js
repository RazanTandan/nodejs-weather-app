const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode.js");
const foreCast = require("./utils/forecast.js");

const app = express();
const port = process.env.PORT || 3000;

//Setting up template engine
app.set("view engine", "hbs");

//Setting up static files
app.use(express.static("public"));

//Setting up handlebars engine
app.set("views", "templates/views");
hbs.registerPartials("templates/partials");

//Routing
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App (Dynamically)",
    name: "Razan Tandan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About section",
    name: "Razan Tandan",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Get Help",
    name: "Razan Tandan",
  });
});

app.get("/codewithharry", (req, res) => {
  res.redirect("https://www.codewithharry.com/");
});

app.get("/weather", (req, res) => {
  const location = req.query.location;
  if (!location) {
    return res.send({
      error: "You need to give location to get forecast.",
    });
  }
  geoCode( location, (error, { logitude, latitude, place_name: placeName } = {}) => {
    console.log(logitude);
    console.log(error);
      if (error) {
        return res.send({error});
      }
      
      foreCast(latitude, logitude, (error, foreCastData) => {
        if (error) {
          return res.send({error});
        }
        res.send({
          forecast: foreCastData,
          location: req.query.location,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Razan Tandan",
    errorMsg: "No such article found in help",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Razan Tandan",
    errorMsg: "My 404 page",
  });
}); //using wide card character means everything is match



//Listening
app.listen(port, () => {
  console.log("Server is up and running on port " + port + "...");
});
