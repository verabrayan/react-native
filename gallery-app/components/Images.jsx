import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Images = ({ image }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ImageView", { image })}
      style={styles.cardImage}
    >
      <Image
        source={{
          uri: image.src.portrait
            ? image.src.portrait
            : "https://www.proteja.com.co/globalassets/arne---dont-use/pictures/no-image.png?v=491b93",
        }}
        style={styles.Image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardImage: {
    display: "flex",
    width: "49%",
    margin: 5,
    justifyContent: "space-between",
    backgroundColor: "#2C292C",
    borderWidth: 0,
    borderRadius: 10,
  },
  Image:{ height: 180, width: "100%", borderRadius: 10 }
});

export default Images;