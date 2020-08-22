import React, {useContext, useState} from 'react';
import {View, StyleSheet, Text,TouchableOpacity, Alert,ScrollView} from 'react-native'
import {Row, Rows, Table, Cell, TableWrapper} from "react-native-table-component";
import DropDownForm from "../components/DropDownForm";
import {data} from "react-native-chart-kit/data";
import {Menu, Portal, Provider, Modal} from "react-native-paper";
import { AntDesign } from '@expo/vector-icons';
import DateForm from "../components/DateForm";
import {Context as FinancialContext} from "../context/FinancialContext";
import {navigate} from "../navigationRef";
import {Context as UserContext} from "../context/UserContext";
import { Context as CategoryContext } from "../context/CategoryContext";
import { Context as requestContext } from "../context/requestContext";


const TransactionScreen = ()=>{
    const userState = useContext(UserContext).state;
    const {requestsByCategory} = useContext(requestContext);
    const {getLastDigitsCreditCard, makeTransaction} = useContext(FinancialContext);

    const {getAllCategory,getRequestsByConfirmationStatus} = useContext(CategoryContext);

    const [requestsStatus,setRequestsStatus] = useState('All');
    const [categories,setCategories] = useState([]/*'All'*/);
    const [openDay,setOpenDay] = useState('');
    const [closeDay,setCloseDay] = useState('');
    const [visible,setVisible] = useState( false );
    const [lastDigits, setLastDigits ] = useState('');

    if (!lastDigits) {
        getLastDigitsCreditCard(userState.id).then(data => setLastDigits(data));
    }


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





    const approveTableData = {
        tableHead: ['Open Date','Close Date','Description', 'Category', 'Cost', 'Necessity', 'Make a Transaction'
        ],
        tableData: [
            ['8/8/19','10/8/19','1', '2', '3', '4','5'],
            ['8/8/19','10/8/19','a', 'b', 'c', 'd','e'],
            ['8/8/19','10/8/19','1', '2', '3', '789','10'],
            ['8/8/19','10/8/19','a', 'b', 'c', 'd','s']
        ]
    };



    const tableData = {
        tableHead: ['Open Date','Close Date','Description', 'Category', 'Cost', 'Necessity', 'Approval Status'
        ],
        tableData: [
            ['8/8/19','10/8/19','1', '2', '3', '4','5f3d48d1ba9e753ae8b1c012'],
            ['8/8/19','10/8/19','a', 'b', 'c', 'd','e'],
            ['8/8/19','10/8/19','1', '2', '3', '789','10'],
            ['8/8/19','10/8/19','a', 'b', 'c', 'd','s']
        ]
    };

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
                { text: 'OK', onPress: () => makeTransaction(userState.id, data) }
            ],
            { cancelable: false }
        );
    };

    const element = (data, index) => (
            <TouchableOpacity onPress={() => alertIndex(data)}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>Buy</Text>
                </View>
            </TouchableOpacity>
        );




        return(
        <Provider>
            <Portal>
            <View style={styles.container}>
        <Text style={styles.header}>Transactions</Text>
                <View style={styles.tableContainer}>
                    <Text style={styles.tableTitle}>Requests that Approved</Text>
                    <Text style={styles.tableTitle}>You Can Buy It Now</Text>
                    <Table borderStyle={{borderWidth: 2, borderColor: '#2F4730'}}>
                        <Row data={tableData.tableHead} style={styles.tableHead} textStyle={styles.tableHeadText}/>
                        {
                            tableData.tableData.map((rowData, index) => (
                                <TableWrapper key={index} style={styles.row}>
                                    {
                                        rowData.map((cellData, cellIndex) => (
                                            <Cell key={cellIndex} data={cellIndex === 6 ? element(cellData, index) : cellData} textStyle={styles.tableText}/>
                                        ))
                                    }
                                </TableWrapper>
                            ))
                        }
                    </Table>
                </View>

            <View style={styles.tableContainer}>
                <Text style={styles.tableTitle}>Requests In Process</Text>
                <Table borderStyle={{borderWidth: 2, borderColor: '#2F4730'}}>
                    <Row data={tableData.tableHead} style={styles.tableHead} textStyle={styles.tableHeadText}/>
                    <Rows data={tableData.tableData} textStyle={styles.tableText}/>
                </Table>
            </View>


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
        backgroundColor:'#E9D2B3',
        borderColor:'#E9D2B3',
        borderWidth: 2
    },
    header:{
        color: "black",
        textAlign: 'center',
        fontSize:30,
        textShadowRadius: 20,
        fontWeight: "bold",
        marginBottom:0,

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
