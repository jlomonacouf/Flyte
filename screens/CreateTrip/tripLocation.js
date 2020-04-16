import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import { Block, Text, theme} from "galio-framework";

import { Button, Icon, Input } from "../../components";
import { Images, argonTheme } from "../../constants";



const { width, height } = Dimensions.get("screen");

import {GOOGLE_PLACES_KEY} from '../../src/api_methods/api_keys'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

class tripLocation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: [{address: ""}, {address: ""}, {address: ""}, {address: ""}, {address: ""}, {address: ""}, {address: ""}, {address: ""}, {address: ""}, {address: ""}],
      error: false
    }
  }

  render() {
    const { navigation } = this.props;
  
    const googleAutoComplete = (defaultText, ID) => {
      return (
        <GooglePlacesAutocomplete
          placeholder={"Location " + ID}
          placeholderTextColor={'#8898AA'}
          minLength={2}
          autoFocus={false}
          returnKeyType={'default'}
          fetchDetails={true}
          getDefaultValue={() => defaultText}
          keyboardShouldPersistTaps="handled"
          listViewDisplayed='false'
          autoCompleteID={ID}
          query={{
            key: GOOGLE_PLACES_KEY,
            language: 'en', // language of the results
          }}
          onPress={(data, details = null) => {
            var locationList = this.state.locations;
            var location = {address: data.description, latitude: details.geometry.location.lat, longitude: details.geometry.location.lng};
            
            details.address_components.forEach(element => {
              if(element.types.includes("country"))
                location.country = element.long_name;
              else if(element.types.includes("locality"))
                location.city = element.long_name;
            });

            if(ID-1 < this.state.locations.length)
              locationList[ID-1] = location;
            
            this.setState({locations: locationList})
          }}
          styles={{
              marginHorizontal: 16,
              borderWidth: 1,
              borderRadius: 3,
              borderColor: argonTheme.COLORS.BLACK,
            textInputContainer: {
              backgroundColor: 'rgba(0,0,0,0)',
              borderTopWidth: 1,
              borderBottomWidth:1,
              borderRightWidth: 1,
              borderWidth: 1,
              borderRadius: 3,
              borderColor: argonTheme.COLORS.BLACK,
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              marginTop: 1,
              height: 38,
              color: '#8898AA',
              fontSize: 16,
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
          currentLocation={false}
        />
      )
    }

    const renderAutoCompletes = () => { //This is really ugly but i spent hours trying to do something cool but it wouldnt work with the google autocomplete library and i gave up at 3 am
      var index = 1;
      return(
        <Block flex>
          <Block flex>
            <Block style={{flexDirection: 'column', marginTop: 25}}>
              {googleAutoComplete("", index++)}
            </Block>
            <Block style={{flexDirection: 'column', marginTop: 25}}>
              {googleAutoComplete("", index++)}
            </Block>
            <Block style={{flexDirection: 'column', marginTop: 25}}>
              {googleAutoComplete("", index++)}
            </Block>
            <Block style={{flexDirection: 'column', marginTop: 25}}>
              {googleAutoComplete("", index++)}
            </Block>
            <Block style={{flexDirection: 'column', marginTop: 25}}>
              {googleAutoComplete("", index++)}
            </Block>
            <Block style={{flexDirection: 'column', marginTop: 25}}>
              {googleAutoComplete("", index++)}
            </Block>
            <Block style={{flexDirection: 'column', marginTop: 25}}>
              {googleAutoComplete("", index++)}
            </Block>
            <Block style={{flexDirection: 'column', marginTop: 25}}>
              {googleAutoComplete("", index++)}
            </Block>
            <Block style={{flexDirection: 'column', marginTop: 25}}>
              {googleAutoComplete("", index++)}
            </Block>
            <Block style={{flexDirection: 'column', marginTop: 25}}>
              {googleAutoComplete("", index++)}
            </Block>
          </Block>
        </Block>
      )
    }
    
    const checkValidLocations = () => {
      var valid = false;
      this.state.locations.forEach(element => {
        if(element.address !== "") {
          valid = true;
        }
      })

      if(valid === true) {
        this.setState({error: false})

        navigation.navigate("tripDates", {name: this.props.route.params.name, locations: this.state.locations})
      }
      else {
        this.setState({error: true})
      }
    }
    return (
      <Block flex middle>
        <StatusBar hidden />
        <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block flex>
                <Block flex={0.17} middle>
                  <Text color="#00" size={20}>
                    Enter Trip Locations
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8} height={height*0.55} iconContent={<Icon size={16} color={theme.COLORS.MUTED} name="search-zoom-in" family="ArgonExtra" />}>
                      <ScrollView contentContainerStyle={styles.articles} keyboardShouldPersistTaps='always' listViewDisplayed={false} >
                          <Text size={16} style={{color: "#FF0000"}}>{(this.state.error === false) ? "" : "Please enter at least one location"}</Text>
                          {renderAutoCompletes()}
                      </ScrollView>
                    </Block>
                    <Block flex bottom>
                      <Button color="primary" style={styles.createButton} onPress={() => checkValidLocations()}>
                        <Text bold size={16} color={argonTheme.COLORS.WHITE}
                        onPress={() => checkValidLocations()}>
                          Continue
                        </Text>
                      </Button>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.78,
    backgroundColor: "#FFFFFF",
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
  inputIcons: {
    marginRight: 12
  },
  createButton: {
    width: width * 0.30,
    marginTop: 25
  }
});

export default tripLocation;
