import * as React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from '../components/Themed';
import {RootTabScreenProps} from '../types';
import {ListItemMedicalDate} from "../components";

export default function TabOneScreen({navigation}: RootTabScreenProps<'TabOne'>) {


    const onPressCard = () => {
        // @ts-ignore
        navigation.navigate('Modal', {screen: 'Modal',
            consultorio: "Dr. Simi",
            turno_consulta: 1,
            direccion: "Periférico #123 Col. El Aguaje",
            telefono: '444444444',
            prioridad: "Urgente",
            navigation: navigation

        })
    }

    return (
        <ScrollView>
            <View style={styles.container}>

                <Text style={styles.title}>Mis consultas</Text>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>

                {/*<EditScreenInfo path="/screens/TabOneScreen.tsx" />*/}
                {
                    Array.from(Array(10).keys()).map((item, key) => (


                        <ListItemMedicalDate key={key} onPressCard={onPressCard} numero={item}/>

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
