const QueryBuilder = require("node-querybuilder");

const settings = {
  host: "localhost",
  database: "edka_db",
  user: "root",
  password: "",
};

export const pool = new QueryBuilder(settings, "mysql", "pool");
