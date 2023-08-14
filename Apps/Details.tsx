import React from 'react';
import {View, Text, ScrollView, Image, StyleSheet} from 'react-native';

const Details = ({route}: any) => {
  const {
    Title,
    Actors,
    Awards,
    BoxOffice,
    Plot,
    Poster,
    Rated,
    Ratings,
    Genre,
    Episodes,
    Year,
  } = route.params.state;
  //console.log(route);
  return (
    <ScrollView style={{backgroundColor: '#14181f', minHeight: '100%'}}>
      <View
        style={{
          padding: 20,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            padding: 20,
            maxWidth: 800,
            width: '100%',
            borderRadius: 16,
            backgroundColor: '#21272B',
            alignSelf: 'center',
            marginBottom: 20,
          }}>
          <View>
            <Text style={styles.textStyling} testID="movie-title">
              {Title}
            </Text>
            <Text style={styles.textStyling}>{Year}</Text>
          </View>
          {Poster && (
            <Image
              source={{uri: Poster}}
              alt={Title}
              style={{
                maxWidth: 300,
                height: 200,
                marginBottom: 20,
                borderRadius: 16,
                marginTop: 16,
              }}
            />
          )}
          {Genre && <Text style={styles.textSubStyling}>Genre: {Genre}</Text>}

          {Rated && <Text style={styles.textSubStyling}>Rated: {Rated}</Text>}
          {Plot && (
            <Text style={{marginBottom: 20, color: 'white'}}>{Plot}</Text>
          )}
          {Actors && (
            <Text style={styles.textSubStyling}>Actors: {Actors}</Text>
          )}
          {Awards && (
            <Text style={styles.textSubStyling}>Awards: {Awards}</Text>
          )}
          {BoxOffice && Episodes && (
            <Text style={styles.textSubStyling}>Box Office: {BoxOffice}</Text>
          )}
          {Ratings && Ratings.length > 0 && (
            <Text style={styles.textSubStyling}>Ratings:</Text>
          )}
          {Ratings && Ratings.length > 0 && (
            <View style={{marginLeft: 20, marginBottom: 20}}>
              {Ratings.map((rating: any, index: number) => (
                <Text key={index} style={{color: 'white'}}>
                  {rating.Source}: {rating.Value}
                </Text>
              ))}
            </View>
          )}
          {Episodes && (
            <View style={{marginBottom: 20}}>
              <Text style={styles.textSubStyling}>Episodes:</Text>
              <View style={{marginLeft: 20}}>
                {Episodes.map((episode: any) => (
                  <View key={episode.imdbID}>
                    <Text style={{fontSize: 16}}>
                      {episode.Title} ({episode.Released})
                    </Text>
                    <Text style={{fontSize: 14}}>
                      Episode: {episode.Episode}, IMDB Rating:{' '}
                      {episode.imdbRating}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  textStyling: {
    fontSize: 24,
    marginBottom: 10,
    color: 'white',
  },
  textSubStyling: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
});

export default Details;
