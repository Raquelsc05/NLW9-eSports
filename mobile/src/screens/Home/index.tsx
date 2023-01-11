import {  Image, FlatList } from 'react-native';

import { useEffect, useState } from 'react';

import  logoImg  from '../../assets/logo-nlw-esports.png';
import { GameCard, GameCardProps } from "../../components/GameCard";
import { Heading } from '../../components/Heading';
import { useNavigation } from '@react-navigation/native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { Background } from '../../components/Background';

export function Home() {

  const [games, setGames] = useState<GameCardProps[]>([]);

  const navigation = useNavigation();


  function handleOpenGame({ id, title, bannerUrl }: GameCardProps){
  navigation.navigate('game', {id, title, bannerUrl});
  }

  useEffect(() => {
   fetch('http://192.168.15.89:3333/games')
   .then(response => response.json())
   .then(data => setGames(data));
  }, []);


  return (
    <Background>
    <SafeAreaView style={styles.container}>
    <Image
    source={logoImg}
    style={styles.logo}
    />

    <Heading
     title='Encontre seu Duo!'
     subtitle='Selecione o game que deseja jogar...'
    />

    <FlatList 
    data={games}
    keyExtractor={item => item.id}
    renderItem={({ item }) => (
      <GameCard 
      data={item}
      onPress={() => handleOpenGame(item)}
    />
    
    )}
    showsHorizontalScrollIndicator={false}
    horizontal
    contentContainerStyle={styles.contentList}
    />
    </SafeAreaView>
    </Background>
  );
}