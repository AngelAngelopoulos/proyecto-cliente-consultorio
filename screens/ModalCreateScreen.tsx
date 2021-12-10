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
import {changePrioridad, createConsulta, getAllConsultas, getAllConsultorios} from "../utils";
import {Picker} from '@react-native-picker/picker';
import {Consultorio, Medico} from "../typesData";
import DateTimePicker from '@react-native-community/datetimepicker';


interface Props {
    route: any,
    navigation: any
}

/**
 * Modal para agendar una consulta en el sistema
 */
export default function ModalCreateScreen(props: any) {
    const {navigation} = props

    const [isEnabled, setIsEnabled] = useState(false);
    const [prioridadState, setPrioridadState] = useState("No urgente")

    const [selectedConsultorio, setSelectedConsultorio] = useState<string>('')
    const [consultorios, setConsultorios] = useState<Consultorio[]>([])

    const [selectedMedico, setSelectedMedico] = useState<string>('')
    const [medicos, setMedicos] = useState<Medico[]>([])

    const [fecha, setFecha] = useState<Date>(new Date(Date.now().valueOf()))
    const [hora, setHora] = useState<Date>(new Date(Date.now().valueOf()))


    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || fecha;
        setFecha(currentDate);
    };

    const onChangeTime = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || hora;
        setHora(currentDate);
    };

    useEffect(() => {
        async function fetchData() {
            const res = await getAllConsultorios()
            if (!res.error)
                setConsultorios(res.result)
        }

        fetchData()
    }, [])

    useEffect(() => {
        if (selectedConsultorio) {
            const cons = consultorios.find(item => item._id === selectedConsultorio)
            if (cons)
                setMedicos(cons.medicos)
        }
    }, [selectedConsultorio])

    useEffect(() => {

        console.log(isEnabled)
    }, [isEnabled])

    const createConsultaRegister = async () => {
        async function createCons() {
            const res = await createConsulta(
                selectedConsultorio,
                selectedMedico,
                '61a96e70e191436a733d4da7',
                isEnabled ? 'Urgente' : 'No Urgente',
                `${fecha.getUTCDate()}-${fecha.getUTCMonth()}-${fecha.getFullYear()}`,
                `${fecha.getHours()}:${fecha.getUTCMinutes()}}`
            )
            if (!res.error)
                createOkAlert()
            //console.log(res.result)
        }

        createCons();
    }

    const createOkAlert = () => {
        Alert.alert(
            "✅",
            "¡La consulta se ha agendado exitosamente!",
            [
                {
                    text: "OK", onPress: () => {
                        console.log("OK Pressed")
                        navigation.navigate('TabOne')
                    }
                }
            ]
        );
    }

    return (


        <ScrollView>
            <KeyboardAvoidingView
                keyboardVerticalOffset={-500}
                behavior={'position'}>
                <View style={styles.container}>
                    <Text style={styles.header}>Detalles de consulta</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Consultorio:</Text>
                        <Picker
                            selectedValue={selectedConsultorio}
                            onValueChange={(itemValue, itemIndex) => {
                                setSelectedConsultorio(itemValue)
                                //setMedicos(itemValue?.medicos)
                            }
                            }>
                            {
                                consultorios ? <Picker.Item label="Seleccionar consultorio" value={null}/>
                                    : <Picker.Item label="Consultoros no disponibles" value={null}/>
                            }
                            {
                                consultorios && consultorios.map((consultorio: Consultorio, key) => (
                                    <Picker.Item key={key} label={consultorio.nombre} value={consultorio._id}/>
                                ))
                            }
                        </Picker>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Médico:</Text>
                        <Picker
                            selectedValue={selectedMedico}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedMedico(itemValue)
                            }

                        >
                            {
                                medicos ? <Picker.Item label="Seleccionar médico" value={null}/>
                                    : <Picker.Item label="Medicos no disponibles" value={null}/>
                            }
                            {
                                medicos && medicos.map((medico: Medico, key) => (
                                    <Picker.Item key={key} label={medico.nombre} value={medico._id}/>
                                ))
                            }
                        </Picker>
                    </View>


                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Fecha:</Text>
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={fecha}
                            mode={"date"}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                        {/*<TextInput
                            style={styles.inputValue}
                            value={fecha}
                            onChangeText={(value) => setFecha(value)}
                        />*/}
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Hora:</Text>
                            <DateTimePicker
                                testID="timePicker"
                                value={fecha}
                                mode={"time"}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                            />

                        {
                            /*<TextInput
                                style={styles.inputValue}
                                value={hora}
                                onChangeText={(value) => setHora(value)}

                            />*/
                        }
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Prioridad:</Text>
                        <View style={styles.titleFlex}>

                            <View style={styles.titleIconFlex}>
                                {
                                    prioridadState === "Urgente" ?
                                        <FontAwesome style={{color: 'red', marginRight: 10}} name={'info-circle'}
                                                     size={25}/>
                                        : <FontAwesome style={{color: 'black', marginRight: 10}} name={'info-circle'}
                                                       size={25}/>
                                }

                                <Text style={styles.title}>{isEnabled ? "Urgente": "No urgente"}</Text>
                            </View>
                            <Switch
                                //trackColor={{false: "#767577", true: "#81b0ff"}}
                                //thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={(value) => {
                                    setIsEnabled(value)
                                }}
                                value={isEnabled}
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.buttonForm}
                        onPress={createConsultaRegister}
                    ><Text style={styles.title}>Agendar Consulta</Text></TouchableOpacity>


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
        /*shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowColor: '#C4c4c4',
        shadowOpacity: 0.8,*/
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
        borderBottomWidth: 1,

    },
    buttonForm: {
        margin: '10%',
        paddingVertical: '4%',
        paddingHorizontal: '8%',
        backgroundColor: '#CACACA',
        borderRadius: 10
    },
});
