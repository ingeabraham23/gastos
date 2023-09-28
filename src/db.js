import Dexie from "dexie";

const database = new Dexie("Gastos");
database.version(1).stores({
  gastos: "++id, fecha",

});
export default database;