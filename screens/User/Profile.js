import React from "react";
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Button } from "../../components";
import { Images, argonTheme } from "../../constants";
import { HeaderHeight } from "../../constants/utils";
import Spinner from 'react-native-loading-spinner-overlay';

import { backendEndpoint, GET_USER_URL,UPDATE_USER_URL , ISFOLLOWING_URL ,FOLLOW_URL, UNFOLLOW_URL, USER_TRIPS_URL, ALL_IT_URL} from "../../src/api_methods/shared_base";

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;

import GLOBAL from '../../src/api_methods/global.js'


class Profile extends React.Component {

  constructor(){
    super();
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  };

  forceUpdateHandler(){
    this.forceUpdate();
  };

    state ={
      articles : []
    }

 

    setStateAsync(state) {
        return new Promise((resolve) => {
          this.setState(state, resolve)
        });
    }  

    async componentDidMount(){

        var fetchID=GLOBAL.USERNAME;  
        const { navigation} = this.props; 
    
        if(this.props.route.params!=undefined) fetchID=this.props.route.params.view_id; 

          var requestOptions = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            redirect: 'follow'
          };
          const information = await fetch(backendEndpoint + GET_USER_URL + fetchID, requestOptions)
          .then( response => response.json())
          .then( result => { 
           this.setStateAsync({user : result.results[0]});

          }).catch(error => console.log('error', error));

 
          requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
      
