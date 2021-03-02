const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const _ = require("lodash");
const endpoint = "https://pauperbh.herokuapp.com/api/primers";
const HttpsProxyAgent = require("https-proxy-agent");
const Bottleneck = require("bottleneck");

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 1100
});

const axiosDefaultConfig = {
  proxy: false,
  httpsAgent: new HttpsProxyAgent("http://200.198.51.238:8080")
};

const axios = require("axios").create(axiosDefaultConfig);

(async () => {
  axios
    .post(endpoint, {
      arquetipo: "Mono Blue Fadas",
      url: [
        {
          label: "Primer na Salvation",
          url:
            "https://www.mtgsalvation.com/forums/the-game/pauper/paper-pauper-and-peasant/established/559282-primer-pauper-mono-blue-delver"
        }
      ],
      linkYouTube: [
        {
          label: "Primer no canal do Guia do Sacoleiro das Galáxias",
          url: "https://www.youtube.com/watch?v=iuGYIxZyUdM"
        },
        {
          label: "Matchups do deck no Guia do Sacoleiro das Galáxias",
          url: "https://www.youtube.com/watch?v=cJtMTUlWJSY"
        },
        {
          label: "Guia de sideboard do deck no Guia do Sacoleiro das Galáxias",
          url: "https://www.youtube.com/watch?v=UusTaW1N2e4"
        }
      ]
    })
    .then(resp => console.log(resp))
    .catch(err => console.log(err));

  axios
    .post(endpoint, {
      arquetipo: "Acid Trip",
      linkYouTube: [
        {
          label: "Primer no Guia do Sacoleiro das Galáxias",
          url: "https://www.youtube.com/watch?v=PAny218Yug4"
        }
      ]
    })
    .then(resp => console.log(resp))
    .catch(err => console.log(err));

  axios
    .post(endpoint, {
      arquetipo: "Tortured Existence",
      linkYouTube: [
        {
          label: "Primer do Tolarian Community College",
          url: "https://www.youtube.com/watch?v=Rc0aImbV6H8"
        }
      ]
    })
    .then(resp => console.log(resp))
    .catch(err => console.log(err));

  axios
    .post(endpoint, {
      arquetipo: "Goblins",
      linkYouTube: [
        {
          label: "Primer do Deluxeicoff",
          url: "https://www.youtube.com/watch?v=ahgZaV42xUY"
        }
      ]
    })
    .then(resp => console.log(resp))
    .catch(err => console.log(err));

  axios
    .post(endpoint, {
      arquetipo: "Elfos",
      url: [
        {
          label: "Primer da CoolStuffInc",
          url: "https://www.youtube.com/watch?v=x2IQsuILBsg"
        }
      ],
      linkYouTube: [
        {
          label: "Stream com Elfos",
          url:
            "https://www.coolstuffinc.com/a/kendrasmith-01032020-the-ultimate-pauper-elves-primer-matchups"
        }
      ]
    })
    .then(resp => console.log(resp))
    .catch(err => console.log(err));

  axios
    .post(endpoint, {
      arquetipo: "Fog Tron",
      url: [
        {
          label: "Primer da Castle of Commons",
          url:
            "https://www.castleofcommons.com/primers/2019/2/28/dinrova-tron-primer"
        },
        {
          label: "Artigo no Pauperwave, site italiano",
          url:
            "http://pauperwave.altervista.org/pauper-tron-at-the-end-of-2019/"
        }
      ],
      podcast: [
        {
          label: "Podcast no Heavy Meta Podcast",
          url:
            "https://anchor.fm/heavymetapodcast/episodes/Heavy-Primer-01-Tudo-sobre-o-TRON--Feat--Igor-Coelho-e-Fernando-Portelada-eaia0p"
        }
      ],
      linkYouTube: [
        {
          label: "Primer do Tron no canal do Cabrito",
          url: "https://www.youtube.com/watch?v=DEZnP-jR9sI"
        }
      ]
    })
    .then(resp => console.log(resp))
    .catch(err => console.log(err));

  axios
    .post(endpoint, {
      arquetipo: "Mono Black Land Destruction",
      url: [
        {
          label: "Artigo na PureMtgo",
          url:
            "https://puremtgo.com/articles/arctic-pauper-column-%E2%80%93-mono-black-land-destruction"
        }
      ]
    })
    .then(resp => console.log(resp))
    .catch(err => console.log(err));

  axios
    .post(endpoint, {
      arquetipo: "Esper Familiar",
      url: [
        {
          label: "Primer na TappedOut",
          url: "http://tappedout.net/mtg-decks/primer-esper-familiars/"
        }
      ]
    })
    .then(resp => console.log(resp))
    .catch(err => console.log(err));

  axios
    .post(endpoint, {
      arquetipo: "Zombies",
      url: [
        {
          label: "Primer no Reddit",
          url:
            "https://www.reddit.com/r/Pauper/comments/9cijos/pauper_zombies_primer/"
        }
      ]
    })
    .then(resp => console.log(resp))
    .catch(err => console.log(err));

  axios
    .post(endpoint, {
      arquetipo: "GW Auras",
      url: [
        {
          label: "Primer no Reddit",
          url:
            "https://www.reddit.com/r/Pauper/comments/8qkg5a/an_exhaustive_2018_gw_bogles_primer/"
        }
      ],
      podcast: [
        {
          label:
            "Podcast sobre o report do Gustavo Parra chegando na final com GW Auras",
          url:
            "https://pauperview.wordpress.com/2019/02/21/podcast-22-clm-12-report-vice-campeao-bogles/"
        }
      ]
    })
    .then(resp => console.log(resp))
    .catch(err => console.log(err));

  axios
    .post(endpoint, {
      arquetipo: "Boros Monarca",
      url: [
        {
          label: "Primer no Reddit",
          url:
            "https://www.reddit.com/r/Pauper/comments/7z878g/boros_monarch_primer/"
        },
        {
          label: "Report da vitória do Heli no Circuito Liga Magic com o deck",
          url:
            "https://pauperview.wordpress.com/2018/08/17/report-final-clm11-boros-monarca/"
        }
      ]
    })
    .then(resp => console.log(resp))
    .catch(err => console.log(err));

  axios
    .post(endpoint, {
      arquetipo: "Soul Sisters",
      url: [
        {
          label: "Primer no Pauper Magic Jundiaí",
          url:
            "http://paupermagicjundiai.blogspot.com/2018/01/seeker-of-way-soul-sister-soul-seeker.html"
        }
      ]
    })
    .then(resp => console.log(resp))
    .catch(err => console.log(err));

  axios
    .post(endpoint, {
      arquetipo: "Infect",
      linkYouTube: [
        {
          label: "Primer do Deluxeicoff",
          url: "https://www.youtube.com/watch?v=mVCWkhKggbo"
        }
      ]
    })
    .then(resp => console.log(resp))
    .catch(err => console.log(err));

  axios
    .post(endpoint, {
      arquetipo: "Mono White Heroic",
      url: [
        {
          label: "Artigo na PureMtgo",
          url:
            "https://puremtgo.com/articles/arctic-pauper-column-%E2%80%93-mono-white-heroic-10"
        }
      ]
    })
    .then(resp => console.log(resp))
    .catch(err => console.log(err));

  axios
    .post(endpoint, {
      arquetipo: "UR Fiend",
      linkYouTube: [
        {
          label: "Primer no canal do Ilyon",
          url: "https://www.youtube.com/watch?v=jPWOIOxADqk"
        },
        {
          label: "Primer no canal do Ilyon, parte 2",
          url: "https://www.youtube.com/watch?v=H-2C8rZ4ehE"
        }
      ]
    })
    .then(resp => console.log(resp))
    .catch(err => console.log(err));

  axios
    .post(endpoint, {
      arquetipo: "MBC",
      linkYouTube: [
        {
          label: "Primer do maindeck do MBC no Guia do Sacoleiro das Galáxias",
          url: "https://www.youtube.com/watch?v=v_F8RpQGsFA"
        },
        {
          label: "Guia do sideboard do MBC no Guia do Sacoleiro das Galáxias",
          url: "https://www.youtube.com/watch?v=oUBt4XHTEMw"
        }
      ]
    })
    .then(resp => console.log(resp))
    .catch(err => console.log(err));

  axios
    .post(endpoint, {
      arquetipo: "UB Teachings",
      url: [
        {
          label: "Primer no Reddit parte 1",
          url:
            "https://www.reddit.com/r/Pauper/comments/8rw74p/ub_teachings_primer_part_1/"
        },
        {
          label: "Primer no Reddit parte 2",
          url:
            "https://www.reddit.com/r/Pauper/comments/8sxv6l/ub_teachings_primer_part_2_matchups/"
        },
        {
          label: "Primer no Reddit parte 3",
          url:
            "https://www.reddit.com/r/Pauper/comments/8u40ff/ub_teachings_primer_part_33_card_choices/"
        }
      ]
    })
    .then(resp => console.log(resp))
    .catch(err => console.log(err));

  axios
    .post(endpoint, {
      arquetipo: "GW Fractius",
      url: [
        {
          label: "Primer no Reddit parte 1",
          url:
            "https://www.reddit.com/r/Pauper/comments/c6mlvd/the_completely_overhauled_gw_slivers_primer/"
        },
        {
          label: "Primer no Reddit parte 2",
          url:
            "https://www.reddit.com/r/Pauper/comments/9jobd8/the_complete_gw_slivers_primer_pt_2/"
        },
        {
          label: "Primer no Reddit parte 3",
          url:
            "https://www.reddit.com/r/Pauper/comments/9k9c2b/the_complete_gw_slivers_primer_pt3/"
        },
        {
          label: "Primer no Reddit parte 4",
          url:
            "https://www.reddit.com/r/Pauper/comments/9kj30l/the_complete_gw_slivers_primer_pt_4/"
        }
      ]
    })
    .then(resp => console.log(resp))
    .catch(err => console.log(err));
})();
