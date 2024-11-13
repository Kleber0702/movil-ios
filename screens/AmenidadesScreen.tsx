import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import axios from 'axios';

interface Amenidad {
  amenidad_id: number;
  nombre: string;
  cantidad: number;
  estado: string;
  nombre_producto: string;
}

const AmenidadesScreen = () => {
  const [amenidades, setAmenidades] = useState<Amenidad[]>([]);

  useEffect(() => {
    const fetchAmenidades = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:3000/api/amenidades');
        setAmenidades(response.data);
      } catch (error) {
        console.error('Error fetching amenidades:', error);
      }
    };

    fetchAmenidades();
  }, []);

  const renderAmenidad = ({ item }: { item: Amenidad }) => (
    <View style={styles.itemContainer}>
      <View style={styles.iconContainer}>
        <Image 
          source={require('../assets/amenity-icon.png')} // Ajusta el nombre y ruta de la imagen
          style={styles.icon}
          resizeMode="contain"
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.titleText}>
          {item.nombre_producto}
        </Text>
        <Text style={styles.detailsText}>
          Cantidad: {item.cantidad}
        </Text>
        <Text style={styles.detailsText}>
          {item.estado}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={amenidades}
        keyExtractor={(item) => item.amenidad_id.toString()}
        renderItem={renderAmenidad}
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

export default AmenidadesScreen;
