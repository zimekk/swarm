export default require("convict")({
  NODE_ENV: {
    // doc: 'The application environment.',
    format: ["production", "development", "test"],
    default: "production",
    env: "NODE_ENV",
  },
  PORT: {
    // doc: 'The port to bind.',
    format: "port",
    default: 8080,
    env: "PORT",
  },
}).validate({ allowed: "strict" });
