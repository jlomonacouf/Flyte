import React from "react";


import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import { Block, Text} from "galio-framework";

import { Button, Icon, Input } from "../../components";
import { Images, argonTheme } from "../../constants";
import { backendEndpoint, PROFILE_IMG_URL, CREATE_TRIP_URL } from '../../src/api_methods/shared_base'
import * as ImagePicker from 'expo-image-picker';
const { width, height } = Dimensions.get("screen");
import Spinner from 'react-native-loading-spinner-overlay';

class tripImages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      uploading: false,
      error: false,
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
      this.setState({ image: result.uri });
    }
  };

  createTrip = (url) => {
    var trip = this.props.route.params;
    trip.image_path = url;

    fetch(backendEndpoint + CREATE_TRIP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.props.route.params)
    })
    .then((response) => response.json())
    .then((data) => {
      this.setState({uploading: false, error: false});
  
      this.props.navigation.navigate('tripRecommendItineraries', {id: data.id})
    }).catch((error) => {
      console.log(error);
    })
  }

  uploadImages = () => {
    //() => navigation.reset({index: 0, routes: [{ name: 'Articles' }],})
    this.setState({uploading: true})
    fetch(backendEndpoint + PROFILE_IMG_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({subdirectory: "/Trips/"})
    })
    .then((response) => response.json())
    .then((data) => {
      
      fetch(this.state.image).then(response => {
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
              this.createTrip(data.data.url);
            })
            .catch(error => {
              console.log('error', error)
              this.setState({uploading: false, error: true});
            });

        })
      });
    }).catch((err) => {
      this.setState({uploading: false, error: true});
      console.log('error uploading to s3: ', err);
    });
    
  }

  render() {
    let { image } = this.state;
    
    const { navigation } = this.props;

    const renderImageContainer = () => {
      if(this.state.image === null) {
        return (
          <Text bold size={20} style={styles.pickImageText}>Choose Photo</Text>
        )
      }
      else {
        return (
          <Image source={{uri: this.state.image}} style={{ width: width * 0.70, height: height * 0.3 }}/>
        )
      }
    }

    const renderErrorMessage = () => {
      if(this.state.error === true) {
        return (
          <Text bold size={15} style={{textAlign: 'center', color: '#FF0000'}}>An error occurred while uploading your file</Text>
        )
      }
    }
    
    if(this.state.uploading === true) {
      return (
        <Block flex style={styles.container}>
        <Spinner
          visible={true}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      </Block> ); 
    }
    else {
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
                      Choose a Trip Photo
                    </Text>
                  </Block>
                  <Block flex center>
                    <KeyboardAvoidingView
                      style={{ flex: 1 }}
                      behavior="padding"
                      enabled
                    >
                      <Block width={width * 0.8} height={height*0.55}>
                        <TouchableOpacity style={styles.pickImageButton} onPress={this._pickImage}>
                          {renderImageContainer()}
                        </TouchableOpacity>
                        {renderErrorMessage()}
                      </Block>
                      <Block flex row style={{justifyContent: 'flex-end'}} >
                        <Button color="primary" style={styles.createButton}>
                          <Text bold size={16} color={argonTheme.COLORS.WHITE} 
                          onPress={() => this.uploadImages()}>
                            NEXT
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
    width: width * 0.20,
    marginTop: 25,
  },
  pickImageButton: {
    borderWidth: 1,
    borderColor: argonTheme.COLORS.BLACK,
    marginLeft: width * 0.05,
    width: width * 0.70,
    height: height * 0.3,
    backgroundColor: argonTheme.COLORS.BORDER_COLOR,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default tripImages;
