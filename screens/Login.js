import React from "react";
import PropTypes from 'prop-types';
import {
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import { backendEndpoint, LOGIN_URL, GET_USER_URL } from "../src/api_methods/shared_base";

const { width, height } = Dimensions.get("screen");

class Login extends React.Component {

  state = {
    username: "",
    password: "",
  }; 

  handleChange = (name, val) => {
    this.setState({ [name]: val });
  };



  onLoginPress = async () => {
    const { username, password } = this.state
    const { navigation} = this.props;

    fetch(backendEndpoint + LOGIN_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      const character ={
        my_id: username,
        view_id: username
      }
      //console.log(character.name); 
      if(data.success===false){
        this.setState({errorMessage: 'Incorrect username or password'}); 

      }else{
      //  navigation.reset({index: 0, routes: [{ name: 'Home' }],})
        //navigation.navigate('Home', {item: character}); 
        navigation.navigate('Profile', {item: character});
      } 
    }).catch((err) => {
      console.log('error logging in: ', err);
      this.setState({errorMessage: 'Error logging in, please try again in a moment'}); 
    });
  }


  renderLoginPg() {

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
              <Block flex={0.25} middle style={styles.socialConnect}>
               
                <Block row style={{ marginTop: theme.SIZES.BASE }}>
                
                <Block flex middle ={0.01} style={styles.header}>
                  <Image styles={styles.logo} source={Images.Logo} />
      </Block>
                </Block>
              </Block>
              <Block flex>
                <Block flex={0.17} middle>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Username"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="hat-3"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                        onChangeText={val => this.handleChange('username', val)}
                      />
                    </Block>
                   
                    <Block width={width * 0.8}>
                      <Input
                        password
                        borderless
                        placeholder="Password"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="padlock-unlocked"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                        onChangeText={val => this.handleChange('password', val)}
                      />
                     
                    </Block>
                    <Block row width={width * 0.75}>
                     
                
                    </Block>
                    <Block flex={0.17} middle>
                  {this.state.errorMessage && <Text style={{fontSize: 14, color: 'red', padding: 5}}>{this.state.errorMessage}</Text>}
                </Block>
                    <Block middle>
                      <Button color="primary" style={styles.createButton} onPress={this.onLoginPress}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>LOG IN</Text>
                      </Button>
                    </Block>
                    <Block middle>
                        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                            <Text color="blue" >Or sign up </Text>
                            </TouchableOpacity>
                      </Block>

                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    )
  };


 

  render() {
    return (
      <Block flex center>
          {this.renderLoginPg()}
      </Block>
    );
  }

}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * -1,
    justifyContent: 'center'
  },
  registerContainer: {
    width: width * 0.9,
    height: height * 0.78,
    backgroundColor: "#F4F5F7",
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
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  }
});

export default Login;
