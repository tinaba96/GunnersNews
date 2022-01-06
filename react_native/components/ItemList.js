import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';


const styles = StyleSheet.create({
  itemContainer: {
    height: 80,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 0.5,
    flexDirection: 'row',
  },
  leftContainer: {
    backgroundColor: 'grey',
    width: 100,
  },
  rightContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  subData: {
    fontSize: 12,
    color: 'blue',
    textAlign: 'right',
  },
  subText: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'right',
  },
});


const ItemList = ({title, image, author, publishedAt, click}) => {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress = {click}>
        <View style={styles.leftContainer}>
          <Image
            style = {{ width : 100, height: 100}}
            source = {{uri: image }}
          />
        </View>
        <View style={styles.rightContainer}>
          <Text numberOfLines = {3}>
              {title}
          </Text>
          <Text style={styles.subText}>{author}</Text>
          <Text style={styles.subData}>{publishedAt}</Text>
        </View>
      </TouchableOpacity>
    )
}

export default ItemList
