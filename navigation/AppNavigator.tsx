import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, RouteProp } from '@react-navigation/native';

// Importar pantallas
import LoginScreen from '../screens/LoginScreen';
import AmenidadesScreen from '../screens/AmenidadesScreen';
import VentasScreen from '../screens/VentasScreen';
import ReservasScreen from '../screens/ReservasScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View style={{  
      flexDirection: 'row',
      backgroundColor: '#000000',
      borderRadius: 30,
      margin: 10,
      padding: 10,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    }}>
      {state.routes.map((route: RouteProp<any, string>, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress} // Ahora el botón será interactivo
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              backgroundColor: isFocused ? '#FFFFFF20' : 'transparent',
              borderRadius: 20,
              padding: 8,
            }}
          >
            <Image
              source={getImageSource(route.name, isFocused)}
              style={{ width: 20, height: 20, marginRight: isFocused ? 8 : 0 }}
            />
            {isFocused && (
              <Text style={{ color: '#FFFFFF', fontSize: 14 }}>
                {label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const getImageSource = (routeName: string, focused: boolean) => {
  switch (routeName) {
    case 'Amenidades':
      return focused
        ? require('../assets/home-active.png')
        : require('../assets/home.png');
    case 'Ventas':
      return focused
        ? require('../assets/cart-active.png')
        : require('../assets/cart.png');
    case 'Reservas':
      return focused
        ? require('../assets/calendar-active.png')
        : require('../assets/calendar.png');
    default:
      return require('../assets/home.png');
  }
};

// Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        tabBarStyle: { position: 'absolute' },
      }}
    >
      <Tab.Screen 
        name="Amenidades" 
        component={AmenidadesScreen} 
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Ventas" 
        component={VentasScreen} 
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Reservas" 
        component={ReservasScreen} 
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

// Stack Navigator
const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Tabs" 
        component={TabNavigator} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
