import path from "path";
import express from "express";
import render from "@dev/web/src/server";
import assets from "./assets";
import config from "./config";
import { name, version } from "../package";

export default render;

if (process.env.NODE_ENV === "production") {
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
