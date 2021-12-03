import {StatusBar} from 'expo-status-bar';
import * as React from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Switch,
    TextInput,
    TouchableOpacity
} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from '../components/Themed';
import {InitialProps} from "expo/build/launch/withExpoRoot.types";
import {FontAwesome} from "@expo/vector-icons";
import {useEffect, useState} from "react";
import {changePrioridad} from "../utils";

interface Props {
    route: any,
    navigation: any
}

export default function ModalScreen(props: any) {
    const {consultorio, direccion, telefono, turno_consulta, prioridad , _id} = props.route.params;
    const {navigation} = props
    const [isEnabled, setIsEnabled] = useState(prioridad === "Urgente");
    const [prioridadState, setPrioridadState] = useState(prioridad)

    const toggleSwitch = () => {
        setIsEnabled(!isEnabled);
        console.log(prioridadState)
        async function changePrioridadAsync() {
            const res = await changePrioridad(_id, prioridadState)
            if (!res.error)
                changePriorAlert()
                //console.log(res.result)
        }
        changePrioridadAsync();
    }

    useEffect(() => {
        setPrioridadState(prioridad === "Urgente" ? "No urgente": "Urgente")
    }, [])

    const changePriorAlert = () => {
        Alert.alert(
            "✅",
            "¡La prioridad de la consulta ha cambiado exitosamente!",
            [
                {text: "OK", onPress: () => {
                        console.log("OK Pressed")
                        navigation.navigate('TabOne')
                    }}
            ]
        );
    }

    const createOkAlert = () => {
        Alert.alert(
            "✅",
            "¡La consulta se ha cancelado exitosamente!",
            [
                {text: "OK", onPress: () => {
                    console.log("OK Pressed")
                        navigation.navigate('TabOne')
                    }}
            ]
        );
    }

    const createConfirmAlert = () =>
        Alert.alert(
            "Confirmación",
            "¿Está seguro de cancelar la consulta actual?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Si, cancelar", onPress: () => {
                        console.log("OK Pressed")
                        createOkAlert()
                    }
                }
            ]
        );



    return (



            <ScrollView>
                <KeyboardAvoidingView
                    keyboardVerticalOffset={-100}
                    behavior={'position'}>
                <View style={styles.container}>
                    <Text style={styles.header}>Detalles de consulta</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Consultorio:</Text>
                        <Text
                            style={styles.inputValue}
                        >{consultorio}</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Dirección:</Text>

                        <TextInput
                            style={styles.inputValue}
                            defaultValue={direccion}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Telefono:</Text>
                        <TextInput
                            style={styles.inputValue}
                            defaultValue={telefono}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Prioridad:</Text>
                        <View style={styles.titleFlex}>

                            <View style={styles.titleIconFlex}>
                                {
                                    prioridad === "Urgente" ?
                                        <FontAwesome style={{ color: 'red', marginRight: 10 }} name={'info-circle'} size={25}/>
                                        : <FontAwesome style={{ color: 'black', marginRight: 10 }} name={'info-circle'} size={25}/>
                                }

                                <Text style={styles.title}>{prioridad}</Text>
                            </View>
                            <Switch
                                //trackColor={{false: "#767577", true: "#81b0ff"}}
                                //thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.buttonForm}
                        onPress={createConfirmAlert}
                    ><Text style={styles.title}>Cancelar</Text></TouchableOpacity>


                    {/* Use a light status bar on iOS to account for the black space above the modal */}

                </View>

                </KeyboardAvoidingView>
            </ScrollView>



    );
}

const styles = StyleSheet.create({
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
        textAlign: 'center'
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
