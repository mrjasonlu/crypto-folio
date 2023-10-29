import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RelayEnvironmentProvider } from 'relay-hooks';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home/Home';
import Accounts from './src/screens/Accounts/Accounts';
import environment from './src/relay/environment';
import Header from './src/components/Header';
import IconHome from './assets/images/Home.svg';
import IconAccounts from './assets/images/Accounts.svg';
import './src/i18n/i18n';

const Tab = createBottomTabNavigator();
const Root = createStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        options={{
          headerStyle: {
            backgroundColor: 'rgba(50,81,186,1.0)',
          },
          headerTitle: props => <Header {...props} />,
          headerShadowVisible: false,
          tabBarIcon: () => {
            return <IconHome />;
          },
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          headerStyle: {
            backgroundColor: 'rgba(50,81,186,1.0)',
          },
          headerTitle: props => <Header {...props} />,
          headerShadowVisible: false,
          headerTintColor: '#FFF',
          tabBarIcon: () => <IconAccounts />,
        }}
        name="Accounts"
        component={Accounts}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <NavigationContainer>
        <Root.Navigator>
          <Root.Screen
            name="Root"
            component={Tabs}
            options={{ headerShown: false }}
          />
        </Root.Navigator>
      </NavigationContainer>
    </RelayEnvironmentProvider>
  );
}
