import * as React from 'react';
import {Alert, ScrollView, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from '../components/Themed';
import {RootTabScreenProps} from '../types';
import {ListItemMedicalDate} from "../components";
import {getAllConsultas} from '../utils'
import {useEffect, useState} from "react";

export default function TabConsultasScreen({navigation}: RootTabScreenProps<'TabOne'>) {

    const [consultas, setConsultas] = useState([])




    useEffect(() => {
        async function fetchData() {
            const res = await getAllConsultas()
            if (!res.error)
                setConsultas(res.result)
        }
        const unsubscribe = navigation.addListener('focus', () => {
            // The screen is focused
            fetchData();
            // Call any action
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;


    }, [navigation])



    return (
        <ScrollView>
            <View style={styles.container}>

                <Text style={styles.title}>Mis consultas</Text>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
                <Text>
                    {
                        consultas && JSON.stringify(consultas)
                    }
                </Text>


                {/*<EditScreenInfo path="/screens/TabConsultasScreen.tsx" />*/}
                {
                    consultas && consultas.map((item, key) => (


                        <ListItemMedicalDate key={key}
                                             consulta={item}
                                             navigation={navigation}
                        />

                    ))

                }


            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    card: {
        //marginBottom: 0.1
    }
});
