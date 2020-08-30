import React, { useState, useRef } from 'react';
import {Text, View, Alert, StyleSheet, TouchableOpacity} from 'react-native';
import {
    Button,
    Paragraph,
    Dialog,
    Portal,
    Provider,
    Modal,
    TextInput,
} from 'react-native-paper';

const DialogForm = ({title, setFunc, myList})=> {

        const [isDialogVisible, setIsDialogVisible] = useState(false);
        const [val1, setVal1] = useState('');
        const [val2, setVal2] = useState('');
        const [flag, setFlag] = useState(false);

        const list = myList;
    const AddItem = (val1, val2, setFunc) =>{
        const item = {"name": val1, "value": val2};
        list.push(item);
        setFunc(list);
        setVal1('');
        setVal2('')
        setIsDialogVisible(false);
    }


        return (

                <View>
                    <Provider>
                        <Portal>


                        <Dialog
                            visible={isDialogVisible}
                            onDismiss={() => setIsDialogVisible(false)}>
                            <Dialog.Title>{title}</Dialog.Title>
                            <Dialog.Content>
                                <TextInput
                                    value={val1}
                                    onChangeText={text => setVal1(text)}
                                    autoCorrect={false}
                                    placeholder={"title"}
                                    style={styles.inputStyle}
                                    placeholderTextColor={"#2F4730"}
                                    contextMenuHidden={true}
                                />
                                <TextInput
                                    value={val2}
                                    onChangeText={text => {setVal2(text)}}
                                    autoCorrect={false}
                                    placeholder={"price"}
                                    style={styles.inputStyle}
                                    placeholderTextColor={"#2F4730"}
                                    contextMenuHidden={true}
                               />
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={() => AddItem(val1, val2, setFunc)}>Done</Button>
                            </Dialog.Actions>
                        </Dialog>
                        </Portal>
                    </Provider>
                            <TouchableOpacity onPress={() => setIsDialogVisible(true)}>
                                <Text style={styles.button}>{title}</Text>
                            </TouchableOpacity>

                </View>

        );
    };

const styles = StyleSheet.create({

        button: {
            textAlign: "center",
            padding: 10,
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingVertical:18,
            paddingLeft:18,
            backgroundColor:'#80B28B',
            marginRight:12,
            fontSize: 15,
            fontWeight: 'bold',
            overflow: 'hidden',
            color:'#2F4730',
            margin:10

        },
    inputStyle:{fontSize:16, borderBottomWidth:0.3,borderColor:'black', textAlignVertical: 'center'},

});

 export default DialogForm;
