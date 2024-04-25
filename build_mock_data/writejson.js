const fs = require("fs");
const axios = require("axios");

const writeTo = '../backend/mock';

/** 
 * Convert API to MockData
 * @param {String} url link api
 * @param {String} path writeFile to path 
 */
const writeApi = async (url, path) => {
  try {
    const res = await axios.get(url);
    const placeArr = res.data;

    const jsonData = JSON.stringify(placeArr, null, 2);

    fs.writeFile(path, jsonData, (err) => {
      if (err) throw err;
      console.log("File created successfully!");
    });
  } catch (error) {
    console.error("Error fetching write:", error);
  }
};

//? place
writeApi("https://6626208c052332d55321b851.mockapi.io/api/ticket2attraction/place",`${writeTo}/place.json`);
//? coupon
writeApi("https://6626208c052332d55321b851.mockapi.io/api/ticket2attraction/coupon",`${writeTo}/coupon.json`);
