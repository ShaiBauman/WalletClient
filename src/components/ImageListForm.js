import React from "react";
import {Text, FlatList, SafeAreaView} from "react-native";
import { Tile } from 'react-native-elements';

const ImageListForm = (userList, getImageById) =>{

    const chooseImage=(item)=>{
     if(item.id!=='')
         return getImageById(item.id)
        else
            return '../../assets/profile-picture-illustration.jpg';

    };

    return(

        <SafeAreaView>
            {!(userList.isEmpty)?
        <FlatList
            horizontal={true}
            initialNumToRender={userList.length}
            data={userList}
            renderItem={
                userList.map((i) => (
                    <Tile
                        imageSrc={require('../../assets/profile-picture-illustration.jpg')}
                        title={i.firstName+''+ i.lastName}
                        contentContainerStyle={{ height: 70 }}
                    />
                ))
            }
         />
         : null}
        </SafeAreaView>

    );
};

export default ImageListForm;
