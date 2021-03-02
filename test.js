// const axios = require("axios");

const endpoint = "http://localhost:8070/api/decks";
const HttpsProxyAgent = require("https-proxy-agent");
// const proxy = {
//   host: "200.198.51.238",
//   port: 8080
// };
const axiosDefaultConfig = {
  baseURL: "http://localhost:8070/decks",
  proxy: false,
  httpsAgent: new HttpsProxyAgent("http://200.198.51.238:8080")
};
const axios = require("axios").create(axiosDefaultConfig);
axios
  .get(endpoint)
  .then(resp => console.log(resp.data))
  .catch(err => console.log(err));
