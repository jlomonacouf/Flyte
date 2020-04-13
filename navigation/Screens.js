import React from "react";

import PropTypes from 'prop-types';
import { Easing, Animated, Dimensions } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Block } from "galio-framework";


//Examples

import Basic from "../screens/Basic"; 
import Itinerary_Ex from "../screens/Itinerary_Ex";

// screens
import Home from "../screens/Home";
import Onboarding from "../screens/Onboarding";
import viewTrips from "../screens/viewTrips"; 
import Loading from "../screens/Loading";
import Login from "../screens/Login";
import Elements from "../screens/Elements";
import Articles from "../screens/Articles";
import Trip from "../screens/Trip"; 
import Itinerary from "../screens/Itinerary"; 

//User Pages 

import Profile from "../screens/User/Profile";
import Register from "../screens/Register";
import Account from "../screens/User/Account";
import Followers from "../screens/User/Followers"; 
import Following from "../screens/User/Following"; 


//Creating Itinerary 
import CreateItinerary_Name from "../screens/CreateItinerary/Name";
import CreateItinerary_Location from "../screens/CreateItinerary/Location";
import CreateItinerary_Text from "../screens/CreateItinerary/Text"
import CreateItinerary_Tag from "../screens/CreateItinerary/Tag";
import CreateItinerary_Image from "../screens/CreateItinerary/Image.js";
import CreateItinerary_Dates from "../screens/CreateItinerary/Dates.js";


//Creating Itinerary 
import tripName from "../screens/CreateTrip/tripName";
import tripLocation from "../screens/CreateTrip/tripLocation";
import tripDescription from "../screens/CreateTrip/tripDescription"
import tripTags from "../screens/CreateTrip/tripTags";
import tripImages from "../screens/CreateTrip/tripImages";
import tripDates from  "../screens/CreateTrip/tripDates";



// drawer
import CustomDrawerContent from "./Menu";

// header for screens
import { Icon, Header } from "../components";
import { argonTheme, tabs } from "../constants";

const { width } = Dimensions.get("screen");
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function ElementsStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Elements"
        component={Elements}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Elements" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
           <Stack.Screen
        name="Loading"
        component={Loading}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Loading" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
    </Stack.Navigator>
  );
}

function ArticlesStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Trips" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />

<Stack.Screen
        name="Loading"
        component={Loading}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Loading" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
    </Stack.Navigator>
  );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        option={{
          headerTransparent: true
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}


function HomeStack(props) {
  const homeMenu= [
    {id: 'Home', title: 'Popular',}, 
    {id: 'viewTrips', title: 'Your Trips',},
    {id: 'Account', title: 'Settings',}
]; 
const userTripMenu= [
  {id: 'viewTrips', title: 'Your Trips',},
  {id: 'Home', title: 'Popular',}, 
  {id: 'Account', title: 'Settings',}
]; 

  return (
   
    <Stack.Navigator mode="card" headerMode="screen">

    <Stack.Screen
          name="Login"
          component={Login}
          options={{
            header: ({ navigation, scene }) => (
              <Header
                title=""
                back
                white
                transparent
                navigation={navigation}
                scene={scene}
              />
            ),
            headerTransparent: true
          }}
        />

      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Home"
              tabs={homeMenu}
              search
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }} />
      
      <Stack.Screen
        name="viewTrips"
        component={viewTrips}
        options={{
          header: ({ navigation, scene }) => (
            <Header
            title="Home"
            tabs={userTripMenu} 
            search
            navigation={navigation}
            scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }

        }}/>

       <Stack.Screen
        name="Trip"
        component={Trip}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Single Trip "
              white 
              back
             // bgColor={argonTheme.COLORS.ACTIVE} 
              titleColor="black" 
              iconColor="black"
              navigation={navigation}
              scene={scene}
            />
          ),
        }}/>
    
     <Stack.Screen
    name="Profile"
    component={Profile}
    options={
     {
      
      header: ({ navigation, scene }) => (
        ({ route }) => ({
          title: route.params.item.name
        }), 
        <Header
          title=""
          back
          white
          transparent
          navigation={navigation}
          scene={scene}
        />
      ),
      headerTransparent: true
    }}
  />

      
    <Stack.Screen
    name="Register"
    component={Register}
    options={{
      header: ({ navigation, scene }) => (
        <Header
          title=""
          back
          white
          transparent
          navigation={navigation}
          scene={scene}
        />
      ),
      headerTransparent: true
    }}
  />
 </Stack.Navigator>
 
 );
}


function ProfileStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
    <Stack.Screen
    name="Profile"
    component={Profile}
    options={
     {
      
      header: ({ navigation, scene }) => (
        ({ route }) => ({
          title: route.params.item.name
        }), 
        <Header
          title=""
          back
          white
          transparent
          navigation={navigation}
          scene={scene}
        />
      ),
      headerTransparent: true
    }}
  />

    <Stack.Screen
    name="Followers"
    component={Followers}
    options={
     
       {
      
      header: ({ navigation, scene }) => (
        ({ route }) => ({
          title: route.params.item.name
        }), 
        <Header
          title="Followers"
          back
          white
          transparent
          navigation={navigation}
          scene={scene}
        />
      ),
      headerTransparent: true
    }}
  />

    <Stack.Screen
    name="Following"
    component={Following}
    options={
      ({ route }) => ({
        title: route.params.item.name
      })
      , {
      
      header: ({ navigation, scene }) => (
        <Header
          title="Following"
          back
          white
          transparent
          navigation={navigation}
          scene={scene}
        />
      ),
      headerTransparent: true
    }}
  />

    </Stack.Navigator>

  );
} 

function TripStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="tripName"
        component={tripName}
        options={
          ({ route }) => ({
            title: route.params.item.name
          }), 
          {
          header: ({ navigation, scene }) => (
            <Header
              title="Create Trip"
              search
              options
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
      <Stack.Screen
        name="tripLocation"
        component={tripLocation}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="tripLocation"
              white
              back 
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
       <Stack.Screen
        name="tripDates"
        component={tripDates}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="tripDates"
              white
              back 
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="tripDescription"
        component={tripDescription}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="tripDescription"
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="tripTags"
        component={tripTags}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="tripTags"
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="tripImages"
        component={tripImages}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="tripImages"
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />

      <Stack.Screen
        name="Trip"
        component={Trip}
        options={
          ({ route }) => ({
            title: route.params.item.name
          }), 
          {
          header: ({ navigation, scene }) => (
            <Header
              title="3 Days, 2 Nights, 1 Trip "
              white 
              back
              //bgColor={argonTheme.COLORS.ACTIVE} 
              titleColor="white" 
              iconColor="white"
              navigation={navigation}
              scene={scene}
            />
          ),
        }}/>

    </Stack.Navigator>
  );
}


function ItineraryStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="CreateItinerary_Name"
        component={CreateItinerary_Name}
        options={
          ({ route }) => ({
            title: route.params.item.name
          }), 
          {
          header: ({ navigation, scene }) => (
            <Header
              title="CreateItinerary_Name"
              search
              options
              navigation={navigation}
              scene={scene}
            />
          ),
          //cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
      <Stack.Screen
        name="CreateItinerary_Location"
        component={CreateItinerary_Location}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="CreateItinerary_Location"
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
       <Stack.Screen
        name="CreateItinerary_Dates"
        component={CreateItinerary_Dates}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="CreateItinerary_Dates"
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="CreateItinerary_Text"
        component={CreateItinerary_Text}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="CreateItinerary_Text"
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="CreateItinerary_Tag"
        component={CreateItinerary_Tag}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="CreateItinerary_Tag"
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
       <Stack.Screen
        name="CreateItinerary_Image"
        component={CreateItinerary_Image}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Upload Images" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
       <Stack.Screen
        name="Itinerary"
        component={Itinerary}
        options={
          ({ route }) => ({
            title: route.params.item.name
          }), {
          header: ({ navigation, scene }) => (
            <Header title="Itinerary" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
    </Stack.Navigator>
    

  );
}





function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8
      }}
      drawerContentOptions={{
        activeTintcolor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal"
        }
      }}
      initialRouteName="Login"
    >

      <Drawer.Screen name="Login" component={HomeStack} />
      <Drawer.Screen name="Profile" component={ProfileStack} />
      <Drawer.Screen name="Account" component={Register} />
      <Drawer.Screen name="Loading" component={Loading} />

      <Drawer.Screen name="Create Itinerary" component={ItineraryStack} />
      <Drawer.Screen name="Itinerary" component={Itinerary} />
      <Drawer.Screen name="Itinerary_Ex" component={Itinerary_Ex} />
      <Drawer.Screen name="Create Trip" component={TripStack} />
      <Drawer.Screen name="Trip" component={TripStack} />

      
      <Drawer.Screen name="Elements" component={ElementsStack} />
      <Drawer.Screen name="Articles" component={ArticlesStack} />
      <Drawer.Screen name="Basic" component={Basic} />

    </Drawer.Navigator>
  );
}