const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const _ = require("lodash");
const endpoint = "https://pauperbh.herokuapp.com/api/decks";
const HttpsProxyAgent = require("https-proxy-agent");
const Bottleneck = require("bottleneck");

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 1100
});

const axiosDefaultConfig = {
  baseURL: "http://localhost:8070/api/decks",
  proxy: false,
  httpsAgent: new HttpsProxyAgent("http://200.198.51.238:8080")
};

const axios = require("axios").create(axiosDefaultConfig);

const URL1 = "https://www.mtggoldfish.com/deck/2788912#paper";

(async () => {
  const proxiedRequest = request.defaults({
    proxy: "http://200.198.51.238:8080"
  });
  let response = "";
  response = await proxiedRequest.get(URL1);

  let $ = cheerio.load(response);

  let ids = [];

  let cardNamesTd = $('td[class="deck-col-card"]');
  let cardNames = [];
  let cardQuantities = [];
  $('td[class="deck-col-qty"]').each((index, element) => {
    cardQuantities.push($(element).text());
  });

  cardNamesTd.find("a").each(function(index, element) {
    cardNames.push($(element).text());
  });
  console.log(cardQuantities);
  // cardQuantitiesTd.each(function(index, element) {
  //   cardQuantities.push(
  //     $(element)
  //       .eq(0)
  //       .text()
  //   );
  // });
  // cardQuantitiesTdArray = Array.from(cardQuantitiesTd);
  // cardQuantitiesTdArray.forEach(element => console.log($(element).text()));

  // trArray.forEach(element => console.log($(element).text()));

  // let sideboard = $('td[class="deck-header"]').find(e =>
  //   e.innexText.includes("Sideboard")
  // );

  // let tr = $("tr");
  // trArray = Array.from(tr);

  // let doisUltimos = [trArray.slice(-1)[0], trArray.slice(-2)[0]];
  // doisUltimos.forEach(element => console.log($(element).text()));
  // trArray.forEach(element => console.log($(element).text()));

  // trArray.forEeach(function(element) {
  //   console.log($(element).text());
  // });

  let divs = $('div[class="deck-group"]').each((e, elm) => {
    let id = $(elm).attr("id");
    ids.push(id);
  });

  let deckCardsArray = [];
  let deckCountArray = [];
  let idArray = [];
  let total = [];
  let pilotos = [];
  let sideCardsCount = [];
  let sideCardsArray = [];
  let deck = [];
  let mainCardsArray = [];
  let mainCardsCount = [];
  let sideboard = [];

  for (i = 0; i < ids.length; i++) {
    deckCardsArray[i] = [];
    deckCountArray[i] = [];
    sideCardsArray[i] = [];
    mainCardsArray[i] = [];
    mainCardsCount[i] = [];
    sideCardsCount[i] = [];
    sideboard[i] = [];
    idArray[i] = [];
    total[i] = [];
    pilotos[i] = [];
    deck[i] = [];

    $(
      `div[id="${ids[i]}"] > div:nth-child(4) > div:nth-child(2) > div:nth-child(2)`
    )
      .find('a[class="deck-list-link"]')
      .each(function(index, element) {
        sideCardsArray[i].push($(element).text());
      });

    $(
      `div[id="${ids[i]}"] > div:nth-child(4) > div:nth-child(2) > div:nth-child(2)`
    )
      .find('span[class="card-count"]')
      .each(function(index, element) {
        sideCardsCount[i].push($(element).text());
      });

    $(
      `div[id="${ids[i]}"] > div:nth-child(4) > div:nth-child(2) > div:nth-child(1)`
    )
      .find('a[class="deck-list-link"]')
      .each(function(index, element) {
        mainCardsArray[i].push($(element).text());
      });

    $(
      `div[id="${ids[i]}"] > div:nth-child(4) > div:nth-child(2) > div:nth-child(1)`
    )
      .find('span[class="card-count"]')
      .each(function(index, element) {
        mainCardsCount[i].push($(element).text());
      });

    idArray[i].push(ids[i]);

    let zip = (a1, a2) => a1.map((x, i) => [x, a2[i]]);
    deck[i] = zip(deckCardsArray[i], deckCountArray[i]);
    deck[i].unshift(idArray[i]);

    sideboard[i] = zip(sideCardsCount[i], sideCardsArray[i]);

    deck[i] = zip(mainCardsCount[i], mainCardsArray[i]);
    deck[i].unshift(sideboard[i]);
    deck[i].unshift(idArray[i]);
  }

  // deck.forEach(element => {
  //   let decksResult = [...element];
  //   removed = decksResult.splice(0, 1);

  //   let mainDeck = [...decksResult];
  //   removed = mainDeck.splice(0, 1);

  //   return limiter.schedule(() => {
  //     axios
  //       .post(endpoint, {
  //         piloto: element[0],
  //         arquetipo: "",
  //         fonte: "Wizards",
  //         torneio: "pauper-league",
  //         dataTorneio: "29-01-2020",
  //         identificador_torneio: "29-01-2020-pauper-league",
  //         mainDeck: mainDeck,
  //         sideboard: decksResult[0]
  //       })
  //       .then(resp => console.log(resp))
  //       .catch(err => console.log(err));
  //   });
  // });
})();
