// jest.config.js
// const { TextDecoder, TextEncoder } = require("util");
//
module.exports = {
  // setupFiles: ["./jest.polyfills.js"],
  //   setupFilesAfterEnv: ["./jest.polyfills.js"],
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  // globals: {
  //   TextEncoder,
  //   TextDecoder,
  // },
  testEnvironment: "jest-environment-jsdom",
};
