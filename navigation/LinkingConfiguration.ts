/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: 'one',
              ModalCreate: 'modalcreate',
              Modal: 'modal',
              Creditos: 'creditos'
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'two',
              Modal: 'modal',
              NotFound: '*',
              Creditos: 'creditos'
            },
          },
        },
      },
      Modal: 'modal',
      ModalCreate: 'modalcreate',
      NotFound: '*',
      Creditos: 'creditos'
    },
  },
};

export default linking;
