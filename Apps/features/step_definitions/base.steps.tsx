import {act, fireEvent, render, waitFor} from '@testing-library/react-native';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {loadFeature, defineFeature} from 'jest-cucumber';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Base from './../../Base';
import axios from 'axios';
const uuid = uuidv4();
const feature = loadFeature('Apps/features/base.feature');
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
defineFeature(feature, test => {
  test('Search for a movie', ({given, when, and, then}) => {
    screen = render(<Base />);
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: {
        Title: 'Manmadhudu',
        Year: '2002',
        Rated: 'N/A',
        Released: '20 Dec 2002',
        Runtime: '142 min',
        Genre: 'Comedy, Romance',
        Director: 'Vijay K. Bhaskar',
        Writer: 'Vijay K. Bhaskar, Trivikram Srinivas',
        Actors: 'Nagarjuna Akkineni, Sonali Bendre, Anshu',
        Plot: 'A misogynist is forced by circumstances to work with a woman.',
        Language: 'Telugu',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BOTE1M2IwMzktNjI1Mi00ZTFkLTg4MmMtNTZmMjk4YTdhODlkXkEyXkFqcGdeQXVyNjE2NTgxOTE@._V1_SX300.jpg',
        Ratings: [{Source: 'Internet Movie Database', Value: '8.3/10'}],
        imdbRating: '8.3',
        imdbVotes: '4,096',
        imdbID: 'tt0355742',
      },
    });
    given('I am on the search page', () => {
      expect(screen).toBeTruthy();
    });
    when('I select the "Movie" tab', () => {
      const movieTab = screen.getByTestId('movie-tab');
      act(() => {
        fireEvent.press(movieTab);
      });
    });
    and('I enter "Manmadhudu" in the search input and hit submit', async () => {
      const searchBar = screen.getByTestId('search-movie');
      const submitButton = screen.getByTestId('submit-button');
      act(() => {
        fireEvent.changeText(searchBar, 'Manmadhudu');
        fireEvent.press(submitButton);
      });
    });

    then('I should see the search results card', async () => {
      await waitFor(() => {
        const movieTitle = screen.getByText('Manmadhudu');
        const movieRating = screen.getByText('Rating: N/A');
        const movieYear = screen.getByText('2002');
        expect(movieTitle).toBeTruthy();
        expect(movieRating).toBeTruthy();
        expect(movieYear).toBeTruthy();
      });
    });

    and('I should be able to click the card to view more details', async () => {
      const movieCard = screen.getByTestId('movie-card');
      act(() => {
        fireEvent.press(movieCard);
      });
      expect(navigation.navigate).toBeCalled();
    });
  });
});
