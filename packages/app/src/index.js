import express from "express";
import { createProxyServer } from "http-proxy";
import config from "./config";
import { name, version } from "../package";

const proxy = createProxyServer();

const server = express()
  .use("/visualizer", (req, res) =>
    proxy.web(req, res, {
      target: "http://visualizer:8080",
    })
  )
  .get("/", (req, res) =>
    res.type("application/json").send({ name, version, ...req.query })
  )
  .listen(config.get("PORT"), () =>
    (({ address, port }) =>
      console.log(
        `Server is running on http://${
          address === "::" ? "localhost" : address
        }:${port}`
      ))(server.address())
  );
