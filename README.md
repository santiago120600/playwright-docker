https://rahulshettyacademy.com/client Test Automation

### Generate `allure-results` folder
`npx cucumber-js features/Ecommerce.feature --format allure-cucumberjs/reporter --format-options '{ "resultsDir": "allure-results" }'`
`npx cucumber-js features/Ecommerce.feature --format allure-cucumberjs/reporter --format-options "{\"resultsDir\": \"allure-results\"}"`

### Generate `allure-report` folder
`allure generate ./allure-results --clean`

### Show report
`allure serve allure-results`
`allure open`
