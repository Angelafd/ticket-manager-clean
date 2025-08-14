// src/screens/TicketDetailScreen.js
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { updateTicket, subscribeToTicket } from '../services/firebaseService';

export default function TicketDetailScreen({ route }) {

  const { ticket } = route.params;
  const [ticketData, setTicketData] = useState(ticket);

  useEffect(() => {
    const unsubscribe = subscribeToTicket(ticket.id, (updated) => {
      setTicketData(updated);
    });
    return unsubscribe;
  }, [ticket.id]);

  const estados = [
    { label: 'Pendiente', value: 'pendiente', color: '#ffc107' },
    { label: 'En Proceso', value: 'en_proceso', color: '#17a2b8' },
    { label: 'Resuelto', value: 'resuelto', color: '#28a745' },
    { label: 'Cerrado', value: 'cerrado', color: '#6c757d' }
  ];

  const handleUpdate = async (nuevoEstado) => {
    try {
      await updateTicket(ticket.id, { status: nuevoEstado });
      Alert.alert('Estado actualizado', `El ticket ahora está en estado: ${nuevoEstado}`);
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  const indexEstadoActual = estados.findIndex(e => e.value === ticketData.status);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{ticketData.title}</Text>
      <Text>{ticketData.description}</Text>

      {/* Mostrar usuario que creó el ticket */}
      <Text style={styles.usuario}>
        Creado por: {ticketData.userName || ticketData.userEmail || 'Desconocido'}
      </Text>

      {ticketData.attachments?.map((url, idx) => (
        <Image
          key={idx}
          source={{ uri: url }}
          style={{ width: 200, height: 200, marginVertical: 10 }}
        />
      ))}

      <Text style={styles.estado}>Estado actual: {ticketData.status}</Text>

      <View style={{ marginTop: 20 }}>
        {estados.map((estado, index) => (
          <TouchableOpacity
            key={estado.value}
            style={[
              styles.button,
              { backgroundColor: estado.color, opacity: index <= indexEstadoActual ? 0.5 : 1 }
            ]}
            disabled={index <= indexEstadoActual}
            onPress={() => handleUpdate(estado.value)}
          >
            <Text style={styles.buttonText}>{estado.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

TicketDetailScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    replace: PropTypes.func,
    popToTop: PropTypes.func
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      ticket: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
        description: PropTypes.string,
        status: PropTypes.string,
        attachments: PropTypes.arrayOf(PropTypes.string),
        userName: PropTypes.string,
        userEmail: PropTypes.string
      }).isRequired
    }).isRequired
  }).isRequired
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  usuario: { marginTop: 8, fontSize: 14, color: '#666', fontStyle: 'italic' },
  estado: { marginTop: 10, fontWeight: 'bold', fontSize: 16 },
  button: { padding: 14, borderRadius: 6, marginTop: 10 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' }
});
