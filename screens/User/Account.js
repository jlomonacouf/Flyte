import React from 'react';
import { 
    StyleSheet, 
    Dimensions,
    Image, 
    ImageBackground,
    ScrollView, 
    TouchableOpacity 
} from 'react-native';
import { Block, Checkbox, Text, theme } from "galio-framework";
import { Button, Icon, Input } from "../../components";
import { HeaderHeight } from "../../constants/utils";
import { argonTheme } from "../../constants/";
import Spinner from 'react-native-loading-spinner-overlay';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import { backendEndpoint, GET_USER_URL, UPDATE_USER_URL, PROFILE_IMG_URL} from "../../src/api_methods/shared_base";
import GLOBAL from '../../src/api_methods/global.js';


const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;


//Regex 
const emailPattern =/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
const usa =/ ^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/; 
const international =/^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/; 
const usernamePattern = /^[0-9a-zA-Z]+$/;

//Check entries
var first= false; 
var last= false; 
var num =false; 
var userN = false; 
var pass =false ; 

class Account extends React.Component {

    state = {

        avatar_path: "",
        first_name :"", 
        last_name : "", 
        phone_number: "", 
        password: "",
        confirm_password: "", 

        //Show input boxes. 
        uploadImage: false, 
        showUsername : false, 
        showFirst : false, 
        showLast : false, 
        showNumber: false, 
        showPassword: false,
        avatarChanged: false,
    }; 
  
    getPermissionAsync = async () => {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    }
  
