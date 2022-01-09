import React, {useState, useEffect, useRef} from 'react';
import {Button, StyleSheet, FlatList, SafeAreaView, RefreshControl, View} from 'react-native';
import ItemList from '../components/ItemList';
import Loading from '../components/Loading';
import Constants from 'expo-constants';
import axios from 'axios';

arsenal = 'アーセナル'
const URL = `https://newsapi.org/v2/everything?q=${arsenal}&sortBy=publishedAt&apiKey=${Constants.manifest.extra.newsApiKey}`


export default HomeScreen = ({navigation}) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const pageRef = useRef(1)
  const fetchedAllRef = useRef(false)
  
  useEffect(() => {
    setLoading(true)
    fetchArticles();
    setLoading(false)
  }, []);

  const fetchArticles = async (page) => {
  const URL = `https://newsapi.org/v2/everything?q=${arsenal}&sortBy=publishedAt&apiKey=${Constants.manifest.extra.newsApiKey}`
    try {
      const response = await axios.get(`${URL}&page=${page}`);
      if ( response.data.articles.length > 0){
      setArticles(prevArticles => [...prevArticles, ...response.data.articles]);
      } else {
        fetchedAllRef.current = true;
      }
    } catch (error) {
      console.error(error)
    }
  }


  const onEndReached = () => {
    if ( !fetchedAllRef.current){
      pageRef.current = pageRef.current + 1
      fetchArticles(pageRef.current)
    }
  }


  const onRefresh = async() => {
    setRefreshing(true)
    setArticles([])
    pageRef.current = 1
    fetchedAllRef.current = false
    await fetchArticles(1)
    setRefreshing(false)
  }


  const onPressJP = () => {
    arsenal = 'アーセナル'
    const URL = `https://newsapi.org/v2/everything?q=${arsenal}&sortBy=publishedAt&apiKey=${Constants.manifest.extra.newsApiKey}`
    pageRef.current = 1
    const jp = async (page) => {
      setLoading(true)
      try {
        const response = await axios.get(`${URL}&page=1`);
        setArticles(response.data.articles)
      } catch (error) {
        console.error(error)
      }
      setLoading(false)
  }
  jp()
  setRefreshing(true)
  setArticles([])
  pageRef.current = 1
  fetchedAllRef.current = false
  setRefreshing(false)
  }

  const onPressOversees = () => {
    arsenal = 'arsenal'
    const URL = `https://newsapi.org/v2/everything?q=${arsenal}&sortBy=publishedAt&apiKey=${Constants.manifest.extra.newsApiKey}`
    pageRef.current = 1
    const ovs = async (page) => {
      setLoading(true)
      try {
        const response = await axios.get(`${URL}&page=1`);
        setArticles(response.data.articles)
      } catch (error) {
        console.error(error)
      }
      setLoading(false)
  }
  ovs()
  setRefreshing(true)
  setArticles([])
  pageRef.current = 1
  fetchedAllRef.current = false
  setRefreshing(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonAll}>
      <View style={styles.button}>
      <Button
        onPress={onPressJP}
        title="日本"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      </View>
      <View style={styles.button}>
      <Button
        onPress={onPressOversees}
        title="Overseas"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      </View>
      </View>
      {loading && <Loading />}
      <FlatList
        data = {articles}
        renderItem = {({ item }) => ( 
        <ItemList title
          image = {item.urlToImage}
          title = {item.title}
          author = {item.author}
          publishedAt = {item.publishedAt}
          click = {() => navigation.navigate('Article', {article: item})}
        />
        )}
        keyExtractor= {(item, index) => index.toString()}
        onEndReached = {onEndReached}
        refreshControl = {
          <RefreshControl refreshing = { refreshing } onRefresh = { onRefresh }/>
        }
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  itemContainer: {
    height: 100,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
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
  filter: {
    paddingTop: 15,
    paddingBottom: 10,
  },
  buttonAll:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 5,
  },
  button:{
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: "lightgray",
    shadowColor: "black",
    shadowOffset: {
      height: 2,
      width: 2 
    },
    shadowRadius: 2,
    shadowOpacity: 0.8,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    justifyContent: 'center',
  },
});