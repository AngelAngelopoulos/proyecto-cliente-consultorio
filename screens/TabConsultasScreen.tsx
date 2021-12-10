import * as React from 'react';
import {Alert, Button, NativeEventEmitter, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from '../components/Themed';
import { RootTabScreenProps} from '../types';
import {ListItemMedicalDate} from "../components";
import {getAllConsultas} from '../utils'
import {useEffect, useState} from "react";
import {Consulta, Medico} from "../typesData";


import {AntDesign, FontAwesome} from '@expo/vector-icons';
import Colors from "../constants/Colors";


export default function TabConsultasScreen({navigation}: RootTabScreenProps<'TabOne'>) {

    const [consultasGlobal, setConsultasGlobal] = useState<Consulta[]>([])
    const [consultas, setConsultas] = useState<Consulta[]>([])
    const [actives, setActives] = useState(true)

    const [offset, setOffset] = useState(false)

    useEffect(() => {
        console.log(actives)
        if (actives){
            setConsultas(consultasGlobal.filter(item => item.is_active))
        }
        else {
            setConsultas(consultasGlobal.filter(item => !item.is_active))
        }
    }, [actives, consultasGlobal])

    async function fetchData() {
        const res = await getAllConsultas()
        if (!res.error)
            setConsultasGlobal(res.result)
    }
    useEffect(() => {



        const unsubscribe = navigation.addListener('focus', () => {
            // The screen is focused

            fetchData();
            // Call any action
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation])


    useEffect(() => {
        fetchData().then(() => {console.log("fetch hecho")}).catch((error) => console.log(error))
    }, [offset])

    const handleCreateButton = () => {
        navigation.navigate('ModalCreate');
    }
    const _onScroll = async (event: any) => {
        const currentOffset = event.nativeEvent.contentOffset.y;



         if (currentOffset <= 0) {
             console.log("Hace fetch")
             setOffset(!offset);
        }

    };

    return (

        <View style={styles.container}>
            <ScrollView style={styles.layout} onScroll={_onScroll}>
                <View style={styles.container}>

                    {/*<Text>{JSON.stringify(consultasGlobal)}</Text>*/}

                <View style={styles.tabsLayout}>
                    <TouchableOpacity style={[actives ? styles.tabActive : styles.tabNotActive, styles.tabLeft]}
                                      onPress={() => setActives(true)}>
                        <Text>Activas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[actives ? styles.tabNotActive : styles.tabActive, styles.tabRigth]}
                                      onPress={() => setActives(false)}>
                        <Text>Canceladas</Text>
                    </TouchableOpacity>

                </View>


                {/*<EditScreenInfo path="/screens/TabConsultasScreen.tsx" />*/}
                {
                    consultas ? consultas.map((item, key) => (


                            <ListItemMedicalDate key={key}
                                                 consulta={item}
                                                 navigation={navigation}
                            />

                        ))
                        : <Text>Cargando...</Text>
                }
                {
                    consultas.length < 1 ? <Text style={styles.title}>No hay consultas</Text> : <></>
                }
                </View>


            </ScrollView>
            <TouchableOpacity onPress={handleCreateButton} style={styles.buttonFloat}>
                <AntDesign name={"plus"}
                           size={30}
                           color={'#ffffff'}
                />
            </TouchableOpacity>
        </View>


    );
}

const styles = StyleSheet.create({
    layout: {
        height: '100%',
        flex: 1,
        width: '100%'

    },
    container: {
        paddingTop: '4%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        //backgroundColor: '#2f95dc'
    },
    title: {
        paddingTop: 40,
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 4,
        height: 1,
        width: '80%',
    },
    tabsLayout: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
        borderRadius: 16,
        borderColor: '#C4C4C4',
        borderWidth: 3,
        marginBottom: '5%'
    },
    tabLeft: {
        paddingVertical: '5%',
        //paddingHorizontal: '10%',
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        width: '50%',
        alignItems: 'center'
    },
    tabRigth: {
        paddingVertical: '5%',
        //paddingHorizontal: '10%',
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
        width: '50%',
        alignItems: 'center'

    },
    tabActive: {

        backgroundColor: '#C0C0C0',

    },
    tabNotActive: {


        backgroundColor: '#E2E2E2'
    },
    buttonFloat: {
        flex: 1,
        flexDirection: 'column',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#000000',
        position: 'absolute',
        bottom: 20,
        right: 20,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    }
});
