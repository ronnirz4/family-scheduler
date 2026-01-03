import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { getFamilyByCode } from '../../src/services/familyService';
import { StackActions } from '@react-navigation/native';

export default function HomeScreen() {
  const [code, setCode] = useState('');
  const router = useRouter();

  const handleEnterCode = async () => {
    const family = await getFamilyByCode(code);
    if (!family) {
      Alert.alert('Error', 'Family not found');
      return;
    }

    // pass the family data as JSON string
    router.push({
      pathname: '/family-schedule',
      params: { familyData: JSON.stringify(family) },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Family Code</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter code"
        value={code}
        onChangeText={setCode}
      />
      <Button title="Go" onPress={handleEnterCode} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 6,
    padding: 10,
    width: '80%',
    marginBottom: 10,
  },
});
