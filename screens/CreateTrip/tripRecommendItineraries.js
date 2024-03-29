import React from 'react';
import { 
    StyleSheet, 
    Dimensions,
    Image, 
    ImageBackground,
    ScrollView, 
    View,
    TouchableOpacity 
} from 'react-native';
import { Block, Checkbox, Text, theme } from "galio-framework";
import { Button, Icon, Input } from "../../components";
import { HeaderHeight } from "../../constants/utils";
const { width, height } = Dimensions.get("screen");
import { Card } from "../../components";
import { argonTheme } from "../../constants/";
import Spinner from 'react-native-loading-spinner-overlay';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import { backendEndpoint, RECOMMEND_PLANS, ADD_SINGLE_PLAN } from "../../src/api_methods/shared_base";
import GLOBAL from '../../src/api_methods/global.js';


class tripRecommendItineraries extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
        }
        this.articles = []
    }

    getArticleData = () => {
        this.articles = [];
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(backendEndpoint + RECOMMEND_PLANS + this.props.route.params.id, requestOptions)
            .then(response => response.json())
            .then(result => {

                this.articles = result.rankedItineraries
                //this.articles = articles;
                this.setState({loading: false});
            })
            .catch(error => {console.log('error', error);});
        }

    componentDidMount(){
        this.getArticleData();
    }

    addToTrip = (itinerary) => {
        fetch(backendEndpoint + ADD_SINGLE_PLAN, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({trip_id: this.props.route.params.id, city: itinerary.city, country: itinerary.country, itinerary_id: itinerary.itineraryID})
          })
          .then((response) => response.json())
          .then((data) => {
            this.setState({uploading: false, error: false});
        
            alert("Successfully added Plan")
          }).catch((error) => {
            console.log(error);
          })
    }

    renderItineraryCards = (itineraryIndex) => {
        if(this.articles[itineraryIndex].itineraries.length > 0) {
            return(
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {this.articles[itineraryIndex].itineraries.map((itinerary, index) => {
                        var item = {id: itinerary.id, title: itinerary.itinerary_name, image: itinerary.image_path, cta: "View Plan"};
                        return (
                            <Card item={item} id={itinerary.id} tripID={this.props.route.params.id} callback={this.addToTrip} nextScreen={'Plan'} style={{marginHorizontal: 20, width: 200}}/>
                        )
                    })}
                </ScrollView>
            )
        }
        else {
            return(
                <View height={30} width={width} style={{alignContent: "center", marginVertical: 25}}>
                    <Text size={16} style={{color: "gray", alignSelf: "center"}}>Sorry, we couldn't find any itineraries!</Text>
                </View>
            )
        }
    }

    renderLocations = () => {
        return(
            <Block>
                {this.articles.map((itinerary, index) => {
                    console.log(itinerary.location)
                    return (
                        <View width={width}>
                            <Block flex>
                                <Text style={{marginLeft: 20}} size={20}>Plans for {itinerary.location}:</Text>
                                {this.renderItineraryCards(index)}
                            </Block>
                        </View>
                    )
                })}
            </Block>
        )
    }
    render() {
        console.log(this.props.navigation)
        if(this.state.loading === true) {
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
            return (
                <ScrollView>
                    {this.renderLocations()}
                </ScrollView>
            )
        }
    }
}

const styles = StyleSheet.create({
    
});
export default tripRecommendItineraries;
