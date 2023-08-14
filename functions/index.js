/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const {logger} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");

// The Firebase Admin SDK to access Firestore.
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

initializeApp();
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.addquery = onRequest(async (req, res) => {
   // Grab the text parameter.
  const query = req.query.text;
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await getFirestore()
      .collection("queryResults")
      .add({query: query});
  // Send back a message that we've successfully written the message
  res.json({result: `Message with ID: ${writeResult.id} added.`});
  });

  exports.getResults = onDocumentCreated("/queryResults/{documentId}", async (event) => {
    const query = event.data.data().query;
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch( { headless: true });
    const page = await browser.newPage();
    await page.goto(`https://duckduckgo.com/?q=${query}&t=hc&va=b&ia=web`);
  // Access the parameter `{documentId}` with `event.params`
  logger.log("Uppercasing", event.params.documentId, query);

  let tempInt = 1;
  while (tempInt<5){
    try {
      await page.click('button#more-results');
      await page.waitForSelector('button#more-results:not([disabled])', { timeout: 5_000 });
    } catch (e) {
      break;
    }
    i++;
  }


  const titles = await page.evaluate( () => {

    const spans = Array.from(document.querySelectorAll('span.EKtkFWMYpwzMKOYr0GYm'));
    const urls = spans.map(span => span.innerHTML);
    
    return urls
});
  const links = await page.evaluate( () => {

    const anchors = document.querySelectorAll('a.eVNpHGjtxRBq_gLOfGDr');
    const urls = Array.from(anchors).map(v => v.href);
    
    return urls
});
  const descriptionHTML = await page.evaluate( () => {
        
    const divs = Array.from(document.querySelectorAll('div.OgdwYG6KE2qthn9XQWFC'));
    const urls = divs.map(div => div.innerHTML);
    
    return urls
});

await page.goto(`https://duckduckgo.com/?q=${query}&t=hc&va=b&iax=images&ia=images`);
    await page.waitForSelector('.tile--img__img', { timeout: 5_000 });

    const images_raw = await page.evaluate( () => {


        //Code to get each img src with class "tile--img__img"
        const images = document.querySelectorAll('img.tile--img__img');
        const urls = [];
        
        images.forEach(image => {
          const src = image.getAttribute('src');
          urls.push(src);
        });

        return urls
    });


    const images = []

    for (var i = 0; i < images_raw.length; i++) {
        var url = "https:" + images_raw[i];
        images.push(url);
      }



await browser.close();
  // You must return a Promise when performing
  // asynchronous tasks inside a function
  // such as writing to Firestore.
  // Setting an 'uppercase' field in Firestore document returns a Promise.
  return event.data.ref.set({titles, links, descriptionHTML, images}, {merge: true});
  });
