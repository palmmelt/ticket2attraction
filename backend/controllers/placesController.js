const placesJson = require("../mock/place.json");
const places = require("../mock/place.json");

module.exports = function (app) {

    //? get all list places
  app.get("/api/places", (req, res) => {
    try {
      const places = placesJson;
      res.json({ status: "OK", data: places });
    } catch (err) {
      res.json({ status: "Error", message: err });
    }
  });

  app.post("/api/place", (req, res) => {
    try {

        const inputSearch = req.body.inputSearch.toLowerCase(); 

        const foundPlaces = places.filter((c) => {
            return c.place.toLowerCase().includes(inputSearch);
        });


        if (foundPlaces.length === 0) {
            return res.json({ status: "OK", data: [] });
        }

        res.json({ status: "OK", data: foundPlaces });

    } catch (err) {
      res.json({ status: "Error", message: err });
    }
  });

};
