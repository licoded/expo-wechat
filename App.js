import { createStaticNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './RootNavigation';
import ToastManager from 'toastify-react-native';

import LoginScreen from './app/screens/LoginScreen';
import ContactsScreen from './app/screens/ContactsScreen';
import ChattingScreen from './app/screens/ChattingScreen';
import PersonInfoScreen from './app/screens/PersonInfoScreen';

import { useIM } from './app/utils/IMUtils';

const MyStack = createStackNavigator({
  screens: {
    Login: LoginScreen,
    PersonInfo: PersonInfoScreen,
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
