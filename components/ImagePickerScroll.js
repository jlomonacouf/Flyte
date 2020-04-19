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
import { Block, Text, theme} from "galio-framework";

import { Button, Icon, Input } from ".";

import { Images, argonTheme } from "../constants";
import { backendEndpoint, PROFILE_IMG_URL, CREATE_TRIP_URL } from '../src/api_methods/shared_base'
import * as ImagePicker from 'expo-image-picker';
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

    removeImage = () => {
        var images = this.state.images;
        images.splice(this.state.editImageIndex, 1);
        this.setState({editingCaption: false, images: images});
    }

    updateText = (title, caption) => {
        var images = this.state.images;
        images[this.state.editImageIndex].title = title;
        images[this.state.editImageIndex].caption = caption;

        this.setState({editingCaption: false, images: images})
    }

    renderImages = () => {
        if(this.state.images.length === 0) {
            return (
                <Text size={20} color={"gray"} style={{textAlign:"center"}}>{"You haven't chosen any images\nClick the button to add one!"}</Text>
            )
        }
        else {
            return (
                <Block flex row>
                    {this.state.images.map((image,index) => {
                        return (
                            <Block style={{marginLeft: 20}}>
                                <TouchableOpacity onPress={() => this.setState({editingCaption: true, editImageIndex: index})}>
                                    <Image source={{uri: image.uri}} style={{width: width * 0.45, height: height * 0.45}}/>
                                    <Text size={20} style={{textAlign: "center"}}>{image.title}</Text>
                                    <Text size={18} style={{textAlign: "center", color: "gray"}}>{image.caption}</Text>
                                </TouchableOpacity>
                            </Block>
                        )
                    })}
                </Block>
            )
        }
    }

    render() {
        this.props.onUpdateImages(this.state.images);
        if(this.state.editingCaption === true) {
            var editTitle = this.state.images[this.state.editImageIndex].title;
            var editCaption = this.state.images[this.state.editImageIndex].caption;
        }

        if(this.state.editingCaption === false) {
            return (
                <Block flex style={{marginTop: 5}}>
                    <ScrollView>
                        <ScrollView horizontal={true}
                        pagingEnabled={true}
                        decelerationRate={0}
                        scrollEventThrottle={16}
                        snapToAlignment="center"
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={width - theme.SIZES.BASE * 2 + theme.SIZES.BASE * 0.375}
                        contentContainerStyle={{
                            paddingHorizontal: theme.SIZES.BASE / 2,
                            
                        }}>
                            <Block style={{alignItems: "center", justifyContent: "center"}}>
                                {this.renderImages()}
                            </Block>
                        </ScrollView>
                    </ScrollView>
                    <TouchableOpacity style={styles.imageContainer} onPress={() => this._pickImage()}>
                        <Icon name="add" family="galio" size={60} color={argonTheme.COLORS.ICON} style={styles.addImageButton}/>
                    </TouchableOpacity>
                </Block>
            )
        }
        else {
            var image = this.state.images[this.state.editImageIndex];
            return (
                <Block flex style={{marginTop: 20}}>
                    <ScrollView ref="scrollView"
                    onContentSizeChange={(width,height) => this.refs.scrollView.scrollTo({y:height})}>
                        <Block style={{alignItems: "center"}}>
                            <Image source={{uri: image.uri}} style={{width: width * 0.45, height: height * 0.45}}/>
                            <Input borderless size={20} placeholder={(image.title === "") ? "Title" : image.title} onChangeText={(value) => editTitle = value}>{editTitle}</Input>
                            <Input borderless size={20} placeholder={(image.caption === "") ? "Caption" : image.caption} onChangeText={(value) => editCaption = value}>{editCaption}</Input>
                            <Block flex row style={{marginBottom: 10}}>
                                <Button color="info" style={{width: width * 0.20, marginTop: 25, marginRight: 20}} onPress={() => this.removeImage()}>
                                    <Text bold size={16} color={argonTheme.COLORS.WHITE}>Delete</Text>
                                </Button>
                                <Button color="info" style={{width: width * 0.20, marginTop: 25}} onPress={() => this.updateText(editTitle, editCaption)}>
                                    <Text bold size={16} color={argonTheme.COLORS.WHITE}>Save</Text>
                                </Button>
                            </Block>
                        </Block>
                    </ScrollView>
                </Block>
            )
        }
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        alignSelf: 'center',
        width:70,
        height:70,
        backgroundColor:'#fff',
        borderRadius:50,
    },
})