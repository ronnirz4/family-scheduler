import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
} from 'react-native';
import {
  createChannel,
  joinChannel,
  getMyChannels,
} from '../services/channelService';
import { auth } from '../../firebase';

export default function ChannelsScreen() {
  const userId = auth.currentUser?.uid;
  const [channels, setChannels] = useState<any[]>([]);
  const [channelName, setChannelName] = useState('');
  const [joinCode, setJoinCode] = useState('');

  useEffect(() => {
    if (userId) loadChannels();
  }, [userId]);

  async function loadChannels() {
    const list = await getMyChannels(userId!);
    setChannels(list);
  }

  async function handleCreate() {
    await createChannel(channelName, userId!);
    setChannelName('');
    loadChannels();
  }

  async function handleJoin() {
    await joinChannel(joinCode, userId!);
    setJoinCode('');
    loadChannels();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Channels</Text>

      <FlatList
        data={channels}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.channel}>• {item.name}</Text>
        )}
      />

      <Text style={styles.subtitle}>Create Channel</Text>
      <TextInput
        style={styles.input}
        placeholder="Channel name"
        value={channelName}
        onChangeText={setChannelName}
      />
      <Button title="Create" onPress={handleCreate} />

      <Text style={styles.subtitle}>Join Channel</Text>
      <TextInput
        style={styles.input}
        placeholder="Code"
        value={joinCode}
        onChangeText={setJoinCode}
      />
      <Button title="Join" onPress={handleJoin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { marginTop: 20, fontSize: 18 },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginVertical: 6,
  },
  channel: { paddingVertical: 6, fontSize: 16 },
});
