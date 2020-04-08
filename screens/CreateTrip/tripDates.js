import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ImageBackground,
    Dimensions,
    StatusBar,
    KeyboardAvoidingView
} from "react-native";
import { Block, Text } from "galio-framework";

import { Button, Icon, Input } from "../../components";
import { Images, argonTheme } from "../../constants";

import DatePicker from 'react-native-datepicker';

const { width, height } = Dimensions.get("screen");


export default class tripDates extends Component {
    constructor(props) {
        super(props);
        //set value in state for initial date
        this.state = {
            start_date: '05-06-2020',
            end_date: '05-27-2020'
        };
    }

    render() {
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
                            <Block flex style={{ marginTop: 200, marginBottom: 20 }}>
                                <Block flex={0.17} middle>
                                    <Text color="#00" size={25}>
                                        Dates
                  </Text>
                                </Block>
                                <Block middle style={{ marginTop: 80, marginBottom: 30 }}>
                                    <DatePicker
                                        style={{ width: 200 }}
                                        date={this.state.start_date} //initial date from state
                                        mode="date" //The enum of date, datetime and time
                                        placeholder="Startdate"
                                        format="DD-MM-YYYY"
                                        minDate="01-01-1900"
                                        maxDate="01-01-2030"
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
                                            this.setState({ start_date: date });
                                        }}
                                    />
                                </Block>
                                <Block middle>
                                    <DatePicker
                                        style={{ width: 200 }}
                                        endDate={this.state.end_date} //initial date from state
                                        mode="date" //The enum of date, datetime and time
                                        placeholder="End date"
                                        format="DD-MM-YYYY"
                                        minDate="01-01-1950"
                                        maxDate="01-01-2050"
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
                                        onDateChange={endDate => {
                                            this.setState({ end_date: endDate });
                                        }}
                                    />
                                </Block>
                            </Block>

                            <Block flex bottom>
                                <Block middle>
                                    <Button color="primary" style={styles.createButton}>
                                        <Text bold size={16} color={argonTheme.COLORS.WHITE}
                                            onPress={() => navigation.navigate("tripDescription")}>
                                            Continue
                        </Text>
                                    </Button>
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
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        padding: 16,
    },
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
    createButton: {
        width: width * 0.40,
        marginTop: 25
    }
});
