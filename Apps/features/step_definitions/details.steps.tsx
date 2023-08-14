import {act, fireEvent, render, waitFor} from '@testing-library/react-native';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {loadFeature, defineFeature} from 'jest-cucumber';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Details from '../../Details';
import axios from 'axios';
const uuid = uuidv4();
const feature = loadFeature('Apps/features/details.feature');
const navigation = useNavigation<NativeStackNavigationProp<any>>();
jest.mock('axios');
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn().mockReturnValue({
      navigate: jest.fn(),
    }),
  };
});
let screen: any;
const mockRoute = {
  params: {
    state: {
      Title: 'Manmadhudu',
      Year: '2002',
      Genre: 'Comedy, Romance',
      Rated: 'N/A',
      Plot: 'A misogynist is forced by circumstances to work with a woman.',
      Actors: 'Nagarjuna Akkineni, Sonali Bendre, Anshu',
      Ratings: [{Source: 'Internet Movie Database', Value: '8.3/10'}],
    },
  },
};
defineFeature(feature, test => {
  test('Display details of a movie', ({given, when, and, then}) => {
    screen = render(<Details route={mockRoute} />);

    given('I am on the details page', () => {
      expect(screen).toBeDefined();
    });
    then('I should see the title "Manmadhudu"', () => {
      const movieTitle = screen.getByText('Manmadhudu');
      expect(movieTitle).toBeTruthy();
    });
    and('I should see the release year "2002"', () => {
      const releaseYear = screen.getByText('2002');
      expect(releaseYear).toBeTruthy();
    });
    and('I should see the genre "Comedy, Romance"', () => {
      const genre = screen.getByText('Genre: Comedy, Romance');
      expect(genre).toBeTruthy();
    });
    and('I should see the rated "N/A"', () => {
      const rated = screen.getByText('Rated: N/A');
      expect(rated).toBeTruthy();
    });
    and(
      'I should see the plot "A misogynist is forced by circumstances to work with a woman."',
      () => {
        const plot = screen.getByText(
          'A misogynist is forced by circumstances to work with a woman.',
        );
        expect(plot).toBeTruthy();
      },
    );
    and(
      'I should see the actors "Nagarjuna Akkineni, Sonali Bendre, Anshu"',
      () => {
        const actors = screen.getByText(
          'Actors: Nagarjuna Akkineni, Sonali Bendre, Anshu',
        );
        expect(actors).toBeTruthy();
      },
    );
    and('I should see the ratings', () => {
      const ratingSource = screen.getByText('Internet Movie Database: 8.3/10');
      expect(ratingSource).toBeTruthy();
    });
    and('I should not see the episodes', () => {
      try {
        screen.getByTestId('episodes-container');
        expect(true).toBeFalsy();
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
