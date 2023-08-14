Feature: Displaying Movie or TV Show Details

    Scenario: Display details of a movie
        Given I am on the details page
        Then I should see the title "Manmadhudu"
        And I should see the release year "2002"
        And I should see the genre "Comedy, Romance"
        And I should see the rated "N/A"
        And I should see the plot "A misogynist is forced by circumstances to work with a woman."
        And I should see the actors "Nagarjuna Akkineni, Sonali Bendre, Anshu"
        And I should see the ratings
        And I should not see the episodes