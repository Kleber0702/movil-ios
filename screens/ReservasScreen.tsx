import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import axios from 'axios';

interface Reserva {
  fecha_desde: string;
  fecha_hasta: string;
  tarifa: number;
  room_id: number;
  precio_total: number;
  room_name: string;
}

const ReservasScreen = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:3000/api/reservas');
        setReservas(response.data);
      } catch (error) {
        console.error('Error fetching reservas:', error);
      }
    };

    fetchReservas();
  }, []);

  const formatDate = (dateString: string) => {
    return dateString.split(' ')[0];
  };

  const renderReserva = ({ item }: { item: Reserva }) => {
    const fechaDesde = formatDate(item.fecha_desde);
    const fechaHasta = formatDate(item.fecha_hasta);
    
    return (
      <View style={styles.itemContainer}>
        <View style={styles.iconContainer}>
          <Image 
            source={require('../assets/room-icon.png')} 
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.titleText}>
            Cuarto {item.room_name}
          </Text>
          <Text style={styles.detailsText}>
            {fechaDesde} - {fechaHasta}
          </Text>
          <Text style={styles.detailsText}>
            Personas: {item.tarifa}          
          </Text>
          <Text style={styles.detailsText}>
          Pagado: ${item.precio_total}            
          </Text>

          
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={reservas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderReserva}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    marginRight: 12,
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  detailsText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
});

export default ReservasScreen;