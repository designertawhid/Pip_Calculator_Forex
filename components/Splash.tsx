import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export function Splash() {
  return (
    <LinearGradient
      colors={['#294660', '#1a2d3d', '#0f1a24']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.content}>
        <Image
          source={require('../assets/images/logo-color.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.text}>
          from{' '}
          <Text style={styles.highlight}>
            Fax Academy
          </Text>
        </Text>
      </View>
      
      {/* Decorative elements */}
      <View style={[styles.circle, styles.circle1]} />
      <View style={[styles.circle, styles.circle2]} />
      <View style={[styles.circle, styles.circle3]} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  logo: {
    width: width * 0.3,
    height: width * 0.3,
    maxWidth: 180,
    maxHeight: 180,
  },
  footer: {
    position: 'absolute',
    bottom: 48,
    alignItems: 'center',
    zIndex: 2,
  },
  text: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  highlight: {
    color: '#fca901',
    fontFamily: 'Inter-Medium',
  },
  // Decorative circles with gradient borders
  circle: {
    position: 'absolute',
    borderRadius: 1000,
    opacity: 0.1,
  },
  circle1: {
    width: width * 0.8,
    height: width * 0.8,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#fca901',
    top: -width * 0.2,
    right: -width * 0.2,
  },
  circle2: {
    width: width * 0.6,
    height: width * 0.6,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    bottom: -width * 0.1,
    left: -width * 0.1,
  },
  circle3: {
    width: width * 0.4,
    height: width * 0.4,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#fca901',
    top: height * 0.3,
    right: -width * 0.1,
  },
});