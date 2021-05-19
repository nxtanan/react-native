import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, IconButton, Modal, Portal} from 'react-native-paper';
import Style from '../css/Style';

const ConfirmModalComponent = ({isOpen, song, onDismiss, onConfirm}) => {
  const [visible, setVisible] = useState(isOpen);

  const handleConfirm = () => {
    onConfirm(song);
    setVisible(false);
  };

  useEffect(() => {
    setVisible(isOpen);
  }, [isOpen]);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={Style.containerStyle}>
        <Text>Are you sure to delete this song</Text>
        <View style={Style.modalContainer}>
          <IconButton
            style={Style.iconButtonContainer}
            icon="check"
            color={Colors.green500}
            size={20}
            onPress={handleConfirm}
          />
          <IconButton
            icon="close"
            color={Colors.red500}
            size={20}
            onPress={onDismiss}
          />
        </View>
      </Modal>
    </Portal>
  );
};

export default ConfirmModalComponent;
