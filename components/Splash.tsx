import React from 'react';
import { View, Text, StyleSheet, useColorScheme, Image } from 'react-native';

export function Splash() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000000' : '#FFFFFF' }]}>
      <Image
        source={{ uri: isDark ? 'https://images.pexels.com/photos/2882634/pexels-photo-2882634.jpeg' : 'https://images.pexels.com/photos/2882566/pexels-photo-2882566.jpeg' }}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.footer}>
        <Text style={[styles.text, { color: isDark ? '#FFFFFF' : '#000000' }]}>
          from{' '}
          <Text style={styles.highlight}>
            Fax Academy
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 48,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  highlight: {
    color: '#fca901',
    fontFamily: 'Inter-Medium',
  },
});