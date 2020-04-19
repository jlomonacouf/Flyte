import React from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { articles, Images, argonTheme } from "../../constants";
import { Card } from "../../components";
import Spinner from 'react-native-loading-spinner-overlay';

const { width } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;

import { backendEndpoint, USER_FOLLOWERS_URL} from "../../src/api_methods/shared_base";


class Followers extends React.Component {
  
  state = {}

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
}  


async componentDidMount(){

    var fetchID=GLOBAL.USERNAME;  
    const { navigation} = this.props; 

    if(this.props.route.params!=undefined) fetchID=this.props.route.params.username; //Get username of user we want to view 

      var requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow'
      };
      const information = await fetch(backendEndpoint + USER_FOLLOWERS_URL + fetchID, requestOptions)
      .then( response => response.json())
      .then( result => {  
          if(result.success){
            if(result.results.length==0){
              this.setStateAsync({ loserMessage: "Currently have no followers"}); 
            }
            this.setStateAsync({ followersList : result.results});
          }else{
            alert("Error " + result.message);
          }
      }).catch(error => {
            alert("Network error, please try again in a moment");
            console.log('error', error); 
       });
    }


  renderFollowers = (follower, index) => {

    const { navigation, horizontal, full, style, ctaColor, imageStyle } = this.props;
    
    const imageStyles = [
      full ?   styles.horizontalImage : styles.fullImage,
      imageStyle
    ];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [styles.imageContainer,
      horizontal ?  styles.verticalStyles : styles.horizontalStyles ,
      styles.shadow
    ];

    return (
    
      < ScrollView>
        <Block flex={0.17} middle>
         {this.state.loserMessage && <Text style={{fontSize: 14, color: 'purple', padding: 5}}>{this.state.loserMessage}</Text>}
      </Block>
      
      <Block row={horizontal} card flex style={cardContainer}>
      <TouchableWithoutFeedback style={{zIndex:3}} key={`user-${index}`} onPress={() => navigation.navigate("Profile", {view_username: follower.username})}  >
        <Block flex style={imgContainer}>
          <Image source={{uri: follower.avatar_path}} style={imageStyles} />
        </Block>
        </TouchableWithoutFeedback>
      <TouchableWithoutFeedback style={{zIndex:3}} key={`user-${follower.username}`} onPress={() => {
        navigation.navigate("Profile", {view_username: follower.username})}}>
        <Block flex space="between" style={styles.cardDescription}>

          <Text center size={14} style={styles.cardTitle}>{follower.first_name} {follower.last_name}</Text>
          <Text center size={14} muted={!ctaColor} color={ctaColor || argonTheme.COLORS.ACTIVE} bold>{follower.username}</Text>
        </Block>
      </TouchableWithoutFeedback>
    </Block>
     </ScrollView>
    ); 

  };

  renderCards = () => {
    return (
      <Block flex style={styles.group}>
        <Text  center bold size={20} style={styles.title}>
          Followers 
        </Text>
        <Block flex >
        <Block flex={0.17} middle>
         {this.state.loserMessage && <Text style={{fontSize: 14, color: 'purple', padding: 5}}>{this.state.loserMessage}</Text>}
      </Block>
        <Block style={{ width: width - theme.SIZES.BASE * 2, paddingHorizontal: theme.SIZES.BASE}}>
          <ScrollView>
            { this.state.followersList && this.state.followersList.map((follower,index) =>
                this.renderFollowers(follower, index))}
          </ScrollView>
        </Block>
        </Block>
        <Block flex style={{ marginTop: theme.SIZES.BASE / 2 }}></Block>
       
      </Block>
    );
  };


  render() {

    if (!this.state.followersList) {
      return (
        <Block flex style={styles.container}>
        <Spinner
          visible={true}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      </Block> )

   }
  else {
    return (
      <Block flex center>
        <ScrollView
          showsVerticalScrollIndicator={false}
          >
          {this.renderCards()}

        </ScrollView>
      </Block>
    );
  }
  } 
}

const styles = StyleSheet.create({
  title: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 22,
    color: argonTheme.COLORS.HEADER
  },
  group: {
    paddingTop: theme.SIZES.BASE
  },
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 16
  },
  cardTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: 215
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },





});

export default Followers;

