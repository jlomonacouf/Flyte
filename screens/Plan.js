import React from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions, 
  TouchableOpacity
} from "react-native";
//galio
import { Button, Block, Text, Icon, theme } from "galio-framework";
//argon
import MapView, {Marker} from 'react-native-maps';
import { articles, Images, argonTheme } from "../constants";
import { Card } from "../components";
import Spinner from 'react-native-loading-spinner-overlay';
const { width, height } = Dimensions.get("screen");
import { backendEndpoint, SINGLE_IT_URL, LIKE_IT_URL, DISLIKE_IT_URL } from '../src/api_methods/shared_base'; 
const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;

const initialRegion={
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}; 



class Trip extends React.Component {
  componentDidMount = () => {
    const { route } = this.props;

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch(backendEndpoint + SINGLE_IT_URL + route.params.id, requestOptions)
        .then(response => response.json())
        .then(result => {
          this.setState({id: route.params.id, author: result.itinerary.username, title: result.itinerary.name, text: result.itinerary.text, 
            tags: result.itinerary.hashtags, region: {latitude: result.itinerary.latitude, longitude: result.itinerary.longitude, latitudeDelta: 0.3, longitudeDelta: 0.3},
            likes: result.itinerary.likes, isLiked: result.itinerary.is_liked, loaded: true});

          var photos = [];
          result.itinerary.images.forEach(image => {
            photos.push({title: image.title, caption: image.caption, image: image.image_path})
          })
          this.setState({photos: photos})
        })
        .catch(error => {
          console.log('error', error);
          alert("Error: Unable to load plan")
          this.props.navigation.reset({index: 0, routes: [{ name: 'Home' }],})
        });
  }

  state = {
    region: {
      latitude: 57.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }, 
    markers: [
      // { id:1, 
      //   latlng:{
      //     latitude: 57.78825, 
      //     longitude: -122.4324
      //   }, 
      //   title: "Stop 1",
      //   description: "This is the first stop on the itinerary"
      // },
      { id:2, 
        latlng:{
          latitude:41.9009, 
          longitude: 12.4833
        }, 
        title: "Trevi Fountain",
        description: "Completely worth it"
      },
      { id:0, 
        latlng:{
          latitude:41.8992, 
          longitude: 12.4731
        }, 
        title: "Piazza Navona",
        description: "Yes there was pizza"
      },
      { id:3, 
        latlng:{
          latitude:41.9060, 
          longitude: 12.4828
        }, 
        title: "Spanish Steps",
        description: "Photo Op"
      },
      { id:4, 
        latlng:{
          latitude:41.9031, 
          longitude: -12.4663
        }, 
        title: "castel sant'angelo",
        description: "Breathtaking"
      },
      { id:5, 
        latlng:{
          latitude:41.8902, 
          longitude: 12.4922
        }, 
        title: "Colosseum",
        description: "Spent extra time here!"
      }
    ],
    loaded: false,
    id: 0,
    author: "",
    title: "",
    text: "",
    tags: "",
    photos: []
};

  renderProduct = (item, index) => {
    const { navigation } = this.props;

    return (
      <TouchableWithoutFeedback
        style={{ zIndex: 3 }}
        key={`product-${item.title}`}
       onPress={() => navigation.navigate("Loading", { product: item })}
      >
        <Block center style={styles.productItem}>
          <Image
            resizeMode="stretch"
            style={styles.productImage}
            source={{ uri: item.image }}
          />
          <Block center style={{ paddingHorizontal: theme.SIZES.BASE }}>
           
            <Text center size={18}   style={{marginTop: 6, marginBottom:2}}>
              {item.title}
            </Text>
            <Text
              center
              size={16}
              color={theme.COLORS.MUTED}
              style={styles.productDate}
            >
              {item.caption}
            </Text>
          </Block>
        </Block>
      </TouchableWithoutFeedback>
    );
  };

  onRegionChange = (region) => {
    this.setState({ region });
  }; 

  renderLikes = () => {
    if(this.state.isLiked === 0) {
      return (
        <TouchableOpacity onPress={() => this.toggleLike()}>
          <Block flex row style={{alignSelf:"flex-end", paddingHorizontal: theme.SIZES.BASE * 1.7, marginBottom: 20}}>
            <Text size={20} style={{color:"gray"}}>{this.state.likes}</Text>
            <Icon name="thumbs-up" family="Entypo" size={22} color="gray"/>
          </Block>
        </TouchableOpacity>
      )
    }
    else {
      return (
        <TouchableOpacity onPress={() => this.toggleLike()}>
          <Block flex row style={{alignSelf:"flex-end", paddingHorizontal: theme.SIZES.BASE * 1.7, marginBottom: 20}}>
            <Text size={20} style={{color:"blue"}}>{this.state.likes}</Text>
            <Icon name="thumbs-up" family="Entypo" size={22} color="blue"/>
          </Block>
        </TouchableOpacity>
      )
    }
  }

