import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native'
import { Cell, Row, Table, TableWrapper } from "react-native-table-component";
import {Menu, Portal, Provider, Modal} from "react-native-paper";
import {Context as UserContext} from "../context/UserContext";
import { MaterialIcons } from "@expo/vector-icons";
import Spacer from "../components/Spacer";
import { Foundation } from '@expo/vector-icons';
import MyMenu from "../components/MyMenu";
import { Ionicons } from '@expo/vector-icons';

const IndexFriendScreen = ({navigation})=>{
    const {state:{firstName,lastName}}=useContext(UserContext);

    const [requestsStatus,setRequestsStatus] = useState('All');
    const [friendName ,setFriendName] = useState('All');
    const [requestingName,setRequestingName] = useState('');
    const [MonthlyBalance,setMonthlyBalance] = useState('');

    const requestsStatusState = [
        {value: 'Pending Approval'},
        {value: 'Approved'},
        {value: 'Unapproved'},
        {value: 'All'}
    ];
    //  constructor(props) {
    //    super(props);
    const tableData = {
        tableHead: ['Status', 'Friend Name', 'requesting Name', 'Monthly Balance', ''],
        tableData: [
            ['1', '2', '3', '4','7'],
            ['a', 'b', 'c', 'd','6'],
            ['1', '2', '3', '4','3'],
            ['a', 'b','2', 'c', 'd']
]
    };


    const alertIndex=(index)=> {
        Alert.alert(`This is row ${index + 1}`);
    };

// render() {
// const state = this.state;
    const element = (data,index)=>(
        /*(data, index) => (*/

               <View >
                <TouchableOpacity style={styles.btn}/*onPress={() => alertIndex(index)}*/>
                   <Text style={styles.btnText}>Approval</Text>
                </TouchableOpacity>

                 <TouchableOpacity style={styles.btn} >
                     <Text style={styles.btnText}>Refusal</Text>
                 </TouchableOpacity>
               </View>

    );

return(
    <Provider>
        <Portal>
    <View style={styles.container}>




        <Text style={styles.titleText}>Hello {firstName} {lastName},</Text>
        <Text style={styles.subTitle}> Open Requests</Text>
        <Table borderStyle={{borderWidth: 2, borderColor: '#2F4730'}}>

            <Row data={tableData.tableHead} style={styles.head} textStyle={styles.text}/>
            {
                tableData.tableData.map((rowData, index) => (
                    <TableWrapper key={index} style={styles.row}>
                        {
                            rowData.map((cellData, cellIndex) => (
                                <Cell key={cellIndex} data={cellIndex === 4 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                            ))
                        }
                    </TableWrapper>
                ))
            }
        </Table>

        <Spacer>
            <TouchableOpacity style={styles.Button}
              //  onPress={}
            >
                <Text style={styles.ButText}>
                    {"Add a future approved purchase"}</Text>
            </TouchableOpacity>
        </Spacer>
        <Spacer>
            <Text style={styles.subTitle}> My relief segmentation</Text>
<View style={{ flexDirection: 'row',alignSelf:'center'}}>
            <TouchableOpacity style={styles.statistics}
                              onPress={()=>{navigation.navigate('assistanceStatistics')}}
            >
                <Foundation style={styles.graphIcon} name="graph-trend" />
                <Text style={styles.statisticTxt}>{"Statistics"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.statistics}
                            //  onPress={()=>{navigation.navigate('assistanceStatistics')}}
            >
                <Ionicons style={styles.graphIcon}name="md-done-all"  />
                <Text style={styles.statisticTxt}>{"Future Approved"}</Text>
            </TouchableOpacity>
</View>

        </Spacer>
    </View>
        </Portal>
    </Provider>
    );
};

const styles = StyleSheet.create({
    titleText:{textAlign: 'center',color:'#80B28B',fontWeight: 'bold',fontSize:40,margin:10,textShadowRadius:7,textShadowColor:'#2F4730'},
    subTitle:{fontWeight:'bold',color:'#2F4730',fontSize: 20,textAlign:'center', textDecorationLine: 'underline',padding: 5},
    container: { flex: 1, padding: 16, paddingTop: 15, backgroundColor: '#FFF' },
    head: { justifyContent: 'center',height: 42, backgroundColor: '#80B28B' },
    text: { fontSize:12, textAlign: 'center' ,margin: 2,fontWeight:'bold',color:'#2F4730' },
    row: { flexDirection: 'row', backgroundColor: '#E9D2B3'},
    btn: { margin: 2, flexDirection: 'column' ,width: 55, height: 16,borderRadius: 4,
        backgroundColor: '#80B28B', borderColor:"#2F4730", borderWidth:0.5},
    btnText: { textAlign: 'center', color: '#2F4730',fontWeight:'bold',fontSize:12},
    Button:{margin:5,alignItems: 'center', backgroundColor:'#80B28B',
        borderColor: '#2F4730', borderWidth:4,borderRadius:8},
    ButText:{color:'#2F4730',fontWeight: 'bold',fontSize: 16,textAlign:'center'},
    statistics:{margin:15,paddingTop:35,alignSelf:'center',height:150,width:150,backgroundColor:'#D76B49',  borderColor: '#E9D2B3', borderWidth:4,borderRadius:8},
    statisticTxt:{fontSize:20,textAlign:'center',color:'#FFF'},
    graphIcon:{color:'#FFF',alignSelf: 'center', fontSize:45}
});

export default IndexFriendScreen;
