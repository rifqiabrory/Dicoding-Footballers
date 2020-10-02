const idbPromised = idb.open("football_database", 1, (upgradedDb) => {
  if (!upgradedDb.objectStoreNames.contains("teamFavorite")) {
    upgradedDb.createObjectStore("teamFavorite", { keyPath: "id" });
  }
});

const dbGetAllFavoriteTeam = () => {
  return new Promise((resolve, reject) => {
    idbPromised.then(db => {
      const transaction = db.transaction("teamFavorite", `readonly`);
      return transaction.objectStore("teamFavorite").getAll();
    }).then(data => {
      if (data !== undefined) {
        resolve(data)
      } else {
        reject(new Error("Favorite not Found"))
      }
    })
  })
};

const dbInsertFavoriteTeam = dataTeam => {
  return new Promise((resolve, reject) => {
    idbPromised.then(db => {
      const transaction = db.transaction("teamFavorite", `readwrite`);
      transaction.objectStore("teamFavorite").put(dataTeam);
      return transaction;
    }).then(transaction => {
      if (transaction.complete) {
        resolve(true)
      } else {
        reject(new Error(transaction.onerror))
      }
    })
  })
};

const dbDeleteFavoriteTeam = id => {
  return new Promise((resolve, reject) => {
    idbPromised.then(db => {
      const transaction = db.transaction("teamFavorite", `readwrite`);
      transaction.objectStore("teamFavorite").delete(id);
      return transaction;
    }).then(transaction => {
      if (transaction.complete) {
        resolve(true)
      } else {
        reject(new Error(transaction.onerror))
      }
    })
  })
};