import { Text, TouchableOpacity, View } from 'react-native';
import { GameController } from 'phosphor-react-native';

import { DuoInfo } from '../DuoInfo/Index';

import { THEME } from '../../theme';
import { styles } from './styles';


export interface DuocardProps {
  id: string;
  hourEnd: string;
  hourStart: string;
  name: string;
  UseVoiceChannel: boolean;
  weekDays: string []; 
  yearsPlaying: number;
}

interface Props{
  data: DuocardProps;
  onConnect:() => void;
}
export function Duocard({ data, onConnect }: Props) {
  return (
    <View style={styles.container}>
    <DuoInfo 
      label='nome'
      value={data.name}
    />

<DuoInfo 
      label='tempo de jogo'
      value={`${data.yearsPlaying} anos`}
    />

<DuoInfo 
      label='Disponibilidade'
      value={`${data.weekDays} dias \u2022 ${data.hourStart} - ${data.hourEnd} `}
    />

<DuoInfo 
      label='Chamada de audio'
      value={data.UseVoiceChannel ? "Sim" : "Nao"}
      colorValue={data.UseVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
    />

    <TouchableOpacity
    style={styles.button}
    onPress={onConnect}
    >
     <GameController
     color={THEME.COLORS.TEXT} 
     size= {20}
     />

    <Text 
    style={styles.buttonTitle}>
      Conectar
    </Text>
    </TouchableOpacity>
    </View>
  );
}