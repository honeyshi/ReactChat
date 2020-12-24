const path = require("path");

module.exports = {
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      root: path.resolve(__dirname, "src"),
      common: "root/common",
      components: "root/components",
      store: "root/store",
    },
  },
};
