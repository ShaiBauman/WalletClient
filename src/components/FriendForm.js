import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image,
    Alert,
    ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


const FriendForm = ({friend})=>{

    const onClickListener = (viewId) => {
        // need to complete !!!
        Alert.alert("Alert", "Button pressed "+viewId);
    };

    return (

            <View style={styles.container}>
                <View style={styles.box}>
                    <Image style={styles.profileImage} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
                    <Text style={styles.name}>{friend.firstName=friend.lastName}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableHighlight style={[styles.button, styles.buttonMessage]} onPress={() => onClickListener('message')}>
                        <MaterialIcons name="mail-outline" size={24} color="black" />
                    </TouchableHighlight>
                    <TouchableHighlight style={[styles.button, styles.buttonLike]} onPress={() => onClickListener('like')}>
                        <MaterialIcons name="feedback" size={24} color="black" />
                    </TouchableHighlight>
                    <TouchableHighlight style={[styles.button, styles.buttonCall]} onPress={() => onClickListener('phone')}>
                        <FontAwesome5 name="phone" size={18} color="black" />
                    </TouchableHighlight>
                </View>
            </View>

    );
};

const styles = StyleSheet.create({
    scrollContainer:{
        flex: 1,
    },
    container:{
        padding:20,

    },
    box: {
        marginTop:5,
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: .2,
        shadowOffset: {
            height:2,
            width:-2
        },
        elevation:5,
        paddingTop:10,
        height:170,
        width:170,
        alignSelf: 'center'

    },
    profileImage:{
        width:100,
        height:100,
        marginBottom:10,
    },
    name:{
        fontSize:20,
        marginBottom:5,
        fontWeight: 'bold',
        color: 'black',
    },
    buttonContainer:{
        flexDirection:'row',
        marginTop:5,
        alignSelf:'center'
    },

    button: {
        width:45,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        borderRadius:30,
        margin:10,
        shadowColor: 'black',
        shadowOpacity: .8,
        shadowOffset: {
            height:2,
            width:-2
        },
        elevation:4,
    },
    buttonMessage: {
        backgroundColor: "#E9D2B3",
    },
    buttonLike: {
        backgroundColor: "#D76B49",
    },
    buttonLove: {
        backgroundColor: "#80B28B",
    },
    buttonCall: {
        backgroundColor: "#80B28B",
    },
    icon: {
        width:15,
        height:15,
    }
});

export default FriendForm;
