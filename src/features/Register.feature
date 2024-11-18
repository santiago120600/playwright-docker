Feature: Register

  Scenario Outline: Create user account
    Given user navigates to register screen
    And user enters First Name: "<firstName>" ,Last Name: "<lastName>", Email: "<email>", Phone: "<phone>", Password: "<password>", Occupation: "<occupation>", Gender: "<gender>"
    Then success message is displayed

    Examples:
      | firstName | lastName | email               | phone      | password | occupation | gender |
      | santiago  | castanon | santiago@gmail.comm | 4426244709 | aB#45678 | Engineer   | Male   |
