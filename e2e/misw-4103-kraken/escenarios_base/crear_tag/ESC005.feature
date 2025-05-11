Feature: Create tags
  
  @user1 @web
  Scenario: ESC005 - Create a valid tag
    Given the user is on the page "signin"
    And I wait for 2 seconds
    When the user enters user and password
    And I wait for 2 seconds
    Then "1" they should be redirected to "dashboard"
    And "2" the user navigates to the "tags" section
    And I wait for 2 seconds
    And "3" the user clicks on the "New tag" link
    And "4" they enter the value "randome" in the "name" field of type "input"
    And "5" they enter the value "description Kraken e2e" in the "description" field of type "textarea"
    And "6" the user clicks on the "Save" button
    And I wait for 2 seconds
    And "7" the user navigates to the "tags" section
    And I wait for 2 seconds
    Then "8" the user should see the tag "randome" in the list of tags