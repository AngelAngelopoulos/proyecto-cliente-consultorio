import * as React from 'react';
import {Image, ScrollView, StyleSheet, Switch, TouchableOpacity} from 'react-native';

import {Text, View} from '../components/Themed';
import {FontAwesome} from "@expo/vector-icons";
import {useEffect, useState} from "react";
import {Paciente} from "../typesData";
import {getAllConsultorios, getPaciente} from "../utils";

/**
 * Tab de Consultas del Paciente
 */
export default function TabPacienteScreen() {

    const [user, setUser] = useState<Paciente | null>(null)

    useEffect(() => {
        async function fetchData() {
            const res = await getPaciente()
            if (!res.error)
                setUser(res.result)
        }

        fetchData()
    }, [])

    return (
        <ScrollView>

            <View style={styles.container}>
                {user && <>
                    <Image style={styles.image} source={require('../assets/images/Corpus.png')}/>
                    <Text style={styles.header}>Hola, {user.nombre.split(' ')[0]}</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>ID de Paciente:</Text>
                        <Text
                            style={styles.inputValue}
                        >{user._id}</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Nombre completo:</Text>
                        <Text
                            style={styles.inputValue}
                        >{user.nombre}</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Teléfono:</Text>
                        <Text
                            style={styles.inputValue}
                        >{user.telefono}</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Edad:</Text>
                        <Text
                            style={styles.inputValue}
                        >{user.edad}</Text>
                    </View>
                </>
                }
            </View>
        </ScrollView>

    );
}
const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: '5%'
    },
    container: {
        flex: 1,
        paddingHorizontal: '10%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '10%',
        //paddingBottom: '20%',
        height: '90%'
    },
    header: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '5%'
    },
    title: {
        //paddingTop: '10%',
        fontSize: 20,
        fontWeight: 'bold',
    },
    inputValue: {
        fontSize: 20,
        fontWeight: 'bold',
        //borderWidth: 2,
        //borderColor: 'black',
        //borderRadius: 8,
        /*shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowColor: '#C4c4c4',
        shadowOpacity: 0.8,*/
        paddingVertical: 2,
        //paddingHorizontal: 4,
        width: '100%',
        marginTop: '3%'
    },
    titleFlex: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        width: '85%'
    },
    iconFlex: {
        marginRight: 10
    },
    titleIconFlex: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: "center",
        width: '100%'
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '100%',
    },
    inputContainer: {
        width: '100%',
        paddingVertical: '10%',
        borderBottomWidth: 1
    },
    buttonForm: {
        margin: '10%',
        paddingVertical: '4%',
        paddingHorizontal: '8%',
        backgroundColor: '#CACACA',
        borderRadius: 10
    }
});
