import React from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions
} from "react-native";
//galio
import { Block, Text, theme } from "galio-framework";
//argon
import { articles, Images, argonTheme } from "../constants/";
import { Card } from "../components/";

const { width } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
const cardWidth = width - theme.SIZES.BASE * 2;
const categories = [
  {
    title: "Day One",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsantorinisuites.files.wordpress.com%2F2014%2F02%2Fastarte-suites-hotel-boutique-hotel-in-santorini-greece.jpg&f=1&nofb=1",
    date: "05/05/2020"
  },
  {
    title: "Day Two",
    image:
      "https://2.bp.blogspot.com/-VqFCYgtKyjM/Uk-34ap3tWI/AAAAAAAAcIo/1QJCtj-7-YQ/s1600/Mykonos-passion4luxury.32.png",
    date: "05/06/2020"
  }
];

class Trip extends React.Component {
  renderProduct = (item, index) => {
    const { navigation } = this.props;

    return (
      <TouchableWithoutFeedback
        style={{ zIndex: 3 }}
        key={`product-${item.title}`}
       onPress={() => navigation.navigate("Loading", { product: item })}
      >
        <Block center style={styles.productItem}>
          <Image
            resizeMode="stretch"
            style={styles.productImage}
            source={{ uri: item.image }}
          />
          <Block center style={{ paddingHorizontal: theme.SIZES.BASE }}>
           
            <Text center size={18}   style={{marginTop: 6, marginBottom:2}}>
              {item.title}
            </Text>
            <Text
              center
              size={16}
              color={theme.COLORS.MUTED}
              style={styles.productDate}
            >
              {item.date}
            </Text>
          </Block>
        </Block>
      </TouchableWithoutFeedback>
    );
  };

  renderCards = () => {
    return (
      <Block flex style={styles.group}>
        <Block flex>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
         

            <Block flex shadow style={styles.category}>
              <ImageBackground
                source={{ uri: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Flonglivelearning.com%2Fwp-content%2Fuploads%2F2012%2F10%2Fmaps-greekmyth.jpg&f=1&nofb=1" }} 
                style={[
                  styles.imageBlock,
                  { width: width - theme.SIZES.BASE *2, height: 240 }
                ]}
                imageStyle={{
                  width: width - theme.SIZES.BASE *2,
                  height: 252
                }}
              >
                <Block style={styles.categoryTitle}>
                  <Text size={18} bold color={theme.COLORS.WHITE}>
                    City, Greece
                  </Text>
                </Block>
              </ImageBackground>
            </Block>
        <Block>
        <Text bold size={24} style={styles.title}>
          Adventures in Greece
        </Text>
        <Text center size={12}>@JaneDoe</Text>
        <Block>
        <Text size={15} style={styles.subTitle}>
          Spent a couple of days in Greece. Taking a ferry from island to island was as easy as can be. Be sure to get ferry tickets in advance! 
        </Text>
        </Block>

        </Block>
           

                

          </Block>
          <Block flex style={{ marginTop: theme.SIZES.BASE / 2 }}>
            <ScrollView
              horizontal={true}
              pagingEnabled={true}
              decelerationRate={0}
              scrollEventThrottle={16}
              snapToAlignment="center"
              showsHorizontalScrollIndicator={false}
              snapToInterval={cardWidth + theme.SIZES.BASE * 0.375}
              contentContainerStyle={{
                paddingHorizontal: theme.SIZES.BASE / 2
              }}
            >
              {categories &&
                categories.map((item, index) =>
                  this.renderProduct(item, index)
                )}
            </ScrollView>
          </Block>


          <Block flex  style={{margin:20}}>
                <Text center size={18}  color={argonTheme.COLORS.HEADER}>
                  #Relaxation #Adventure #Romance
                </Text>
            </Block>
        </Block>
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
    marginTop: 20,
   // color: argonTheme.COLORS.HEADER,
   color: 'black',
    alignSelf: "center"
  },
  subTitle: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 20,
    color: 'black',
    alignSelf: "center"
  },

  group: {
    paddingTop: theme.SIZES.BASE
  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0
  },
  categoryTitle: {
    height: "50%",
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  imageBlock: {
    overflow: "hidden",
    borderRadius: 4
  },
  productItem: {
    width: cardWidth - theme.SIZES.BASE * 3,
    marginHorizontal: theme.SIZES.BASE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 10,
    shadowOpacity: 0.2
  },
  productImage: {
    width: cardWidth - theme.SIZES.BASE*2,
    height: cardWidth - theme.SIZES.BASE*6,
    borderRadius: 3
  },
  productDate: {
    //paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2
  },
  productDescription: {
    paddingTop: theme.SIZES.BASE
    // paddingBottom: theme.SIZES.BASE * 2,
  }
});

export default Trip;