          fetch(backendEndpoint + ALL_IT_URL, requestOptions)
              .then(response => response.json())
              .then(result => {
                result.results.map((value, index) => {
                  var article = {
                    id: value.id,
                    title: value.name,
                    image: (value.image_path) ? value.image_path : "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
                    cta: 'View Plan'
                  }
                  
                  if(index % 3 === 0)
                    article.horizontal = true;
                  
                  var a = this.state.articles.concat(article);
                  this.setState({ articles: a });
                })
              })
              .catch(error => {console.log('error', error);});
          



    } 

  render() {

    if (!this.state.user) {
      return (
        <Block flex style={styles.container}>
        <Spinner
          visible={true}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      </Block> )

   }
  else {

    const { navigation} = this.props; 
    var view_id=undefined; 
    if(this.props.route.params!=undefined) view_id=route.params.view_id; 
    

      const numComments = 0; 

      let button;

    if (view_id===undefined || view_id!=undefined && view_id ===GLOBAL.USERNAME) {
       
      console.log("Viewing your own profile"); 

       if (this.state.user.public) {  

         button = 
              <Button small style={{ backgroundColor: argonTheme.COLORS.INFO }}
              onPress={() =>{
                  
                  var requestOptions = {
                    method: 'PUT',
                    headers:  {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({public: '0'}),
                    redirect: 'follow'
                  };
          
                  fetch(  backendEndpoint + UPDATE_USER_URL , requestOptions)
                    .then(response => response.json())
                    .then(result => {
                      if(result.success===false){
                        alert("Error");
                        console.log(result); 
                        //NEED STATES TO GIVE MORE CONTEXT 
                      }else{   
                          //Try adding a reset state button.
                          this.forceUpdateHandler; //Currently updating the entire component again. 
                      } 
                    }).catch(error => {
                      alert("Network error, please try again in a moment");
                      console.log('error', error)
                      
                    } );

              }}  > PUBLIC </Button>;

           
        }
        else {
           button = 
           <Button small style={{ backgroundColor: 'red' }}
              onPress={() =>{
                
                var requestOptions = {
                  method: 'PUT',
                  headers:  {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({public: "1"}),
                  redirect: 'follow'
                };
        
                fetch(  backendEndpoint + UPDATE_USER_URL , requestOptions)
                  .then(response => response.json())
                  .then(result => {
                    if(result.success===false){
                      alert("Error");
                      console.log(result); 
                      //NEED STATES TO GIVE MORE CONTEXT 
                    }else{   
                        //Try adding a reset state button.
                        this.forceUpdateHandler; //Currently updating the entire component again. 
                    } 
                  }).catch(error => {
                    alert("Network error, please try again in a moment");
                    console.log('error', error)
                  });
            }} > PRIVATE</Button>; 
        }
     } 
     
     
     else {

          var isFollowing= false; 

          var urlencoded = new URLSearchParams();
          urlencoded.append("followUsername", view_id);

          var requestOptions = {
            method: 'POST',
          headers:  {
              'Content-Type':  'application/x-www-form-urlencoded',
            },
            body: urlencoded,
            redirect: 'follow'
          };

          fetch(backendEndpoint + ISFOLLOWING_URL, requestOptions)
            .then(response => response.json())
            .then(result => {
              if(result.success===false){
                alert("Error");
                console.log(result); 
              }else{   
                isFollowing= result.isFollowing; 
              } 
            }).catch(error => console.log('error', error));


       
        if(!isFollowing){   //Check if user is already following 
          button = <Button small style={{ backgroundColor: argonTheme.COLORS.INFO }} 
          onPress={() =>{
      

          var urlencoded = new URLSearchParams();
          urlencoded.append("followUsername",view_id );

            var requestOptions = {
              method: 'POST',
              headers:  {
                'Content-Type': 'application/json',
              },
              body: urlencoded, 
              redirect: 'follow'
            };
            
            fetch( backendEndpoint + FOLLOW__URL, requestOptions)
              .then(response => response.json())
              .then(result => {
                console.log(result.results); 
                //RENDER UPDATED TEXT FOR FOLLOW BUTTON
              
              })
              .catch(error => console.log('error', error));

          }} >Follow</Button>; 
        } else{

          button = <Button small style={{ backgroundColor: argonTheme.COLORS.INFO }} 
          onPress={() =>{

            var urlencoded = new URLSearchParams();
           urlencoded.append("followUsername",view_id );

            var requestOptions = {
              method: 'POST',
              headers:  {
                'Content-Type': 'application/json',
              },
              body: urlencoded, 
              redirect: 'follow'
            };
            
            fetch( backendEndpoint + UNFOLLOW__URL, requestOptions)
              .then(response => response.json())
              .then(result => {
               // JSON.stringify(result.body);
                console.log(result.results); 
                //RENDER UPDATED TEXT FOR FOLLOW BUTTON
              
              })
              .catch(error => console.log('error', error));

          }} >UnFollow</Button>; 
        }
      }

    return (
      
           
  
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={Images.ProfileBackground}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width, marginTop: '25%' }}
            >
              <Block flex style={styles.profileCard}>
                <Block middle style={styles.avatarContainer}>
                  <Image
                    source={{ uri: this.state.user.avatar_path }}
                    style={styles.avatar}
                  />
                </Block>
                <Block style={styles.info}>
                  <Block
                    middle
                    row
                    space="evenly"
                    style={{ marginTop: 20, paddingBottom: 24 }}
                  >
                    {button}
                 
                  </Block>
                  <Block row space="between">

                  <TouchableOpacity onPress={() => navigation.navigate('Followers', { currUser: this.state.user.username })}>
                    <Block middle>
                      <Text bold size={18}  color="#525F7F" style={{ marginBottom: 4 }}> {this.state.user.following} </Text>
                      <Text size={12} color={argonTheme.COLORS.TEXT}>Following</Text>
                    </Block>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Followers', { currUser: this.state.user.username })}>
                    <Block middle>
                     <Text bold color="#525F7F" size={18} style={{ marginBottom: 4 }}
                      >  {this.state.user.followers}
                      </Text>
                      <Text size={12} color={argonTheme.COLORS.TEXT}>Followers</Text>
                    </Block>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Comments', { item:this.state.user.username })}>
                    <Block middle>
                      <Text bold color="#525F7F" size={18} style={{ marginBottom: 4 }} > {numComments}</Text>
                      <Text size={12} color={argonTheme.COLORS.TEXT}>Comments</Text>
                    </Block>
                     </TouchableOpacity>
                  </Block>
                </Block>
                <Block flex>
                  <Block middle style={styles.nameInfo}>
                    <Text bold size={26} color="#32325D">
                    {this.state.user.username}
                    </Text>
                    <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                    {this.state.user.first_name} {this.state.user.last_name}
                    </Text>
                  </Block>
                  <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                    <Block style={styles.divider} />
                  </Block>
                  <Block middle>
                  </Block>
                  <Block
                    row
                    style={{ marginTop:5, marginLeft: 15, paddingVertical: 14, alignItems: "baseline" }}
                  >
                    <Text bold size={18} color="#525F7F">
                      Trips
                    </Text>
                  </Block>
                  <Block
                    row
                    style={{ marginRight: 5, paddingBottom: 20, justifyContent: "flex-end" }}
                  >
                    <Button
                      small
                      color="transparent"
                      textStyle={{ color: "#5E72E4", fontSize: 12 }}
                      onPress={() => navigation.navigate('Articles', { item: this.state.user.username })}
                    >
                      View all
                    </Button>
                  </Block>

                  <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                    <Block row space="between" style={{ flexWrap: "wrap" }}>
                       {this.state.articles.map((article, imgIndex) => (
                        <Image
                          source={{ uri: article.image}}
                          key={`viewed-${article}`}
                          resizeMode="cover"
                          style={styles.thumb}
                        />
                      ))} 

                      {/* {Images.Viewed.map((img, imgIndex) => (
                        <Image
                          source={{ uri: img }}
                          key={`viewed-${img}`}
                          resizeMode="cover"
                          style={styles.thumb}
                        />
                      ))} */}
                    <Block style ={{marginTop: 10, marginBottom:10}}>
                    <Button medium  color="transparent" textStyle={{ padding:15, fontWeight: "bold",color: "#32325D", fontSize: 20 }}
                      onPress={() => navigation.navigate('Create Trip', { item: this.state.user.username })}
                    > New Trip 
                    </Button>
                    </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </ScrollView>
          </ImageBackground>
        </Block>
      </Block>
    ); 
                      } 
  }
}

