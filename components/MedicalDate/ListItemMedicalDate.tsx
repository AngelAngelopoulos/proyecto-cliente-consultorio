import * as React from 'react';
import {Button, StyleSheet, TouchableOpacity, View as NativeView} from "react-native";
import {Text, View} from "../Themed";
import {FontAwesome} from "@expo/vector-icons";

import { Consulta } from '../../typesData/index'

interface Props {
    navigation: any,
    consulta: Consulta
}

export const ListItemMedicalDate = (props: Props) => {
    const {consulta, navigation} = props;


    const onPressCard = () => {
        // @ts-ignore
        navigation.navigate('Modal', {
            screen: 'Modal',
            consultorio: consulta.consultorio.nombre,
            turno_consulta: consulta.numero_turno,
            direccion: consulta.consultorio.direccion,
            telefono: consulta.consultorio.telefono,
            prioridad: consulta.prioridad,
            _id: consulta._id,
            is_active: consulta.is_active

        })
    }

    return (
        <View style={styles.cardItem}>

            <TouchableOpacity onPress={onPressCard}>
                <View style={styles.turnItem}>
                    <View style={styles.turnLabelItemView}>
                        <Text style={styles.turnLabelItem}>No. de turno:</Text>
                    </View>
                    <Text style={styles.cardTitle}>{consulta.numero_turno}</Text>
                </View>

                <Text style={styles.cardTitle}>{consulta.consultorio.nombre}</Text>

                <Text style={styles.turnLabelItem}>{consulta.medico.nombre}</Text>

                <Text style={styles.turnLabelItem}>{consulta.fecha} - {consulta.hora}</Text>


            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    turnItem: {
        flexDirection: 'row',
        alignContent: "flex-start",
        alignItems: 'flex-start',
        textAlignVertical: 'bottom',
        justifyContent: 'flex-end',
        width: '90%',

        backgroundColor: '#fff'

    },
    turnLabelItemView: {
        paddingHorizontal: 8,
        paddingTop: 4,
        backgroundColor: 'transparent'

    },
    turnLabelItem: {
        fontSize: 16,
        textAlignVertical: 'bottom'
    },
    numberTurnItem: {
        fontSize: 15,
    },
    cardItem: {
        flex: 1,
        borderRadius: 8,
        //borderWidth: 2,
        borderColor: '#000000',
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowColor: '#C4c4c4',
        shadowOpacity: 0.8,
        width: '85%',
        //paddingHorizontal: '25%',
        paddingVertical: '5%',
        paddingLeft: '5%',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        textAlign: 'left',
        marginVertical: 12,

        backgroundColor: '#fff'
    },
    cardTitle: {
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 'bold'
    }
});
