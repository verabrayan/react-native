import React, {useState} from "react";
import {Text, View, StyleSheet, Image,Alert,
   TouchableOpacity,Platform} from "react-native";
//import favicon from './assets/favicon.png'
import * as ImagePicker from 'expo-image-picker'
import * as Sharing from 'expo-sharing'
import uploadAnonymousFiles from "anonymous-files";



export default function App() {

  const [selectedImage, setSelectedImage] = useState(null);

  let openGalleryImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to photos is required");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    //console.log(pickerResult)

    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });

  }
  let openShareList = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      // alert("Sharing, is not available on your platform");
      alert(
        `The image share is available for sharing at: ${selectedImage.remoteUri}`
      );
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Pick an Image!!
      </Text>
      <TouchableOpacity onPress={openGalleryImage}>
        <Image style={styles.image}source={{uri:selectedImage !== null? selectedImage.localUri: "https://picsum.photos/200/200"}}></Image>
      </TouchableOpacity>
      {
        selectedImage?(
          <TouchableOpacity
            style={styles.button}
            onPress={openShareList}
          >
            <Text style={styles.buttonText}>Share This Image</Text>
          </TouchableOpacity>
          
        ):(
          <TouchableOpacity
            style={styles.button}
            onPress={openGalleryImage}
          >
            <Text style={styles.buttonText}>Select Your Image</Text>
          </TouchableOpacity>
        )
      }
      
    </View>
    
  )
}

const styles= StyleSheet.create({
  container:{flex:1, justifyContent: 'center',
  alignItems:'center',backgroundColor:"silver"},
  title:{fontSize:30},
  image:{height:180,width:180,borderRadius:90},
  button:{alignItems: "center",backgroundColor: "dodgerblue",
  padding: 7, marginTop: 10, borderRadius:5 },
  buttonText: { fontSize: 20, color: "#fff" }
})
//{uri:'https://picsum.photos/200/200'}