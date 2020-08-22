import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet, TouchableOpacity, Alert,View} from 'react-native'
import {Context as FinancialContext} from "../context/FinancialContext";
import {Context as RequestContext} from '../context/requestContext'
import {Context as UserContext} from '../context/UserContext'
import { Container, Header, Content,  ListItem, Text, Separator } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import {navigate} from "../navigationRef";
import { Context as CategoryContext } from "../context/CategoryContext";

const TransactionScreen = ({navigation})=>{

const TransactionScreen = ()=>{
    const userState = useContext(UserContext).state;

    const {state, getAllRequests} = useContext(RequestContext);
    const {getLastDigitsCreditCard, makeTransaction} = useContext(FinancialContext);

    const [lastDigits, setLastDigits ] = useState('');
    const {getAllCategory,getRequestsByConfirmationStatus} = useContext(CategoryContext);

    useEffect(() => {
        getAllRequests(user_state.myUser.walletMember ? 0 : 1, user_state.myUser.email)
        getAllRequests(user_state.myUser.walletMember ? 0 : 1, user_state.myUser.email)
    }, []);
    const [requestsStatus,setRequestsStatus] = useState('All');
    const [categories,setCategories] = useState([]/*'All'*/);
    const [openDay,setOpenDay] = useState('');
    const [closeDay,setCloseDay] = useState('');
    const [visible,setVisible] = useState( false );
    const [lastDigits, setLastDigits ] = useState('');

    if (!lastDigits) {
        getLastDigitsCreditCard(userState.id).then(data => setLastDigits(data));
    }
    let closedReqs = []
    let closedReqsJSX = []
    let reqToBuy = []
    let reqToBuyJSX = []


    if (!categories.length) {
        getAllCategory().then(function(data){
            data.forEach(c =>  c.value= c.category);
            setCategories(data);
        } );
    }


    const requestsStatusState = [
        {value: 'Pending Approval'},
        {value: 'Approved'},
        {value: 'Unapproved'},
        {value: 'All'}
    ];

    const splitRequests = () => {
        console.log("state " + JSON.stringify(state.allRequests))
        if (state.allRequests) {
            for (let req of state.allRequests)
            {
                console.log("req " + JSON.stringify(req))
                if (req.confirmationStatus) {
                    if (req.closedDate != null)
                    {
                        reqToBuy.push(req)
                    }
                else
                    {
                        closedReqs.push(req)
                    }
                }
            }
            for (let com of reqToBuy) {
                reqToBuyJSX.push(
                    <ListItem>
                             <Text>
                                {new Date(com.openDate).toDateString()} - {com.description} - {com.cost}
                            </Text>
                        {element(com)}
                    </ListItem>
                )
            }
            for (let close of closedReqs) {
                closedReqsJSX.push(
                    <ListItem>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('FullR', {"req": close}) //need to change!!!
                        }}>
                            <Text>
                                {new Date(close.openDate).toDateString()} - {close.description} - {close.cost}
                            </Text>
                        </TouchableOpacity>
                    </ListItem>
                )
            }
        }
    }

    const categoriesState = [
        {value: 'Toiletries'},
        {value: 'Attractions'},
        {value: 'Appliances'},
        {value: 'Food'},
        {value: 'Clothing'},
        {value: 'All'}
    ];
   /* const categoriesS={
        email: userState.myUser.email,
        category:categories
    }*/

    splitRequests()



if (!lastDigits) {
    getLastDigitsCreditCard(user_state.id).then(data => setLastDigits(data));
}


    const alertIndex =(data)=> {
        if(!lastDigits) {
            Alert.alert("There is no credit card to charge", "Please add your credit card" );
            return;
        }

        Alert.alert(
            'Buy',
            'Are you sure that you want to load your prepaid card that ends in '+lastDigits+'?',
            [
                {
                    text: 'Cancel',
                    onPress: () => undefined,
                    style: 'cancel'
                },
                { text: 'OK', onPress: () => makeTransaction(user_state.id, data) }
            ],
            { cancelable: false }
        );
    };

    const element = (data) => (
            <TouchableOpacity onPress={() => alertIndex(data)}>
                <FontAwesome5 name="money-check-alt" size={24} color="black"/>

            </TouchableOpacity>
        );




        return(
            <Container style={styles.container}>
                <Content>
                    <Separator bordered>
                <Text style={styles.title}>Request You Can Realize Now</Text>
                 </Separator>
            {reqToBuyJSX}
                    <Separator bordered>
                <Text style={styles.title}>Closed Requests</Text>
                    </Separator>
            {closedReqsJSX}
        </Content>
    </Container>



        <View style={styles.tableContainer}>
            <Text style={styles.tableTitle}>All Requests</Text>
           <DropDownForm
                data={requestsStatusState}
                title={"Filter Requests By Status"}
                onSubmit={setRequestsStatus}
                onPress={()=>{getRequestsByConfirmationStatus(userState.myUser.type,requestsStatus,userState.myUser.email)}}
            />
            <DropDownForm
                data={/*categoriesS categoriesState*/categories}
                title={"Filter Requests By Category"}
                onSubmit={setCategories}
                onPress={()=>{requestsByCategory(categories)}}

            />
            <View style={{flexDirection:'row'}}>
                <Text>Filter Requests By {'/n'} Open Date</Text>
                <Text>Filter Requests By Close Date</Text>
            </View>
            <View style={{flexDirection:'row', padding:10,justifyContent: 'center', marginRight:5}}>
            <DateForm
                data={openDay}
                onSubmit={setOpenDay}
            />

            <DateForm
                data={closeDay}
                onSubmit={setCloseDay}

            />
            </View>
            <Modal
                visible={visible}
                onDismiss={()=>setVisible(false)}
                contentContainerStyle={styles.container}
            >
            <Table borderStyle={{borderWidth: 2, borderColor: '#2F4730'}}>
                <Row data={tableData.tableHead} style={styles.tableHead} textStyle={styles.tableHeadText}/>
                <Rows data={tableData.tableData} textStyle={styles.tableText}/>
            </Table>

            </Modal>
            <TouchableOpacity onPress={()=>{setVisible(true)}}>
                <View style={{alignItems:'center'}}>
                    <AntDesign name="download" size={24} color="black" />
                <Text>Bring It On</Text>
                </View>
            </TouchableOpacity>

        </View>
        </View>
            </Portal>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,

        borderWidth: 2
    },
    title:{
        color: "black",
        textAlign: 'center',
        fontSize:15,
        fontWeight: "bold",
        marginBottom:0,
        alignItems:'center',

    },
    tableTitle:{ fontWeight: "bold", textAlign: 'center', fontSize: 18, textDecorationLine: 'underline'},
    tableContainer: { padding: 4,  backgroundColor: '#E9D2B3' },
    tableHead: { justifyContent: 'center',height: 42, backgroundColor: '#80B28B' },
    tableText: {  fontSize:12, textAlign: 'center' },
    tableHeadText: {  fontSize:9, textAlign: 'center',fontWeight: "bold"},

      row: { flexDirection: 'row', backgroundColor: '#E9D2B3', borderColor: '#2F4730' },
    btn: { width: 47, height: 17, backgroundColor: '#2F4730',  borderRadius: 0, borderColor:"#E9D2B3", borderWidth:0.5 },
    btnText: { textAlign: 'center', color: '#fff' }


});

export default TransactionScreen;
