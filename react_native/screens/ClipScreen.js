import React from 'react'
import {useSelector} from "react-redux"
import {StyleSheet, SafeAreaView, Text, FlatList } from 'react-native';
import ItemList from '../components/ItemList';

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default ClipScreen = ({navigation}) => {
    const user = useSelector(state => state.user);
    const {clips} = user;

    return (
        <SafeAreaView style = {styles.container }>
            <FlatList data = {user.clips} renderItem = {({item}) => (
                <ItemList
                image = {item.urlToImage}
                title = {item.title}
                author = {item.author}
                publishedAt = {item.publishedAt}
                click = {() => navigation.navigate('Article', {article: item})}
              />
              )}
              keyExtractor={( item, index) => index.toString()}
            />
        </SafeAreaView>
    )
}
