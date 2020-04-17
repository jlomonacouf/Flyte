import React from "react";
import {
  StyleSheet,
  TextInput,
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

class tripTags extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        tagText: "",
        tags: []
      }
    }

    render() {
        const { navigation } = this.props;

        const handleTextChange = (text) => {
          this.setState({tagText: text});
          if(text.charAt(text.length-1) === ' ') {
            if(this.state.tags.length < 3 && this.state.tags.includes(text.substring(0, text.length-1).toLowerCase()) === false) {
              var tagList = this.state.tags;
              tagList.push(text.substring(0, text.length-1).toLowerCase());
              this.setState({tagText: "", tags: tagList});
            }
            else {
              this.setState({tagText: ""});
            }
          }
        }

        const removeTag = (tag) => {
          var tagList = this.state.tags.filter(item => item !== tag)
          this.setState({tags: tagList});
        }
        
        const getTagLabels = () => {
          //console.log('here')
          if(this.state.tags !== []) {
            return (
              <Block style={{flexDirection: 'row'}}>
                {this.state.tags.map((value, index) => {
                  return (
                    <Text color="#00" size={15} style={styles.tagText} onPress={() => removeTag(value)}>#{value}</Text>
                  )
                })}
              </Block>
            )
          }
        }

        const validateTags = () => {
          var trip = this.props.route.params;
          trip.tags = this.state.tags;
          navigation.navigate("tripImages", trip)
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
                        Choose Up to 3 Tags ...
                    </Text>
                    </Block>
                    <Block flex center>
                    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
                        <Block width={width * 0.8} height={height*0.55}>
                              <Input
                              borderless
                              placeholder="Or enter your own"
                              iconContent={null}
                              onChangeText={text => handleTextChange(text)}
                              value = {this.state.tagText}
                              />
                              {getTagLabels()}
                            <Block style={{flexDirection: 'row'}}>
                                <ImageButton style={{marginTop: 20}} 
                                width={width/4} 
                                height={height/7} 
                                text="Outdoors"
                                textColor="#FFFFFF"
                                fontSize={22} 
                                source={require('../../assets/imgs/bg.png')}
                                onPress={() => handleTextChange("outdoors ")}/>
                                <ImageButton style={{marginTop: 20, marginLeft: 10}} 
                                width={width/4} 
                                height={height/7} 
                                text="Exercise"
                                textColor="#FFFFFF"
                                fontSize={22} 
                                source={require('../../assets/imgs/bg.png')}
                                onPress={() => handleTextChange("exercise ")}/>
                                <ImageButton style={{marginTop: 20, marginLeft: 10}} 
                                width={width/4} 
                                height={height/7} 
                                text="Relaxation"
                                textColor="#FFFFFF"
                                fontSize={22} 
                                source={require('../../assets/imgs/bg.png')}
                                onPress={() => handleTextChange("relaxation ")}/>
                            </Block>
                            <Block style={{flexDirection: 'row'}}>
                                <ImageButton style={{marginTop: 20}} 
                                width={width/4} 
                                height={height/7} 
                                text={" Sight" + "\n" + "Seeing"}
                                textColor="#FFFFFF"
                                fontSize={22} 
                                source={require('../../assets/imgs/bg.png')}
                                onPress={() => handleTextChange("sightseeing ")}/>
                                <ImageButton style={{marginTop: 20, marginLeft: 10}} 
                                width={width/4} 
                                height={height/7} 
                                text="Adventure"
                                textColor="#FFFFFF"
                                fontSize={22} 
                                source={require('../../assets/imgs/bg.png')}
                                onPress={() => handleTextChange("adventure ")}/>
                                <ImageButton style={{marginTop: 20, marginLeft: 10}} 
                                width={width/4} 
                                height={height/7} 
                                text="Family"
                                textColor="#FFFFFF"
                                fontSize={22} 
                                source={require('../../assets/imgs/bg.png')}
                                onPress={() => handleTextChange("family ")}/>
                            </Block>
                            <Text color="#00" size={15} style={{ marginTop: 20, textAlign: "center"}}>We use these to choose the best plans for your trip</Text>
                        </Block>
                        <Block flex bottom>
                        <Button color="primary" style={styles.createButton} onPress={() => validateTags()}>
                            <Text bold size={16} color={argonTheme.COLORS.WHITE}
                            onPress={() => validateTags()}>
                            {(this.state.tags.length === 0) ? "Skip" : "Next"}
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
  tagText: {
    marginLeft: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#cccccc',
    backgroundColor: '#cccccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputIcons: {
    marginRight: 12
  },
  createButton: {
    width: width * 0.20,
    marginTop: 25
  }
});

export default tripTags;
