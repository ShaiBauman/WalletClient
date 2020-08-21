import React from 'react';
import { View, Button } from 'react-native'

const IndexScreen = ({navigation}) => {
    return (
        <View>
            <Button onPress={ () => navigation.navigate("Generator") } title="Activate Wally!" />
        </View>
    )
}

export default IndexScreen;