import { View, Text, StyleSheet } from 'react-native'
import React,{ useState, useEffect } from 'react'
import ImagesList from "../components/ImagesList";
import { Input, Button } from "react-native-elements";
import { getImages } from "../services/images";


export default function Home({ openSearch }) {
  const [searchWord, setSearchWord] = useState("");
  const [photos, setPhotos] = useState([]);
  const [totalResults, setTotalResults] = useState(0);

  const loadImages = async (searchWord) => {
    const res = await getImages(searchWord);
    setPhotos(res.data.photos);
    setTotalResults(res.data.total_results);
  };

  useEffect(() => {
    loadImages();
  }, []);
  const handleSearch = async () => await loadImages(searchWord)
  return (
    <>
      {openSearch && (
        <View style={styles.searchSection}>
          <Input
            placeholder="Search a Term"
            placeholderTextColor={"#ffff"}
            style={styles.input}
            leftIcon={{ type: "feather", name: "search", color: "#fff" }}
            onChangeText={(value) => setSearchWord(value)}
            inputContainerStyle={styles.searchInput}
            leftIconContainerStyle={styles.searchLeftIcon}
          />
          <Button
            title="Search"
            buttonStyle={styles.buttonSearch}
            onPress={() => handleSearch()}
          />
        </View>
      )}
      <View style={styles.container}>
        {totalResults > 0 && (<Text style={styles.totalResulText}>{totalResults} resultados</Text>)}
        <ImagesList photos={photos} />
      </View>
    </>
  )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    alignItems: "center",
    justifyContent: "center",
  },
  totalResulText: { color: "#d17c04", textAlign: "right", width: "100%", paddingTop:30 },
  searchSection: {
    backgroundColor: "#0D0D0D",
    width: "100%",
    paddingRight: 80,
    paddingLeft: 10,
    flex: 1 / 5,
    flexDirection: "row",
    alignItems: "center",
    
  },
  searchInput: {
    backgroundColor: "#d17c04",
    borderBottomWidth: 0,
    paddingHorizontal: 4,
  },
  input: {
    color: "#ffff",
  },
  searchLeftIcon: {
    paddingStart: 10,
    marginRight: 7,
  },
  buttonSearch: { backgroundColor: "#d17c04", marginBottom: 27,borderRadius:8 },
});