import path from "path";
// import express from "express";
import render from "@dev/web/src/server";
import assets from "./assets";
import config from "./config";
import { name, version } from "../package";

export default render;

if (process.env.NODE_ENV === "production") {
  // Add this to the VERY top of the first file loaded in your app
  const apm = require("elastic-apm-node").start({
    // Override service name from package.json
    // Allowed characters: a-z, A-Z, 0-9, -, _, and space
    serviceName: "app",

    // Use if APM Server requires a token
    secretToken:
      "xxVpmQB2HMzCL9PgBHVrnxjNXXw5J7bd79DFm6sjBJR5HPXDhcF8MSb3vv4bpg44",

    // Set custom APM Server URL (default: http://localhost:8200)
    serverUrl: "http://apm-server:8200",
  });

  const express = require("express");

  const server = express()
    .get("/", (req, res) => res.send(render({ assets })))
    .get("/status", (req, res) =>
      res.type("application/json").send({ name, version, ...req.query })
    )
    .use(express.static(path.resolve(__dirname, "../public")))
    .listen(config.get("PORT"), () =>
      (({ address, port }) =>
        console.log(
          `Server is running on http://${
            address === "::" ? "localhost" : address
          }:${port}`
        ))(server.address())
    );
}