    _pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,
        exif: false
      });
  
      if (!result.cancelled) {
        this.setState({ avatar_path: result.uri, avatarChanged: true });
      }
    };

    uploadImage = () => {
      return new Promise((resolve) => {
        fetch(backendEndpoint + PROFILE_IMG_URL, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({subdirectory: "/Profile/"})
        })
        .then((response) => response.json())
        .then((data) => {
          
          fetch(this.state.avatar_path).then(response => {
            response.blob().then(res => {
              var requestOptions = {
                method: 'PUT',
                body: res,
                headers: {'Content-Type': 'multipart/form-data'},
                redirect: 'follow'
              };
              fetch(data.data.signedRequest, requestOptions)
                .then(response => response.text())
                .then(result => {
                  resolve(data.data.url);
                })
                .catch(error => {
                  console.log("error");
                  resolve("error");
                });
    
            })
          });
        }).catch((err) => {
          console.log("error");
          resolve("error");
        });
      })
    }

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

    changeImage = () => {
      if(this.state.avatarChanged === true) {
        this.uploadImage().then((url) => {
          this.setState({avatar_path: url});
          this.executeUpdate();
        })
      }
      else {
        this.executeUpdate();
      }
    }

    executeUpdate = () => {
      const { navigation } = this.props;
        var requestOptions = {
          method: 'PUT',
          headers:  {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
              {avatar_path : this.state.avatar_path,
              username: this.state.username,
              first_name: this.state.first_name,
              last_name:this.state.last_name, 
              phone_number:this.state.phone_number,
              password: this.state.password} 
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
            console.log("SUCCESS? " + result);
            navigation.navigate('Profile', { username: this.state.username, refresh: true }); 
          } 
          }).catch(error => {
            alert("Network error, please try again in a moment");
            console.log('error', error)
            
          } );

     }


     componentDidMount = () =>{

      var fetchID=GLOBAL.USERNAME;  
      this.getPermissionAsync();
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
            this.setState({avatar_path : result.results[0].avatar_path});
            this.setState({username: result.results[0].username});
            this.setState({first_name: result.results[0].first_name});
            this.setState({last_name: result.results[0].last_name});
            this.setState({phone_number: result.results[0].phone_number});
            this.setState({password: result.results[0].password});
          console.log('error', error); 
        });
  
    } 


    render(){
      const { navigation } = this.props;

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

                    <TouchableOpacity onPress={() => this._pickImage()}> 
                    <Block style={styles.avatarContainer}>
                        <Image source={{ uri: this.state.avatar_path }}
                                style={styles.avatar} />
                     </Block>
                     </TouchableOpacity> 


                </Block>
            </Block>


         <ScrollView showsVerticalScrollIndicator={false}>  

         <Block style={styles.inputs}>



          {!this.state.showUsername && <Block row space="between" style={styles.inputRow}>
              <Block>
                  <Text color={theme.COLORS.MUTED} style={{ marginBottom: 10 }}>Username</Text>
                 <  Text bold>{this.state.username}</Text>
              </Block>
              <TouchableOpacity onPress={() =>this.setState({showUsername: true})} ><Text bold style={styles.editTap}>Edit </Text></TouchableOpacity>
           </Block>
        } 

        {this.state.showUsername && 

          <Block row space="between" style={styles.inputRow}>
          <Block style={styles.inputBlock}>
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
              <TouchableOpacity onPress={() =>this.setState({showUsername: false})} ><Text bold style={styles.doneTap}>Done</Text></TouchableOpacity>
              <Block flex={0.17} middle>
                       {this.state.warningMessage && <Text style={{fontSize: 14, color: 'orange', padding: 5}}>{this.state.warningMessage}</Text>}
                </Block>
           </Block>
           </Block>
        } 


{!this.state.showFirst && <Block row space="between" style={styles.inputRow}>
              <Block>
                  <Text color={theme.COLORS.MUTED} style={{ marginBottom: 10 }}>First Name</Text>
                 <  Text bold>{this.state.first_name}</Text>
              </Block>
              <TouchableOpacity onPress={() =>this.setState({showFirst: true})} ><Text bold style={styles.editTap}>Edit </Text></TouchableOpacity>
           </Block>
        } 

        {this.state.showFirst && 

          <Block row space="between" style={styles.inputRow}>
          <Block style={styles.inputBlock}>
                <Input
                        borderless
                        placeholder="First Name"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="hat-3"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                        onChangeText={val => this.handleChange('first_name', val)}
                      />
              <TouchableOpacity onPress={() =>this.setState({showFirst: false})} ><Text bold style={styles.doneTap}>Done</Text></TouchableOpacity>
              <Block flex={0.17} middle>
                       {this.state.warningMessage && <Text style={{fontSize: 14, color: 'orange', padding: 5}}>{this.state.warningMessage}</Text>}
                </Block>
           </Block>
           </Block>
        } 


{!this.state.showLast && <Block row space="between" style={styles.inputRow}>
              <Block>
                  <Text color={theme.COLORS.MUTED} style={{ marginBottom: 10 }}>Last Name</Text>
                 <  Text bold>{this.state.last_name}</Text>
              </Block>
              <TouchableOpacity onPress={() =>this.setState({showLast: true})} ><Text bold style={styles.editTap}>Edit </Text></TouchableOpacity>
           </Block>
        } 

        {this.state.showLast && 

          <Block row space="between" style={styles.inputRow}>
          <Block style={styles.inputBlock}>
                <Input
                        borderless
                        placeholder="Last Name"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="hat-3"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                        onChangeText={val => this.handleChange('last_name', val)}
                      />
              <TouchableOpacity onPress={() =>this.setState({showLast: false})} ><Text bold style={styles.doneTap}>Done</Text></TouchableOpacity>
              <Block flex={0.17} middle>
                       {this.state.warningMessage && <Text style={{fontSize: 14, color: 'orange', padding: 5}}>{this.state.warningMessage}</Text>}
                </Block>
           </Block>
           </Block>
        } 


{!this.state.showNum && <Block row space="between" style={styles.inputRow}>
              <Block>
                  <Text color={theme.COLORS.MUTED} style={{ marginBottom: 10 }}>Phone Number</Text>
                 <  Text bold>{this.state.phone_number}</Text>
              </Block>
              <TouchableOpacity onPress={() =>this.setState({showNum: true})} ><Text bold style={styles.editTap}>Edit </Text></TouchableOpacity>
           </Block>
        } 

        {this.state.showNum && 

          <Block row space="between" style={styles.inputRow}>
          <Block style={styles.inputBlock}>
                <Input
                        borderless
                        placeholder="800-000-0000"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="hat-3"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                        onChangeText={val => this.handleChange('phone_number', val)}
                      />
              <TouchableOpacity onPress={() =>this.setState({showNum: false})} ><Text bold style={styles.doneTap}>Done</Text></TouchableOpacity>
              <Block flex={0.17} middle>
                       {this.state.warningMessage && <Text style={{fontSize: 14, color: 'orange', padding: 5}}>{this.state.warningMessage}</Text>}
                </Block>
           </Block>
           </Block>
        } 

{!this.state.showPassword && <Block row space="between" style={styles.inputRow}>
              <Block>
                  <Text color={theme.COLORS.MUTED} style={{ marginBottom: 10 }}>Password</Text>
                 <  Text bold>{this.state.password}</Text>
              </Block>
              <TouchableOpacity onPress={() =>this.setState({showPassword: true})} ><Text bold style={styles.editTap}>Edit </Text></TouchableOpacity>
           </Block>
        } 

        {this.state.showPassword && 

          <Block row space="between" style={styles.inputRow}>
          <Block style={styles.inputBlock}>
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
              <TouchableOpacity onPress={() =>this.setState({showPassword: false})} ><Text bold style={styles.doneTap}>Done</Text></TouchableOpacity>
              <Block flex={0.17} middle>
                       {this.state.warningMessage && <Text style={{fontSize: 14, color: 'orange', padding: 5}}>{this.state.warningMessage}</Text>}
                </Block>
           </Block>
           </Block>
        } 
             </Block>
             </ScrollView>

             <Block row > 
            <Button style={styles.saveBtn} 
              color="secondary"
              textStyle={{ color: "black", fontSize: 12, fontWeight: "700" }}
              onPress={()=>this.changeImage()}
            ><Text> <FontAwesome5 name={'save'} solid/> Save </Text>
            </Button>

            <Button style={styles.cancelBtn}
              color="secondary"
              textStyle={{ color: "black", fontSize: 12, fontWeight: "700" }}
              onPress={()=> navigation.navigate('Profile', { username: this.state.user.username })}
            ><Text> <FontAwesome5  name={'trash'}/> Cancel </Text>
              </Button>

            </Block>

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
    doneTap: {
        //color : theme.COLORS.MUTED
        color: 'blue'
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
      saveBtn: {
        width: width * 0.30,
        marginTop: 30, 
        marginLeft: 75, 
        padding: 10, 
        color: 'white'
      }, 
      cancelBtn: {
        width: width * 0.30,
        marginTop: 30, 
        marginLeft: 15, 
        padding: 10,
        color: 'white'
      }, 
      inputBlock:{
        padding: 20, 
        width: width * 0.9, 
        marginTop: 5, 
        marginBottom: 5, 
        alignItems: 'flex-end'
      },
      inputIcons: {
        marginRight: 12
      },
      
});



export default Account;
