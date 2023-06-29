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

  exports.getResults = onDocumentCreated("/queryResults/{documentId}", (event) => {
    const query = event.data.data().query;

  // Access the parameter `{documentId}` with `event.params`
  logger.log("Uppercasing", event.params.documentId, query);

  const titles = [
      'Marlon Wayans - Wikipedia',
      'Marlon Wayans - IMDb',
      'Official Website Of Marlon Wayans',
      'Marlon Wayans - Biography - IMDb',
      'Marlon Wayans accuses United Airlines of racism after flight removal',
      'The Wayans Brothers Oldest to Youngest - Marlon Wayans, Damon Wayans ...',
      'Actor and comedian Marlon Wayans cited for disturbing the peace at ...',
      "Marlon Wayans Shares How He's Coping After the Death of His Dad",
      'Marlon Wayans Reacts to Airline Drama After Alleged Incident (Exclusive)',
      'Marlon Wayans Cited for Disturbing The Peace After Issue with United ...'
    ];
  const links =
    [
      'https://en.wikipedia.org/wiki/Marlon_Wayans',
      'https://www.imdb.com/name/nm0005541/',
      'https://www.marlonwayansofficial.com/',
      'https://www.imdb.com/name/nm0005541/bio/',
      'https://www.usatoday.com/story/entertainment/celebrities/2023/06/11/marlon-wayans-removed-united-airlines-flight-gate-agent-altercation/70310892007/',
      'https://www.goodhousekeeping.com/life/entertainment/a37386622/wayans-brothers-siblings/',
      'https://www.cnn.com/2023/06/10/entertainment/marlon-wayans-cited-denver-international-airport-trnd/index.html',
      'https://www.etonline.com/marlon-wayans-shares-how-hes-coping-after-the-death-of-his-dad-howell-wayans-im-hurting-202328',
      'https://www.etonline.com/media/videos/marlon-wayans-reacts-to-airline-drama-after-alleged-incident-exclusive-207023',
      'https://www.tmz.com/2023/06/09/marlon-wayans-united-airlines-incident-citation-disturbing-peace/'
    ];
  const descriptionHTML =
    [
      '<span>Marlon Lamont <b>Wayans</b> [1] (born July 23, 1972) is an American actor, comedian, writer, and producer.</span>',
      '<span>99+ Photos Marlon <b>Wayans</b> is an American actor, writer and comedian. He is known for playing Tyrone C. Love in Requiem for a Dream, Shorty Meeks from Scary Movie, Marcus Anthony Copeland II from White Chicks and Thunder from Marmaduke.</span>',
      '<span>Official Website Of Marlon <b>Wayans</b> Marlon Live Join The Newsletter Marlon Live Jun 17, 2023 Spokane Comedy Club - Early Show Spokane, WA Tickets Jun 17, 2023 Spokane Comedy Club - Late Show Spokane, WA Tickets Jun 22, 2023 Helium Comedy Club - Early Show St. Louis Tickets Jun 22, 2023 Helium Comedy Club - Late Show St. Louis Tickets Jun 23, 2023</span>',
      '<span>Marlon <b>Wayans</b> is an American actor, writer and comedian. He is known for playing Tyrone C. Love in Requiem for a Dream, Shorty Meeks from Scary Movie, Marcus Anthony Copeland II from White Chicks and Thunder from Marmaduke.</span>',
      '<span class="MILR5XIVy9h75WrLvKiq">Jun 11, 2023</span><span>Marlon <b>Wayans</b> and United Airlines are at odds over an incident at Denver International Airport on Friday. In a series of Instagram posts, <b>Wayans</b>, 50, claimed a gate agent told him he had one...</span>',
      '<span>Marlon is one of 10 <b>Wayans</b> siblings that grew up in New York City with their mother, Elvira, a homemaker and social worker, and their father, Howell, a supermarket manager. Scroll down to learn...</span>',   
      '<span class="MILR5XIVy9h75WrLvKiq">Jun 10, 2023</span><span>CNN — Actor and comedian Marlon <b>Wayans</b> was cited for disturbing the peace at Denver International Airport, according to Denver authorities. Police responded to a reported disturbance Friday...</span>',
      '<span>Marlons <b>Wayans</b> is opening up about his grief. During an appearance on Good Morning America, the actor discusses his role in the acclaimed new film, Air, where he plays George Raveling, one of...</span>',     
      "<span>Marlon <b>Wayans</b> chats backstage with ET's Kevin Frazier at the 2023 BET Awards, which aired on Sunday, June 25. The comedian makes light of an alleged incident that occurred earlier this month with ...</span>",    `<span>The customer won't be flying on United to his destination." Marlon <b>Wayans</b> says he's not to blame for missing his upcoming show after an issue with United Airlines, but apparently, the cops think ...</span>`  
    ];

  // You must return a Promise when performing
  // asynchronous tasks inside a function
  // such as writing to Firestore.
  // Setting an 'uppercase' field in Firestore document returns a Promise.
  return event.data.ref.set({titles, links, descriptionHTML}, {merge: true});
  });
