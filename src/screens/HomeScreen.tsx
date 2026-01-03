import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import FamilyScheduleScreen from './family-schedule';
import { getFamilyByCode } from '../src/services/familyService'; // we’ll create this

export default function HomeScreen() {
  const [code, setCode] = useState('');
  const [familyData, setFamilyData] = useState<string | null>(null);

  const handleEnterCode = async () => {
    try {
      const data = await getFamilyByCode(code.toUpperCase());
      if (!data) {
        Alert.alert('Error', 'Channel not found');
        return;
      }
      setFamilyData(JSON.stringify(data));
    } catch (e: any) {
      Alert.alert('Error', e.message);
    }
  };

  if (familyData) {
    // show the schedule after entering the code
    return <FamilyScheduleScreen familyData={familyData} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Channel Code</Text>
      <TextInput
        style={styles.input}
        placeholder="ABC123"
        value={code}
        onChangeText={setCode}
        autoCapitalize="characters"
      />
      <Button title="Enter" onPress={handleEnterCode} />
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
    width: '60%',
    marginBottom: 10,
    textAlign: 'center',
  },
});
