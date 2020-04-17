import React from "react";


import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView 
} from "react-native";
import { Block, Text} from "galio-framework";

import { Button, Icon, Input } from ".";

import { Images, argonTheme } from "../constants";
import { backendEndpoint, PROFILE_IMG_URL, CREATE_TRIP_URL } from '../src/api_methods/shared_base'
import * as ImagePicker from 'expo-image-picker';
import { FlatList } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("screen");

export default class ImagePickerScroll extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          images: [],
          editingCaption: false,
          editImageIndex: 0
        };
    }

    componentDidMount() {
        this.getPermissionAsync();
        console.log('Permissions received');
    }

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
            var images = this.state.images;
            images.push({uri: result.uri, title: "", caption: ""});
            this.setState({ images: images, editingCaption: true, editImageIndex: images.length-1 });
        }
    };

    removeImage = (index) => {
        var images = this.state.images;
        images.splice(index, 1);
        this.setState({images: images});
    }

    renderImages = () => {
        console.log(this.state.images)

        return (
            <Block flex row>
                {this.state.images.map((image,index) => {
                    return (
                        <Block>
                            <Image source={{uri: image}} style={{width: width * 0.45, height: height * 0.45}}/>
                            <TouchableOpacity
                                style={{
                                    borderWidth:1,
                                    borderColor:'rgba(0,0,0,0.2)',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    alignSelf: 'center',
                                    width:22,
                                    height:22,
                                    backgroundColor:'#fff',
                                    borderRadius:50,
                                    position: "absolute",
                                    left: (width * 0.5 * (index+1)) - 50,
                                    top: 5
                                    }}
                                    onPress={() => this.removeImage(index)}
                            >
                                <Icon name="basket" family="ArgonExtra" size={22} color={argonTheme.COLORS.ICON}/>
                            </TouchableOpacity>
                            <Block flex row>
                                <Text size={22} style={{textAlign: "center"}}>Image {index+1}</Text>
                                <Text size={22} style={{textAlign: "center"}}>Image {index+1}</Text>
                            </Block>
                        </Block>
                    )
                })}
            </Block>
        )
    }

    render() {
        console.log(this.state.editingCaption)
        if(this.state.editingCaption === false) {
            return (
                <Block flex style={{marginTop: 20, borderWidth: 1, backgroundColor: "#F2F2F2"}}>
                    <ScrollView  horizontal={true}>
                        <Block flex row style={{alignItems: "center"}}>
                            {this.renderImages()}
                            <TouchableOpacity
                                style={{
                                    borderWidth:1,
                                    borderColor:'rgba(0,0,0,0.2)',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    alignSelf: 'center',
                                    width:70,
                                    height:70,
                                    backgroundColor:'#fff',
                                    borderRadius:50,
                                    }}
                                    onPress={() => this._pickImage()}
                                >
                                <Icon name="basket" family="ArgonExtra" size={30} color={argonTheme.COLORS.ICON}/>
                                
                            </TouchableOpacity>
                        </Block>
                    </ScrollView>
                </Block>
            )
        }
        else {
            var image = this.state.images[this.state.editImageIndex];
            return (
                <Block flex style={{marginTop: 20, borderWidth: 1, backgroundColor: "#F2F2F2"}}>
                    <ScrollView >
                        <Block style={{alignItems: "center"}}>
                            <Image source={{uri: image.uri}} style={{width: width * 0.45, height: height * 0.45}}/>
                            <Input borderless placeholder={(image.title === "") ? "Title" : image.title}></Input>
                            <Input borderless placeholder={(image.caption === "") ? "Caption" : image.caption}></Input>
                            <Block flex row style={{marginBottom: 10}}>
                                <Button color="primary" style={{width: width * 0.20, marginTop: 25, marginRight: 20}} onPress={() => this.setState({editingCaption: false})}>
                                    <Text bold size={16} color={argonTheme.COLORS.WHITE}>Delete</Text>
                                </Button>
                                <Button color="primary" style={{width: width * 0.20, marginTop: 25}} onPress={() => this.setState({editingCaption: false})}>
                                    <Text bold size={16} color={argonTheme.COLORS.WHITE}>Add</Text>
                                </Button>
                            </Block>
                        </Block>
                    </ScrollView>
                </Block>
            )
        }
    }
}