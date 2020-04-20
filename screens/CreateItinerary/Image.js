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
import ImagePickerScroll from "../../components/ImagePickerScroll"
import { Images, argonTheme } from "../../constants";
import { backendEndpoint, PROFILE_IMG_URL, CREATE_ITINERARY_URL } from '../../src/api_methods/shared_base'
import * as ImagePicker from 'expo-image-picker';
const { width, height } = Dimensions.get("screen");
import Spinner from 'react-native-loading-spinner-overlay';

class CreateItinerary_Image extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      uploading: false,
      error: false,
    };

    this.imageList = [];
  }

  uploadImages = () => {
    var promises = [];

    this.imageList.forEach(image => {
      promises.push(new Promise((resolve) => {
        fetch(backendEndpoint + PROFILE_IMG_URL, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({subdirectory: "/Plan/"})
        })
        .then((response) => response.json())
        .then((data) => {
          fetch(image.uri).then(response => {
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
                  resolve({title: image.title, caption: image.caption, image_path: data.data.url});
                })
                .catch(error => {
                  console.log('error', error)
                });
            })
          });
        })
      }))
    });

    return new Promise((resolve) => {
      return Promise.all(promises).then((imageList) => {
        resolve(imageList);
        return;
      })
    })
  }

  uploadPlan = (images) => {
    var params = this.props.route.params;
    var plan = {name: params.name, text: params.text, address: params.location.address, city: params.location.city, country: params.location.country,
    latitude: params.location.latitude, longitude: params.location.longitude};
    var tags = (params.tags) ? params.tags : [];
    var photos = (images) ? images : [];

    fetch(backendEndpoint + CREATE_ITINERARY_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({itinerary: plan, tags: tags, photos: photos})
    }).then(response => response.text())
    .then(result => {
      navigation.reset({index: 0, routes: [{ name: 'Home' }],})
    }).catch(err => {
      console.log(err)
      //navigation.reset({index: 0, routes: [{ name: 'Home' }],})
    })
  }

  createPlan = () => {
    if(this.imageList.length !== 0) {
      this.setState({uploading: true})

      this.uploadImages().then((imagePaths) => {
        this.setState({uploading: false});
        this.uploadPlan(imagePaths);
      }).catch((err) => {
        this.setState({uploading: false, error: true});
        console.log('error uploading to s3: ', err);
      });
    }
    else {
      this.uploadPlan()
    }
  }

  updateImages = (images) => {
    this.imageList = images;
  }

  render() {
    const { navigation } = this.props;

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
                      Choose Photos
                    </Text>
                  </Block>
                  <Block flex center>
                    <KeyboardAvoidingView
                      style={{ flex: 1 }}
                      behavior="padding"
                      enabled
                    >
                      <Block width={width * 0.8} height={height*0.65}>
                        <ImagePickerScroll onUpdateImages={this.updateImages}/>
                      </Block>
                      <Block flex row style={{justifyContent: 'flex-end'}} >
                        <Button color="primary" style={styles.createButton} onPress={() => this.createPlan()}>
                          <Text bold size={16} color={argonTheme.COLORS.WHITE} 
                          onPress={() => this.createPlan()}>
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
    height: height * 0.9,
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

export default CreateItinerary_Image;
