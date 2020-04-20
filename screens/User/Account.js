import React from 'react';
import { 
    StyleSheet, 
    Dimensions,
    Image, 
    ImageBackground,
    ScrollView, 
    TouchableOpacity 
} from 'react-native';
import bcrypt from 'react-native-bcrypt';
import { Block, Checkbox, Text, theme } from "galio-framework";
import { Button, Icon, Input } from "../../components";
import { HeaderHeight } from "../../constants/utils";
import { argonTheme } from "../../constants/";
import Spinner from 'react-native-loading-spinner-overlay';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { backendEndpoint, GET_USER_URL,UPDATE_USER_URL} from "../../src/api_methods/shared_base";
import GLOBAL from '../../src/api_methods/global.js';


const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

class Account extends React.Component {

    state = {
       // public: false, 
        avatar_path: "",
        first_name :"", 
        last_name : "", 
        phone_number: "", 
        password: "",
        confirm_password: "", 
      }; 
  
        
    handleChange = (name, val) => {
          this.setState({ [name]: val });
     }; 

    executeUpdate = () => {
    
        var requestOptions = {
                method: 'PUT',
                headers:  {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {public: updatePrivacy}
                    
                    ),
                redirect: 'follow'
              };
              fetch(  backendEndpoint + UPDATE_USER_URL , requestOptions)
                .then(response => response.json())
                .then(result => {
                  if(result.success===false){
                    alert("Error " + result.message);
                    console.log(result);//NEED STATES TO GIVE MORE CONTEXT 
                  }else{   
                        console.log("SUCCESS?");
               } 
                }).catch(error => {
                  alert("Network error, please try again in a moment");
                  console.log('error', error)
                  
                } );

     }


     componentDidMount = () =>{

        var fetchID=GLOBAL.USERNAME;  
     
        var requestOptions = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            redirect: 'follow'
          };
          const information = fetch(backendEndpoint + GET_USER_URL + fetchID, requestOptions)
          .then( response => response.json())
          .then( result => { 
             this.setState({user : result.results[0]});
          }).catch(error => {
            console.log('error', error); 
          });
    
    } 


    render(){

        if (!this.state.user) {
            return (
              <Block flex style={styles.container}>
              <Spinner
                visible={true}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
              />
            </Block> )
      
        }else {

        return (
        <Block>
             <Block color='white' style={{marginBottom:20}}>
                <Block flex={false} row space="between" style={styles.header}>
                    <Text  size={35} style={styles.title} bold>Settings</Text>

                    <TouchableOpacity> 
                    <Block style={styles.avatarContainer}>
                        <Image source={{ uri: this.state.user.avatar_path }}
                                style={styles.avatar} />
                     </Block>
                     </TouchableOpacity> 
                </Block>
            </Block>
         <ScrollView showsVerticalScrollIndicator={false}>  
         <Block style={styles.inputs}>
          <Block row space="between" style={styles.inputRow}>
              <Block>
                  <Text color={theme.COLORS.MUTED} style={{ marginBottom: 10 }}>Username</Text>
                 <  Text bold>{this.state.user.username}</Text>
              </Block>
              <TouchableOpacity><Text bold style={styles.editTap}>Edit </Text></TouchableOpacity>
          </Block>
          <Block row space="between" style={styles.inputRow}>
              <Block>
                  <Text  color={theme.COLORS.MUTED}  style={{ marginBottom: 10 }}>First Name</Text>
                  <  Text bold>{this.state.user.first_name}</Text>
              </Block>
              <TouchableOpacity><Text bold style={styles.editTap}>Edit </Text></TouchableOpacity>
          </Block>
          <Block row space="between" style={styles.inputRow}>
              <Block>
                  <Text  color={theme.COLORS.MUTED} style={{ marginBottom: 10}}>Last Name</Text>
                  <  Text bold>{this.state.user.last_name}</Text>
              </Block>
              <TouchableOpacity><Text bold style={styles.editTap} >Edit </Text></TouchableOpacity>
            </Block>
            <Block row space="between" style={styles.inputRow}>
              <Block>
                  <Text  color={theme.COLORS.MUTED} style={{ marginBottom: 10}}>Phone Number </Text>
                  <  Text bold>{this.state.user.phone_number}</Text>
              </Block>
              <TouchableOpacity><Text bold style={styles.editTap} >Edit </Text></TouchableOpacity>
            </Block>
            <Block row space="between" style={styles.inputRow}>
              <Block>
                  <Text  color={theme.COLORS.MUTED} style={{ marginBottom: 10}}>Password </Text>
                  <  Text bold>{this.state.user.password}</Text>
              </Block>
              <TouchableOpacity><Text bold style={styles.editTap}>Edit </Text></TouchableOpacity>
            </Block>
        </Block>
            <Block>
            <FontAwesome5.Button name={'comments'} />
              <FontAwesome5 name={'comments'} solid />
              <FontAwesome5 name={'git'} brand />
              <FontAwesome5 name={'comments'} />
            </Block>


             </ScrollView>
             </Block>
     );
        }
};
}

const styles = StyleSheet.create({
    title: {
        paddingBottom: theme.SIZES.BASE,
        paddingHorizontal: theme.SIZES.BASE * 2,
        marginLeft: 0, 
        marginRight: 75,    
    }, 
    editTap: {
        color :'#00d084'
    },
    header: {
        marginTop: 60,
        marginBottom:20, 
        paddingHorizontal: theme.SIZES.BASE* 2,
      },     
     spinnerTextStyle: {
            color: '#FFF'
    },

      avatar: {
            width: 60,
            height: 60,
            borderRadius: 62,
            borderWidth: 0
      },     
      inputs: {
        color: 'white', 
        marginTop: theme.SIZES.BASE* 0.7,
        paddingHorizontal: theme.SIZES.BASE* 2,
      },
      inputRow: {
        marginTop: 10, 
        marginBottom: 10, 
        marginLeft:0, 
        marginRight:0, 
        alignItems: 'flex-end'

      }, 
});



export default Account;


