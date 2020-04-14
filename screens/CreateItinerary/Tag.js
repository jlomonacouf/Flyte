import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import { Block, Text} from "galio-framework";

import { Button, Icon, Input } from "../../components";
import { Images, argonTheme } from "../../constants";
import {ImageButton} from 'react-native-image-button-text';
const { width, height } = Dimensions.get("screen");

class CreateItinerary_Tag extends React.Component {
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
                        Choose Up to 3 Tags ...
                    </Text>
                    </Block>
                    <Block flex center>
                    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
                        <Block width={width * 0.8} height={height*0.55}>
                            <Block style={{flexDirection: 'row'}}>
                                <ImageButton style={{marginTop: 20}} 
                                width={width/4} 
                                height={height/7} 
                                text="Outdoors"
                                textColor="#FFFFFF"
                                fontSize={22} 
                                source={require('../../assets/imgs/bg.png')}/>
                                <ImageButton style={{marginTop: 20, marginLeft: 10}} 
                                width={width/4} 
                                height={height/7} 
                                text="Exercise"
                                textColor="#FFFFFF"
                                fontSize={22} 
                                source={require('../../assets/imgs/bg.png')}/>
                                <ImageButton style={{marginTop: 20, marginLeft: 10}} 
                                width={width/4} 
                                height={height/7} 
                                text="Relaxation"
                                textColor="#FFFFFF"
                                fontSize={22} 
                                source={require('../../assets/imgs/bg.png')}/>
                            </Block>
                            <Block style={{flexDirection: 'row'}}>
                                <ImageButton style={{marginTop: 20}} 
                                width={width/4} 
                                height={height/7} 
                                text={" Sight" + "\n" + "Seeing"}
                                textColor="#FFFFFF"
                                fontSize={22} 
                                source={require('../../assets/imgs/bg.png')}/>
                                <ImageButton style={{marginTop: 20, marginLeft: 10}} 
                                width={width/4} 
                                height={height/7} 
                                text="Adventure"
                                textColor="#FFFFFF"
                                fontSize={22} 
                                source={require('../../assets/imgs/bg.png')}/>
                                <ImageButton style={{marginTop: 20, marginLeft: 10}} 
                                width={width/4} 
                                height={height/7} 
                                text="Family"
                                textColor="#FFFFFF"
                                fontSize={22} 
                                source={require('../../assets/imgs/bg.png')}/>
                            </Block>
                        </Block>
                        <Block flex bottom>
                        <Button color="primary" style={styles.createButton}>
                            <Text bold size={16} color={argonTheme.COLORS.WHITE}
                            onPress={() => navigation.navigate("CreateItinerary_Image")}>
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

export default CreateItinerary_Tag;
