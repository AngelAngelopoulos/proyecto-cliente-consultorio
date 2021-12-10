import * as React from 'react';
import {Image, ScrollView, StyleSheet, Switch, TouchableOpacity} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from '../components/Themed';

/**
 * Pantalla de Créditos de la Aplicación
 */
export default function CreditsScreen() {
    return (
        <ScrollView>

            <View style={styles.container}>

                    <Text style={styles.header}>Créditos</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Materia:</Text>
                        <Text
                            style={styles.inputValue}
                        >Fundamentos del desarrollo móvil</Text>
                    </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.title}>Profesor:</Text>
                    <Text
                        style={styles.inputValue}
                    >Francisco Everardo Estrada Velázquez</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.title}>Ingtegrantes:</Text>
                    <Text
                        style={styles.inputValue}
                    > {"> Luis Angel Alvarado Hernández "}  </Text>
                    <Text
                        style={styles.inputValue}
                    > {"> Alejandro Moctezuma Luna"} </Text>
                    <Text
                        style={styles.inputValue}
                    > {"> Luis Fernando Vázquez Nieto"} </Text>
                </View>
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
        height: '100%'
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
