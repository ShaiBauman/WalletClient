import React, { useContext, useEffect, useState } from 'react';
import { Text,View, StyleSheet, ScrollView ,TouchableOpacity} from 'react-native'
import { Input,Button} from 'react-native-elements'
import Spacer from "../components/Spacer";
import DropDownForm from "../components/DropDownForm";
import { Context as requestContext } from "../context/requestContext";
import { Context as CategoryContext } from "../context/CategoryContext";
import { Context as UserContext } from "../context/UserContext";

import { data } from "react-native-chart-kit/data";


const PurchaseScreen = ({navigation})=>{
    const userState = useContext(UserContext).state;

    const req = navigation.getParam('req');

    const {addReq} = useContext(requestContext);
    const {getAllCategory} = useContext(CategoryContext);

    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);

useEffect(()=>{
  //  if (!categories.length) {
        let temp ={};
        getAllCategory().then(function(data){
            data.forEach(c =>  c.value= c.category);
            for(let i =0 ;i<data.length;i++){
                     data[i].subCategory.forEach(c =>  c.value= c.name);
                     temp[data[i].category] = data[i].subCategory;
            }
            setSubcategories(temp);
            setCategories(data);
        } );
},[])


    let arr1 = [];
    let arr2= [];

    let necessaryMeasureState =[{value: "Not Necessary"},{value: "Little"},{value: "Medium"},
        {value:"Very Necessary"}];
    let necessaryMeasureStateEnum ={"Not Necessary":1,"Little":2,"Medium":3,"Very Necessary":4};

    const friendConfirmation = [];
    const emails = userState.myUser.myWalletMembers;

        for(let i=0;i<emails.length;i ++){
            friendConfirmation.push({
                "email":emails[i],
                "confirm":false
            })
        }


    const [category,setCategory]=useState('');
    const [subCategory,setSubCategory]=useState('');
    const [necessaryMeasure,setNecessaryMeasure]=useState('');
    const [description,setDescription]=useState(req?req.description:'');
    const [price,setPrice]=useState(req?req.price:'');
    const [remark,setRemark]=useState(req?req.additionalDescription:'');

    const funcPicture = ()=>{
        console.log("func picture");
    };

    arr1.push(<Text style={styles.textStyle}>Category</Text>)
    arr1.push(<DropDownForm
        data={categories}
        title={"Category"}
        onSubmit={setCategory}
    />)
    arr1.push(<Text style={styles.textStyle}>subCategory</Text>)
    arr1.push(<DropDownForm
        data={subcategories[category] || []}
        title={"subCategory"}
        onSubmit={setSubCategory}
    />)
    arr2.push(<Text style={styles.textStyle}>Describe your product</Text>)
    arr2.push(<Input
        value={description}
        onChangeText={setDescription}
        style={styles.inputStyle}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Description"
    />)
    arr1.push(<Text style={styles.textStyle}>How much it costs?</Text>)
    arr1.push(<Input
        value={price}
        onChangeText={setPrice}
        style={styles.inputStyle}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Price"
        keyboardType = 'numeric'

    />)
    arr1.push(<Text style={styles.textStyle}>Necessity</Text>)
    arr1.push(<DropDownForm
        data={necessaryMeasureState}
        title={"Necessity"}
        onSubmit={setNecessaryMeasure}
    />)
    arr2.push(    <Text style={styles.textStyle}>Additional text</Text>)
    arr2.push(<Input
        // label={"Remarks"}
        value={remark}
        onChangeText={setRemark}
        style={styles.inputStyle}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Remarks"

    />)

    return(
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.titleText}>New Request</Text>
                {!req?arr1:null}
                {arr2}

            <TouchableOpacity
                onPress={()=>{
                    const requestDto = {
                        email: userState.myUser.email,
                        openDate: null,
                        closedDate:"",
                        category: category,
                        subCategory:subCategory,
                        cost: price,
                        description: description,
                        necessity: necessaryMeasureStateEnum[necessaryMeasure],
                        additionalDescription: remark,
                        pic: "",
                        friendsConfirmation: friendConfirmation,
                        confirmationStatus: false,// open ,approved, inProcess;
                        botScore:30
                    }
                    addReq(requestDto)
                }}
            >

                <Text style={styles.button}>{"Send"}</Text>
            </TouchableOpacity>
            </ScrollView>
            </View>
    );
};
/*
PurchaseScreen.navigationOption=()=>{
    return {
        header: null
    };
};*/

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        backgroundColor:"#E9D2B3",
        padding:8,
    },
    titleText:{
        textAlign: 'center',
        color:'#80B28B',
        fontWeight: "bold",
        fontSize:40,
        margin:10,
        textShadowRadius:7,
        textShadowColor:'#2F4730'

    },
    inputStyle:{
        height: 40,
        //  backgroundColor: '#80B28B',
        // borderColor: '#80B28B',
        // borderWidth: 1,
        color:'#80B28B'
    },
    textStyle:{
        fontSize: 18,
        textAlign: 'center',
        color:'#2F4730',
        fontWeight:'bold'
    },
    fixToText:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    /* separator: {
         marginVertical: 8,
         borderBottomColor: '#737373',
         borderBottomWidth: StyleSheet.hairlineWidth,
     },*/
    Button:{
        alignItems: "center",
        padding: 10,
        borderColor: '#2F4730',
        borderWidth:4,
        flex:1,
        borderRadius:8,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign:'center',
        backgroundColor:'#CEB386',
        marginLeft: 10,
        marginRight:10


    },
    button: {
        alignItems: "center",
        padding: 8,
        borderColor: '#2F4730',
        borderWidth:3,
        flex:1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingVertical:15,
      //  paddingLeft:15,
        backgroundColor:'#80B28B',
       // marginRight:10,
        borderRadius:8,
        fontSize: 20,
        fontWeight: 'bold',
        overflow: 'hidden',
        textAlign:'center',
        textShadowColor:'#FFF',
        textShadowRadius:10,
    },
    buttonContainer: {
        flex: 1,
        marginLeft:10,
        marginRight:10,
        //flexDirection: 'row',
        justifyContent: 'center',
      // alignItems: 'center',
      //  backgroundColor: '#CEB386'
    },
});

export default PurchaseScreen;


