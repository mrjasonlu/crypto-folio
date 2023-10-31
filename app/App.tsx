import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RelayEnvironmentProvider } from 'relay-hooks';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import Home from './src/screens/Home/Home';
import Accounts from './src/screens/Accounts/Accounts';
import environment from './src/relay/environment';
import Header from '@src/components/Header/Header';
import IconHome from './assets/images/Home.svg';
import IconAccounts from '@assets/images/Accounts.svg';
import './src/i18n/i18n';
import AccountSettingsContextProvider from '@src/contexts/AccountSettingsContext';
import RealTimeTrackerProvider from '@src/providers/RealtimeTracker';
import { useTranslation } from 'react-i18next';
import { COLORS } from '@src/styles/theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

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
          tabBarIcon: ({ focused }) =>
            focused ? <IconHome /> : <IconHome style={{ opacity: 0.7 }} />,
          tabBarActiveTintColor: COLORS.BLACK,
          tabBarInactiveTintColor: COLORS.MIRAGE_600,
          tabBarLabelStyle: {
            fontWeight: '600',
          },
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          header: () => <Header title="Accounts" showLogo={false} />,
          headerShadowVisible: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <IconAccounts />
            ) : (
              <IconAccounts style={{ opacity: 0.7 }} />
            ),
          tabBarActiveTintColor: COLORS.BLACK,
          tabBarInactiveTintColor: COLORS.MIRAGE_600,
          tabBarLabelStyle: {
            fontWeight: '600',
          },
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
      <AccountSettingsContextProvider>
        <QueryClientProvider client={queryClient}>
          <RealTimeTrackerProvider>
            <NavigationContainer>
              <Root.Navigator>
                <Root.Screen
                  name="Root"
                  component={Tabs}
                  options={{ headerShown: false }}
                />
              </Root.Navigator>
            </NavigationContainer>
          </RealTimeTrackerProvider>
        </QueryClientProvider>
      </AccountSettingsContextProvider>
    </RelayEnvironmentProvider>
  );
}
