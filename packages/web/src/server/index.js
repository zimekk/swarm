import React from "react";
import { renderToString } from "react-dom/server";
import { App } from "../containers/App";

console.log(["server"]);

export default ({ assets }) => `<!DOCTYPE html>
${renderToString(
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      {Object.keys(assets)
        .filter((name) => name.match(/\.ico$/))
        .map((href, key) => (
          <link key={key} rel="icon" href={href} />
        ))}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta name="description" content="Web site created using ssr" />
      <title>{require("../../package").name}</title>
    </head>
    <body>
      <div id={process.env.ROOT_ELEMENT}>
        <App />
      </div>
      {Object.keys(assets)
        .filter((name) => name.match(/\.js$/))
        .map((src, key) => (
          <script key={key} src={src} />
        ))}
    </body>
  </html>
)}`;
