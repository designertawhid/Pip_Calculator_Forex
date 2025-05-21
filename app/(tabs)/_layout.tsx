import { Tabs } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { Calculator, Settings } from 'lucide-react-native';
import { Platform, useWindowDimensions } from 'react-native';

export default function TabLayout() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768;
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          elevation: 0,
          shadowOpacity: 0,
          height: 56,
          paddingBottom: 8,
          paddingTop: 8,
          ...(isLargeScreen && {
            maxWidth: 400,
            alignSelf: 'center',
            marginHorizontal: 'auto',
            borderRadius: 16,
            position: 'absolute',
            bottom: 16,
            left: '50%',
            transform: [{ translateX: -200 }],
          }),
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 12,
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Calculator',
          tabBarIcon: ({ color, size }) => (
            <Calculator size={22} color={color} strokeWidth={1.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Settings size={22} color={color} strokeWidth={1.5} />
          ),
        }}
      />
    </Tabs>
  );
}