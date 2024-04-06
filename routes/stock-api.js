const axios = require("axios");

const getData = (options) => {
  setInterval(async () => {
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, 10000);
};

module.exports = getData;
