import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, getDoc,
  query, where }
  from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

console.log(
  "Live now; make now always the most precious time. Now will never come again."
)

const firebaseConfig = {
  apiKey: process.env.PLASMO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "heyday-abc.firebaseapp.com",
  projectId: "heyday-abc",
  storageBucket: "heyday-abc.appspot.com",
  messagingSenderId: "767191939509",
  appId: "1:767191939509:web:6ead3ed554ed12820fc1fc",
  measurementId: "G-V4D9SEPHF4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const historyRef = collection(db, "history");

async function TestFirebase() {

  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// TestFirebase().then(() => {
//   console.log("TestFirebase done")
// })

async function saveHistoryItem(historyItem: chrome.history.HistoryItem) {
  try {
    // add domain to historyRef
    const q = query(historyRef, where("domain", "==", getDomain(historyItem.url)));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size === 0) {
      // Create a new document for this domain
      const docRef = await addDoc(historyRef, {
        domain: getDomain(historyItem.url),
        // historyItems: [historyItem]
      });
      console.log("Document written with ID: ", docRef.id);
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function getHistoryItems() {
  return getDocs(collection(db, "history"))
}

// getHistoryItems().then((querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//     console.log(`${doc.id} => ${doc.data()}`);
//   });
// })

// get domain from url
function getDomain(url: string) {
  const urlObj = new URL(url)
  return urlObj.hostname
}


chrome.history.search(
  {
    text: "",
    startTime: 0,
    maxResults: 1000000
  },
  (historyItems) => {
    historyItems.map((historyItem) => {
      // console.log(historyItem)
      // console.log(getDomain(historyItem.url))
      saveHistoryItem(historyItem).then(() => {
        console.log("saveHistoryItem done")
      })
    })
  }
)
