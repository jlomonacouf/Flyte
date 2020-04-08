import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView
} from "react-native";
import { Block, Text} from "galio-framework";

import { Button, Icon, Input } from "../../components";
import { Images, argonTheme } from "../../constants";

const { width, height } = Dimensions.get("screen");

import {GOOGLE_PLACES_KEY} from '../../src/api_methods/api_keys'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

class CreateItinerary_Location extends React.Component {
  render() {
    const { navigation } = this.props;

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
                    Enter Your Location
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8} height={height*0.55}>
                    <GooglePlacesAutocomplete
                      placeholder='Enter Location'
                      minLength={2}
                      autoFocus={false}
                      returnKeyType={'default'}
                      fetchDetails={true}
                      keyboardShouldPersistTaps="handled"
                      query={{
                        key: GOOGLE_PLACES_KEY,
                        language: 'en', // language of the results
                      }}
                      styles={{
                        textInputContainer: {
                          backgroundColor: 'rgba(0,0,0,0)',
                          borderTopWidth: 0,
                          borderBottomWidth:0,
                        },
                        textInput: {
                          marginLeft: 0,
                          marginRight: 0,
                          height: 38,
                          color: '#5d5d5d',
                          fontSize: 16,
                        },
                        predefinedPlacesDescription: {
                          color: '#1faadb',
                        },
                      }}
                      currentLocation={false}
                    />
                    </Block>
                    <Block flex bottom>
                      <Button color="primary" style={styles.createButton}>
                        <Text bold size={16} color={argonTheme.COLORS.WHITE}
                        onPress={() => navigation.navigate("CreateItinerary_Dates")}>
                          NEXT
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
    width: width * 0.20,
    marginTop: 25
  }
});

export default CreateItinerary_Location;
