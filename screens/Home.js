import React from 'react';
//import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import {StyleSheet, Dimensions, ScrollView,View, Text, TouchableOpacity, RefreshControl} from 'react-native'; 

import { Block, theme } from 'galio-framework';

import { Card } from '../components';

import articles from '../constants/articles';
import { backendEndpoint, ALL_IT_URL } from '../src/api_methods/shared_base'; 
import Spinner from 'react-native-loading-spinner-overlay';
const { width } = Dimensions.get('screen');

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      refreshing: false
    }; 
    this.articles = [];
  }

  getArticleData = () => {
    this.articles = [];
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(backendEndpoint + ALL_IT_URL, requestOptions)
      .then(response => response.json())
      .then(result => {
        var articles = [];
        result.results.map((value, index) => {
          var article = {
            id: value.id,
            title: value.name,
            image: (value.image_path) ? value.image_path : "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
            cta: 'View Plan'
          }
          
          if(index % 3 === 0)
            article.horizontal = true;
          
          articles.push(article);
        })
        this.articles = articles;
        this.setState({refreshing: false});
      })
      .catch(error => {console.log('error', error);});
  }

  componentDidMount(){
    this.getArticleData();
  }

  renderArticles = () => {
    const { navigation} = this.props;
    var formatCounter = 0;

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
        refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.getArticleData()} />
        }>
        <Block flex>
          {this.articles.map((value, index) => {
            if(formatCounter === 1 && index < this.articles.length-1) {
              formatCounter = (formatCounter === 4) ? 0 : formatCounter + 1;
              return (
                <Block flex row>
                  <Card item={value} style={{ marginRight: theme.SIZES.BASE }} id={value.id} nextScreen={'Plan'} />
                  <Card item={this.articles[index+1]} id={this.articles[index+1].id} nextScreen={'Plan'} />
                </Block>
              );
            }
            else if(formatCounter === 2) { 
              formatCounter = (formatCounter === 4) ? 0 : formatCounter + 1;
            }
            else if(formatCounter === 3) {
              formatCounter = (formatCounter === 4) ? 0 : formatCounter + 1;
              return (<Card item={value} full id={value.id} nextScreen={'Plan'}/>);
            }
            else {
              formatCounter = (formatCounter === 4) ? 0 : formatCounter + 1;
              return (<Card item={value} horizontal id={value.id} nextScreen={'Plan'}/>);
            }
          })}
        </Block>
      </ScrollView>
    )
  }

  render() {
    if (this.articles === []) {
      return (
        <Block flex style={styles.container}>
        <Spinner
          visible={true}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      </Block> ); 
    }
    else {
      return (
        <Block flex center style={styles.home}>
          {this.renderArticles()}
        </Block>
      );
    }
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


/* DELETED STUFF 

// const character = {
//   name: 'Detienne20',
//   home: 'Tatooine',
//   species: 'human'
// }; 

   {/* <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Profile', { item: character })}>
        <Text style={styles.buttonText}>Who is {character.name}?</Text>

      </TouchableOpacity> */

