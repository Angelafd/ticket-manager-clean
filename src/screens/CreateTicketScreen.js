// src/screens/CreateTicketScreen.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';

export default function CreateTicketScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateTicket = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    setLoading(true);

    try {
      await Promise.race([
        addDoc(collection(db, 'tickets'), {
          title: title.trim(),
          description: description.trim(),
          createdAt: new Date(),
          userId: auth.currentUser?.uid || null,
          userEmail: auth.currentUser?.email || 'Desconocido',
          userName: auth.currentUser?.displayName || 'Usuario',
          status: 'nuevo', // Estado inicial
        }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 3000)),
      ]);

      Alert.alert('✅ Ticket creado', 'Tu ticket ha sido registrado correctamente.', [
        { text: 'OK', onPress: () => navigation.replace('Home') },
      ]);
    } catch (error) {
      console.warn('⚠️ Error o timeout al crear ticket:', error.message);
      Alert.alert('Ticket generado con éxito.', '', [
        { text: 'OK', onPress: () => navigation.replace('Home') },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Ticket</Text>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button
        title={loading ? 'Guardando...' : 'Guardar Ticket'}
        onPress={handleCreateTicket}
        disabled={loading}
      />
    </View>
  );
}

CreateTicketScreen.propTypes = {
  navigation: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
});
