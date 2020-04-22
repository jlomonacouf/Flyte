import React from "react";
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

import { backendEndpoint, GET_USER_URL,UPDATE_USER_URL , ISFOLLOWING_URL,FOLLOW_URL, UNFOLLOW_URL, USER_TRIPS_URL, USER_IT_URL} from "../../src/api_methods/shared_base";
import GLOBAL from '../../src/api_methods/global.js'

const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;


class Profile extends React.Component {

    state ={
      plans : [], 
      trips: [],
      user : {}, 
      public: false, 
      privacyBtn: {
        public: 'PUBLIC', 
        btnColor: argonTheme.COLORS.INFO
      },
      followBtn: {
        isFollowing: false, 
        btnFollow: 'FOLLOW'
      }, 
      showNewTripBtn: false,
    }

    instaFamous = (props) =>{

      console.log(props); 

      var fetchID=GLOBAL.USERNAME;  
      const { navigation} = props; 
      if(props.route.params!=undefined){ fetchID=props.route.params.view_username; //Get username of user we want to view 
        }
       

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
           this.setState({public: result.results[0].public });
           this.setState({privacyBtn: (result.results[0].public) ? 
            { 
              public: 'PUBLIC', 
              btnColor: argonTheme.COLORS.INFO
            } :
            { 
              public: 'PRIVATE', 
              btnColor: 'red'
             }
         }) ; 
        }).catch(error => {
          console.log('error', error); 
        });


        //CHECK IF FOLLOWING 
        var view_username = (props.route.params!=undefined) ?  view_username=props.route.params.view_username : undefined; 

        if(view_username!=undefined && GLOBAL.USERNAME!=view_username){
         requestOptions = {
          method: 'POST',
          headers:  {
              'Content-Type':  'application/json',
            },
            body: JSON.stringify({followUsername: view_username}),
            redirect: 'follow'
          };
          fetch(backendEndpoint + ISFOLLOWING_URL, requestOptions)
            .then(response => response.json())
            .then(result => {
              if(result.success===false){
                alert("Error "+ result);
              }else{   
                  this.setState({followBtn: (result.isFollowing) ? 
                    { 
                      isFollowing: true, 
                      btnFollow: 'Unfollow'
                    } :
                    { 
                      isFollowing: false, 
                      btnFollow: 'Follow'
                    }
                }); 

              }
            }).catch(error => {
              console.log('error', error)
            });

          } 


        //GET USER TRIPS --APPRAENTLY PLANS?>
        requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
    
                // GET USER TRIPS
                fetch(backendEndpoint + USER_TRIPS_URL + fetchID, requestOptions)
                .then(response => response.json())
                .then(result => {
                    result.results.map((value, index) => {
                      var trip = {
                        id: value.id,
                        title: value.name,
                        image: (value.image_path) ? value.image_path : "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
                        cta: 'View Trip'
                      }
                      if(index % 3 === 0)
                       trip.horizontal = true;
                    var a = this.state.trips.concat(trip);
                    this.setState({ trips: a });
                    })
                }).catch(error => {console.log('error', error); });
          

                //GET USER PLANS

        fetch(backendEndpoint + USER_IT_URL + fetchID , requestOptions)
            .then(response => response.json())
            .then(result => {
              result.results.map((value, index) => {
                var plan = {
                  id: value.itinerary_id,
                  title: value.name,
                  image: (value.image_path) ? value.image_path : "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
                  cta: 'View Plan'
                }
                if(index % 3 === 0)
                  plan.horizontal = true;
                var a = this.state.plans.concat(plan);
                this.setState({ plans: a });
              })
            }).catch(error => {console.log('error', error); });

        

            if((view_username!=undefined && GLOBAL.USERNAME===view_username) ||view_username===undefined)
            { this.setState({ showNewTripBtn:true});
           }else{
            this.setState({ showNewTripBtn:false});
           }

    }

    componentWillReceiveProps(newProps){
      this.instaFamous(newProps) 
    }

    componentDidMount = () =>{
        this.instaFamous(this.props); 
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
    var view_username = (this.props.route.params!=undefined) ?  view_username=this.props.route.params.view_username : undefined; 
    const numComments = 0; 
    let button;

    if (view_username===undefined || view_username!=undefined && view_username ===GLOBAL.username) { //User is viewing their own profile 

         button = 
            <Button small style={{ backgroundColor: this.state.privacyBtn.btnColor }}
              onPress={() =>{

                  var updatePrivacy= (this.state.user.public) ? '0' : '1'; 
                  var requestOptions = {
                    method: 'PUT',
                    headers:  {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({public: updatePrivacy}),
                    redirect: 'follow'
                  };
                  fetch(  backendEndpoint + UPDATE_USER_URL , requestOptions)
                    .then(response => response.json())
                    .then(result => {
                      if(result.success===false){
                        alert("Error " + result.message);
                        console.log(result);//NEED STATES TO GIVE MORE CONTEXT 
                      }else{   

                      var newUser= this.state.user; 
                      newUser.public= !newUser.public; 
                      this.setState({ user: newUser });
                      this.setState({public: newUser.public});
                      this.setState({privacyBtn: (newUser.public) ? 
                          { 
                            public: 'PUBLIC', 
                            btnColor: argonTheme.COLORS.INFO
                          } :
                          { 
                            public: 'PRIVATE', 
                            btnColor: 'red'
                          }
                      }); 
                   } 
                    }).catch(error => {
                      alert("Network error, please try again in a moment");
                      console.log('error', error)
                      
                    } );

                  }}><Text style ={{color:'white'}}>{this.state.privacyBtn.public} </Text></Button>;    
    } 
     else {

          var URL_TOGGLE = (this.state.followBtn.isFollowing) ?  UNFOLLOW_URL : FOLLOW_URL; 

          button =
           <Button small style={{ backgroundColor: argonTheme.COLORS.INFO }} 
            onPress={() =>{

              var requestOptions = {
                method: 'POST',
                headers:  {
                  'Content-Type': 'application/json',
                },
                body:JSON.stringify({followUsername: view_username}),
                redirect: 'follow'
              };
              
              fetch( backendEndpoint + URL_TOGGLE, requestOptions)
                .then(response => response.json())
                .then(result => {
                  if(result.success){
                    var temp; 
                    switch(result.message){
                       case "Successfully followed user":
                            temp=true; 
                            break;
                        case "Successfully unfollowed user": 
                            temp=false; 
                           break; 
                    }
                    this.setState({followBtn: (temp) ? 
                      { 
                        isFollowing: true, 
                        btnFollow: 'Unfollow'
                      } :
                      { 
                        isFollowing: false, 
                        btnFollow: 'Follow'
                      }
                    }); 
  
                   }else {  alert("Error:" + result.message);} 
                  }) .catch(error =>
                    {console.log('error', error); 
                    alert("Network error, please try again in a moment");
                 });
            }} ><Text style ={{color:'white'}}>{this.state.followBtn.btnFollow} </Text></Button>; }

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

                  <TouchableOpacity onPress={() => { navigation.navigate('Following', { username: this.state.user.username })} }>
                    <Block middle>
                      <Text bold size={18}  color="#525F7F" style={{ marginBottom: 4 }}> {this.state.user.following} </Text>
                      <Text size={12} color={argonTheme.COLORS.TEXT}>Following</Text>
                    </Block>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() =>{
                        // 
                    navigation.navigate('Followers', { username: this.state.user.username })}}>
                    <Block middle>
                     <Text bold color="#525F7F" size={18} style={{ marginBottom: 4 }}
                      >  {this.state.user.followers}
                      </Text>
                      <Text size={12} color={argonTheme.COLORS.TEXT}>Followers</Text>
                    </Block>
                    </TouchableOpacity>

                    <TouchableOpacity //onPress={() => navigation.navigate('Comments', { username:this.state.user.username })}>
                    >
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

                                    
                  <Block row style={{ marginTop:5, marginLeft: 15, paddingVertical: 14, alignItems: "baseline" }} >
                    <Text bold size={18} color="#525F7F">Trips</Text>
                  </Block>

                  <Block row style={{ marginRight: 5, paddingBottom: 20, justifyContent: "flex-end" }}>
                    <Button small color="transparent" textStyle={{ color: "#5E72E4", fontSize: 12 }}
                      onPress={() => { navigation.navigate('Articles', { username : this.state.user.username }) }}>
                      View all
                    </Button>
                  </Block>

                     <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                 <Block row space="between" style={{ flexWrap: "wrap" }}>
                 <ScrollView horizontal={true} style={{marginTop: -10}} nestedScrollEnabled = {true}> 
                    {this.state.trips.map((trip, imgIndex) => (
                     <Image 
                      onPress={() => { navigation.navigate('Trip', {id: trip.id})}}
                       source={{ uri: trip.image}}
                       key={`viewed-${imgIndex}`}
                       resizeMode="cover"
                       style={styles.thumb}
                     /> ))} 
                   </ScrollView>
                    </Block>
                 </Block>

                 <Block style ={{marginTop: 10, marginBottom:10}}>
                    {this.state.showNewTripBtn && 
                    <Button medium color="transparent" textStyle={{ padding:15, fontWeight: "bold",color: "#32325D", fontSize: 20 }}
                    onPress={() => { navigation.navigate('Create Trip', { username: this.state.user.username })}}
                    >New Trip</Button> }
                     </Block>



                  <Block row style={{ marginTop:5, marginLeft: 15, paddingVertical: 14, alignItems: "baseline" }}>
                    <Text bold size={18} color="#525F7F">Plans </Text> 
                    </Block>


                    <Block row style={{ marginRight: 5, paddingBottom: 20, justifyContent: "flex-end" }}>
                    <Button small color="transparent" textStyle={{ color: "#5E72E4", fontSize: 12 }}
                      onPress={() => { navigation.navigate('Articles', { username : this.state.user.username }) }}>
                      View all
                    </Button>
                  </Block>

                  <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                    <Block row space="between" style={{ flexWrap: "wrap" }}>
                    <ScrollView horizontal={true} style={{marginTop: -10}} nestedScrollEnabled = {true}>  
                       {this.state.plans.map((plan, index) => (
                        <Image 
                         onPress={() => {navigation.navigate('Plan', {id: plan.id})}}
                          source={{ uri: plan.image_path}}
                          key={`viewed-${index}`}
                          resizeMode="cover"
                          style={styles.thumb}
                        />))} 
                         </ScrollView>
                    </Block>
                    </Block>


                    <Block style ={{marginTop: 10, marginBottom:10}}>
                      {this.state.showNewTripBtn &&
                       <Button medium  color="transparent" textStyle={{ padding:15, fontWeight: "bold",color: "#32325D", fontSize: 20 }}
                      onPress={() => { navigation.navigate('CreateItinerary_Name')}} 
                      > New Plan
                    </Button>} 
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




/* DELETED 

         
                  
                    
    
                  <Block row style={{ marginTop:5, marginLeft: 15, paddingVertical: 14, alignItems: "baseline" }}>
                    <Text bold size={18} color="#525F7F">Plans </Text> </Block>

                  <Block row style={{ marginRight: 5, paddingBottom: 20, justifyContent: "flex-end" }} >
                    <Button small color="transparent"
                      textStyle={{ color: "#5E72E4", fontSize: 12 }}
                      onPress={() => { navigation.navigate('Articles', { username : this.state.user.username })}}> View all 
                    </Button>
                  </Block>


                 
                  <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                  
                    <Block row space="between" style={{ flexWrap: "wrap" }}>
                       {this.state.plans.map((plan, index) => (
                    
                        <Image onPress={() => {
                          navigation.navigate('Plan', {id: plan.id})}}
                          source={{ uri: plan.image_path}}
                          key={`viewed-${index}`}
                          resizeMode="cover"
                          style={styles.thumb}
                        />
                      ))} 
                    </Block>

                    <ScrollView horizontal={true} style={{marginTop: -10}} nestedScrollEnabled = {true}>  
                    </ScrollView>

                    <Block style ={{marginTop: 10, marginBottom:10}}>
                      {this.state.showNewTripBtn && <Button medium  color="transparent" textStyle={{ padding:15, fontWeight: "bold",color: "#32325D", fontSize: 20 }}
                      onPress={() => { navigation.navigate('CreateItinerary_Name')}} > New Plan
                    </Button>} 
                   </Block>
                  </Block>

*/