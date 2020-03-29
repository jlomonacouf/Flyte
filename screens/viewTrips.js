import React from 'react';
import {
  StyleSheet,
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
import images from "../constants/Images";

const { height, width } = Dimensions.get('screen');

class viewTrips extends React.Component {


  renderLogin = () => {

    const { navigation } = this.props;
      return (
        
        <ScrollView
             showsVerticalScrollIndicator={false}
             contentContainerStyle={styles.articles}>
      <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
         
      <Block style={styles.registerContainer}>
      <Block flex middle>
      <Block center>
      <Image source={images.Logo} style={styles.logo} />
      </Block>
            <Text bold size={25} style={styles.primaryText}> FLYTE </Text>
                <Block >
                <Text size={14}  style={styles.primaryText} > It looks like you're not logged in  </Text>
  
                      <Button color="primary" style={styles.createButton}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}
                        onPress={() => navigation.navigate("Register")}>>
                         LOG IN
                        </Text>
                      </Button>
                    </Block>

      </Block>
      </Block>
      </ImageBackground>
        </ScrollView>
      )

  }


  renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
  
        <Block flex>
          <Card item={articles[0]} horizontal  />
          <Block flex row>
            <Card item={articles[1]} style={{ marginRight: theme.SIZES.BASE }} />
            <Card item={articles[2]} />
          </Block>
          <Card item={articles[3]} horizontal />
          <Card item={articles[4]} full />
        </Block>
        
      </ScrollView>
    )
  }

  render() {
    const isLoggedIn = false; 
    return (
      <Block flex center style={styles.home}>
        {this.props.isLoggedIn ? this.renderArticles(): this.renderLogin()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
    primaryText: {
      padding: 10  
    },
    registerContainer: {
      width: width * 0.9,
      height: height * 0.78,
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
      overflow: "hidden"
    },
    logo: {
      width: 200,
      height: 60,
      zIndex: 2,
      position: 'relative',
      marginTop: '-50%'
    },
  home: {
    width: width,    
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});

export default viewTrips;