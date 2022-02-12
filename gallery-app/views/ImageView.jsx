import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from "react";
import ImageList from "../components/ImagesList";
import { Avatar, Button } from "react-native-elements";
import * as WebBrowser from "expo-web-browser";
import { getImages } from "../services/images";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";


export default function ImageView({route}) {
  const { image } = route.params;
  const [images, setImages] = useState([]);

  const loadImages = async () => {
    const res = await getImages();
    setImages(res.data.photos);
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handlePress = async () =>
    await WebBrowser.openBrowserAsync(image.photographer_url);

  const saveFile = async (fileUri) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync("Download", asset, false);
    }
  };

  const downloadFile = async () => {
    let fileUri = FileSystem.documentDirectory + image.id + ".jpeg";

    try {
      const { uri } = await FileSystem.downloadAsync(
        image.src.large2x,
        fileUri
      );
      saveFile(uri);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = async () => {
    downloadFile();
  };
  return (
    <View>
      <Image source={{uri:image.src.large2x, height: 350}}/>
      <View style={{
          paddingVertical: 15,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          backgroundColor:'#0D0D0D'
        }
        }>
        <View style={{ display: "flex", flexDirection: "row", alignItems:"center" }}
        >
          <Avatar rounded
            title={image.photographer
              .split(" ")
              .map((string) => string[0])
              .join("")
              .toUpperCase()}
            containerStyle={{ backgroundColor:"#d17c04"  }}
            />
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.textPhotographer}>{image.photographer}</Text>
          </TouchableOpacity>
        </View>
        <Button title="Download" buttonStyle={styles.button} onPress={() => handleDownload()}/>
      </View>
      <View>
        <ImageList photos={images} />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  headerPhotographer: {
    backgroundColor: "#0D0D0D",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
  },
  textPhotographer: {
    fontSize: 18,
    padding:7,
    color: "#fff",
    fontWeight: "bold",
  },
  cardImageText: {
    color: "#fff",
  },
  button: { backgroundColor: "#d17c04",borderRadius:8}
});
