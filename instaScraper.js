// const puppeteer = require("puppeteer");
// function run() {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const browser = await puppeteer.launch({
//         args: ["--proxy-server=200.198.51.238:8080"]
//       });
//       const page = await browser.newPage();
//       await page.goto("http://www.instagram.com/p/B6Qhx4zBtbS/", {
//         waitUntil: "load",
//         timeout: 0
//       });

//       let urls = await page.evaluate(() => {
//         let results = [];
//         get the hotel elements
//         let items = document.querySelectorAll("a.FPmhX");
//         console.log(items);
//         get the hotel data
//         items.forEach(item => {
//           let marcacoes = 0;
//           let marcacao = item.getAttribute("title");
//           if (marcacao === "carolcampossb") {
//             marcacoes++;
//           }
//           results.push({
//             marcacoes
//           });
//         });
//         console.log(results);
//       });
//       browser.close();
//       return resolve(urls);
//     } catch (e) {
//       return reject(e);
//     }
//   });
// }
// run()
//   .then(console.log)
//   .catch(console.error);

// let scrape = async () => {
//   const browser = await puppeteer.launch({
//     args: ["--proxy-server=200.198.51.238:8080"]
//   });

//   const page = await browser.newPage();

//   await page.goto("https://www.instagram.com/p/B6Qhx4zBtbS/", {
//     waitUntil: "load",
//     timeout: 0
//   });

//   const result = await page.evaluate(() => {
//     let linkNodeList = document.querySelectorAll("a.FPmhX");
//     let linksArray = [];
//     for (var i = 0; i < linkNodeList.length; i++) {
//       linksArray[i] = {
//         name: linkNodeList[i].getAttribute("title")
//       };
//     }

//     return linksArray;
//   });

//   browser.close();
//   return result;
// };

// scrape().then(value => {
//   console.log(value); // Success!
// });

const puppeteer = require("puppeteer");

// function extractItems() {
//   const extractedElements = document.querySelectorAll("a.FPmhX");
//   const items = [];
//   for (let element of extractedElements) {
//     items.push(element.innerText);
//   }
//   return items;
// }

// async function scrapeInfiniteScrollItems(
//   page,
//   extractItems,
//   itemTargetCount,
//   scrollDelay = 1000
// ) {
//   let items = [];
//   try {
//     let previousHeight;
//     while (items.length < itemTargetCount) {
//       items = await page.evaluate(extractItems);
//       previousHeight = await page.evaluate("document.body.scrollHeight");
//       await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
//       await page.waitForFunction(
//         `document.body.scrollHeight > ${previousHeight}`
//       );
//       await page.waitFor(scrollDelay);
//       await page.waitFor("button.dCJp8");
//       await page.click("button.dCJp8");
//     }
//   } catch (e) {}
//   return items;
// }

(async () => {
  const browser = await puppeteer.launch({
    args: ["--proxy-server=200.198.51.238:8080"],
    headless: true
  });

  const page = await browser.newPage();
  await page.goto("https://www.instagram.com/p/B7mcjssHNwR/", {
    waitUntil: "load",
    timeout: 0
  });

  async function autoScroll(page) {
    await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
        var totalHeight = 0;
        var distance = 100;
        var timer = setInterval(() => {
          var scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });
  }

  let results = [];
  let i = 0;
  while ((await page.$("button.dCJp8")) !== null) {
    await autoScroll(page);
    results[i] = await page.evaluate(() => {
      let linkNodeList = document.querySelectorAll("a.FPmhX");
      let linksArray = [];
      for (var i = 0; i < linkNodeList.length; i++) {
        linksArray[i] = {
          name: linkNodeList[i].getAttribute("title")
        };
      }
      return linksArray;
    });
    await page.waitFor("button.dCJp8");
    await page.click("button.dCJp8");
    i++;
  }

  // const items = await scrapeInfiniteScrollItems(page, extractItems, 100);

  // await autoScroll(page);

  // await page.evaluate(async () => {
  //   await new Promise((resolve, reject) => {
  //     const interval = setInterval(async () => {
  //       const button = await page.waitForSelector("button.dCJp8", {
  //         timeout: 2000
  //       });
  //       if (button !== null) {
  //         button.click();
  //       } else {
  //         clearInterval(interval);
  //         resolve();
  //       }
  //     }, 100);
  //   });
  // });

  // const cssSelector = "button.dCJp8";

  // const isElementVisible = async (page, cssSelector) => {
  //   let visible = true;
  //   await page
  //     .waitForSelector(cssSelector, { visible: true, timeout: 2000 })
  //     .catch(() => {
  //       visible = false;
  //     });
  //   return visible;
  // };

  // let loadMoreVisible = await isElementVisible(page, cssSelector);
  // while (loadMoreVisible) {
  //   let button = await page.waitForSelector(cssSelector);
  //   await page.click(button).catch(() => {});
  //   loadMoreVisible = await isElementVisible(page, cssSelector);
  // }

  // returns a Puppeteer ElementHandle (not browser DOM element)
  // let elem = await page.$("button.dCJp8");
  // passes the ElementHandle back to the browser code (Puppeteer converts it back to DOM element)
  // let previousHeight = await page.evaluate(e => e.scrollHeight, elem);
  // again, pass ElementHandle
  // await page.evaluate(e => window.scrollTo(0, e.scrollHeight), elem);
  // pass both ElementHandle and previousHeight to the browser side
  // await page.waitForFunction(
  //   (e, ph) => e.scrollHeight > ph,
  //   {},
  //   elem,
  //   previousHeight
  // );

  console.log(results);
  await browser.close();
})();

// async function autoScroll(page) {
//   await page.evaluate(async () => {
//     await new Promise((resolve, reject) => {
//       var totalHeight = 0;
//       var distance = 100;
//       var timer = setInterval(() => {
//         var scrollHeight = document.body.scrollHeight;
//         let selector = "button";
//         page.$$eval(selector, anchors => {
//           anchors.map(anchor => {
//             if (anchor.getAttribute("class") == "dCJp8") {
//               anchor.click();
//               return;
//             }
//           });
//         });
//         totalHeight += distance;

//         if (totalHeight >= scrollHeight) {
//           clearInterval(timer);
//           resolve();
//         }
//       }, 100);
//     });
//   });
// }
