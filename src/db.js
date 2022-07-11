// db.js
import Dexie from "dexie";
//set the database
export const db = new Dexie("myDatabase");
db.version(1).stores({
  location: "id, name, address, phone, city, state, country",
});
