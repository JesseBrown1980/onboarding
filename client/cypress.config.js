const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    supportFile: "cypress/support/index.js",
    specPattern: "cypress/integration/**/*.spec.{js,ts,jsx,tsx}",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    reporter: "junit"
  },
});