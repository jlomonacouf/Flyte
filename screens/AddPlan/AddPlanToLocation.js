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
import { articles, Images, argonTheme } from "../../constants";
import { Card } from "../../components";
import { HeaderHeight } from "../../constants/utils";
import Spinner from 'react-native-loading-spinner-overlay';
const { width, height } = Dimensions.get("screen");
import { backendEndpoint, SINGLE_TRIP_URL } from '../../src/api_methods/shared_base'; 
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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
              this.setState({loading: false, trip: result.results[0], locations: result.results[0].location, itineraries: result.results[0].itineraries})
          })
          .catch(error => {console.log('error', error);});
    }

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

    toggleCardSelection = (index) => {
        var locations = this.state.locations;

        if(locations[index].selected === undefined)
            locations[index].selected = true;
        else
            locations[index].selected = !locations[index].selected;

        this.setState({locations: locations});
    }

    renderLocationCards = () => {
        return (
            <ScrollView>
                {this.state.locations.map((location, index) => {
                    return (
                        <TouchableOpacity onPress={() => this.toggleCardSelection(index)}>
                            <Block space="between" style={[styles.locationCard, {backgroundColor: (location.selected === true) ? "lightgray" : "#FFFFFF"}]}>
                                <View>
                                    <Block row style={{marginHorizontal: 5}}>
                                        <Block flex={5}>
                                            <Text size={20}>{location.address}</Text>
                                            <Text size={18}>{this.formatDate(location.start_date) + " - " + this.formatDate(location.end_date)}</Text>
                                        </Block>
                                        <Block flex={1} style={{justifyContent: "center"}}>
                                            <Icon name="plus" family="AntDesign" size={30} color={"lightgray"} style={{alignSelf: "flex-end"}}/>
                                        </Block>
                                    </Block>
                                </View>
                            </Block>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        )
    }

    saveAdd = () => {
        var locationIDs = [];
        this.state.locations.forEach((location) => {
            if(location.selected === true) {
                locationIDs.push(location.id);
            }
        })

        if(locationIDs.length !== 0) {
            this.props.route.params.callback({tripID: this.state.trip.id, locations: locationIDs});
        }
        this.props.navigation.pop();
    }

    cancelAdd = () => {
        this.props.navigation.pop();
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
                <View height={height}>
                    <Block style={{paddingTop: 100}}>
                        {this.renderLocationCards()}
                    </Block>
                    <Block row style={{marginTop: "auto", marginBottom: 40}}>
                        <Button style={styles.cancelBtn}
                        color="white"
                        textStyle={{ color: "black", fontSize: 16, fontWeight: "700" }}
                        onPress={() => this.cancelAdd()}>
                            <Text size={16} onPress={() => this.cancelAdd()}> <FontAwesome5  name={'trash'}/> Cancel </Text>
                        </Button>
                        <Button style={styles.saveBtn} 
                        color="success"
                        textStyle={{ color: "black", fontSize: 16, fontWeight: "700" }}
                        onPress={() => this.saveAdd()}>
                            <Text size={16} onPress={() => this.saveAdd()}> <FontAwesome5 name={'save'} solid/> Save </Text>
                        </Button>
                    </Block>
                </View>
            )
        }
    }
}
const styles = StyleSheet.create({
    locationCard: {
        marginHorizontal: 20,
        borderColor: theme.COLORS.BLACK,
        borderWidth: 1,
        minHeight: 50,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        justifyContent: "center"
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
    },
    saveBtn: {
        width: width * 0.30,
        marginLeft: "auto",
        marginRight: 20
    }, 
        cancelBtn: {
        width: width * 0.30,
        marginLeft: 20, 
    }, 
});

export default Trip;