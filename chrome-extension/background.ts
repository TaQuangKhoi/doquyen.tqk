

console.log(
  "Live now; make now always the most precious time. Now will never come again."
)








chrome.history.search(
  {
    text: "",
    startTime: 0,
    maxResults: 1000000
  },
  (historyItems) => {
    // historyItems.map((historyItem) => {
    //
    // })
  }
)
