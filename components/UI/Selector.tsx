import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  FlatList,
  SafeAreaView
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { ChevronDown, Search, X } from 'lucide-react-native';
import { InputField } from './InputField';

interface Option {
  value: string;
  label: string;
  description?: string;
}

interface SelectorProps {
  label: string;
  value: string;
  options: Option[];
  onSelect: (value: string) => void;
}

export function Selector({ label, value, options, onSelect }: SelectorProps) {
  const { colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const selectedOption = options.find(option => option.value === value);
  
  const filteredOptions = searchQuery 
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (option.description && option.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : options;

  const handleSelect = (optionValue: string) => {
    onSelect(optionValue);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <>
      <View style={styles.container}>
        <Text 
          style={[
            styles.label, 
            { color: colors.textSecondary, fontFamily: 'Inter-Medium' }
          ]}
        >
          {label}
        </Text>
        <TouchableOpacity
          style={[
            styles.selector,
            { 
              backgroundColor: colors.inputBackground,
              borderColor: colors.border,
            }
          ]}
          onPress={() => setIsOpen(true)}
        >
          <Text style={[styles.value, { color: colors.text, fontFamily: 'Inter-Regular' }]}>
            {selectedOption?.label || value}
          </Text>
          <ChevronDown size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={() => {
          setIsOpen(false);
          setSearchQuery('');
        }}
      >
        <SafeAreaView 
          style={[
            styles.modalContainer, 
            { backgroundColor: colors.background }
          ]}
        >
          <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
            <Text style={[styles.modalTitle, { color: colors.text, fontFamily: 'Inter-SemiBold' }]}>
              Select {label}
            </Text>
            <TouchableOpacity 
              onPress={() => {
                setIsOpen(false);
                setSearchQuery('');
              }}
            >
              <X size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.searchContainer}>
            <InputField
              label=""
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search..."
              showClearButton
              style={styles.searchInput}
            />
          </View>
          
          <FlatList
            data={filteredOptions}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.option,
                  item.value === value && { 
                    backgroundColor: `${colors.primary}20` 
                  },
                  { borderBottomColor: colors.border }
                ]}
                onPress={() => handleSelect(item.value)}
              >
                <View>
                  <Text 
                    style={[
                      styles.optionLabel, 
                      { 
                        color: colors.text,
                        fontFamily: 'Inter-Regular',
                        ...(item.value === value && { 
                          fontFamily: 'Inter-SemiBold',
                          color: colors.primary,
                        })
                      }
                    ]}
                  >
                    {item.label}
                  </Text>
                  {item.description && (
                    <Text style={[styles.optionDescription, { color: colors.textSecondary }]}>
                      {item.description}
                    </Text>
                  )}
                </View>
                {item.value === value && (
                  <View style={[styles.checkmark, { backgroundColor: colors.primary }]} />
                )}
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
  },
  selector: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  value: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
  },
  searchContainer: {
    padding: 16,
  },
  searchInput: {
    marginBottom: 0,
  },
  option: {
    padding: 16,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionLabel: {
    fontSize: 16,
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
  },
  checkmark: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});