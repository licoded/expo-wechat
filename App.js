import ToastManager from 'toastify-react-native';

import LoginScreen from './app/screens/LoginScreen';
import ContactsScreen from './app/screens/ContactsScreen';
import ChattingScreen from './app/screens/ChattingScreen';
import PersonInfoScreen from './app/screens/PersonInfoScreen';

import { InitIM } from './app/utils/IMUtils';

InitIM();

function App() {
  return (
    <>
      <PersonInfoScreen />
      <ToastManager
        showCloseIcon={false}
        showProgressBar={false}
        position={'bottom'}
      />
    </>
  );
}

export default App;
