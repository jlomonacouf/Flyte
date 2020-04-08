import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import { Block, Text} from "galio-framework";

import { Button, Icon, Input } from "../../components";
import { Images, argonTheme } from "../../constants";
import { TextInput } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("screen");

class tripDescription extends React.Component {
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
                    Enter Trip Details
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8} height={height * 0.55} style={{borderColor: '#cccccc', borderWidth: 1}}>
                        <ScrollView>
                        <TextInput
                            style={{paddingLeft: 2, paddingRight: 2, textAlignVertical: 'top', fontSize:16}}
                            height={height * 0.55}
                            iconContent none
                            placeholder="Tell us about what you did, where, for how long, ..."
                            multiline
                        />
                        </ScrollView>
                    </Block>
                    <Block flex bottom>
                      <Button color="primary" style={styles.createButton}>
                        <Text bold size={16} color={argonTheme.COLORS.WHITE}
                         onPress={() => navigation.navigate("tripTags")}>
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

export default tripDescription;
