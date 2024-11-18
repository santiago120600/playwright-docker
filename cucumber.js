module.exports = {
  default: {
    paths: ['src/features/**/*.feature'],
    format: ["allure-cucumberjs/reporter"],
    formatOptions: {
      resultsDir: "allure-results",
    }
  }
}