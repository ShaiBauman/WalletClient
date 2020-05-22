import DialogInput from 'react-native-dialog-input';
import React from "react";

const DialogForm = (onSubmit, title,message)=> {

    const onPress = () =>{


    };

    return(
        <DialogInput isDialogVisible={this.state.isDialogVisible}
                     title={"DialogInput 1"}
                     message={"Message for DialogInput #1"}
                     hintInput ={"HINT INPUT"}
                     submitInput={ (inputText) => {this.sendInput(inputText)} }
                     closeDialog={ () => {this.showDialog(false)}}>
        </DialogInput>
    );
};

export default DialogForm;
