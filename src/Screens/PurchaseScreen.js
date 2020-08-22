import React, { useContext, useState } from 'react';
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
    const {state, addReq, getRequestsByPass } = useContext(requestContext);
    const {getAllCategory} = useContext(CategoryContext);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
   // const {getAllSubCategory} = useContext(SubCategoryContext);


    if (!categories.length) {
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
    }



    //categories= getAllCategory().map(u => u.name);
    //console.log(categoryState.data);

    //    for(let i =0 ;i<categoryState.length;i++){
    //     if(categoryState[i].name== categoryState)
    //     subcategories=categoryState[i].subCategory;
    // }
    //
    // console.log(subcategoryState);
   /* let subCategoryState =[
        {value: "food"},{value: "attraction"}, {value:"Home appliance"},
        {value:"clothing"},{value:"housewares"},{value:"other"}];
*/
    let necessaryMeasureState =[{value: "NotNecessary"},{value: "littleNecessary"},{value: "midNecessary"},
        {value:"veryNecessary"}];
    let necessaryMeasureStateEnum ={"NotNecessary":1,"littleNecessary":2,"midNecessary":3,"veryNecessary":4};

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
    const [description,setDescription]=useState('');
    const [price,setPrice]=useState(0);
    const [remark,setRemark]=useState('');

    const funcPicture = ()=>{
        console.log("func picture");
    };


    return(
        <View style={styles.container}>
            <Spacer>
                <Text style={styles.titleText}>Sending a request</Text>
            </Spacer>
            <ScrollView>
                <Spacer>
                    <Text style={styles.textStyle}>Category</Text>
                <DropDownForm
                    data={categories}
                    title={"Category"}
                    onSubmit={setCategory}
                />
                </Spacer>

                <Spacer>
                    <Text style={styles.textStyle}>subCategory</Text>
                    <DropDownForm
                        data={subcategories[category] || []}
                        title={"subCategory"}
                        onSubmit={setSubCategory}
                    />
                </Spacer>


                <Spacer>
                    <Text style={styles.textStyle}>Describe your product</Text>
                <Input
                    value={description}
                    onChangeText={setDescription}
                    style={styles.inputStyle}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Description"
                />
                </Spacer>

                <Spacer>
                    <Text style={styles.textStyle}>How much it costs?</Text>
                <Input
                    //secureTextEntry={true}
                  //  label={"Price"}
                    value={price}
                    onChangeText={setPrice}
                    style={styles.inputStyle}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Price"
                    keyboardType = 'numeric'

                />
                </Spacer>

                <Spacer>
                    <Text style={styles.textStyle}>Necessity</Text>
                <DropDownForm
                    data={necessaryMeasureState}
                    title={"Necessity"}
                    onSubmit={setNecessaryMeasure}
                />
                </Spacer>

                <Spacer>
                    <Text style={styles.textStyle}>Additional text</Text>
                <Input
                   // label={"Remarks"}
                    value={remark}
                    onChangeText={setRemark}
                    style={styles.inputStyle}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Remarks"

                />
                </Spacer>

            <Spacer>

                <TouchableOpacity
                    onPress={funcPicture}
                >
                    <Text style={styles.Button}>
                        {"Insert Picture"}</Text>

                </TouchableOpacity>
            </Spacer>

                <Spacer>
                    <View style={styles.buttonContainer}>

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
                                navigation.navigate('dashboard');
                            }}
                        >

                            <Text style={styles.button}>{"Send"}</Text>
                        </TouchableOpacity>


                    </View>
                </Spacer>
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
        margin:10

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
        borderWidth:6,
        flex:1,
        borderRadius:8,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign:'center',
        backgroundColor:'#CEB386',


    },
    button: {
        alignItems: "center",
        padding: 10,
        borderColor: '#2F4730',
        borderWidth:3,
        flex:1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingVertical:18,
        paddingLeft:18,
        backgroundColor:'#80B28B',
        marginRight:12,
        borderRadius:8,
        fontSize: 17,
        fontWeight: 'bold',
        overflow: 'hidden',
        textAlign:'center'

    },
    buttonContainer: {
        flex: 1,
        marginLeft:20,
        marginRight:10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      //  backgroundColor: '#CEB386'
    },
});

export default PurchaseScreen;
