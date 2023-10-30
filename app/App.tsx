import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RelayEnvironmentProvider } from 'relay-hooks';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home/Home';
import Accounts from './src/screens/Accounts/Accounts';
import environment from './src/relay/environment';
import Header from '@src/components/Header/Header';
import IconHome from './assets/images/Home.svg';
import IconAccounts from '@assets/images/Accounts.svg';
import './src/i18n/i18n';
import { UserSettingsContextProvider } from '@src/contexts/UserSettingsContext';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();
const Root = createStackNavigator();

function Tabs() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        options={{
          header: () => <Header />,
          headerShadowVisible: false,
          tabBarIcon: () => {
            return <IconHome showLogo />;
          },
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          header: () => <Header title="Accounts" showLogo={false} />,
          headerShadowVisible: false,
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
      <UserSettingsContextProvider>
        <NavigationContainer>
          <Root.Navigator>
            <Root.Screen
              name="Root"
              component={Tabs}
              options={{ headerShown: false }}
            />
          </Root.Navigator>
        </NavigationContainer>
      </UserSettingsContextProvider>
    </RelayEnvironmentProvider>
  );
}
