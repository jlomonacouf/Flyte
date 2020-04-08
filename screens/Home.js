import React from 'react';
//import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import {StyleSheet, Dimensions, ScrollView,View, Text, TouchableOpacity} from 'react-native'; 

import { Block, theme } from 'galio-framework';

import { Card } from '../components';

import articles from '../constants/articles';
const { width } = Dimensions.get('screen');

const character = {
  name: 'Detienne20',
  home: 'Tatooine',
  species: 'human'
}; 


class Home extends React.Component {

 
  renderArticles = () => {
    const { navigation} = this.props;
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
      
       {/* <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Profile', { item: character })}>
        <Text style={styles.buttonText}>Who is {character.name}?</Text>

      </TouchableOpacity> */}
        <Block>
        
        </Block>
        <Block flex>
      
          <Card item={articles[0]} horizontal nextScreen={'Trip'}/>
          <Block flex row>
            <Card item={articles[1]} style={{ marginRight: theme.SIZES.BASE }} nextScreen={'Trip'} />
            <Card item={articles[2]} nextScreen={'Trip'} />
          </Block>
          <Card item={articles[3]} horizontal nextScreen={'Trip'} />
          <Card item={articles[4]} full nextScreen={'Trip'} />
        </Block>
      </ScrollView>
    )
  }

  render() {
    
    return (
      <Block flex center style={styles.home}>
        {this.renderArticles()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebebeb'
  },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold'
  },
  buttonContainer: {
    backgroundColor: '#222',
    borderRadius: 5,
    padding: 10,
    margin: 20
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  }
});

export default Home;
