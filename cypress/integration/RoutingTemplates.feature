Feature: Routing Template Change on Label Routing Admin Test

    Scenario: User changes routing templates
        Given I visit Label Routing Admin homepage

        Then Page Title is correct

        When I select the Off-Peak option
        Then Off-Peak alert message should be displayed
        #Then Off-Peak state should be saved to RoutingState JSON file

        When I select the Lunch option
        Then Lunch alert message should be displayed
        #Then Lunch state should be saved to RoutingState JSON file 

        When I select the Peak option
        Then Peak alert message should be displayed
        #Then Peak state should be saved to RoutingState JSON file 

             
