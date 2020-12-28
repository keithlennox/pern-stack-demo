const express = require("express");
const { postgraphile } = require("postgraphile");
const cors = require('cors');

const app = express();

app.use(cors())

app.use(
  postgraphile(
    "postgres://postgres:420Crosby@localhost:5432/users",
    "public",
    {
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true,
    }
  )
);

app.listen(4000);