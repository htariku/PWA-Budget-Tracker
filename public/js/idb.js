let db;

//  connection to IndexedDB database
const request = indexedDB.open("budget_tracker", 1);

// emit database
request.onupgradeneeded = function (event) {
  // save a reference to the database
  const db = event.target.result;

  // auto incrementing
  db.createObjectStore("new_transaction", { autoIncrement: true });
};

request.onsuccess = function (event) {
  db = event.target.result;

  if (navigator.onLine) {
  }
};

request.onerror = function (event) {
  console.log(event.target.errorCode);
};

// function will executed if no internet connection
function saveRecord(record) {
  const transaction = db.transaction(["new_transaction"], "readwrite");

  const budgetObjectStore = transaction.objectStore("new_transaction");

  budgetObjectStore.add(record);
}

function uploadTransaction() {
  const transaction = db.transaction(["new_transaction"], "readwrite");

  const budgetObjectStore = transaction.objectStore("new_transaction");

  const getAll = budgetObjectStore.getAll();

  getAll.onsuccess = function () {
    if (getAll.result.length > 0) {
      fetch("/api/transaction", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((serverResponse) => {
          if (serverResponse.message) {
            throw new Error(serverResponse);
          }

          const transaction = db.transaction(["new_transaction"], "readwrite");

          const budgetObjectStore = transaction.objectStore("new_transaction");

          budgetObjectStore.clear();

          alert("All saved transactions has been submitted!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
}

window.addEventListener("online", uploadTransaction);
