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
      height: 60, // Enough to accommodate icon + label
      paddingBottom: 4, // Minimal, but prevents clipping
      paddingTop: 0, // No extra space on top
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
      lineHeight: 14,
      paddingBottom: 0, // Keep tight
    },
    tabBarIconStyle: {
      marginBottom: 0, // Avoid extra spacing pushing label down
    },
    headerShown: false,
  }}
>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Calculator',
          tabBarIcon: ({ color }) => (
            <Calculator size={24} color={color} strokeWidth={1.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <Settings size={24} color={color} strokeWidth={1.5} />
          ),
        }}
      />
    </Tabs>
  );
}