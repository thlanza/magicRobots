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

const URL29 =
  "https://magic.wizards.com/en/articles/archive/mtgo-standings/pauper-challenge-2019-11-11";

const URL30 =
  "https://magic.wizards.com/en/articles/archive/mtgo-standings/pauper-league-2019-11-06";

const URL31 =
  "https://magic.wizards.com/en/articles/archive/mtgo-standings/pauper-challenge-2019-11-04";

const URL32 = "https://magic.wizards.com/en/content/pauper-league";

const URL33 =
  "https://magic.wizards.com/en/articles/archive/mtgo-standings/pauper-challenge-2019-10-28";

const URL34 =
  "https://magic.wizards.com/en/articles/archive/mtgo-standings/pauper-ptq-2019-10-27";

const URL35 =
  "https://magic.wizards.com/en/articles/archive/mtgo-standings/pauper-league-2019-10-23";

(async () => {
  const proxiedRequest = request.defaults({
    proxy: "http://200.198.51.238:8080"
  });
  let response = "";
  response = await proxiedRequest.get(URL29);

  let $ = cheerio.load(response);

  let ids = [];

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

  deck.forEach(element => {
    let decksResult = [...element];
    removed = decksResult.splice(0, 1);
    sideboard = decksResult[0];

    let mainDeck = [...decksResult];
    removed = mainDeck.splice(0, 1);
    console.log(mainDeck);
    return limiter.schedule(() => {
      axios
        .post(endpoint, {
          piloto: element[0],
          arquetipo: "",
          fonte: "Wizards",
          torneio: "pauper-challenge",
          dataTorneio: "11-11-2019",
          identificador_torneio: "11-11-2019-pauper-challenge",
          mainDeck: mainDeck,
          sideboard: decksResult[0]
        })
        .then(resp => console.log(resp))
        .catch(err => console.log(err));
    });
  });
})();

(async () => {
  const proxiedRequest = request.defaults({
    proxy: "http://200.198.51.238:8080"
  });
  let response = "";
  response = await proxiedRequest.get(URL30);

  let $ = cheerio.load(response);

  let ids = [];

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

  deck.forEach(element => {
    let decksResult = [...element];
    removed = decksResult.splice(0, 1);
    sideboard = decksResult[0];

    let mainDeck = [...decksResult];
    removed = mainDeck.splice(0, 1);
    console.log(mainDeck);
    return limiter.schedule(() => {
      axios
        .post(endpoint, {
          piloto: element[0],
          arquetipo: "",
          fonte: "Wizards",
          torneio: "pauper-league",
          dataTorneio: "06-11-2019",
          identificador_torneio: "06-11-2019",
          mainDeck: mainDeck,
          sideboard: decksResult[0]
        })
        .then(resp => console.log(resp))
        .catch(err => console.log(err));
    });
  });
})();

(async () => {
  const proxiedRequest = request.defaults({
    proxy: "http://200.198.51.238:8080"
  });
  let response = "";
  response = await proxiedRequest.get(URL31);

  let $ = cheerio.load(response);

  let ids = [];

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

  deck.forEach(element => {
    let decksResult = [...element];
    removed = decksResult.splice(0, 1);
    sideboard = decksResult[0];

    let mainDeck = [...decksResult];
    removed = mainDeck.splice(0, 1);
    console.log(mainDeck);
    return limiter.schedule(() => {
      axios
        .post(endpoint, {
          piloto: element[0],
          arquetipo: "",
          fonte: "Wizards",
          torneio: "pauper-challenge",
          dataTorneio: "04-11-2019",
          identificador_torneio: "04-11-2019-pauper-challenge",
          mainDeck: mainDeck,
          sideboard: decksResult[0]
        })
        .then(resp => console.log(resp))
        .catch(err => console.log(err));
    });
  });
})();

(async () => {
  const proxiedRequest = request.defaults({
    proxy: "http://200.198.51.238:8080"
  });
  let response = "";
  response = await proxiedRequest.get(URL32);

  let $ = cheerio.load(response);

  let ids = [];

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

  deck.forEach(element => {
    let decksResult = [...element];
    removed = decksResult.splice(0, 1);
    sideboard = decksResult[0];

    let mainDeck = [...decksResult];
    removed = mainDeck.splice(0, 1);
    console.log(mainDeck);
    return limiter.schedule(() => {
      axios
        .post(endpoint, {
          piloto: element[0],
          arquetipo: "",
          fonte: "Wizards",
          torneio: "pauper-league",
          dataTorneio: "30-10-2020",
          identificador_torneio: "30-10-2020-pauper-league",
          mainDeck: mainDeck,
          sideboard: decksResult[0]
        })
        .then(resp => console.log(resp))
        .catch(err => console.log(err));
    });
  });
})();

(async () => {
  const proxiedRequest = request.defaults({
    proxy: "http://200.198.51.238:8080"
  });
  let response = "";
  response = await proxiedRequest.get(URL33);

  let $ = cheerio.load(response);

  let ids = [];

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

  deck.forEach(element => {
    let decksResult = [...element];
    removed = decksResult.splice(0, 1);
    sideboard = decksResult[0];

    let mainDeck = [...decksResult];
    removed = mainDeck.splice(0, 1);
    console.log(mainDeck);
    return limiter.schedule(() => {
      axios
        .post(endpoint, {
          piloto: element[0],
          arquetipo: "",
          fonte: "Wizards",
          torneio: "pauper-league",
          dataTorneio: "28-10-2020",
          identificador_torneio: "28-10-2020-pauper-league",
          mainDeck: mainDeck,
          sideboard: decksResult[0]
        })
        .then(resp => console.log(resp))
        .catch(err => console.log(err));
    });
  });
})();

(async () => {
  const proxiedRequest = request.defaults({
    proxy: "http://200.198.51.238:8080"
  });
  let response = "";
  response = await proxiedRequest.get(URL34);

  let $ = cheerio.load(response);

  let ids = [];

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

  deck.forEach(element => {
    let decksResult = [...element];
    removed = decksResult.splice(0, 1);
    sideboard = decksResult[0];

    let mainDeck = [...decksResult];
    removed = mainDeck.splice(0, 1);
    console.log(mainDeck);
    return limiter.schedule(() => {
      axios
        .post(endpoint, {
          piloto: element[0],
          arquetipo: "",
          fonte: "Wizards",
          torneio: "pauper-ptq",
          dataTorneio: "27-10-2019",
          identificador_torneio: "27-10-2019-pauper-ptq",
          mainDeck: mainDeck,
          sideboard: decksResult[0]
        })
        .then(resp => console.log(resp))
        .catch(err => console.log(err));
    });
  });
})();

(async () => {
  const proxiedRequest = request.defaults({
    proxy: "http://200.198.51.238:8080"
  });
  let response = "";
  response = await proxiedRequest.get(URL35);

  let $ = cheerio.load(response);

  let ids = [];

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

  deck.forEach(element => {
    let decksResult = [...element];
    removed = decksResult.splice(0, 1);
    sideboard = decksResult[0];

    let mainDeck = [...decksResult];
    removed = mainDeck.splice(0, 1);
    console.log(mainDeck);
    return limiter.schedule(() => {
      axios
        .post(endpoint, {
          piloto: element[0],
          arquetipo: "",
          fonte: "Wizards",
          torneio: "pauper-league",
          dataTorneio: "23-10-2019",
          identificador_torneio: "23-10-2019-pauper-league",
          mainDeck: mainDeck,
          sideboard: decksResult[0]
        })
        .then(resp => console.log(resp))
        .catch(err => console.log(err));
    });
  });
})();
