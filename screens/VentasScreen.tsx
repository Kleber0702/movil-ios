import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image} from 'react-native';
import axios from 'axios';

// Definimos la interfaz de tipo para una venta
interface Venta {
  nombre: string;
  cantidad: number;
  total: number;
  fechaVenta: string;
  metodo: string;
}

const VentasScreen = () => {
  const [ventas, setVentas] = useState<Venta[]>([]); // Especificamos el tipo de estado como un array de Venta

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:3000/api/ventas');
        setVentas(response.data);
      } catch (error) {
        console.error('Error fetching ventas:', error);
      }
    };

    fetchVentas();
  }, []);

  // Función para renderizar cada elemento de la lista
  const renderVenta = ({ item }: { item: Venta }) => (
    <View style={styles.itemContainer}>
      <View style={styles.iconContainer}>
          <Image 
            source={require('../assets/product-icon.png')} 
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
      <View style={styles.infoContainer}>
        <Text style={styles.titleText}>
          Producto: {item.nombre || 'N/A'}
        </Text>
        <Text style={styles.detailsText}>
          Cantidad: {item.cantidad ?? '0'}
        </Text>
        <Text style={styles.detailsText}>
          Total: {item.total ?? '0'}
        </Text>
        <Text style={styles.detailsText}>
          Método de pago: {item.metodo || 'N/A'}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={ventas}
        renderItem={renderVenta}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
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

export default VentasScreen;
