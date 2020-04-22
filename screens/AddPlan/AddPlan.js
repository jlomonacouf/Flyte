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
import { Card, Button, Icon, Input } from '../../components';
import { Images, argonTheme } from "../../constants";
import { backendEndpoint, USER_TRIPS_URL, ADD_PLAN_TO_TRIP_URL } from '../../src/api_methods/shared_base'; 
import Spinner from 'react-native-loading-spinner-overlay';
const { height, width } = Dimensions.get('screen');
import GLOBAL from '../../src/api_methods/global'

class AddPlanTrips extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      loaded: true
    }; 
    this.articles = [];
  }

  formatDate = (date) => {
    let d = new Date(Date.parse(date)).toString().split(' ');
    return d[0] + ', ' + d[1] + ' ' + d[2] + ', ' + d[3];
  }

  getArticleData = () => {
    this.articles = [];
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(backendEndpoint + USER_TRIPS_URL + GLOBAL.USERNAME, requestOptions)
      .then(response => response.json())
      .then(result => {
        var articles = [];
        result.results.map((value, index) => {
          var article = {
            id: value.id,
            title: value.name,
            description: "Start: " + this.formatDate(value.start_date) + '\n' + "End: " + this.formatDate(value.end_date),
            image: (value.image_path) ? value.image_path : "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
            cta: 'Add to Trip'
          }
          
          
          articles.push(article);
        })
        this.articles = articles;
        this.setState({refreshing: false, loading: false});
      })
      .catch(error => {console.log('error', error);});
  }

  componentDidMount(){
    this.getArticleData();
  }
  
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

  updateChangedTrips = (locationIDs) => {
    var body = {trip_id: locationIDs.tripID, locations: locationIDs.locations, itinerary_id: this.props.route.params.itineraryID};
    
    fetch(backendEndpoint + ADD_PLAN_TO_TRIP_URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })
      .then((response) => response.json())
      .then((data) => {
          if(data.success === true) {
              alert("Plan added successfully")
          }
          else {
              console.log(data)
          }
      }).catch((error) => {
          console.log(error)
      })
  }

  renderUserTrips= () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
  
        <Block flex style={{marginTop: 80}}>
          {this.articles.map((value,index) => {
            return (
              <Card item={this.articles[index]} horizontal id={value.id} callback={this.updateChangedTrips}  nextScreen={'AddPlanToLocation'} />
            )
          })}
        </Block>
        
      </ScrollView>
    )
  }

/*
<Block flex>
  <Card item={articles[0]} horizontal  nextScreen={'Trip'} />
  <Block flex row>
    <Card item={articles[1]} nextScreen={'Trip'} style={{ marginRight: theme.SIZES.BASE }} />
    <Card item={articles[2]} nextScreen={'Trip'} />
  </Block>
  <Card item={articles[3]} horizontal nextScreen={'Trip'} />
  <Card item={articles[4]} full nextScreen={'Trip'}/>
</Block>
*/

  render() {
    if (this.state.loading === true) {
      return (
        <Block flex style={styles.container}>
          <Spinner
            visible={true}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
        </Block> 
      ); 
    }
    else {
      if(this.articles.length !== 0)
      {
        return (
          <Block flex middle style={styles.home}>
            {this.renderUserTrips()}
          </Block>
        );
      }
      else {
        return (
          <Block style={{marginTop: height / 6}}>
            <Text size={20} style={{textAlign: "center",color:"gray"}}>You do not have any trips</Text>
            <Text style={{textAlign: "center", color:"gray"}}>Click here to make one!</Text>
          </Block>
        )
      }
    }
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
    backgroundColor: "white",
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});

export default AddPlanTrips;