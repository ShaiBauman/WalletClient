import React, { useState, useRef } from 'react';
import {Text, View, Alert, StyleSheet, TouchableOpacity} from 'react-native';
import {
    Button,
    Paragraph,
    Dialog,
    Portal,
    Provider,
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
            <Provider>
                <View>
                    <TouchableOpacity onPress={() => setIsDialogVisible(true)}><Text style={styles.button}>{title}</Text></TouchableOpacity>
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
                </View>
            </Provider>
        );
    };

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        padding: 10,
        borderColor: '#2F4730',
        borderWidth: 3,
        flex: 1,
        backgroundColor: '#80B28B',
        marginRight: 10,
        marginLeft:10,
        marginBottom:10,
        borderRadius: 8,
        fontSize: 15,
        fontWeight: 'bold',
        overflow: 'hidden',
        textAlign: 'center'
    },
    inputStyle:{fontSize:16, borderBottomWidth:0.3,borderColor:'black', textAlignVertical: 'center'},

});

 export default DialogForm;
