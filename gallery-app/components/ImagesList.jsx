import { View, Text,StyleSheet, FlatList } from 'react-native'
import React from 'react'
import Images from './Images'


export default function ImagesList({ photos }) {
    const renderItem = ({ item }) => <Images image={item} />;

    if (photos.length === 0) {
        return <Text>Loading</Text>;
    }
  
    return (
      <FlatList
        data={photos}
        renderItem={renderItem}
        keyExtractor={(item)=>item.id}
        numColumns={2}
      />
    );
};