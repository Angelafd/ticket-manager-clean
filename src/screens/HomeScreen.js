// src/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../../firebaseConfig';
import { subscribeTickets } from '../services/firebaseService';

export default function HomeScreen({ navigation }) {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const unsub = subscribeTickets(auth.currentUser.uid, setTickets);
    return () => unsub();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pendiente':
        return '#ffc107';
      case 'en_proceso':
        return '#17a2b8';
      case 'resuelto':
        return '#28a745';
      case 'cerrado':
        return '#6c757d';
      default:
        return '#9b137f'; // nuevo ticket
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Tickets</Text>
      <FlatList
        data={tickets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const estadoTexto = item.status ? item.status : 'Nuevo';
          return (
            <TouchableOpacity
              style={styles.ticket}
              onPress={() => navigation.navigate('TicketDetail', { ticket: item })}
            >
              <View style={styles.ticketInfo}>
                <Text style={styles.ticketTitle}>{item.title}</Text>
                <Text style={styles.ticketStatus}>
                  {estadoTexto.charAt(0).toUpperCase() + estadoTexto.slice(1)}
                </Text>
              </View>
              <View
                style={[
                  styles.statusIndicator,
                  { backgroundColor: getStatusColor(item.status) }
                ]}
              />
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateTicket')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

// ✅ Validación de props para evitar errores ESLint
HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  ticket: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  ticketInfo: {
    flexDirection: 'column',
    flex: 1,
  },
  ticketTitle: { fontSize: 18, fontWeight: 'bold' },
  ticketStatus: { fontSize: 14, color: '#555', marginTop: 4 },
  statusIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginLeft: 10,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007bff',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabText: { fontSize: 28, color: '#fff' },
});
