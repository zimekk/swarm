module.exports = {
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp3|mp4|webm|wav|mp3|m4a|aac|oga)$": require.resolve(
      "./fileTransformer.js"
    ),
    "\\.(css|scss)$": "identity-obj-proxy",
  },
};
