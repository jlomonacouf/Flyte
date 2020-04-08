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


const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;



class Profile extends React.Component {


  render() {
   const { navigation} = this.props;
  //  const { route } = this.props;
  //   const { item } = route.params;
  //   const { name, home, species } = item; 

    const currUser = {
      id : '1',
      username : 'Gremlin',
      first_name :  'Nickan',
      last_name :  'Hussaini',
      email :  'n.hussaini@ufl.edu',
      email_verified: 0,
      phone_number: '786-999-4125',
      followers: 0,
      following : 2,
      created_at : '2020-04-06', 
      profileImg: "https://images.hollywoodpicture.net/wp-content/uploads/2017/12/dwayne-johnson-aka-the-rock-muscle-body.jpg",
    }; 

    const numComments= 0; 


                    // this.state ={
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
                  //   } = this.state

                  //   this.setState({
                  //     isLoggedIn: true, 
                  //     currUser: userData,
                  //   })

                  // }

                  // setPopular = () => {
                  //   const {
                  //     popularTrips,
                  //   } = this.state 

                  //   const tripData =[]; 

                  //   this.setState({
                  //     popularTrips: tripData, 
                  //   })

                //   // } 
                //   const screenProps ={
                //     //isLoggedIn: this.state.isLoggedIn,
                //     user: {
                //       name: 'John Doe',
                //       username: 'johndoe123',
                //       email: 'john@doe.com',
                //     }

                //      // popularTrips: this.state.popularTrips, 
                //      // setUser: this.setUser, 
                //       //setPopular :this.setPopular 
                // }

                // screenProps= {
                //   {screenProps}
                //   // isLoggedIn: this.state.isLoggedIn,
                //   // currUser : 'DANIA', 
                //   // popularTrips: this.state.popularTrips, 
                //   // setUser: this.setUser, 
                //   // setPopular :this.setPopular 
                // }



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
                    source={{ uri: currUser.profileImg }}
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
                    <Button small style={{ backgroundColor: argonTheme.COLORS.INFO }} >
                      Follow
                    </Button>
                  </Block>
                  <Block row space="between">

                  <TouchableOpacity onPress={() => navigation.navigate('Followers', { item: currUser.username })}>
                    <Block middle>
                      <Text bold size={18}  color="#525F7F" style={{ marginBottom: 4 }}> {currUser.following} </Text>
                      <Text size={12} color={argonTheme.COLORS.TEXT}>Following</Text>
                    </Block>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Followers', { item: currUser.username })}>
                    <Block middle>
                     <Text bold color="#525F7F" size={18} style={{ marginBottom: 4 }}
                      >  {currUser.followers}
                      </Text>
                      <Text size={12} color={argonTheme.COLORS.TEXT}>Followers</Text>
                    </Block>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Comments', { item: currUser.username })}>
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
                    {currUser.username}
                    </Text>
                    <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                    {currUser.first_name} {currUser.last_name}
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
                    >
                      View all
                    </Button>
                  </Block>

                  <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                    <Block row space="between" style={{ flexWrap: "wrap" }}>
                      {Images.Viewed.map((img, imgIndex) => (
                        <Image
                          source={{ uri: img }}
                          key={`viewed-${img}`}
                          resizeMode="cover"
                          style={styles.thumb}
                        />
                      ))}
                    <Block style ={{marginTop: 10, marginBottom:10}}>
                    <Button medium  color="transparent" textStyle={{ padding:15, fontWeight: "bold",color: "#32325D", fontSize: 20 }}
                      onPress={() => navigation.navigate('Create Trip', { item: currUser.username })}
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

const styles = StyleSheet.create({
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
