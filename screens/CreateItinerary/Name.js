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




class CreateItinerary_Name extends React.Component {
  state = {
    name: "",
    error: false
  }
  render() {
    const { navigation } = this.props;

    const checkValidName = () => {
      console.log("NAME:", this.state.name)
      if(this.state.name.length > 0 && this.state.name.length < 65) {
        this.setState({error: false});
        navigation.navigate("CreateItinerary_Location", {name: this.state.name});
      }
      else {
        this.setState({error: true});
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
                    Name Your Plan
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8} height={height*0.55}>
                      <Input
                        borderless
                        placeholder="Things to do in Lisbon, Portugal"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="hat-3"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                        onChangeText = {(value) => this.setState({name: value})}
                      />
                      <Text size={16} style={{color: "#FF0000"}}>{(this.state.error === false) ? "" : "Trip name must be between 0 and 65 valid letters"}</Text>
                    </Block>
                    <Block flex bottom>
                      <Button color="primary" style={styles.createButton}  onPress={() => checkValidName()}>
                        <Text bold size={16} color={argonTheme.COLORS.WHITE}
                         onPress={() => checkValidName()}>
                          Choose Location
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
    width: width * 0.40,
    marginTop: 25
  }
});

export default CreateItinerary_Name;
