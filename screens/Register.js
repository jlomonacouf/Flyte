import React from "react";
import PropTypes, { number } from 'prop-types';
import {
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView, 
  TouchableOpacity
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import { backendEndpoint, REGISTER_URL, GET_USER_URL} from "../src/api_methods/shared_base";
import bcrypt from 'react-native-bcrypt';

import GLOBAL from '../src/api_methods/global.js'

const { width, height } = Dimensions.get("screen");

//Regex 
const emailPattern =/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
const usa =/ ^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/; 
const international =/^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/; 
const usernamePattern = /^[0-9a-zA-Z]+$/;

//Check entries
var first= false; 
var last= false; 
var num =false; 
var mail = false; 
var userN = false; 
var pass =false ; 


class Register extends React.Component {

    state = {
      first_name :"", 
      last_name : "", 
      phone_number: "", 
      email: "",
      username: "",
      password: "",
      approvesPolicy: false, 

    }; 
  
  handleChange = (name, val) => {
    this.setState({ [name]: val });
    switch (name){
      case 'first_name':
          if(val.length>20){
            this.setState({warningMessage: 'First name should be less than 20 characters'}); 
            first= false; 
          }else{
            first=true; 
          }
        break; 
      case 'last_name': 
          if(val.length>30){
            this.setState({warningMessage: 'Last name should be less than 30 characters'}); 
            last=false; 
          } 
          else {
            last=true; 
          }
        break; 
      case 'phone_number':

        if (val.length>4 && val.match(international)){
          this.setState({warningMessage: 'International number detected'}); 
          num=false; 
        }else if (!val.match(usa)  && !val.match(international)){
          this.setState({warningMessage: 'Please enter a valid phone number'}); 
          num=false; 
        }else {
          num=true; 
        }
        break; 
      case 'email': 
        if (!val.match(emailPattern)){
          this.setState({warningMessage: 'Please enter a valid email address'}); 
          mail=false; 
        }
        else {
          mail=true; 
        }
        break; 
      case 'username':
          if((!val.match(usernamePattern)) && (val.length >30)){
            this.setState({warningMessage: 'Username must be a combination of less than 30 letters and numbers'}); 
            userN=false; 
          }
          else if(!val.match(usernamePattern)){
            this.setState({warningMessage: 'Username can only contain letters and numbers'}); 
            userN=false; 
          }else if(val.length>30){
            this.setState({warningMessage: 'Username must be less than 30 characters'}); 
            userN=false; 
          }else{
            userN=true; 
          }
        break; 
      case 'password': 
          if(val.length<5){
            this.setState({warningMessage: 'Password must be at least 5 characters'}); 
            pass=false; 
          }else{
            pass=true; 
          }
        break; 
      case 'confirm_password': 
        this.setState({warningMessage: 'Passwords do not match'}); 
        break; 
    }
  };

  onSignUpPress = async () => {

    if (!this.state.approvesPolicy === false) {
      console.log("NOT CHECKED");
      alert("Please agree to the privacy policy");
      return;
    }

    const { first_name,last_name, phone_number, email, username,password } = this.state
    const { navigation} = this.props;

    //var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, 10);
    //console.log(hash)

    fetch(backendEndpoint + REGISTER_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name : first_name, 
        last_name : last_name, 
        phone_number: phone_number, 
        email: email,
        username: username,
        password: hash,
      })
    }).then((response) => response.json())
      .then((json) => {
        if(json.success===false){
          this.setState({errorMessage: 'Error creating an account, please try again'}); 
        }else{
          GLOBAL.USERNAME=username; 
           navigation.reset({index: 0, routes: [{ name: 'Home' }],})
        } 
      }).catch((err) => {
        console.log('error getting user data', err);
        this.setState({errorMessage: 'Error creating an account, please try again'}); 
      });
  }; 




  renderRegistration() {
    const { navigation } = this.props;
    const isEnabled = first && last && num && mail && userN && pass; 

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
                <Text color="#8898AA" size={12}>
                  Sign up with
                </Text>
                <Block row style={{ marginTop: theme.SIZES.BASE }}>
                  <Button style={{ ...styles.socialButtons, marginRight: 30 }}>
                    <Block row>
                      <Icon
                        name="logo-github"
                        family="Ionicon"
                        size={14}
                        color={"black"}
                        style={{ marginTop: 2, marginRight: 5 }}
                      />
                      <Text style={styles.socialTextButtons}>GITHUB</Text>
                    </Block>
                  </Button>
                  <Button style={styles.socialButtons}>
                    <Block row>
                      <Icon
                        name="logo-google"
                        family="Ionicon"
                        size={14}
                        color={"black"}
                        style={{ marginTop: 2, marginRight: 5 }}
                      />
                      <Text style={styles.socialTextButtons}>GOOGLE</Text>
                    </Block>
                  </Button>
                </Block>
              </Block>
              <Block flex>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                < ScrollView>
                    <Block flex={0.17} middle>
                       {this.state.warningMessage && <Text style={{fontSize: 14, color: 'orange', padding: 5}}>{this.state.warningMessage}</Text>}
                    </Block>

                   <Block row width={width*0.8 } style={{ marginBottom:5}}>
                     <Block width={width * 0.37}  style={{ marginRight: 22}}>
                      <Input
                        borderless
                        placeholder="First Name"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ic_mail_24px"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                        onChangeText={val => this.handleChange('first_name', val)}
                      />
                    </Block>
                    <Block width={width * 0.37} >
                      <Input
                        borderless
                        placeholder="Last Name"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ic_mail_24px"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                        onChangeText={val => this.handleChange('last_name', val)}
                      />
                    </Block>
                    </Block>

                    <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                      <Input
                        borderless
                        placeholder="800-000-0000"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ic_mail_24px"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                        onChangeText={val => this.handleChange('phone_number', val)}
                      />
                    </Block>
                     <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                      <Input
                        borderless
                        placeholder="Email"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ic_mail_24px"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                        onChangeText={val => this.handleChange('email', val)}
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 5 }}>
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
                      <Block row style={styles.passwordCheck}>
                        <Text size={12} color={argonTheme.COLORS.MUTED}>
                          password strength:
                        </Text>
                        <Text bold size={12} color={argonTheme.COLORS.SUCCESS}>
                          {" "}
                          strong
                        </Text>
                      </Block>
                    </Block>
                    <Block row width={width * 0.75}  style={{ marginBottom: 5 }, {marginLeft: 10}}>
                      <Checkbox
                        checkboxStyle={{
                          borderWidth: 2
                        }}
                        color={argonTheme.COLORS.PRIMARY}
                        label="I agree with the"
                        onChange={() => this.setState({ approvesPolicy: !this.state.approvesPolicy })}
                      />
                      <TouchableOpacity>
                            <Text style={{
                                  width: 100,
                                  color: argonTheme.COLORS.PRIMARY,
                                fontSize: 13,
                                marginTop: 2, 
                                marginLeft: 4
                        }} >Privacy Policy </Text>
                            </TouchableOpacity>
                    </Block>
                    <Block middle>
                      <Button disabled={isEnabled} color="primary" style={styles.createButton} onPress={this.onSignUpPress}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          CREATE ACCOUNT
                        </Text>
                      </Button>
                    </Block>
                    <Block middle>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text size={12} color="blue" >Already have an account? Login </Text>
                            </TouchableOpacity>
                      </Block>
                      <Block flex={0.17} middle>
                       {this.state.errorMessage && <Text style={{fontSize: 15, color: 'red', padding: 15}}>{this.state.errorMessage}</Text>}
                    </Block>

                      </ScrollView>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    );
  };

  render() {
    return (
      <Block flex center>
          {this.renderRegistration()}
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
    height: height * 0.9,
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
    paddingTop: 10,
    paddingBottom: 25
  },
  createButton: {
    width: width * 0.5,
    marginTop: 20,
    marginBottom:2 
  }
});

export default Register;


  /*
<Block flex={0.17} middle>
                  <Text color="#8898AA" size={12}>
                    Or sign up the classic way
                  </Text>
                </Block>

             <Button
                        style={{ width: 100 }}
                        color="transparent"
                        textStyle={{
                          color: argonTheme.COLORS.PRIMARY,
                          fontSize: 12
                        }}
                      >
                        Privacy Policy
                      </Button>

                      
  // componentDidUpdate() {
  //     if(this.state.signedIn) {
  //       this.props.navigation.replace({
  //       component: Profile,
  //       title: 'Profile',
  //     })
  //   }
  // }

  // componentDidMount() {
  //     if(this.state.signedIn) {
  //       this.props.navigation.replace({
  //       component: Profile,
  //       title: 'Profile',
  //     })
  //   }
  // }

  // changeView() {
  //   this.setState({
  //    signedIn: true
  //  });
  // }

   // onSignUpPress = async () => {

  //   //TEMPERORAY FUNCTION DELETE WHEN BACKEND IS DONE 
  //   if (!this.state.approvesPolicy === false) {
  //     console.log("NOT CHECKED");
  //     alert("Please agree to the privacy policy");
  //     return;
  //   }
  //   //this.changeView(); 

   
      
  // }; 
  */

