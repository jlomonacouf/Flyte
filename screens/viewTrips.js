import React from 'react';
import {
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView, 
  ScrollView
} from "react-native";
import { Block, theme, Text } from 'galio-framework';
import { Card, Button, Icon, Input } from '../components';
import articles from '../constants/articles';
import { Images, argonTheme } from "../constants";

const { height, width } = Dimensions.get('screen');

class viewTrips extends React.Component {


  renderLogin = () => {

    const { navigation } = this.props;
      return (
        
        <ScrollView
             showsVerticalScrollIndicator={false}
             contentContainerStyle={styles.articles}>
  
      <Block style={styles.registerContainer}>
      <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
  
      <Block flex middle>
      <Block center>
      <Image source={Images.Logo} style={styles.logo} />
      </Block>
            <Text bold size={40} style={styles.primaryText}> FLYTE </Text>
                <Block >
                <Text size={20}  style={styles.primaryText} > It looks like you're not logged in  </Text>
                      <Button color="primary" style={styles.createButton}>
                        <Text bold size={16} color={argonTheme.COLORS.WHITE}
                        onPress={() => navigation.navigate("Login")}>>
                         LOG IN
                        </Text>
                      </Button>
                    </Block>

      </Block>
      </ImageBackground>
      </Block>
    
        </ScrollView>
      )

  }


  renderUserTrips= () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
  
        <Block flex>
          <Card item={articles[0]} horizontal  nextScreen={'Trip'} />
          <Block flex row>
            <Card item={articles[1]} nextScreen={'Trip'} style={{ marginRight: theme.SIZES.BASE }} />
            <Card item={articles[2]} nextScreen={'Trip'} />
          </Block>
          <Card item={articles[3]} horizontal nextScreen={'Trip'} />
          <Card item={articles[4]} full nextScreen={'Trip'}/>
        </Block>
        
      </ScrollView>
    )
  }



  render() {

    return (
      <Block flex middle style={styles.home}>
        {this.renderUserTrips()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
    primaryText: {
      padding: 25,
      color: 'white',
      fontWeight: 'bold',
      //fontSize: 20
    },
    registerContainer: {
      width: width,
      height: height,
      backgroundColor: "#F4F5F7",
      borderRadius: 4,
      shadowColor: argonTheme.COLORS.BLACK,
      shadowOffset: {
        width: 0,
        height: 4
      },
      shadowRadius: 8,
      shadowOpacity: 0.1,
      elevation: 1,
      overflow: "hidden",
    },
    logo: {
      width: 200,
      height: 60,
      zIndex: 2,
      position: 'relative',
      marginTop: '-50%'
    },
    createButton: {
      width: width * 0.80,
      marginTop: 15
    },
  home: {
    width: width,  
    height: height , 
    backgroundColor: "black",
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});

export default viewTrips;