const styles = StyleSheet.create({

  spinnerTextStyle: {
    color: '#FFF'
  },
  containerSpin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  container: {
    backgroundColor: theme.COLORS.BLACK,
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    justifyContent: "center",
    width:1000,
    height: 22, 

  },
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height / 2
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  }
});

export default Profile;



/* DELETED STUFF 

                    // currUser.state ={
                  //       isLoggedIn: false, 
                  //       currUser : [
                  //         id = '1', 
                  //         username = 'Gremlin', 
                  //         first_name =  'Nickan', 
                  //         last_name =  'Hussaini', 
                  //         email = 'n.hussaini@ufl.edu', 
                  //         email_verified= 0, 
                  //         phone_number= '786-999-4125',
                  //         followers= 0,
                  //         following = 2,
                  //         created_at = '2020-04-06'
                  //       ], 
                  //       popularTrips :[],
                  //   }


                  // setUser = (userData) => {
                  //   const {
                  //       isLoggedIn, 
                  //       currUser, 
                  //   } = currUser.state

                  //   currUser.setState({
                  //     isLoggedIn: true, 
                  //     currUser: userData,
                  //   })

                  // }

                  // setPopular = () => {
                  //   const {
                  //     popularTrips,
                  //   } = currUser.state 

                  //   const tripData =[]; 

                  //   currUser.setState({
                  //     popularTrips: tripData, 
                  //   })

                //   // } 
                //   const screenProps ={
                //     //isLoggedIn: currUser.state.isLoggedIn,
                //     user: {
                //       name: 'John Doe',
                //       username: 'johndoe123',
                //       email: 'john@doe.com',
                //     }

                //      // popularTrips: currUser.state.popularTrips, 
                //      // setUser: currUser.setUser, 
                //       //setPopular :currUser.setPopular 
                // }

                // screenProps= {
                //   {screenProps}
                //   // isLoggedIn: currUser.state.isLoggedIn,
                //   // currUser : 'DANIA', 
                //   // popularTrips: currUser.state.popularTrips, 
                //   // setUser: currUser.setUser, 
                //   // setPopular :currUser.setPopular 
                // }


                MORE DELETED SHIT 

                // state = {
  //   // currUser : {}, 
  //   // user : {
  //   //     profileImg:"", 
  //   //     email: "", 
  //   //     email_verified : false,
  //   //     first_name : "",
  //   //     last_name: " ", 
  //   //     followers : 0, 
  //   //     following : 0,
  //   //     follows : true,
  //   //     followsMe : 0,
  //   //     phone_number : "",
  //   //     public : true,
  //   //     username : "",

  //   // }, 
  // }


  // setStateAsync(state) {
  //   return new Promise((resolve) => {
  //     currUser.setState(state, resolve)
  //   });
  // }



  //async 
  componentDidMount(){

  //   //await 
  //   console.log("JUST REACHED COMPONENET"+ username);

  //   // const {navigation} = currUser.props
  //   // const { route, navigation} = currUser.props
  //   // const {item} =route.params
  //   // const {name}= item
  //   // //const { username } = currUser.props.route.params;
  //   // console.log(name); 

 

  //   const information = fetch(backendEndpoint + GET_USER_URL + username, {
  //       method: 'GET',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //   })
  //   .then((response) => response.json())
  //   .then((data) => {
  //      console.log("HI THERE" + data.results[0]); 
  //      return data.results[0]; 
  //   }).catch((err) => {
  //     console.log('error getting user data', err);
  //   })

  //  // await currUser.setStateAsync({user : information})


  }

   /*
        "avatar_path": null,
      "email": "detienne20@ufl.edu",
      "email_verified": false,
      "first_name": "Dania",
      "followers": 1,
      "following": 0,
      "follows": false,
      "following": 0,
      "phone_number": "305-922-7121",
      "public": true,
      "username": "Detienne20",
    */

    // const currUser = {
    //   id : '1',
    //   username : 'Gremlin',
    //   first_name :  'Nickan',
    //   last_name :  'Hussaini',
    //   email :  'n.hussaini@ufl.edu',
    //   email_verified: 0,
    //   phone_number: '786-999-4125',
    //   followers: 0,
    //   following : 2,
    //   created_at : '2020-04-06', 
    //   profileImg: "https://images.hollywoodpicture.net/wp-content/uploads/2017/12/dwayne-johnson-aka-the-rock-muscle-body.jpg",
    // }; 
      // const defaultImg = "data:image/png;base64,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";
    // const defaultImg ="https://scontent.fmia1-1.fna.fbcdn.net/v/t1.0-9/23755586_1656003381128147_5131151436850508940_n.jpg?_nc_cat=108&_nc_sid=174925&_nc_ohc=DahEnYZ-QrkAX9gN9DR&_nc_ht=scontent.fmia1-1.fna&oh=c85e4a06a771d42cfdd33ff54c10fa37&oe=5EB4D03A"; 
    //FIND A WAY TO KNOW IF USER HAS A PROFILE PICTURE OR DO I NEED TO USE THE DEFAULT IMAGE 
    
  

