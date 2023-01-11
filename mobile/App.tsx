import { useRef, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { 
  useFonts, 
  Inter_400Regular, 
  Inter_600SemiBold, 
  Inter_700Bold, 
  Inter_900Black 
} from '@expo-google-fonts/inter';

import { Routes } from './src/Routes';
import { Subscription } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';

import { Background } from './src/components/Background';
import { Loading } from './src/components/Loading';
import './src/services/notificationsconfig';
import { getPushNotificationToken } from  './src/services/getPushNotificationToken';


export default function App() {  

  const [fontsLoaded] = useFonts({
    Inter_400Regular, 
    Inter_600SemiBold, 
    Inter_700Bold, 
    Inter_900Black 
    });
  

const getNotificationListener = useRef<Subscription>();
const responseNotificationListener = useRef<Subscription>();

useEffect (() => {
  getPushNotificationToken();
});

useEffect(() =>{
 getNotificationListener.current = Notifications.addNotificationReceivedListener(Notification =>{
  console.log(Notification);
 }),
 responseNotificationListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  console.log(response);
 });

    return () => {
      if(getNotificationListener.current && responseNotificationListener.current) {
        Notifications.removeNotificationSubscription(getNotificationListener.current);
        Notifications.removeNotificationSubscription(responseNotificationListener.current);
      }
      }
},[]);
 

  return (
    <Background>
      <StatusBar
      barStyle="light-content"
      backgroundColor="transparent"
      translucent
      />

      { fontsLoaded ? <Routes /> : <Loading/>}
    </Background>
  );
}


