import React from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity, SafeAreaView, Button} from 'react-native';



const GroupButtonForm = (buttonList)=>{

     return (
         <View style={styles.buttonContainer}>
            <FlatList
                horizontal={true}
                data={buttonList}
                keyExtractor={(item)=> item.id}
                renderItem={({item})=>{
                    return (
                        <TouchableOpacity
                            onPress={()=>item.func()}
                        >
                          <Text style={styles.button}>{"A"}</Text>
                        </TouchableOpacity>
                    )}}
                />
         </View>
        );


    };


const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    content:{
        fontSize: 22
    },
    button: {
        alignItems: "center",
        backgroundColor: "#2F4730",
        padding: 20,
        borderColor: 'black',
        borderWidth:1,
        flex:10,
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
});

export default GroupButtonForm;

/*
      <TouchableOpacity
                            onPress={item.func}>
                            <Text>{item.title}</Text>
                         </TouchableOpacity>
* */


/*   type={title}
                        backgroundColor={"#1abc9c"}
                        borderColor={"#16a085"}
                        borderRadius={10}
                        shadowHeight={5}
                        containerStyle={styles.buttonContainer}
                        contentStyle={styles.content}*/

/**/


/*
*  <FlatList
                horizontal={true}
                data={buttonList}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(b)=>b.id}
                renderItem={({item})=>{
                    return(
                        <TouchableOpacity
                            onPress={item.func}>
                            <Text>{item.title}</Text>
                        </TouchableOpacity>
                  )}}
            />*/


/*
*    <FlatList
                horizontal={true}
                keyExtractor = {(item) => item}
                data={buttonList}
                renderItem={({button})=>{
                    return(
                        <TouchableOpacity
                            style={styles.button}
                            onPress={button.func}
                        >
                            <Text>{button.title}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
* */
