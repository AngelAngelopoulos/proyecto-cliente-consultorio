import * as React from 'react';
import {Button, StyleSheet, TouchableOpacity, View as NativeView} from "react-native";
import {Text, View} from "../Themed";
import {FontAwesome} from "@expo/vector-icons";

export const ListItemMedicalDate = (props: {onPressCard: any , numero: number }) => {
    const {numero, onPressCard} = props;

    return (
        <View style={styles.cardItem}>

            <TouchableOpacity onPress={onPressCard}>
                <View style={styles.turnItem}>
                    <View style={styles.turnLabelItemView}>
                        <Text style={styles.turnLabelItem}>No. de turno:</Text>
                    </View>
                    <Text style={styles.cardTitle}>{numero}</Text>
                </View>

                <Text style={styles.cardTitle}>Cita Dr. Simi</Text>

                <Text style={styles.turnLabelItem}>Dr. José Sánchez</Text>

                <Text style={styles.turnLabelItem}>Hora: 3:00p``</Text>

            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    turnItem: {
        flex: 1,
        flexDirection: 'row',
        alignContent: "flex-start",
        alignItems: 'flex-start',
        textAlignVertical: 'bottom',
        justifyContent: 'flex-end',
        width: '90%'
    },
    turnLabelItemView: {
        paddingHorizontal: 8,
        paddingTop: 8,

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
        marginVertical: 12

    },
    cardTitle: {
        textAlign: 'left',
        fontSize: 24,
        fontWeight: 'bold'
    }
});
