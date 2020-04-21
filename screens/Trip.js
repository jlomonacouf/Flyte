import React from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions, 
  TouchableOpacity,
  View
} from "react-native";
//galio
import { Button, Block, Text, Icon, theme } from "galio-framework";
//argon
import MapView, {Marker} from 'react-native-maps';
import { articles, Images, argonTheme } from "../constants";
import { Card } from "../components";
import Spinner from 'react-native-loading-spinner-overlay';
const { width, height } = Dimensions.get("screen");
import { backendEndpoint, SINGLE_TRIP_URL } from '../src/api_methods/shared_base'; 
const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;

class Trip extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            trip: [],
            locations: [],
            itineraries: [],
            loading: true
        }
        this.currentLocation = 0;
    }

    componentDidMount() {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
    
        fetch(backendEndpoint + SINGLE_TRIP_URL + this.props.route.params.id, requestOptions)
          .then(response => response.json())
          .then(result => {
              this.setState({loading: false, trip: result.results, locations: result.results[0].location, itineraries: result.results[0].itineraries})
          })
          .catch(error => {console.log('error', error);});
    }

    onRegionChange = (region) => {
        this.setState({ region });
    };

    formatDate = (date) => {
        let d = new Date(Date.parse(date)).toString().split(' ');

        var day = d[2];
        if(day.charAt(0) === '0')
            day = day.substr(1, day.length);
        
        switch(d[2].charAt(d[2].length-1)) {
            case "1":
                day += "st";
                break;
            case "2":
                day += "nd";
                break;
            case "3":
                day += "rd";
                break;
            default:
                day += "th";
                break;
        }
        return d[1] + ' ' + day + ', ' + d[3];
    }

    renderItineraryCards = (locationID) => {
        var locationHasItineraries = false;
        return (
            <Block flex row>
                {this.state.itineraries.map((itinerary, index) => {
                    if(itinerary.location_id === locationID) {
                        locationHasItineraries = true;
                        var article = {
                            id: itinerary.itinerary_id,
                            title: itinerary.name,
                            image: itinerary.image_path,
                            cta: "View Plan"
                        }
                        return (
                            <Card item={article} id={article.id} nextScreen={'Plan'} style={{marginHorizontal: 20, width: 200}}/>
                        )
                    }
                    if(index === this.state.itineraries.length-1 && locationHasItineraries === false) {
                        return (
                            <Text size={15} style={{color: "gray", marginTop: 10, textAlign: "center", marginHorizontal: width / 4}}>You have no plans for this location</Text>
                        )
                    }
                })}
            </Block>
        )
    }

    renderLocation = () => {
        return (
            <Block flex row>
                {this.state.locations.map((location, index) => {
                    return (
                        <Block>
                            <View flex={8}>
                            <ScrollView nestedScrollEnabled = {true}>
                                <Block style={styles.mapContainer} >
                                    <MapView 
                                    ref={MapView => (this.MapView = MapView)} //NEW 
                                    style={styles.mapStyle} 
                                    loadingEnabled ={true}
                                    loadingIndicatorColor="#666666"
                                    loadingBackgroundColor="#eeeeee"
                                    moveOnMarkerPress = {false}
                                    showsCompass={true}
                                    provider="google"
                                    initialRegion= {{
                                    latitude: location.latitude,
                                    longitude: location.longitude,
                                    latitudeDelta: 2.1022,
                                    longitudeDelta: 1.1721
                                    }}>
                                    </MapView>
                                </Block>
                                <View style={{width: width}}>
                                    <Text bold size={24} style={styles.title}>
                                        {location.address}
                                    </Text>
                                    <Text size={17} style={styles.subTitle}>
                                        {this.formatDate(location.start_date) + " - " + this.formatDate(location.end_date)}
                                    </Text>
                                </View>
                                <Text bold size={20} style={styles.title}>
                                        Current Plans:
                                </Text>
                                <View style={{width: width}}>
                                    <ScrollView horizontal={true} style={{marginTop: -10}} nestedScrollEnabled = {true}>
                                        {this.renderItineraryCards(location.id)}
                                    </ScrollView>
                                </View>

                            </ScrollView>
                            </View>
                            <Block flex={0.8} row style={{alignSelf: "center"}}>
                                {this.state.locations.map((l, i) => {
                                    return (
                                        <TouchableOpacity onPress={() => this.locationScrollView.scrollTo({x:width*i, animated: true})}>
                                            <Icon name="dot-single" family="Entypo" size={60} color={(i !== index) ? "lightgray" : argonTheme.COLORS.ICON} style={{alignSelf: "center"}}/>
                                        </TouchableOpacity>
                                    )
                                })}
                            </Block>
                        </Block>
                    )
                })}
            </Block>
        )
    }
    render() {
        if(this.state.loading === true) {
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
                <ScrollView 
                horizontal={true} 
                showsHorizontalScrollIndicator={false}
                nestedScrollEnabled = {true}
                scrollEnabled={false}
                ref={(ref) => {
                    this.locationScrollView = ref
                }}>
                    <Block flex row style={{width: width * this.state.locations.length}}>
                        {this.renderLocation()}
                    </Block>
                </ScrollView>
            )
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
        marginTop: 10,
        // color: argonTheme.COLORS.HEADER,
        color: 'black',
        alignSelf: "center",
        textAlign: "center"
    },
    subTitle: {
        paddingHorizontal: theme.SIZES.BASE * 2,
        marginTop: -10,
        color: 'black',
        alignSelf: "center",
        textAlign: 'center',
        lineHeight: 30,
    }
});

export default Trip;