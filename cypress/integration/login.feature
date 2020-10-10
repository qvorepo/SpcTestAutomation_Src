Feature: Login test on Starbucks Homepage
    Scenario: User login with invalid credentials
        Given I visit starbucks.com
        When I signin as invalid user
        Then Login failed