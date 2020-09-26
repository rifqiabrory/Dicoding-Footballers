const idbPromised = idb.open("football_database", 1, (upgradedDb) => {
  if (!upgradedDb.objectStoreNames.contains("teamFavorite")) {
    upgradedDb.createObjectStore("teamFavorite", { keyPath: "id" });
  }
});
