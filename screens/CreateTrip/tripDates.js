import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ImageBackground,
    Dimensions,
    StatusBar,
    KeyboardAvoidingView,
    ScrollView
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../../components";
import { Images, argonTheme } from "../../constants";

import DatePicker from 'react-native-datepicker';

const { width, height } = Dimensions.get("screen");


export default class tripDates extends Component {
    constructor(props) {
        super(props);

        var trimmedLocations = []
        this.props.route.params.locations.forEach(element => {
            if(element.address !== "")
                trimmedLocations.push(element)
        });
        //set value in state for initial date
        var dateList = [];
        var errorList = [];

        for(var i = 0; i < trimmedLocations.length; i++)
        {
            dateList.push({});
            errorList.push("");
        }

        this.state = {
            locations: trimmedLocations,
            dates: dateList,
            errorList: errorList
        };
    }

    

    render() {
        const MIN_DATE_DEFAULT = "04-01-2020";
        const MAX_DATE_DEFAULT = "01-01-2030";
        const renderDate = (index) => {
            return (
                <Block flex row style={{marginTop: 10}}>
                    <DatePicker
                    style={{ width: width*0.4 }}
                    date={this.state.dates[index].startDate} //initial date from state
                    mode="date" //The enum of date, datetime and time
                    placeholder="Start date"
                    format="MM-DD-YYYY"
                    minDate={MIN_DATE_DEFAULT}
                    maxDate={MAX_DATE_DEFAULT}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0,
                        },
                        dateInput: {
                            marginLeft: 36,
                        },
                    }}
                    onDateChange={date => {
                        var dateList = this.state.dates;
                        dateList[index].startDate = date;
                        this.setState({ dates: dateList });
                    }}
                    />
                    <Block style={{flex: 1, justifyContent: 'center',alignItems: 'center'}}>
                    <Text size={20} style={{marginLeft: 2, marginRight: 2, textAlign:"center"}}>to</Text>
                    </Block>
                    <DatePicker
                    style={{ width: width*0.34 }}
                    date={this.state.dates[index].endDate} //initial date from state
                    mode="date" //The enum of date, datetime and time
                    placeholder="End date"
                    format="MM-DD-YYYY"
                    minDate={MIN_DATE_DEFAULT}
                    maxDate={MAX_DATE_DEFAULT}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    showIcon={false}
                    onDateChange={date => {
                        var dateList = this.state.dates;
                        dateList[index].endDate = date;
                        this.setState({ dates: dateList });
                    }}
                    />
                </Block>
            )
        }
        const renderError = (index) => {
            if(this.state.errorList[index] != "") {
                return (
                    <Text size={16} style={{color: "#FF0000"}}>{this.state.errorList[index]}</Text>
                )
            }
        }
        const renderLocationDates = () => {
            return (
                <Block>
                        {this.state.locations.map((value, index) => {
                            return(
                                <Block>
                                    <Block flex row style={{marginTop: (index === 0) ? 0 : 30}}>
                                        <Text size={17} style={{marginLeft: 5}}>Set dates for: </Text>
                                        <Text bold size={17}>{value.address}</Text>
                                    </Block>
                                    <Block flex row>
                                        {renderDate(index)}
                                    </Block>
                                    {renderError(index)}
                                </Block>
                            )}
                        )}
                </Block>
            )
        }

        const formatDate = (date) => {

            var dateParts = date.split('-');
            return dateParts[2] + '-' + dateParts[0] + '-' + dateParts[1]
        }

        const checkValidDates = () => {
            const { navigation } = this.props;
            var datesValid = true;
            var errorList = this.state.errorList;
            var formattedDates = [];

            for(var i = 0; i < this.state.dates.length; i++) {
                errorList[i] = "";

                if(this.state.dates[i].startDate === undefined || this.state.dates[i].endDate === undefined)
                {
                    datesValid = false;
                    errorList[i] = "Please specify dates";
                    continue;
                }

                var startDate = new Date(formatDate(this.state.dates[i].startDate));
                var endDate = new Date(formatDate(this.state.dates[i].endDate));
                formattedDates.push({startDate: formatDate(this.state.dates[i].startDate), endDate: formatDate(this.state.dates[i].endDate)});

                if(i !== 0 && startDate < new Date(formatDate(this.state.dates[i-1].endDate)))
                {
                    datesValid = false;
                    errorList[i] = "Start date cannot be before previous location's end date";
                }
                if(startDate > endDate)
                {
                    datesValid = false;
                    errorList[i] = "End date cannot be before start date"
                }
            }
            
            if(datesValid === true)
            {
                this.setState({errorList: errorList})
                navigation.navigate("tripTags", {name:  this.props.route.params.name, locations: this.state.locations, dates: formattedDates})
            }
            else
            {
                this.setState({errorList: errorList})
            }
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
                            Choose Travel Dates
                        </Text>
                        </Block>
                        <Block flex center>
                        <KeyboardAvoidingView
                            style={{ flex: 1 }}
                            behavior="padding"
                            enabled
                        >
                            <Block width={width * 0.8} height={height*0.55} iconContent={<Icon size={16} color={theme.COLORS.MUTED} name="search-zoom-in" family="ArgonExtra" />}>
                            <ScrollView contentContainerStyle={styles.articles} keyboardShouldPersistTaps='always' listViewDisplayed={false} >
                           {renderLocationDates()}
                            </ScrollView>
                            </Block>
                            <Block flex bottom>
                            <Button color="primary" style={styles.createButton} onPress={() => checkValidDates()}>
                                <Text bold size={16} color={argonTheme.COLORS.WHITE}
                                onPress={() => checkValidDates()}>
                                Add Tags
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
    inputIcons: {
      marginRight: 12
    },
    createButton: {
      width: width * 0.30,
      marginTop: 25
    }
  });