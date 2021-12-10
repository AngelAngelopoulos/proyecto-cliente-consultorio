import * as React from 'react';

import { Text, TextProps } from './Themed';

/**
 * Componente de un texto con estilo específicos
 */
export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}
