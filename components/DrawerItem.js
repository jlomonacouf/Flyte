import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Block, Text, theme } from "galio-framework";

import Icon from "./Icon";
import {MaterialIcons} from '@expo/vector-icons';
//https://expo.github.io/vector-icons/


import argonTheme from "../constants/Theme";

class DrawerItem extends React.Component {
  renderIcon = () => {
    const { title, focused } = this.props;

    switch (title) {
      case "Home":
        return (
          <Icon
            name="shop"
            family="ArgonExtra"
            size={20}
            color={focused ? "white" : argonTheme.COLORS.PRIMARY}
          />
        );
        case "Profile":
          return (
            <Icon
              name= "person-pin-circle" //perm-identity, person, person-outline. person-pin, potrait
              family="MaterialIcons"
              size={28}
              color={focused ? "white" : argonTheme.COLORS.INFO}
            />); 
        case "Account":
           return (
                <Icon
                  name="chart-pie-35" //settings 
                  family="ArgonExtra"
                  size={18}
                  color={focused ? "white" : argonTheme.COLORS.WARNING}
                />
         );
         case "View Plans":
          return (<Icon
            name="event-note" //pageview,view-list, view-module,history, 
            family="MaterialIcons"
            size={24}
            color={focused ? "white" : argonTheme.COLORS.PRIMARY}
          />);
          case "Create a Plan":
            return (
              <Icon
                name="edit-location" 
                family="MaterialIcons"
                size={24}
                color={focused ? "white" : argonTheme.COLORS.ERROR}
              />
            );
            case "View Trips":
              return (<Icon
                name="calendar-date" //group-add, local-airport
                family="ArgonExtra"
                size={20}
                color={focused ? "white" : argonTheme.COLORS.INFO}
              />);
       case "Create a Trip":
        return (
          <Icon
            name="flight-takeoff" //plus-one
            family="MaterialIcons"
            size={22}
            color={focused ? "white" : argonTheme.COLORS.WARNING}
          />
        );
        case "Elements":
          return (<Icon
            name="map-big"
            family="ArgonExtra"
            size={14}
            color={focused ? "white" :  argonTheme.COLORS.ERROR}
          />);
        
      case "Articles":
        return (
          <Icon
            name="spaceship"
            family="ArgonExtra"
            size={14}
            color={focused ? "white" : argonTheme.COLORS.PRIMARY}
          />
        );   
      case "Log out":
        return <Icon />;
      default:
        return null;
    }
  };

  renderBreak = () => {
    const {title} = this.props;
    var dividerList = ["Account", "Create a Plan", "Create a Trip"]
    if(dividerList.includes(title)) {
      return (
        <View
            style={{
            borderBottomColor: 'lightgray',
            marginHorizontal: 0,
            borderBottomWidth: 1
        }}/>
      )
    }
  }

  render() {
    const { focused, title, navigation } = this.props;

    const containerStyles = [
      styles.defaultStyle,
      focused ? [styles.activeStyle, styles.shadow] : null
    ];

    return (
      <TouchableOpacity
        style={{ height: 60 }}
        onPress={() => {
            switch(title) {
              case "Create a Plan":
                navigation.navigate("Create Itinerary");
                break;
              case "Create a Trip":
                navigation.navigate("Create Trip");
                break;
              default:
                navigation.navigate(title);
                break;
            }
          }
        }
      >
        <Block flex row style={containerStyles}>
          <Block middle flex={0.1} style={{ marginRight: 5 }}>
            {this.renderIcon()}
          </Block>
          <Block row center flex={0.9}>
            <Text
              size={15}
              bold={focused ? true : false}
              color={focused ? "white" : "rgba(0,0,0,0.5)"}
            >
              {title}
            </Text>
          </Block>
        </Block>
        {this.renderBreak()}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16
  },
  activeStyle: {
    backgroundColor: argonTheme.COLORS.ACTIVE,
    borderRadius: 4
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.1
  }
});

export default DrawerItem;
