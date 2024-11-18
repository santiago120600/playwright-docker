Feature: Ecommerce validations

  Scenario Outline: Placing the order
    Given user login to Ecommerce application with "<username>" and "<password>"
    When Add "<productName>" to cart
    And user navigates to cart page
    Then Verify product name matches with "<productName>"
    When user navigates to Checkout page
    Then verify product name matches with "<productName>"
    And Fill Credit card number: "<creditCardNumber>", Expiry date: "<monthExpiry>" "<yearExpiry>", cvv code: "<cvv>", name on card: "<nameOnCard>"
    And verify email matches with "<username>", select country "<country>"
    And apply coupon "<coupon>"
    When user navigates to order confirmation page
    Then verify thankyou for the order text is displayed
    And capture order id
    When click Orders History Page link
    Then verify order id is displayed
    And click View button
    Then verify order id, country: "<country>", email: "<username>", product name: "<productName>" are correct

    Examples:
      | username           | password | productName   | creditCardNumber | monthExpiry | yearExpiry | cvv | nameOnCard | country | coupon             |
      | santiago@gmail.com | aB#45678 | IPHONE 13 PRO | 1234567890123456 |          12 |         25 | 123 | John Doe   | Mexico  | rahulshettyacademy |
