import { StatusBar } from 'expo-status-bar';

import './global.css';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <HomeScreen />
    </>
  );
}