  toggleLike = () => {
    var likes = (this.state.isLiked === 1) ? true : false;
    var URL = (likes) ? DISLIKE_IT_URL : LIKE_IT_URL;

    fetch(backendEndpoint + URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({itinerary_id: this.state.id})
    }).then(response => response.json())
    .then(result => {
      if(result.success === true)
        this.setState({isLiked: (likes) ? 0 : 1, likes: (likes) ? this.state.likes-1 : this.state.likes+1})
    }).catch(err => {
      console.log(err);
    })
  }

  formatTags = () => {
    if(this.state.tags === null)
      return "";

    var tags = this.state.tags.split(',');
    var tagList = "";

    tags.forEach((tag) => {
      tag = tag.charAt(0).toUpperCase() + tag.substring(1);
      tag = (tag.charAt(0) !== '#') ? '#' + tag : tag;
      tagList += tag + "  ";
    })

    return tagList;
  }

  goToInitialLocation() {
    let initialRegion = Object.assign({}, this.state.initialRegion);
    initialRegion["latitudeDelta"] = 0.005;
    initialRegion["longitudeDelta"] = 0.005;
    this.mapView.animateToRegion(initialRegion, 2000);
  }

  renderCards = () => {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.group}>
        <Block flex>
          <Block>
            <Block flex shadow style={styles.category}>
            {/* <Block style={styles.categoryTitle}>
                  <Text size={18} bold color={theme.COLORS.WHITE}>
                    City, Greece
                  </Text>
                </Block> */}
            <Block style={styles.mapContainer} >
              <MapView 
              ref={MapView => (this.MapView = MapView)} //NEW 
              style={styles.mapStyle} 
              loadingEnabled ={true}
              loadingIndicatorColor="#666666"
              loadingBackgroundColor="#eeeeee"
              moveOnMarkerPress = {false}
              showsCompass={true}
             //region={this.state.region}
            // onRegionChange={this.onRegionChange}
             provider="google">
                  {this.state.markers.map(marker => (
                    <Marker draggable
                      key={marker.id}
                      coordinate={marker.latlng}
                      title={marker.title}
                      description={marker.description}
                      onDragEnd={(e) => this.setState({ coordinate: e.nativeEvent.coordinate })}
                    />
                  ),
                  //console.log(this.state.markers)
                  )}
                </MapView>
              </Block>
            </Block>
            <Block>
              <Text bold size={24} style={styles.title}>
                {this.state.title}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Profile', { view_username: this.state.author })}>
                <Text center color="green" size={12}>@{this.state.author}</Text>
              </TouchableOpacity>
              <Block>
                <Text size={15} style={styles.subTitle}>
                  {this.state.text}
                </Text>
                <Button color="info" style={{width: width * 0.30, marginTop: 25}} onPress={() => this.props.navigation.navigate('AddPlan', {itineraryID: this.state.id})}>
                  <Text bold size={16} color={argonTheme.COLORS.WHITE}>Save to Trip</Text>
                </Button>
                {this.renderLikes()}
            </Block>
        </Block>
        </Block>
          <Block flex style={{ marginTop: theme.SIZES.BASE / 2 }}>
            <ScrollView
              horizontal={true}
              pagingEnabled={true}
              decelerationRate={0}
              scrollEventThrottle={16}
              snapToAlignment="center"
              showsHorizontalScrollIndicator={false}
              snapToInterval={cardWidth + theme.SIZES.BASE * 0.375}
              contentContainerStyle={{
                paddingHorizontal: theme.SIZES.BASE / 2
              }}
            >
              {this.state.photos &&
                this.state.photos.map((item, index) =>
                  this.renderProduct(item, index)
                )}
            </ScrollView>
          </Block>
          <Block flex  style={{margin:20}}>
            <Text center size={18}  color={argonTheme.COLORS.HEADER}>
              {this.formatTags()}
            </Text>
          </Block>        
        </Block>
      </Block>
    );
  };



  render() {
    if(this.state.loaded === false) {
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
  mapContainer:{
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  mapStyle: {
    width:width,
    height: 240
  },
  title: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 20,
   // color: argonTheme.COLORS.HEADER,
   color: 'black',
    alignSelf: "center",
    textAlign: "center"
  },
  subTitle: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 20,
    color: 'black',
    alignSelf: "center",
    textAlign: 'justify',
    lineHeight: 30,
  },

  group: {

  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0
  },
  categoryTitle: {
    height: "50%",
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  imageBlock: {
    overflow: "hidden",
    borderRadius: 4
  },
  productItem: {
    width: cardWidth - theme.SIZES.BASE * 3,
    marginHorizontal: theme.SIZES.BASE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 10,
    shadowOpacity: 0.2
  },
  productImage: {
    width: cardWidth - theme.SIZES.BASE*2,
    height: cardWidth - theme.SIZES.BASE*6,
    borderRadius: 3
  },
  productDate: {
    //paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2
  },
  productDescription: {
    paddingTop: theme.SIZES.BASE
    // paddingBottom: theme.SIZES.BASE * 2,
  }
});

export default Trip;
