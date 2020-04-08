import React from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { articles, Images, argonTheme } from "../../constants";
import { Card } from "../../components";

const { width } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;

const followersList= [
  {
     username: "Detienne20", 
     first_name: "Dania",
     last_name: "Etienne",
     profileImg:"https://scontent.fmia1-1.fna.fbcdn.net/v/t1.0-9/23755586_1656003381128147_5131151436850508940_n.jpg?_nc_cat=108&_nc_sid=174925&_nc_ohc=DahEnYZ-QrkAX9gN9DR&_nc_ht=scontent.fmia1-1.fna&oh=c85e4a06a771d42cfdd33ff54c10fa37&oe=5EB4D03A"
  },
  {
    username: "Gremlin", 
    first_name: "Nickan",
    last_name: "Hussani",
    profileImg: "https://images.hollywoodpicture.net/wp-content/uploads/2017/12/dwayne-johnson-aka-the-rock-muscle-body.jpg",

  },
  {
    username: "Ophillia", 
    first_name: "Angely",
    last_name: "Guzman",
    profileImg: "https://scontent.fmia1-1.fna.fbcdn.net/v/t1.0-9/19702294_469678050053497_7339594951533367476_n.jpg?_nc_cat=101&_nc_sid=7aed08&_nc_ohc=MbvNxQcOH2EAX8qR5xy&_nc_ht=scontent.fmia1-1.fna&oh=0e8f2d23f9d177358aa1871e96a5fdee&oe=5EB1A433",


  },
  {
    username: "JLo",
    first_name: "Justin",
    last_name: "LoMonaco",
    profileImg: "https://www.dogbreedplus.com/dog_breeds/images/collie-dog.jpg",

  },
  {
    username: "SamG",
    first_name: "Samantha",
    last_name: "Garcia",
    profileImg: "https://scontent.fmia1-1.fna.fbcdn.net/v/t1.0-9/20106807_1944291105826026_3553755161152055271_n.jpg?_nc_cat=107&_nc_sid=7aed08&_nc_ohc=okaNoN0mut8AX-h3Y4n&_nc_ht=scontent.fmia1-1.fna&oh=81ca1323e201094608218f2260669be7&oe=5EB54F0F",

  }, 
  {
    username: "Test1",
    first_name: "Jane",
    last_name: "Doe",
    profileImg: "https://scontent.fmia1-1.fna.fbcdn.net/v/t1.0-9/61351553_2380152448713233_7964548565852749824_o.jpg?_nc_cat=108&_nc_sid=730e14&_nc_ohc=SIqjyuMBvVMAX-ImMmp&_nc_ht=scontent.fmia1-1.fna&oh=37efc679078f730c6b48942c0e632576&oe=5EB3426D",

  },
  {
    username: "Test2", 
    first_name: "John",
    last_name: "Doe",
    profileImg: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.7IUiI5CFkbPpekqRGfk0gAHaE8%26pid%3DApi&f=1",
  }, 
  {
    username: "taylorswift", 
    first_name: "Taylor",
    last_name: "Swift",
    profileImg: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpixel.nymag.com%2Fimgs%2Fdaily%2Fvulture%2F2019%2F05%2F08%2F08-taylor-swift.w700.h700.jpg&f=1&nofb=1",
  }, 
];

class Followers extends React.Component {
  
  renderFollowers = (follower, index) => {

    const { navigation, horizontal, full, style, ctaColor, imageStyle } = this.props;
    
    const imageStyles = [
      full ?   styles.horizontalImage : styles.fullImage,
      imageStyle
    ];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [styles.imageContainer,
      horizontal ?  styles.verticalStyles : styles.horizontalStyles ,
      styles.shadow
    ];


    return (

      <Block row={horizontal} card flex style={cardContainer}>
      <TouchableWithoutFeedback style={{zIndex:3}} key={`user-${follower.username}`} onPress={() => navigation.navigate("Profile", {user: follower})}  >
        <Block flex style={imgContainer}>
          <Image source={{uri: follower.profileImg}} style={imageStyles} />
        </Block>
        </TouchableWithoutFeedback>
      <TouchableWithoutFeedback style={{zIndex:3}} key={`user-${follower.username}`} onPress={() => navigation.navigate("Profile", {user: follower})}>
        <Block flex space="between" style={styles.cardDescription}>
          <Text center size={14} style={styles.cardTitle}>{follower.first_name} {follower.last_name}</Text>
          <Text center size={14} muted={!ctaColor} color={ctaColor || argonTheme.COLORS.ACTIVE} bold>{follower.username}</Text>
        </Block>
      </TouchableWithoutFeedback>
    </Block>


    ); 

  };

  renderCards = () => {
    return (
      <Block flex style={styles.group}>
        <Text  center bold size={20} style={styles.title}>
          Followers 
        </Text>
        <Block flex >
        <Block style={{ width: width - theme.SIZES.BASE * 2, paddingHorizontal: theme.SIZES.BASE}}>
          <ScrollView>
            { followersList && followersList.map((follower,index) =>
                this.renderFollowers(follower, index))}
          </ScrollView>
        </Block>
        </Block>
        <Block flex style={{ marginTop: theme.SIZES.BASE / 2 }}></Block>
       
      </Block>
    );
  };


  render() {
    return (
      <Block flex center>
        <ScrollView
          showsVerticalScrollIndicator={false}
          >
          {this.renderCards()}

        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 22,
    color: argonTheme.COLORS.HEADER
  },
  group: {
    paddingTop: theme.SIZES.BASE
  },
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 16
  },
  cardTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: 215
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },





});

export default Followers;

