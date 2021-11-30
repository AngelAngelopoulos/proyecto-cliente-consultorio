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
import {useState} from "react";

interface Props {
    route: any,
    navigation: any
}

export default function ModalScreen(props: any) {
    const {consultorio, direccion, telefono, turno_consulta, prioridad} = props.route.params;
    const {navigation} = props
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);


    const createOkAlert = () => {
        Alert.alert(
            "✅",
            "¡La consulta se ha modificado exitosamente!",
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
            "¿Está seguro de modificar la consulta actual?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
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
                    <Text style={styles.header}>Editar consulta</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Consultorio:</Text>
                        <TextInput
                            style={styles.inputValue}
                            defaultValue={consultorio}
                        />
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
                                <FontAwesome style={styles.iconFlex} name={'info-circle'} size={25}/>
                                <Text style={styles.title}>{prioridad}</Text>
                            </View>
                            <Switch
                                trackColor={{false: "#767577", true: "#81b0ff"}}
                                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.buttonForm}
                        onPress={createConfirmAlert}
                    ><Text style={styles.title}>Editar</Text></TouchableOpacity>


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
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 8,
        paddingVertical: 2,
        paddingHorizontal: 4,
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
