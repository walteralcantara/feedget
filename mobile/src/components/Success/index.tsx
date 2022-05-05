import React from 'react';
import { Image, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import successImg from '../../assets/success.png';

import { styles } from './styles';

interface Props {
  onSendAnotherFeedback: () => void;
}

export function Success({ onSendAnotherFeedback }: Props) {
  return (
    <View style={styles.container}>
      <Image source={successImg} style={styles.image} />

      <Text style={styles.title}>We appreciate your feedback</Text>

      <TouchableOpacity style={styles.button} onPress={onSendAnotherFeedback}>
        <Text style={styles.buttonTitle}>Send another</Text>
      </TouchableOpacity>
    </View>
  );
}
