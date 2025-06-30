// import pkg from "pg";

// const { Pool } = pkg;

// const pool = new Pool({
//   user: process.env.USER,
//   host: process.env.HOST,
//   database: process.env.DBNAME,
//   password: process.env.DBPASS,
//   port: process.env.DBPORT,
// });

// pool.on("connect", () => {
//   console.log("Connected to Supabase");
// });

// export default pool;

import postgres from "postgres";

const sql = postgres({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DBNAME,
  password: process.env.DBPASS,
  port: process.env.DBPORT,
  ssl: false,
});

export default sql;
