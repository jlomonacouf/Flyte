import React from 'react';
import { ImageBackground, Image,View, StyleSheet, StatusBar, Dimensions, Platform, Linking, ActivityIndicator } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

//import { Platform, StyleSheet, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { HeaderHeight } from "../constants/utils";

const { height, width } = Dimensions.get('screen');
import { Images, argonTheme } from '../constants';



//Reference: https://github.com/joinspontaneous/react-native-loading-spinner-overlay/blob/master/example/App.js

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
});

export default class Loading extends React.Component {

  state = {
    spinner: false
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({
        spinner: !this.state.spinner
      });
    }, 5000);
  }

  render() {
    //const { navigation } = this.props;
    return (
      <Block flex style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      </Block>
    );
  } 
  }


  const styles = StyleSheet.create({
    spinnerTextStyle: {
      color: '#FFF'
    },
    containerSpin: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF'
    },
    container: {
      backgroundColor: theme.COLORS.BLACK,
      marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
      justifyContent: "center",
      width:1000,
      height: 22, 
  
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5
    }
  });



