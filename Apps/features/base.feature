Feature: Search and Display Movie/TV Show Details

    Scenario: Search for a movie
        Given I am on the search page
        When I select the "Movie" tab
        And I enter "Manmadhudu" in the search input and hit submit
        Then I should see the search results card
        And I should be able to click the card to view more details