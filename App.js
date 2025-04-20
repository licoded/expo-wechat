import { createStaticNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './RootNavigation';
import ToastManager from 'toastify-react-native';
import { Image } from 'react-native';

import LoginScreen from './app/screens/LoginScreen';
import ContactsScreen from './app/screens/ContactsScreen';
import ChattingScreen from './app/screens/ChattingScreen';
import PersonInfoScreen from './app/screens/PersonInfoScreen';

import { useIM } from './app/utils/IMUtils';
import { TabBarConfigMap } from './app/utils/TabBar';

const tabNavigatorScreen = createBottomTabNavigator({
  screens: {
    Contacts: ContactsScreen,
    Me: {
      screen: PersonInfoScreen,
      options: {
        headerShown: false,
      },
    },
  },
  screenOptions: ({ route }) => ({
    tabBarActiveTintColor: '#45C018',
    tabBarInactiveTintColor: '#999999',
    tabBarActiveBackgroundColor: '#FCFCFC',
    tabBarInactiveBackgroundColor: '#FCFCFC',
    tabBarLabel: TabBarConfigMap[route.name].name,
    tabBarIcon: ({ focused, color, size }) => {
      return (
        <Image
          style={{ width: 24, height: 24 }}
          source={TabBarConfigMap[route.name].icon[focused ? 1 : 0]}
        />
      );
    },
    headerTitleAlign: 'center',
    headerTitle: TabBarConfigMap[route.name].name,
  }),
});

const MyStack = createStackNavigator({
  screens: {
    Login: LoginScreen,
    Home: tabNavigatorScreen,
    Chat: ChattingScreen,
  },
  screenOptions: {
    headerShown: false,
  },
});
const MyNavigation = createStaticNavigation(MyStack);

function App() {
  useIM();
  return (
    <>
      <MyNavigation ref={navigationRef} />
      <ToastManager
        showCloseIcon={false}
        showProgressBar={false}
        position={'bottom'}
      />
    </>
  );
}

export default App;
