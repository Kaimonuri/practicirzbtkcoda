import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ContactsScreen from './screens/ContactsScreen';
import DetailsScreen from './screens/DetailsScreen';
import AddContactScreen from './screens/AddContactScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Contacts">
        <Stack.Screen 
          name="Contacts" 
          component={ContactsScreen} 
          options={{ title: 'Контакты' }}
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen} 
          options={{ title: 'Детали контакта' }}
        />
        <Stack.Screen 
          name="AddContact" 
          component={AddContactScreen} 
          options={{ title: 'Добавить контакт' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}