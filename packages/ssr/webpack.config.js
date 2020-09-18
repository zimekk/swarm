const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { DefinePlugin } = require("webpack");

const dev = !["production"].includes(process.env.NODE_ENV);

const contentBase = path.join(__dirname, "public");

const resolve = {};

const promise = {
  assets: new Promise((assets) => Object.assign(resolve, { assets })).then(
    (result) => {
      Object.assign(resolve, {
        assets: (result) =>
          Object.assign(promise, { assets: Promise.resolve(result) }),
      });
      return result;
    }
  ),
  server: new Promise((server) => Object.assign(resolve, { server })).then(
    (result) => {
      Object.assign(resolve, {
        server: (result) =>
          Object.assign(promise, { server: Promise.resolve(result) }),
      });
      return result;
    }
  ),
};

class RenderPlugin {
  plugin(compilation, callback) {
    try {
      if (dev) {
        const source = compilation.assets["index.js"].source();
        const server = require("require-from-string")(source).default;
        resolve.server(server);
      }
    } catch (e) {
      compilation.errors.push(e);
    }
    callback();
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync("RenderPlugin", this.plugin);
  }
}

class AssetsPlugin {
  plugin(compilation, callback) {
    try {
      const assets = Object.entries(compilation.assets).reduce(
        (assets, [name, item]) =>
          Object.assign(assets, {
            [name]: item.source(),
          }),
        {}
      );
      resolve.assets(assets);
    } catch (e) {
      compilation.errors.push(e);
    }
    callback();
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync("AssetsPlugin", this.plugin);
  }
}

const devServer = {
  contentBase,
  inline: false,
  before: (app) =>
    app.use(["/$", "/*.html$"], (req, res) =>
      Promise.all([promise.server, promise.assets])
        .then(([server, assets]) => res.send(server({ assets })))
        .catch((error) => res.send({ error }))
    ),
};

const plugins = [
  new DefinePlugin({
    "process.env": {
      ROOT_ELEMENT: JSON.stringify("root"),
    },
  }),
  new CleanWebpackPlugin(),
];

const rules = [
  {
    test: /\.js$/,
    use: [
      {
        loader: "babel-loader",
        options: {
          presets: ["@env"],
        },
      },
    ],
  },
  {
    test: /\.(eot|svg|ttf|woff|woff2)$/,
    use: {
      loader: "url-loader",
    },
  },
  {
    test: /\.(ico)$/,
    use: {
      loader: "file-loader",
      options: {
        name: "[name].[ext]",
      },
    },
  },
  {
    test: require.resolve("./src/assets"),
    use: {
      loader: require.resolve("./src/assets-loader"),
      options: promise,
    },
  },
];

module.exports = [
  {
    name: "client",
    mode: dev ? "development" : "production",
    devServer,
    entry: {
      client: [
        require.resolve("@dev/web/src/assets/favicon.ico"),
        require.resolve("@dev/web/src/client"),
      ],
    },
    module: {
      rules,
    },
    output: {
      publicPath: "/",
      path: contentBase,
    },
    plugins: [...plugins, new AssetsPlugin()],
  },
  {
    name: "server",
    mode: dev ? "development" : "production",
    target: "node",
    node: {
      __dirname: false,
    },
    externals: [
      nodeExternals(),
      nodeExternals({
        allowlist: [/^@dev\//],
        modulesDir: path.resolve(__dirname, "../../node_modules"),
      }),
    ],
    entry: { index: require.resolve("./src") },
    module: {
      rules,
    },
    output: {
      libraryTarget: "commonjs2",
      path: path.resolve(__dirname, "lib"),
    },
    plugins: [...plugins, new RenderPlugin()],
  },
];
