import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import axios from 'axios';
export default function Base() {
  const apiKey = '161ed901';
  const [results, setResults] = useState<any>(null);
  const [selectedTab, setSelected] = useState<string>('movie');
  const [search, setSearch] = useState('');
  const [season, setSeason] = useState('0');
  const [episode, setEpisode] = useState('0');
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const handleSubmit = async () => {
    try {
      let response: any;

      if (selectedTab === 'movie') {
        response = await axios.get(
          `https://www.omdbapi.com/?t=${search}&apiKey=${apiKey}`,
        );
      } else if (selectedTab === 'tv-show') {
        if (season > '0') {
          response = await axios.get(
            `https://www.omdbapi.com/?t=${search}&Season=${season}&apiKey=${apiKey}`,
          );

          if (episode > '0') {
            const episodeResponse = await axios.get(
              `https://www.omdbapi.com/?t=${search}&Season=${season}&Episode=${episode}&apiKey=${apiKey}`,
            );
            setResults(episodeResponse.data);
            return;
          }
        } else {
          response = await axios.get(
            `https://www.omdbapi.com/?t=${search}&apiKey=${apiKey}`,
          );
        }
      }

      setResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  const handleTabChange = (newValue: string) => {
    setSelected(newValue);
  };

  const handleNavigation = () => {
    navigation.navigate('Details', {state: results});
  };

  return (
    <View style={{padding: 10}}>
      {results && (
        <TouchableOpacity
          onPress={handleNavigation}
          testID="movie-card"
          style={{
            maxWidth: 400,
            margin: 'auto',
            borderRadius: 16,
            backgroundColor: '#f3f3f3',
            overflow: 'hidden',
            marginBottom: 20,
          }}>
          <Image
            source={{uri: results.Poster}}
            style={{height: 200, borderRadius: 16}}
          />
          <View style={{padding: 10}}>
            <Text style={{fontSize: 24}}>{results.Title}</Text>
            <Text style={{fontSize: 20}}>{results.Year}</Text>
            <Text style={{fontSize: 20}}>Rating: {results.Rated}</Text>
          </View>
        </TouchableOpacity>
      )}
      <View
        style={{borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'black'}}>
        <ScrollView horizontal>
          <TouchableOpacity
            onPress={() => handleTabChange('movie')}
            style={[
              styles.tabButton,
              selectedTab === 'movie' && styles.selectedTab,
            ]}
            testID="movie-tab">
            <Text style={styles.tabText}>Movie</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleTabChange('tv-show')}
            style={[
              styles.tabButton,
              selectedTab === 'tv-show' && styles.selectedTab,
            ]}>
            <Text style={styles.tabText}>TV Show</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={{marginTop: 20}}>
        <TextInput
          placeholder="Search TV Show or Movie"
          onChangeText={setSearch}
          value={search}
          style={{borderWidth: 1, padding: 10}}
          testID="search-movie"
        />
        {selectedTab === 'tv-show' && (
          <>
            <TextInput
              placeholder="Season"
              onChangeText={setSeason}
              value={season}
              keyboardType="numeric"
              style={{borderWidth: 1, padding: 10, marginTop: 10}}
            />
            <TextInput
              placeholder="Episode"
              onChangeText={setEpisode}
              value={episode}
              keyboardType="numeric"
              style={{borderWidth: 1, padding: 10, marginTop: 10}}
            />
          </>
        )}
        <View style={{marginTop: 20}}>
          <Button
            title="Submit"
            onPress={handleSubmit}
            testID="submit-button"
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  tabButton: {
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  selectedTab: {
    backgroundColor: '#4477CE',
  },
  tabText: {
    fontSize: 16,
  },
});
