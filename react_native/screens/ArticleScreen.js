import React from 'react'
import {Alert, Linking, StyleSheet, SafeAreaView, Button, Text, TouchableOpacity, Share, View } from 'react-native';
import {WebView} from "react-native-webview";
import {useDispatch, useSelector} from "react-redux";
import {addClip, deleteClip} from "../store/actions/user";
import ClipButton from "../components/ClipButton"
import Loading from '../components/Loading';
import { applyMiddleware } from 'redux';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    button: {
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    share: {
            backgroundColor: "lightgray",
            shadowColor: "black",
            shadowOffset: {
              height: 2,
              width: 2 
            },
            shadowRadius: 2,
            shadowOpacity: 0.8,
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 10,
            justifyContent: 'center'
    }
});

export default ArticleScreen = ({route}) => {
    const {article} = route.params;
    const dispatch = useDispatch()
    const user = useSelector(state => state.user);
    const {clips} = user;

    const isClipped = () => {
        return clips.some(clip => clip.url === article.url)
    }

    const toggleClip = () => {
        if(isClipped()){
            dispatch(deleteClip({clip: article}))
        }else{
            dispatch(addClip({clip: article}))
        }
    }

    const openShare = () => {
        Share.share({
          title: article.title,
          url: article.url
        }, {}).then((result, activityType) => {
          if(result.action == Share.dismissedAction) {
            // シェアを中断した場合の処理(iOSのみ)
          } else if(result.action == Share.sharedAction) {
            // シェアを実行した場合(Androidの場合は常にここの処理が実行される)
          } else {
     
          }
        });
      }
    

    const openUrl = async (url) => {
    const supported = await Linking.canOpenURL(article.url);
    if (supported) {
        await Linking.openURL(article.url);
    } else {
        Alert.alert(
        "エラー",
        "このページを開ませんでした",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
        );
    }
    }

    return (
        <SafeAreaView style = {styles.container } >
            <View  style = {styles.button }>
                <TouchableOpacity style = {{ justifyContent: 'center'}} onPress={openUrl}>
                    <MaterialCommunityIcons name="web" size={40} color="gray" />
                </TouchableOpacity>
                <View style = {styles.share }>
                <Button onPress={openShare} title={'シェアする'} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }} >
                <ClipButton style = {styles.clip} click = {toggleClip} enabled = {isClipped()}/>
                </View>
            </View>
            <WebView source = {{ uri: article.url }} startInLoadingState = {true} renderLoading= {() => <Loading /> }/>
        </SafeAreaView>
    )
}
