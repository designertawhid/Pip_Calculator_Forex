import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  Platform,
  Switch,
  Linking,
  ScrollView
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Card } from '@/components/UI/Card';
import { 
  Moon, 
  Sun, 
  Smartphone, 
  Mail, 
  Info, 
  Star, 
  Lock,
  BookOpen
} from 'lucide-react-native';

export default function Settings() {
  const { colors, theme, setTheme, isDark } = useTheme();
  
  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
  };

  const showPrivacyPolicy = () => {
    const content = `
Privacy Policy for Pip Calculator Forex

Last updated: ${new Date().toLocaleDateString()}

Fax Academy ("we," "our," or "us") operates the Pip Calculator Forex application. This page informs you of our policies regarding the collection, use, and disclosure of personal information when you use our Service.

1. Information Collection and Use
We do not collect any personal information through the Pip Calculator Forex app. The calculations and settings you input are stored locally on your device.

2. Log Data
We do not collect any log data or usage statistics.

3. Cookies
This Service does not use cookies.

4. Security
We value your trust in providing us your personal information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.

5. Links to Other Sites
This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites.

6. Children's Privacy
These Services do not address anyone under the age of 13.

7. Changes to This Privacy Policy
We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes.

Contact Us
If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at thefaxacademy@gmail.com.
    `;
    alert(content);
  };

  const showTermsOfService = () => {
    const content = `
Terms of Service for Pip Calculator Forex

Last updated: ${new Date().toLocaleDateString()}

Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Pip Calculator Forex application operated by Fax Academy ("us", "we", or "our").

1. Agreement to Terms
By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.

2. Use License
Permission is granted to temporarily download one copy of the application for personal, non-commercial transitory viewing only.

This is the grant of a license, not a transfer of title, and under this license you may not:
- modify or copy the materials;
- use the materials for any commercial purpose;
- attempt to decompile or reverse engineer any software contained in the application;
- remove any copyright or other proprietary notations from the materials;
- transfer the materials to another person or "mirror" the materials on any other server.

3. Disclaimer
The materials within our Service are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.

4. Limitations
In no event shall Fax Academy or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use our Service.

5. Accuracy of Materials
The materials appearing in our Service could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our Service are accurate, complete, or current.

6. Links
We have not reviewed all of the sites linked to our Service and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any such linked website is at the user's own risk.

7. Modifications
We may revise these Terms of Service for our Service at any time without notice. By using our Service you are agreeing to be bound by the then current version of these Terms of Service.

Contact Us
If you have any questions about these Terms, please contact us at thefaxacademy@gmail.com.
    `;
    alert(content);
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text, fontFamily: 'Inter-Bold' }]}>
          Settings
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary, fontFamily: 'Inter-Regular' }]}>
          Pip Calculator Forex
        </Text>
      </View>
      
      <ScrollView style={styles.content}>
        <Card>
          <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: 'Inter-SemiBold' }]}>
            Appearance
          </Text>
          
          <View style={styles.optionsContainer}>
            <TouchableOpacity 
              style={[
                styles.themeOption, 
                theme === 'light' && { 
                  backgroundColor: `${colors.primary}10`, 
                  borderColor: colors.primary,
                }
              ]}
              onPress={() => handleThemeChange('light')}
            >
              <Sun 
                size={24} 
                color={theme === 'light' ? colors.primary : colors.textSecondary} 
              />
              <Text 
                style={[
                  styles.themeText, 
                  { 
                    color: theme === 'light' ? colors.primary : colors.text,
                    fontFamily: theme === 'light' ? 'Inter-SemiBold' : 'Inter-Regular'
                  }
                ]}
              >
                Light
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.themeOption, 
                theme === 'dark' && { 
                  backgroundColor: `${colors.primary}10`, 
                  borderColor: colors.primary,
                }
              ]}
              onPress={() => handleThemeChange('dark')}
            >
              <Moon 
                size={24} 
                color={theme === 'dark' ? colors.primary : colors.textSecondary} 
              />
              <Text 
                style={[
                  styles.themeText, 
                  { 
                    color: theme === 'dark' ? colors.primary : colors.text,
                    fontFamily: theme === 'dark' ? 'Inter-SemiBold' : 'Inter-Regular'
                  }
                ]}
              >
                Dark
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.themeOption, 
                theme === 'system' && { 
                  backgroundColor: `${colors.primary}10`, 
                  borderColor: colors.primary,
                }
              ]}
              onPress={() => handleThemeChange('system')}
            >
              <Smartphone 
                size={24} 
                color={theme === 'system' ? colors.primary : colors.textSecondary} 
              />
              <Text 
                style={[
                  styles.themeText, 
                  { 
                    color: theme === 'system' ? colors.primary : colors.text,
                    fontFamily: theme === 'system' ? 'Inter-SemiBold' : 'Inter-Regular'
                  }
                ]}
              >
                System
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
        
        <Card style={styles.aboutCard}>
          <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: 'Inter-SemiBold' }]}>
            About
          </Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Info size={20} color={colors.primary} />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={[styles.settingLabel, { color: colors.text, fontFamily: 'Inter-Regular' }]}>
                Version
              </Text>
              <Text style={[styles.settingValue, { color: colors.textSecondary, fontFamily: 'Inter-Regular' }]}>
                1.0.0
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => Linking.openURL('mailto:thefaxacademy@gmail.com')}
          >
            <View style={styles.settingIconContainer}>
              <Mail size={20} color={colors.primary} />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={[styles.settingLabel, { color: colors.text, fontFamily: 'Inter-Regular' }]}>
                Contact Support
              </Text>
              <Text style={[styles.settingValue, { color: colors.textSecondary, fontFamily: 'Inter-Regular' }]}>
                thefaxacademy@gmail.com
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => Linking.openURL('https://play.google.com')}
          >
            <View style={styles.settingIconContainer}>
              <Star size={20} color={colors.primary} />
            </View>
            <Text style={[styles.settingLabel, { color: colors.text, fontFamily: 'Inter-Regular' }]}>
              Rate Us on Google Play
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={showPrivacyPolicy}
          >
            <View style={styles.settingIconContainer}>
              <Lock size={20} color={colors.primary} />
            </View>
            <Text style={[styles.settingLabel, { color: colors.text, fontFamily: 'Inter-Regular' }]}>
              Privacy Policy
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.settingItem, { borderBottomWidth: 0 }]}
            onPress={showTermsOfService}
          >
            <View style={styles.settingIconContainer}>
              <BookOpen size={20} color={colors.primary} />
            </View>
            <Text style={[styles.settingLabel, { color: colors.text, fontFamily: 'Inter-Regular' }]}>
              Terms of Service
            </Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 0 : 40,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  themeOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  themeText: {
    marginTop: 8,
    fontSize: 14,
  },
  aboutCard: {
    marginTop: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E2E8F0',
  },
  settingIconContainer: {
    width: 40,
    alignItems: 'center',
  },
  settingTextContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
  },
  settingValue: {
    fontSize: 14,
  },
});