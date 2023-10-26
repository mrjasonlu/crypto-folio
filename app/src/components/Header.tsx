import React from 'react';
import { View } from 'react-native';
import Logo from '../../assets/images/Logo.svg';

export default function Header() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Logo height={40} />
    </View>
  );
}
