import React, { useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { ChatTeardropDots } from 'phosphor-react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { Options } from '../Options';
import { Form } from '../Form';
import { Success } from '../Success';

import { feedbackTypes } from '../../utils/feedbackTypes';

import { theme } from '../../theme';

import { styles } from './styles';

export type FeedbackType = keyof typeof feedbackTypes;

function Widget() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState<boolean>(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleOpen() {
    bottomSheetRef.current?.expand();
  }

  function handleRestartFeedback() {
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  function handleFeedbackSent() {
    setFeedbackSent(true);
  }

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpen}>
        <ChatTeardropDots
          size={24}
          weight='bold'
          color={theme.colors.text_on_brand_color}
        />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {feedbackSent ? (
          <Success onSendAnotherFeedback={handleRestartFeedback} />
        ) : (
          <>
            {feedbackType ? (
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <Form
                    feedbackType={feedbackType}
                    onFeedbackCanceled={handleRestartFeedback}
                    onFeedbackSent={handleFeedbackSent}
                  />
                </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
            ) : (
              <Options onFeedbackTypeChanged={setFeedbackType} />
            )}
          </>
        )}
      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);
