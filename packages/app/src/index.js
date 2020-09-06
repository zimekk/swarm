import express from "express";
import config from "./config";
import { name } from "../package";

const app = express();

app.get("/", (req, res) =>
  res.type("application/json").send({ name, ...req.query })
);

const server = app.listen(config.get("PORT"), () =>
  (({ address, port }) =>
    console.log(
      `Server is running on http://${
        address === "::" ? "localhost" : address
      }:${port}`
    ))(server.address())
);
